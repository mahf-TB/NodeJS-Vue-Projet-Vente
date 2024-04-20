import { createStore } from 'vuex'

export default createStore({
  state: {
    CarValue:[]
  },
  getters: {
    nbCarValue(state) {
      return state.CarValue
    }
  },
  mutations: {
    setValueCar(state, Value) {
      state.CarValue.push(Value)
    },
    setArrayCar(state, Value) {
      state.CarValue = Value
    }
  },
  actions: {
    actionValueModal({ commit }, car) {
      commit('setValueCar', car)
    },
    actionArrayFilter({ commit }, car) {
      commit('setArrayCar', car)
    },
  },
  modules: {
  }
})
