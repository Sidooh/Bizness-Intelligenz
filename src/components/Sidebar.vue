<template>
    <nav class="navbar navbar-light navbar-vertical navbar-expand-xl"
         :class="[sideNavStyle, store.isNavbarVerticalCollapsed]">
        <div class="d-flex align-items-center">
            <div class="toggle-icon-wrapper" @click="toggleNav">
                <button class="btn navbar-toggler-humburger-icon navbar-vertical-toggle" data-bs-toggle="tooltip"
                        data-bs-placement="left" title="" data-bs-original-title="Toggle Navigation"
                        aria-label="Toggle Navigation">
                    <span class="navbar-toggle-icon"><span class="toggle-line"></span></span>
                </button>
            </div>
            <Logo src="/logo.png" at="navbar-vertical" :width="100"/>
        </div>

        <div class="collapse navbar-collapse" id="navbarVerticalCollapse" @mouseenter="handleMouseEnter"
             @mouseleave="handleMouseLeave">
            <div class="navbar-vertical-content scrollbar">
                <ul class="navbar-nav flex-column mb-3" id="navbarVerticalNav">
                    <li v-for="route in routes" class="nav-item">
                        <div v-if="route.label" class="row navbar-vertical-label-wrapper mt-3 mb-2">
                            <div class="col-auto navbar-vertical-label">App</div>
                            <div class="col ps-0">
                                <hr class="mb-0 navbar-vertical-divider">
                            </div>
                        </div>

                        <template v-for="child in route.children">
                            <router-link class="nav-link" :to="child.to" exact-active-class="active"
                                         :class="{'dropdown-indicator':child.children}" aria-expanded="false">
                                <div class="d-flex align-items-center">
                                    <span class="nav-link-icon"><v-icon :name="child.icon ?? ''"/></span>
                                    <span class="nav-link-text ps-1">{{ child.name }}</span>
                                </div>
                            </router-link>

                            <ul v-if="child.children" class="flex-column nav collapse show navbar-nav"
                                :class="{'show':child.active}">
                                <li v-for="grandChild in child.children" class="nav-item">
                                    <router-link class="nav-link" :to="grandChild.to" exact-active-class="active">
                                        <div class="d-flex align-items-center">
                                            <span class="nav-link-text ps-1">{{ grandChild.name }}</span>
                                        </div>
                                    </router-link>
                                </li>
                            </ul>
                        </template>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { useCoreStore } from "@/stores/core";
import { computed } from "vue";
import { Logo, RouteType } from "@nabcellent/sui-vue";

const store = useCoreStore()
const toggleNav = () => store.toggleSideNav()

const sideNavStyle = computed(() => store.navbarStyle !== 'transparent' ? `navbar-${store.navbarStyle}` : '')

const HTMLClassList = document.getElementsByTagName('html')[0].classList;

let time: number;
const handleMouseEnter = () => {
    if (store.isNavbarVerticalCollapsed) {
        time = window.setTimeout(() => {
            HTMLClassList.add('navbar-vertical-collapsed-hover');
        }, 100);
    }
};

const handleMouseLeave = () => {
    clearTimeout(time);
    HTMLClassList.remove('navbar-vertical-collapsed-hover');
};

const routes: RouteType[] = [
    {
        children: [
            {
                to: 'overview',
                name: 'Overview',
                icon: 'fa-chart-pie',
            }, {
                to: 'accounts',
                name: 'Accounts',
                icon: 'md-supervisoraccount-outlined',
            }, {
                to: 'transactions',
                name: 'Transactions',
                icon: 'md-currencyexchange',
            }, {
                to: 'revenue',
                name: 'Revenue',
                icon: 'gi-money-stack',
            }
        ]
    },
    /*{
        label: 'App', children: [
            { to: '/users', name: 'Users', icon: faUsersBetweenLines },
            { to: '/accounts', name: 'Accounts', icon: faUsersRays },
            { to: '/invites', name: 'Invites', icon: faPeopleArrows },
            { to: '/security-questions', name: 'Security Questions', icon: faCircleQuestion },
        ]
    }*/
]
</script>