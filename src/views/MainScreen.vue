<template>
    <ul class="da-cards">
        <li class="da-card" v-for="kanji in config" v-bind:key="kanji.kanji">
            {{ kanji.kanji }}
        </li>
    </ul>

    <tokenized-phrase :phrase="phrase" />


    <button @click="queueRandom">Another!</button>

    
</template>

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

<script setup>

import { loadConfig } from '../session'
import { random } from '../sentences'
import { ref } from 'vue'

import TokenizedPhrase from '../components/TokenizedPhrase.vue'

let config = loadConfig()
let phrase = ref(random("人"))

// todo - why isn't this updating the vriables?
function queueRandom() {
    phrase.value = random("人")
}

</script>
