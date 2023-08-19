<template>
    <ErrorFallback v-if="error" :error="error"/>
    <div v-else class="row g-3 mb-3">
        <div class="col">
            <div class="card overflow-hidden" style="min-width: 12rem">
                <div class="card-header bg-light py-2">
                    <h5 class="mb-0">Actions</h5>
                </div>
                <div class="card-body position-relative">
                    <SimpleBar style="max-height: 17rem; overflow-x: hidden">
                        <div class="row fs--2 my-2" v-for="(acq, i) in store.acquisition">
                            <div class="col-lg-2">
                                1
                            </div>
                            <div class="col-lg-10">
                                <span>Created Profile</span>
                            </div>
                        </div>
                    </SimpleBar>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { SimpleBar } from 'simplebar-vue3';
import { ref } from "vue";
import ErrorFallback from "@/components/ErrorFallback.vue";
import { useProductsStore } from "@/stores/products.ts";
import { useAccountsStore } from "@/stores/accounts.ts";

const error = ref<Error | undefined>(undefined)
const productsStore = useProductsStore()
const accountStore = useAccountsStore()
const actions = ref({})

try {
    if(!productsStore.transactions) await productsStore.fetchTransactions()
    if(!accountStore.accounts) await accountStore.fetchAccounts()
    if(!accountStore.invites) await accountStore.fetchInvites()

    const inviters = accountStore.invites?.map(i => i.inviter_id);

    accountStore.accounts?.forEach((acc) => {
        if(!actions.value[acc.id]) {
            actions.value[acc.id] = []
        }

        if (acc.user_id) {
            actions.value[acc.id].push('Created Profile')
        }

        productsStore.transactions?.filter(tx => tx.account_id === acc.id).forEach(tx => {
            const conversions = {
                'Airtime Purchase': 'Purchased Airtime',
                'Utility Purchase': 'Purchased Utility',
                'Voucher Purchase': 'Purchased Voucher',
                'Subscription Purchase': 'Purchased Subscription',
                'Earnings Withdrawal': 'Withdrew Earnings',
                'Merchant Payment': 'Paid Merchant'
            };

            if (conversions.hasOwnProperty(tx.description)) {
                tx.description = conversions[tx.description];
            }

            return actions.value[acc.id].push(tx.description)
        })

        if (inviters?.includes(acc.id)) {
            actions.value[acc.id].push('Invited')
        }

        actions.value[acc.id] = [...new Set(actions[acc.id])]
    })

    console.log(actions.value)
} catch (e: any) {
    error.value = e
}
</script>