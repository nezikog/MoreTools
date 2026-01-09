<script setup>
import { ref, computed, reactive } from 'vue'
import { useLangStore } from '@/stores/lang'
import { translations } from '@/data/words'
import Button from '@/components/UI/Button.vue'
import Logo from '@/components/UI/logo.vue'
import { getUuids } from '@/api/UuidApi'
import { useRouter } from 'vue-router'

const router = useRouter()

const lang = useLangStore()
const t = computed(() => translations[lang.current])

const selectedVersion = ref('v1')

function selectVersion(version) {
  selectedVersion.value = version
}

const img = ref(null)
const count = ref(1)

let rotation = 0

function handle() {
  rotate()
}

function rotate() {
  rotation += 360
  img.value.style.transform = `rotate(${rotation}deg)`
}

const password = reactive({
})

const copied = reactive({})

function copyPassword(key, value) {
  navigator.clipboard.writeText(value)

  copied[key] = true

  setTimeout(() => {
    copied[key] = false
  }, 1000)
}

function addPassword(txt) {
  const key = Object.keys(password).length
  password[key] = txt
}

function removePassword(key) {
  delete password[key]
}

const isEmpty = computed(() => Object.keys(password).length === 0)

async function generatePasswords() {
  if (!selectedVersion.value) {
    alert(t.value.alertVersion)
    return
  }

  try {
    const uuids = await getUuids(selectedVersion.value, count.value)

    uuids.forEach((uuid) => {
      addPassword(uuid)
    })
  } catch (e) {
    console.error('Ошибка генерации UUID', e)
  }
}
</script>

<template>
  <div class="content">
    <Logo @click="router.push('/home')"></Logo>
    <div class="container">
      <h1>{{ t.pass }}</h1>
      <div class="config">
        <div class="settings">
          <div class="slider">
            <input type="range" min="1" max="10" step="1" v-model="count" />
          </div>

          <div class="other">
            <div class="other1">
              <div class="count">
                <p>
                  {{ t.generateCount }} <br />
                  {{ count }}
                </p>
              </div>
              <div class="generate-button" @mouseenter="handle">
                <img
                  ref="img"
                  @click="generatePasswords"
                  src="./../components/vendor/images/lupa.svg"
                  alt="Сгенерировать"
                />
              </div>
            </div>
            <div class="version">
              <p>{{ t.chooseVersion }}</p>
              <div class="versions">
                <div class="u-v">
                  <div class="u-u-v">
                    <p>Version1</p>
                  </div>
                  <input
                    type="radio"
                    :checked="selectedVersion === 'v1'"
                    @change="selectVersion('v1')"
                  />
                </div>
                <div class="u-v">
                  <div class="u-u-v">
                    <p>Version2</p>
                  </div>
                  <input
                    type="radio"
                    :checked="selectedVersion === 'v4'"
                    @change="selectVersion('v4')"
                  />
                </div>
                <div class="u-v">
                  <div class="u-u-v">
                    <p>Version3</p>
                  </div>
                  <input
                    type="radio"
                    :checked="selectedVersion === 'v7'"
                    @change="selectVersion('v7')"
                  />
                </div>
                <div class="u-v">
                  <div class="u-u-v">
                    <p>Version4</p>
                  </div>
                  <input
                    type="radio"
                    :checked="selectedVersion === 'guid'"
                    @change="selectVersion('guid')"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="result">

          <div v-for="(value, key) in password" :key="key" :class="`pass-${key}`" class="pass-1">
            <p>{{ value }}</p>

            <div class="edits">
              <div class="edit-item" @click="removePassword(key)">
                <img src="./../components/vendor/images/eraser.svg" alt="Удалить" />
                <div class="alertEraser">
                  <p>{{ t.eraser }}</p>
                </div>
              </div>

              <div @click="copyPassword(key, value)" class="edit-item">
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
  height: 28rem;
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
  height: 100%;
  display: flex;
  justify-content: center;
  gap: 2em;
  align-items: flex-start;
}

.result,
.settings {
  background: transparent;
  border-radius: 2em;
}

.settings {
  width: 100%;
  height: 100%;
  border: 0.3em solid $base-color-blue;
  display: flex;
  flex-direction: column;
  padding: 0.8em 1em;
  gap: 0.5em;
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

.other {
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 4em;
  align-items: stretch;
}

.other1 {
  display: grid;
  grid-template-rows: auto 1fr auto;
  align-items: center;
}

.count {
  border: 0.3em solid $base-color-yellow;
  border-radius: 0.5em;
  padding: 0.5em;
}

.versions {
  display: flex;
  flex-direction: column;
  gap: 0.3em;
}

.version {
  border: 0.3em solid $base-color-yellow;
  border-radius: 0.5em;
  padding: 0.4em;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.u-v {
  display: flex;
  gap: 1em;
}

.u-v p {
  letter-spacing: 0.3em;
  font-weight: bold;
}

.u-u-v {
  border: 0.3em solid $base-color-blue;
  border-radius: 0.8em;
  padding: 0.2em;
}

input[type='radio'] {
  accent-color: $base-color-yellow;
  border: 0.2em solid black;
  width: 1.5em;
}

.generate-button {
  width: 200px;
  height: 200px;
  border-radius: 100%;
  border: 0.4em solid $base-color-yellow;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  cursor: pointer;
}

.generate-button img {
  display: block;
  transition: transform 1s ease-out;
  width: 60%;
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

.edit-item:hover .alertCopy,
.edit-item:hover .alertEraser {
  opacity: 1;
}

@media (max-width: 1440px) {
  .u-v p {
    letter-spacing: 0;
  }
  .other {
    column-gap: 0.2em;
  }
}
</style>
