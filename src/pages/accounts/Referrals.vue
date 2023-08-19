<template>
    <ErrorFallback v-if="error" :error="error"/>
    <div v-else class="row g-3 mb-3">
        <div class="col">
            <div class="card overflow-hidden" style="min-width: 12rem">
                <div class="card-header bg-light d-flex justify-content-between align-items-center py-2">
                    <h5 class="mb-0">
                        Total Invites - <span class="fs-2 fw-bold text-danger">{{ store.total_invites }}</span>
                    </h5>
                    <h5 class="mb-0">
                        <span class="fs-2 fw-bold text-danger">{{ store.total_converted }}</span> - Converted
                    </h5>
                </div>
                <div class="progress" style="height:5px" role="progressbar" aria-valuenow="25" aria-valuemin="0"
                     aria-valuemax="100">
                    <div class="progress-bar rounded-3" :class="{
                        'bg-success': store.convergence >= 70,
                        'bg-warning': store.convergence >= 50 && store.convergence < 69,
                        'bg-danger': store.convergence < 50
                    }" :style="`width: ${store.convergence}%`"></div>
                </div>
                <div class="card-body position-relative">
                    <div class="row">
                        <div class="col-lg-6">
                            <h5 class="fs-0 fw-bold mb-3 text-center">VIA OPTION 5.INVITE</h5>
                            <SimpleBar style="max-height: 10rem; overflow-x: hidden">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th class="text-end">Invited</th>
                                        <th>Converted</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(invited, id) in store.invited.INVITED">
                                        <td class="py-1 fs--2">{{ id }}</td>
                                        <td class="text-end py-1 fs--2">{{ invited.invited }}</td>
                                        <td class="py-1 fs--2">{{ invited.converted }}</td>
                                        <td class="py-1 fs--2">
                                            <div class="progress" style="height:3px" role="progressbar"
                                                 aria-valuenow="25"
                                                 aria-valuemin="0" aria-valuemax="100" title="Convergence">
                                                <div class="progress-bar rounded-3 bg-primary"
                                                     :style="`width: ${invited.convergence}%`"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </SimpleBar>
                        </div>
                        <div class="col-lg-6">
                            <h5 class="fs-0 fw-bold mb-3 text-center">VIA INVITE CODE</h5>
                            <SimpleBar style="max-height: 10rem; overflow-x: hidden">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th class="text-end">Invited</th>
                                        <th>Converted</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(invited, id) in store.invited.INVITE_CODE">
                                        <td class="py-1 fs--2">{{ id }}</td>
                                        <td class="text-end py-1 fs--2">{{ invited.invited }}</td>
                                        <td class="py-1 fs--2">{{ invited.converted }}</td>
                                        <td class="py-1 fs--2">
                                            <div class="progress" style="height:3px" role="progressbar"
                                                 aria-valuenow="25"
                                                 aria-valuemin="0" aria-valuemax="100" title="Convergence">
                                                <div class="progress-bar rounded-3 bg-primary"
                                                     :style="`width: ${invited.convergence}%`"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </SimpleBar>
                        </div>
                    </div>

                    <div class="border-top border-top-2 border-dashed my-3"></div>

                    <div class="row p-3 justify-content-center text-center">
                        <div class="col-md-4 border-end border-end-2 border-dashed">
                            <div class="display-4 fs-3 mb-2 fw-normal font-sans-serif text-primary">
                                {{ store.inviteRate.toFixed(2) }}
                            </div>
                            <h6>Invite Rate</h6>
                        </div>
                        <div class="col-md-4 border-end border-end-2 border-dashed">
                            <div class="display-4 fs-3 mb-2 fw-normal font-sans-serif text-primary">
                                {{ store.acceptanceRate.toFixed(2) }}
                            </div>
                            <h6>Acceptance Rate</h6>
                        </div>
                        <div class="col-md-4">
                            <div class="display-4 fs-3 mb-2 fw-normal font-sans-serif text-primary">
                                {{ store.viralCoefficient.toFixed(2) }}
                            </div>
                            <h6>Viral Coefficient</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAccountsStore } from "@/stores/accounts";
import { SimpleBar } from "simplebar-vue3";
import ErrorFallback from "@/components/ErrorFallback.vue";
import { ref } from "vue";

const error = ref<Error|undefined>(undefined)
const store = useAccountsStore()

try {
    await store.getReferrals()
} catch (e:any) {
    error.value = e
}
</script>