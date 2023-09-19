import { useEffect, useRef, useState, useContext } from "react";
import useAxios from "../api/agent";
import { LetterResponse } from "../models/LetterResponse";
import { BarContext, BarContextType } from "../components/App";
import { LetterItem } from "../models/LetterItem";

type Props = {
	id: number;
};

const useContentGenerator = ({ id }: Props) => {
	const missingLetterChar = "*";
	const [letters, setLetters] = useState<LetterItem[]>([]);
	const barContext = useContext<BarContextType | null>(BarContext);

	const lastLetterIndex = useRef<number | null>();
	const intervalId = useRef<number | null>();

	const requests = useAxios();

	useEffect(() => {
		if (id === 7) {
			return;
		}

		intervalId.current = window.setInterval(async () => {
			//try {

				try {
					const response: LetterResponse = await requests.get(
						`/letters/${id}`
					);
					console.log(`response for toggle ${id}`, response);

					fillGapIfNeeded(response.letter_index);

					if (lastLetterIndex.current === response.letter_index) {
						return;
					}

					lastLetterIndex.current = response.letter_index;


					setLetters(prev => {
						const newArray: LetterItem[] = [...prev,
						{
							letter: response.letter,
							type: "Ok"
						}];

						return getSlicedArray(newArray);
					});

					barContext?.onLetterAdd(response.letter);
				} catch {
					setLetters(prev => {
						const newArray: LetterItem[] = [...prev,
						{
							letter: missingLetterChar,
							type: "Error"
						}];

						return getSlicedArray(newArray);
					});
				}


			// } catch (e) {
			// 	console.error("error", e);



			// 	setLetters(prev => getSlicedArray([...prev, {
			// 		letter: missingLetterChar,
			// 		type: "Error"
			// 	}]));
			// }

		}, 2000);


		const getContentForEightComponent = () => {

		}

		return () => {
			if (intervalId.current) {
				clearInterval(intervalId.current as number);
			}
		};
	}, []);

	const getSlicedArray = (arr: LetterItem[]) => {
		return arr.slice(-30);
	}

	const fillGapIfNeeded = (last_letter_index: number) => {
		if (lastLetterIndex.current && lastLetterIndex.current + 1 < last_letter_index) {
			const numberOfcharsToInject = last_letter_index - lastLetterIndex.current - 1;
			const maskToInject: LetterItem[] = missingLetterChar.repeat(numberOfcharsToInject).split('').map(c => ({
				letter: missingLetterChar,
				type: "Ok"
			}));

			setLetters(prev => [...prev, ...maskToInject]);
		}
	}

	return letters;
}
export default useContentGenerator