//Проверка номера
const phoneInput = document.querySelector("#phone_input");
const phone_button = document.querySelector("#phone_button");
const phoneSpan = document.querySelector("#phone_result");

//+996552123321

const reqExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phone_button.addEventListener('click', ()=>{
    if(reqExp.test(phoneInput.value)){
        phoneSpan.innerHTML = "Этот номер существует";
        phoneSpan.style.color = 'green';
    }else{
        phoneSpan.innerHTML = "Этот номер не существует";
        phoneSpan.style.color = 'red';
    }
})

// TabSlider
const tabsContentCards = document.querySelectorAll('.tab_content_block');
const tabsItemsParents = document.querySelector('.tab_content_items');
const tabsItems = document.querySelectorAll('.tab_content_item');

// Функция скрывает все вкладки
const hideTabsContentCards = () => {
    tabsContentCards.forEach(tab => tab.style.display = 'none');
    tabsItems.forEach(item => item.classList.remove('tab_content_item_active'));
};

// Функция показывает нужную вкладку
const showTabsContentCards = (index = 0) => {
    tabsContentCards[index].style.display = 'block';
    tabsItems[index].classList.add('tab_content_item_active');
};

// Инициализация
hideTabsContentCards();
showTabsContentCards();

let currentIndex = 0;
let intervalID;

// Автослайдер
const startAutoSlider = () => {
    intervalID = setInterval(() => {
        hideTabsContentCards();
        showTabsContentCards(currentIndex);
        currentIndex = (currentIndex + 1) % tabsItems.length; // исправлено tabsItem → tabsItems
    }, 2000);
};

// Запуск слайдера
startAutoSlider();

// Обработчик кликов
tabsItemsParents.onclick = (event) => {
    clearInterval(intervalID); // исправлено clearIntervar → clearInterval

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
const somInput = document.querySelector("#som")
const usdInput = document.querySelector("#usd")
const eurInput = document.querySelector('#eur')

const converter = (element, target1, target2, currentType)=>{
    element.addEventListener('input', async()=>{
        try{
            const response = await fetch('../data/converter.json');
            if (!response.ok) throw new Error('не удалось подключится к файлу');
            const data = await response.json();
            const value = parseFloat(element.value)

            if (!element.value || isNaN(value)){
                target.value = '';
                target2.value = '';
                return
            }

            switch(currentType){
                case 'som':
                    target1.value = (value/data.usd).toFixed(2);
                    target2.value = (value/data.eur).toFixed(2);
                    break;
                case 'usd':
                    target1.value = (value * data.usd).toFixed(2);
                    target2.value = ((value*data.usd) / data.eur).toFixed(2);
                    break;
                case 'eur':
                    target1.value = (value * data.eur).toFixed(2);
                    target2.value = ((value*data.eur) / data.usd).toFixed(2);
                    break;
            }
            

        }catch (error){
            console.error(error);
            
        }
    });
};

converter(somInput, usdInput, eurInput, 'som')
converter(usdInput, somInput, eurInput, 'usd')
converter(eurInput, somInput, usdInput, 'eur')