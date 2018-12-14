<template>
  <div>
    <navbar/>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-1">

        </div>
        <div class="col-md-8">
          <listroom/>
        </div>
        <div class="col-md-3">
          <div class="sticky-top" style="border: 1px dotted black; margin-top:100px;">
            <h1>Chat Box</h1>
            <hr>
            <ul style="list-style-type: none">
              <li v-for="element in lsitChat" :key="element[0]"> <strong> <b>{{element[1].name}}</b>:</strong> {{element[1].val}} </li>
             
             
            </ul>
          <form @submit.prevent="submitChat">
            <input v-model="chat" type="text" class=" form-control">
            <button class="btn btn-success">send</button>
          </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "../components/navbar.vue";
import listroom from "../components/listRoom.vue";
import firebase from "../firebase/index.js"
export default {
  components: {
    navbar,
    listroom
  },
  data(){
    return {
      chat: '',
      lsitChat: []
    }
  },
  methods: {
    submitChat(){
      let self = this
      firebase.database().ref('/messages').push({
        name: localStorage.getItem('user'),
        val: self.chat
      })
      .then(data => {
        self.chat = ''
      })
    }
  },
  mounted() {
    if (!localStorage.getItem("user")) {
      this.$router.push("/");
    }
    let self = this
    firebase.database().ref('/messages').on('value', function(payload){
      let data = Object.entries(payload.val())
      if (data.length<14){
        self.lsitChat = data
      } else {
        let filtered =data.slice(data.length-15)
        self.lsitChat = filtered
      }
    })
  }
};
</script>

<style>
</style>
