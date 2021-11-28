<template>
    <div class="content">
        <div class="silderbar">
            <a-menu
                v-model:selectedKeys="selectedKeys"
                style="width: 256px"
                mode="inline"
                @click="handleClick"
            >
                <a-menu-item key="/center/index">我的文章</a-menu-item>
                <a-menu-item key="/center/type">类型管理</a-menu-item>
                <a-menu-item key="/center/edit">文章编辑</a-menu-item>
            </a-menu>
        </div>
        <router-view></router-view>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const selectedKeys = ref([route.path]);
function handleClick(data) {
    router.push(data.key);
}
</script>

<style scoped>
.content {
    display: flex;
    height: calc(100vh - 60px);
}

.silderbar {
    display: inline-block;
    height: 100%;
    background-color: #fff;
    padding-top: 20px;
}
</style>
