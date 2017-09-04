# task-manager

1. Клонируете репозиторий
```js
git clone https://github.com/dmgame/template.git
```
2. Перейдите в склонированную папку или откройте е в редакторе кода
```js
cd task-manager
```
3. Разворачивание проекта (установка всех модулей). У вас должен быть установлен nodejs и gulp глобально
```js
 npm up
```
---

***Привяжите к своему репозиторию***
1. Создайте новый репозиторий на github

2. Подвяжите текущий template к своему репозиторию
```js
git remote set-url origin "ссылка на ваш репозиторий"
```
---


## Запуск сервера

1.
```js
npm i -g nodemon

```
2.
```js
npm i --save-dev babel-preset-es2015
```

3.
```js
npm i --save-dev babel-cli
```

4.
```js
npm install -g babel-cli
```

5.
```js
npm rebuild node-sass
```

6.
```js
nodemon server/app.js --exec babel-node --presets es2015,stage-2
```
---
#### При успешном запуске должно написать 
*Server is up and running on port 8080*

---

## Копирование файлов из своей верстки task-manager которую мы делали на этапе верстки
1. Из папки dist копируете все в папку dist нового проекта кроме папки js она там уже есть
2. Из папки app копируете 2 файла index.html и login.html *(обязательно у вас файлы должны также называться)* в корень папки server
3. Из папки app копируете папки js, img, fonts, css в папку server/asset *(если папки asset нет то создайте ее)*
4. gulpfile.js уже исправлен в новом проекте его копировать не нужно, но посмотрите в него если вы хотите что то добавить то добавляйте.

---
#### После копирования
1. Запускаете или перезапускаете сервер
```js
nodemon server/app.js --exec babel-node --presets es2015,stage-2
```
2. Запуск gulp
```js
gulp watch
```
3. Все готово для работы!

---

#### Страницы доступны по адресу
```js
localhost:8080/login
localhost:8080/task
```
---
#### Логин:  *admin@task.com*, Пароль: *abcd123*



