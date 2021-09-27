<template>
    <div>
        <ul v-if="words.length > 0" class="da-words">
            <template v-for="(word) in words" >
                <li v-if="!word.deleted" class="da-word">

                    <div class="da-word-card">
                        <div>
                            {{ word.word }}
                        </div>

                        <div class="da-word-actions">
                            <button @click="forget(word)">forget</button>
                        </div>

                    </div>

                    <ol class="da-word-entries">
                        <li v-for="entry in word.entries" class="da-word-entry">
                            {{ entry.pronunciation }}

                            <ul class="da-word-entry-meaning">
                                <li v-for="meaning in entry.english">
                                    {{ meaning }}
                                </li>
                            </ul>

                        </li>
                    </ol>
                </li>

            </template>
        </ul>
        <div v-else>
            Nothing in your deck!
        </div>
    </div>
</template>

<script setup>

const emit = defineEmits(["forget"]);

const props = defineProps({
    words: Array,
});

/**
 * Remove a word from the user's deck
 */
function forget(word) {
    word.deleted = true;
    emit("forget", word);
}

</script>

<style scoped>
    .da-words {
        list-style: none;
        margin: 0;
        padding: 0;
        margin-top: 20px;
        text-align: left;
        font-size: 12px;
    }

    .da-word {
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
    }

    .da-word-card {
        flex: 1;
        width: 50px;
        min-width: 100px;
        max-width: 100px;
        background-color: rgb(245, 244, 241);
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        padding: 10px;
    }

    .da-word-entries {
        flex: 3;
        margin: 0;
        padding: 0;
        display: block;
        text-align: left;
        font-size: 13px;
        list-style: none;
        padding: 10px;
        border: 1px solid rgb(243, 233, 233);
        border-radius: 10px;
        margin-left: 5px;
    }

    .da-word-entry {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .da-word-entry:first-child {
        margin-top: 0;
    }

    .da-word-entry:last-child {
        margin-bottom: 0;
    }

    .da-word-actions {
        margin-top: 20px;
    }


</style>