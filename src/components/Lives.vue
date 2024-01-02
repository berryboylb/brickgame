
<script lang="ts" setup>
import { ILives } from '../type';
import { computed } from 'vue';
const { lives, currentLife } = defineProps<ILives>()
const liveArr = computed(() => Array.from({ length: lives }, (_, i) => i + 1));



</script>
<template>
    <div class="lives">
        <div v-if="lives > 0" class="blob">
            <div v-for="life of liveArr" :key="life">
                {{ currentLife < life ? "X" : " ❤️" }} </div>
            </div>
        </div>
</template>


<style scoped>
.lives {
    position: absolute;
    right: .5rem;
    top: .5rem;
    z-index: 99;

}

.blob{
    display: flex;
}

.blob div {
    display: flex;
    align-items: center;
}
</style>