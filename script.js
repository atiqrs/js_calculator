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

    delete() {
        this.new_value = this.new_value.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.new_value.includes('.'))
            return this.new_value = this.new_value.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.new_value === '') return
        if (this.old_value !== '') {
            this.compute()
        }
        this.operation = operation
        this.old_value = this.new_value
        this.new_value = ''
    }

    compute() {
        this.new_value = computation
        this.operation = undefined
        this.old_value = ''
        let computation
        const prev = parseFloat(this.old_value)
        const current = parseFloat(this.new_value)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }

    }

    updateDisplay() {
        this.new_valueTextElement.innerText =
            this.getDisplayNumber(this.new_value)
        if (this.operation != null) {
            this.old_valueTextElement.innerText =
                `${this.getDisplayNumber(this.old_value)} ${this.operation}`
        } else {
            this.old_valueTextElement.innerText = ''
        }
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
}

const numberButtons = document.querySelectorAll('[data_number]')
const operationButtons = document.querySelectorAll('[data_operation]')
const equalsButton = document.querySelector('[data_equals]')
const deleteButton = document.querySelector('[data_delete]')
const allClearButton = document.querySelector('[data_all_clear]')
const oldValueTextElement = document.querySelector('[data_old_value]')
const newValueTextElement = document.querySelector('[data_new_value]')

const calculator = new Calculator(oldValueTextElement, newValueTextElement)

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

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})