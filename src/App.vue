<template>
    <nav-bar />
    <router-view />
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
</script>

<style>
* {
    margin: 0;
    padding: 0;
    font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB,
        Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
}
</style>
