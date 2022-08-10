import { Track } from '../components/base/'

interface IFactory {
	parentNode: HTMLElement | null;
	factoryCreate: HTMLElement | null;
	factoryCreateName: HTMLElement | null;
	factoryCreateColor: HTMLElement | null;
	factoryUpdate: HTMLElement | null;
	factoryUpdateName: HTMLElement | null;
	factoryUpdateColor: HTMLElement | null;
}

class CarFactory implements IFactory {
	parentNode: HTMLElement | null;

	factoryCreate: HTMLElement | null;
	factoryCreateName: HTMLInputElement | null;
	factoryCreateColor: HTMLInputElement | null;

	factoryUpdate: HTMLElement | null;
	factoryUpdateName: HTMLInputElement | null;
	factoryUpdateColor: HTMLInputElement | null;

	constructor() {
		this.parentNode = document.getElementById("cars-enlisted");

		if(!this.parentNode) throw Error('Something went wrong');

		this.factoryCreate = document.getElementById('btn-create');
		this.factoryCreateName = document.getElementById('create-with-name') as HTMLInputElement;
		this.factoryCreateColor = document.getElementById('create-with-color') as HTMLInputElement;

		this.factoryUpdate = document.getElementById('btn-update');
		this.factoryUpdateName = document.getElementById('create-with-name') as HTMLInputElement;
		this.factoryUpdateColor = document.getElementById('create-with-color') as HTMLInputElement;
	}

	start() {
		this.factoryCreate?.addEventListener('click', this.create);
		this.factoryUpdate?.addEventListener('click', this.update);
	}

	create = () => {
		const carNode = document.createElement('li');
		const carTrack = Track(this.factoryCreateColor?.value, this.factoryCreateName?.value);
		carNode.innerHTML = carTrack;
		this.parentNode?.appendChild(carNode);
	}

	update = () => {
		const ref = localStorage.getItem('selected');

		ref.getElementById('car-name').innerHTML = this.factoryUpdateName?.value;
	}

	shutown = () => {
		document.removeEventListener('click', this.create);
	}
}

export { CarFactory };