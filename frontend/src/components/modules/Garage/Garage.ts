import './Garage.scss';

const Garage = (cars: Array<string>): string => {
	return `
		<div class="controls">
			<h1 class="garage__title">Controls</h1>
			<div class="row row-create">
				<input class='input input-text' id="create-with-name" type="text" />
				<input class='input input-palette' id="create-with-color" type="color" id="colorpicker" value="#ff7300">
				<button class="btn btn-control" id="btn-create">
					Create
				</button>
			</div>
			<div class="row row-update">
				<input class='input input-text' id="name-update"  type="text" />
				<input class='input input-palette' id="color-update" type="color" id="colorpicker" value="#1e1e1e">
				<button class="btn btn-control" id="btn-update">
					Update
				</button>
			</div>
			<div class="row row-utils">
				<button class="btn btn-control" id="btn-race">Race</button>
				<button class="btn btn-control" id="btn-reset">
					Reset
				</button>
				<button class="btn btn-control" id="btn-generate">
					Generate cars
				</button>
			</div>
		</div>
		<div class="garage">
			<h1 class="garage__title">Garage (${localStorage.getItem('garageVol')})</h1>
			<ul class="garage__items items" id='cars-enlisted'>${cars.map(car => `<li>${car}</li>`).join('')}</ul>
		</div>
	`
}

export { Garage };
