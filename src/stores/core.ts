import { defineStore } from "pinia";


export const useCoreStore = defineStore("core", {
    state: () => ({
        isNavbarVerticalCollapsed: false,
        theme: 'light',
        isFluid: false,
        navbarStyle: 'transparent',
        navbarPosition: 'vertical'
        // isFluid: false, JSON.parse(localStorage.getItem("isFluid"))
    }),

    actions: {
        toggleLayout() {
            this.isFluid = !this.isFluid
            localStorage.setItem('isFluid', String(this.isFluid))
        },
        toggleTheme() {
            this.theme = this.theme === 'dark' ? 'light' : 'dark'
            // localStorage.setItem('theme', this.theme)

            if (this.theme === 'dark')
                document.documentElement.classList.add('dark')
            else
                document.documentElement.classList.remove('dark');

        },
        toggleSideNav() {
            this.isNavbarVerticalCollapsed = !this.isNavbarVerticalCollapsed
            // localStorage.setItem('isNavbarVerticalCollapsed', String(this.isNavbarVerticalCollapsed))

            if (this.isNavbarVerticalCollapsed)
                document.documentElement.classList.add('navbar-vertical-collapsed');
            else
                document.documentElement.classList.remove('navbar-vertical-collapsed');
        }
    }
})