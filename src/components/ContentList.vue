<template>
  <div>
    <div>총 지출 : {{ getAllSpend.toLocaleString('ko-KR') }} 원</div>
    <div>총 수입 : {{ getAllIncome.toLocaleString('ko-KR') }} 원</div>
    <div>결산 금액 : 
        <span v-if=" (getAllIncome - getAllSpend) >=0"> + </span>
        {{ (getAllIncome - getAllSpend).toLocaleString('ko-KR') }} 원</div>
    <input-view></input-view>
        <button @click="viewBoth">전체 보기</button>
        <button @click="viewSpend">지출만 보기</button>
        <button @click="viewIncome">수입만 보기</button>
    <table>
      <tr>
        <th>종류</th>
        <th id="name">내역</th>
        <th>금액</th>
      </tr>
      <tr v-for="(item, index) in contents" :key="index">
      <template v-if="condition.includes(item.condition)">
        <td v-show="item.condition == 'income'">수입</td>
        <td v-show="item.condition == 'spend'">지출</td>
        <td>{{ item.name }}</td>
        <td>{{ item.money }}</td>
        <button @click="updateContent(index)">수정</button>
        <button @click="deleteContent">삭제</button>
      </template>
      </tr>
    </table>
    <modal-component v-if="showModal" :propsData="obj" :index="index" @close="showModal=false">asada</modal-component>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import InputView from "./InputView.vue";
import ModalComponent from "./common/ModalComponent.vue";
export default {
    data() {
        return {
            showModal:false,
            obj:{},
            index:null,
            condition : ["spend","income"],
        }
    },
  components: { InputView, ModalComponent },
  computed: {
    ...mapState(["contents"]),
    ...mapGetters({
      getAllSpend: "getAllSpend",
      getAllIncome: "getAllIncome",
    }),
  },
  methods:{
    deleteContent(index){
        this.$store.commit('DELETE_CONTENT',index)
    },
    updateContent(index){
        this.obj=this.contents[index]
        this.index=index;
        this.showModal=true;
    },
    viewBoth(){
        this.condition=['spend','income'];
    },
    viewSpend(){
        this.condition=['spend'];
    },
    viewIncome(){
        this.condition=['income'];
    }
  }
};
</script>

<style>
table {
  border: 1px solid black;
  width: 100%;
  /* border: 1px solid black; */
}
#name {
  width: 80%;
}
table {
  text-align: center;
  width: 100%;
  border: 1px solid #444444;
  border-collapse: collapse;
}
tr,
td,
th {
  border: 1px solid #444444;
}
</style>