import { getComponentNameById } from "../utils/cardNameUtil";

interface Props {
	onToggle: (id: number, checked: boolean) => void
}

export default function ({onToggle}: Props) {
	const checkBoxesIds: number[] = [0, 1, 2, 3, 4, 5, 6];

	return (
		<div className="toggle-bar">
			{checkBoxesIds.map((id: number) => {
				const checkboxId = `checkbox${id}`;
				return (
					<div className="toggle">
						<label className="toggle__label" htmlFor={checkboxId} key={checkboxId}>
							{getComponentNameById(id)}
							<input 
							className="toggle__input"
							type="checkbox" id={checkboxId}
								onChange={(e) => {
									return onToggle(id, e.target.checked);
								}}
							/>
						</label>
					</div>
				);
			})}
		</div>
	);
}
