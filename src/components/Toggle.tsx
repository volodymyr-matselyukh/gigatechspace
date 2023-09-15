import { useContext, useRef } from "react";
import { getComponentNameById } from "../utils/cardNameUtil";
import { BarContext, BarContextType } from "./App";

type Props = {
	id: number;
};
const Toggle = ({ id }: Props) => {
	const barContext = useContext<BarContextType | null>(BarContext);
	const checkboxId = `checkbox${id}`;
	const checkboxRef = useRef<null | HTMLInputElement>(null);

	return (
		<div
			className={
				checkboxRef.current?.checked
					? "toggle toggle--active"
					: "toggle"
			}
			onClick={(e) => {
				var onchangeEvent = new Event("checked", { bubbles: true });

				if (checkboxRef.current) {
					checkboxRef.current?.dispatchEvent(onchangeEvent);
					checkboxRef.current.checked = !checkboxRef.current.checked;
					if (barContext) {
						barContext.onToggle(id, checkboxRef.current.checked);
					}
				}
			}}
		>
			<label
				className="toggle__label"
				htmlFor={checkboxId}
				key={checkboxId}
				onClick={(e) => e.stopPropagation()}
			>
				{getComponentNameById(id)}
				<input
					ref={checkboxRef}
					className="toggle__input"
					type="checkbox"
					id={checkboxId}
					onClick={(e) => {
						e.stopPropagation();
					}}
					onChange={(e) => {
						if(barContext)
						{
							barContext.onToggle(id, e.target.checked);	
						}
					}}
				/>
			</label>
		</div>
	);
};
export default Toggle;
