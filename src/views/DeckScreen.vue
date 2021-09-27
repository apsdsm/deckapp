<template>
  <div>
    <deck :words="words" @forget="onForget" />
  </div>
</template>

<script setup>
import { loadConfig, saveConfig } from "../session";
import { allWords, removeFromDeck } from "../deck";
import { ref } from "vue";

import Deck from "../components/Deck.vue";

let config = loadConfig();
let words = ref(allWords(config));

function onForget(word) {
    console.log("forget");
    console.log(word);

    // remove from config
    removeFromDeck(config, word);
    saveConfig(config);
}
</script>
