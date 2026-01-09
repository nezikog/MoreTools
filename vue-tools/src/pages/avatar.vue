<script setup>
import { ref, onMounted, computed } from 'vue'
import { useLangStore } from '@/stores/lang'
import { translations } from '@/data/words'
import Button from '@/components/UI/Button.vue'
import Logo from '@/components/UI/logo.vue'
import { useRouter } from 'vue-router'
import { generateAvatar } from '@/api/AvatarsApi'

const randomAvatar = ref('')
const createdAvatar = ref('')

const browsOptions = [
  'variant01',
  'variant02',
  'variant03',
  'variant04',
  'variant05',
  'variant06',
  'variant07',
  'variant08',
  'variant09',
  'variant10',
  'variant11',
  'variant12',
  'variant13',
]

const eyesOptions = ['variant01', 'variant02', 'variant03', 'variant04', 'variant05']
const lipsOptions = ['variant01', 'variant02', 'variant03', 'variant04', 'variant05']

function randomIndex(arr) {
  return Math.floor(Math.random() * arr.length)
}

async function generateRandomAvatar() {
  try {
    const params = {
      seed: 'random-' + Math.random().toString(36).substr(2, 9), 
      brows: browsOptions[randomIndex(browsOptions)],
      eyes: eyesOptions[randomIndex(eyesOptions)],
      lips: lipsOptions[randomIndex(lipsOptions)],
      radius: 50,
    }
    randomAvatar.value = await generateAvatar(params)
  } catch (err) {
    console.error('Ошибка генерации рандомного аватара:', err)
  }
}

function confirmAvatar(){
  createdAvatar.value = randomAvatar.value
}

function downloadCreatedAvatar() {
  if (!createdAvatar.value) return
  const svgContent = createdAvatar.value
  const blob = new Blob([svgContent], { type: 'image/svg+xml' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `avatar_${size.value}px.svg`
  link.click()
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
          <button class="btn" @click="generateRandomAvatar">{{t.generate}}</button>
          <div v-if="randomAvatar" class="test" style="width: 100px" v-html="randomAvatar"></div>

          <p>: {{ size }}px</p>
          <div class="slider">
            <input type="range" min="100" max="600" step="50" v-model="size" />
          </div>
        </div>
        <div class="result">
          <div v-if="createdAvatar" v-html="createdAvatar" style="border: .3em solid rgb(0,0,0); border-radius: 100%;  width: 5em; text-align: center; margin-top: 1em"></div>
          <img v-else src="./../components/vendor/images/account.svg" alt="" />

          <Button
            font=".8em"
            border=".4em solid #3414AC"
            bgColor="transparent"
            :text="t.createAvatar"
            @click="confirmAvatar"
          ></Button>

          <Button
            font=".8em"
            border=".4em solid #3414AC"
            bgColor="transparent"
            :text="t.download"
            :disabled="!createdAvatar"
            @click="downloadCreatedAvatar"
          ></Button>

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
  appearance: none;
  width: 2em; 
  height: 2em;
  background: $base-color-yellow; 
  border-radius: 50%;
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

.btn {
  padding: 0.5em 0;
  width: 100%;
  border: 0.3em solid $base-color-yellow;
  border-radius: 2em;
  background-color: $white;
  font-size: 1em;
  cursor: pointer;
}

.test{
  border: .3em solid rgb(0,0,0);
  border-radius: 100%;
}

.result {
  width: 40%;
  border: 0.3em solid $base-color-yellow;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5em;
  padding: 0 1em;
  align-items: center;
}

img {
  width: 5em;
  text-align: center;
  margin-top: 1em;
}

.svg {
  width: 4em;
  height: 2em;
  color: $white;
  font-size: 1em;
  background-color: $base-color-blue;
  border-radius: 0.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
