<script setup>
import { ref, onMounted, computed } from 'vue'
import { useLangStore } from '@/stores/lang'
import { translations } from '@/data/words'
import Button from '@/components/UI/Button.vue'
import Logo from '@/components/UI/logo.vue'
import { useRouter } from 'vue-router'
import { generateName } from '@/api/nameApi'

const randomName = ref('')

async function generateUsername(){
  randomName.value = await generateName()
}

const router = useRouter()

const lang = useLangStore()
const t = computed(() => translations[lang.current])

const size = ref(200);
</script>

<template>
  <div class="content">
    <Logo @click="router.push('/home')"></Logo>

    <div class="container">
      <h1>{{ t.avatar }}</h1>
      <div class="config">
        <div class="settings">
          <button @click="generateUsername" class="btn">Сгенерировать никнейм</button>          
          <p v-if="randomName">{{ randomName }}</p>
          <p>: {{ size }}px</p>
          <div class="slider">
            <input type="range" min="100" max="600" step="50" v-model="size" />
          </div>
        </div>
        <div class="result">
          
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/mixins';
@import '../assets/styles/variables';

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2em;
  gap: 2em;
}

.container {
  width: 95%;
  height: 24rem;
  background-color: $white;
  border-radius: 2em;
  padding: 3em 6em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  position: relative;
  top: -0.5em;
}

.config {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 2em;

  height: 15rem;
  align-items: flex-start;
}


.slider {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1em;
  accent-color: $base-color-blue;
  border: 0.3em solid $base-color-yellow;
  padding: 0.8em;
  border-radius: 5em;
}

.slider input[type='range'] {
  appearance: none;
  width: 100%;
  height: 0.8em;
  background: $base-color-blue;
  border-radius: 1em;
  outline: none;
  cursor: pointer;
}

.slider input[type='range']::-webkit-slider-thumb {
  appearance: none; /* обязательно */
  width: 2em; /* ширина кружка */
  height: 2em; /* высота кружка */
  background: $base-color-yellow; /* цвет кружка */
  border-radius: 50%; /* чтобы был круглый */
  cursor: pointer;
}

.result,
.settings {
  height: 100%;
  background: transparent;
  border-radius: 2em;
}

.settings {
  width: 100%;
  border: 0.3em solid $base-color-blue;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 0.2em;
  padding: 0 1em;
}

</style>
