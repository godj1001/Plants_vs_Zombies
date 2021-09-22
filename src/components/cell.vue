<template>
  <div class="border cell">
  </div>
</template>

<script>
export default {
  name: 'Cell',
  props: {
    content: {
      default: () => {
        return {
          name: ''
        }
      }
    }
  }

}
</script>

<style scoped>
.border {
}
.cell {
  height: 100%;
  width: 100%;
  color: white;
}
</style>
