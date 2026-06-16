const currency = document.getElementById('currency');
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
const btn = document.getElementById('getRate');
const result = document.getElementById('result');

// Функція для створення масиву дат між Start та End
function getDates(start, end) {
    const dates = [];
    const current = new Date(start);
    const last = new Date(end);

    while (current <= last) {
        const formatted = current.toISOString().slice(0, 10).replaceAll('-', '');
        dates.push(formatted);
        current.setDate(current.getDate() + 1);
    }
    return dates;
}

btn.addEventListener('click', async function () {
    if (!startDate.value || !endDate.value) {
        result.innerHTML = "<div class='message' style='color: #f43f5e;'>Будь ласка, оберіть обидві дати!</div>";
        return;
    }

    const dates = getDates(startDate.value, endDate.value);
    result.innerHTML = "<div class='message'>Завантаження даних з НБУ...</div>";

    try {
        // Створюємо масив запитів
        const requests = dates.map(date => {
            const URI = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${currency.value}&date=${date}&json`;
            return fetch(URI).then(res => res.json());
        });

        // Чекаємо на виконання всіх асинхронних запитів одночасно
        const allResponses = await Promise.all(requests);

        // Фільтруємо масив від пустих відповідей (на випадок збоїв)
        const cleanData = allResponses
            .filter(arr => arr && arr.length > 0)
            .map(arr => arr[0]);

        // СОРТУВАННЯ: перетворюємо "ДД.ММ.РРРР" у формат об'єкта дати й порівнюємо
        cleanData.sort((a, b) => {
            const parseDate = (str) => {
                const [d, m, y] = str.split('.');
                return new Date(`${y}-${m}-${d}`);
            };
            return parseDate(a.exchangedate) - parseDate(b.exchangedate);
        });

        // Очищаємо вікно завантаження
        result.innerHTML = "";

        if (cleanData.length === 0) {
            result.innerHTML = "<div class='message'>Немає даних за вказаний період.</div>";
            return;
        }

        // Рендеринг рядків таблиці
        cleanData.forEach((item, index) => {
            // Дефолтні значення тренду (якщо це перший день в списку і немає з чим порівняти)
            let trendClass = "up";
            let trendIcon = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
            `; // Стрілка вгору ↗️

            // Порівнюємо курс із попереднім днем (якщо він є)
            if (index > 0) {
                const prevRate = cleanData[index - 1].rate;
                
                if (item.rate < prevRate) {
                    trendClass = "down";
                    trendIcon = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="7" y1="7" x2="17" y2="17"></line>
                            <polyline points="17 7 17 17 7 17"></polyline>
                        </svg>
                    `; // Стрілка вниз ↘️
                } else if (item.rate === prevRate) {
                    trendClass = "neutral";
                    trendIcon = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    `; // Рівна лінія ➡️
                }
            }

            // Додаємо згенерований рядок у блок результатів
            result.innerHTML += `
                <div class="row">
                    <div class="date-box">
                        <span class="date-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                        </span>
                    </div>
                    <div class="rate-box">
                        <span class="rate">${item.rate.toFixed(4)}</span>
                        <div class="trend ${trendClass}">${trendIcon}</div>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error(error);
        result.innerHTML = "<div class='message' style='color: #f43f5e;'>Помилка завантаження мережі. Спробуйте пізніше.</div>";
    }
});