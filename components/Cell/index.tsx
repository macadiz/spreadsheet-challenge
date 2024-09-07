import { useState } from "react";
import { CellProps } from "./types";
import { solveFormula } from "./utils";

export function Cell({ value }: CellProps) {
  const [isEditing, setIsEditing] = useState(false);

  const onButtonClick = () => {
    setIsEditing(true);
  };

  const resolveValue = () => {
    if (value?.startsWith("=")) {
      return solveFormula(value);
    }

    return value;
  };

  return (
    <>
      {!isEditing && (
        <button
          className="w-full h-full min-w-full inline-block box-border"
          onClick={onButtonClick}
        >
          {resolveValue()}
        </button>
      )}
      {isEditing && (
        <input className="w-full h-full min-w-full" value={value} />
      )}
    </>
  );
}
