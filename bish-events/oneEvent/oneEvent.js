let box = document.querySelector(".box");

fetch(`http://localhost:8080/events/${location.hash.slice(1)}`)
  .then((response) => response.json())
  .then((one) => {
    box.innerHTML += `
    <div class="box__inner">
      <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt="">
        <div class="inner__right">
          <h2>${one.title}</h2>
          <p>${one.description}</p>
          <h4>Дата и время: ${one.eventDateTime}</h4>
          <h3>Локация: ${one.location}</h3>
          <a href="/events.html">&#8592 Go Back</a>
        </div>
    </div>
    `;
  });
