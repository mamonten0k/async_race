class App {
    start() {
    fetch('http://localhost:8000/garage')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
    }
}

export { App };


// отрисовка - запрос к данным, отрисовка машин из гаража.
// нажатие гонки - просто race, пока один из них не докатится, сделать анимации нормальные
// записывать победителя post запросом, вести учет победителей, количество их побед.