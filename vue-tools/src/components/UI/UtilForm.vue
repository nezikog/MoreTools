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
</script>

<template>
    <form action="">
        <h1>{{ title }}</h1>

        <div class="inputs">
            <input type="text" :placeholder="username" name="login">
            <input type="email" :placeholder="email" name="email">
            <input type="password" :placeholder="password" name="password">
        </div>

        <Button :bg-color="buttonColor" :text="buttonText" @click="$emit('submit')"></Button>

        <p>{{ footerText }}</p>
    </form>
</template>

<style lang='scss' scoped>
    

</style>
