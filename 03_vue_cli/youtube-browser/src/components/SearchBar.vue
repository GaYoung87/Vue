<template>
<!-- template안에는 반드시 하나의 테그로 시작해야함!!! -->
  <div>
    <!-- input에 변화가 있을 때마다 onInput methods 를 실행하겠다 -->
    <!-- v-on === @ -->
    <input type="text" @input="onInput"/>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  methods: {
    onInput: function(event) {
      // eslint error -> console.log(event)를 사용하면 안됨
      // package.json에 가서 "rules": { "no-console": "off" } 지정
      // console.log(event.target.value)  // event.target = template의 input

      // inputChange 이벤트 발생했음을 알린다(우리가 정하는 event)
      // 그리고 input의 value를 넘겨준다
      this.$emit('inputChange', event.target.value)
    }
  }
}
</script>


<style scoped>  /* 하나의 컴포넌트에서만 하겠다 -> <style scoped>*/
  input {
    width: 75%;
  }

  div {
    text-align: center;
    margin: 20px;
  }
</style>