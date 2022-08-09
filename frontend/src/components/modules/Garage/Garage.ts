import './Garage.scss';

const Garage = (cars: string):string => {
	return `
		<div class="controls">
			<h1 class="garage__title">Controls</h1>
			<div class="row row-create">
				<input class='input input-text' type="text" />
				<input class='input input-palette' type="color" id="colorpicker" value="#0aaaae">
				<button class="btn btn-control" id="btn-create">
					Create
				</button>
			</div>
			<div class="row row-update">
				<input class='input input-text' type="text" />
				<input class='input input-palette' type="color" id="colorpicker" value="#1e1e1">
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
			<ul class="garage__items items"></ul>
		</div>
	`
}

export { Garage };
