<template>
  <table class="calculator">
    <tr class="calculator__result">
      <td colspan="4">lol</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td>÷</td>
    </tr>
    <tr>
      <td>7</td>
      <td>8</td>
      <td>9</td>
      <td>×</td>
    </tr>
    <tr>
      <td>4</td>
      <td>5</td>
      <td>6</td>
      <td>-</td>
    </tr>
    <tr>
      <td>1</td>
      <td>2</td>
      <td>3</td>
      <td>+</td>
    </tr>
    <tr>
      <td>C</td>
      <td>0</td>
      <td>.</td>
      <td>=</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "Calculator",
};
</script>
<style lang="scss" scoped>
.calculator {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 1rem;
  width: 10rem;
  border-collapse: collapse;

  td {
    padding: 0.5rem;
    cursor: pointer;
    text-align: center;
    border: 1px solid rgb(143, 143, 143);
  }

  &__result {
    td {
      background-color: rgb(190, 190, 190);
      text-align: right;
    }
  }
}
</style>
