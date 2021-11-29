<template>
    <div class='v-main-wrapper'>
        <v-search-field/>
        <v-table/>
    </div>    
</template>

<script>
import vTable from './v-table'
import vSearchField from './v-search-field'

export default({
    name: 'v-main-wrapper',
    components: {
        vTable,
        vSearchField
    }
})
</script>

<style>
.v-main-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 30px;
}
</style>