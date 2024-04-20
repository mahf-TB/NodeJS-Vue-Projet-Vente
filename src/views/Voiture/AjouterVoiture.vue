<template>
  <div class="about">

    <div class="container mt-10">
      <div class="text-[#1d375f] mb-3">
        <h1 class="text-[40px]">Ajouter une nouvelle voiture</h1>
      </div>
      <div class="container-fluid" style="width: 500px;">
        <form @submit.prevent="ajouter()" method="POST">
          <div class="modal-body">
            <div class="form-floating  mb-3">
              <input type="text" class="form-control" id="floatingMarque" v-model="car.marque" placeholder="Adresse">
              <label for="floatingMarque">Marque</label>
            </div>
            <div class="form-floating  mb-3">
              <input type="text" class="form-control" id="floatingModele" v-model="car.modele" placeholder="Adresse">
              <label for="floatingModele">Modele</label>
            </div>
            <div class="form-floating mb-3">
              <textarea rows="4" class="form-control" id="floatingInput" v-model="car.design" style="height: 96px;"
                placeholder="Votre noms complét"></textarea>
              <label for="floatingInput">Désignation</label>
            </div>
            <div class="form-floating  mb-3">
              <input type="text" class="form-control" id="floatingPrix" v-model="car.prix" placeholder="Adresse">
              <label for="floatingPrix">Prix</label>
            </div>
            <div class="form-floating  mb-3">
              <input type="text" class="form-control" id="floatingQte" v-model="car.nombre" placeholder="Contact ou Tele">
              <label for="floatingQte">Qté Disponible</label>
            </div>
            <div class="form-floating  mb-3">
              <input type="file" class="form-control" id="floatingImage" @change="handleFileUpload"
                placeholder="Contact ou Tele">
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
  methods: {
    handleFileUpload(event) {
      this.car.image = event.target.files[0];
      console.log(this.car)
    },
    async ajouter() {
      console.log(this.car)
      if (this.car.marque != "" && this.car.modele != "" && this.car.design != "" && this.car.prix != "" && this.car.nombre != "" && this.car.image != null) {
        const formData = new FormData();
        formData.append('marque', this.car.marque);
        formData.append('modele', this.car.modele);
        formData.append('design', this.car.design);
        formData.append('prix', this.car.prix);
        formData.append('nombre', this.car.nombre);
        formData.append('image', this.car.image);
        try {
          const res = await Axios.post('/voiture/ajouter', formData)
          if (res.data.status == 500) {
            console.log(res.data.message)
          } else {
            this.$router.push("/voitures");
            Toast.fire({
              icon: "success",
              title: "Signed in successfully"
            });
          }

        } catch (error) {
          console.error(error)
        }
      }else{
        Toast.fire({
              icon: "error",
              text: "Remplire bien tout les formulaire "
            });
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