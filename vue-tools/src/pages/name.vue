<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import { useLangStore } from '@/stores/lang'
import { translations } from '@/data/words'
import Button from '@/components/UI/Button.vue'
import Logo from '@/components/UI/logo.vue'
import { useRouter } from 'vue-router'
import { generateName } from '@/api/nameApi'

const randomName = ref('')

async function generateUsername() {
  randomName.value = await generateName()
}

async function handle() {
  // await generateUsername()
  // addName(randomName.value)
  // console.log(names)
  for (let i = 0; i < count.value; i++) {
    const newName = await generateName()
    addName(newName)
  }
}

const router = useRouter()

const lang = useLangStore()
const t = computed(() => translations[lang.current])

const count = ref(1)

const isEmpty = computed(() => Object.keys(names).length === 0)
const names = reactive({})
const copied = reactive({})

function copyName(key, value) {
  navigator.clipboard.writeText(value)

  copied[key] = true

  setTimeout(() => {
    copied[key] = false
  }, 1000)
}

function addName(txt) {
  const key = Object.keys(names).length
  names[key] = txt
}

function removeName(key) {
  delete names[key]
}
</script>

<template>
  <div class="content">
    <Logo @click="router.push('/home')"></Logo>

    <div class="container">
      <h1>{{ t.names }}</h1>
      <div class="config">
        <div class="settings">
          <button @click="handle" class="btn">{{ t.generateNick }}</button>
          <div class="counter">
            <p v-if="randomName">{{ randomName }}</p>
            <p>{{ t.generateCount }} {{ count }}</p>

            <div class="slider">
              <input type="range" min="1" max="10" step="1" v-model="count" />
            </div>
          </div>
        </div>
        <div class="result">
          <div v-for="(value, key) in names" :key="key" :class="`pass-${key}`" class="pass-1">
            <p>{{ value }}</p>

            <div class="edits">
              <div class="edit-item" @click="removeName(key)">
                <img src="./../components/vendor/images/eraser.svg" alt="Удалить" />
                <div class="alertEraser">
                  <p>{{ t.eraser }}</p>
                </div>
              </div>

              <div @click="copyName(key, value)" class="edit-item">
                <img src="./../components/vendor/images/copy.svg" alt="Скопировать" />
                <div v-if="copied[key]" class="alertCopied">
                  <p>{{ t.copied }}</p>
                </div>
                <div v-else class="alertCopy">
                  <p>{{ t.copy }}</p>
                </div>
              </div>
            </div>
          </div>

          <p v-if="isEmpty">{{ t.empty }}</p>
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
  gap: 3em;
  padding: 0 1em;
}

.btn {
  width: 100%;
  padding: 0.5em 0;
  border: 0.3em solid $base-color-yellow;
  border-radius: 1em;
  background-color: $white;
  font-size: 0.8em;
  cursor: pointer;
}

.result {
  width: 40%;
  border: 0.3em solid #facd00;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em 1em;
  align-items: center;
  max-height: 100%;
  min-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.pass-1 {
  border: 0.3em solid $base-color-blue;
  border-radius: 0.5em;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.1em;
}

.counter{
    width: 100%;
    text-align: center;
}

.edits {
  display: flex;
  gap: 0.8em;
}

.edit-item {
  position: relative;
  display: flex;
  align-items: center;
}

.alertCopy,
.alertEraser {
  position: absolute;
  top: -2.2em;
  transform: translateX(-50%);
  font-size: 16px;
  border: 0.2em solid black;
  border-radius: 0.5em;
  padding: 0.3em;
  font-weight: bold;
  user-select: none;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  background: white;
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;
}

.alertEraser {
  left: 50%;
}

.alertCopied {
  position: absolute;
  top: -2.2em;
  transform: translateX(-50%);
  font-size: 16px;
  border: 0.2em solid green;
  border-radius: 0.5em;
  padding: 0.3em;
  font-weight: bold;
  user-select: none;
  background: #e6ffe6;
  color: green;
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;
}

/* ГЛАВНОЕ */
.edit-item:hover .alertCopy,
.edit-item:hover .alertEraser {
  opacity: 1;
}
</style>
