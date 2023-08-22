<template>
    <ErrorFallback v-if="error" :error="error"/>
    <div v-else class="card py-3 mb-3">
        <div class="card-body py-3">
            <div class="row g-sm-0 gy-4 row-cols-4 h-100 align-content-between">
                <div class="col" v-for="(revenue, desc) in store.revenue" :key="desc">
                    <div class="d-flex gap-2 mb-3">
                        <div class="vr rounded ps-1 bg-success"></div>
                        <h6 class="lh-base text-700 mb-0">{{ desc }}</h6>
                    </div>
                    <template v-if="revenue.actual">
                        <h5 class="fw-normal">KSH {{ revenue.actual }}</h5>
                        <h6 class="mb-0"><span class="text-500 me-2">KSH {{ revenue.total }}</span></h6>
                    </template>
                    <h5 v-else class="fw-normal">KSH {{ revenue.total }}</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ErrorFallback from '@/components/ErrorFallback.vue';
import { ref } from 'vue';
import { useProductsStore } from '@/stores/products.ts';

const error = ref<Error | undefined>(undefined);
const store = useProductsStore();

try {
    await store.getRevenue();
} catch (e: any) {
    error.value = e;
}
</script>