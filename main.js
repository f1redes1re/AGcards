// eslint-disable-next-line import/extensions
import { Card, AmazingCard } from './class-card.js';
// eslint-disable-next-line import/no-cycle

/* eslint-disable no-underscore-dangle */
// Функция создания первоначального массива чисел
// eslint-disable-next-line max-classes-per-file
function createNumArray(count) {
  const numArray = [];
  for (let num = 1; num <= (count ** 2 / 2); num++) {
    numArray.push(num, num);
  }
  return numArray;
}

// Функция перемешивания чисел в массиве
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Функция создания DOM-элемента
export function createDOMElement(tag, classes = [], attributes = {}, textContent = '') {
  const element = document.createElement(tag);
  if (Array.isArray(classes)) {
    element.classList.add(...classes);
  }
  // eslint-disable-next-line guard-for-in
  for (const attr in attributes) {
    element.setAttribute(attr, attributes[attr]);
  }
  element.textContent = textContent;
  return element;
}

// Функция добавления начальной игровой формы
function addStartGameForm() {
  const container = createDOMElement('div', ['container'], { id: 'container' });
  const gameForm = createDOMElement('form', ['main__ask-container'], { id: 'gameForm' });
  const gameFormLabel = createDOMElement('label', ['main__ask-title'], { for: 'inputCardsNum' }, 'Количество карточек (по вертикали и горизонтали)');
  const gameFormInput = createDOMElement('input', ['main__ask-input', 'form-control'], {
    type: 'number',
    required: true,
    min: 0,
    max: 10,
    id: 'inputCardsNum',
    placeholder: 'Введите четное число от 4 до 10',
  });
  const gameFormBtn = createDOMElement('button', ['main__ask-btn', 'btn'], { type: 'submit', id: 'gameFormBtn' }, 'Начать игру');

  const switchGameModeContainer = createDOMElement('div', ['switch-container'], {});
  const switchGameModeLabel = createDOMElement('label', ['switch'], {});
  const switchGameModeInput = createDOMElement('input', ['checkbox'], { type: 'checkbox', id: 'switch' });
  const switchGameModeSpan = createDOMElement('span', ['slider', 'round'], {});
  const switchGameModeTextNum = createDOMElement('span', ['slider-text', 'slider-text-num'], {}, 'Числа');
  const switchGameModeTextPic = createDOMElement('span', ['slider-text'], {}, 'Картинки');

  // Добавление элементов в DOM
  gameForm.append(gameFormLabel, gameFormInput, gameFormBtn);
  switchGameModeLabel.append(switchGameModeInput, switchGameModeSpan);
  switchGameModeContainer.append(switchGameModeTextNum, switchGameModeLabel, switchGameModeTextPic);
  container.append(switchGameModeContainer);
  container.append(gameForm);
  document.body.append(container);
}

// Объявление глобальной переменной для временного интервала
let timerInterval;

// Функция добавления таймера в DOM
function addGameTimer() {
  // Создание контейнера для таймера
  const gameTimerWrapper = createDOMElement('div', ['main__timer-wrapper'], { id: 'gameTimerWrapper' });

  // Создание числовой записи игрового таймера
  const gameTimer = createDOMElement('span', ['main__timer'], { id: 'gameTimer' }, '60');

  // Создание текста перед таймером
  const gameTimerPreviewText = createDOMElement('span', ['main__timer-text'], { id: 'gameTimerPreviewText' }, 'Осталось времени:');

  // Добавление элементов на страницу
  gameTimerWrapper.append(gameTimerPreviewText, gameTimer);
  document.getElementById('container').append(gameTimerWrapper);
  gameTimerWrapper.style.display = 'none';
}

// Функция запуска таймера
function startTimer(someTimer) {
  // Остановка предыдущего таймера
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  let remainingTime = parseInt(someTimer.textContent, 10);

  timerInterval = setInterval(() => {
    remainingTime--;
    const remainingSeconds = remainingTime % 60;
    const formattedTime = remainingSeconds.toString().padStart(2, '0');
    someTimer.textContent = formattedTime;
    if (remainingTime === 0) {
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
  }, 1000);
}

// Функция остановки таймера
function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
}

// Функция завершения партии игры
function endGameBtnVisible() {
  const continueGame = document.querySelector('.main__continue-btn');
  const exitToStart = document.querySelector('.main__exit-btn');

  // Изменяем видимость кнопок
  continueGame.style.display = 'block';
  exitToStart.style.display = 'block';

  stopTimer();
}

// Функция добавления кнопок завершения игры
function addEndGameBtns(someContainer, someCards, someCount, SomeClass) {
  const continueGame = createDOMElement('button', ['btn', 'main__continue-btn'], {}, 'Сыграть ещё раз');
  someContainer.append(continueGame);
  continueGame.scrollIntoView({ behavior: 'smooth' });
  continueGame.style.display = 'none';

  const exitToStart = createDOMElement('button', ['btn', 'main__exit-btn'], {}, 'Перейти в главное меню');
  someContainer.append(exitToStart);
  continueGame.after(exitToStart);
  exitToStart.style.display = 'none';

  continueGame.addEventListener('click', () => {
    // eslint-disable-next-line no-use-before-define
    createGameField(someContainer, someCount, someCards, SomeClass);

    // eslint-disable-next-line no-use-before-define
    gameCardsFn(someCount, SomeClass);
  });

  exitToStart.addEventListener('click', () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  });
}

