import { useContext, useRef, useState } from "react";
import useAxios from "../api/agent";
import { BarContext, BarContextType } from "../components/App";
import { LetterItem } from "../models/LetterItem";
import { LetterResponse } from "../models/LetterResponse";

type Props = {
  id: number;
};

const useContentGenerator = ({ id }: Props) => {
  const missingLetterChar = "*";
  const [letters, setLetters] = useState<LetterItem[]>([]);
  const barContext = useContext<BarContextType | null>(BarContext);

  const lastLetterIndex = useRef<number | null>();

  const requests = useAxios();

  const intervalId = useRef<number | null>();

  const startTimer = () => {
    intervalId.current = window.setInterval(async () => {
      try {
        const response: LetterResponse = await requests.get(`/letters/${id}`);
        console.log(`response for toggle ${id}`, response);

        fillGapIfNeeded(response.index);

        if (lastLetterIndex.current === response.index) {
          return;
        }

        lastLetterIndex.current = response.index;

        setLetters((prev) => {
          const newArray: LetterItem[] = [
            ...prev,
            {
              index: response.index,
              letter: response.letter,
              type: "Ok",
            },
          ];

          return getSlicedArray(newArray);
        });

        barContext?.onLetterAdd(response.letter);
      } catch {
        const errorLetterIndex = Math.floor(Math.random() * 1000000);
        lastLetterIndex.current = errorLetterIndex;
        setLetters((prev) => {
          const newArray: LetterItem[] = [
            ...prev,
            {
              letter: missingLetterChar,
              type: "Error",
              index: errorLetterIndex,
            },
          ];

          return getSlicedArray(newArray);
        });
      }
    }, 2000);
  };

  const destroyTimer = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
  };

  const getSlicedArray = (arr: LetterItem[]) => {
    return arr.slice(-30);
  };

  const fillGapIfNeeded = (last_letter_index: number) => {
    if (
      lastLetterIndex.current &&
      lastLetterIndex.current + 1 < last_letter_index
    ) {
      const numberOfcharsToInject =
        last_letter_index - lastLetterIndex.current - 1;

      const maskToInject: LetterItem[] = missingLetterChar
        .repeat(numberOfcharsToInject)
        .split("")
        .map((c) => ({
          letter: missingLetterChar,
          type: "Ok",
          index: Math.floor(Math.random() * 1000000),
        }));

      setLetters((prev) => [...prev, ...maskToInject]);
    }
  };

  return { letters, startTimer, destroyTimer };
};
export default useContentGenerator;
