<template>
	<div class="container">
		<h1>Center</h1>
		<Input placeholder="请输入标题" class="title" v-model="title" />
		<section>
			<textarea v-model="value" @input="change" class="edit"></textarea>
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
const typeId = ref();
const title = ref();

onMounted(async () => {
	let data = await getType();
	typeId.value = data.meta.data[0]._id;
});

function change() {
	show.value.innerHTML = marked(value.value).replace(
		/<pre>/g,
		"<pre class='hljs'>"
	);
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
	width: 75vw;
	display: flex;
	height: 80%;
}

.edit,
.show {
	box-sizing: border-box;
	width: 40%;
	height: 100%;
	padding: 10px 25px;
}

.show {
	border: 1px solid rgb(2, 214, 2);
	border-left-width: 0;
	overflow: auto;
	width: 60%;
}

.submit {
	width: 240px;
	margin: 20px auto 0;
}

.title {
	width: 65vw;
	margin-top: 15px;
}

.title /deep/ input {
	text-align: center;
}
</style>