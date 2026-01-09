<script setup>
import { useRouter } from 'vue-router'
import Form from '@/components/UI/UtilForm.vue'
import Logo from '@/components/UI/logo.vue'
import { useLangStore } from '@/stores/lang'
import { translations } from '@/data/words'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

function handleClick(data) {
  const success = auth.register(data)
  if (success) {
    router.push({ name: 'login' })
  }
}

function goToPage() {
  router.push({ name: 'login' })
}
const lang = useLangStore()
const t = computed(() => translations[lang.current]);
</script>

<template>
  <div class="container">
    <Logo id="logo"></Logo>
    <Form
      :title="t.register"
      :username="t.name"
      :emailL="t.email"
      :passwordL="t.password"
      :footer-text="t.haveAccount"
      :button-text="t.buttonTextReg"
      button-color="rgb(255,255,255)"
      @submit="handleClick"
      @footer-click="goToPage"
    ></Form>
    <div v-if="auth.error" class="err">
      <p>{{ auth.error }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/mixins.scss';
@import '../assets/styles/variables.scss';

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3em;
  margin-top: 4em;
}

#logo {
  cursor: default;
}

.err {
  border: 0.3em solid $base-color-yellow;
  padding: 1em;
  border-radius: 1em;
}
p {
  color: $white;
}
</style>
