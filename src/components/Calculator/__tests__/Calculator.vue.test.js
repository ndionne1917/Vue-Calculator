import { mount } from "@vue/test-utils";
import { DEFAULT_EQUATION } from "../../Calculator/Calculator.vue";
import Calculator from "../../Calculator/Calculator.vue";

const createWrapper = () => {
  return mount(Calculator);
};

let wrapper;

describe("Calculator", () => {
  describe("when mounted", () => {
    beforeEach(() => {
      wrapper = createWrapper();
    });
    it("has default equation value", () => {
      expect(wrapper.vm.$data.equation).toBe(DEFAULT_EQUATION);
    });
    it("has no result", () => {
      expect(wrapper.vm.$data.result).toBe(null);
    });
    it("has not calculated", () => {
      expect(wrapper.vm.$data.hasCalculated).toBe(false);
    });
  });

  describe("when triggers calculate button with valid equation", () => {
    const calculateFake = jest.spyOn(Calculator.methods, "calculate");
    const resetCalculationFake = jest.spyOn(
      Calculator.methods,
      "resetCalculation"
    );
    beforeEach(() => {
      wrapper = createWrapper();
      wrapper.find(".calculator__calculate-button").trigger("click");
    });

    it("calls calculate", () => {
      expect(calculateFake).toHaveBeenCalledTimes(1);
    });

    it("resets calculation", () => {
      expect(resetCalculationFake).toHaveBeenCalledWith({
        hasCalculatedValue: true,
        equationValue: wrapper.vm.$data.equation,
        resultValue: eval(wrapper.vm.$data.equation).toString(),
      });
    });
  });

  describe("when triggers calculate button with invalid equation", () => {
    let calculateFake;
    let resetCalculationFake;
    beforeEach(() => {
      jest.clearAllMocks();
      calculateFake = jest.spyOn(Calculator.methods, "calculate");
      resetCalculationFake = jest.spyOn(Calculator.methods, "resetCalculation");
      wrapper = createWrapper();
      wrapper.setData({ equation: "2*" });
      wrapper.find(".calculator__calculate-button").trigger("click");
    });

    it("calls calculate", () => {
      expect(calculateFake).toHaveBeenCalledTimes(1);
    });

    it("doesn't reset calculation", () => {
      expect(resetCalculationFake).not.toHaveBeenCalled();
    });
  });
});
