<template>
<div>
    <div v-if="!cekWin" id="game-board" style="min-height:100vh">
        <div class="container">
            <div class="row">
                <div class="col-sm-6">
                    <div v-if="room.player1" class="progress">
                        <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" :style="{ 'width': darahPlayer1 }"  aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <div  v-if="room.player2" class="col-sm-6">
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" :style="{ 'width':  darahPlayer2 }"  aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="room.player1" class="container-fluid">
            <div v-for="x in row" :key="x" class="row" style="height:100px">
               <div v-for="y in col" :key="y" class="col-2">
                   <div v-if="x === player1.x && y === player1.y">
                        <h5 class="font-weight-bold">{{ room.player1.name}}</h5>
                        <img class="img-fluid" style="width:200px" src='../assets/cat.gif'>
                        <mybuttonattack v-if="gameTurn === room.player1.name && myself ===  room.player1.name"/>
                   </div>
                   <div v-else-if="x === player2.x && y === player2.y">
                        <h5 class="font-weight-bold"> {{ room.player2.name}}</h5>
                        <img class="img-fluid" style="width:200px" src='../assets/dog.gif'>
                        <mybuttonattack v-if="gameTurn === room.player2.name && myself ===  room.player2.name"/>
                   </div>
                   <div v-else-if="y === bom.y && x === bom.x" style="transform : rotate(180deg)">
                     <div v-if="x === 4">
                           <img class="img-fluid" src="../assets/boom.gif" alt="explo" style="z-index:1000">
                     </div>
                     <div v-else>
                        <img class="img-fluid" src="../assets/rocket.gif">
                     </div>
                   </div>
                   <div v-else>
                       <!-- {{x}} {{y}} -->
                   </div>
               </div>
            </div>
        </div>
        {{showBom}}
        {{ cekWin}}
        <button class="btn btn-dark" @click="openModal">Open</button>
        <div id="kamekamehaModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div id="goku">
                        <img  src="../assets/kamekameha.gif" style="height:100vh">
                    </div>
                    <div id="explosion">
                        <img src="../assets/boom.gif" style="height:100vh; display:hidden; z-index:3;"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
      {{ winnermodal}}
      <winnermodal :winner="winner" :open="open"/>
    </div>
</div>
</template>
<script>
import mybuttonattack from '@/components/button-attack.vue'
import winnermodal from  '@/components/winner.vue'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
export default {
    components : {
        mybuttonattack
    },
    data(){
        return {
          open:false,
            col : 6,
            row : 4,
            player1 : {
                x : 4,
                y : 2
            },
            player2 : {
                x : 4,
                y : 5
            },
            bom : {
                y : 2,
                x : 0
            }
        }
    },
    methods :{
        ...mapActions(['getData','setWinner','attack','setWind']),
        openModal(){
            $('#kamekamehaModal').modal('show')
            $('#kamekamehaModal').on('shown.bs.modal', function (e) {
                let time = 0
                let a = setInterval(()=> {
                    time +=1
                    if  ( time === 3){
                        $('#goku').hide()
                        $('#explosion').show()
                    }
                }, 300)
            })
        },
        displayBom(y){
            this.bom.y = y
            let display = setInterval(()=>{
                if( this.bom.x < this.row){
                    this.bom.x += 1
                }else{
                  clearInterval(display)
                  this.bom.y = null
                  this.bom.x = null
                }

            }, 3000)
        },openmodal(){
          this.open=true
        }
    },
    computed : {
        ...mapState(["value",
                     "room",
                     "winner",
                     "gameTurn",
                     "myself"]),
        showBom(){
            if ( this.room.operation !== false){
                this.displayBom(this.room.operation)
            }
            return
        },
        darahPlayer1(){
            if (this.room) {
                let persen = (this.room.player1.health/3)*100 +'%'
                return persen
            }
            return false
        },
        darahPlayer2(){
            if (this.room) {
                let persen = (this.room.player2.health/3)*100 +'%'
                return persen
            }
            return 0
        },
        cekWin(){
            if( this.$store.state.winner ){
                return true
            }else{
                return false
            }
        }
    },
    mounted(){
        // localStorage.setItem('name', 'user1')
        // this.displayBom(1)
        let id = this.$route.params.id
        console.log(id, '=-==-= id room -=-=-')
        this.$store.dispatch('addId', id)
        this.getData(id)
    }
}
</script>
<style scoped>
    #game-board {
      background: url('../assets/background.jpg');
      background-size :cover;
      background-repeat: no-repeat;
      min-height: 100vh;
      z-index: -1;
    }
   .modal-dialog {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
    .modal-content {
        height: auto;
        min-height: 100%;
        width : 100vw;
        border-radius: 0;
    }
</style>
