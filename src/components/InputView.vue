<template>
  <div>
    <select v-model="condition">
      <option value="spend">지출</option>
      <option value="income">수입</option></select
    ><br />
    항목: <input type="text" v-model="name" @keyup.enter="inputData"/><br />
    금액: <input type="number" v-model="money" @keyup.enter="inputData"/>
    <button @click="inputData">입력</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      condition: "spend",
      name: "",
      money: null,
    };
  },
  methods: {
    inputData() {
        console.log(typeof this.money)
      if (this.name !== "" && !isNaN(this.money)&&this.money ) {
        console.log("입력 클릭");
        const obj = {
          condition: this.condition,
          name: this.name,
          money: this.money,
        };
        this.$store.commit('ADD_CONTENT',obj)
        this.name="",
        this.money=null;
      }
      else{
        alert("입력값을 수정해주세요.")
      }
    },
  },
};
</script>

<style>
</style>