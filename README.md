├── index.html
├── style.css
├── js/
│   ├── app.js               (Точка входу, ініціалізація)
│   ├── eventHandlers.js     (Обробники подій браузера)
│   ├── services/            (Робота з мережею)
│   │   ├── api.js           (Головна функція fetchCurrencyRates)
│   │   └── templateLoader.js(Завантажувач HTML-файлів)
│   └── utils/               (Математика, дати, фільтрація та рендер)
│       ├── dateRange.js     (Генерація масиву дат)
│       ├── dateParser.js    (Конвертація рядка в Date об'єкт)
│       ├── dataSorter.js    (Сортування масиву)
│       ├── trendCalculator.js (Розрахунок стрілочок)
│       ├── dataFilter.js    (Очищення масиву від пустих відповідей)
│       └── rowRenderer.js   (Збирання та наповнення HTML рядка)
└── templates/               (HTML файли)
    ├── app.html
    ├── row.html
    ├── msg_loading.html
    ├── msg_error_dates.html
    ├── msg_error_network.html
    └── msg_no_data.html