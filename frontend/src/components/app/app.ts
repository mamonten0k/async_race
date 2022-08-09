import { Default } from "../layouts/Default";
import { Garage } from "../modules";

const root: HTMLElement | null = document.getElementById('root');
const initial: string = Garage('as');

class App {
    start() {
      if(!root) return;
      root.innerHTML = Default(initial);
    }
}

export { App };


// отрисовка - запрос к данным, отрисовка машин из гаража.
// нажатие гонки - просто race, пока один из них не докатится, сделать анимации нормальные
// записывать победителя post запросом, вести учет победителей, количество их побед.
// fetch('http://localhost:8000/garage')
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         console.log(data);
//       });