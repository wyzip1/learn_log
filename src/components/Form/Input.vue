<template>
	<div class="input-group">
		<span class="icon">
			<i :class="['fa', icon]" aria-hidden="true"></i>
		</span>
		<input
			:type="type"
			@input="$emit('update:modelValue', $event.target.value)"
			:value="modelValue"
			:placeholder="placeholder"
		/>
	</div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
	icon: String,
	modelValue: String,
	placeholder: String,
	type: { type: String, default: "text" },
});
</script>

<style scoped>
.icon {
	margin-right: 10px;
	border-right: 1px solid #eee;
	padding-right: 6px;
}

.input-group {
	margin-bottom: 20px;
	width: 100%;
	min-height: 30px;
	/* border: 1px solid rgb(119, 119, 119); */
	box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
	padding: 0 15px;
	border-radius: 20px;
	display: flex;
	align-items: center;
	box-sizing: border-box;
}

.input-group input {
	outline: none;
	border: none;
	width: 100%;
	height: 95%;
}
</style>