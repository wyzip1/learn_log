<template>
    <div id="App" :class="{ login: isLoginPage }">
        <NavBar v-if="!isLoginPage" />
        <router-view />
    </div>
</template>

<script setup>
import NavBar from "./components/NavBar/index.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const isLoginPage = computed(() => {
    return route.path.search("/login") !== -1;
});
</script>

<style scoped>
#App {
    width: 100%;
    background-color: #f7f7f7;
    min-height: 100vh;
    padding-top: 60px;
    font-family: "微软雅黑";
}

.login {
    padding-top: 0 !important;
}
</style>
