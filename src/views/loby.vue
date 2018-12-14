<template>
  <div>
    <navbar/>
    <div class="container">
        <listroom/>
    </div>
  </div>
</template>

<script>
import navbar from "../components/navbar.vue";
import listroom from "../components/listRoom.vue"
export default {
  components: {
    navbar,
    listroom
  },
  mounted() {
    if (!localStorage.getItem("user")) {
      this.$router.push("/");
    }
    
  }
};
</script>

<style>
</style>
