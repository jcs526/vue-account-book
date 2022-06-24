import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);


export const store= new Vuex.Store({
    state:{
        test: "dd",
        contents: [],
    },
    mutations:{
        ADD_CONTENT(state,obj) {
            state.contents.unshift(obj);
        },
        UPDATE_CONTENT(state,{obj,index}){
            state.contents.splice(index,1,obj)
        },
        DELETE_CONTENT(state,index){
            state.contents.splice(index,1)
        }
    },

    getters:{
        getContents(state){
            return state.contents;
        },
        getAllSpend(state){
            return state.contents.filter(item=>item.condition=='spend').map(item=>parseInt(item.money)).reduce((p,c)=>p+c,0);
        },
        getAllIncome(state){
            return state.contents.filter(item=>item.condition=='income').map(item=>parseInt(item.money)).reduce((p,c)=>p+c,0);
        }
    }

})