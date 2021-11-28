<template>
    <div class="content">
        <a-form :model="capterState" :rules="rules" @finish="submitChapter">
            <a-form-item label="文章标题" name="title">
                <a-input
                    placeholder="请输入标题"
                    v-model:value="capterState.title"
                />
            </a-form-item>
            <a-form-item label="文章类型" name="typeId">
                <a-select v-model:value="capterState.typeId">
                    <a-select-option
                        v-for="type of typeList"
                        :value="type._id"
                        :key="type._id"
                    >
                        {{ type.name }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="文章简介" name="briefIntroduction">
                <a-input
                    placeholder="请输入简介"
                    v-model:value="capterState.briefIntroduction"
                />
            </a-form-item>
            <a-form-item label="文章内容" name="content">
                <Edit
                    class="_mark_down_edit"
                    :vertical="false"
                    v-model="capterState.content"
                />
            </a-form-item>
            <a-form-item>
                <a-button
                    block
                    type="primary"
                    html-type="submit"
                    :loading="load"
                >
                    {{ isEdit ? "更新" : "提交" }}
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getType } from "../../../api/type";
import {
    getChapterInfo,
    addChapter,
    updateChapter,
} from "../../../api/chapter";
import Edit from "../../../components/MarkDown/Edit.vue";
import { getUserInfo } from "../../../util";
import { message } from "ant-design-vue";

const route = useRoute();
const isEdit = ref(false);
const load = ref(false);

const capterState = ref({
    title: "",
    content: "",
    typeId: "",
    briefIntroduction: "",
});

const rules = {
    title: { required: true, message: "请输入标题", trigger: "blur" },
    typeId: { required: true, message: "请选择类型" },
    content: { required: true, message: "请输入内容", trigger: "input" },
    briefIntroduction: {
        required: true,
        message: "请输入简介",
        trigger: "blur",
    },
};

const typeList = ref([]);

let _chapterId;

onMounted(() => {
    getType().then((res) => {
        typeList.value = res.data;
    });
    const { chapterId } = route.query;
    if (!chapterId) return;
    getChapterInfo(chapterId).then((res) => {
        isEdit.value = true;
        _chapterId = res.data._id;
        capterState.value.typeId = res.data.typeId;
        capterState.value.content = res.data.content;
        capterState.value.title = res.data.title;
        capterState.value.briefIntroduction = res.data.briefIntroduction;
        console.log(capterState.value);
    });
});

function submitChapter(data) {
    load.value = true;
    if (isEdit.value) {
        updateChapter({
            chapterId: _chapterId,
            ...capterState.value,
        })
            .then((res) => {
                console.log(res.data);
                message.success(res.msg);
            })
            .finally(() => {
                load.value = false;
            });
    } else
        addChapter({
            userId: getUserInfo().id,
            ...capterState.value,
        })
            .then((res) => {
                console.log(res.data);
                message.success(res.msg);
            })
            .finally(() => {
                load.value = false;
            });
}
</script>

<style scoped>
.content {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 50px;
}
</style>

<style>
.ant-form-item-has-error ._mark_down_edit {
    border: 1px solid #ff4d4f;
}
</style>