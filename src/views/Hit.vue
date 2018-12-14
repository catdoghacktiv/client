<template>
  <div>
    <div class="container">
      <!-- <button class="btn btn-primary" @click="getData">Ambil data room 1</button> -->

      <button class="btn btn-primary" @click="checkWin" v-if="!winner && allData.player1 && gameTurn == myself">Attack</button>
      <!-- <p v-else-if="!winner && allData.player1 && gameTurn == myself">Waiting for enemy turn ...</p> -->
      <p v-else-if="gameTurn !== myself && !winner ">Waiting for enemy turn ...</p>
      <h2 v-if="winner">the winner is  {{winner}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getData() {
      this.$store.dispatch('getData')
    },
    checkWin() {
      // let allData = this.$store.state.room
      if (this.allData.player1.healt <= 0) {
        // console.log('player2 win')
        this.$store.dispatch('setWinner', 'player2')
      } else if ((this.allData.player2.healt <= 0)) {
        // console.log('player1 win')
        this.$store.dispatch('setWinner', 'player1')
      } else {
        // console.log('lanjut')
        this.attack()
      }
      // console.log(this.winner, 'from check win')
      // console.log(allData)
    },
    attack() {
      this.$store.dispatch('attack')
    }
  },
  created() {
    this.getData()
  },
  computed: {
    winner () {
      return this.$store.state.winner
    },
    allData () {
      return this.$store.state.room
    },
    gameTurn() {
      return this.$store.state.gameTurn
    },
    myself() {
      return this.$store.state.myself
    }
  }
}
</script>

<style>

</style>
