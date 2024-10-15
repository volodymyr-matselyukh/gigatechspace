import { createContext, useState } from "react";
import "../styles/main.css";
import { getComponentNameById } from "../utils/cardNameUtil";
import Card from "./Card";
import TogglesBar from "./TogglesBar";

export interface BarContextType {
  onToggle: (id: number, checked: boolean) => void;
  eightContent: string;
  onLetterAdd: any;
}

export const BarContext = createContext<BarContextType | null>(null);

function App() {
  const [activeToggles, setActiveToggles] = useState<number[]>([]);
  const [eightContent, setEightContent] = useState("");

  const onLetterAdd = (letter: string) => {
    console.log("on letter add", letter);
    setEightContent((prev) => prev + letter);
  };

  const onToggle = (id: number, checked: boolean) => {
    const shouldBeAddedToActiveList = checked && !activeToggles.includes(id);

    if (shouldBeAddedToActiveList) {
      setActiveToggles((prev: number[]) => [...prev, id]);

      return;
    }

    const shouldBeRemovedFromActiveList =
      !checked && activeToggles.includes(id);

    if (shouldBeRemovedFromActiveList) {
      setActiveToggles((prev: number[]) => prev.filter((item) => item !== id));

      return null;
    }
  };

  return (
    <div className="container">
      <BarContext.Provider value={{ onToggle, eightContent, onLetterAdd }}>
        <TogglesBar />

        <hr className="line" />

        <div className="deck">
          {activeToggles.map((id) => (
            <Card key={`toggle${id}`} id={id} name={getComponentNameById(id)} />
          ))}
        </div>
      </BarContext.Provider>
    </div>
  );
}

export default App;
