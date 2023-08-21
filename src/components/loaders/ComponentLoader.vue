<template>
    <ErrorFallback v-if="error" :error="error"/>

    <Suspense>
        <slot/>

        <template #fallback>
            <div class="wrapper">
                <div style="position: relative">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </template>
    </Suspense>
</template>

<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue';
import ErrorFallback from '@/components/ErrorFallback.vue';

const error = ref();

onErrorCaptured(e => {
    error.value = e;
});
</script>

<style scoped>
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 20vh;
}
</style>