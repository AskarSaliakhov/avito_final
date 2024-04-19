
# Чтобы локально проверить у себя, нужно обязательно в файле. env(в корне директории) прописать токен, иначе не получится

### Приложение можно запустить через Docker
### `docker build -t react_kinopoisk .`
### `docker run -p 7070:7070 -d react_kinopoisk`



### Или локально у себя


### `npm install`
### `npm start`





## Приложение подразумевает поиск фильмов/ сериалов с помощью API Kinopoiska

### Приложение написано на react , typescript


# Особенности приложения 
Когда пользователь пытается найти фильм, то происходит debounce(300мс) 
Можно перейти на отдельную страницы фильма/сериала
Реализована адаптивная и мобильная вёрстка




