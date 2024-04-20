<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
            <div
                class="relative flex max-w-[500px]  overflow overflow-y-auto w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3]">
                <div class="modal-content">
                    <div
                        class="!z-5 relative flex h-full w-full flex-col rounded-[20px] bg-white bg-clip-border p-4 shadow-3xl shadow-shadow-500">
                        <div class="modal-header p-0">
                            <div class="mb-8 w-full">
                                <h4 class="text-xl font-bold text-navy-700 text-black">
                                    Tous les voiture commander
                                </h4>
                                <p class="mt-2 text-base text-gray-600">
                                    Here you can find more details about your projects. Keep you user
                                    engaged by providing meaningful information.
                                </p>
                            </div>
                        </div>
                        <div class="modal-body p-0">
                            <div class="max-h-[600px] overflow-auto" v-if="isAchete">
                                <div class="flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 "
                                    v-for="(dd, index) in nbCarValue" :key="index">
                                    <div class="flex items-center">
                                        <div class="">
                                            <img class="justify-center grid h-[80px] object-cover rounded-lg" width="375"
                                                height="200" :src="`http://localhost:3000/images/${dd.image}`"
                                                alt="voiture Mercedes" />
                                        </div>
                                        <div class="ml-4">
                                            <p class="text-[22px] font-medium text-navy-700 text-black">
                                                {{ dd.marque + " " + dd.modele }}
                                            </p>
                                            <p class="mt-2 w-[250px] h-5 overflow-auto text-sm text-gray-600">
                                                {{ dd.design }}
                                            </p>
                                            <a class="ml-1 font-medium text-brand-500 hover:text-brand-500 text-black"
                                                href=" ">
                                                voir en detaille
                                            </a>
                                        </div>
                                    </div>
                                    <div @click="effacePanier(dd.id)"
                                        class="mr-4 flex items-center justify-center text-red-600 text-lg">
                                        <i class="fa-solid fa-minus cursor-pointer"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="max-h-[600px] my-6" v-if="!isAchete">

                                <div class="my-4">
                                    <h3 class="text-left text-[22px] pb-2">Noms du Client</h3>
                                    <VueMultiselect :model-value="id" @update:model-value="updateSelectedOne"
                                        :options="optionsCli" label="noms" track-by="id"
                                        placeholder="Rechercher et ajouter modele que vous voulez" />
                                </div>
                                <div class="my-4">
                                    <h3 class="text-left text-[18px] pb-2">commande pour {{ id == null ? '' : id.noms }}</h3>
                                    <h2 class="text-left text-[16px]">{{ nbCarValue.length }} voitures </h2>
                                </div>
                                <div class="mt-3 flex flex-wrap gap-3">
                                    <button  v-for="(data, index) in nbCarValue" :key="index"
                                        class="bg-gray-200 hover:bg-gray-300 duration-300 rounded-full px-4 py-2 font-light text-sm">
                                        {{data.marque +' '+data.modele}}
                                    </button>
                                </div>
                            </div>

                            <div class="modal-footer p-0 ">
                                <div class="mt-4 w-full" v-if="isAchete">
                                    <a class="btn btn-primary" @click="isAcheteBool()">
                                        Suivant</a>
                                </div>
                                <div class="flex items-center justify-around w-full">
                                    <div class="mt-4 w-full text-right mr-5" v-if="!isAchete">
                                        <a class="btn btn-primary" @click="isAcheteBool()">
                                            Retour</a>
                                    </div>
                                    <div class="mt-4 w-full text-left" v-if="!isAchete">
                                        <a class="btn btn-primary" @click="ajouter()">
                                            <i class="fa-solid fa-cart-arrow-down mr-1"></i>
                                            <span>Acheter</span></a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapActions, mapGetters } from "vuex";
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
    name: 'CardAchat',
    props: {
    },
    components: {
        VueMultiselect
    },
    data() {
        return {
            isAchete: true,
            achat: {
                id_cli: null,
                voiture: [],
            },
            id: null,
            optionsCli: [],
        }
    },
    computed: {
        ...mapGetters(['nbCarValue'])
    },
    mounted() {
        this.getAllClient()
    },
    methods: {
        ...mapActions(['actionValueModal', 'actionArrayFilter']),
        async ajouter() {
            if (this.achat.voiture.length == 0 || this.achat.id_cli == null) {
                Toast.fire({
                    icon: "warning",
                    text: "Remplire le noms du clients"
                });
            } else {
                console.log(this.achat)
                try {
                    const res = await Axios.post('/achat/ajouter', this.achat)
                    console.log(res.data)
                    Toast.fire({
                        icon: "success",
                        title: "Client add in successfully"
                    });
                    this.$router.push("/voitures");

                } catch (error) {
                    console.error(error)
                }
            }

        },
        effacePanier(id) {
            let car = this.nbCarValue.filter(items => {
                return items.id != id
            })
            this.actionArrayFilter(car)
        },
        isAcheteBool() {
            this.isAchete = !this.isAchete
            this.achat.voiture = this.nbCarValue.map((items) => {
                return {
                    id_voiture: items.id,
                    Qte: 1
                };
            })
        },
        async getAllClient() {
            try {
                var donne = await Axios.get('/client')
                this.optionsCli = donne.data
            } catch (error) {
                console.log(error)
            }
        },
        updateSelectedOne(newValue) {
            this.id = newValue
            this.achat.id_cli = newValue.id
            this.$emit("update:modelValue", newValue);
        },
    }
}
</script>

<
  