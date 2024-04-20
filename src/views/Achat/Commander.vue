<template>
    <div class="about">
        <div class="container mt-10">
            <div class=" text-[#1d375f] mb-3">
                <h1 class="text-[40px]">Faite votre commande d'achat voiture</h1>
            </div>
            <div class="container-fluid" style="width: 500px;">
                <form @submit.prevent="ajouter()" method="POST">
                    <div class="modal-body">
                        <div class="my-4">
                            <h3 class="text-left text-[22px] pb-2">Noms du Client</h3>
                            <VueMultiselect :model-value="id" @update:model-value="updateSelectedOne" :options="optionsCli"
                                label="noms" track-by="id" placeholder="Rechercher et ajouter modele que vous voulez" />
                        </div>
                        <div class="my-4">
                            <h3 class="text-left text-[22px] pb-2">Voiture commander</h3>
                            <VueMultiselect :model-value="value" @update:model-value="updateSelected" :options="options"
                                :multiple="true" label="CarModele" track-by="id"
                                placeholder="Rechercher et ajouter modele que vous voulez" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <a href="/clients" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</a>
                        <button type="submit" class="btn btn-primary bg-primary">Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
// import VueMultiselect from "vue-multiselect";
import VueMultiselect from 'vue-multiselect'
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
    name: 'Commander',
    components: {
        VueMultiselect
    },
    data() {
        return {
            achat: {
                id_cli: null,
                voiture: [],
            },
            id: null,
            options: [],
            optionsCli: [],
            value: [],
        }
    },
    computed: {

    },
    mounted() {
        this.getAllClient()
        this.getAllVoiture()
    },
    methods: {
        async ajouter() {
            console.log(this.achat)
            if (this.achat.id_cli != null && this.achat.voiture.length != 0) {
                try {
                    const res = await Axios.post('/achat/ajouter', this.achat)
                    console.log(res)
                    Toast.fire({
                        icon: "success",
                        title: "Client add in successfully"
                    });
                    this.$router.push("/achats");
                } catch (error) {
                    console.error(error)
                }
            } else {
                Toast.fire({
                    icon: "error",
                    title: "achat ne peut pas effectuez , verifier formulaire!"
                });
            }
        },
        async getAllVoiture() {
            try {
                var donne = await Axios.get('/voiture')
                this.options = donne.data.map((items) => {
                    let CarModele = items.marque + ' ' + items.modele
                    return {
                        id: items.id,
                        CarModele: CarModele,
                        qte: items.nombre,
                    };
                })
            } catch (error) {
                console.log(error)
            }
        },
        async getAllClient() {
            try {
                var donne = await Axios.get('/client')
                this.optionsCli = donne.data
            } catch (error) {
                console.log(error)
            }
        },
        updateSelected(newValue) {
            console.log(newValue);
            this.value = newValue
            this.achat.voiture = newValue.map((items) => {
                return {
                    id_voiture: items.id,
                    Qte: 1
                };
            });
            this.$emit("update:modelValue", newValue);
        },
        updateSelectedOne(newValue) {
            console.log(newValue);
            this.id = newValue
            this.achat.id_cli = newValue.id
            this.$emit("update:modelValue", newValue);
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