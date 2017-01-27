<template>
    <div class="alg-welcome">
        <h3>Thank you for using Awesome List Generator</h3>
        <p>This script is used to add repository to your awesome list with description and categories.</p>
        <p>You have to make some settings first. Make sure your <a href="https://github.com/ttionya/Awesome-List-Generator">Awesome List Generator</a> server is running.</p>
        <p><strong>Note:</strong> Please click <code style="color: red;">always allow all domains</code> button when request to a cross origin resource. <a href="https://github.com/ttionya/Awesome-List-Generator-Script#faq">Why</a></p>

        <button class="btn btn-sm alg-btn"
                type="button"
                style="float: right;"
                @click="goSetting"
        >Setting</button>
    </div>
</template>

<style lang="scss">
    .alg-welcome {
        min-height: 260px;
        margin: 0 10px;
    }


    .alg-welcome h3 {
        margin: .3em 0;
    }


    .alg-welcome p {
        margin: .8em 0;
    }
</style>

<script>
    export default {
        methods: {
            goSetting () {
                this.$store.commit('changeComponent', 'setting');
            }
        }
    }
</script>
