import { CarIcon } from '../Car/CarIcon';
import './Track.scss';

const Track = (carColor:string = "Black", carName:string | undefined):string=> {
	if(!carName) carName = "John Doe";
	
	return `
		<div class="track">
			<div class="track__row row">
				<button class="btn btn-control" id="btn-select">						
					Select
				</button>
				<button class="btn btn-control" id="btn-remove">
					Remove
				</button>
				<span class="track__id" id="car-name"><b>${carName}</b></span>
			</div>
			<div class="track__item">
				${CarIcon(carColor)}
				<span class='track__item-finish'>Finish</span>
			</div>
		</div>
	`
}

export { Track };
