<script setup lang="ts">
defineProps<{ error?: Error }>();
</script>

<template>
    <div v-if="error" class="text-center border border-dashed border-danger-subtle p-3">
        <v-icon name="md-error-sharp" class="text-danger"/>
        {{ error }}
    </div>
</template>