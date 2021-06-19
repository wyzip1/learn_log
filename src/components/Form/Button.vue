<template>
	<div class="button-group" ref="con" @click="ripples">
		<button>{{ value }}</button>
	</div>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";
const props = defineProps({
	value: { type: String },
	time: { type: String, default: "300" },
	rColor: { type: String, default: "#fff" },
});

const con = ref();
onMounted(() => {
	con.value.style.setProperty("--animationTime", props.time + "ms");
	con.value.style.setProperty("--rColor", props.rColor);
});

function ripples({ clientX, clientY }) {
	let { left, top } = con.value.getBoundingClientRect();
	let span = document.createElement("span");
	span.style.left = clientX - left + "px";
	span.style.top = clientY - top + "px";
	con.value.appendChild(span);
	void 0;
	setTimeout(() => {
		span.remove();
	}, props.time * 1);
}
</script>

<style scoped>
.button-group {
	width: 100%;
	min-height: 30px;
	--animationTime: 300ms;
	--rColor: #fff;
	overflow: hidden;
	position: relative;
	cursor: pointer;
}

.button-group button {
	height: 100%;
	width: 100%;
	outline: none;
	background-color: #c7c8f4;
	color: #fff;
	border: none;
	border-radius: 4px;
	transition: 0.3s;
	cursor: pointer;
}

.button-group:hover button {
	background-color: #555e9f;
}

.button-group /deep/ span {
	width: 600px;
	height: 600px;
	animation: ripples var(--animationTime) linear;
	opacity: 0.4;
	display: block;
	background-color: var(--rColor);
	position: absolute;
	z-index: 10;
	border-radius: 50%;
}

@keyframes ripples {
	from {
		transform: translate(-50%, -50%) scale(0);
	}
	to {
		transform: translate(-50%, -50%) scale(1);
	}
}
</style>