let cards = document.querySelector(".cards");
let li = document.querySelectorAll("header li");
let boxBook = document.querySelector(".boxBook");
let btnBook = document.querySelector(".btn-book");
let closeBook = document.querySelector(".book-close");
let countBook = document.querySelector(".count-book");

let category = "";

let arrBook = [];

let showBook = () => {
  boxBook.innerHTML = "";
  arrBook.forEach((element) => {
    boxBook.innerHTML += `
    <div class="oneBook">
    <img src="https://image.vietnamnews.vn/uploadvnnews/Article/2024/10/13/380145_4978123600919249_image.png" alt="img">
    <h4>${element.title}</h4>
    <button>-</button>
    <button>1</button>
    <button>+</button>
    </div>
    `;
  });
};

// Функция для отображения событий
let showEvents = () => {
  cards.innerHTML = ""; // Очистить старые данные
  fetch(
    `http://localhost:8080/events${
      category === "Культура и досуг"
        ? "/category/Культура и досуг"
        : category === "Образование"
        ? "/category/Образование"
        : category === "Спорт"
        ? "/category/Спорт"
        : category === "Фестивали"
        ? "/category/Фестивали"
        : category === "Промо и выставки"
        ? "/category/Промо и выставки"
        : ""
    }`,
    {
      method: "GET", // Ожидаем ответ GET
      headers: {
        "Content-Type": "application/json", // Указываем тип контента
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        // Если сервер вернул ошибку (например 500)
        console.error("Network response was not ok", response);
        throw new Error("Network response was not ok");
      }
      return response.json(); // Конвертируем ответ в JSON
    })
    .then((data) => {
      data.forEach((element) => {
        // Добавляем каждое событие в карточку
        cards.innerHTML += `
        <div class="card">
            <a href="oneEvent/oneEvent.html#${element.id}">
            <img src="https://image.vietnamnews.vn/uploadvnnews/Article/2024/10/13/380145_4978123600919249_image.png" alt="img"/>
            </a>
            <h4>${element.title}</h4>   
            <h3>${element.eventDateTime}</h3>
            <p>${element.description}</p>
            <button class="btnsBookAdd" data-id="${element.id}">Забронировать</button>
        </div>
        `;
      });

      let btnsBookAdd = document.querySelectorAll(".btnsBookAdd");
      btnsBookAdd.forEach((element) => {
        element.addEventListener("click", () => {
          let find = data.find((item) => item.id === +element.dataset.id);
          arrBook = [...arrBook, find];
          countBook.textContent = arrBook.length
          showBook();
        });
      });
    })
    .catch((error) => {
      console.error("Fetch error: ", error); // Логирование ошибок
    });
};

showBook();

// Обработка клика на каждый элемент категории
li.forEach((element) => {
  element.liActive = false;

  element.addEventListener("click", (e) => {
    category = element.textContent; //textContent -> достает содержимое

    // console.log(category); // достает категории в консоли

    li.forEach((element) => {
      element.liActive = false;
      element.style.color = "black";
    });

    element.liActive = true;
    element.style.color = "red";

    element.liActive = !element.liActive;

    showEvents(); //чтобы загрузить и отобразить товары этой категории.
  });
});

btnBook.addEventListener("click", () => {
  boxBook.classList.toggle("active");
});
closeBook.addEventListener("click", () => {
  boxBook.classList.remove("active");
});
// Изначально отображаем все события
showEvents();
