// Функция для обновления формы в зависимости от выбора
function updateForm() {
    let percentType = document.getElementById('percentType').value;
    let calculateType = document.getElementById('calculateType').value;

    let inputForm = document.getElementById('inputForm');
    inputForm.innerHTML = '';

    // Поля для ввода, которые необходимо отображать в зависимости от выбора
    if (calculateType !== 'S') {
        inputForm.innerHTML += '<label for="S">Сумма (S):</label><input type="number" id="S" step="any">';
    }

    if (calculateType !== 'P') {
        inputForm.innerHTML += '<label for="P">Начальный вклад (P):</label><input type="number" id="P" step="any">';
    }

    if (calculateType !== 'i') {
        inputForm.innerHTML += '<label for="i">Процентная ставка (i):</label><input type="number" id="i" step="any">';
    }

    if (calculateType !== 'n') {
        inputForm.innerHTML += '<label for="n">Период времени (n):</label><input type="number" id="n" step="any">';

        // Добавляем выбор единицы времени для периода
        inputForm.innerHTML += `
            <label for="timeUnit">Выберите единицу времени:</label>
            <select id="timeUnit">
                <option value="years">Годы</option>
                <option value="months">Месяцы</option>
                <option value="days">Дни</option>
            </select>
        `;
    }
}

// Функция для выполнения расчета
function calculate() {
    let percentType = document.getElementById('percentType').value;
    let calculateType = document.getElementById('calculateType').value;

    let S = parseFloat(document.getElementById('S')?.value);
    let P = parseFloat(document.getElementById('P')?.value);
    let i = parseFloat(document.getElementById('i')?.value);
    let n = parseFloat(document.getElementById('n')?.value);
    let timeUnit = document.getElementById('timeUnit') ? document.getElementById('timeUnit').value : 'years';

    let result;
    let labelText;  // Для хранения текста, который будет выводиться вместе с результатом

    // Преобразование времени в годы
    if (timeUnit === 'months') {
        n = n / 12; // Если выбран месяц, преобразуем в годы
    } else if (timeUnit === 'days') {
        n = n / 365; // Если выбран день, преобразуем в годы
    }

    // Определение текста в зависимости от того, что мы рассчитываем
    if (calculateType === 'S') {
        labelText = "Сумма";
    } else if (calculateType === 'P') {
        labelText = "Первоначальный вклад";
    } else if (calculateType === 'i') {
        labelText = "Процентная ставка";
    } else if (calculateType === 'n') {
        labelText = "Период времени";
    }

    // Расчет для простых процентов
    if (percentType === 'simple') {
        if (calculateType === 'S') {
            result = P * (1 + i * n);
        } else if (calculateType === 'P') {
            result = S / (1 + i * n);
        } else if (calculateType === 'i') {
            result = (S / P - 1) / n;
        } else if (calculateType === 'n') {
            result = (S / P - 1) / i;
        }
    }

    // Расчет для сложных процентов
    else if (percentType === 'compound') {
        if (calculateType === 'S') {
            result = P * Math.pow((1 + i), n);
        } else if (calculateType === 'P') {
            result = S / Math.pow((1 + i), n);
        } else if (calculateType === 'i') {
            result = Math.pow((S / P), (1 / n)) - 1;
        } else if (calculateType === 'n') {
            result = Math.log(S / P) / Math.log(1 + i);
        }
    }

    let outputElement = document.getElementById('output');
    outputElement.textContent = `${labelText}: ${result ? result.toFixed(2) : 'Ошибка'}`; // Вывод с названием

    // Показ результата с анимацией
    outputElement.classList.remove('show');
    void outputElement.offsetWidth;  // Трюк для перезапуска анимации
    outputElement.classList.add('show');
}
