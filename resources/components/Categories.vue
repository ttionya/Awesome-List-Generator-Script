<template>
    <div class="alg-cate">
        <div class="form-control alg-input alg-cate-box" :class="{ 'alg-no-cate': cateLen === 0 }" @click="removeTag($event)">
            <transition-group name="alg-fade"
                              tag="div"
                              v-show="cateLen"
            >
                <span class="alg-cate-tags" v-for="item in categories" :key="item">{{ item }}</span>
            </transition-group>
        </div>
        <input id="alg-cate"
               class="form-control alg-input"
               type="text"
               placeholder="Categories but not Tags (Split by Comma or Entry)"
               v-model="currentCate"
               @keydown.enter.prevent="addTag"
               @keydown.comma.prevent="addTag"
               list="cate-list"
        />
        <datalist id="cate-list">
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>re</option>
        </datalist>
    </div>
</template>

<style lang="scss">
    .alg-cate-box {
        width: 350px;
        min-height: 36px;   // Do not touch


        // Cover .form-control style
        &.alg-no-cate {
            padding: 0;

            &::before {
                display: inline-block;
                width: 348px;       // 350 - 2
                text-align: center;
                line-height: 34px;  // 36 - 2
                border-radius: 3px;
                background-color: #eee;
                content: 'No Categories';
            }
        }


        .alg-cate-tags {
            display: inline-block;
            padding: 1px 6px;
            margin: 2px 8px 2px 0;
            line-height: 14px;
            border: solid 1px #ddd;
            border-radius: 5px;
            background-color: #eee;
            word-break: break-all;
            cursor: pointer;

            &:hover {
                color: red;
                text-decoration: line-through;
            }
        }
    }


    .alg-fade-leave-active {
        transition: all .3s ease-in;
        opacity: 0;
    }
</style>

<script>
    export default {
        data () {
            return {
                currentCate: '',
                categories: [], // Not support Set
            }
        },

        methods: {
            addTag () {
                let currentCate = String(this.currentCate).trim();

                this.currentCate = '';

                if (currentCate === '' || this.categories.indexOf(currentCate) !== -1) {
                    return;
                }

                this.categories.push(currentCate);
            },

            removeTag (e) {
                let target = e.target;

                if (target.className === 'alg-cate-tags') {
                    this.categories.splice(this.categories.indexOf(target.innerText), 1);
                }
            }
        },

        computed: {
            cateLen () {
                return this.categories.length;
            }
        }
    }

    // datalist http://www.awaimai.com/147.html
</script>
