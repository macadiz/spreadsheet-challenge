import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { CellPosition } from "@/hooks/useSpreadSheet/SpreadSheetContext/types";

type SpreadSheetState = {
  spreadSheetValues: Record<string, string>;
  selectedCell: CellPosition | null;
};

// Define the initial state using that type
const initialState: SpreadSheetState = {
  spreadSheetValues: {},
  selectedCell: null,
};

export const spreadsheetSlice = createSlice({
  name: "spreadsheet",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    selectCell: (state, action: PayloadAction<CellPosition | null>) => {
      state.selectedCell = action.payload;
    },
    setSpreadSheetValue: (
      state,
      action: PayloadAction<Record<string, string>>
    ) => {
      const [key, value] = Object.entries(action.payload)[0];
      state.spreadSheetValues = {
        ...state.spreadSheetValues,
        [key]: value,
      };
    },
  },
});

export const { selectCell, setSpreadSheetValue } = spreadsheetSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSpreadSheetValues = (state: RootState) =>
  state.spreadsheet.spreadSheetValues;
export const selectSelectedCell = (state: RootState) =>
  state.spreadsheet.selectedCell;

export default spreadsheetSlice.reducer;
