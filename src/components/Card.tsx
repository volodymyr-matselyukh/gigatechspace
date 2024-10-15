import { useEffect } from "react";
import useContentGenerator from "../hooks/useContentGenerator";
import { LetterItem } from "../models/LetterItem";

type Props = {
  id: number;
  name: string;
};

const Card = ({ id, name }: Props) => {
  const { letters, startTimer, destroyTimer } = useContentGenerator({ id });

  useEffect(() => {
    startTimer();

    return () => {
      destroyTimer();
    };
  }, []);

  return (
    <div className="card">
      <span className="card__name">{name}</span>

      <hr className="card__line" />

      <span className="card__content">
        {letters.map((letter: LetterItem) => {
          const className = letter.type === "Ok" ? "" : "error";

          return (
            <span key={letter.index} className={className}>
              {letter.letter}
            </span>
          );
        })}
      </span>
    </div>
  );
};
export default Card;
