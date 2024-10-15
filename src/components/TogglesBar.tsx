import Toggle from "./Toggle";

export default function () {
  const checkBoxesIds: number[] = [0, 1, 2, 3, 4, 5, 6];

  return (
    <div className="toggle-bar">
      {checkBoxesIds.map((id: number) => (
        <Toggle key={id} id={id} />
      ))}
    </div>
  );
}
