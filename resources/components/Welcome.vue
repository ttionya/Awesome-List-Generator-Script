<template>
    <div class="alg-welcome">
        <h3>Thank you for using Awesome List Generator</h3>
        <p>This is your first time use Awesome List Generator.</p>
        <p>Let us make some settings.</p>
        <p>Make sure you have run Awesome List Generator server. <a href="https://github.com/ttionya/Awesome-List-Generator">Github</a></p>
        <p>Please click <span style="color: red;">always allow all domains</span> button when request to a cross origin resource. <a href="https://github.com/ttionya/Awesome-List-Generator-Script">Why</a></p>
        <button class="btn btn-sm alg-btn alg-to-setting" type="button" style="float: right;" @click="start">Start</button>
    </div>
</template>

<style lang="scss">
    .alg-welcome h3,
    .alg-welcome p {
        margin: .5em 0;
    }
</style>

<script>
    export default {
        methods: {
            start () {
                this.$emit('goSetting');
            }
        }
    }
</script>
