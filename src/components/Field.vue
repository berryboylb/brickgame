<script setup lang="ts">
import { ref, watch } from 'vue';
import LaunchPad from './LaunchPad.vue';
import Ball from './Ball.vue';
import Lives from './Lives.vue';
import Paused from "./Paused.vue"

// function getRandomSpeed(x: number = 11) {
//     return Math.floor(Math.random() * x) - 5;
// }

const userIsMovingLaunchPad = ref(false);
const launchPadPosition = ref(150);
const launchPadWidth = ref(100);
const kickOff = ref(false);

const position = ref({ x: 0, y: 0 });
const speed = { x: 0, y: 0 };
const initialSpeed = 5;
const launchPadHeight = 10;
const ballWidth = 20;

//lives
const lives = ref(3);
const currentLife = ref(3);


const resetBall = () => {
    position.value.x = launchPadPosition.value + (launchPadWidth.value - ballWidth) / 2;
    position.value.y = 380 - launchPadHeight;
    speed.x = 0;
    speed.y = userIsMovingLaunchPad ? initialSpeed : 0;

};

const reduceLives = () => {
    currentLife.value -= 1;
    speed.y = 0;
}

watch(currentLife, (newVal) => {
    console.log("lives", newVal)
    if (newVal === 0) {
        //game over
    }
})



const animateBall = () => {

    setInterval(() => {
        if (kickOff) {
            position.value.x += speed.x;
            position.value.y += speed.y;

            if (position.value.y > 380) {
                console.log("fall out")
                // Ball fell out, reset the ball
                resetBall();
                reduceLives();
                kickOff.value = false;
                return;
            }

            // Check collision with launch pad
            if (
                position.value.y > 380 - launchPadHeight && // Ball is at the bottom
                position.value.x > launchPadPosition.value && // Ball is to the right of launch pad
                position.value.x < launchPadPosition.value + launchPadWidth.value // Ball is to the left of launch pad
            ) {
                speed.y = -speed.y;
                // if (userIsMovingLaunchPad) {
                //     // If the user is moving the launch pad, adjust the ball's direction
                //     const relativeBallPosition = position.value.x - launchPadPosition.value;
                //     const normalizedPosition = relativeBallPosition / launchPadWidth.value;
                //     const angle = normalizedPosition * Math.PI; // Convert to radians for trigonometric functions
                //     speed.x = Math.sin(angle) * 5; // Adjust the speed factor as needed
                //     speed.y = -Math.cos(angle) * 5; // Adjust the speed factor as needed
                // } else {
                //     // If the user is not moving the launch pad, just reverse the direction in the y-axis
                //     speed.y = -speed.y;
                // }
            }

            if (position.value.x < 0 || position.value.x > 380) {
                speed.x = -speed.x;
            }

            if (position.value.y < 0 || position.value.y > 380) {
                speed.y = -speed.y;
            }
        }
    }, 16);
};


const toggleUserIsMovingLaunchPad = (bool: boolean) => {
    userIsMovingLaunchPad.value = bool;
    kickOff.value = true;
};

const updatePosition = (position: number) => {
    if (kickOff.value === false) return
    launchPadPosition.value = position
};

watch(kickOff, (newval) => {
      if (kickOff.value === false) {
        // speed.y = initialSpeed;
    } else {
        // Calculate speed based on launch pad position
        const relativeBallPosition = position.value.x - launchPadPosition.value;
        const normalizedPosition = relativeBallPosition / launchPadWidth.value;
        const angle = normalizedPosition * Math.PI; // Convert to radians for trigonometric functions
        speed.x = Math.sin(angle) * 5; // Adjust the speed factor as needed
        speed.y = -Math.cos(angle) * 5; // Adjust the speed factor as needed
    }
    animateBall();
})



</script>
<!-- Field.vue -->
<template>
    <div class="field" tabindex="0">
        <Ball :launchPadPosition="launchPadPosition" :launchPadWidth="launchPadWidth"
            :userIsMovingLaunchPad="userIsMovingLaunchPad" :ballInMotion="kickOff" :animate-ball="animateBall"
            :reset-ball="resetBall" :position="position" />
        <LaunchPad :launchPadPosition="launchPadPosition" :launchPadWidth="launchPadWidth"
            :userIsMovingLaunchPad="userIsMovingLaunchPad" @update="toggleUserIsMovingLaunchPad"
            @update-position="updatePosition" :ballInMotion="kickOff" :animate-ball="animateBall" :reset-ball="resetBall"
            :position="position" />
        <Lives :lives="lives" :current-life="currentLife" />
        <Paused v-if="kickOff === false && currentLife < 3" :animate-ball="animateBall" :current-life="currentLife" />
    </div>
</template>

<style scoped>
.field {
    position: relative;
    width: 400px;
    height: 400px;
    border: 2px solid red;
}
</style>
