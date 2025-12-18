<!-- Доделать валидацию тут и на входе, сделать регистрацию и вход -->


<script setup>
    import { useRouter } from 'vue-router';
    import Form from '@/components/UI/UtilForm.vue';
    import Logo from '@/components/UI/logo.vue';
    import { useLangStore } from '@/stores/lang'
    import { translations } from '@/data/words';
    import { computed } from 'vue';
    

    const router = useRouter();
    function goToPage(){
        router.push({name: 'login'})
    }
    const lang = useLangStore()
    const t = computed(() => translations[lang.current]);
  


</script>

<template>
  <div class="container">
     <Logo></Logo>
     <Form :title="t.register" :username="t.name" :email="t.email" :password="t.password" :footer-text="t.haveAccount" :button-text="t.buttonTextReg" button-color="rgb(255,255,255)" @submit="handleClick()" @footer-click="goToPage" ></Form>
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
    gap: 3em;
    margin-top: 4em;
  }

</style>
