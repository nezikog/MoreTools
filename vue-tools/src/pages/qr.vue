<script setup>
    import {defineProps} from 'vue';
    import { useLangStore } from '@/stores/lang'
    import { translations } from '@/data/words';
    import { computed } from 'vue';
    import Button from '@/components/UI/Button.vue';
    const lang = useLangStore()
    const t = computed(() => translations[lang.current]);

    const props = defineProps({
        title: {type: String, default: 'Генератор'},
    });

    import Logo from '@/components/UI/logo.vue';
</script>

<template>
    <div class="content">
        <Logo></Logo>
        <div class="container">
                    <h1>{{t.qr}}</h1>
        <div class="config">

            <div class="settings">
                <p>URL</p>
                <input class="url" placeholder="https://www.example.example/" type="text">
                <p>{{t.color}}</p>
                <input class="color" placeholder="#FFFFFF" type="text">
            </div>
            <div class="result">
                <img src="./../../vendor/images/qr.svg" alt="Qr-коды">
                <Button font=".8em" border=".4em solid #3414AC" padding=".5em" bgColor="transparent" :text="t.createQr"></Button>
                <Button font=".8em" border=".4em solid #3414AC" padding=".5em" bgColor="transparent" :text="t.downloadPng"></Button>

                <div class="formats">
                    <div class="svg">
                        <h4>.SVG</h4>
                    </div>
                    <div class="epf">
                        <h4>.EPF</h4>
                    </div>
                </div>
                <div class="slider"></div> <!-- для размеров потом настроить -->
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

    .config{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2em;
    }

    .result, .settings{
        height: 15rem;
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
    }



</style>
