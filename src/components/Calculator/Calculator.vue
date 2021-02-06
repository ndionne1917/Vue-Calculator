<template>
  <table class="calculator">
    <tr class="calculator__equation-display">
      <td colspan="4">{{ equationDisplay }}</td>
    </tr>
    <tr class="calculator__display">
      <td colspan="4">{{ display }}</td>
    </tr>
    <tr>
      <td class="calculator__button"></td>
      <td class="calculator__button"></td>
      <td class="calculator__button"></td>
      <td class="calculator__button" @click="addOperation('/')">÷</td>
    </tr>
    <tr>
      <td class="calculator__number" @click="addNumber('7')">7</td>
      <td class="calculator__number" @click="addNumber('8')">8</td>
      <td class="calculator__number" @click="addNumber('9')">9</td>
      <td class="calculator__button" @click="addOperation('*')">×</td>
    </tr>
    <tr>
      <td class="calculator__number" disabled @click="addNumber('4')">4</td>
      <td class="calculator__number" @click="addNumber('5')">5</td>
      <td class="calculator__number" @click="addNumber('6')">6</td>
      <td class="calculator__button" @click="addOperation('-')">-</td>
    </tr>
    <tr>
      <td class="calculator__number" @click="addNumber('1')">1</td>
      <td class="calculator__number" @click="addNumber('2')">2</td>
      <td class="calculator__number" @click="addNumber('3')">3</td>
      <td class="calculator__button" @click="addOperation('+')">+</td>
    </tr>
    <tr>
      <td class="calculator__button" @click="clear">C</td>
      <td class="calculator__number" @click="addNumber('0')">0</td>
      <td class="calculator__button" @click="addDigit">.</td>
      <td class="calculator__calculate-button" @click="calculate">
        =
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "Calculator",

  data() {
    return {
      equation: "0",
      hasCalculated: false,
      result: null,
    };
  },

  methods: {
    calculate() {
      if (!isNaN(this.equation.slice(-1))) {
        this.result = eval(this.equation).toString();
        this.hasCalculated = true;
      }
    },

    clear() {
      this.resetResult();
      this.equation = "0";
    },

    addNumber(number) {
      if (this.hasCalculated) {
        this.resetResult();
        this.equation = number;
      } else if (this.equation == "0") this.equation = number;
      else this.equation += number;
    },

    addOperation(operation) {
      if (this.hasCalculated) this.resetResult();

      if (isNaN(this.equation.slice(-1)))
        this.equation = this.equation.slice(0, -1) + operation;
      else this.equation += operation;
    },

    addDigit() {
      if (this.hasCalculated) this.resetResult();
      if (!this.equation.includes(".")) {
        this.equation += ".";
      }
    },

    resetResult() {
      this.equation = this.result;
      this.hasCalculated = false;
    },
  },

  computed: {
    display() {
      if (this.equation == Infinity) return "MATH ERROR";
      if (this.hasCalculated) return this.result;

      return this.equation.match(/\d+(?!.*\d)/).toString();
    },

    equationDisplay() {
      if (this.equation == Infinity) return "";

      var equationDisplay = this.equation;
      equationDisplay = equationDisplay.replace("+", " + ");
      equationDisplay = equationDisplay.replace("-", " - ");
      equationDisplay = equationDisplay.replace("*", " x ");
      equationDisplay = equationDisplay.replace("/", " ÷ ");
      if (this.hasCalculated) equationDisplay += " =";

      if (!isNaN(equationDisplay)) return "";
      return equationDisplay;
    },
  },
};
</script>
<style lang="scss" scoped>
.calculator {
  font-family: "Segoe UI";
  font-size: 1.5rem;
  width: 10rem;

  td {
    padding: 1rem 2rem 1rem 2rem;
    cursor: pointer;
    text-align: center;
    border: 2px solid rgb(223, 223, 223);
  }

  &__number {
    font-weight: 600;
  }

  &__button {
    background-color: rgb(240, 240, 240);
  }

  &__calculate-button {
    background-color: rgb(209, 207, 207);
  }

  &__display {
    td {
      border-style: inset;
      background-color: rgb(32, 32, 32);
      color: white;
      font-size: 2em;
      text-align: right;
      padding: 0.5rem 0.5rem 0.5rem 0;
    }
  }

  &__equation-display {
    td {
      padding: 0 0.5rem 0.2rem 0;
      height: 1rem;
      border: none;
      font-size: 0.8rem;
      text-align: right;
    }
  }
}
</style>
