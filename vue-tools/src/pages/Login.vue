<script setup>
  import { useRouter } from 'vue-router';
  import Form from '@/components/UI/UtilForm.vue';
  import Logo from '@/components/UI/logo.vue';
  import { useLangStore } from '@/stores/lang'
  import { translations } from '@/data/words';
  import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

  const router = useRouter();
  const auth = useAuthStore();

  function handleClick(data){
      const success = auth.login(data)
      if(success){
        router.push({name: 'home'})
      }
    }

    function goToPage(){
        router.push({name: 'register'});
    }

  const lang = useLangStore()
  const t = computed(() => translations[lang.current]);

    

</script>

<template>
  <div class="container">
     <Logo id="logo"></Logo>
     <Form :title="t.login" :username="t.name" :emailL="t.email" :passwordL="t.password" :footer-text="t.noAccount" :button-text="t.buttonTextAuth" button-color="rgb(255,255,255)" @submit="handleClick" @footer-click="goToPage" ></Form>
     <p v-if="auth.error">{{ auth.error }}</p>
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

  #logo{
    cursor: default;
  }

</style>
