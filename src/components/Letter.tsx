import useContentGenerator from "../hooks/useContentGenerator";

type Props = {
	id: number;
	name: string;
};

const Letter = ({ id, name }: Props) => {
	const letters = useContentGenerator({id});

	return <div className="card">
		<span className="card__name">{name}</span>

		<hr className="card__line"/>

		<span className="card__content">{letters.join('')}</span>
	</div>;
};
export default Letter;
