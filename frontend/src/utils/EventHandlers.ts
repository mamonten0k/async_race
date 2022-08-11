const handleSelect = (evt : MouseEvent) : void => {
	let currID : string | null = localStorage.getItem('selected');
	let btnTargeted = evt.target as Element;

	if(!btnTargeted) return;

	if(currID) {
		let btn = document.getElementById(currID)?.querySelector('.btn-select');
		btn?.classList.toggle('btn-selected');
	}

	btnTargeted.classList.toggle('btn-selected');
	currID = (btnTargeted.parentNode?.parentNode as HTMLElement)?.id;

	localStorage.setItem('selected', currID || "");
}

const handleRemove = (evt : MouseEvent) : void => {
	const targetedNode = evt?.target as Element;
	const requiredNode = targetedNode.parentNode?.parentNode?.parentNode as Element;
	const parentNode = requiredNode.parentNode as Element;
	
	parentNode.removeChild(requiredNode)

	const volTotal = +(localStorage.getItem('garageVol') || "0");
	const carsTotal = document.querySelector('.garage__title') as HTMLElement;
	const carsContainer = document.getElementById("cars-enlisted");

	localStorage.setItem('garageVol',`${volTotal - 1}`);
	if(carsTotal) carsTotal.innerHTML = `Garage (${volTotal - 1})`;

	if(volTotal === 1 && carsContainer) {
		const replacement = document.createElement('li');
		replacement.innerHTML = 'There are no Cars left in your Garage';
		replacement.setAttribute(
			'style',
			'color: gray; font-size: 1.1rem; padding-top: 1rem;',
		);
		carsContainer.replaceChildren(replacement);
	}
}

export { handleSelect, handleRemove };
