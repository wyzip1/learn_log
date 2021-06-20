<template>
    <div class="container">
        <!-- <h1>Center</h1> -->
        <Input
            placeholder="请输入标题"
            class="title"
            v-model="title"
            @input="localSave"
        />
        <div @change="chooseType">
            <label v-for="i in type" :key="i._id" class="type">
                <input
                    type="radio"
                    :value="i._id"
                    name="type"
                    :checked="typeId === i._id"
                />
                <span>{{ i.name }}</span>
            </label>
        </div>
        <section>
            <textarea
                placeholder="请写点什么......"
                v-model="value"
                @input="change"
                class="edit"
            ></textarea>
            <div class="show" ref="show"></div>
        </section>
        <Button class="submit" value="提交" @click="submit" />
    </div>
</template>

<script setup>
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css"; // 引入高亮样式 这里我用的是sublime样式
import { ref, onMounted } from "vue";
import Input from "../components/Form/Input.vue";
import Button from "../components/Form/Button.vue";
import { getType } from "../api/type";
import { addChapter } from "../api/chapter";
import { debounce } from "../util";

const rendererMD = new marked.Renderer();
marked.setOptions({
    renderer: rendererMD,
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    },
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
}); //基本设置

const value = ref();
const show = ref();
const type = ref();
const title = ref();
const typeId = ref();

onMounted(async () => {
    let data = await getType();
    type.value = data.meta.data;
    let editMarked = JSON.parse(localStorage.getItem("editMarked") || "[]");
    value.value = editMarked.content || "";
    title.value = editMarked.title || "";
    typeId.value = editMarked.typeId || "";
    render();
});

const change = debounce(() => {
    render();
    localSave();
}, 600);

const localSave = debounce(() => {
    localStorage.setItem(
        "editMarked",
        JSON.stringify({
            title: title.value,
            typeId: typeId.value,
            content: value.value,
        })
    );
    console.log("save to localStorage at editMarked");
}, 600);

function render() {
    show.value.innerHTML = marked(value.value).replace(
        /<pre>/g,
        "<pre class='hljs'>"
    );
}

function chooseType({ target }) {
    typeId.value = target.value;
    localSave();
}

function submit() {
    let userId = JSON.parse(localStorage.getItem("userInfo"))._id;
    addChapter({
        title: title.value,
        typeId: typeId.value,
        content: value.value,
        userId,
    }).then((res) => {
        console.log(res);
        alert("提交日志成功");
    });
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.container section {
    margin: 15px auto 0;
    width: 90%;
    display: flex;
    height: 70%;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.2);
}

.edit,
.show {
    box-sizing: border-box;
    width: 40%;
    height: 100%;
    padding: 25px;
}

.edit {
    border: none;
    outline: none;
    resize: none;
    font-size: 18px;
}

.show {
    overflow: auto;
    width: 60%;
    background-color: #eee;
}

.submit {
    width: 240px;
    margin: 40px auto 0;
}

.title {
    width: 65vw;
    margin-top: 40px;
    height: 45px;
}

.title /deep/ input {
    text-align: center;
    font-size: 25px;
}

.type {
    margin: 0 15px;
    cursor: pointer;
}
.type input {
    margin-right: 5px;
}
</style>