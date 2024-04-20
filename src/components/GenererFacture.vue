<template>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content ">
                <div class="modal-header">
                    <!-- <h5 class="modal-title" id="exampleModalLabel">Facture by My Vente Voiture</h5> -->
                    <h1 class="modal-title">Facture by <span class="izy">My Vente Voiture</span> Vue.js App</h1>
                    <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body bg-[#F8F9FA]">
                    <!-- Contenu de la facture -->
                    <div id="element-to-print" class="bg-white mx-6 my-3 p-3 shadow">
                        <div class="text-center">
                            <h1 class="text-[20px] mb-4">Facture <span> N°: {{ achatTable == null ? '' :
                                achatTable[0].num_achat
                            }} </span></h1>
                        </div>
                        <div class="text-left">
                            <div class="m-2 p-2">
                                <h2>Date de facturation : {{ achatTable == null ? '' : achatTable[0].dateAchat }}</h2>
                            </div>
                            <div class="m-2 p-2">
                                <h2>Nom du Client : {{ achatTable == null ? '' : achatTable[0].noms }}</h2>
                            </div>
                            <div class="m-2 p-2">
                                <h2>Contact : {{ achatTable == null ? '' : achatTable[0].contact }}</h2>
                            </div>
                        </div>
                        <div class="w-full mt-5 ">
                            <table class="table border-1 text-sm">
                                <thead class="w-full">
                                    <tr class="border-1 border-gray-600">
                                        <th class="border-l-[2px] border-gray-600">Désignation</th>
                                        <th class="border-l-[2px] border-gray-600">Quantité</th>
                                        <th class="border-l-[2px] border-gray-600">Prix Unitaire</th>
                                        <th class="border-l-[2px] border-gray-600">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="border-1 border-gray-600" v-for="(dd, index) in achatTable" :key="index">
                                        <td class="border-l-[2px] border-gray-600">{{ dd.marques }}</td>
                                        <td class="border-l-[2px]  border-gray-600">{{ dd.Qte }}</td>
                                        <td class="border-l-[2px]  border-gray-600">{{ dd.prix }}</td>
                                        <td class="border-l-[2px]  border-gray-600">{{ dd.prixTotal }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="text-right">
                            <div class="m-2 p-2">
                                <h2>Somme Total : {{ isPrixTotal }}</h2>
                            </div>
                        </div>
                        <div class="text-center">
                            <div class="m-2 p-2">
                                <h2>Arrete par la presente facture a la somme de {{ convertirNombreEnLettre(isPrixTotal) }}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button class="btn btn-primary" @click.prevent="generatePDF()">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import Axios from "@/service/caller.service";
import Swal from 'sweetalert2';
import html2pdf from 'html2pdf.js'
export default {
    name: 'GenererPDF',
    props: {
        achatTable: Object
    },
    data() {
        return {
        }
    },
    computed: {
        isPrixTotal() {
            if (this.achatTable != null) {
                var prix = 0
                this.achatTable.forEach(element => {
                    prix = prix + element.prixTotal
                });
                return prix
            }
        }

    },
    methods: {
        async generatePDF() {
            var element = document.getElementById('element-to-print');
            const options = {
                margin: 10,
                filename: 'custom-facture.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf(element).set(options).save();
        },
        convertirNombreEnLettre(nombre) {
            const unite = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
            const dizaine = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'];
            const special = ['', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
            const puissanceDeDix = ['', 'mille', 'million', 'milliard', 'billion', 'billiard', 'trillion', 'trilliard'];

            let result = '';

            if (nombre === 0) {
                return 'zéro';
            }

            if (nombre < 0 || nombre >= 1e15) {
                return 'Nombre non géré';
            }

            for (let i = 0; nombre > 0; i++) {
                let triplet = nombre % 1000;
                nombre = Math.floor(nombre / 1000);

                let centaines = Math.floor(triplet / 100);
                let dizaines = Math.floor((triplet % 100) / 10);
                let unites = triplet % 10;

                let tripletEnLettre = '';

                if (centaines > 0) {
                    tripletEnLettre += unite[centaines] + ' cent ';
                }

                if (dizaines === 1 && unites > 0) {
                    tripletEnLettre += special[unites];
                } else if (dizaines === 7 || dizaines === 9) {
                    tripletEnLettre += dizaine[dizaines] + '-' + unite[unites];
                } else {
                    tripletEnLettre += dizaine[dizaines] + ' ' + unite[unites];
                }

                if (tripletEnLettre !== '') {
                    if (i > 0) {
                        tripletEnLettre += ' ' + puissanceDeDix[i];
                    }

                    if (result !== '') {
                        result = tripletEnLettre + ' ' + result;
                    } else {
                        result = tripletEnLettre;
                    }
                }
            }

            return result;
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