<template>
    <div class="about">
        <div class="container mt-10">
            <div class="text-[#1d375f] mb-3">
                <h1 class="text-[40px]">Information d'un Client: {{ user.noms }}</h1>
            </div>
            <div class="container-fluid" style="width: 500px;">
                <form @submit.prevent="updated()" method="POST">
                    <div class="modal-body">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput" v-model="user.noms"
                                placeholder="Votre noms complét">
                            <label for="floatingInput">Noms</label>
                        </div>
                        <div class="form-floating  mb-3">
                            <input type="text" class="form-control" id="floatingAdresse" v-model="user.adresse"
                                placeholder="Adresse">
                            <label for="floatingAdresse">Adresse</label>
                        </div>
                        <div class="form-floating  mb-3">
                            <input type="text" class="form-control" id="floatingContact" v-model="user.contact"
                                placeholder="Contact ou Tele">
                            <label for="floatingContact">Contact</label>
                        </div>
                        <div class="form-floating  mb-3">
                            <input type="text" class="form-control" id="floatingContact" v-model="user.email"
                                placeholder="Contact ou Tele">
                            <label for="floatingContact">Email</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <a href="/clients" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</a>
                        <button type="submit" class="btn btn-primary bg-primary">Modifier</button>
                    </div>
                </form>
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
    name: 'Modifier',
    data() {
        return {
            user: {
                noms: "",
                adresse: "",
                contact: "",
                email: "",
            },
            id: this.$route.params.id
        }
    },
    mounted() {
        this.getOneClient()
    },
    methods: {
        async getOneClient() {
            console.log(this.car)
            try {
                const res = await Axios.get(`/client/${this.id}`)
                console.log(res)
                this.user = {
                    noms: res.data[0].noms,
                    adresse: res.data[0].adresse,
                    contact: res.data[0].contact,
                    email: res.data[0].email,
                }
            } catch (error) {
                console.error(error)
            }
        },
        async updated() {
            try {
                const res = await Axios.put(`/client/${this.id}`, this.user)
                console.log(res)
                Toast.fire({
                    icon: "success",
                    text: "Client updated in successfully"
                });
                this.$router.push("/clients");

            } catch (error) {
                console.error(error)
            }
        }
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