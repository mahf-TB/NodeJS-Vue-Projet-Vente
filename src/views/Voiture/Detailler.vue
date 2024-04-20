<template>
    <div class="about">
        <div class="container mt-10">
            <div class="text-[#1d375f] mb-3">
                <h1 class="text-[40px]">Information du voiture {{ car.marque + ' ' + car.modele }}</h1>
            </div>
            <div class="container-fluid">
                <div class="flex items-start justify-start my-10">
                    <div class="mx-[100px]">
                        <a :href="`http://localhost:3000/images/${car.image}`"> <img
                                :src="`http://localhost:3000/images/${car.image}`" width="500" height="300" alt=""
                                class="rounded-3xl justify-center grid w-[700px] h-[500px] object-cover"></a>
                    </div>
                    <div class="text-left max-w-[650px]">
                        <h1 class="text-[20px] font-semibold mb-5">Marque: <span class="font-light">{{ car.marque }}</span>
                        </h1>
                        <h1 class="text-[20px] font-semibold mb-5">Modele: <span class="font-light">{{ car.modele }}</span>
                        </h1>
                        <h1 class="text-[20px] font-semibold mb-5">Désignation: <span class="font-light">{{ car.design
                        }}</span></h1>
                        <h1 class="text-[20px] font-semibold mb-5">Prix: <span class="font-light">{{ car.prix }} €</span></h1>
                        <div>
                            <router-link to="/"
                                class="text-sm w-[100px] uppercase font-bold  gap-x-2 bg-blue-500 border-2 !border-b-4 border-blue-950 p-[0.7rem]  duration-150 hover:!border-b-2 text-blue-950 rounded-xl drop-shadow-lg group flex items-center cursor-pointer active:bg-yellow-40">
                                Acheter
                            </router-link>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>

import Axios from "@/service/caller.service";
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});
export default {
    name: 'Detailler',
    data() {
        return {
            id: this.$route.params.id,
            car: {
                marque: "",
                modele: "",
                design: "",
                prix: "",
                nombre: "",
                image: null
            }
        }
    },
    mounted() {
        this.getOneCar()
    },
    methods: {
        async getOneCar() {
            console.log(this.car)
            try {
                const res = await Axios.get(`/voiture/${this.id}`)
                console.log("hattt aia roa", res)
                this.car = {
                    marque: res.data[0].marque,
                    modele: res.data[0].modele,
                    design: res.data[0].design,
                    prix: res.data[0].prix,
                    nombre: res.data[0].nombre,
                    image: res.data[0].image,
                }
            } catch (error) {
                console.error(error)
            }
        },
    }
}
</script>
<style>
.about {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>