<template>
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

</script>

<style scoped>
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 20vh;
}
</style>