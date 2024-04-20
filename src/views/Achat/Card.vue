<template>
    <div class="about bg-gray-700">
        <div class="container py-[200px] flex items-center justify-between h-[900px]">
            <div class='mx-auto w-[370px] text-gray-900 bg-gray-600 p-4 rounded-xl shadow-gray-800 shadow-xl mb-16 max-h-[400px]'>
                <div class="flex items-center">
                    <div>
                        <img class="justify-center grid w-[80px] h-[80px] object-cover " width="375" height="200"
                            :src="card.image" alt="voiture Mercedes" />
                    </div>
                    <div class="mx-6">
                        <h1 class="text-[18px] text-left mb-2 font-semibold">{{ card.titre }}</h1>
                        <h1 class="text-left">{{ card.acteur }}</h1>
                    </div>
                </div>
                <div class="text-center my-[50px]">
                    <h1 class="text-[20px] mb-2 text-left  font-semibold">
                        Maybe you don't understand what I'm going through
                       <!-- I know you're thinkin' I'm heartless, <br/> I know you're thinkin' I'm cold <br/>
                       I'm just protectin' my innocence, <br/> I'm just protectin'my soul -->
                    </h1>
                </div>
                <div>
                    <h1><i class="fa-brands fa-spotify mr-1"></i><span class="ml-1">Spotify</span></h1>
                </div>
            </div>

            <div class="absolute top-0 z-10">
                <div class="form-floating  mb-3">
                    <input type="file" class="form-control" id="floatingImage" @change="handleFileUpload"
                        placeholder="Contact ou Tele">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Ajouter',
    data() {
        return {
            card: {
                titre: 'Circles (Lyrics)',
                acteur: 'POST MALONE',
                parole: '',
                image: '',
            },

        }
    },
    mounted() {

    },
    methods: {
        async handleFileUpload(event) {
            if (event.target.files[0].type.match("image/*")) {
                let image = event.target.files[0];
                this.card.image = URL.createObjectURL(image)
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