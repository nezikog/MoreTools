<script setup>
    import { defineProps, defineEmits } from 'vue';

    const props = defineProps({
        bgColor: {type: String, default: '#ffffff'}
    })

    const emit = defineEmits(['click']);
</script>

<template>
    <button v-bind:style="{backgroundColor: bgColor}" @click="emit('click')">
        <slot></slot>
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
        padding: 0.5rem 1rem;
        border-radius: 1.8em;
        background-color: $white; 
        color: $black; 
        outline: none; 
        box-shadow: none; 
        user-select: none; 
        transition: none; 
        font-weight: normal;

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
