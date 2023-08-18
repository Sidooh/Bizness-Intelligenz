<script setup lang="ts">
defineProps<{ serviceName: 'Accounts' | 'Payments' | 'Products' | 'Savings' | 'Notify' | 'Analytics', version: string | number }>()
</script>

<template>
    <footer class="footer">
        <div class="row g-0 justify-content-between fs--1 mt-4 mb-3">
            <div class="col-auto">
                <p class="mb-0 text-600">
                    {{ serviceName }} | <a href="/public">Sidooh</a>
                    <br class="d-sm-none"/> &copy; {{ new Date().getFullYear() }}
                </p>
            </div>
            <div class="col-auto">
                <p class="mb-0 text-600">v{{ version }}</p>
            </div>
        </div>
    </footer>
</template>