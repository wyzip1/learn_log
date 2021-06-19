<template>
	<div class="container">
		<h1>文章列表</h1>
		<ul>
			<li v-for="doc in list" :key="doc._id">
				<router-link
					:to="{
						path: `/content/detail/${doc._id}`,
						query: {
							...doc,
							type: doc.type.name,
							username: doc.user.username,
						},
					}"
				>
					{{ doc.title }} - {{ doc.type.name }}
					<br />
					{{ doc.updateTime }}
					<br />
					用户：{{ doc.user.username }}
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getChapterList } from "../api/chapter";

const list = ref([]);

onMounted(async () => {
	let res = await getChapterList({ page: 1, size: 100 });
	list.value = res.meta.data;
});
</script>

<style scoped>
.container {
	padding: 45px 100px;
}
</style>