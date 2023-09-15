import { createContext, useEffect, useState } from "react";
import "../styles/main.css";
import TogglesBar from "./TogglesBar";
import Letter from "./Letter";
import { getComponentNameById } from "../utils/cardNameUtil";

export interface BarContextType {
	onToggle: (id: number, checked: boolean) => void;
}

export const BarContext = createContext<BarContextType | null>(null);

function App() {
	const [activeToggles, setActiveToggles] = useState<number[]>([]);

	const onToggle = (id: number, checked: boolean) => {
		const shouldBeAddedToActiveList =
			checked && !activeToggles.includes(id);

		if (shouldBeAddedToActiveList) {
			setActiveToggles((prev: number[]) => [...prev, id]);

			return;
		}

		const shouldBeRemovedFromActiveList =
			!checked && activeToggles.includes(id);

		if (shouldBeRemovedFromActiveList) {
			setActiveToggles((prev: number[]) =>
				prev.filter((item) => item !== id)
			);

			return;
		}
	};

	return (
		<div className="container">

			<BarContext.Provider value={{onToggle}}>
				<TogglesBar />
			</BarContext.Provider>

			<hr className="line" />

			<div className="deck">
				{activeToggles.map((id) => (
					<Letter key={`toggle${id}`} id={id} 
						name={getComponentNameById(id)}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
