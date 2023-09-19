import { useContext } from "react";
import useContentGenerator from "../hooks/useContentGenerator";
import { BarContextType, BarContext } from "./App";
import { LetterItem } from "../models/LetterItem";

type Props = {
	id: number;
	name: string;
};

const Letter = ({ id, name }: Props) => {
	const letters = useContentGenerator({id});
	const barContext = useContext<BarContextType | null>(BarContext);

	return <div className="card">
		<span className="card__name">{name}</span>

		<hr className="card__line"/>

		{
			id === 7 ? (
				<span className="card__content">{barContext?.eightContent}</span>	
			) : 
			(
				<span className="card__content">
					{
						letters.map((letter:LetterItem) => {
							const className = letter.type == "Ok" ? "" : "error";
							
							return (
								<span className={className}>{letter.letter}</span>
							)

						})
					}
				</span>
			)
		}
	</div>;
};
export default Letter;
