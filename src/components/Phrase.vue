<template>
  <div v-if="phrase.ready">
    <p>
      <span v-for="elem in phrase.streamed">
        <a v-if="elem.type == 'kanji'" class="da-phrase-kanji" v-bind:class="{ selected: elem.inUserDeck }" @click="addWordToDeck(elem)">
          {{ elem.content }}
        </a>
        <span v-else class="da-phrase-text">
          {{ elem.content }}
        </span>
      </span>
    </p>
  </div>
  <div v-else>...</div>
</template>

<script setup>
const props = defineProps({
  phrase: Object,
});

const emit = defineEmits(["selected"]);

/**
 * Add clicked word to the user's dictionary.
 */
function addWordToDeck(elem) {
  if (elem.inUserDeck) {
    return;
  }

  emit("selected", elem);
}
</script>


<script>
</script>


<style>
.da-phrase-kanji {
  color: blue;
  border: 1px solid grey;
  padding: 0 4px;
  border-radius: 3px;
  margin: 0 4px;
  cursor: pointer;
}

.selected {
  color: red;
}
</style>