<!--adasdas-->

<script setup>
    import { defineProps } from 'vue';
    import { useRouter } from 'vue-router';

    const emit = defineEmits("click")

    const props = defineProps({
        qr: {type: String, default: "Генератор Qr-кодов"},
        pass: {type: String, default: "Генератор паролей"},
        avatar: {type: String, default: "Генератор аватаров"},
        names: {type: String, default: "Генератор имен"},
    });

    const router = useRouter();

    function goToPage(name){
        router.push({name: name})
    }

</script>

<template>
    <div class="content">
        <div class="functions">
            <div @click="goToPage('qr')" id="qr">
                <h4>{{ qr }}</h4>
                <img src="./../vendor/images/qr.svg" alt="Qr-коды">
            </div>
            <div @click="goToPage('pass')" id="pass">
                <h4>{{ pass }}</h4>
                <img src="./../vendor/images/pass.svg" alt="Пароли">
            </div>
            <div @click="goToPage('avatar')" id="avatar">
                <h4>{{ avatar }}</h4>
                <img src="./../vendor/images/account.svg" alt="Аватары">
            </div>
            <div @click="goToPage('name')" id="name">
                <h4>{{ names }}</h4>
                <img src="./../vendor/images/name.svg" alt="Имена">
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
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1em;
        cursor: pointer;
        user-select: none;
    }

    #qr, #name{
        border: .3em solid $base-color-yellow;
    }
    
    #pass, #avatar{
        border: .3em solid $base-color-blue;
    }



    // h4{
    //     text-align: center;
    //     margin: 1em 0;
    // }



</style>
