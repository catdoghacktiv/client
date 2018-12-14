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
    myself: '',
    roomId: ''
  },
  mutations: {
    addId(state, payload) {
      state.roomId = payload
    },
    getData(state, payload){
      // firebase.database().ref('/rooms/'+state.roomId).on('value', function(data){
      //   state.room = data.val()
      // })
      state.room = payload
      console.log(payload, 'ini dari getdata mutation')
      if (state.room.player1.health <= 0) {
        state.winner = 'player2'
      } else if (state.room.player2.health <= 0) {
        state.winner = 'player1'
      }
      // localStorage.name = 'user1'
      let turn = state.room.turn
      state.gameTurn = state.room[turn].name
      state.myself = localStorage.user
    },
    setWinner(state, payload){
      state.winner = payload
    },
    attack(state, payload) {
    //   console.log(state, 'ini state attack')
    //   let turn = state.room.turn
    //   let update = {}
    //   let demage = 0
    //   console.log('payload :', payload)
    //   let enemy = Math.round(Math.random() * (3 - 0) + 0);
    //   console.log('target :', enemy)
    //    let operation = -1
    //   if ( payload === enemy ){
    //     demage = 1
    //   }

    //   if (state.gameTurn === state.room.player1.name){
    //       if(payload < enemy){
    //         operation = 4
    //       }else if(payload === enemy){
    //         operation = 5
    //       }else{
    //         operation = 6
    //       }
    //   }else if(state.gameTurn === state.room.player2.name){
    //     if(payload < enemy){
    //       operation = 1
    //     }else if(payload === enemy){
    //       operation = 2
    //     }else{
    //       operation = 3
    //     }
    //   }
    //   // update[turn].healt = state.room[turn].healt - 1
   
    //   let target = turn === 'player1' ? 'player2' : 'player1'
    //   // let name = state.room.target.name

    //   update[target] = {
    //     health: state.room[target].health - demage,
    //     name: state.room[target].name
    //   }
      
    //   if (update[target].health === 0){
    //     state.winner = turn
    //   }
    //   update.turn = (turn == 'player1') ? 'player2' : 'player1'
    //   update.operation = operation
    //   // console.log(update)
    //   console.log(state.roomId, 'ini state room idnya ')
    //  firebase.database().ref('/rooms/'+state.roomId).update(update)
    //   // console.log('this is from mutation attack', state.room.turn)
      
    },
    setWind(state, payload){
      firebase.database().ref('/rooms/'+state.roomId).update({
        wind : payload
      })
    }
  },
  actions: {
    getData({commit}, payload) {
      console.log(payload, 'id diterima action action')
      firebase.database().ref('/rooms/'+payload).on('value', function(data){
        // console.log(data.val(), ' action get data')
        // state.room = data.val()
        commit('getData', data.val())
      })
    },
    setWinner({commit}, payload) {
      // console.log('the winner is', payload)
      commit('setWinner', payload)
    },
    attack({commit, state}, payload) {
      // console.log('this is from attack actions')
      console.log(state, 'ini state dari action')
      // console.log('payload dari action', payload)
      let turn = state.room.turn
      let update = {}
      let demage = 0
      console.log('payload :', payload)
      let enemy = Math.round(Math.random() * (3 - 0) + 0);
      console.log('target :', enemy)
       let operation = -1
      if ( payload === enemy ){
        demage = 1
      }

      if (state.gameTurn === state.room.player1.name){
          if(payload < enemy){
            operation = 4
          }else if(payload === enemy){
            operation = 5
          }else{
            operation = 6
          }
      }else if(state.gameTurn === state.room.player2.name){
        if(payload < enemy){
          operation = 1
        }else if(payload === enemy){
          operation = 2
        }else{
          operation = 3
        }
      }
      // update[turn].healt = state.room[turn].healt - 1
   
      let target = turn === 'player1' ? 'player2' : 'player1'
      // let name = state.room.target.name

      update[target] = {
        health: state.room[target].health - demage,
        name: state.room[target].name
      }
      
      if (update[target].health === 0){
        state.winner = turn
      }
      update.turn = (turn == 'player1') ? 'player2' : 'player1'
      update.operation = operation
      // console.log(update)
      console.log(state.roomId, 'ini id state')
     firebase.database().ref('/rooms/'+state.roomId).update(update)
      // commit('attack', payload)
    },
    setWind( { commit}  ) {
      let wind = Math.random() * (5 - 0) + 0;
      commit('setWind', wind)
    }, 
    addId({commit}, payload) {
      commit('addId', payload)
    }
  }
})
