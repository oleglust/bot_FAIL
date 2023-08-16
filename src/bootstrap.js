const Bree = require('bree');
const Graceful = require('@ladjs/graceful');
const Pino = require('pino');
require('dotenv').config() //подключение дотенва, в нем хранятся скрытые данные, например ключи
const bree = new Bree({
    logger:  Pino(),
    jobs: [ {
      name: 'fail_check',
      interval: '5m'
    }]

  });

const graceful = new Graceful({ brees: [bree] });
graceful.listen();
(async () => {
    await bree.start();
  })();



function bootstrap(){
  
  console.log("aaa")
    //console.log(process.env.API_KEY) //пример вызова ключа из env файла
}


module.exports={
    bootstrap
}