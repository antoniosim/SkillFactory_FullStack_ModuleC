const URL = 'https://picsum.photos/v2/list?limit=';

//поле ввода для количества картинок
const pic_qnty= document.querySelector('.js_pic_qnty');

//кнопка отправки запроса
const btn_node = document.querySelector('.js_btn_load');

//блок для вывода результата
const res_node = document.querySelector('.js_result');

//функция обработки запроса
function makeGetRequest(url, callback){
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  
  xhr.onload = function() {
    if (xhr.status !== 200) {
      res_node.textContent = `Статус: ${xhr.status}`;
    } else {
      if (callback) {
        const res = JSON.parse(xhr.response);
        callback(res);
      }
    }
  };

  xhr.onerror = function() {
    res_node.textContent =`Ошибка запроса: ${xhr.status}`;
  };
  
  xhr.send();
}

//функция вывода результата в блок
function displayResult(json_data) {
  let result = '';
  json_data.forEach(item => {
    result +=  `
    <div class="item">
      <img class="pic" alt="Picture" src="${item.download_url}" />
      <p class="info">${item.author}</p>
    </div>
    `;
   res_node.innerHTML = result
  })
}

pic_qnty.addEventListener('input', () => {
  let pic_limit = parseInt(pic_qnty.value);
  if (pic_limit>=1 && pic_limit<=10) {
    res_node.textContent = `Будет выведено ${pic_limit} картинок`;
  } else {
    res_node.textContent = `Число ${pic_limit} вне диапазона от 1 до 10`;
  }

})

btn_node.addEventListener('click', () => {
  let pic_limit = parseInt(pic_qnty.value);
  if (pic_limit>=1 && pic_limit<=10) {
    makeGetRequest(URL+pic_limit, displayResult);
  } else {
    res_node.textContent = `Число ${pic_limit} вне диапазона от 1 до 10`;
  }
  pic_qnty.value = '';
})

