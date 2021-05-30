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
export const DEFAULT_EQUATION = "0";
export default {
  name: "Calculator",

  data() {
    return {
      equation: DEFAULT_EQUATION,
      hasCalculated: false,
      result: null,
    };
  },

  methods: {
    calculate() {
      if (this.isValidEquation)
        this.resetCalculation({
          hasCalculatedValue: true,
          equationValue: this.equation,
          resultValue: eval(this.equation).toString(),
        });
    },

    clear() {
      this.resetCalculation({
        equationValue: DEFAULT_EQUATION,
        resultValue: null,
      });
    },

    addNumber(number) {
      if (this.isInError)
        this.resetCalculation({ equationValue: number, resultValue: null });
      else if (this.equation == DEFAULT_EQUATION)
        this.resetCalculation({ equationValue: number });
      else this.resetCalculation({ equationValue: (this.equation += number) });
    },

    addOperation(operation) {
      if (this.isInError)
        this.resetCalculation({
          equationValue: DEFAULT_EQUATION + operation,
          resultValue: null,
        });
      else if (this.hasCalculated)
        this.resetCalculation({ equationValue: this.result + operation });
      else if (!this.isValidEquation)
        this.resetCalculation({
          equationValue: this.equation.slice(0, -1) + operation,
        });
      else
        this.resetCalculation({ equationValue: (this.equation += operation) });
    },

    addDigit() {
      if (this.isInError)
        this.resetCalculation({
          equationValue: DEFAULT_EQUATION + ".",
          resultValue: null,
        });
      else if (this.hasCalculated)
        this.resetCalculation({ equationValue: this.result });
      if (!this.lastNumberOfEquation.includes(".")) this.equation += ".";
    },

    resetCalculation({
      hasCalculatedValue = false,
      equationValue = DEFAULT_EQUATION,
      resultValue = this.result,
    }) {
      this.hasCalculated = hasCalculatedValue;
      this.equation = equationValue;
      this.result = resultValue;
    },
  },

  computed: {
    display() {
      if (this.isInError) return "MATH ERROR";
      if (this.hasCalculated) return this.result;

      return this.lastNumberOfEquation;
    },

    equationDisplay() {
      if (this.equation == DEFAULT_EQUATION) return "";

      var equationDisplay = this.equation;
      equationDisplay = equationDisplay.replace(/[+]/g, " + ");
      equationDisplay = equationDisplay.replace(/[-]/g, " - ");
      equationDisplay = equationDisplay.replace(/[*]/g, " x ");
      equationDisplay = equationDisplay.replace(/[/]/g, " ÷ ");
      if (this.hasCalculated) equationDisplay += " =";

      return equationDisplay;
    },

    isValidEquation() {
      return !isNaN(this.equation.slice(-1));
    },

    isInError() {
      return (
        Math.abs(this.result) == Infinity ||
        (isNaN(this.result) && this.result != null)
      );
    },

    lastNumberOfEquation() {
      const allNumbers = this.equation.match(/\d+(?:\.\d*)?/g);
      return allNumbers[allNumbers.length - 1];
    },
  },
};
</script>
<style lang="scss" scoped>
.calculator {
  font-family: $primary-font;
  font-size: 1.5rem;
  width: 10rem;

  td {
    padding: 1rem 2rem 1rem 2rem;
    cursor: pointer;
    text-align: center;
    border: 2px solid $gainsboro;
    &:hover:not(.calculator__calculate-button) {
      background-color: $gray-very-light;
    }
  }

  &__number {
    font-weight: 600;
    background-color: $white;
  }

  &__button {
    background-color: $whitesmoke;
  }

  &__calculate-button {
    background-color: $gray-very-light;
    &:hover {
      background-color: $gray-light;
    }
  }

  &__display {
    td {
      border-style: inset;
      background-color: $ebony;
      color: $white;
      font-size: 2.5rem;
      text-align: right;
      padding: 0.5rem 0.5rem 0.5rem 0;
      pointer-events: none;
    }
  }

  &__equation-display {
    td {
      padding: 0 0.5rem 0.2rem 0;
      height: 2rem;
      border: none;
      font-size: 0.8rem;
      text-align: right;
      pointer-events: none;
    }
  }
}
</style>
