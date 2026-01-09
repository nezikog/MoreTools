<script setup>
import { useLangStore } from '@/stores/lang';
const lang = useLangStore();
</script>

<template>
    <button class="translate-button" @click="lang.toggle">{{ lang.current.charAt(0).toUpperCase() + lang.current.slice(1).toLowerCase()}}</button>
    <router-view />
</template>

<style lang="scss" scoped>
    @import './assets/styles/mixins';
    @import './assets/styles/variables';
    
    .translate-button {
        all: unset;
        padding: .7em;
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
        background-color: $white;
        @include trans;
        font-size: $base-font;
        font-size: 1.5em;
        letter-spacing: 3px;
        position: fixed;
        z-index: 1000;
        right: 24px;
        bottom: 24px;

        &:hover{
            @include box-shadow-translate;
        }

        &:active {
            transform: none;
            box-shadow: none;
        }

        &:focus {
            outline: none;
        }

        &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }
    }

</style>