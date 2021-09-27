<template>
    <div>
        <ul class="da-words">
            <li v-for="word in words" class="da-word">

                <div class="da-word-card">
                    {{ word.word }}
                </div>

                <ul class="da-word-entries">
                    <li v-for="entry in word.entries" class="da-word-entry">
                        {{ entry.pronunciation }}

                        <ul class="da-word-entry-meaning">
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
    words: Array,
})

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
        font-size: 13px;
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
</style>