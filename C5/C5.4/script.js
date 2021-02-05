const URL = "https://picsum.photos";

//кнопка отправки запроса
const btn_node = document.querySelector(".js_btn_load");

//блок для вывода результата
const res_node = document.querySelector(".js_result");

//поля ввода значений картинки
const pich_node = document.querySelector(".js_pic_height");
const picw_node = document.querySelector(".js_pic_width");

console.log(`Получение картинки размером {pic_height}x{pic_width}`)

function checkInput(node, w, h) {
    if (isNaN(w) || isNaN(h)) {
        node.textContent = 'Не задано одно из значений';
        return 1;
    } else if (h < 100 || h > 300) {
        node.textContent = 'Значение высоты должно быть от 100 до 300';
        return 2;
    } else if (w < 100 || w > 300) {
        node.textContent = 'Значение ширины должно быть от 100 до 300';
        return 3;
    } else {
        node.textContent = `Будет загружена картинка размером ${w}x${h}`
        return 0;
    }
}

pich_node.addEventListener("input", () => {
    checkInput(res_node, parseInt(picw_node.value), parseInt(pich_node.value))
})

picw_node.addEventListener("input", () => {
    checkInput(res_node, parseInt(picw_node.value), parseInt(pich_node.value))
})

btn_node.addEventListener("click", () => {
    let h = parseInt(pich_node.value);
    let w = parseInt(picw_node.value);

    if (checkInput(res_node, w, h) === 0) {
        let req_url = `${URL}/${w}/${h}`;
        res_node.textContent = `Загрузка картинки размером ${w}x${h}...`
        fetch(req_url)
            .then((response) => {
                result = `
    <div class="item">
      <img class="pic" alt="Picture" src="${response.url}" />
      <p class="info">Картинка размером ${w}x${h}</p>
    </div>`;
                res_node.innerHTML = result;
            })
            .catch(() => {
                res_node.textContent = 'Ошибка запроса';
            });
    }
});

  