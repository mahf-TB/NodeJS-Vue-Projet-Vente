<template>
    <!-- page -->
    <div x-data="layout">
        <div :class="breadcrumbs ? 'bg-white' : 'bg-[#0d1829]'"
            class="fixed  transition duration-[400ms] text-blue-800 px-10 py-1 z-10 w-full">
            <div class="flex items-center justify-between py-2 text-5x1">
                <div :class="breadcrumbs ? '' : text" class="font-bold text-blue-900 text-xl">MyVente<span
                        class="text-orange-600">Voiture</span></div>
                <div :class="breadcrumbs ? '' : 'text-white'" class="text-blue-900">
                    <nav>
                        <router-link to="/" :class="breadcrumbs ? '' : 'text-white'" class="px-4">Home</router-link> |
                        <router-link to="/clients" :class="breadcrumbs ? '' : 'text-white'"
                            class="px-4">Client</router-link> |
                        <router-link to="/voitures" :class="breadcrumbs ? '' : 'text-white'"
                            class="px-4">Voiture</router-link> |
                        <router-link to="/achats" :class="breadcrumbs ? '' : 'text-white'" class="px-4">Commande Achat
                        </router-link>
                    </nav>
                </div>
                <div class="flex items-center text-gray-500">
                    <span class="material-icons-outlined p-2 relative cursor-pointe" :class="breadcrumbs?'':'text-white'">
                        <i class="fa-solid fa-bell mx-3" style="font-size: 1.9rem"></i>
                        <span class="absolute -top-2 right-4 text-red-500 font-extrabold"></span>
                    </span>
                    <div class="bg-center bg-cover bg-no-repeat rounded-full inline-block h-12 w-12 ml-2"
                        style="background-image: url(https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg)">
                    </div>
                </div>
            </div>
        </div>

        <!-- <modal-card-achat  :nbCarValue="nbCarValue" > </modal-card-achat> -->
        <!-- container de la page -->
        <div class="pt-28 ">
            <router-view />
        </div>

    </div>
</template>

<script>

import { onMounted, ref } from 'vue';
import router from '@/router';
import ModalCardAchat from "@/components/ModalCardAchat.vue";
import { mapGetters } from 'vuex';
export default {
    name: 'Layout',
    components: {
        ModalCardAchat
    },
    data() {
        return {
            text: 'text-white'
        }
    },
    computed:{
        ...mapGetters(['nbCarValue'])
    },
    setup() {
        const breadcrumbs = ref(true)

        const getBreadcrumbs = () => {
            return router.currentRoute.value.name
        }
        router.afterEach(() => {
            var nameRoute = getBreadcrumbs()
            if (nameRoute == 'Home') {
                breadcrumbs.value = true
            } else {
                breadcrumbs.value = false
            }
        })

        onMounted(() => {
            var nameRoute = getBreadcrumbs()
            if (nameRoute == 'Home') {
                breadcrumbs.value = true
            } else {
                breadcrumbs.value = false
            }
        })
        return {
            breadcrumbs
        }
    },

}
</script> 