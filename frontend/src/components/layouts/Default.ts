import { Header } from "../modules";
import { Footer } from "../modules";

const header: string = Header();
const footer: string = Footer();

const Default = (children: string):string => {
	return `
		${header}
		<main id='mutable'>
			<div class='main__container container'>${children}</div>
		</main>
		${footer}
	`
}

export { Default };
