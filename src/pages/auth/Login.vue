<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import router from '../../router';
import { FormKitGroupValue } from '@formkit/core';
import { toast } from '@/utils/helpers.ts';
import { Logo } from '@nabcellent/sui-vue';

const handleSubmit = async (formData: FormKitGroupValue) => {
    try {
        const data = formData as { email: string, password: string };

        await useAuthStore().login(data.email, data.password);

        const intended = localStorage.getItem('urlIntended');

        await router.push({ path: intended ?? '/' });

        localStorage.removeItem('urlIntended');
    } catch (err: any) {
        toast({ titleText: err.message, icon: 'warning' });
    }
};
</script>

<template>
    <div class="row flex-center min-vh-100 pb-6">
        <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 position-relative">
            <Logo src="/logo.png" :width="120" service-name="Analytics"/>
            <img class="bg-auth-circle-shape" src="/images/icons/spot-illustrations/bg-shape.png" alt="" width="250">
            <img class="bg-auth-circle-shape-2" src="/images/icons/spot-illustrations/shape-1.png" alt="" width="150">
            <div class="card shadow-lg">
                <div class="card-body p-4 p-sm-5">
                    <div class="row flex-between-center mb-2">
                        <div class="col-auto">
                            <h5>Sign In</h5>
                        </div>
                    </div>
                    <FormKit id="sign-in" type="form" @submit="handleSubmit" submit-label="Sign In"
                             :incomplete-message="false"
                             :submit-attrs="{
                                'suffix-icon': 'login-circle',
                                inputClass: 'w-100 btn btn-sm btn-primary mt-3',
                                ignore: false
                             }">
                        <FormKit class="form-control" type="email" name="email" placeholder="Email address" autofocus
                                 autocomplete="email" :config="{classes:{input:'form-control', outer:'mb-3'}}"
                                 validation="required"/>
                        <FormKit class="form-control" type="password" name="password" placeholder="Password"
                                 autoComplete="current-password" validation="required"
                                 :config="{classes:{input:'form-control', outer:'mb-3'}}"/>
                        <div class="d-flex justify-content-end">
                            <a class="fs--1" href="/password/reset">Forgot Password?</a>
                        </div>
                    </FormKit>
                    <div class="position-relative mt-4">
                        <hr class="bg-300">
                        <div class="divider-content-center">🌟</div>
                    </div>
                    <div class="text-center">
                        <i>
                            <small class="opacity-75">Sidooh, Makes You Money with Every Purchase!</small>
                        </i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

