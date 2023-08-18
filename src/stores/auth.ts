import { defineStore } from "pinia";
import moment from "moment";
import router from "@/router";
import { decodeJWT } from "@/utils/helpers.ts";
import axios from "axios";
import { User } from "@nabcellent/sui-vue";
import { CONFIG } from "@/config.ts";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        baseUrl: CONFIG.sidooh.services.accounts.api.url,
        token: localStorage.getItem("token") || null,
        user: <User>{},
    }),

    actions: {
        async login(email: string, password: string) {
            try {
                const { data: res } = await axios.post(`${this.baseUrl}/users/signin`, { email, password })

                if (res?.access_token) {
                    this.token = res?.access_token

                    localStorage.setItem("token", JSON.stringify(res?.access_token));
                } else {
                    console.warn(res)
                }
            } catch (err: any) {
                console.error(err)

                if ([400, 422].includes(err.response?.status) && Boolean(err.response.data)) {
                    throw new Error(err.response.data.errors[0].message)
                } else if (err.response?.status === 401 && err.response.data) {
                    throw new Error('Invalid credentials!')
                } else if (err.response?.status === 429) {
                    throw new Error("Sorry! We failed to log you in. Please try again in a few minutes.")
                } else if (err.code === 'ERR_NETWORK') {
                    throw new Error('Network Error! Service unavailable.')
                } else {
                    throw new Error('Something went wrong!')
                }
            }
        },
        checkLocalAuth() {
            this.token = localStorage.getItem("token")

            if (this.token) {
                const tokenData = decodeJWT(this.token)
                const expiresIn = moment.unix(tokenData.exp).diff(moment(), 'minutes');

                console.log(`Session expires in: ${expiresIn} minutes`);

                if (moment.unix(tokenData.exp).isBefore(moment())) this.logout()
            }
        },
        async logout() {
            localStorage.removeItem('token')

            this.$reset()

            await router.push({ name: 'login' })
        }
    }
})