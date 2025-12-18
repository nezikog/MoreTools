<script setup>
    import { defineProps, defineEmits } from 'vue';

    const props = defineProps({
        bgColor: {type: String, default: '#ffffff'},
        padding: {type: String, default: '2em 1em'},
        text: {type: String, default: 'Click'},
        font: {type: String, default: '16px'}
    })

    const emit = defineEmits(['click']);
</script>

<template>
    <button v-bind:style="{backgroundColor: bgColor, padding: padding, fontSize: font}" @click="emit('click')">
        {{ text }}
    </button>
</template>

<style lang='scss' scoped>
    @import '../../assets/styles/mixins.scss';
    @import '../../assets/styles/variables.scss';

    button {
        all: unset;
        box-sizing: border-box;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 10em;
        color: $black; 
        outline: none; 
        box-shadow: none; 
        user-select: none; 
        transition: none; 
        font-weight: normal;
        white-space: nowrap;

        &:active {
            transform: none;
            box-shadow: none;
        }

        &:focus {
            outline: none;
            box-shadow: none;
        }

        &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }
    }

</style>