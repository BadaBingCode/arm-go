let clicks = 0;

const dish = document.getElementById('dish');
const table = document.getElementById('table');
const meat = document.getElementById('meat');
const vegetables = document.getElementById('vegetables');
const wine = document.getElementById('wine');
const message = document.getElementById('message');
const count = document.getElementById('count');
const progress = document.getElementById('progress');
const stageName = document.getElementById('stage-name');
const nextStage = document.getElementById('next-stage');
const hint = document.getElementById('hint');
const restart = document.getElementById('restart');
const stageItems = document.querySelectorAll('.stages li');

const stages = [
  { name: 'ЛАВАШ', message: 'Лаваш есть. Где шашлык?', next: 6, goal: 'До шашлыка' },
  { name: 'ШАШЛЫК', message: 'Вот теперь разговор пошёл!', next: 16, goal: 'До овощей' },
  { name: 'ОВОЩИ', message: 'Добавим красок и немного хруста', next: 31, goal: 'До вина' },
  { name: 'ВИНО', message: 'Стол готов. Душа просит танца', next: 50, goal: 'До кочари' },
  { name: 'КОЧАРИ!', message: 'А теперь танцуем кочари!' },
];

function getStage() {
  if (clicks <= 5) return 0;
  if (clicks <= 15) return 1;
  if (clicks <= 30) return 2;
  if (clicks <= 49) return 3;

  return 4;
}

function clickWord(number) {
  if (number === 1) return 'клик';
  if (number >= 2 && number <= 4) return 'клика';

  return 'кликов';
}

function updateScreen() {
  const stageIndex = getStage();
  const stage = stages[stageIndex];
  const finished = clicks === 50;

  meat.hidden = stageIndex < 1;
  vegetables.hidden = stageIndex < 2;
  wine.hidden = stageIndex < 3;
  table.classList.toggle('dancing', finished);
  dish.setAttribute('aria-disabled', String(finished));
  count.textContent = clicks;
  progress.value = clicks;
  stageName.textContent = `0${stageIndex + 1} / ${stage.name}`;

  if (message.textContent !== stage.message) message.textContent = stage.message;
  const remaining = stage.next - clicks;
  nextStage.textContent = finished ? 'Застолье удалось!' : `${stage.goal} — ${remaining} ${clickWord(remaining)}`;
  hint.hidden = finished;
  restart.hidden = !finished;

  stageItems.forEach((item, index) => {
    item.classList.toggle('current', index === stageIndex);
    item.classList.toggle('done', index < stageIndex || finished);
    if (index === stageIndex) item.setAttribute('aria-current', 'step');
    else item.removeAttribute('aria-current');
  });
}

dish.addEventListener('click', (event) => {
  // Клавиатурный клик имеет detail = 0. Считаем только клик мышкой.
  if (event.detail === 0 || clicks >= 50) return;
  clicks += 1;
  updateScreen();
});

restart.addEventListener('click', () => {
  clicks = 0;
  updateScreen();
});

updateScreen();
