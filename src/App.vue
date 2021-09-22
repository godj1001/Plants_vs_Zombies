<template>
  <div id="app">
    <game></game>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    game: () => import('./components/game.vue')
  },
  data() {
    return {

    }
  },
  mounted() {

  }
}
</script>

<style>
body{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app{
  width: 679px;
  height: 364px;
  background: url("./assets/bg.jpg") no-repeat;
  background-size: 100%;
}
</style>
