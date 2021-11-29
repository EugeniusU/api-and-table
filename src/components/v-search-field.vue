<template>
    <div class='v-search-field'>
        <i id='warning_search_length' class='material-icons'
            v-if='query && query.length < 3'
        >warning_amber</i>
        <input type='text' v-model='query' placeholder='Запрос' @input='search'>
        <button class='search_btn' @click='search'>
            <i class='material-icons'>search</i>
        </button>
    </div>    
</template>

<script>
import {mapActions} from 'vuex'

export default({
    name: 'v-search-field',
    data() {
        return {
            query: ''
        }
    },
    components: {},
    methods: {
        ...mapActions([
            'GET_FILTRED_WITH_QUERY',
            'GET_DATA_FROM_API'
        ]),
        search() {
            let query = this.query.trim();

            if (query && query.length >= 3) {
                this.GET_FILTRED_WITH_QUERY(query)
            } else if (!query.length || !query) {
                console.log('this');
                this.GET_DATA_FROM_API().then(console.log)
            }

            console.log(query, query.length);
        }
    },
    computed: {}
})
</script>

<style>
.v-search-field {
    display: flex;
    align-self: flex-end;
    margin-right: 100px;
}

.search_btn {
    border: none;
    background: transparent;
}

#warning_search_length {
    color: orange;
    width: 30px;
    align-self: center;
}
</style>