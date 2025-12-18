<script setup>
import { useLangStore } from '@/stores/lang';
const lang = useLangStore()
</script>

<template>
    <button @click="lang.toggle">{{ lang.current.toUpperCase() }}</button>
    <router-view />
</template>

<style lang="scss" scoped>
    
</style>