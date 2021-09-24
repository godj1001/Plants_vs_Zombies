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
  height:100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3b3a3a;
}
</style>
