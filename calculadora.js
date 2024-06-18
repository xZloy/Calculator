const display = document.getElementById('display');
    const calculator = document.querySelector('.calculator');
    const keys = calculator.querySelectorAll('button');

    let firstOperand = '';
    let secondOperand = '';
    let operator = '';
    let result = '';

    keys.forEach(key => {
        key.addEventListener('click', (event) => {
            const { value } = event.target;
            if (event.target.classList.contains('number')) {
                inputNumber(value);
            } else if (event.target.classList.contains('operator')) {
                handleOperator(value);
            } else if (event.target.classList.contains('decimal')) {
                inputDecimal();
            } else if (event.target.classList.contains('all-clear')) {
                clearDisplay();
            } else if (event.target.classList.contains('delete')) {
                deleteLast();
            } else if (event.target.classList.contains('equals')) {
                handleEqualSign();
            }
            updateDisplay();
        });
    });

    const inputNumber = (num) => {
        if (operator) {
            secondOperand = secondOperand === '' ? num : secondOperand + num;
        } else {
            firstOperand = firstOperand === '' ? num : firstOperand + num;
        }
    };

    const handleOperator = (nextOperator) => {
        if (operator && secondOperand) {
            calculate();
        }
        firstOperand = result || firstOperand;
        operator = nextOperator;
        secondOperand = '';
    };

    const inputDecimal = () => {
        if (operator) {
            if (!secondOperand.includes('.')) {
                secondOperand += '.';
            }
        } else {
            if (!firstOperand.includes('.')) {
                firstOperand += '.';
            }
        }
    };

    const clearDisplay = () => {
        firstOperand = '';
        secondOperand = '';
        operator = '';
        result = '';
    };

    const deleteLast = () => {
        if (operator) {
            secondOperand = secondOperand.slice(0, -1);
        } else {
            firstOperand = firstOperand.slice(0, -1);
        }
    };

    const handleEqualSign = () => {
        if (operator && secondOperand) {
            calculate();
            operator = '';
            firstOperand = result;
            secondOperand = '';
        }
    };

    const calculate = () => {
        const first = parseFloat(firstOperand);
        const second = parseFloat(secondOperand);

        if (operator === '+') {
            result = first + second;
        } else if (operator === '-') {
            result = first - second;
        } else if (operator === '*') {
            result = first * second;
        } else if (operator === '/') {
            result = first / second;
        }
    };

    const updateDisplay = () => {
        display.value = secondOperand || firstOperand || '0';
    };