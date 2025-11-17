//Проверка номера
const phoneInput = document.querySelector("#phone_input");
const phone_button = document.querySelector("#phone_button");
const phoneSpan = document.querySelector("#phone_result");

const reqExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/;

phone_button.addEventListener('click', () => {
    if (reqExp.test(phoneInput.value)) {
        phoneSpan.innerHTML = "Этот номер существует";
        phoneSpan.style.color = 'green';
    } else {
        phoneSpan.innerHTML = "Этот номер не существует";
        phoneSpan.style.color = 'red';
    }
});

// TabSlider
const tabsContentCards = document.querySelectorAll('.tab_content_block');
const tabsItemsParents = document.querySelector('.tab_content_items');
const tabsItems = document.querySelectorAll('.tab_content_item');

const hideTabsContentCards = () => {
    tabsContentCards.forEach(tab => tab.style.display = 'none');
    tabsItems.forEach(item => item.classList.remove('tab_content_item_active'));
};

const showTabsContentCards = (index = 0) => {
    tabsContentCards[index].style.display = 'block';
    tabsItems[index].classList.add('tab_content_item_active');
};

hideTabsContentCards();
showTabsContentCards();

let currentIndex = 0;
let intervalID;

const startAutoSlider = () => {
    intervalID = setInterval(() => {
        hideTabsContentCards();
        showTabsContentCards(currentIndex);
        currentIndex = (currentIndex + 1) % tabsItems.length;
    }, 2000);
};

startAutoSlider();

tabsItemsParents.onclick = (event) => {
    clearInterval(intervalID);
    if (event.target.classList.contains('tab_content_item')) {
        tabsItems.forEach((tabItem, index) => {
            if (event.target === tabItem) {
                hideTabsContentCards();
                showTabsContentCards(index);
                currentIndex = index;
                startAutoSlider();
            }
        });
    }
};

//converter
const somInput = document.querySelector("#som");
const usdInput = document.querySelector("#usd");
const eurInput = document.querySelector('#eur');

const converter = (element, target1, target2, currentType) => {
    element.addEventListener('input', async () => {
        try {
            const response = await fetch('../data/converter.json');
            if (!response.ok) throw new Error('не удалось подключится к файлу');
            const data = await response.json();
            const value = parseFloat(element.value);

            if (!element.value || isNaN(value)) {
                target1.value = '';
                target2.value = '';
                return;
            }

            switch (currentType) {
                case 'som':
                    target1.value = (value / data.usd).toFixed(2);
                    target2.value = (value / data.eur).toFixed(2);
                    break;
                case 'usd':
                    target1.value = (value * data.usd).toFixed(2);
                    target2.value = ((value * data.usd) / data.eur).toFixed(2);
                    break;
                case 'eur':
                    target1.value = (value * data.eur).toFixed(2);
                    target2.value = ((value * data.eur) / data.usd).toFixed(2);
                    break;
            }

        } catch (error) {
            console.error(error);
        }
    });
};

converter(somInput, usdInput, eurInput, 'som');
converter(usdInput, somInput, eurInput, 'usd');
converter(eurInput, somInput, usdInput, 'eur');

//weather
const cityNameInput = document.querySelector('.cityName');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');

const WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '77faf079bcfb0d5bc83ddfc69b0c4f57';

cityNameInput.oninput = async (event) => {
    const cityName = event.target.value.trim();

    if (!cityName) {
        city.innerHTML = 'Введите город';
        temp.innerHTML = '...';
        return;
    }

    try {
        const response = await fetch(`${WEATHER_API}?q=${cityName}&appid=${API_KEY}&units=metric&lang=ru`);

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();

        if (data.cod === 200) {
            city.innerHTML = data.name + ', ' + data.sys.country;
            temp.innerHTML = Math.round(data.main.temp) + "&deg;C";
        } else {
            city.innerHTML = 'Город не найден';
            temp.innerHTML = '...';
        }

    } catch (error) {
        console.error('Ошибка:', error);
        city.innerHTML = 'Ошибка загрузки';
        temp.innerHTML = '...';
    }
};

// ----- CARD SWITCHER -----
const cardImage = document.querySelector('.card_image');
const cardTitle = document.querySelector('.card p');
const cardDesc = document.querySelector('.card span');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');

let cardsData = [
  {
    "name": "Горы",
    "image": "https://picsum.photos/id/1018/600/400"
  },
  {
    "name": "Озеро",
    "image": "https://picsum.photos/id/1015/600/400"
  },
  {
    "name": "Озеро",
    "image": "https://picsum.photos/id/1011/600/400"
  },
  {
    "name": "Лес",
    "image": "https://picsum.photos/id/1003/600/400"
  },
  {
    "name": "Природа",
    "image": "https://picsum.photos/id/1020/600/400"
  }
];

let currentCard = 0;

function showCard(index) {
    const card = cardsData[index];
    cardImage.src = card.image;
    cardTitle.textContent = card.name;
    cardDesc.textContent = card.job;
}

// Инициализация показа первой карточки
showCard(currentCard);

btnNext.addEventListener('click', () => {
    currentCard = (currentCard + 1) % cardsData.length;
    showCard(currentCard);
});

btnPrev.addEventListener('click', () => {
    currentCard = (currentCard - 1 + cardsData.length) % cardsData.length;
    showCard(currentCard);
});

// Автопереключение картинок
setInterval(() => {
    currentCard = (currentCard + 1) % cardsData.length;
    showCard(currentCard);
}, 3000);
