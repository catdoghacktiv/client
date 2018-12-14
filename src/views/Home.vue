<template>
  
    <div class="login">
      <img class="mb-5" src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/872/1503980872_e5380d9b-9695-4339-b81d-c50343c9f210.png?cb=1544751633" alt="">
      <form @submit.prevent="onsubmit">
        <input v-model="name" type="text" name="u" placeholder="Name" required="required">
        <button type="submit" class="btn btn-primary btn-block btn-large">Let me in.</button>
      </form>
    </div>
  
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data(){
    return {
      name: ''
    }
  },
  methods: {
    onsubmit(){
      localStorage.setItem('user', this.name )
      this.$router.push('/loby')
    }
  }
};
</script>

<style scoped>

.bglogin{
  background-color: red
}
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -150px 0 0 -150px;
  width: 300px;
  height: 300px;
}
.login h1 {
  color: black;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
  text-align: center;
}

input {
  width: 100%;
  margin-bottom: 10px;
  background: rgba(0, 0, 0, 0.3);
  border: none;
  outline: none;
  padding: 10px;
  font-size: 13px;
  color: #fff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  box-shadow: inset 0 -5px 45px rgba(100, 100, 100, 0.2),
    0 1px 1px rgba(255, 255, 255, 0.2);
  -webkit-transition: box-shadow 0.5s ease;
  -moz-transition: box-shadow 0.5s ease;
  -o-transition: box-shadow 0.5s ease;
  -ms-transition: box-shadow 0.5s ease;
  transition: box-shadow 0.5s ease;
}
input:focus {
  box-shadow: inset 0 -5px 45px rgba(100, 100, 100, 0.4),
    0 1px 1px rgba(255, 255, 255, 0.2);
}
</style>

