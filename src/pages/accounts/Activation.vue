<template>
    <ErrorFallback v-if="error" :error="error"/>
    <div v-else class="row g-3 mb-3">
        <div class="col">
            <div class="card overflow-hidden" style="min-width: 12rem">
                <div class="card-header bg-light py-2">
                    <h5 class="mb-0">Actions</h5>
                </div>
                <div class="card-body position-relative">
                    <div class="row">
                        <div class="col-lg-2">User</div>
                        <div class="col-lg-10">Actions</div>
                    </div>
                    <SimpleBar style="max-height: 15rem; overflow-x: hidden">
                        <div class="row fs--2 my-2" v-for="(acts, id) in actions">
                            <div class="col-lg-2">
                                <a :href="`${CONFIG.sidooh.services.accounts.dashboard.url}/accounts/${id.split('-')[0]}`">
                                    {{ id }}
                                </a>
                            </div>
                            <div class="col-lg-10">
                                <span v-if="acts.length > 0" v-for="(act, i) in acts">
                                    {{ act }} <span v-if="i < acts.length - 1" class="text-warning">* </span>
                                </span>
                                <span v-else>No Action</span>
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
import { CONFIG } from "@/config.ts";

const error = ref<Error | undefined>(undefined)
const productsStore = useProductsStore()
const accountStore = useAccountsStore()
const actions = ref<{ [key: string]: string[] }>({})

try {
    if (!productsStore.transactions) await productsStore.fetchTransactions()
    if (!accountStore.accounts) await accountStore.fetchAccounts()
    if (!accountStore.invites) await accountStore.fetchInvites()

    const inviters = accountStore.invites?.map(i => i.inviter_id);

    accountStore.accounts?.forEach((acc) => {
        const key = `${acc.id} - ${acc.phone}`;

        if (!actions.value[key]) actions.value[key] = []
        if (acc.user_id) actions.value[key].push('Created Profile')

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

            return actions.value[key].push(tx.description)
        })

        if (inviters?.includes(acc.id)) actions.value[key].push('Invited')

        actions.value[key] = [...new Set(actions.value[key])]
    })

    console.log(actions.value)
} catch (e: any) {
    error.value = e
}
</script>