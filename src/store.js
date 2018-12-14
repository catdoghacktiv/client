import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/firebase/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    value: 0,
    room: {},
    winner: '',
    gameTurn: '',
    myself: ''

  },
  mutations: {
    getData(state, payload){
      // firebase.database().ref('room1').on('value', function(data){
      //   console.log(data.val())
      //   state.room = data.val()
      // })
      state.room = payload
      if (state.room.player1.healt <= 0) {
        state.winner = 'player2'
      } else if (state.room.player2.healt <= 0) {
        state.winner = 'player1'
      }
      // localStorage.name = 'user1'
      let turn = state.room.turn
      state.gameTurn = state.room[turn].name
      state.myself = localStorage.name
    },
    setWinner(state, payload){
      state.winner = payload
    },
    attack(state) {
      let turn = state.room.turn
      let update = {}
      // update[turn].healt = state.room[turn].healt - 1
      update[turn] = {
        healt: state.room[turn].healt - 1,
        name: localStorage.name
      }
      update.turn = (state.room.turn == 'player1') ? 'player2' : 'player1' 
      // console.log(update)
      firebase.database().ref('room1').update(update)
      // console.log('this is from mutation attack', state.room.turn)

    }
  },
  actions: {
    getData({commit}) {
      firebase.database().ref('room1').on('value', function(data){
        console.log(data.val())
        // state.room = data.val()
        commit('getData', data.val())
      })
    },
    setWinner({commit}, payload) {
      // console.log('the winner is', payload)
      commit('setWinner', payload)
    },
    attack({commit}) {
      // console.log('this is from attack actions')
      commit('attack')
    }
  }
})
