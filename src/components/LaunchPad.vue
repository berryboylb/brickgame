<template>
    <div class="launch-pad" :style="{ left: launchPadPosition + 'px' }"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { IMovementEmits, IMovement } from '../type';

const { launchPadWidth, launchPadPosition } = defineProps<IMovement>();
const emit = defineEmits<IMovementEmits>();

const toggle = (bool: boolean) => {
    emit("update", bool);
};

const updateLaunchPad = (position: number) => {
    emit("updatePosition", position);
};

const position = ref(launchPadPosition); // Initialize with the prop value
const speed = 10; // Adjust as needed
let animationFrameId: number;

const moveLeft = () => {
    position.value -= speed;
    updateLaunchPad(position.value);
};

const moveRight = () => {
    position.value += speed;
    updateLaunchPad(position.value);
};

const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        toggle(true);
    }
    if (event.key === 'ArrowLeft') {
        moveLeft();
    } else if (event.key === 'ArrowRight') {
        moveRight();
    }
};

const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        toggle(false);
    }
};

const animate = () => {
    // Move the launch pad
    moveLaunchPad();
    // Request the next animation frame
    animationFrameId = requestAnimationFrame(animate);
};

const moveLaunchPad = () => {
    // Ensure that the launch pad stays within the field boundaries
    const fieldWidth = 400; // Adjust as needed
    const minPosition = 0;
    const maxPosition = fieldWidth - launchPadWidth;

    // Clamp the position value within the valid range
    position.value = Math.max(minPosition, Math.min(maxPosition, position.value));
};


onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    animate();
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    cancelAnimationFrame(animationFrameId);
});
</script>

<style scoped>
.launch-pad {
    position: absolute;
    bottom: 0;
    width: 100px;
    height: 10px;
    background-color: #00f;
}
</style>
