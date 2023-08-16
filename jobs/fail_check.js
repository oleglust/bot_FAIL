const axios = require('axios'); //ужен для гет и пост запросов

const BASE_API_URL = "https://smmprime.com/adminapi/v2" //прописали базовый ЮРЛ
const GET_ORDERS_API_URL =`/orders?apikey=${process.env.API_KEY}&order_status=fail` //прописали приписки
const RESEND_ORDERS_API_URL =`/orders/resend?apikey=${process.env.API_KEY}`

async function failCheck() {
    let failIds =[]; //создаем массив, в который запихиваем все афди фейлов !!!
    try {
      const response = await axios.get(`${BASE_API_URL}${GET_ORDERS_API_URL}`); //гет запрос аксиос по ЮРЛ
      response.data.data.list.forEach(function(item) { //item = каждый элт в массиве
        failIds.push(item.id) //!!!
      });
      
    } catch (error) {
      console.error(error);
    }

    console.log(failIds)

    try{
        const response = await axios.post(`${BASE_API_URL}${RESEND_ORDERS_API_URL}`, {
            "ids": failIds.join(',') //скрепляем все айди через запятую , у джойна всегда возвращается строка, можно через toString
        })
        console.log(response.status)
    } catch (error) {
      console.error(error);
    }

    
  }
  failCheck();

