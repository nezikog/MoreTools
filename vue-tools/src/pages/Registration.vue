<script setup>
    import { useRouter } from 'vue-router';
    const router = useRouter();
    function goToPage(name){
        router.push({name})
    }
</script>

<template>
  <button @click="goToPage('home')">Click</button>
</template>

<style scoped></style>
