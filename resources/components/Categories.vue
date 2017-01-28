<template>
    <div class="alg-cate">
        <div class="form-control alg-input alg-cate-box">
            <span class="alg-cate-tags" v-for="item in categories">{{ item }}</span>
        </div>
        <input id="alg-cate"
               class="form-control alg-input"
               type="text"
               placeholder="Categories but not Tags (Split by Comma or Entry)"
               v-model="currentCate"
               @keydown.enter.prevent="addToBox"
               @keydown.comma.prevent="addToBox"
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
    }

    .alg-cate-box { position: relative; min-height: 36px; line-height: 22px; }
    .alg-cate-box-focus { border-color: #51a7e8; outline: none; box-shadow: inset 0 1px 2px rgba(0,0,0,0.075),0 0 5px rgba(81,167,232,0.5) }
    .alg-cate-tags { display: inline-block; padding: 1px 6px; margin: 2px 8px 2px 0; line-height: 14px; border: solid 1px #ddd; border-radius: 5px; background-color: #eee; cursor: pointer; }
    .alg-cate-tags:hover { color: red; text-decoration: line-through; }
    .alg-cate-input { display: inline-block; line-height: inherit; outline: none; }
    .alg-cate-input:empty:before { color: #ccc; cursor: text; content: attr(placeholder); }
    .alg-cate-opt { position: absolute; width: 350px; border: solid 1px #ddd; border-top: 0; background-color: #fff; z-index: 1001; }
    .alg-cate-opt-list { margin-bottom: 0; margin-top: 0; padding-left: 0; list-style: none; }
    .alg-cate-opt-list li { width: 348px; padding: 0 8px; font-size: 14px; line-height: 22px; cursor: default; }
    .alg-cate-opt-item-active { background-color: #f0f0f0;}
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
            addToBox () {
                let currentCate = String(this.currentCate).trim();

                this.currentCate = '';

                if (currentCate === '' || this.categories.indexOf(currentCate) !== -1) {
                    return;
                }

                this.categories.push(currentCate);
            }
        }
    }

    // datalist http://www.awaimai.com/147.html
</script>
