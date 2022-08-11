import { CarIcon } from '../Car/CarIcon';
import { v4 as uuidv4 } from 'uuid';

import './Track.scss';

const Track = (carColor:string = "Black", carName:string | undefined):string=> {
	if(!carName) carName = "John Doe";
	
	return `
		<div class="track" id='${uuidv4()}'>
			<div class="track__row row">
				<button class="btn btn-select">						
					Select
				</button>
				<button class="btn btn-remove">
					Remove
				</button>
				<span class="track__id"><b>${carName}</b></span>
			</div>
			<div class="track__item">
				${CarIcon(carColor)}
				<span class='track__item-finish'>Finish</span>
			</div>
		</div>
	`
}

export { Track };
