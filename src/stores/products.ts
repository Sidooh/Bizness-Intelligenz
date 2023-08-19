import { defineStore } from "pinia";
import { Transaction } from "@/utils/types.ts";
import axios from "@/utils/axios.ts";
import { CONFIG } from "@/config.ts";

export const useProductsStore = defineStore('products', {
    state: () => ({
        baseUrl: CONFIG.sidooh.services.products.api.url,
        transactions: <Transaction[] | undefined>undefined
    }),
    actions: {
        async fetchTransactions() {
            const { data: res } = await axios.get(`${this.baseUrl}/transactions?page_size=20`)

            this.transactions = res.data.data
        }
    }
})