<template>
    <div class='v-main-wrapper'>
        <v-search-field/>
        <v-table/>
        <v-loading-info v-if='!DATA.length'></v-loading-info>
    </div>    
</template>

<script>
import vTable from './v-table'
import vSearchField from './v-search-field'
import vLoadingInfo from './v-loading-info'

import {mapGetters} from 'vuex'

export default({
    name: 'v-main-wrapper',
    components: {
        vTable,
        vSearchField,
        vLoadingInfo
    },
    computed: {
        ...mapGetters([
            'DATA'
        ])
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
