<template>
    <div class="d-flex mb-4 mt-3">
        <div class="col">
            <div class="d-flex justify-content-between position-relative">
                <h5 class="mb-0 text-primary">
                    <span class="bg-200 dark__bg-1100 pe-3">Acquisition</span>
                    <span class="border position-absolute top-50 translate-middle-y w-100 start-0 z-n1"></span>
                </h5>
                <FormKit type="select" placeholder="Select period" name="period" :options="{
                    7: 'Last 7 Days',
                    30: 'Last 30 Days',
                    90: 'Last 90 Days',
                }"/>
            </div>
            <div class="d-flex flex-column">
                <small class="mb-0">New Accounts / Acquisition Channel</small>
            </div>
        </div>
    </div>

    <ComponentLoader>
        <Acquisition/>
    </ComponentLoader>

    <div class="d-flex mb-4 mt-6">
        <div class="col">
            <h5 class="mb-0 text-primary position-relative">
                <span class="bg-200 dark__bg-1100 pe-3">Activation</span>
                <span class="border position-absolute top-50 translate-middle-y w-100 start-0 z-n1"></span>
            </h5>
            <small>Newly acquired users that took a desired action</small>
        </div>
    </div>

    <ComponentLoader>
        <Activation/>
    </ComponentLoader>

    <div class="d-flex mb-4 mt-6">
        <div class="col">
            <h5 class="mb-0 text-primary position-relative">
                <span class="bg-200 dark__bg-1100 pe-3">Referrals</span>
                <span class="border position-absolute top-50 translate-middle-y w-100 start-0 z-n1"></span>
            </h5>
            <small>Invites / Invitation Rate / Acceptance Rate / Viral Coefficient</small>
        </div>
    </div>

    <ComponentLoader>
        <Referrals/>
    </ComponentLoader>
</template>

<script setup lang="ts">
import Acquisition from "@/pages/accounts/Acquisition.vue";
import Referrals from "@/pages/accounts/Referrals.vue";
import ComponentLoader from "@/components/loaders/ComponentLoader.vue";
import Activation from "@/pages/accounts/Activation.vue";
</script>