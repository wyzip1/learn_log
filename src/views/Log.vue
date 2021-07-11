<template>
    <div class="container">
        <div class="search">
            <Input icon="fa-search" class="input" v-model="title" />
            <Button value="查询" class="button" @click="search" />
        </div>
        <transition-group name="doc" move-class="move">
            <div
                class="doc"
                v-for="doc in log.list"
                :key="doc._id"
                @click="linkToArticle(doc)"
            >
                <strong>
                    {{ doc.title }}
                    <span>{{ doc.user.account }}</span>
                </strong>
                <p>
                    <span class="title">日志类型：</span>
                    <span class="type">{{ doc.type.name }}</span>
                </p>
                <p>
                    <span class="title">更新时间：</span>
                    <span class="time">{{ doc.updateTime }}</span>
                </p>
            </div>
        </transition-group>
        <Pagination :total="log.pages" @onChange="search" class="pagination" />
    </div>
</template>


<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getLogList } from "../api/chapter";
import Input from "../components/Form/Input.vue";
import Button from "../components/Form/Button.vue";
import Pagination from "../components/Pagination.vue";

const log = ref({ list: [], pages: 1 });
const title = ref("");
const router = useRouter();

onMounted(() => {
    search();
});

async function search(current = 1) {
    let res = await getLogList({
        page: current,
        size: 10,
        title: title.value.trim(),
    });
    if (!res.status) {
        log.value.list = res.meta.data.docs;
        log.value.pages = res.meta.data.total_page;
        console.log(log.value);
    }
}

function linkToArticle(doc) {
    router.push(`/article/${doc._id}`);
}
</script>

<style scoped>
.container {
    width: 100%;
    padding: 45px 100px;
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    min-height: calc(100vh - 60px);
    box-sizing: border-box;
    background-image: url("../assets/login-bg.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    gap: 35px;
}

.container:deep() .doc {
    width: 300px;
    box-shadow: 0 0 3px 1px rgba(117, 117, 117, 0.3);
    padding: 25px 20px;
    cursor: pointer;
    height: 120px;
    transition: 0.3s;
    background-color: rgba(255, 255, 255, 0.4);
}

.container:deep() .doc:hover {
    transform: translateY(-6px);
    box-shadow: 0 2px 4px 1px rgba(117, 117, 117, 0.2);
}

.container:deep() .doc strong {
    display: block;
    margin-bottom: 8px;
    padding-bottom: 8px;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #c5c5c5;
}

.container:deep() .doc strong span {
    font-size: 14px;
    color: #777;
    display: flex;
    align-items: flex-end;
}

.container:deep() .doc p {
    margin: 15px 0 0;
}

.container:deep() .doc p .title {
    color: #d07700;
}

.container:deep() .doc p .type {
    color: #ae81ff;
}

.container:deep() .doc p .time {
    font-size: 14px;
}

.search {
    width: 100%;
    display: flex;
    justify-content: center;
    height: 30px;
    box-sizing: border-box;
    padding: 0 35%;
    gap: 10px;
}
.search .input {
    flex: 3;
}
.search .button {
    flex: 1;
}

.chooseType {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
}

.chooseType > * {
    cursor: pointer;
}

.doc-enter-active,
.doc-leave-active {
    transition: all 0.3s ease;
}

.doc-enter-from,
.doc-leave-to {
    opacity: 0;
    transform: scaleX(0);
}

.move {
    transition: all 0.3s ease;
}

.pagination {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 100px;
}

.pagination :deep() .pagination-item {
    background-color: #fff;
}
</style>