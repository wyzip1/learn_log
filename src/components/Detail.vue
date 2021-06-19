<template>
	<div class="container">
		<h1>{{ route.query.title }}</h1>
		<p>{{ route.query.type }}</p>
		<span>{{ route.query.updateTime }}--{{ route.query.username }}</span>
		<div class="content" ref="con"></div>
	</div>
</template>


<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css"; // 引入高亮样式 这里我用的是sublime样式
import { getChapterDetail } from "../api/chapter";

const rendererMD = new marked.Renderer();
const route = useRoute();
const con = ref();

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

onMounted(async () => {
	let res = await getChapterDetail(route.params.id);
	let content = res.meta.data.content;
	con.value.innerHTML = marked(content).replace(
		/<pre>/g,
		"<pre class='hljs'>"
	);
});
</script>

<style scoped>
.container {
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px 0 60px;
}

.container .content {
	width: 75vw;
}
</style>