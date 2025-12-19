<!-- Емиты нужны для переходов на страницы инструментов. Добавить картинки -->

<script setup>
    import { defineEmits, defineProps } from 'vue';


    const emit = defineEmits("click")

    const props = defineProps({
        qr: {type: String, default: "Генератор Qr-кодов"},
        pass: {type: String, default: "Генератор паролей"},
        avatar: {type: String, default: "Генератор аватаров"},
        names: {type: String, default: "Генератор имен"},
    });
</script>

<template>
    <div class="content">
        <div class="functions">
            <div @click="emit('click')" id="qr">
                <h1>{{ qr }}</h1>
            </div>
            <div @click="emit('click')" id="pass">
                <h1>{{ pass }}</h1>
            </div>
            <div @click="emit('click')" id="avatar">
                <h1>{{ avatar }}</h1>
            </div>
            <div @click="emit('click')" id="name">
                <h1>{{ names }}</h1>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped>
    @import '../../assets/styles/mixins';
    @import '../../assets/styles/variables';

    .content{
        width: 95%;
        height: 24rem;
        background-color: $white;
        border-radius: 2em;
        padding: 5em;
    }

    .functions{
        width: 100%;
        height: 100%;
        display: flex;
        gap: 5em;
        align-items: center;
    }

    #qr, #name, #pass, #avatar{
        width: 100%;
        height: 100%;
        background: $white;
        border-radius: 1em;
    }

    #qr, #name{
        border: .3em solid $base-color-yellow;
    }
    
    #pass, #avatar{
        border: .3em solid $base-color-blue;
    }

</style>