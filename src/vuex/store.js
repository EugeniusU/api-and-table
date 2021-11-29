import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        data: []
    },
    mutations: {
        SET_DATA_TO_STATE: (state, data) => {
            state.data = data;
        },
    },
    actions: {
        GET_DATA_FROM_API({commit}) {
            return axios('http://localhost:8000/api/data', {
                method: 'GET'
            })
            .then((data) => {
                commit('SET_DATA_TO_STATE', data.data);
                return data.data;
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
        },
        GET_FILTRED_WITH_QUERY({commit}, query) {
            return axios(`http://localhost:8000/api/data?query=${query}`, {
                method: 'GET'
            })
            .then((data) => {
                commit('SET_DATA_TO_STATE', data.data);
                return data.data;
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
        }
    },
    getters: {
        DATA(state) {
            return state.data;
        },
    }
});

export default store
