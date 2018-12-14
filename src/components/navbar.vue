<template>
    <!--Navbar-->
<nav class="navbar navbar-expand-lg bg-success navbar-dark primary-color">

  <!-- Navbar brand -->
  <img class="navbar-brand" src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/872/1503980872_e5380d9b-9695-4339-b81d-c50343c9f210.png?cb=1544751633" alt="">
  

 

  <!-- Collapsible content -->
  <div class="collapse navbar-collapse" id="basicExampleNav">

    <!-- Links -->
    <ul class="navbar-nav mr-auto">
      

    </ul>
    <!-- Links -->

    <form class="form-inline">
     <button @click.prevent="logout" class="btn btn-danger">logout</button>
    </form>
  </div>
  <!-- Collapsible content -->

</nav>
<!--/.Navbar-->
</template>

<script>
export default {
    name: 'navbar',
    methods: {
        logout(){
            localStorage.removeItem('user')
            this.$router.push('/')
        }
    }
}
</script>

<style>

</style>
