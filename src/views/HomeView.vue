<template>
  <div class="home about transition duration-[400ms]  bg-[#0d1829] z-1">
    <div class="pt-14 text-white text-[62px]">
      <h1>Bienvenue dans <span class="izy">My Vente Voiture</span> Vue.js App</h1>
    </div>
    <div class='grid grid-cols sm:grid-cols-2 lg:grid-cols-4 h-full py-14'>
      <div class='mx-auto bg-white rounded-3xl shadow-xl mb-16' v-for="(data, index) in arrayCar" v-bind:key="index">
        <div class="grid rounded-3xl max-w-[370px] shadow-sm bg-slate-100  flex-col">
          <img :src="`http://localhost:3000/images/${data.image}`" width="375" height="200"
            class="rounded-t-3xl justify-center grid h-80 object-cover" alt="voiture Image.title" />

          <div class="group p-6 grid z-1">
            <a href="" class="group-hover:text-cyan-700 font-bold sm:text-2xl line-clamp-2">
              {{ data.marque + " " + data.modele }}
            </a>
            <span class="text-slate-400 pt-2 font-semibold">
              Reste ({{ data.nombre }})
            </span>
            <div class="h-14 overflow-scroll mb-2">
              <span class="line-clamp-4 py-2 text-sm font-light leading-relaxed">
                {{ data.design }}
              </span>
            </div>
            <div class=" grid-cols-2 flex group justify-between">
              <div class="font-black flex flex-col items-start">
                <span class="text-yellow-500 text-xl ">Prix</span>
                <span class="text-3xl flex gap-x-1 items-center group-hover:text-yellow-600">
                  € {{ data.prix }}
                </span>
              </div>
              <div class="flex flex-col items-end">
                <div class="h-7" />
                <div 
                  class="bg-yellow-500  border-2 !border-b-4 border-blue-950  duration-150 hover:!border-b-2 text-blue-950 rounded-xl drop-shadow-lg group flex items-center cursor-pointer active:bg-yellow-400">
                  <div class="py-2 px-3">
                    <router-link :to="`/voiture/detaille/${data.id}`" class="text-sm  font-bold  gap-x-2">
                      Savoir Plus
                    </router-link>
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
// @ is an alias to /src
import Axios from "@/service/caller.service";
import { mapActions } from "vuex";
export default {
  name: 'HomeView',
  components: {

  },
  data() {
    return {
      arrayCar: null,
      carImage: null
    }
  },
  async created() {
    try {
      var donne = await Axios.get('/voiture')
      this.arrayCar = donne.data
      console.log(this.arrayCar)
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    ...mapActions(['actionValueModal']),
    //#################
  }
}
</script>
<style>
.izy {
  color: #42b983;
}
</style>
