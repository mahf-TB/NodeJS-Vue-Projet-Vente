<template>
  <div class="about ">
    <div class="container mt-10">
      <div class="flex items-center justify-between my-2 ">
        <div class="">
          <router-link to="/client/ajouter" class="btn bg-[#1d375f] text-white"> NOUVEAUX</router-link>
        </div>
        <div class="text-[#1d375f]">
          <h1 class="text-[40px]">Liste des toute clients ({{ array.length }})</h1>
        </div>
        <div class="">
          <input class="recherche w-[300px]" type="search" v-model="query" placeholder="Recherche..." />
        </div>
      </div>
      <table class="table table-hover  text-sm ">
        <thead>
          <tr class="text-sm leading-normal  bg-secondary text-white">
            <th
              class="py-2 px-4 bg-grey-lightest  uppercase text-base text-grey-light border-b border-grey-light text-left">
              N°
            </th>
            <th
              class="py-2 px-4 bg-grey-lightest  uppercase text-base  text-grey-light border-b border-grey-light text-left">
              NOMS
            </th>
            <th
              class="py-2 px-4 bg-grey-lightest uppercase text-base text-grey-light border-b border-grey-light text-left">
              ADRESSE
            </th>
            <th
              class="py-2 px-4 bg-grey-lightest  uppercase text-base text-grey-light border-b border-grey-light text-left">
              CONTACT
            </th>
            <th
              class="py-2 px-4 bg-grey-lightest  uppercase text-base text-grey-light border-b border-grey-light text-left">
              Email
            </th>
            <th
              class="py-2 px-4 bg-grey-lightest  uppercase text-base text-grey-light border-b border-grey-light text-left">
              date Ajouter
            </th>
            <th
              class="py-2 px-4 bg-grey-lightest  text-lg-center text-base-center text-grey-light border-b border-grey-light text-right">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody class="overflow-x-scroll ">
          <tr class="hover:bg-gray-400 " v-for="(data, index) in paginatedData" v-bind:key="index">
            <td class="py-2 px-4 border-b border-grey-light  text-base text-left w-[30px]"><div class="min-"> {{ data.id }}</div></td>
            <td class="py-2 px-4 border-b border-grey-light  text-base text-left">{{ data.noms }}</td>
            <td class="py-2 px-4 border-b border-grey-light text-base text-left">{{ data.adresse }}</td>
            <td class="py-2 px-4 border-b border-grey-light text-base text-left">{{ data.contact }}</td>
            <td class="py-2 px-4 border-b border-grey-light text-base text-left">{{ data.email }}</td>
            <td class="py-2 px-4 border-b border-grey-light text-base text-left">{{ data.dateAjouter }}</td>
            <td class="py-2 px-4 border-b border-grey-light text-lg-right">
              <div class="flex items-center justify-between">
                <div class="">
                  <router-link :to="`/client/modifier/${data.id}`" class="btn btn-warning" style="margin-right: 5px;"> Modifier</router-link>
                </div>
                <div class="">
                  <a href="" @click.prevent="deleteCli(data.id)" class="btn btn-danger">Supprimer</a>
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
export default {
  name: "Client",
  data() {
    return {
      itemsPerPage: 10,
      first: 0,
      query: '',
      array: [],
      disableP: true,
      disableN: false,
      route: ""
    }
  },
  computed: {
    paginatedData() {
      if (this.query != '') {
        this.first= 0
        const query = this.query.toLowerCase();
        var data = this.array.filter((item) => {
          return item.noms.toLowerCase().includes(query)
            || item.adresse.toLowerCase().includes(query)
            || item.contact.toLowerCase().includes(parseFloat(query))
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
      var donne = await Axios.get('/client')
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
            var donne = await Axios.delete(`/client/delete/${id}`)
            console.log(donne.data)

            Swal.fire({
              title: "Suppresion!",
              text: "Your file has been deleted.",
              timer: 1500,
              icon: "success"
            });
          } catch (error) {
            console.log(error)
          }
        }
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
    goToRoute(id){
      this.route = `/client/modifier/${id}`
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