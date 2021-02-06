<template>
  <div id="app"><calculator></calculator></div>
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
<style scoped>
.calculator {
  margin-left: 2rem;
}
</style>
