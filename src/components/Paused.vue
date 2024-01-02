<script lang="ts" setup>
import { IPaused } from '../type';
const {  currentLife } = defineProps<IPaused>()
</script>

<template>
    <div class="paused">
        <div>
            <h1>You failed :(</h1>

             <h3>Use the arrow key to control the launchpad to continue</h3>

            <p>You have {{ currentLife }} tries left</p>
           
        </div>
    </div>
</template>

<style scoped>
.paused {
    position: absolute;
    inset: 0;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
}

.paused div {
    border: 1px solid red;
    width: 100%;
    font-family: monospace;
    border-radius: 4px;
    color: red;
    padding: 1rem 0;
}

.paused div h1 {
    font-size: 1.5rem;
}

.paused div h1 {
    font-size: 1.5rem;
}


.paused div p {
    font-size: .875rem;
}

.paused div h3 {
    font-size: 1rem;
}
</style>