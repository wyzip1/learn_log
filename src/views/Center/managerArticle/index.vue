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
            <a-input-search v-model:value="title" @keydown.enter="search()" />
            <a-button type="primary" @click="search()" :loading="load">
                查询
            </a-button>
        </div>
        <a-table
            ref="table"
            bordered
            :columns="columns"
            :data-source="chapterList"
            rowKey="_id"
            class="tableData"
            :loading="load"
            :pagination="{
                current: page,
                pageSize: 10,
                total: total_page,
                onChange: changePage,
            }"
        >
            <template #action="{ record }">
                <div class="actions">
                    <a-button @click="toArticleDetail(record)">查看</a-button>
                    <a-button type="primary" @click="editContent(record)">
                        编辑
                    </a-button>
                    <a-popconfirm
                        title="确定删除此文章？"
                        ok-text="确定"
                        cancel-text="取消"
                        @confirm="delArticle(record)"
                    >
                        <a-button danger type="primary"> 删除 </a-button>
                    </a-popconfirm>
                </div>
            </template>
        </a-table>
    </div>
</template>

<script setup>
import { message } from "ant-design-vue";
import { onMounted, ref, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { getChapterList, delChapter } from "../../../api/chapter";
import { getType } from "../../../api/type";
import { getUserInfo, formatDate } from "../../../util";

const userInfo = getUserInfo();
const page = ref(1);
const total_page = ref(0);
const typeList = ref([]);
const typeId = ref();
const title = ref("");
const chapterList = ref([]);
const load = ref(false);

const table = ref();

const columns = ref([
    {
        title: "标题",
        dataIndex: "title",
        align: "center",
    },
    {
        title: "简介",
        dataIndex: "briefIntroduction",
        width: 260,
        ellipsis: true,
    },
    {
        title: "更新时间",
        dataIndex: "formatUpdateTime",
        align: "center",
        slots: { customRender: "updateTime" },
    },
    {
        title: "创建时间",
        dataIndex: "formatCreateTime",
        align: "center",
        slots: { customRender: "createTime" },
    },
    {
        title: "类型",
        dataIndex: "type.name",
        align: "center",
    },
    {
        title: "操作",
        align: "center",
        dataIndex: "name",
        width: 245,
        slots: { customRender: "action" },
    },
]);

onMounted(() => {
    getType().then((res) => {
        typeList.value = res.data;
    });
    search();
});

function search(page = 1) {
    load.value = true;
    getChapterList({
        userId: userInfo.id,
        page,
        size: 10,
        typeId: typeId.value,
        title: title.value,
    })
        .then((res) => {
            chapterList.value = res.data.docs.map((doc) => {
                doc.formatUpdateTime = formatDate(doc.updateTime);
                doc.formatCreateTime = formatDate(doc.createTime);
                return doc;
            });
            total_page.value = res.data.total_page;
        })
        .finally(() => (load.value = false));
}

const router = useRouter();

function toArticleDetail(data) {
    router.push("/article/" + data._id);
}

function editContent(data) {
    router.push("/center/edit?chapterId=" + data._id);
}

function delArticle(data) {
    delChapter({ chapterId: data._id }).then((res) => {
        console.log(res.data);
        message.success(res.msg);

        search();
    });
}

function changeType(data) {
    typeId.value = data;
}

function changePage(_page) {
    page.value = _page;
    search(_page);
}
</script>

<style scoped>
.content {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 50px;
    flex-direction: column;
    gap: 20px;
}

.actions {
    display: flex;
    gap: 10px;
}

.tableData {
    width: 100%;
}

.search {
    display: flex;
    gap: 15px;
}
</style>