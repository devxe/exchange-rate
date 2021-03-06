import { createStore } from 'vuex'
import { API } from '../api'

export const state = {
  remittance : 0,
  sourceCurrency: 'USD',
  targetCurrency: 'KRW',
  quotes: {},
  currencyMoney: 0,
}

export const getters = {
  currencyMoney(state) {
    return state.currencyMoney = (state.quotes[`${state.sourceCurrency}${state.targetCurrency}`] || 0).toFixed(2)
  },
  calculatorMoney(state) {
    return (state.remittance * state.currencyMoney).toFixed(2)
  }
}

export const mutations = {
  SET_QUOTES(state, quotes) {
    state.quotes = quotes
  },
  SET_REMITTANCE(state, remittance) {
    state.remittance = remittance
  },
  SET_TARGET_CURRENCY(state, currency) {
    state.targetCurrency = currency
  }  
}

export const actions = {
  setExchangeRate({commit}) {
    return API.exchangeRate.fetch()
      .then((data) => data && commit('SET_QUOTES', data.quotes))
  }
}

export default createStore({
  state,
  getters,
  mutations,
  actions
})