<template>
    <ErrorFallback v-if="error" :error="error"/>
    <div v-else class="row g-3 mb-3">
        <div class="col-sm-6 col-md-4">
            <div class="card overflow-hidden" style="min-width: 12rem">
                <CardBgCorner/>
                <div class="card-body position-relative">
                    <h6>Total Accounts</h6>
                    <div class="display-4 fs-4 mb-2 fw-normal text-primary">{{ accountStore.totalSidoohAccounts }}</div>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-md-4">
            <div class="card overflow-hidden" style="min-width: 12rem">
                <CardBgCorner :corner="2"/>
                <div class="card-body position-relative">
                    <h6>
                        Active Accounts
                        <span class="badge badge-subtle-success rounded-pill ms-2" title="COMPLETED">
                            {{ productsStore.activeAccounts }}
                        </span>
                    </h6>
                    <div class="display-4 fs-4 mb-2 fw-normal text-success">
                        {{ productsStore.completedActiveAccounts }}
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card overflow-hidden" style="min-width: 12rem">
                <CardBgCorner :corner="3"/>
                <div class="card-body position-relative">
                    <h6>Inactive Accounts</h6>
                    <div class="display-4 fs-4 mb-2 fw-normal text-danger">
                        {{ accountStore.totalSidoohAccounts - productsStore.activeAccounts }}
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-md-4">
            <div class="card overflow-hidden" style="min-width: 12rem">
                <CardBgCorner :corner="4"/>
                <div class="card-body position-relative">
                    <h6>Total Subscribers</h6>
                    <div class="display-4 fs-4 mb-2 fw-normal text-warning">
                        {{ productsStore.subscribersCount }}
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-md-4">
            <div class="card overflow-hidden" style="min-width: 12rem">
                <CardBgCorner :corner="5"/>
                <div class="card-body position-relative">
                    <h6>Active Subscribers</h6>
                    <div class="display-4 fs-4 mb-2 fw-normal text-secondary">
                        {{ productsStore.activeSubscribersCount }}
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-md-4">
            <div class="card overflow-hidden" style="min-width: 12rem">
                <CardBgCorner/>
                <div class="card-body position-relative">
                    <h6>Dormant Subscribers</h6>
                    <div class="display-4 fs-4 mb-2 fw-normal text-info">
                        {{ productsStore.subscribersCount - productsStore.activeSubscribersCount }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ErrorFallback from '@/components/ErrorFallback.vue';
import { useProductsStore } from '@/stores/products.ts';
import { useAccountsStore } from '@/stores/accounts.ts';
import { CardBgCorner } from '@nabcellent/sui-vue';

const error = ref<Error | undefined>(undefined);
const productsStore = useProductsStore();
const accountStore = useAccountsStore();

try {
    if (!accountStore.accounts) await accountStore.fetchAccounts();

    await productsStore.getRetention();
} catch (e: any) {
    error.value = e;
}
</script>