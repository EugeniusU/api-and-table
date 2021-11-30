<template>
    <div class='v-table'>
        <div class='header'>
            <div>Название</div>
            <div>Статус</div>
            <div>Ответственный</div>
            <div>Дата создания</div>
            <div>Бюджет</div>
        </div>

        <v-table-item
            v-for='(obj, index) in DATA'
            :key='index'
            :tableRow='obj'
        >
        </v-table-item>
    </div>    
</template>

<script>
import vTableItem from './v-table-item'
import {mapActions, mapGetters} from 'vuex'

export default({
    name: 'v-table',
    components: {
        vTableItem
    },
    computed: {
        ...mapGetters([
            'DATA'
        ])
    },
    methods: {
        ...mapActions([
            'GET_DATA_FROM_API'
        ])
    },
    mounted() {
       this.GET_DATA_FROM_API().then(console.log)
    }
})
</script>

<style>
.v-table {
    display: flex;
    flex-direction: column;
    align-self: center;
    width: 80%;
    margin-top: 30px;
}

.header {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.header > div {
    flex-basis: 20%;
}
</style>
