// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
function createNumArray(count) {
  const numArray = [];
  for (let num = 1; num <= (Math.pow(count, 2) / 2); num++) {
    const pairNum = Math.floor(Math.random() * 8) + 1;
    numArray.push(pairNum, pairNum);
  }
  return numArray;
};

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел
function shuffle(arr) {
for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.
function startGame() {

  // Блок № 1 - Создание ДОМ элементов
  const container = document.createElement('div');
  container.classList.add('container');

  // Создание формы
  const gameForm = document.createElement('form');
  gameForm.classList.add('main__ask-container');

  // Создание заголовка форме
  const gameFormLabel = document.createElement('label');
  gameFormLabel.classList.add('main__ask-title');
  gameFormLabel.setAttribute('for', 'inputCardsNum');
  gameFormLabel.textContent = 'Количество карточек по вертикали / горизонтали';

  // Создание ввода в форме
  const gameFormInput = document.createElement('input');
  gameFormInput.classList.add('main__ask-input', 'form-control');
  gameFormInput.type = 'number';
  gameFormInput.required = true;
  gameFormInput.min = 0;
  gameFormInput.max = 10;
  gameFormInput.placeholder = 'Введите четное число от 4 до 10';
  gameFormInput.setAttribute('id', 'inputCardsNum');

  // Создание кнопки, создающей поле карточек
  const gameFormBtn = document.createElement('button');
  gameFormBtn.classList.add('main__ask-btn', 'btn');
  gameFormBtn.textContent = 'Начать игру';
  gameFormBtn.type = 'submit';

  // Создание контейнера и картинки
  const gameImgWrapper = document.createElement('div');
  gameImgWrapper.classList.add('main__wrap');
  const gameImage = document.createElement('img');
  gameImage.src = 'https://media.giphy.com/media/fAD9SMlNWp0k84Ra1G/giphy.gif';
  gameImage.classList.add('main__image');

  // Создание контейнера для кнопок
  const cardWrapper = document.createElement('div');
  cardWrapper.classList.add('btn-wrapper');

  // Создание игрового таймера
  const gameTimerWrapper = document.createElement('div');
  gameTimerWrapper.classList.add('main__timer-wrapper');
  const gameTimer = document.createElement('span');
  gameTimer.classList.add('main__timer');
  gameTimer.textContent = '60';
  const gameTimerPreviewText = document.createElement('span');
  gameTimerPreviewText.classList.add('main__timer-text');
  gameTimerPreviewText.textContent = 'Осталось времени:';

  // Добавление контейнера в ДОМ
  document.body.append(container);
  // Добавление в контейнер формы и ее составляющих
  container.append(gameForm);
  gameForm.append(gameFormLabel);
  gameForm.append(gameFormInput);
  gameForm.append(gameFormBtn);

  // Блок № 2 - добавления события для клика по кнопке формы
  gameFormBtn.addEventListener('click', function(event) {
    // Отмена дефолт события отправки данных
    event.preventDefault();

    // Функция таймера
    let remainingTime = parseInt(gameTimer.textContent);
    let timerInterval;
    function startTimer() {
      timerInterval = setInterval(function() {
        remainingTime--;
        const formattedTime = formatTime(remainingTime);
        gameTimer.textContent = formattedTime;
        if (remainingTime === 0) {
          location.reload();
        }
      }, 1000);
    }
    function stopTimer() {
      clearInterval(timerInterval);
    }
    function formatTime(seconds) {
      const remainingSeconds = seconds % 60;
      return `${pad(remainingSeconds)}`;
    }
    function pad(number) {
      return number.toString().padStart(2, '0');
    }
    startTimer();

    // Проверка ввода корректного значения
    let count = parseInt(gameFormInput.value);

    if (!count || isNaN(count)) {
      return
    };

    if (count > 10 || count < 2 || (count % 2 !== 0)) {
      count = 4;
    }

    // Добавление в контейнер картинки и обертки для карточек
    gameImgWrapper.append(gameImage);
    gameTimerWrapper.append(gameTimerPreviewText);
    gameTimerWrapper.append(gameTimer);
    container.append(gameImgWrapper);
    container.append(gameTimerWrapper);
    container.append(cardWrapper);

    let numArray = shuffle(createNumArray(count));
    // Создание массива карточек
    let checkPairs = [];
    // Создание массива для проверки пар
    let pairsCounter = 0;
    // Создание счетчика количества найденных парных карточек
    let cards = [];
    // Создание массива для всех кнопок

    // Блок № 3 - цикл создания поля карточек
    for (let num = 0; num < numArray.length; num++) {

      // Создание карточки, стилизация, наполнение
      const card = document.createElement('button');
      card.classList.add('btn', 'btn-font-black');
      card.textContent = numArray[num];

      // Блок 4 - добавление события клика по карточке
      card.addEventListener('click', function() {

        if (card.classList.contains('btn-font-white')) {
          return
        };

        card.classList.add('btn-font-white');
        // Открываем карточку

        checkPairs.push(card);
        // Добавляем карточку в массив проверки парных карточек

        if (checkPairs.length === 2) {
          const firstNum = parseInt(checkPairs[0].textContent);
          // Создание переменной для числа в первой карточке
          const secondNum = parseInt(checkPairs[1].textContent);
          // Создание переменной для числа во второй карточке
          if (firstNum === secondNum) {
            // Проверка: если первая открытая карточка совпадает со второй
            pairsCounter++;
            checkPairs = [];
            // После проверки двух карточек массив проверки обнуляется
            if (pairsCounter === (Math.pow(count, 2) / 2)) {
              // Создание кнопки "Сыграть ещё"
              const continueGame = document.createElement('button');
              continueGame.textContent = 'Сыграть ещё раз';
              continueGame.classList.add('main__continue-btn', 'btn');
              container.append(continueGame);
              continueGame.scrollIntoView({ behavior: 'smooth' });

              // Создание кнопки перезапуска игры
              const exitToStart = document.createElement('button');
              exitToStart.textContent = 'Перейти в главное меню';
              exitToStart.classList.add('main__exit-btn', 'btn');

              // Создание обработчика события клика для кнопки "Сыграть ещё"
              continueGame.addEventListener('click', function() {
                const btnWhiteRemove = btn => btn.classList.remove('btn-font-white');
                cards.forEach(btnWhiteRemove);
                checkPairs = [];
                pairsCounter = 0;
                stopTimer();
                remainingTime = 60;
                startTimer();
                container.removeChild(exitToStart);
                container.removeChild(continueGame);
                timeout = setTimeout(function() {
                  let numArray = shuffle(createNumArray(count));
                  cards.forEach((card, index) => {
                    card.textContent = numArray[index];
                    card.classList.remove('btn-font-white');
                  });
                }, 100)
              });

              container.append(exitToStart);
              continueGame.after(exitToStart);
              exitToStart.addEventListener('click', function() {
                location.reload();
              })
            }
          }
        };
        if (checkPairs.length > 2) {
          (resetNotPairs = () => {
            const firstCard = checkPairs[0];
            const secondCard = checkPairs[1];
            firstCard.classList.remove('btn-font-white');
            secondCard.classList.remove('btn-font-white');
            checkPairs.splice(firstCard, 1);
            checkPairs.splice(secondCard, 1);
          })();
        }
      });

      // Блок 5 - добавление карточки в общий массив
      cards.push(card);
    }

    // Блок 6 - добавление на страницу сетки из карточек
    const rows = count;
    const cols = count;
    const addCardsTable = document.createElement('table');
    // Цикл добавления строк
    for (let i = 0; i < rows; i++) {
      const row = document.createElement('tr');
      addCardsTable.append(row);
      // Цикл добавления ячеек
      for (let j = 0; j < cols; j++) {
        const cell = document.createElement('td');
        const index = i * cols + j;
        row.append(cell);
        cell.append(cards[index]); // добавление карточки в ячейку таблицы
      }};
    container.removeChild(gameForm);
    cardWrapper.append(addCardsTable);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  startGame();
});
