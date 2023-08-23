<template>
    <ErrorFallback v-if="error" :error="error"/>
    <div v-else class="row g-3 mb-3">
        <div class="col">
            <div class="card overflow-hidden" style="min-width: 12rem">
                <div class="card-header bg-light d-flex justify-content-between align-items-center py-2">
                    <h5 class="mb-0">New Accounts</h5>
                    <span class="fs-2 fw-bold text-danger">{{ store.accounts?.length }}</span>
                </div>
                <div class="card-body position-relative">
                    <SimpleBar style="max-height: 15rem; overflow-x: hidden">
                        <div class="row fs--2">
                            <div class="col-lg-4 my-2" v-for="acq in store.acquisition" :key="acq.id">
                                <div class="d-flex align-items-start justify-content-between border-bottom">
                                    <div>{{ acq.id }} | <b>{{ acq.phone }}</b></div>
                                    <div>{{ acq.src }}</div>
                                </div>
                                <div class="text-400 fw-normal fs--2">
                                    {{ moment(acq.date).format('DD.MM.YY') }}
                                </div>
                            </div>
                        </div>
                    </SimpleBar>

                    <div class="border-bottom border-bottom-2 border-dashed my-3"/>

                    <div class="row">
                        <div class="col" v-for="(count, src) in acquisitionCounts" :key="src">
                            <div class="d-flex align-items-center justify-content-center gap-2">
                                <div :style="`--falcon-circle-progress-bar:${count / store.acquisition!.length * 100}`"
                                     class="position-relative">
                                    <svg class="circle-progress-svg" width="35" height="35" viewBox="0 0 120 120">
                                        <circle class="progress-bar-rail" cx="60" cy="60" r="54" fill="none"
                                                stroke-linecap="round" stroke-width="12"></circle>
                                        <circle class="progress-bar-top" cx="60" cy="60" r="54" fill="none"
                                                stroke-linecap="round" stroke="#0F1B4C" stroke-width="12"></circle>
                                    </svg>

                                    <small class="position-absolute top-50 start-50 translate-middle fs-7 fw-bold"
                                           style="margin-top: 1px">
                                        {{ count }}
                                    </small>
                                </div>
                                <h6 class="mb-0 text-700 fs-7">{{ src }}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SimpleBar from 'simplebar-vue';
import moment from 'moment';
import { useAccountsStore } from '@/stores/accounts';
import { computed, ref } from 'vue';
import ErrorFallback from '@/components/ErrorFallback.vue';

const error = ref<Error | undefined>(undefined);
const store = useAccountsStore();

const acquisitionCounts = computed(() => {
    return Object.keys(store.acquisition_count_by_src)
        .sort((a, b) => store.acquisition_count_by_src[b] - store.acquisition_count_by_src[a])
        .reduce((sorted: { [key: string]: number }, src) => {
            sorted[src] = store.acquisition_count_by_src[src];
            return sorted;
        }, {});
});
</script>