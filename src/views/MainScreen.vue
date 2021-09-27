<template>
  <active-kanji :word="targetWord" />

  <phrase :phrase="phrase" @selected="selectWord($event)" />

  <revealed :meaning="meaning" />

  <button :disabled="uiDisabled" @click="reveal">Reveal</button>
  <button :disabled="uiDisabled" @click="queueRandom">Another!</button>

  <answers :words="answers" />
</template>

<script setup>
import { loadConfig, saveConfig } from "../session";
import { addToDeck, inDeck, randomWord } from "../deck";
import { random } from "../sentences";
import { ref, onMounted } from "vue";

import Phrase from "../components/Phrase.vue";
import ActiveKanji from "../components/ActiveKanji.vue";
import Revealed from "../components/Revealed.vue";
import Answers from "../components/Answers.vue";

let config = loadConfig();
let targetWord = ref("");
let phrase = ref({ ready: false });
let meaning = ref("");
let uiDisabled = ref(true);
let answers = ref([]);

/**
 * When the component is mounted, initialize fetching a phrase
 */
onMounted(async () => {
  await queueRandom();
});

function reveal() {
  meaning.value = phrase.value.english;
}

/**
 * Get another random phrase based on the specified kanji.
 */
async function queueRandom() {
  uiDisabled.value = true;
  meaning.value = "";
  answers.value = [];
  targetWord.value = randomWord(config);
  phrase.value = await random(targetWord.value.word);
  uiDisabled.value = false;
}

/**
 * When a word is selected in the phrase component, it passes up an event with the clicked
 * word. The word will be added to the user's deck (if not already), and the phrase will be
 * updated so the phrase component knows what to display.
 */
function selectWord(elem) {
  // find the word entry in the phrase (the elem is just the word value, without the definitions, etc)
  let word = phrase.value.words.find((x) => {
    return x.word == elem.content;
  });

  // if that word was not found, console error and stop processing
  if (word === undefined) {
    console.log("did not find word: " + elem.content);
    return;
  }

  // if this word is not already in the user deck, add it
  if (!inDeck(config, word)) {
    addToDeck(config, word);
    saveConfig(config);
  }

  let inAnswers = answers.value.find((x) => {
    return x.word == word.word;
  });

  if (!inAnswers) {
    answers.value.unshift(word);
  }

  // go through the streamed phrase, and look for isntances of the word to decorate with 'inUserDeck'
  phrase.value.streamed.forEach((x) => {
    if (x.content == elem.content) {
      x.inUserDeck = true;
    }
  });
}
</script>


<style scoped>

</style>