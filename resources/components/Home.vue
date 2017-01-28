<template>
    <div class="alg-index">
        <table class="alg-table">
            <tbody>
            <tr>
                <td><label for="alg-fullname">Repo:</label></td>
                <td><input id="alg-fullname" class="form-control alg-input" type="text" placeholder="Owner / Repo" /></td>
            </tr>
            <tr>
                <td><label for="alg-desc">Description:</label></td>
                <td>
                    <textarea id="alg-desc" class="form-control alg-input alg-textarea" rows="2" placeholder="Custom Description"></textarea>
                </td>
            </tr>
            <tr>
                <td><label>Categories:</label></td>
                <td><div id="alg-cate"></div></td>
            </tr>
            <tr><td colspan="2">&nbsp;</td></tr>
            <tr>
                <td>
                    <span class="alg-index-msg" style="color: red;"></span>
                </td>
                <td>
                    <button class="btn btn-sm alg-btn alg-index-submit" type="button">Add</button>
                    <button class="btn btn-sm alg-btn alg-index-delete alg-hidden" type="button">Delete</button>
                    <button class="btn btn-sm alg-btn alg-index-ignore" type="button">Ignore</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss">

</style>

<script>
// TODO
// Add textarea scroll style
</script>
