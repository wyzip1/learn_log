<template>
    <div class="container">
        <h1>{{ doc.title }}</h1>
        <p>{{ doc.type }}</p>
        <span
            >{{ doc.formatUpdateTime }} --
            {{ doc.user?.username || "???" }}</span
        >
        <div class="content">
            <View :content="doc.content" />
        </div>
    </div>
</template>


<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getChapterInfo } from "../../api/chapter";
import { formatDate } from "../../util";
import View from "../../components/MarkDown/view.vue";

const route = useRoute();
const doc = ref({});

onMounted(async () => {
    let res = await getChapterInfo(route.params.id);
    res.data.formatUpdateTime = formatDate(res.data.updateTime);
    doc.value = res.data;
});
</script>

<style scoped>
.container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0;
    min-height: calc(100vh - 60px);
    box-sizing: border-box;
}

.container .content {
    width: 75vw;
    padding: 25px 50px;
    border-top: 1px solid #eee;
    margin-top: 25px;
    /* background-color: #232428; */
    background-color: #fff;
    min-height: 65vh;
}
</style>