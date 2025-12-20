<!-- Сделать тчтобы можно было выбирать то что вводишь в поля. Например выбор между регистрацией и входом и тд -->
<!-- Настро -->
<!-- ddas -->

<script setup>
    import { defineProps, defineEmits } from 'vue';
    import Button from '@/components/UI/Button.vue';
    import { ref } from 'vue';

    const props = defineProps({
        title: {type: String, default: 'Заголовок'},

        username: {type: String, default: 'Логин'},
        emailL: {type: String, default: 'Почта'},
        passwordL: {type: String, default: 'Пароль'},

        buttonText: {type: String, default: "Click"},
        footerText: {type: String, default: ''},

        buttonColor: {type: String, default: "#ffffff"}
    });

    const customPadding = '.3em 4em';
    const cusomFont = '24px';
    const emit = defineEmits(["submit", "footer-click"]);
    
    const login = ref('')
    const email = ref('')
    const password = ref('');

</script>

<template>
    <form @submit.prevent>
        <div class="content">
            <h1>{{ title }}</h1>

            <div class="inputs">
                <input v-model="login" type="text" :placeholder="username" name="login">
                <input v-model="email" type="email" :placeholder="emailL" name="email">
                <input v-model="password" type="password" :placeholder="passwordL" name="password">
            </div>

            <Button :font="cusomFont" :padding="customPadding" :bg-color="buttonColor" :text="buttonText" @click="emit('submit', {login,email,password})"></Button>

            <a href="#" @click.prevent="emit('footer-click')">{{ footerText }}</a>
        </div>

    </form>
    
</template>

<style lang='scss' scoped>
    @import '../../assets/styles/mixins.scss';
    @import '../../assets/styles/variables.scss';
    @import '../../assets/styles/main.scss';

    form{
        background-color: none;
        border: .4em solid rgb(255,255,255);
        border-radius: 3em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: $base-color-yellow;
        font-size: .5em;
        width: 31em;
        height: 37em;
        padding: 0 3em;
    }

    .content{
        display: flex;
        flex-direction: column;
        gap: 1.5em;
        width: 100%;
    }

    h1{
        text-align: center;
        margin-bottom: .5em;
    }

    .inputs{
        display: flex;
        flex-direction: column;
        gap: 2em;
        text-align: center;
        color: $base-color-yellow;
        width: 100%;
    }

    input{
        width: 100%;
        padding: 0.3rem .8rem;
        border: 1px solid #bdbdbd;
        border-radius: 20rem;
        font-family: inherit;
        font-size: .7rem;
        color: $base-color-yellow;
        border: .2em solid $white;
        background-color: transparent;
        transition: all .3s ease-in-out;
    }

    input:focus{
        border-radius: 0;
        outline: none;
        box-shadow: none;
    }
//Доделать инпуты разобраться с шириной кнопки
    input::placeholder{
        color: $base-color-yellow !important;
        font-size: 1.2em;
    }

    input:focus::placeholder{
        color: rgba(255, 208, 0, 0.377)!important;
    }

    Button{
        margin-top: 1em;
        width: 100%;
    }

    a{
        color: $base-color-yellow;
        text-align: center;
        caret-color: transparent;
    }
</style>
