<template>
    <div>
        <div class="progress">
            <div class="progress-bar progress-bar-striped bg-warning" role="progressbar" :style="{ 'width': persenConvert }"  aria-valuemin="0" aria-valuemax="3"></div>
        </div>
        <div>
            <!-- v-if="!winner && allData.player1 && gameTurn == myself && status === 'ready'"  -->
            <button v-if="status == 'ready'" @click="ready" class="btn btn-danger rounded-circle mr-3">
                Ready
            </button>
            <button v-else @click="attack" class="btn btn-success rounded-circle mr-3">
                Attack
            </button>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import { mapState } from 'vuex'
export default {
 data(){
     return {
         jarak : 0,
         status : 'ready',
         attackInterval : null
     }
 },
 methods : {
       ...mapActions(['getData','setWinner','attack']),
     ready(){
         this.status = 'attack'
         let status = 'increment'
         this.attackInterval = setInterval( () => {
             if ( this.jarak < 3 && status === 'increment' ){
                 this.jarak += 1
             }else{
               status = 'decrement'
               this.jarak -=1
               if( this.jarak === 0){
                    status = 'increment'
               }
             }
         }, 350)
     },
     attack(){
         clearInterval(this.attackInterval)
         this.$store.dispatch('attack',this.jarak)
     }
 }, 
 computed : {
     persenConvert(){
        let persen = ((this.jarak /3)*100)+'%'
        console.log('persen :', persen)
        return persen
    }
 },
 created() {
     this.getData()
 },   
}
</script>
