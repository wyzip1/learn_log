<template>
    <div class="content">
        <div class="search">
            <a-select
                :default-value="null"
                style="width: 150px"
                @change="changeType"
            >
                <a-select-option :value="null"> 全部 </a-select-option>
                <a-select-option
                    v-for="type of typeList"
                    :value="type._id"
                    :key="type._id"
                >
                    {{ type.name }}
                </a-select-option>
            </a-select>
            <a-input-search
                v-model:value="title"
                @keydown.enter="searchChapterList()"
            />
            <a-button
                type="primary"
                @click="searchChapterList()"
                :loading="load"
            >
                搜索
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
                        文章类型：{{ chapter.type.name }}
                    </div>
                    <div class="article-author">
                        作者名称：{{ chapter.user.username || "???" }}
                    </div>
                </div>
            </router-link>
        </div>
        <a-pagination
            class="pagination"
            v-model:current="page"
            :pageSize="9"
            :total="total_page"
            @change="searchChapterList"
        ></a-pagination>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getChapterList } from "../../api/chapter";
import { getType } from "../../api/type";
import { formatDate } from "../../util";

const chapterList = ref([]);
const title = ref("");
const page = ref(1);
const typeList = ref([]);
const typeId = ref(null);
const total_page = ref(0);
const load = ref(false);

onMounted(() => {
    getType().then((res) => {
        typeList.value = res.data;
    });
    searchChapterList();
});

function searchChapterList(page = 1) {
    load.value = true;
    getChapterList({
        size: 9,
        title: title.value,
        page: page,
        typeId: typeId.value,
    })
        .then((res) => {
            total_page.value = res.data.total_page;
            chapterList.value = res.data.docs.map((item) => {
                item.formatUpdateTime = formatDate(item.updateTime);
                return item;
            });
        })
        .finally(() => (load.value = false));
}

function changeType(data) {
    typeId.value = data;
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
    display: flex;
    flex-direction: column;
    align-items: center;
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

.search {
    margin-top: 30px;
    width: 40%;
    min-width: 500px;
    gap: 15px;
    display: flex;
}

.list {
    width: 100%;
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

.pagination {
    position: absolute;
    bottom: 5%;
}
</style>