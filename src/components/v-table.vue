<template>
    <div class='v-table'>
        <div class='header'>
            <div class='header_name'>Название</div>
            <div class='header_name'>Статус</div>
            <div class='header_name'>Ответственный</div>
            <div class='header_name'>Дата создания</div>
            <div class='header_name'>Бюджет</div>
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
    width: 90%;
    margin-top: 30px;
}

.header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    border-bottom: 1px solid deeppink;
    padding-bottom: 10px;
}

.header_name {
    flex-basis: 20%;
}

.header_name:first-child {
    flex-basis: 30%;
}

.header_name:last-child {
    flex-basis: 10%;
}

.header_name:nth-child(4n) {
    flex-basis: 10%;
}

.header_name:nth-child(3n) {
    flex-basis: 10%;
}

</style>
