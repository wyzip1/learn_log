<template>
    <div class="navbar">
        <router-link to="/" class="logo-group">
            <img src="/src/assets/logo.png" class="logo" />
        </router-link>
        <div class="nav-links">
            <router-link class="nav-link" active-class="active" to="/">
                首页
            </router-link>
            <router-link class="nav-link" active-class="active" to="/category">
                分类
            </router-link>
            <router-link
                v-if="loginState"
                class="nav-link"
                active-class="active"
                to="/center"
            >
                个人中心
            </router-link>
            <router-link
                to="/login"
                class="nav-link"
                active-class="active"
                v-else
            >
                登录
            </router-link>
            <div class="nav-link" v-if="loginState">
                <a-button danger type="primary" @click="logOut">
                    退出登录
                </a-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore, mapState } from "vuex";
import { setUserInfo, getUserInfo } from "../../util";

const store = useStore();
const router = useRouter();

const loginState = computed(
    mapState(["LoginState"]).LoginState.bind({ $store: store })
);

function logOut() {
    setUserInfo({ login: false });
    localStorage.removeItem("token");
    router.push("/login");
}
</script>


<style scoped>
.navbar {
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    box-shadow: 0px 1px 5px 0px #adadad;
    display: flex;
    justify-content: space-between;
    padding: 10px 80px;
    align-items: center;
    z-index: 999;
}

.navbar .logo-group {
    height: 100%;
    display: inline-block;
}

.logo-group .logo {
    height: 100%;
    object-fit: cover;
}

.nav-links {
    display: flex;
}

.nav-link {
    display: flex;
    align-items: center;
    padding: 10px;
    color: #323232;
}

.nav-link.active {
    position: relative;
    color: #661ca3;
    font-weight: bold;
}

.nav-link.active::after {
    content: "";
    position: absolute;
    left: 9px;
    bottom: 10px;
    width: calc(100% - 20px);
    height: 2px;
    background-color: #9d54d8;
}
</style>