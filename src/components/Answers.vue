<template>
    <div>
        <ul class="da-answers">
            <li v-for="answer in answers" class="da-answer">

                <div class="da-answer-word">
                    {{ answer.word }}
                </div>

                <ul class="da-answer-entries">
                    <li v-for="entry in answer.entries" class="da-answer-entry">
                        {{ entry.pronunciation }}

                        <ul class="da-answer-entry-meaning">
                            <li v-for="meaning in entry.english">
                                {{ meaning }}
                            </li>
                        </ul>

                    </li>
                </ul>
            </li>
        </ul>

    </div>
</template>

<script setup>

const props = defineProps({
    answers: Array,
})

</script>

<style scoped>
    .da-answers {
        list-style: none;
        margin: 0;
        padding: 0;
        margin-top: 20px;
    }

    .da-answer {
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
    }

    .da-answer-word {
        flex: 1;
        width: 50px;
        max-width: 50px;
        background-color: rgb(245, 244, 241);
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
    }

    .da-answer-entries {
        flex: 3;
        margin: 0;
        padding: 0;
        display: block;
        text-align: left;
        font-size: 13px;
        list-style: none;
        padding: 10px;
    }

    .da-answer-entry {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .da-answer-entry:first-child {
        margin-top: 0;
    }

    .da-answer-entry:last-child {
        margin-bottom: 0;
    }
</style>