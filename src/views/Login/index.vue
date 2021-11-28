<template>
    <div class="container">
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100vh;
    display: grid;
    place-items: center;
    background: linear-gradient(90deg, #171325, #471f32);
}

.fade-enter-active,
.fade-leave-active {
    transition: 0.5s ease;
}

.fade-enter-from {
    opacity: 0;
    transform: translateY(-30px);
}
.fade-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
</style>