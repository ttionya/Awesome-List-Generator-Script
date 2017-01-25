<template>
    <div class="alg-loading-mask" v-show="visible">
        <div class="alg-loading-spinner">
            <svg class="alg-circular" viewBox="25 25 50 50">
                <circle class="alg-path" cx="50" cy="50" r="20" fill="none"/>
            </svg>
            <p class="alg-loading-text">{{ text }}</p>
        </div>
    </div>
</template>

<style lang="scss">
    $alg-loading-color: #20a0ff !default;

    .alg-loading-mask {
        position: absolute;
        top: 34px; // .alg-toolbar (height + 1)
        right: 0;
        bottom: 0;
        left: 0;
        background-color: hsla(0,0%,100%,.8);
        z-index: 10000;


        .alg-loading-spinner {
            position: absolute;
            top: 50%;
            width: 100%;
            margin-top: -21px;
            text-align: center;


            .alg-circular {
                width: 42px;
                height: 42px;
                animation: loading-rotate 2s linear infinite;
            }

            .alg-path {
                animation: loading-dash 1.5s ease-in-out infinite;
                stroke-dasharray: 90,150;
                stroke-dashoffset: 0;
                stroke-width: 2;
                stroke: $alg-loading-color;
                stroke-linecap: round;
            }


            .alg-loading-text {
                margin: 3px 0;
                font-size: 16px;
                color: $alg-loading-color;
            }
        }
    }


    @keyframes loading-rotate {
        to {
            transform: rotate(1turn);
        }
    }

    @keyframes loading-dash {
        0% {
            stroke-dasharray: 1,200;
            stroke-dashoffset: 0
        }

        50% {
            stroke-dasharray: 90,150;
            stroke-dashoffset: -40px
        }

        to {
            stroke-dasharray: 90,150;
            stroke-dashoffset: -120px
        }
    }
</style>

<script>
    export default {
        data () {
            return {
                visible: true,
                text: 'Connecting...'
            }
        },
        //props: [
        //    'visible',
        //    'text'
        //]
    }
</script>
