# Фотошоп — Интернет-магазин фото- и видеотехники

SPA на React 19 + TypeScript для каталога товаров, управления корзиной и оформления заказов.

## Стек технологий

| Слой | Технология |
|---|---|
| Фреймворк | React 19, TypeScript 6 |
| Сборка | Vite 8 |
| Роутинг | react-router-dom 7 + history |
| Серверное состояние | TanStack React Query 5 |
| HTTP-клиент | Axios |
| UI-библиотеки | Leaflet (карты), Swiper (карусели), react-toastify (уведомления), react-helmet-async (мета-теги) |
| Утилиты | classnames, dayjs, usehooks-ts, es-toolkit |
| Тестирование | Vitest 4 + Testing Library + jsdom |
| Линтинг | ESLint 10 + @feature-sliced/steiger-plugin |
| Архитектура | Feature-Sliced Design |

## Функциональность

- **Каталог** — фильтрация по категории (видеокамера/фотоаппарат), типу (цифровая/плёночная/моментальная/коллекционная), уровню (нулевой/любительский/профессиональный) и цене; сортировка по цене/популярности; пагинация
- **Карточка товара** — детальная информация, похожие товары (Swiper-карусель), отзывы с рейтингом и формой добавления
- **Корзина** — добавление/удаление товаров, изменение количества, применение промокода, оформление заказа
- **Главная** — баннеры с акциями, секция промотоваров
- **404** — страница не найдена

## Архитектура (Feature-Sliced Design)

```
src/
├── app/          — инициализация приложения, провайдеры, роутинг (App.tsx)
├── pages/        — страницы: home, catalog, product, cart, not-found
├── features/     — пользовательские сценарии: add-to-cart
├── entities/     — бизнес-сущности: products, cart-items, coupons, orders
├── widgets/      — композиционные блоки: banners, breadcrumbs, product-card
└── shared/       — переиспользуемые примитивы:
    ├── api/      — Axios-инстанс, конфигурация
    ├── dto/      — DTO: Product, DetailedProduct, ProductCategory и др.
    ├── enums/    — AppRoute, TimeConstant, InputType
    ├── lib/      — format-price, helpers, storage, HistoryRouter
    ├── model/    — интерфейсы (ImageSource)
    └── ui/       — компоненты: Button, Icon, Input, Modal, RateStars, Tabs и др.
```

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm start

# Сборка для production
npm run build

# Запуск тестов
npm test

# Проверка линтером
npm run lint
```

## Скрипты

| Команда | Описание |
|---|---|
| `npm start` | Запуск Vite dev-сервера |
| `npm run build` | TypeScript-компиляция + Vite build |
| `npm run preview` | Превью production-сборки |
| `npm test` | Запуск Vitest |
| `npm run lint` | ESLint-проверка src/ |

## Переменные окружения

| Переменная | Описание | Пример |
|---|---|---|
| `VITE_BASE_URL` | Базовый URL приложения | `/` (dev), `/camera-shop/` (prod) |
| `VITE_API_URL` | URL API | `https://camera-shop.accelerator.htmlacademy.pro` |

Файлы: `.env.development`, `.env.production`.

## API

Приложение использует REST API HTML Academy Accelerator. Эндпоинты:

- `/cameras` — список товаров
- `/cameras/:id` — детальная информация о товаре
- `/cameras/:id/similar` — похожие товары
- `/cameras/:id/reviews` — отзывы к товару
- `/reviews` — создание отзыва
- `/coupons` — проверка промокода
- `/orders` — оформление заказа
- `/promo` — промо-товары
- `/banners` — баннеры

## Структура проекта

```
markup/       — статичная вёрстка (ui-kit, карта сайта, примеры страниц)
public/       — статические ресурсы (шрифты, изображения, стили)
src/          — исходный код (см. Архитектура)
dist/         — production-сборка
```

## Тестирование

Написано **23 теста** для компонентов, хуков и утилит каталога, продукта и shared-модулей. Используется Vitest + @testing-library/react + @testing-library/jest-dom.

```bash
npm test
```
