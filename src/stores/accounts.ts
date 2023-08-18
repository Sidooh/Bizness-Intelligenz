import { defineStore } from "pinia";
import axios from "@/utils/axios";
import { CONFIG } from "@/config.ts";
import { Account, Invite } from "@nabcellent/sui-vue";

type Acquisition = { id: number, src: string, phone: string, date?: string }
type InvitedCount = { invited: number, converted: number }

export const useAccountsStore = defineStore('accounts', {
    state: () => ({
        accounts: <Account[] | undefined>undefined,
        acquisition: <Acquisition[]>[],
        baseUrl: CONFIG.sidooh.services.accounts.api.url,
        invited: <{ INVITED: InvitedCount, INVITE_CODE: InvitedCount }>undefined,
        invites: <Invite[] | undefined>undefined,
        total_converted: undefined,
        total_invites: undefined,
        acquisition_count_by_src: {}
    }),
    getters: {
        joinedInviteAccounts: state => state.invites.filter(i => i.status === 'ACTIVE'),
        totalSidoohAccounts: state => state.accounts[0].id,
        convergence: state => state.total_converted / state.total_invites * 100,
        inviteRate(state) {
            return this.totalSidoohAccounts / state.invites.length
        },
        acceptanceRate(state) {
            return this.joinedInviteAccounts.length / state.invites.length
        },
        viralCoefficient(state) {
            return this.totalSidoohAccounts / state.invites.length * this.joinedInviteAccounts.length / state.invites.length
        },
    },
    actions: {
        async fetchAccounts() {
            const { data: res } = await axios.get(`${this.baseUrl}/accounts?days=7`);

            this.accounts = res.data;
        },
        async fetchInvites() {
            const { data: res } = await axios.get(`${this.baseUrl}/invites?days=7`);

            this.invites = res.data;
        },

        async getAcquisition() {
            try {
                if (!this.accounts) await this.fetchAccounts()

                this.acquisition = this.accounts!.reduce((curr: Acquisition[], acc: Account) => {
                    const src = acc.inviter_id ? 'INVITE' : (acc.invite_code ?? 'ROOT')

                    if (!this.acquisition_count_by_src[src]) {
                        this.acquisition_count_by_src[src] = 1;
                    } else {
                        this.acquisition_count_by_src[src]++;
                    }

                    return [...curr, {
                        id: acc.id,
                        phone: acc.phone,
                        src,
                        date: acc.created_at
                    }]
                }, [])
            } catch (error) {
                console.error('Error fetching user count:', error);
            }
        },

        async getReferrals() {
            if (!this.accounts) await this.fetchAccounts()
            if (!this.invites) await this.fetchInvites()

            this.invited = this.invites.reduce((i, item) => {
                const inviterId = item.inviter_id;
                const converted = item.status === 'ACTIVE'

                if (!i[item.type]) {
                    i[item.type] = {};
                }

                if (!i[item.type][inviterId]) {
                    i[item.type][inviterId] = { invited: 0, converted: 0, convergence: 0 };
                }

                i[item.type][inviterId].invited++

                if (converted) i[item.type][inviterId].converted++

                i[item.type][inviterId].convergence = Math.round(i[item.type][inviterId].converted / i[item.type][inviterId].invited * 100)

                return i;
            }, {})

            this.total_invites = this.invites.length
            this.total_converted = this.joinedInviteAccounts.length
        }
    },
});