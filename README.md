Зависимости
$ npm install recharts
$ npm install color-generator
$ npm install react-hook-form
$ npm install bootstrap
$ npm install --save-dev web-vitals
$ npm i html-react-parser
$ npm install react-tippy
$ npm start

Команда для хот релоада реакта в докере. Это (не)немного подвисает на 8гб машине все, но работает. Контейнер можно стартануть так если не использовать compose.
docker run -e WDS_SOCKET_HOST=127.0.0.1 -e CHOKIDAR_USEPOLLING=true -e WATCHPACK_POLLING=true -v %cd%:/creep-tube-ui -p
3000:3000 creep-tube-
ui:1

