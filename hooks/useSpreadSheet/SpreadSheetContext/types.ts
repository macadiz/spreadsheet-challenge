import { SpreadSheetReducerActions } from "./constants";

export type SpreadSheetState = {
  spreadSheetValues: Record<string, string>;
  selectedCell: CellPosition | null;
  setSelectedCell: (position: CellPosition | null) => void;
  setCellValue: (position: CellPosition, value: string) => void;
};

export type CellPosition = {
  x: number;
  y: number;
};

export type SpreadSheetStateReducerAction = {
  type: SpreadSheetReducerActions;
  payload: unknown;
};
