import { useEffect, useRef, useState } from "react";
import useAxios from "../api/agent";
import { LetterResponse } from "../models/LetterResponse";

type Props = {
	id: number;
};

const useContentGenerator = ({id}: Props) => {
	const missingLetterChar = "_";
	const [letters, setLetters] = useState<string[]>([]);

	const lastLetterIndex = useRef<number | null>();
	const intervalId = useRef<number | null>();

	const requests = useAxios();

	useEffect(() => {
		intervalId.current = window.setInterval(async () => {
			try{
				const response: LetterResponse = await requests.get(
					`/letters/${id}`
				);
				console.log(response);
				
				fillGapIfNeeded(response.letter_index);

				if(lastLetterIndex.current === response.letter_index){
					return;
				}

				lastLetterIndex.current = response.letter_index;

				setLetters(prev => 
					{
						const newArray = [...prev, response.letter];
						
						return newArray.slice(-30);
					});
			}catch(e){
				console.log("error", e);
				setLetters(prev => [...prev, missingLetterChar]);
			}
			
		}, 2000);

		return () => {
			if (intervalId.current) {
				clearInterval(intervalId.current as number);
			}
		};
	}, []);

	const fillGapIfNeeded = (last_letter_index: number) => {
		if(lastLetterIndex.current && lastLetterIndex.current + 1 < last_letter_index)
		{
			const numberOfcharsToInject = last_letter_index - lastLetterIndex.current - 1;
			const maskToInject = missingLetterChar.repeat(numberOfcharsToInject).split('');
			setLetters(prev => [...prev, ...maskToInject]);
		}
	}

	return letters;
}
export default useContentGenerator