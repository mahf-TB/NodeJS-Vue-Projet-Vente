import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout.vue'
import HomeView from '../views/HomeView.vue'

import Clients from '../views/Client/Client.vue'
import Ajouter from '../views/Client/Ajouter.vue'
import ModifierCli from '../views/Client/Modifier.vue'

import Voiture from '../views/Voiture/Voiture.vue'
import AjouterV from '../views/Voiture/AjouterVoiture.vue'
import Modifier from '../views/Voiture/Modifier.vue'
import Detailler from '../views/Voiture/Detailler.vue'

import Achat from '../views/Achat/Achat.vue'
import Commander from '../views/Achat/Commander.vue'
import Card from '../views/Achat/Card.vue'

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      { path: '/', name: 'Home', component: HomeView },

      //route pour page de Client
      { path: '/clients', name: 'Client', component: Clients },
      { path: '/client/ajouter', name: 'Nouveaux client', component: Ajouter },
      { path: '/client/modifier/:id', name: 'Modifier client', component: ModifierCli },

      //route pour page de voiture
      { path: '/voitures', name: 'Voiture', component: Voiture },
      { path: '/voiture/ajouter', name: 'Nouvelle voiture', component: AjouterV },
      { path: '/voiture/modifier/:id', name: 'Modifier voiture', component: Modifier },
      { path: '/voiture/detaille/:id', name: 'Details voiture', component: Detailler },

      //route pour page de Achat
      { path: '/achats', name: 'Achat', component: Achat },
      { path: '/commander', name: 'Nouveaux Commande', component: Commander },
      { path: '/card', name: 'Card', component: Card },
    ]
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{
  document.title = `${to.name} | ${process.env.VUE_APP_TITLE}`
  next()
})
export default router
