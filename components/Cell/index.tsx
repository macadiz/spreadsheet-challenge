import { ChangeEvent, useRef, useState } from "react";
import { CellProps } from "./types";
import { solveFormula } from "./utils";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectCell,
  setSpreadSheetValue,
  selectSpreadSheetValues,
  selectSelectedCell,
} from "@/lib/features/spreadsheet/spreadsheetSlice";

export function Cell({ position }: CellProps) {
  const dispatch = useAppDispatch();
  const spreadSheetValues = useAppSelector(selectSpreadSheetValues);
  const selectedCell = useAppSelector(selectSelectedCell);

  const inputRef = useRef<HTMLInputElement>(null);
  const [localValue, setLocalValue] = useState("");

  const isSelected =
    selectedCell?.x === position.x && selectedCell?.y === position.y;

  const onCellOut = () => {
    dispatch(
      setSpreadSheetValue({
        [`${position.x}-${position.y}`]: localValue,
      })
    );
    dispatch(selectCell(null));
  };

  const onCellIn = () => {
    dispatch(selectCell(position));
  };

  const resolveValue = (value: string) => {
    if (value?.startsWith("=")) {
      return solveFormula(value);
    }

    return value;
  };

  const onCellValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  return (
    <input
      ref={inputRef}
      className="w-full h-full min-w-full inline-block color-black text-right bg-transparent"
      onChange={isSelected ? onCellValueChange : () => {}}
      type={isSelected ? "text" : "button"}
      onBlur={isSelected ? onCellOut : () => {}}
      onFocus={!isSelected ? onCellIn : () => {}}
      value={
        isSelected
          ? localValue
          : resolveValue(spreadSheetValues[`${position.x}-${position.y}`] ?? "")
      }
    />
  );
}
