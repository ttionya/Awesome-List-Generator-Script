<template>
    <div id="alg-box">
        <div class="alg-tip"
             @click="openDialog"
             v-show="expand"
             title="Awesome List Generator"
        >ALG</div>


        <div class="alg-content-box" v-show="!expand">
            <div class="alg-toolbar">
                <template v-if="connected">
                    <a class="alg-icon"
                       @click.prevent="go('home')"
                       title="Home"
                       v-show="activeComponent !== 'home'"
                    >
                        <svg width="16" height="16" viewBox="0 0 32 32">
                            <path d="M32 18.451l-16-12.42-16 12.42v-5.064l16-12.42 16 12.42zM28 18v12h-8v-8h-8v8h-8v-12l12-9z"></path>
                        </svg>
                    </a>
                    <a class="alg-icon"
                       @click.prevent="go('setting')"
                       title="Setting"
                       v-show="activeComponent !== 'setting'"
                    >
                        <svg width="16" height="16" viewBox="0 0 32 32">
                            <path d="M24.982 9.718c0.373 0.373 0.978 0.373 1.35 0l5.283-4.159c0.879 2.764 0.258 5.902-1.935 8.095-2.092 2.093-5.046 2.752-7.714 2.048l-6.266 6.266c0.704 2.669 0.044 5.622-2.047 7.714-2.193 2.193-5.332 2.814-8.096 1.935l4.161-5.282c0.373-0.374 0.373-0.978 0-1.351l-2.7-2.699c-0.373-0.373-0.978-0.373-1.35 0l-5.283 4.159c-0.879-2.764-0.258-5.901 1.934-8.094 2.093-2.093 5.046-2.753 7.715-2.048l6.267-6.267c-0.705-2.668-0.045-5.622 2.046-7.714 2.193-2.193 5.332-2.814 8.097-1.936l-4.161 5.284c-0.372 0.372-0.372 0.977 0 1.349l2.699 2.7z"></path>
                        </svg>
                    </a>
                    <a class="alg-icon"
                       :href="githubUrl"
                       title="My Github"
                       v-show="githubUrl"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                    </a>
                </template>


                <a class="alg-close" @click.prevent="closeDialog">X</a>
            </div>


            <alg-loading></alg-loading>


            <component class="alg-content"
                       :is="activeComponent"
            ></component>
        </div>
    </div>
</template>

<style lang="scss">
    #alg-box {
        position: fixed;
        right: 0;
        bottom: 0;
        box-shadow: -2px -2px 8px -1px rgba(0,0,0,.2);
        z-index: 99999;
        user-select: none;


        * {
            box-sizing: border-box;
        }


        .alg-tip {
            width: 44px;
            height: 22px;
            text-align: center;
            font-weight: 800;
            cursor: pointer;
            border: 1px #999 solid;
            background-color: #f0f1f4;
        }
    }


    .alg-content-box {
        width: 500px;
        min-height: 200px;
        background-color: #fff;
    }


    .alg-toolbar {
        height: 33px;
        padding: 3px 10px;
        line-height: 26px;
        border-bottom: 1px #d9d9d9 solid;

        .alg-icon {
            margin-right: 4px;
            cursor: pointer;

            svg {
                vertical-align: middle;
            }
        }

        .alg-close {
            float: right;
            padding: 0 8px;
            line-height: 26px;
            cursor: pointer;

            &:hover {
                color: #eb7350;
                text-decoration: none;
            }
        }
    }


    .alg-content {
        padding: 10px;
    }


    .alg-btn {
        margin-right: 15px;
    }

    .alg-input {
        width: 350px;
        margin: 5px 0;
    }
    .alg-textarea {
        margin: 3px 0;
        resize: none;
    }

    .alg-hidden { display: none;}


    // Scroll Bar
    .alg-scroll {
        &::-webkit-scrollbar {
            width: 12px;
            height: 16px;
        }
        &::-webkit-scrollbar-button {
            width: 0;
            height: 0;
            display: none;
        }
        &::-webkit-scrollbar-corner{
            background-color: transparent;
        }
        &::-webkit-scrollbar-track:vertical {
            background-clip: padding-box;
        }
        &::-webkit-scrollbar-track:vertical {
            border-left: 5px solid transparent;
            border-right: 0 solid transparent;
        }
        &::-webkit-scrollbar-track:horizontal {
            border-top: 5px solid transparent;
            border-bottom: 0 solid transparent;
        }
        &::-webkit-scrollbar-track:vertical:hover,
        &::-webkit-scrollbar-track:vertical:active,
        &::-webkit-scrollbar-track:horizontal:hover,
        &::-webkit-scrollbar-track:horizontal:active {
            background-color: rgba(0,0,0,0.05);
        }
        &::-webkit-scrollbar-thumb:vertical {
            background-clip: padding-box;
            min-height: 28px;
        }
        &::-webkit-scrollbar-thumb:vertical {
            border-top: 0 solid transparent;
            border-bottom: 0 solid transparent;
            border-left: 5px solid transparent;
            border-right: 0 solid transparent;
        }
        &::-webkit-scrollbar-thumb:horizontal {
            background-clip: padding-box;
            min-width: 28px;
        }
        &::-webkit-scrollbar-thumb:horizontal {
            border-top: 5px solid transparent;
            border-bottom: 0 solid transparent;
            border-left: 0 solid transparent;
            border-right: 0 solid transparent;
        }
        &::-webkit-scrollbar-thumb {
            background-color: rgba(0,0,0,.2);
        }
        &::-webkit-scrollbar-thumb:hover {
            background-color: rgba(0,0,0,.4);
        }
        &::-webkit-scrollbar-thumb:active {
            background-color: rgba(0,0,0,.5);
        }
    }
</style>

<script>
    import Loading from './components/Loading';
    import Welcome from './components/Welcome';
    import Setting from './components/Setting';
    import Home from './components/Home';

    export default {
        data () {
            return {
                expand: true
            }
        },

        components: {
            'alg-loading': Loading,
            welcome: Welcome,
            setting: Setting,
            home: Home
        },

        created () {

        },

        methods: {
            openDialog () {
                this.expand = false;
            },
            closeDialog () {
                this.expand = true;
            },

            go (component) {
                this.$store.commit('changeComponent', component);
            }
        },

        computed: {
            activeComponent () {
                return this.$store.state.activeComponent;
            },
            connected () {
                return this.$store.state.connected;
            },
            githubUrl () {
                return this.$store.state.githubUrl;
            },

        }
    }
</script>
