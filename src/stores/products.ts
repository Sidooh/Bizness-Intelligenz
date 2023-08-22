import { defineStore } from 'pinia';
import axios from '@/utils/axios.ts';
import { CONFIG } from '@/config.ts';
import { Status, Subscription, Transaction } from '@nabcellent/sui-vue';
import { groupBy } from '@/utils/helpers.ts';

type Revenue = { [key: string]: { total: number, actual?: number } }

interface State {
    baseUrl: string;
    transactions: Transaction[] | undefined;
    subscriptions: Subscription[] | undefined;
    activeAccounts: number;
    completedActiveAccounts: number;
    inactiveAccounts: number;
    revenue: Revenue | undefined;
}

export const useProductsStore = defineStore('products', {
    state: (): State => ({
        baseUrl: CONFIG.sidooh.services.products.api.url,
        transactions: <Transaction[] | undefined>undefined,
        subscriptions: <Subscription[] | undefined>undefined,
        activeAccounts: 0,
        completedActiveAccounts: 0,
        inactiveAccounts: 0,
        revenue: undefined
    }),
    getters: {
        subscribers: state => state.subscriptions?.reduce((curr: { [key: number]: number }, sub) => {
            return {
                ...curr,
                [sub.account_id]: (curr[sub.account_id] || 0) + 1
            };
        }, {}),
        activeSubscribers: state => {
            return groupBy(state.subscriptions?.filter(sub => sub.status === Status.ACTIVE) ?? [], 'account_id');
        },
        subscribersCount() {
            return Object.keys(this?.subscribers).length;
        },
        activeSubscribersCount() {
            return Object.keys(this?.activeSubscribers).length;
        },
        completedTransactions: (state): Transaction[] => state.transactions?.filter(tx => tx.status === 'COMPLETED') ?? []
    },
    actions: {
        async fetchTransactions() {
            const { data: res } = await axios.get(`${this.baseUrl}/transactions?page_size=20`);

            this.transactions = res.data.data;
        },
        async fetchSubscriptions() {
            const { data: res } = await axios.get(`${this.baseUrl}/subscriptions?page_size=20`);

            this.subscriptions = res.data.data;
        },
        async getRetention() {
            if (!this.transactions) await this.fetchTransactions();
            if (!this.subscriptions) await this.fetchSubscriptions();

            const uniqueAccountIds: { [key: number]: number } = {};
            const completedUniqueAccountIds: { [key: number]: number } = {};

            for (const tx of this.transactions!) {
                uniqueAccountIds[tx.account_id] = (uniqueAccountIds[tx.account_id] || 0) + 1;

                if (tx.status === Status.COMPLETED) {
                    completedUniqueAccountIds[tx.account_id] = (completedUniqueAccountIds[tx.account_id] || 0) + 1;
                }
            }

            this.activeAccounts = Object.keys(uniqueAccountIds).length;
            this.completedActiveAccounts = Object.keys(completedUniqueAccountIds).length;
        },
        async getRevenue() {
            if (!this.transactions) await this.fetchTransactions();

            if (!this.revenue) {
                this.revenue = {};

                const revenueTransactions = ['Airtime Purchase', 'Merchant Payment', 'Subscription Purchase'];

                this.completedTransactions.forEach(tx => {
                    const { description, amount } = tx;

                    if (revenueTransactions.includes(description)) {
                        let actualRevenue;
                        if (description === 'Airtime Purchase') {
                            actualRevenue = amount * .06;
                        } else if (description.includes('Merchant Payment')) {
                            actualRevenue = amount * .12;
                        }

                        if (!this.revenue![description]) this.revenue![description] = { total: 0 };

                        this.revenue![description].total += amount;

                        if (actualRevenue) {
                            if (!this.revenue![description]?.actual) this.revenue![description].actual = 0;

                            this.revenue![description].actual! += actualRevenue;
                        }

                        return this.revenue!;
                    }
                }, {});
            }
        }
    }
});