<template>
    <div class="pagination">
        <div
            class="pagination-item prev"
            @click="onChange(current - 1, isFirst)"
            :disabled="isFirst"
        >
            <i class="fa fa-angle-left" aria-hidden="true"></i>
        </div>
        <div
            :class="{ 'pagination-item': true, active: current === i }"
            v-for="i in pages"
            :key="i"
            @click="onChange(i)"
        >
            {{ i }}
        </div>
        <div
            class="pagination-item next"
            @click="onChange(current + 1, isLast)"
            :disabled="isLast"
        >
            <i class="fa fa-angle-right" aria-hidden="true"></i>
        </div>
    </div>
</template>

<script setup>
import { computed, defineEmit, defineProps, ref } from "vue";

const props = defineProps({
    total: { type: Number, require: true },
});

const emit = defineEmit(["onChange"]);

// data
const current = ref(1);

// computed
const isFirst = computed(() => current.value == 1);
const isLast = computed(() => current.value == props.total);
const pages = computed(() => {
    let _pages = [];
    if (props.total <= 5 || current.value <= 3)
        for (let i = 0; i < props.total && i < 5; i++) _pages.push(i + 1);
    else if (current.value >= props.total - 2)
        for (let i = props.total - 5; i < props.total; i++) _pages.push(i + 1);
    else for (let i = -2; i < 3; i++) _pages.push(current.value + i);
    return _pages;
});

function onChange(_current, dis) {
    if (dis !== undefined && dis) return;
    current.value = _current;
    emit("onChange", _current);
}
</script>

<style scoped>
.pagination {
    display: flex;
    gap: 8px;
}

.pagination-item {
    width: 32px;
    height: 32px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
    user-select: none;
    transition: 0.3s;
}

.pagination-item.active,
.pagination-item:hover:not(.pagination-item.prev[disabled="true"], .pagination-item.next[disabled="true"]) {
    border-color: #1890ff;
    color: #1890ff;
}

.pagination-item.prev[disabled="true"],
.pagination-item.next[disabled="true"] {
    cursor: not-allowed;
    color: #d9d9d9;
}
</style>