import { Track } from '../components/base/';
import { handleSelect, handleRemove } from './EventHandlers';
import { getCars } from './restfulApiHandlers';

interface IFactory {
	parentNode: HTMLElement | null;
	factoryCreate: HTMLElement | null;
	factoryCreateName: HTMLElement | null;
	factoryCreateColor: HTMLElement | null;
	factoryUpdate: HTMLElement | null;
	factoryUpdateName: HTMLElement | null;
	factoryUpdateColor: HTMLElement | null;
	carsTotal : HTMLElement | null;
	garageRestet : HTMLElement | null;

	start: () => void;
	update: () => void;
	create: () => void;
}

class CarFactory implements IFactory {
	parentNode: HTMLElement | null;

	factoryCreate: HTMLElement | null;
	factoryCreateName: HTMLInputElement | null;
	factoryCreateColor: HTMLInputElement | null;

	factoryUpdate: HTMLElement | null;
	factoryUpdateName: HTMLInputElement | null;
	factoryUpdateColor: HTMLInputElement | null;

	carsTotal : HTMLElement | null;
	garageRestet : HTMLElement | null;

	constructor() {
		this.parentNode = document.getElementById("cars-enlisted");

		if(!this.parentNode) throw Error('Something went wrong');

		this.factoryCreate = document.getElementById('btn-create');
		this.factoryCreateName = document.getElementById('create-with-name') as HTMLInputElement;
		this.factoryCreateColor = document.getElementById('create-with-color') as HTMLInputElement;

		this.factoryUpdate = document.getElementById('btn-update');
		this.factoryUpdateName = document.getElementById('name-update') as HTMLInputElement;
		this.factoryUpdateColor = document.getElementById('color-update') as HTMLInputElement;

		this.carsTotal = document.querySelector('.garage__title') as HTMLElement;
		this.garageRestet = document.getElementById('btn-reset') as HTMLElement;
	}

	start() {
		this.factoryCreate?.addEventListener('click', this.create);
		this.factoryUpdate?.addEventListener('click', this.update);

		this.reset();
		if(this.carsTotal) this.carsTotal.innerHTML = `Garage (${localStorage.getItem('garageVol')})`

		this.garageRestet?.addEventListener('click', this.reset);
	}

	create = () => {
		const carNode : HTMLElement = document.createElement('li');
		const carTrack = Track(this.factoryCreateColor?.value, this.factoryCreateName?.value);
		const volTotal = +(localStorage.getItem('garageVol') || "0");

		carNode.innerHTML = carTrack;

		if(volTotal === 0) {
			this.parentNode?.replaceChildren('');
		}

		this.parentNode?.appendChild(carNode);	

		const carSelect = carNode.querySelector('.btn-select') as HTMLElement;
		const carRemove = carNode.querySelector('.btn-remove') as HTMLElement;
		
		carSelect.addEventListener('click', handleSelect);
		carRemove.addEventListener('click', handleRemove);


		localStorage.setItem('garageVol',`${volTotal + 1}`);
		if(this.carsTotal) this.carsTotal.innerHTML = `Garage (${volTotal + 1})`;
	}

	update = () => {
		const currID = localStorage.getItem('selected');

		if(!currID) return;
		
		const currEl = document.getElementById(currID) as HTMLElement;
		const currMark = currEl?.querySelector('.track__id') as HTMLInputElement;
		const currColor = currEl?.querySelector('.car__icon') as HTMLInputElement;

		if(this.factoryUpdateName?.value && currMark) currMark.innerHTML = `<b>${this.factoryUpdateName?.value}</b>`;
		if(this.factoryUpdateColor?.value && currColor) currColor.style.fill = this.factoryUpdateColor?.value;
	}

	reset = () => {
		const replacement = document.createElement('li');
		replacement.innerHTML = 'There are no Cars left in your Garage';
		replacement.setAttribute(
			'style',
			'color: gray; font-size: 1.1rem; padding-top: 1rem;',
		);

		localStorage.setItem('garageVol',`0`);
		this.parentNode?.replaceChildren(replacement);
		if(this.carsTotal) this.carsTotal.innerHTML = `Garage (0)`;
	}
}

export { CarFactory };