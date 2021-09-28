<template>
  <div v-if="phrase.ready">
    <p>
      <span v-for="elem in phrase.tokenized">
        <a
          v-if="elem.type == 'kanji'"
          class="da-phrase-kanji"
          v-bind:class="{ selected: elem.inUserDeck }"
          @click="addWordToDeck(elem)"
        >
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
  color: rgb(4, 133, 255);
  border: 1px solid rgb(241, 238, 228);
  background-color: rgb(248, 248, 240);
  padding: 0 4px;
  border-radius: 3px;
  margin: 0 4px;
  cursor: pointer;
  white-space: nowrap;
}

.da-phrase-kanji:hover {
  background-color: rgb(255, 255, 203);
}

.selected {
  color: rgb(170, 78, 78);
}
</style>