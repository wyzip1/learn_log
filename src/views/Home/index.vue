<template>
    <div class="content">
        <div class="title">
            文章推荐
            <a-button type="primary" @click="loadChapter" :loading="load">
                刷新
            </a-button>
        </div>
        <div class="list">
            <div class="overlay" v-if="load || chapterList.length === 0">
                <div
                    class="empty-group"
                    v-if="chapterList.length === 0 && !load"
                >
                    <img src="/src/assets/empty.png" />
                    <span>暂无搜索结果</span>
                </div>
                <a-spin :spinning="load" />
            </div>
            <router-link
                :to="`/article/${chapter._id}`"
                v-for="chapter in chapterList"
                :key="chapter._id"
                style="color: #323233"
            >
                <div class="item">
                    <div class="head">
                        <div class="article-title">{{ chapter.title }}</div>
                        <div class="update-time">
                            {{ chapter.formatUpdateTime }}
                        </div>
                    </div>
                    <div class="article-type">
                        简介：{{ chapter.briefIntroduction || "..." }}
                    </div>
                    <div class="article-type">
                        文章类型：{{ chapter?.type?.name }}
                    </div>
                    <div class="article-author">
                        作者名称：{{ chapter?.user?.username || "???" }}
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getRandomList } from "../../api/chapter";
import { formatDate } from "../../util";

const chapterList = ref([]);
const load = ref(false);

onMounted(() => {
    loadChapter();
});

function loadChapter() {
    load.value = true;
    getRandomList({ size: 9 })
        .then((res) => {
            chapterList.value = res.data.map((item) => {
                item.formatUpdateTime = formatDate(item.updateTime);
                return item;
            });
        })
        .finally(() => (load.value = false));
}
</script>

<style scoped>
.content {
    position: absolute;
    left: 50%;
    top: calc(50% + 30px);
    transform: translate(-50%, -50%);
    width: 80vw;
    height: calc(100% - 60px);
    background: #fff;
    padding: 20px 32px;
}

.overlay {
    position: absolute;
    left: 62px;
    top: 95px;
    width: calc(100% - 124px);
    height: calc(100% - 130px);
    background-color: #ffffffa8;
    display: grid;
    place-items: center;
}

.empty-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 24px;
    color: #bebebe;
    align-items: center;
    font-weight: bold;
    letter-spacing: 5px;
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    padding-bottom: 10px;
    font-weight: bold;
    border-bottom: 1px solid rgb(206, 206, 206);
}

.list {
    padding: 30px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 1.5vw;
    row-gap: 1.5vw;
}

.list .item {
    width: 100%;
    height: 100%;
    box-shadow: 0 0 10px 2px #e2e2e2;
    padding: 25px 35px;
    cursor: pointer;
    transition: 0.3s;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.list .item:hover {
    transform: translateY(-10px);
    background: #f9f9f9;
}

.list .item .head {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    font-weight: bold;
    align-items: flex-end;
}

.list .item .head .update-time {
    font-size: 12px;
}

.list .item .head > * {
    max-width: 48%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>