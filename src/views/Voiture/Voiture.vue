<template>
  <div class="about ">
    <div class="container mt-10">
      <div class="flex items-center justify-between my-2">
        <div class="">
          <router-link to="/voiture/ajouter" class="btn bg-[#1d375f] text-white"> NOUVEAUX</router-link>
        </div>
        <div class="text-[#1d375f]">
          <h1 class="text-[40px]">Liste des toute voitures ({{ array.length }})</h1>
        </div>
        <div class="flex items-center justify-between">
          <input class="recherche w-[300px]" type="search" v-model="query" placeholder="Recherche..." />
          <!-- Modal achat de card -->
          <button type="button" class="relative text-[#1d375f] text-xxl" data-bs-toggle="modal"
            data-bs-target="#exampleModal">
            <i class="fa-solid fa-cart-shopping mx-3" style="font-size: 1.9rem"></i><span
              class="absolute -top-3 right-2 text-red-500 font-extrabold">{{ nbCarValue.length }}</span>
          </button>
          <modal-card-achat > </modal-card-achat>
        </div>
      </div>
      <table class="table table-hover  text-sm ">
        <thead>
          <tr class="text-sm leading-normal  bg-secondary text-white">
           
            <th class="py-2 px-4 uppercase text-base text-grey-light border-b border-grey-light text-left">
              Image
            </th>
            <th class="py-2 px-4  uppercase text-base text-grey-light border-b border-grey-light text-left">
              Marque
            </th>
            <th class="py-2 px-4   uppercase text-base text-grey-light border-b border-grey-light text-left">
              Modele
            </th>
            <th class="py-2 px-4   uppercase text-base text-grey-light border-b border-grey-light text-left">
              DÉSIGNATION
            </th>
            <th class="py-2 px-4 uppercase text-base text-grey-light border-b border-grey-light text-left">
              PRIX
            </th>
            <th class="py-2 px-4 uppercase text-base text-grey-light border-b border-grey-light text-left">
              QUANTITÉ
            </th>
            <th class="py-2 px-4   text-base text-grey-light border-b border-grey-light text-center">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody class="overflow-x-scroll ">
          <tr class="hover:bg-gray-400 " v-for="(data, index) in paginatedData" v-bind:key="index">
            <td class="py-2 px-4 border-b border-grey-light text-base  text-left">
              <div class="">
                <img class=" justify-center grid rounded-lg h-[80px] object-cover"  width="100" height="80"
                :src="`http://localhost:3000/images/${data.image}`"
                  alt="voiture.image" />
              </div>
            </td>
            <td class="py-2 px-4 border-b border-grey-light text-base  text-left">{{ data.marque }}</td>
            <td class="py-2 px-4 border-b border-grey-light text-base  text-left">{{ data.modele }}</td>
            <td class="py-2 px-4 border-b border-grey-light text-base  text-left">{{ data.design }}</td>
            <td class="py-2 px-4 border-b border-grey-light text-base  text-left">{{ data.prix }}€ </td>
            <td class="py-2 px-4 border-b border-grey-light text-base  text-center">{{ data.nombre }}</td>
            <td class="py-2 px-4 border-b border-grey-light text-lg text-center w-96">
              <div class=" flex items-end justify-around  ">q
                <router-link :to="`/voiture/modifier/${data.id}`" class="btn btn-warning" style="margin-right:5px;">
                  Modifier</router-link>
                <a @click.prevent="deleteCli(data.id)" class="btn btn-danger ml-2"> Supprimer</a>
                <a @click.prevent="addCart(data.id, data)" class="btn btn-secondary ml-2">
                  Add
                </a>
                <!-- <a class="btn btn-success ml-2" @click="upload(data.id)">
                  Importer
                </a>
                <input type="file" class="form-control hidden" id="import" @change="handleFileUpload"
                  placeholder="Contact ou Tele"> -->
              </div>
            </td>
          </tr>
        </tbody>
        <div class="flex items-center  uppercase  py-3">
          <a href="" @click.prevent="preve()" class="btn bg-[#1d375f] text-white mr-3"
            :class="disableP ? 'disabled' : ''">
            previous
          </a>
          <a href="" @click.prevent="next()" class="btn bg-[#1d375f] text-white" :class="disableN ? 'disabled' : ''">
            next
          </a>
        </div>

      </table>

    </div>

  </div>
</template>
<script>
import Axios from "@/service/caller.service";
import Swal from 'sweetalert2';
import { mapActions, mapGetters } from "vuex";
import ModalCardAchat from "@/components/ModalCardAchat.vue";
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
  name: "Voiture",
  components: {
    ModalCardAchat
  },
  data() {
    return {
      itemsPerPage: 9,
      first: 0,
      query: '',
      disableP: true,
      disableN: false,
      array: [],
      carImage: null,
      id: null
    }
  },
  mounted() {
  },
  computed: {
    paginatedData() {
      if (this.query != '') {
        this.first = 0
        const query = this.query.toLowerCase();
        var data = this.array.filter((item) => {
          return item.marque.toLowerCase().includes(query)
            || item.modele.toLowerCase().includes(query)
            || item.prix.toString().toLowerCase().includes(query)
        });
        const endIndex = this.first + this.itemsPerPage;
        return data.slice(this.first, endIndex);
      }
      if (!this.array) {
        return [];
      }
      const endIndex = this.first + this.itemsPerPage;
      return this.array.slice(this.first, endIndex);

    },
    ...mapGetters(['nbCarValue'])
  },
  async created() {
    try {
      var donne = await Axios.get('/voiture')
      this.array = donne.data
      if (this.first < this.array.length && this.array.length <= this.itemsPerPage) {
        this.disableN = true
        this.disableP = true
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    ...mapActions(['actionValueModal']),
    async deleteCli(id) {
      await Swal.fire({
        title: "Est-vous sûr de la supprimer?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonText: "Annuler",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, Supprime-le!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            var donne = await Axios.delete(`/voiture/delete/${id}`)
            Swal.fire({
              title: "Suppresion!",
              text: "Your file has been deleted.",
              timer: 1500,
              icon: "success"
            });
            console.log("success", donne)
          } catch (error) {
            console.log("error", error)
          }
        }
      });
    },

    async upload(id) {
      if (this.carImage != null) {
        const formData = new FormData()
        formData.append('image', this.carImage)
        try {
          const res = await Axios.put(`/voiture/importer/${id}`, formData)
          console.log(res)
          Toast.fire({
            icon: "success",
            text: "Image du voiture importer avec success"
          });
          this.$router.push("/voitures");
        } catch (error) {
          console.error(error)
        }
      } else {
        Toast.fire({
          icon: "error",
          text: "Aucun file Image a inseret "
        });
      }
    },
    //#################
    async handleFileUpload(event) {
      this.carImage = event.target.files[0];
      console.log(this.carImage)
    },


    addCart(id, data) {
      if (this.nbCarValue.length == 0) {
        // this.nbCarValue.push(data)
        this.actionValueModal(data)
      } else {
        var isDans = this.nbCarValue.filter((item) => {
          return item.id.toString().toLowerCase().includes(id)
        });
        if (isDans.length == 0) {
          this.actionValueModal(data)
          // this.nbCarValue.push(data)
        } else {
          Toast.fire({
            icon: "warning",
            text: "cette voiture est deja dans cart"
          });
        }
      }
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

.recherche {
  width: 200px;
  border: #2c3e50 1px solid;
  border-radius: 25px;
  padding: 5px;
  padding-left: 10px;
}
</style>