<script setup lang="ts">
import { ref, watch } from 'vue';
import LaunchPad from './LaunchPad.vue';
import Ball from './Ball.vue';

function getRandomSpeed(x:number = 11) {
    return Math.floor(Math.random() * x) - 5;
}

const userIsMovingLaunchPad = ref(false);
const launchPadPosition = ref(150);
const launchPadWidth = ref(100);
const kickOff = ref(false);

const position = ref({ x: 0, y: 0 });
const speed = { x: 0, y: 0 };
const initialSpeed = 5;
const launchPadHeight = 10;
const ballWidth = 20;



const resetBall = () => {
    position.value.x = launchPadPosition.value + (launchPadWidth.value - ballWidth) / 2;
    position.value.y = 380 - launchPadHeight;
    speed.x = 0;
    speed.y = initialSpeed;
};

const animateBall = () => {
    setInterval(() => {
        if (kickOff) {
            position.value.x += speed.x;
            position.value.y += speed.y;

            if (position.value.y > 380) {
                console.log("fall out")
                // Ball fell out, reset the ball
                resetBall();
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

watch(kickOff, () => {
    animateBall();
    console.log("startgame")
})



</script>
<!-- Field.vue -->
<template>
    <div class="field" tabindex="0">
        {{ userIsMovingLaunchPad ? "true" : "false" }}
        {{ kickOff ? "true" : "false" }}
        <Ball :launchPadPosition="launchPadPosition" :launchPadWidth="launchPadWidth"
            :userIsMovingLaunchPad="userIsMovingLaunchPad" :ballInMotion="kickOff" :animate-ball="animateBall"
            :reset-ball="resetBall" :position="position" />
        <LaunchPad :launchPadPosition="launchPadPosition" :launchPadWidth="launchPadWidth"
            :userIsMovingLaunchPad="userIsMovingLaunchPad" @update="toggleUserIsMovingLaunchPad" :ballInMotion="kickOff"
            :animate-ball="animateBall" :reset-ball="resetBall" :position="position" />
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
