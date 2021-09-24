<template>
    <div class="da-reveal">
        {{ meaning }}
    </div>
</template>

<script setup>
    const props = defineProps({
        meaning: String,
    })
</script>

<style scoped>
    .da-reveal {
        margin-bottom: 10px;
    }
</style>