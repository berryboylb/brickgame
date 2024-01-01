<!-- LaunchPad.vue -->
<template>
    <div class="launch-pad" :style="{ left: position + 'px' }"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { IMovementEmits, IMovement } from '../type';
const { launchPadWidth } = defineProps<IMovement>()
const emit = defineEmits<IMovementEmits>();


const toggle = (bool: boolean) => {
    emit("update", bool)
}

const position = ref(150); // Initial position of the launch pad
const speed = 10; // Adjust as needed
let animationFrameId: number;

const moveLeft = () => {
    position.value -= speed;
};

const moveRight = () => {
    position.value += speed;
};

const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        toggle(true)
    }
    if (event.key === 'ArrowLeft') {
        moveLeft();
    } else if (event.key === 'ArrowRight') {
        moveRight();
    }
};

const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        // Set userIsMovingLaunchPad to false when the arrow key is released
        toggle(false)
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
    // Start the animation loop
    animate();
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    // Stop the animation loop when the component is unmounted
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
