<script setup>
import { defineProps } from 'vue';

const prop = defineProps({
  spinDiameter: {
    type: Number,
    required: true,
  },
});
</script>
<template>
  <div
		:style="{ height: `${prop.spinDiameter}px` }"
		class="loader-wrapper"
  >
		<div
			:style="{width: `${prop.spinDiameter}px`, height: `${prop.spinDiameter}px`}"
			class="spin1"
			>
    </div>
		<div
			:style="{ width: `${prop.spinDiameter}px`, height: `${prop.spinDiameter}px` }"
			class="spin2"
		>
    </div>
	</div>
</template>
<style>
.loader-wrapper {
    display: block;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
}

.spin1, .spin2 {
    border-bottom: 2px solid;
    border-top: 2px solid;
    border-left: 1px dot-dash;
    border-right: 1px dot-dash;
    border-radius: 50%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
}

.spin1 {
    border-color: rgb(100, 100, 10);
    animation: spin-1 1s infinite;
}

.spin2 {
    border-color: rgb(10, 100, 100);
    animation: spin-2 1s infinite;
}

@keyframes spin-1 {
    from {
        rotate: 0;
    }
    to {
        rotate: 360deg;
    }
}

@keyframes spin-2 {
    from {
        rotate: 0;
    }
    to {
        rotate: -360deg;
    }
}
</style>