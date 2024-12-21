# Демо для доклада «Добро пожаловать в Telegram Mini Apps. Или где ещё хорош Angular?»

<a href="https://t.me/tma_angular_demo_bot" target="_blank"><img src="https://github.com/user-attachments/assets/6bc9f631-b8ae-4b70-a522-c9c541ee2906" width="196" alt="Telegram Mini App demo" align="right" /></a>

Презентация доступна в формате PDF по ссылке: https://disk.yandex.ru/i/oKmdRFDJsO7sZw

Демо содержит пример полноценного [Telegram Mini Apps](https://core.telegram.org/bots/webapps) проекта на Angular, который вы можете взять за основу своих проектов.

В мини-аппе реализована простейшая «тапалка» с использованием Cloud Storage (от Telegram) и показаны примеры навигации внутри веб-приложения.

Используются следующие версии библиотек:

- [Angular](https://angular.dev) v19.0.5
- [NgRx Signals](https://ngrx.io/guide/signals) v19.0.0
- [Nx](https://nx.dev) v20.2.2
- [Taiga UI](https://taiga-ui.dev) v4.18.0
- [@telegram-apps/sdk](https://github.com/Telegram-Mini-Apps/telegram-apps) v2.11.0
- [angularx-qrcode](https://github.com/cordobo/angularx-qrcode) v19.0.0
- [canvas-confetti](https://github.com/catdad/canvas-confetti) v1.9.3

И, конечно же, много комментариев (_на русском_) в коде — всё, как мы любим 💞

## Развернуть локально

Клонируйте репозиторий:

```console
git clone https://github.com/koddr/tma-angular-demo && cd tma-angular-demo
```

Установите зависимости:

```console
npm install
```

Запустите dev-сервер:

```console
npm start
```

## Развернуть в облаке

Так как я использую для своих (_и не только_) проектов облачные решения от [Timeweb Cloud](https://timeweb.cloud), то буду описывать процесс деплоя на нём.

> [!NOTE]
>
> Кстати, если искали надёжное облако для своих фронтенд-приложений с автодеплоем из GitHub/Gitlab по последнему коммиту за 1 руб./месяц, то вот моя реферальная ссылка: https://timeweb.cloud/r/koddr
>
> Регистрируйтесь, оплачивайте хотя бы один месяц хостинга/выделенного сервера и получите от 300 до 2000 руб. на счёт 😉

Итак, приступим:

1. Прежде всего, заливаем код на GitHub (Gitlab или любой другой).
2. Заходим в панель управления, раздел [Apps](https://timeweb.cloud/my/apps) и нажимаем кнопку «Добавить».
3. Выбираем Angular и версию Node.js (например, `20`).
4. Подключаем свой аккаунт GitHub к облаку и выбираем нужный репозиторий.
5. Выбираем регион деплоя и самый тариф (хватит и самого дешёвого за 1 руб./месяц).
6. В настройках приложения вводим команду для сборки (например, `npm run build`) и директорию с бандлом (например, `/dist/browser`).
7. Жмём «Запустить деплой» и немного ждём.

В результате, Timeweb Cloud создаст инстанс вашего приложения, получит за вас бесплатный SSL от Let's Encrypt и выдаст URL (в виде: `https://user-repo-XXX123.twc1.net`). Данный URL нужно указать в настройках вашего бота у [BotFather](https://t.me/BotFather) (идём в `Bot Settings` токена и далее в разделы: `Menu Button` и `Configure Mini App`).

Немного ждём, пока Telegram обновит кэш у бота и отрисует кнопку меню, которая запускает ваш Mini App.

Всё 🎉
