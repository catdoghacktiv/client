<template>
  <div>
    <navbar/>
    <div class="container">
      <h1 class="text-center roomsTitle">{{rooms.name}}'s Room</h1>
      <hr>
      <div class="row">
        <div class="col-md-4">
          <div :class="card1">
            <!-- Background color -->
            <div class="card-up indigo lighten-1"></div>
            <!-- Avatar -->
            <div class="avatar mx-auto">
              <img
                style="max-height: 250px"
                src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"
                class="rounded-circle img-fluid"
                alt="woman avatar"
              >
            </div>
            <!-- Content -->
            <div class="card-body text-center">
              <!-- Name -->
              <h4 class="card-title">{{rooms.player1.name}}</h4>
              <hr>
              <!-- Quotation -->
              <button
                @click="ready('player1')"
                v-if="rooms.player1.ready == false"
                class="btn btn-primary"
              >ready</button>
              <button
                @click="cancel('player1')"
                v-if="rooms.player1.ready == true"
                class="btn btn-danger"
              >cancel</button>
            </div>
          </div>
        </div>
        <div class="col-md-4 d-flex align-items-center justify-content-center">
          <h1 class="vs">VS</h1>
        </div>
        <div class="col-md-4 text-center">
          <h1 v-if="!rooms.player2">Waiting other player ...</h1>
          <div v-if="rooms.player2" :class="card2">
            <!-- Background color -->
            <div class="card-up indigo lighten-1"></div>
            <!-- Avatar -->
            <div class="avatar mx-auto white">
              <img
                src="https://media.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif"
                class="rounded-circle img-fluid"
                alt="woman avatar"
              >
            </div>
            <!-- Content -->
            <div class="card-body">
              <!-- Name -->
              <h4 class="card-title">{{rooms.player2.name}}</h4>
              <hr>
              <!-- Quotation -->
              <button
                @click="ready('player2')"
                v-if="rooms.player2.ready == false"
                class="btn btn-primary"
              >ready</button>
              <button
                @click="cancel('player2')"
                v-if="rooms.player2.ready == true"
                class="btn btn-danger"
              >cancel</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col text-center">
          <button
            @click.prevent="start"
            v-if="rooms.player1.ready == true && rooms.player2.ready == true"
            class="btn btn-danger btn-square"
          >Let The Battle Begin !!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase/index.js";
import navbar from "../components/navbar.vue";
export default {
  name: "room",
  components: {
    navbar
  },
  data() {
    return {
      rooms: null,
      card1: "card testimonial-card",
      card2: "card testimonial-card"
    };
  },
  methods: {
    start() {
      firebase.database().ref('/rooms/'+this.$route.params.id).update({
          start: true
      })
    },
    ready(input) {
      let self = this;
      if (input == "player1") {
        if (self.rooms.player1.name == localStorage.getItem("user")) {
          firebase
            .database()
            .ref("/rooms/" + self.$route.params.id + "/player1")
            .update({
              ready: true
            });
        }
      } else {
        if (self.rooms.player2.name == localStorage.getItem("user")) {
          firebase
            .database()
            .ref("/rooms/" + self.$route.params.id + "/player2")
            .update({
              ready: true
            });
        }
      }
    },
    cancel(input) {
      let self = this;
      if (input == "player1") {
        if (self.rooms.player1.name == localStorage.getItem("user")) {
          firebase
            .database()
            .ref("/rooms/" + self.$route.params.id + "/player1")
            .update({
              ready: false
            });
        }
      } else {
        if (self.rooms.player2.name == localStorage.getItem("user")) {
          firebase
            .database()
            .ref("/rooms/" + self.$route.params.id + "/player2")
            .update({
              ready: false
            });
        }
      }
    }
  },
  mounted() {
    let self = this;
    firebase
      .database()
      .ref("/rooms/" + this.$route.params.id)
      .on("value", function(payload) {
        self.rooms = payload.val();
        if (payload.val().player1.ready == true) {
          self.card1 = "card testimonial-card red";
        } else if (payload.val().player1.ready == false) {
          self.card1 = "card testimonial-card";
        }

        if (payload.val().player2.ready == true) {
          self.card2 = "card testimonial-card red";
        } else if (payload.val().player2.ready == false) {
          self.card2 = "card testimonial-card";
        }

        if( payload.val().start == true){
            console.log(self.$route.params.id)
            self.$router.push('/game/' + self.$route.params.id)
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
.roomsTitle {
  font-family: "Bangers";
  font-size: 70px;
}

.card-title {
  font-family: "Luckiest Guy";

  font-size: 50px;
}

.vs {
  font-family: "Luckiest Guy";

  font-size: 200px;
}
</style>
