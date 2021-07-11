<template>
    <div class="container">
        <div class="block-link">
            <router-link to="/center/edit">写文章/日志</router-link>
        </div>
        <div class="item">
            <div class="title">我的文章</div>
            <div
                class="list"
                v-for="(chapter, i) in chapter.list"
                :key="chapter._id"
            >
                <div class="info">
                    {{ chapter.title }} -
                    <span class="tag">{{ chapter.type.name }}</span>
                </div>
                <div class="control">
                    <button @click="editChapter(chapter._id)">编辑</button>
                    <button @click="delchapter(chapter._id, i)">删除</button>
                </div>
            </div>
            <div class="pagination-group">
                <Pagination :total="chapter.pages" @onChange="getChapter" />
            </div>
        </div>
        <div class="item">
            <div class="title">我的日志</div>
            <div class="list" v-for="(log, i) in log.list" :key="log._id">
                <div class="info">
                    {{ log.title }} -
                    <span class="tag">{{ log.type.name }}</span>
                </div>
                <div class="control">
                    <button @click="editChapter(log._id)">编辑</button>
                    <button @click="delchapter(log._id, i, true)">删除</button>
                </div>
            </div>
            <div class="pagination-group">
                <Pagination :total="log.pages" @onChange="getLog" />
            </div>
        </div>
        <div class="item">
            <div class="title">类型管理</div>
            <div
                class="list type"
                v-for="(type, i) in typeList"
                :key="type._id"
            >
                <button>{{ type.name }}</button>
                <Button
                    value="删除"
                    @click="del_type(type._id, type.name, i)"
                />
            </div>
            <div class="addType">
                <Input class="input" v-model="typeName" />
                <Button value="添加" @click="add_type" class="button" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getLogList, getChapterList, delChapter } from "../api/chapter";
import { getType, addType, delType } from "../api/type";
import Input from "../components/Form/Input.vue";
import Button from "../components/Form/Button.vue";
import Pagination from "../components/Pagination.vue";

const chapter = ref({ list: [], pages: 1 });
const log = ref({ list: [], pages: 1 });
const typeList = ref([]);
const typeName = ref("");
const chapter_current = ref(1);
const log_current = ref(1);
const router = useRouter();

onMounted(async () => {
    await getChapter();
    await getLog();
    let t = await getType(false);
    typeList.value = t.meta.data;
});

async function delchapter(chapterId, i, isLog = false) {
    let cf = confirm("确认删除");
    if (cf) {
        let res = await delChapter({ chapterId });
        console.log(res);
        if (!res.status)
            if (isLog) getLog(log_current.value);
            else getChapter(chapter_current.value);
        else alert(res.meta.msg);
    }
}

function editChapter(id) {
    router.push({
        path: "/center/edit",
        query: { mode: "edit", chapterId: id },
    });
}

async function add_type() {
    let res = await addType({ name: typeName.value });
    if (!res.status) typeList.value.push(res.meta.data);
    else alert(res.meta.msg);
}

async function del_type(id, name, i) {
    let cf = confirm(`确认删除【${name}类型么】`);
    if (cf) {
        let res = await delType({ id });
        if (!res.status) typeList.value.splice(i, 1);
        else alert(res.meta.msg);
    }
}

async function getChapter(current = 1) {
    chapter_current.value = current;
    let c = await getChapterList({ page: current, size: 10 });
    chapter.value.list = c.meta.data.docs;
    chapter.value.pages = c.meta.data.total_page;
    console.log(chapter.value);
}

async function getLog(current = 1) {
    log_current.value = current;
    let l = await getLogList({ page: current, size: 10 });
    log.value.list = l.meta.data.docs;
    log.value.pages = l.meta.data.total_page;
}
</script>


<style scoped>
.block-link {
    display: inline-block;
    width: 100%;
    height: 20px;
}

.container {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    padding: 35px;
    box-sizing: border-box;
    height: calc(100vh - 100px);
}

.container * {
    box-sizing: border-box;
}

.item {
    flex: 1;
    padding: 20px;
    height: 100%;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
    position: relative;
}

.item .title {
    border-bottom: 1px solid #9b9b9b;
    padding-bottom: 10px;
    font-size: 22px;
    color: #424242;
    font-weight: bolder;
    margin-bottom: 12px;
}

.item .list {
    padding: 12px 0;
    display: flex;
    justify-content: space-between;
}

.item .list:not(:last-child) {
    border-bottom: 1px dashed #9b9bb9;
}

.item .list .tag {
    display: inline;
    padding: 2px 8px;
    background: rgb(230, 168, 88);
    color: #fff;
    border-radius: 4px;
}

.item .list.type {
    display: flex;
    justify-content: space-between;
}

.item .list.type :deep() .button-group {
    width: unset;
}

.item .addType {
    display: flex;
    align-items: center;
    height: 30px;
    position: absolute;
    bottom: 20px;
    padding: 10px;
    width: calc(100% - 40px);
    gap: 8px;
}

.item .addType .input {
    flex: 4;
    margin: 0;
}
.item .addType .button {
    flex: 1;
}

.item .pagination-group {
    width: 100%;
    position: absolute;
    bottom: 20px;
    display: flex;
    justify-content: center;
    margin-left: -20px;
}
</style>
    