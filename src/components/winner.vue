<template id="modalwinner">
<!-- Modal -->
<div class="modal fade" id="basicExampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Congratulations !!! Winner Has Found</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <h1>And The Winner Is {{winner}}</h1>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Start a New Game</button>
      </div>
    </div>
  </div>
</template>

<script>

// <transition name="modal">
// <div class="modal-mask">
//   <div class="modal-wrapper">
//     <div class="modal-container">
//
//       <div class="modal-header">
//         <slot name="header">
//           YOU Have A Winner
//         </slot>
//       </div>
//
//       <div class="modal-body">
//         <slot name="body">
//           Your Winner is
//         </slot>
//       </div>
//
//       <div class="modal-footer">
//         <slot name="footer">
//           default footer
//           <button class="modal-default-button" @click="$emit('close')">
//             OK
//           </button>
//         </slot>
//       </div>
//     </div>
//   </div>
// </div>
// </transition>

  export default{
    computed:{
      winner(){
        this.$store.dispatch("winner")
      }
    }
  }
</script>

<style>

</style>
