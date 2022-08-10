import { Default } from "../layouts/Default";
import { Garage } from "../modules";
import { CarFactory } from "../../utils/CarFactory";

const root: HTMLElement | null = document.getElementById('root');
const initial: string = Garage([]);

class App {
    start() {
      if(!root) return;
      root.innerHTML = Default(initial);
      
      const factory = new CarFactory();
	    factory.start();
    }
}

export { App };