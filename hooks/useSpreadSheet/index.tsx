import { useContext } from "react";
import { SpreadSheetContext } from "./SpreadSheetContext";

export function useSpreadSheet() {
  const spreadSheetContext = useContext(SpreadSheetContext);

  return spreadSheetContext;
}
