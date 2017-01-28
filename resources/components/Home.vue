<template>
    <div class="alg-index">
        <table class="alg-table">
            <tbody>
            <tr>
                <td><label for="alg-fullname">Repository:</label></td>
                <td>
                    <input id="alg-fullname"
                           class="form-control alg-input"
                           type="text"
                           placeholder="Owner / Repo"
                           v-model="fullName"
                    />
                </td>
            </tr>
            <tr>
                <td><label for="alg-desc">Description:</label></td>
                <td>
                    <textarea id="alg-desc"
                              class="form-control alg-input alg-textarea alg-scroll"
                              rows="2"
                              placeholder="Custom Description"
                    ></textarea>
                </td>
            </tr>
            <tr>
                <td><label for="alg-cate">Categories:</label></td>
                <td>
                    <alg-categories></alg-categories>
                </td>
            </tr>
            <tr>
                <td class="alg-align-center" colspan="2">
                    <span>{{ errorMsg }}</span>
                </td>
            </tr>
            <tr>
                <td class="alg-align-center" colspan="2">
                    <button class="btn btn-sm alg-btn" type="button">Add</button>
                    <button class="btn btn-sm alg-btn" type="button">Delete</button>
                    <button class="btn btn-sm alg-btn" type="button">Ignore</button>
                    <button class="btn btn-sm alg-btn" type="button">Reset</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss">

</style>

<script>
    import Categories from './Categories';

    export default {
        data () {
            return {
                fullName: '',
                description: '',
                categories: '',
                errorMsg: '　'
            }
        },

        components: {
            'alg-categories': Categories
        },

        created () {
            this.fullName = this.getFullName();
        },

        methods: {
            getFullName () {
                const meta = document.querySelector('meta[name="octolytics-dimension-repository_nwo"]');

                return meta ? meta.content : '';
            }
        }
    }
</script>