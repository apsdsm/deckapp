<template>
  <div v-if="word" class="da-card-wrapper">
    <div class="da-card">
      {{ word.word }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  word: Object,
});
</script>

<style scoped>

.da-card-wrapper {
    display: flex;
}

.da-card {
  background-color: rgb(245, 244, 241);
  display: block;
  margin: 0 auto;
  font-size: 50px;
  border-radius: 20px;
  padding: 10px 40px;
  cursor: pointer;
  /* box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1); */
}
</style>