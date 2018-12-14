<template>
  <div>
    <navbar/>
<<<<<<< HEAD
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
=======
    <div class="container">
        <listroom/>
>>>>>>> 782080828a074b0a578ac54527d05c8844fcc127
    </div>
  </div>
</template>

<script>
import navbar from "../components/navbar.vue";
<<<<<<< HEAD
import listroom from "../components/listRoom.vue";
import firebase from "../firebase/index.js"
=======
import listroom from "../components/listRoom.vue"
>>>>>>> 782080828a074b0a578ac54527d05c8844fcc127
export default {
  components: {
    navbar,
    listroom
  },
<<<<<<< HEAD
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
=======
>>>>>>> 782080828a074b0a578ac54527d05c8844fcc127
  mounted() {
    if (!localStorage.getItem("user")) {
      this.$router.push("/");
    }
<<<<<<< HEAD
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
=======
    
>>>>>>> 782080828a074b0a578ac54527d05c8844fcc127
  }
};
</script>

<style>
</style>
