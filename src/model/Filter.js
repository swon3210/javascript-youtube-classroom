export default class Filter {
  #selectedCondition
  #conditionList
  constructor(initialCondition = 'default', conditionList = []) {
    this.#selectedCondition = initialCondition;
    this.#conditionList = conditionList;
  }

  switchCondition(condition) {
    if (!this.#conditionList.includes(condition)) {
      return;
    }

    this.#selectedCondition = condition;
  }

  get selectedCondition() {
    return this.#selectedCondition;
  }
}