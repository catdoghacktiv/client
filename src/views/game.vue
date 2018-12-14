<template>
    <div id="game-board" style="min-height:600px">
        <div class="container">
            <div class="row">
                <div class="col-sm-6">
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="{ 'width': '75%'' }"  aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="{ 'width': '75%' }"  aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div v-for="x in row" :key="x" class="row" style="height:100px">
               <div v-for="y in col" :key="y" class="col-2">
                   <div v-if="x === cat.x && y === cat.y">
                        <h5 class="font-weight-bold"> Player 2</h5>
                        <img class="img-fluid" style="width:200px" src='../assets/cat.png'>
                        <mybuttonattack/>
                   </div>
                   <div v-else-if="x === dog.x && y === dog.y">
                        <h5 class="font-weight-bold"> Player 2</h5>
                        <img class="img-fluid" style="width:200px" src='../assets/dog.png'>
                        <mybuttonattack/>
                   </div>
                   <div v-else-if="y === bom.y && x === bom.x" style="transform : rotate(180deg)">
                       <img v-if="(x === dog.x && y === dog.y)" class="img-fluid" src="../assets/explosion.png" style="z-index:2">
                      <img v-else class="img-fluid" src="../assets/rocket.gif">
                   </div>
                   <div v-else>
                       {{x}} {{y}}
                   </div>
               </div>
            </div>
        </div>
        <button class="btn btn-dark" @click="openModal">Open</button>
        <div id="kamekamehaModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div id="goku">   
                        <img  src="../assets/kamekameha.gif" style="height:100vh">
                    </div>
                    <div id=explosion>
                        <img src="../assets/boom.gif" style="height:100vh; display:hidden; z-index:3;"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import mybuttonattack from '@/components/button-attack.vue'
export default {
    components : {
        mybuttonattack
    },
    data(){
        return {
            col : 6,
            row : 4,
            dog : {
                x : 4,
                y : 2
            },
            cat : {
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
                }, 1000)
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
        }
    },
    created(){
        this.displayBom(2)
    }
}
</script>
<style scoped>
    #game-board {
      background: url('../assets/background.jpg');
      background-size : cover;
      background-repeat: no-repeat;
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
