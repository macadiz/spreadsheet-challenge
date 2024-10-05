import { SpreadSheetState } from "./types";

export const INITIAL_SPREADSHEET_STATE: SpreadSheetState = {
  spreadSheetValues: {},
  selectedCell: null,
  setSelectedCell: () => {},
  setCellValue: () => {},
};

export const INITIAL_COLUMNS = 100;
export const INITIAL_ROWS = 100;

export enum SpreadSheetReducerActions {
  SET_SELECTED_CELL = "SET_SELECTED_CELL",
  SET_CELL_VALUE = "SET_CELL_VALUE",
}
