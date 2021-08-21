const numberButtons = document.querySelectorAll('[data_number]')
const operationButtons = document.querySelectorAll('[data_operation]')
const equalsButton = document.querySelector('[data_equals]')
const deleteButton = document.querySelector('[data_delete]')
const allClearButton = document.querySelector('[data_all_clear]')
const oldValueTextElement = document.querySelector('[data_old_value]')
const newValueTextElement = document.querySelector('[data_new_value]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

class Calculator {
    constructor(oldValueTextElement, newValueTextElement) {
        this.oldValueTextElement = oldValueTextElement
        this.newValueTextElement = newValueTextElement
        this.clear()
    }

    clear() {
        this.new_value = ''
        this.old_value = ''
        this.operation = undefined
    }

    delete() {}

    appendNumber(number) {}

    chooseOperation(operation) {}

    compute() {}

    updateDisplay() {}
}