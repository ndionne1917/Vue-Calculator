<template>
  <div id="app">
    <h1>A Vue.js calculator</h1>
    <calculator></calculator>
    <h3>Made by <a href="htttp://www.linkedin.com/in/nicolas-dionne-799495211">Nicolas Dionne</a></h3>
    </div>
</template>

<script>
import Calculator from "./components/Calculator/Calculator.vue";

export default {
  name: "App",
  components: {
    Calculator,
  },
};
</script>
<style scoped lang="scss">
h1,h3 {
  font-family:$heading-font;
  margin-bottom:0;
}
div{
  display:flex;
  align-items: center;
  flex-direction: column;
}
</style>
