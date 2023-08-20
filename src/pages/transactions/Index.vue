<template>
    <div class="d-flex mb-4 mt-3">
        <div class="col">
            <div class="d-flex justify-content-between position-relative">
                <h5 class="mb-0 text-primary">
                    <span class="bg-200 dark__bg-1100 pe-3">Retention</span>
                    <span class="border position-absolute top-50 translate-middle-y w-100 start-0 z-n1"></span>
                </h5>
                <FormKit type="select" placeholder="Select period" name="period" :options="{
                    7: 'Last 7 Days',
                    30: 'Last 30 Days',
                    90: 'Last 90 Days',
                }"/>
            </div>
            <div class="d-flex flex-column">
                <small class="mb-0">Activity Rate / Users / Subscribers</small>
            </div>
        </div>
    </div>

    <ComponentLoader>
        <Retention/>
    </ComponentLoader>
</template>

<script setup lang="ts">
import ComponentLoader from "@/components/loaders/ComponentLoader.vue";
import Retention from "@/pages/transactions/Retention.vue";
</script>