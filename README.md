# Movie App - Movie Browser with Favorites and Watch Progress

## Описание

Movie App — это React-приложение для поиска и просмотра фильмов. Пользователи могут искать фильмы, добавлять их в избранное, а также продолжать просмотр с того места, где они остановились, благодаря сохранению тайм-кода в `localStorage`. Данные о фильмах получаются с помощью OMDb API, а состояние приложения управляется MobX.

## Технологии

- **React**: Основной фреймворк для создания интерфейса.
- **MobX**: Управление состоянием приложения.
- **Material UI**: Стилизация интерфейса.
- **OMDb API**: Источник данных о фильмах.
- **React Router**: Навигация по страницам.
- **Lodash.debounce**: Для оптимизации поиска.

## Установка и запуск

1. **Клонируйте репозиторий**:
   ```bash
   git clone https://github.com/ваш_пользователь/movie-app.git
   cd movie-app
2. **Установка зависимостей**:
   ```bash
   npm install 
3. **Запуск приложения**:
   ```bash
   npm start
4. **Откройте браузер по ссылке**:
- **http://localhost:3000**

## Возможности проекта
- Поиск и фильтрация: Поле поиска обновляет список фильмов в реальном времени.

- Добавление в избранное: Возможность добавлять и удалять фильмы из избранного.

- Возврат к месту просмотра: Прогресс воспроизведения сохраняется в localStorage, чтобы пользователь мог продолжить просмотр с последнего момента.



