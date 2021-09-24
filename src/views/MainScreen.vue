<template>

    <active-kanji :word="targetWord" />

    <phrase :phrase="phrase" @selected="selectWord($event)" />

    <button :disabled="uiDisabled" @click="queueRandom">Another!</button>
</template>

<script setup>

import { loadConfig, saveConfig } from '../session'
import { addToDeck, inDeck, randomWord } from '../deck'
import { random } from '../sentences'
import { ref, onMounted } from 'vue'

import Phrase from '../components/Phrase.vue'
import ActiveKanji from '../components/ActiveKanji.vue'

let config = loadConfig()
let targetWord = ref(randomWord(config))
let phrase = ref({ready: false})
let uiDisabled = ref(true);

/**
 * When the component is mounted, initialize fetching a phrase
 */
onMounted(async() => {
    await queueRandom();
});

/**
 * Get another random phrase based on the specified kanji.
 */
async function queueRandom() {
    uiDisabled.value = true;
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
    let word = phrase.value.words.find(x => { return x.word == elem.content});

    // if that word was not found, console error and stop processing
    if (word === undefined) {
        console.log('did not find word: ' + elem.content);
        return;
    }

    // if this word is not already in the user deck, add it
    if (!inDeck(config, word)) {
        addToDeck(config, word);
        saveConfig(config);
    }
    
    // go through the streamed phrase, and look for isntances of the word to decorate with 'inUserDeck'    
    phrase.value.streamed.forEach(x => {
        if (x.content == elem.content) {
            x.inUserDeck = true
        }
    });
}

</script>


<style scoped>
    .da-cards {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .da-card {
        background-color: rgb(245, 244, 241);
        display: block;
        width: 150px;
        height: 150px;
        margin: 0 auto;
        font-size: 50px;
        border-radius: 20px;
        padding-top: 30px;
        cursor: pointer;
        /* box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1); */
    }

</style>