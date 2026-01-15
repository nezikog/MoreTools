<script setup>
import { ref, computed } from 'vue';
import { useLangStore } from '@/stores/lang';
import { translations } from '@/data/words';
import Button from '@/components/UI/Button.vue';
import Logo from '@/components/UI/logo.vue';
import { getQrCode } from '@/api/QrApi';
import { useRouter } from 'vue-router';

const router = useRouter();

const lang = useLangStore();
const t = computed(() => translations[lang.current]);



const url = ref('');
const color = ref('#000000');
const size = ref(200);
const qrSrc = ref(null);
const loading = ref(false);

const generateQr = async () => {
    if (!url.value) return;

    loading.value = true;

    try {
        const response = await getQrCode({
            data: url.value,
            size: `${size.value}x${size.value}`,
            color: color.value.replace('#', ''),
            bgcolor: 'ffffff'
        });

        qrSrc.value = URL.createObjectURL(response.data);
    } catch (e) {
        console.error('QR generation error', e);
    } finally {
        loading.value = false;
    }
};

const downloadQr = () => {
    if (!qrSrc.value) return;

    const link = document.createElement('a');
    link.href = qrSrc.value;
    link.download = 'qr-code.png';
    link.click();
};

const downloadQrByFormat = async (format) => {
    if (!url.value) return;

    try {
        const response = await getQrCode({
            data: url.value,
            size: `${size.value}x${size.value}`,
            color: color.value.replace('#', ''),
            bgcolor: 'ffffff',
            format
        });

        const blobUrl = URL.createObjectURL(response.data);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `qr-code.${format}`;
        link.click();

        URL.revokeObjectURL(blobUrl);
    } catch (e) {
        console.error(`Download ${format} error`, e);
    }
};

</script>


<template>
    <div class="content">
        <Logo @click="router.push('/home')"></Logo>
        <div class="container">
                    <h1>{{t.qr}}</h1>
        <div class="config">

            <div class="settings">
                <p>URL</p>
                <input class="url" v-model="url" placeholder="https://www.example.example/" type="text">
                <p>{{t.color}}</p>
                <input class="color" v-model="color" placeholder="#FFFFFF" type="text">

                <p>{{ t.size }}: {{ size }}px</p>
                <div class="slider">
                    <input
                        type="range"
                        min="100"
                        max="600"
                        step="50"
                        v-model="size"
                    />
                </div>
            </div>
            <div class="result">
                <img
                        v-if="qrSrc"
                        :src="qrSrc"
                        alt="QR code"
                    />
                    <img
                        v-else
                        src="./../components/vendor/images/qr.svg"
                        alt="Qr placeholder"
                    />

                    <Button
                        font=".8em"
                        border=".4em solid #3414AC"
                        bgColor="transparent"
                        :text="t.createQr"
                        @click="generateQr"
                    ></Button>

                    <Button
                        font=".8em"
                        border=".4em solid #3414AC"
                        bgColor="transparent"
                        :text="t.downloadPng"
                        :disabled="!qrSrc"
                        @click="downloadQr"
                    ></Button>
                    
                <div class="formats">
                    <div class="svg" @click="downloadQrByFormat('svg')">
                        <h4>.SVG</h4>
                    </div>
                    <div class="epf" @click="downloadQrByFormat('epf')">
                        <h4>.EPF</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<style lang='scss' scoped>
    @import '../assets/styles/mixins';
    @import '../assets/styles/variables';

    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 2em;
        gap: 2em;
    }

    .container{
        width: 95%;
        height: 24rem;
        background-color: $white;
        border-radius: 2em;
        padding: 3em 6em;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    h1{
        position: relative;
        top: -.5em;
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


    .result, .settings{
        height: 100%;
        background: transparent;
        border-radius: 2em;
    }


    
    .settings{
        width: 100%;
        border: .3em solid $base-color-blue;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        gap: .2em;
        padding: 0 1em;
    }

    input:focus{
        outline: none;
        box-shadow: none;
    }

    .url, .color{
        width: 100%;
        height: 4em;
        border-radius: 15em;
        border: .3em solid $base-color-yellow;
        padding: 1em;
        font-size: .6em;
    }

    .url::placeholder, .color::placeholder{
        color: rgba(0, 0, 0, .5);
    }

    .result{
        width: 40%;
        border: .3em solid $base-color-yellow;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: .5em;
        padding: 0 1em;
        align-items: center;
    }

    .btn{
        width: 100%;
        padding: .5em;
        text-align: center;
    }

    img{
        width: 5em;
        text-align: center;
        margin-top: 1em;
    }

    .formats{
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 1.5em;
    }

    .svg, .epf{
        width: 4em;
        height: 2em;
        color: $white;
        font-size: 1em;
        background-color: $base-color-blue;
        border-radius: .2em;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    @media(max-height: 830px){
        .container{
            height: 20rem;
        }
    }

</style>
