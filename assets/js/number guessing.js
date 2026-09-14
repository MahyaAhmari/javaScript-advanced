let secretNumber = Math.floor(Math.random() * 100) + 1;


const message = document.getElementById('message');
const attempt = document.getElementById('attempts');
const bestScoreSpan = document.getElementById('bestScore');
const guessBtn = document.getElementById('guessBtn');
const guessInput = document.getElementById('guessInput');
const history = document.getElementById('history');


const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const toPersianNumber = (value) =>
    String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[digit]);


const bestScore = localStorage.getItem('bestScore');
bestScoreSpan.textContent = bestScore ? toPersianNumber(bestScore) : '۰';


let attempts = 0;
message.textContent = "";


const addToHistory = (guess, type) => {
    const span = document.createElement('span');
    span.textContent = toPersianNumber(guess);
    span.className = 'px-3 py-1 rounded-lg font-bold ' + 
        (type === 'low' ? 'bg-red-200 text-red-800' :
         type === 'high' ? 'bg-blue-200 text-blue-800' :
         'bg-emerald-200 text-emerald-800');
    history.appendChild(span);
};

guessBtn.addEventListener('click', () => {
    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess)) {
        message.textContent = `هنوز عددی وارد نکردی!`;
        message.classList.add('bg-red-200', 'text-red-700');
        message.classList.remove('bg-emerald-200', 'text-emerald-800');

        return;
    }

    if (userGuess < 1 || userGuess > 100) {
        message.textContent = `عدد وارد شده باید بین 1 تا 100 باشه!`;
        message.classList.add('bg-red-200', 'text-red-700');
        message.classList.remove('bg-emerald-200', 'text-emerald-800');

        return;
    }

    attempts++;
    attempt.textContent = toPersianNumber(attempts);

    if (userGuess === secretNumber) {
        message.textContent = `آفرین ! عدد ${toPersianNumber(secretNumber)} رو توی ${toPersianNumber(attempts)} تلاش پیدا کردی.🎉`;

        message.classList.add('bg-emerald-200', 'text-emerald-800');
        message.classList.remove('bg-red-200', 'text-red-700');

        guessBtn.disabled = true;
        guessInput.disabled = true;

        const bestScore = localStorage.getItem('bestScore');
        const best = parseInt(bestScore) || Infinity;
        if (attempts < best) {
            localStorage.setItem('bestScore', attempts);
            bestScoreSpan.textContent = toPersianNumber(attempts);
        }

        addToHistory(userGuess, 'correct');
    } else if (userGuess < secretNumber) {
        message.textContent = `عددت کمتر از عدد منه. دوباره تلاش کن.😉`;

        message.classList.add('bg-red-200', 'text-red-700');
        message.classList.remove('bg-emerald-200', 'text-emerald-800');

        addToHistory(userGuess, 'low');
    } else {
        message.textContent = `عددت بیشتر از عدد منه. دوباره تلاش کن.😉`;

        message.classList.add('bg-red-200', 'text-red-700');
        message.classList.remove('bg-emerald-200', 'text-emerald-800');

        addToHistory(userGuess, 'high');
    }
});

const startNewGame = function () {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    
    attempts = 0;
    attempt.textContent = toPersianNumber(attempts);
    
    message.textContent = '';
    message.classList.remove('bg-emerald-200', 'text-emerald-800');
    message.classList.remove('bg-red-200', 'text-red-700');
    guessInput.value = '';

    guessBtn.disabled = false;
    guessInput.disabled = false;
    
    guessInput.focus();

    history.innerHTML = '';
}

document.getElementById('restartBtn').addEventListener('click', startNewGame);

guessInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        guessBtn.click();
    }
});