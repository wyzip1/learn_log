<template>
    <nav>
        <router-link to="/" active-class="active">首页</router-link>
        <router-link to="/log" active-class="active" v-if="hasLogin"
            >我的日志</router-link
        >
        <router-link to="/center/user" active-class="active" v-if="hasLogin"
            >个人中心</router-link
        >
        <router-link to="/login" active-class="active" v-else>登录</router-link>
        <button @click="logOut" v-if="hasLogin">退出</button>
    </nav>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
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
    if (route.path.includes("/center") || route.path === "/log")
        router.replace("/login");
}

router.beforeEach(auth);
async function auth(to, from, next) {
    if (to.path === "/login") return next();
    try {
        let userInfo = JSON.parse(localStorage.getItem("userInfo") || "[]");
        let { data } = await axios.post("/auth");
        if (data.status && userInfo?.isLogin) logOut();
        else if (userInfo?.isLogin) hasLogin.value = true;
        else if (to.path === "/log" || to.path === "/center")
            router.replace("/");
    } catch (error) {
        console.log("本地存储用户信息异常，执行清空，请重新登陆");
        hasLogin.value = false;
        localStorage.setItem("userInfo", "");
    }
    next();
}
</script>

<style scoped>
nav {
    position: sticky;
    top: 0px;
    width: 100%;
    height: 60px;
    padding: 15px;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
}

nav > * {
    border: 0;
    background: none;
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 16px;
    color: #474747;
    padding: 0 15px;
    cursor: pointer;
    transition: 0.3s;
}

nav > *:hover {
    background: #c7c8f4;
    color: #fff;
}

nav > .active {
    background: #555e9f;
    color: #fff;
}
</style>