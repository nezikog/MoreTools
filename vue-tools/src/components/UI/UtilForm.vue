<!-- Сделать тчтобы можно было выбирать то что вводишь в поля. Например выбор между регистрацией и входом и тд -->
<!-- Настроить стили -->

<script setup>
    import { defineProps, defineEmits } from 'vue';
    import Button from '@/components/UI/Button.vue';

    const props = defineProps({
        title: {type: String, default: 'Заголовок'},

        username: {type: String, default: 'Логин'},
        email: {type: String, default: 'Почта'},
        password: {type: String, default: 'Пароль'},

        buttonText: {type: String, default: "Click"},
        footerText: {type: String, default: ''},

        buttonColor: {type: String, default: "#ffffff"}
    });

    const customPadding = '5px 1px';
    const cusomFont = '24px';
</script>

<template>
    <form action="">
        <h1>{{ title }}</h1>

        <div class="inputs">
            <input type="text" :placeholder="username" name="login">
            <input type="email" :placeholder="email" name="email">
            <input type="password" :placeholder="password" name="password">
        </div>

        <Button :font="cusomFont" :padding="customPadding" :bg-color="buttonColor" :text="buttonText" @click="$emit('submit')"></Button>

        <a href="#">{{ footerText }}</a>
    </form>
</template>

<style lang='scss' scoped>
    @import '../../assets/styles/mixins.scss';
    @import '../../assets/styles/variables.scss';
    @import '../../assets/styles/main.scss';

    form{
        background-color: none;
        border: .5em solid rgb(255,255,255);
        border-radius: 3em;
        display: flex;
        flex-direction: column;
        color: $base-color-yellow;
        font-size: .5em;
        width: 31em;
        height: 37em;
        padding: 1em 3em;
    }

    h1{
        text-align: center;
    }

    .inputs{
        display: flex;
        flex-direction: column;
        gap: 1.5em;
        text-align: center;
        color: $base-color-yellow;
    }

    input{
        padding: 1em 4em;
        // text-align: ;
        border-radius: 20em;
        transition: border-radius 2s ease;
        background-color: transparent;
        border: .3em solid rgb(255,255,255);
    }

    input:focus{
        border-radius: 1em;
    }
//Доделать инпуты разобраться с шириной кнопки
    input::placeholder{
        color: $base-color-yellow;
        
    }

    a{
        color: $base-color-yellow;
    }


</style>
