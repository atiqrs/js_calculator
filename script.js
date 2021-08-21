class Calculator {
    constructor(oldValueTextElement, newValueTextElement) {
        this.oldValueTextElement = oldValueTextElement
        this.newValueTextElement = newValueTextElement
        this.clear()
    }

    clear() {
        this.newValue = ''
        this.oldValue = ''
        this.operation = undefined
    }

    delete() {
        this.newValue = this.newValue.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.newValue.includes('.')) return
        this.newValue = this.newValue.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.newValue === '') return
        if (this.oldValue !== '') {
            this.compute()
        }
        this.operation = operation
        this.oldValue = this.newValue
        this.newValue = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.oldValue)
        const current = parseFloat(this.newValue)
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
        this.newValue = computation
        this.operation = undefined
        this.oldValue = ''
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

    updateDisplay() {
        this.newValueTextElement.innerText =
            this.getDisplayNumber(this.newValue)
        if (this.operation != null) {
            this.oldValueTextElement.innerText =
                `${this.getDisplayNumber(this.oldValue)} ${this.operation}`
        } else {
            this.oldValueTextElement.innerText = ''
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