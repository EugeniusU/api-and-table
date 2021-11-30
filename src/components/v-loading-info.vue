<template>
    <div class='v-loading-info'>
        <div class='indicator'></div>
    </div>
</template>

<script>
export default({
    name: 'v-loading-info'
})
</script>

<style>
.v-loading-info {
    position: fixed;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
    width: 100px;
    height: 100px;
}

.indicator {
    border-radius: 50%;
    background-image: radial-gradient(lightgrey, purple);
    opacity: 0.5;
    width: 100%;
    height: 100%;
    animation-duration: 3s;
    animation-name: loading;
    animation-iteration-count: 3;
    box-shadow: 10px 10px 10px purple;
    box-shadow: 0px 0px 20px 0px purple;
}

@keyframes loading {
    from {
        box-shadow: 0px 0px 20px 0px purple;
    }

    to {
        box-shadow: 0px 0px 20px 30px purple;
    }
}

</style>