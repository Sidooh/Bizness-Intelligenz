<script setup lang="ts">
import DefaultLayout from './layouts/Default.vue'
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "./stores/auth";

const route = useRoute()

const layout = computed(() => route.meta.layout || DefaultLayout)

onMounted(() => {
    const authStore = useAuthStore()

    authStore.checkLocalAuth()
})
</script>

<template>
    <component :is="layout"/>
</template>