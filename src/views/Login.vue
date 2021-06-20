<template>
    <div class="container">
        <div class="login">
            <img src="../assets/20151114201020_LHZkf.jpeg" alt="" />
            <h3>Welcome</h3>
            <Input
                icon="fa-user"
                type="text"
                v-model="account"
                placeholder="请输入账号"
                @keydown.enter="login"
            />
            <Input
                icon="fa-lock"
                type="password"
                v-model="password"
                placeholder="请输入密码"
                @keydown.enter="login"
            />
            <Button value="登录" @click="login" />
        </div>
    </div>
</template>

<script setup>
import Input from "../components/Form/Input.vue";
import Button from "../components/Form/Button.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { doLoign } from "../api/user";
let userInfo = JSON.parse(localStorage.getItem("userInfo") || "[]");
const account = ref(userInfo?.username || "");
const password = ref(userInfo?.password || "");
const router = useRouter();

async function login() {
    let {
        meta: { data: userInfo },
        status,
    } = await doLoign({
        username: account.value,
        password: password.value,
    });
    if (status) return alert("账号或密码错误");
    userInfo.isLogin = true;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("token", userInfo.token);
    alert("登陆成功");
    router.push("/");
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 100vh;
    background-image: url("../assets/login-bg.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    display: grid;
}
.login {
    width: 320px;
    height: 420px;
    background: #fff;
    margin: auto;
    border-radius: 15px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 40px;
    box-sizing: border-box;
    margin-top: 180px;
}

.login img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 20px;
}

.login h3 {
    letter-spacing: 2px;
    font-size: 20px;
    margin-bottom: 20px;
}
</style>