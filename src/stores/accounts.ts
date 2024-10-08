import { defineStore } from 'pinia';
import axios from '@/utils/axios';
import { CONFIG } from '@/config.ts';
import { Account, Invite, InviteType } from '@nabcellent/sui-vue';

interface Acquisition {
    id: number,
    src: string,
    phone: string,
    date?: string
}

type InvitedCount = { invited: number, converted: number, convergence: number }

interface InvitedInfo {
    [inviterId: string]: InvitedCount;
}

interface State {
    accounts: Account[] | undefined;
    baseUrl: string;
    invites: Invite[] | undefined;
    acquisition_count_by_src: Record<string, number>;
}

export const useAccountsStore = defineStore('accounts', {
    state: (): State => ({
        accounts: undefined,
        baseUrl: CONFIG.sidooh.services.accounts.api.url,
        invites: undefined,
        acquisition_count_by_src: {}
    }),
    getters: {
        total_invites: state => state.invites?.length ?? 0,
        total_converted() {
            return this.joinedInviteAccounts.length;
        },
        joinedInviteAccounts(state): Invite[] {
            return state.invites?.filter(i => i.status === 'ACTIVE') ?? [];
        },
        totalSidoohAccounts: (state): number => {
            return (state.accounts && state.accounts[0] ? state.accounts[0].id : undefined) || 0;
        },
        convergence(): number {
            return this.total_converted / this.total_invites * 100;
        },
        inviteRate(state): number {
            return this.totalSidoohAccounts || 1 / (state.invites?.length || 1);
        },
        acceptanceRate(state): number {
            return this.joinedInviteAccounts?.length / (state.invites?.length || 1);
        },
        viralCoefficient(state): number {
            return this.totalSidoohAccounts || 1 / (state.invites?.length || 1) * this.joinedInviteAccounts.length / (state.invites?.length || 1);
        },
        acquisition: (state): Acquisition[] | undefined => {
            return state.accounts!.reduce((curr: Acquisition[], acc: Account) => {
                const src = acc.inviter_id ? 'INVITE' : (acc.invite_code ?? 'ROOT');

                if (!state.acquisition_count_by_src[src]) {
                    state.acquisition_count_by_src[src] = 1;
                } else {
                    state.acquisition_count_by_src[src]++;
                }

                const acquisition: Acquisition = {
                    id: acc.id,
                    phone: acc.phone,
                    src,
                    date: acc.created_at
                };

                return [...curr, acquisition];
            }, []);
        },
        invited: (state): { [key in InviteType]: InvitedInfo } | undefined => {
            return state.invites?.reduce((i, item) => {
                const inviterId = item.inviter_id;
                const converted = item.status === 'ACTIVE';
                const type = item.type as InviteType;

                if (!i[type]) i[type] = {};

                if (!i[type][inviterId]) {
                    i[type][inviterId] = { invited: 0, converted: 0, convergence: 0 };
                }

                i[type][inviterId].invited++;

                if (converted) i[type][inviterId].converted++;

                i[type][inviterId].convergence = Math.round(i[type][inviterId].converted / i[type][inviterId].invited * 100);

                return i;
            }, {} as { [key in InviteType]: InvitedInfo });
        }
    },
    actions: {
        async fetchAccounts() {
            const { data: res } = await axios.get(`${this.baseUrl}/accounts?days=7`);

            this.accounts = res.data;
        },
        async fetchInvites() {
            const { data: res } = await axios.get(`${this.baseUrl}/invites?days=7`);

            this.invites = res.data;
        }
    },
});