// Функция создания и добавления в DOM игрового поля
function createGameField(someContainer, someCount, someCards, SomeClass) {
  if (someContainer.firstChild) {
    // eslint-disable-next-line no-use-before-define
    deleteGameField();
  }

  // Создание контейнера и картинки
  const gameImgWrapper = createDOMElement('div', ['main__wrap']);
  const gameImage = createDOMElement('img', ['main__image'], {
    src: 'https://media.giphy.com/media/fAD9SMlNWp0k84Ra1G/giphy.gif',
  });
  gameImgWrapper.append(gameImage);
  someContainer.append(gameImgWrapper);

  addGameTimer();

  const gameTimer = document.getElementById('gameTimer');
  const gameTimerWrapper = document.getElementById('gameTimerWrapper');
  const gameTimerPreviewText = document.getElementById('gameTimerPreviewText');

  // Добавление в контейнер картинки и обертки для карточек
  gameTimerWrapper.append(gameTimerPreviewText);
  gameTimerWrapper.append(gameTimer);
  someContainer.append(gameTimerWrapper);

  gameTimerWrapper.style.display = '';

  startTimer(gameTimer);

  // Создание контейнера для кнопок
  const cardWrapper = createDOMElement('div', ['btn-wrapper']);
  someContainer.append(cardWrapper);

  // Добавление на страницу сетки из карточек
  const rows = someCount;
  const cols = someCount;
  const addCardsTable = createDOMElement('table');
  // Цикл добавления строк
  for (let i = 0; i < rows; i++) {
    const row = createDOMElement('tr');
    addCardsTable.append(row);
    // Цикл добавления ячеек
    for (let j = 0; j < cols; j++) {
      const cell = createDOMElement('td');
      const index = i * cols + j;
      row.append(cell);
      // добавление карточки в ячейку таблицы
      cell.append(someCards[index]);
    }
  }
  const gameForm = document.getElementById('gameForm');
  if (gameForm) {
    gameForm.remove();
  }
  cardWrapper.append(addCardsTable);

  addEndGameBtns(someContainer, someCards, someCount, SomeClass);
}

function deleteGameField() {
  const container = document.getElementById('container');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function gameCardsFn(someCount, SomeClass) {
  const container = document.getElementById('container');

  // Проверка ввода корректного значения
  // eslint-disable-next-line no-restricted-globals
  if (!someCount || isNaN(someCount)) {
    return;
  }

  if (someCount > 10 || someCount < 2 || (someCount % 2 !== 0)) {
    // eslint-disable-next-line no-param-reassign
    someCount = 4;
  }

  // Создание массива перемешанных карточек
  const numArray = shuffle(createNumArray(someCount));

  // Создание массива для проверки каждых двух открытых карточек
  let checkPairs = [];

  // Создание счетчика для найденных парных карточек
  let pairsCounter = 0;

  // Создание массива для всех кнопок
  const cards = [];

  // Цикл создания поля карточек
  for (const num of numArray) {
    // Создание карточки, стилизация, наполнение
    // eslint-disable-next-line no-shadow, no-loop-func
    const card = new SomeClass(container, ((card) => {
      // Проверка октрыта ли карточка
      if (card.element.classList.contains('btn-font-white') || card.element.classList.contains('img-font-white')) {
        return;
      }

      // Открываем карточку
      card.open = true;

      // Отправляем карточку в массив найденных парных карточек
      checkPairs.push(card);

      // Проверка совпадения пары в массиве
      if (checkPairs.length === 2) {
        // Проверка двух ранее добавленных карточек на парность
        const firstNum = parseInt(checkPairs[0].element.textContent, 10);
        const secondNum = parseInt(checkPairs[1].element.textContent, 10);
        if (firstNum === secondNum) {
          // eslint-disable-next-line no-param-reassign
          pairsCounter++;
          // eslint-disable-next-line no-param-reassign
          checkPairs = [];
          if (pairsCounter === (someCount ** 2 / 2)) {
            // eslint-disable-next-line no-use-before-define
            endGameBtnVisible(someCount, cards);
          }
        }
      }

      // Действия для двух не-совпавших открытых карточек
      if (checkPairs.length > 2) {
        const firstCard = checkPairs[0];
        const secondCard = checkPairs[1];

        firstCard.open = false;
        secondCard.open = false;

        // Если пара не совпала, убираем карточки из массива проверки
        // eslint-disable-next-line no-shadow
        checkPairs = checkPairs.filter((card) => card !== firstCard && card !== secondCard);
      }

      // Проверка для того, чтобы можно было сыграть еще раз
      if (pairsCounter === (someCount ** 2 / 2)) {
        pairsCounter = 0;
        if (document.querySelector('.main__continue-btn') && document.querySelector('.main__exit-btn')) {
          endGameBtnVisible();
        }
      }
    }));

    // Создание карточки как DOM элемента, соответствующего своему числу
    card.createElement(num);

    // Добавление карточки в общий массив
    cards.push(card.element);
  }

  createGameField(container, someCount, cards, SomeClass);
}

// Функция начала игры
export default function startGame() {
  addStartGameForm();

  document.getElementById('gameFormBtn').addEventListener('click', (event) => {
    event.preventDefault();

    const gameFormInput = document.getElementById('inputCardsNum');
    const count = parseInt(gameFormInput.value, 10);

    if (document.getElementById('switch').checked) {
      gameCardsFn(count, AmazingCard);
    } else {
      gameCardsFn(count, Card);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  startGame();
});
