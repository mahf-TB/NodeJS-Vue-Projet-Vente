<template>
    <div class="about">

        <div class="container mt-10">
            <div class="flex  items-center justify-between my-2">
                <div class="">
                    <router-link to="/commander" class="btn bg-[#1d375f] text-white uppercase"> commander</router-link>
                </div>
                <div class="text-[#1d375f]">
                    <h1 class="text-[40px]">Liste des toute achat éffectué ({{ array.length }})</h1>
                </div>
                <div class="">
                    <input class="recherche w-[300px]" type="search" v-model="query" placeholder="Recherche..." />
                </div>
            </div>
            <table class="table table-hover  text-sm ">
                <thead>
                    <tr class="text-sm leading-normal  bg-secondary text-white">
                        <th
                            class="py-2 px-4 bg-grey-lightest uppercase text-base text-grey-light border-b border-grey-light text-left">
                            N° D'ACHAT
                        </th>
                        <th
                            class="py-2 px-4 bg-grey-lightest uppercase text-base text-grey-light border-b border-grey-light text-left">
                            NOMS
                        </th>
                        <th
                            class="py-2 px-4 bg-grey-lightest uppercase text-base text-grey-light border-b border-grey-light text-left">
                            CONTACT
                        </th>
                        <th
                            class="py-2 px-4 bg-grey-lightest  uppercase text-base text-grey-light border-b border-grey-light text-left">
                            DÉSIGNATION
                        </th>
                        <th
                            class="py-2 px-4 bg-grey-lightest  uppercase text-base text-grey-light border-b border-grey-light text-left">
                            QUANTITÉ
                        </th>
                        <th
                            class="py-2 px-4 bg-grey-lightest  uppercase text-base text-grey-light border-b border-grey-light text-left">
                            PRIX TOTAL
                        </th>
                        <th
                            class="py-2 px-4 bg-grey-lightest  uppercase text-base text-grey-light border-b border-grey-light text-left">
                            Date d'achat
                        </th>
                        <th
                            class="py-2 px-4 bg-grey-lightest  text-lg-center text-base text-grey-light border-b border-grey-light text-right">
                            ACTION
                        </th>
                    </tr>
                </thead>
                <tbody class="overflow-x-scroll ">
                    <tr class="hover:bg-gray-400" v-for="(data, index) in paginatedData" v-bind:key="index">
                        <td class="py-2 px-4 border-b border-grey-light  text-base  text-left">{{ data.num_achat }}</td>
                        <td class="py-2 px-4 border-b border-grey-light  text-base  text-left">{{ data.noms }}</td>
                        <td class="py-2 px-4 border-b border-grey-light  text-base  text-left">{{ data.contact }}</td>
                        <td class="py-2 px-4 border-b border-grey-light  text-base  text-left">
                            <div class="max-h-24 overflow-x-hidden">
                                {{ data.marques }}
                            </div></td>
                        <td class="py-2 px-4 border-b border-grey-light  text-base  text-center">{{ data.Qte }}</td>
                        <td class="py-2 px-4 border-b border-grey-light  text-base  text-left">{{ data.prixTotal }}€</td>
                        <td class="py-2 px-4 border-b border-grey-light  text-base  text-center">{{ data.dateAchat }}</td>
                        <td class="py-2 px-4 border-b border-grey-light text-lg-right ">
                            <div class="flex items-center justify-between">
                                <a class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                    @click="getOneAchat(data.num_achat)">
                                    Detailler
                                </a>
                                <div class="ml-2">
                                    <a href="" class="btn btn-primary" style="margin-right: 5px;"> Modifier</a>
                                </div>
                                <div class="">
                                    <a href="/card" class="btn btn-success " >
                                       Card</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <div class="flex items-center uppercase  py-3">
                    <a href="" @click.prevent="preve()" class="btn bg-[#1d375f] text-white mr-3"
                        :class="disableP ? 'disabled' : ''">
                        previous
                    </a>
                    <a href="" @click.prevent="next()" class="btn bg-[#1d375f] text-white"
                        :class="disableN ? 'disabled' : ''">
                        next
                    </a>
                </div>
            </table>
            <generer-facture :achatTable="achatTable"></generer-facture>
        </div>
    </div>
</template>
<script>
import Axios from "@/service/caller.service";
import html2pdf from 'html2pdf.js'
import GenererFacture from "@/components/GenererFacture.vue";
export default {
    name: "Achat",
    components: { GenererFacture },
    data() {
        return {
            achatTable: null,
            itemsPerPage: 10,
            first: 0,
            query: '',
            array: [],
            disableP: true,
            disableN: false,
        }
    },
    computed: {
        paginatedData() {
            if (this.query != '') {
                this.first= 0
                const query = this.query.toLowerCase();
                var data = this.array.filter((item) => {
                    return item.noms.toLowerCase().includes(query)
                        || item.contact.toLowerCase().includes(query)
                        || item.prixTotal.toString().toLowerCase().includes(query)
                });
                this.length = data.length
                const endIndex = this.first + this.itemsPerPage;
                return data.slice(this.first, endIndex);
            }
            if (!this.array) {
                return [];
            }
            const endIndex = this.first + this.itemsPerPage;
            return this.array.slice(this.first, endIndex);

        }
    },
    async created() {
        try {
            var donne = await Axios.get('/achat')
            console.log(donne)
            this.array = donne.data.map((items) => {
                return {
                    noms: items.noms,
                    contact: items.contact,
                    marques: items.marques,
                    num_achat: items.num_achat,
                    nb_voitures: items.nb_voitures,
                    Qte: items.Qte,
                    dateAchat: items.dateAchat,
                    prixTotal: items.prixTotal,
                    isValide: items.prixTotal > 200000 ? true : false
                };
            })
            console.log(this.array)


            if (this.first < this.array.length && this.array.length <= this.itemsPerPage) {
                this.disableN = true
                this.disableP = true
            }
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        async generatePDF(id) {
            console.log(id)
            this.getOneAchat(id)
            var element = document.getElementById('element-to-print');
            html2pdf(element, {
                margin: 1,
                filename: 'facture.pdf'
            });
        },
        next() {
            var jj = this.first + this.itemsPerPage

            if (jj < this.array.length) {
                this.first = this.first + this.itemsPerPage
                if (jj < this.array.length && this.array.length <= jj + this.itemsPerPage) {
                    this.disableN = true
                }
                this.disableP = false
            } else {
                this.disableN = true
            }
        },
        preve() {
            if (this.first > 0) {
                this.first = this.first - this.itemsPerPage
                if (this.first == 0) {
                    this.disableP = true
                }
                this.disableN = false
            } else {
                this.disableP = true
            }
        },
        async getOneAchat(id) {
            try {
                const res = await Axios.get(`/achat/pdf/${id}`)
                console.log(res)
                this.achatTable = res.data
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

.recherche {
    width: 200px;
    border: #2c3e50 1px solid;
    border-radius: 25px;
    padding: 5px;
    padding-left: 10px;
}
</style>