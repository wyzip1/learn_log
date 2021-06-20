<template>
    <nav>
        <router-link to="/">首页</router-link>
        <router-link to="/center" v-if="hasLogin">写日志</router-link>
        <router-link to="/login" v-else>登录</router-link>
        <button @click="logOut" v-if="hasLogin">退出</button>
    </nav>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const hasLogin = ref(false);
const route = useRoute();
const router = useRouter();

function logOut() {
    localStorage.setItem("token", "");
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    userInfo.isLogin = false;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    hasLogin.value = false;
    if (route.path === "/center") router.replace("/login");
}

router.beforeEach(() => {
    auth();
});

function auth() {
    try {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        console.log(userInfo);
        if (userInfo?.isLogin) hasLogin.value = true;
    } catch (error) {
        // console.log("本地存储用户信息异常，执行清空，请重新登陆");
        hasLogin.value = false;
        localStorage.clear();
    }
}
</script>

<style scoped>
nav {
    position: fixed;
    right: 50px;
    top: 30px;
}
</style>