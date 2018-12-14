<template>
  <div class="mt-5">
      <div class="row">
          <div class="col text-center"><h1 class="loby">Loby</h1></div>
      </div>
    <div class="row">
      <button data-toggle="modal" data-target="#addRoom" class="btn btn-info">add room</button>
    </div>
    <div class="row mt-5">
<<<<<<< HEAD
      <div v-for="element in listrooms" :key="element[0]" v-if="element[1].start==false" class="col-md-4 mt-2">
=======
      <div v-for="element in listrooms" :key="element[0]" class="col-md-4 mt-2">
>>>>>>> 782080828a074b0a578ac54527d05c8844fcc127
        <!-- Card -->
        <div class="card card-cascade narrower card-ecommerce">
          <!-- Card content -->
          <div class="card-body card-body-cascade text-center">
            <!-- Category & Title -->
            <a href class="grey-text">
              <h5>Room</h5>
            </a>
            <h4 class="card-title">
              <strong>
                <a href>{{element[1].name}}</a>
              </strong>
            </h4>
            <!-- Description -->
            <p class="card-text">Created by: {{element[1].player1.name}}</p>
            <p v-if="element[1].player2 == undefined" class="card-text">number member: 1</p>
            <p v-if="element[1].player2" class="card-text">number member: 2</p>
            <!-- Card footer -->
            <div class="card-footer px-1">
              <button
                @click="joinRoom(element)"
                v-if="element[1].player2 == undefined"
                class="btn btn-primary btn-rounded"
              >join</button>
              <button v-if="element[1].player2" class="btn btn-danger btn-rounded disabled">Full</button>
            </div>
          </div>
          <!-- Card content -->
        </div>
        <!-- Card -->
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="addRoom"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Room</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="md-form">
              <input v-model="roomName" type="text" id="form1" class="form-control">
              <label for="form1">Room Name</label>
            </div>
          </div>
          <div class="modal-footer">
            <button
              data-dismiss="modal"
              @click="onclickAddrooms"
              type="button"
              class="btn btn-primary"
            >Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase/index.js";

export default {
  name: "list-room",
  data() {
    return {
      listrooms: [],
      roomName: ""
    };
  },
  methods: {
    joinRoom(input) {
        let self= this
      firebase
        .database()
<<<<<<< HEAD
        .ref("/rooms/" + input[0])
=======
        .ref("/" + input[0])
>>>>>>> 782080828a074b0a578ac54527d05c8844fcc127
        .update({
          player2: {
            name: localStorage.getItem("user"),
            health: 3,
            ready: false
          }
        })
        .then(data => {
          self.$router.push("/room/" + input[0]);
        })
    },
    onclickAddrooms() {
      let self = this;
      firebase
        .database()
<<<<<<< HEAD
        .ref("/rooms")
=======
        .ref("/")
>>>>>>> 782080828a074b0a578ac54527d05c8844fcc127
        .push({
          name: self.roomName,
          player1: {
            name: localStorage.getItem("user"),
            health: 3,
            ready: false
          },
          turn: "player1",
          start: false
        })
        .then(data => {
          self.$router.push("/room/" + data.key);
        });
    }
  },
  mounted() {
    let self = this;
    firebase
      .database()
<<<<<<< HEAD
      .ref("/rooms")
=======
      .ref("/")
>>>>>>> 782080828a074b0a578ac54527d05c8844fcc127
      .on("value", function(payload) {
        if (payload.val()) {
          let data = Object.entries(payload.val());
          self.listrooms = data;
        } else {
          self.listrooms = [];
        }
      });
  }
};
</script>

<style scoped>
@font-face {
  font-family: "Bangers";
  font-style: normal;
  font-weight: 400;
  src: local("Bangers Regular"), local("Bangers-Regular"),
    url(https://fonts.gstatic.com/s/bangers/v10/FeVQS0BTqb0h60ACH55Q2A.woff2)
      format("woff2");
  unicode-range: U + 0000-00ff, U + 0131, U + 0152-0153, U + 02bb-02bc, U + 02c6,
    U + 02da, U + 02dc, U + 2000-206f, U + 2074, U + 20ac, U + 2122, U + 2191,
    U + 2193, U + 2212, U + 2215, U + FEFF, U + FFFD;
}
/* latin */
@font-face {
  font-family: "Luckiest Guy";
  font-style: normal;
  font-weight: 400;
  src: local("Luckiest Guy Regular"), local("LuckiestGuy-Regular"),
    url(https://fonts.gstatic.com/s/luckiestguy/v8/_gP_1RrxsjcxVyin9l9n_j2hTd52.woff2)
      format("woff2");
  unicode-range: U + 0000-00ff, U + 0131, U + 0152-0153, U + 02bb-02bc, U + 02c6,
    U + 02da, U + 02dc, U + 2000-206f, U + 2074, U + 20ac, U + 2122, U + 2191,
    U + 2193, U + 2212, U + 2215, U + FEFF, U + FFFD;
}
.loby {
  font-family: "Bangers";
  font-size: 70px;
}
</style>
