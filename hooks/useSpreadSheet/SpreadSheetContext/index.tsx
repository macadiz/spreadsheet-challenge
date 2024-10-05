"use client";
import { createContext, PropsWithChildren, useReducer } from "react";
import {
  INITIAL_SPREADSHEET_STATE,
  SpreadSheetReducerActions,
} from "./constants";
import {
  CellPosition,
  SpreadSheetState,
  SpreadSheetStateReducerAction,
} from "./types";

export const SpreadSheetContext = createContext<SpreadSheetState>(
  INITIAL_SPREADSHEET_STATE
);

const spreadSheetStateReducer = (
  state: SpreadSheetState,
  action: SpreadSheetStateReducerAction
): SpreadSheetState => {
  const { type, payload } = action;

  switch (type) {
    case SpreadSheetReducerActions.SET_SELECTED_CELL:
      return {
        ...state,
        selectedCell: payload as CellPosition,
      };
    case SpreadSheetReducerActions.SET_CELL_VALUE:
      const newRecord = payload as Record<string, string>;
      const [key, value] = Object.entries(newRecord)[0];
      return {
        ...state,
        spreadSheetValues: {
          ...state.spreadSheetValues,
          [key]: value,
        },
      };
    default:
      return state;
  }
};

export function SpreadSheetContextProvider(props: PropsWithChildren) {
  const [state, dispatch] = useReducer(
    spreadSheetStateReducer,
    INITIAL_SPREADSHEET_STATE
  );

  const setSelectedCell = (position: CellPosition | null) => {
    dispatch({
      type: SpreadSheetReducerActions.SET_SELECTED_CELL,
      payload: position,
    });
  };

  const setCellValue = (position: CellPosition, value: string) => {
    dispatch({
      type: SpreadSheetReducerActions.SET_CELL_VALUE,
      payload: {
        [`${position.x}-${position.y}`]: value,
      },
    });
  };

  return (
    <SpreadSheetContext.Provider
      value={{
        spreadSheetValues: state.spreadSheetValues,
        selectedCell: state.selectedCell,
        setSelectedCell,
        setCellValue,
      }}
    >
      {props.children}
    </SpreadSheetContext.Provider>
  );
}
