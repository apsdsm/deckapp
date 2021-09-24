<template>
    <div class="da-card">
        {{ word.word }}
    </div>
</template>

<script setup>
    const props = defineProps({
        word: Object,
    })
</script>

<style scoped>
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