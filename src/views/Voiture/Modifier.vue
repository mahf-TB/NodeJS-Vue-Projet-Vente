<template>
    <div class="about">
        <div class="container mt-10">
            <div class="text-[#1d375f] mb-3">
                <h1 class="text-[40px]">Modification un voiture</h1>
            </div>
            <div class="container-fluid flex">
                <div class="mx-[120px] mt-4">
                    <label for="importImage">
                        <img :src="carImage" width="500" height="300" alt=""
                            class="rounded-3xl justify-center grid w-[600px] h-[400px] object-cover hover:border-2 hover:border-[#1d375f] cursor-pointer">
                    </label>
                </div>
                <form @submit.prevent="updated()" method="POST">
                    <div class="modal-body w-[500px]">
                        <input type="file" class="form-control hidden" id="importImage" @change="handleFileUpload"
                            placeholder="Contact ou Tele">
                        <div class="form-floating  mb-3">
                            <input type="text" class="form-control" id="floatingAdresse" v-model="car.marque"
                                placeholder="Adresse">
                            <label for="floatingAdresse">Marque</label>
                        </div>
                        <div class="form-floating  mb-3">
                            <input type="text" class="form-control" id="floatingAdresse" v-model="car.modele"
                                placeholder="Adresse">
                            <label for="floatingAdresse">Modele</label>
                        </div>
                        <div class="form-floating mb-3">
                            <textarea rows="4" class="form-control" id="floatingInput" v-model="car.design"
                                style="height: 96px;" placeholder="Votre noms complét"></textarea>
                            <label for="floatingInput">Désignation</label>
                        </div>
                        <div class="form-floating  mb-3">
                            <input type="text" class="form-control" id="floatingAdresse" v-model="car.prix"
                                placeholder="Adresse">
                            <label for="floatingAdresse">Prix</label>
                        </div>
                        <div class="form-floating  mb-3">
                            <input type="text" class="form-control" id="floatingContact" v-model="car.nombre"
                                placeholder="Contact ou Tele">
                            <label for="floatingContact">Qté Disponible</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <a href="/voitures" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</a>
                        <button type="submit" class="btn btn-primary bg-primary">Enregistrer</button>
                    </div>
                </form>
            </div>

        </div>
    </div>
</template>
<script>

import Axios from "@/service/caller.service";
import Swal from 'sweetalert2';
import { onUpdated } from 'vue';
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
    name: 'Ajouter',
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
            },
            carImage: null
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
                console.log("getOneCar", res)
                this.car = {
                    marque: res.data[0].marque,
                    modele: res.data[0].modele,
                    design: res.data[0].design,
                    prix: res.data[0].prix,
                    nombre: res.data[0].nombre,
                    image: res.data[0].image,
                }
                this.carImage = "http://localhost:3000/images/" + res.data[0].image
            } catch (error) {
                console.error(error)
            }
        },
        async updated() {
            console.log(this.car)
            const formData = new FormData();
            formData.append('marque', this.car.marque);
            formData.append('modele', this.car.modele);
            formData.append('design', this.car.design);
            formData.append('prix', this.car.prix);
            formData.append('nombre', this.car.nombre);
            formData.append('image', this.car.image);
            try {
                const res = await Axios.put(`/voiture/${this.id}`, formData)
                console.log(res)
                Toast.fire({
                    icon: "success",
                    title: "updated in successfully"
                });
                this.$router.push("/voitures");
            } catch (error) {
                console.error(error)
            }
        },
        async handleFileUpload(event) {

            if (event.target.files[0].type.match("image/*")) {
                this.car.image = event.target.files[0];
                this.carImage = URL.createObjectURL(this.car.image)
                console.log(this.carImage)
            } else {
                Toast.fire({
                    icon: "error",
                    title: "Erreur, type file n'est pas image"
                });
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