<!--dasdas -->

<script setup>
  import Logo from '@/components/UI/logo.vue';
  import labelOfFunctions from '@/components/UI/labelOfFunctions.vue';
  import { useRouter } from 'vue-router';
  import { useLangStore } from '@/stores/lang'
  import { translations } from '@/data/words';
  import { computed } from 'vue';

  const router = useRouter();
  const lang = useLangStore()
  const t = computed(() => translations[lang.current]);


  function goToHome(){
    router.push({name: "home"})
  }



</script>

<template>
  <div class="container">
    <Logo id="logo" @click="goToHome"></Logo>
    <labelOfFunctions :qr="t.qr" :pass="t.pass" :avatar="t.avatar" :names="t.names"></labelOfFunctions>
  </div>
</template>

<style lang="scss" scoped>
  @import '../assets/styles/mixins.scss';
  @import '../assets/styles/variables.scss';

  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2em;
    margin-top: 4em;
  }

</style>
