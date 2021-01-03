<template>
  <table class="calculator">
    <tr class="calculator__display">
      <td colspan="4">{{ display }}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td @click="divide">÷</td>
    </tr>
    <tr>
      <td @click="addNumber('7')">7</td>
      <td @click="addNumber('8')">8</td>
      <td @click="addNumber('9')">9</td>
      <td @click="multiply">×</td>
    </tr>
    <tr>
      <td @click="addNumber('4')">4</td>
      <td @click="addNumber('5')">5</td>
      <td @click="addNumber('6')">6</td>
      <td @click="substract">-</td>
    </tr>
    <tr>
      <td @click="addNumber('1')">1</td>
      <td @click="addNumber('2')">2</td>
      <td @click="addNumber('3')">3</td>
      <td @click="add">+</td>
    </tr>
    <tr>
      <td @click="clear">C</td>
      <td @click="addNumber('0')">0</td>
      <td @click="addDigit">.</td>
      <td @click="calculate">=</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "Calculator",

  data() {
    return {
      equation: "0",
      display: "0",
    };
  },

  methods: {
    calculate() {
      const result = eval(this.equation);

      if (result == Infinity) {
        this.display = "MATH ERROR";
      } else {
        this.display = result.toString();
        this.equation = result.toString();
      }
    },

    clear() {
      this.equation = "0";
      this.display = "0";
    },

    addNumber(number) {
      if (this.equation == "0") {
        this.equation = number;
        this.display = number;
      } else {
        this.equation += number;
        if (isNaN(this.display)) this.display = number;
        else this.display += number;
      }
    },

    add() {
      this.equation += "+";
      this.display = "+";
    },

    substract() {
      this.equation += "-";
      this.display = "-";
    },

    divide() {
      this.equation += "/";
      this.display = "÷";
    },

    multiply() {
      this.equation += "*";
      this.display = "x";
    },

    addDigit() {
      if (!this.equation.includes(".")) {
        this.equation += ".";
        this.display += ".";
      }
    },
  },
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

  &__display {
    td {
      background-color: rgb(190, 190, 190);
      text-align: right;
    }
  }
}
</style>
