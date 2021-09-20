<template>
  <p>
    {{ phrase.japanese }}
  </p>
</template>

<script setup>

import { defineProps } from "vue";

const props = defineProps({
  phrase: Object,
});


</script>
