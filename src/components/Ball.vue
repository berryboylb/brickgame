
<template>
    <div class="ball" :style="{ top: position.y + 'px', left: position.x + 'px' }"></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { IMovement } from '../type';
const { resetBall } = defineProps<IMovement>()
// function getRandomSpeed() {
//     return Math.floor(Math.random() * 11) - 5;
// }





onMounted(() => {
    resetBall();

});



</script>

<style scoped>
.ball {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: green;
    border-radius: 50%;
}
</style>
