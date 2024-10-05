"use client";
import { createRange } from "@/utils/array";
import { solveLetterHeader } from "./utils";
import { Cell } from "../Cell";
import {
  INITIAL_COLUMNS,
  INITIAL_ROWS,
} from "@/hooks/useSpreadSheet/SpreadSheetContext/constants";

export function SpreadSheet() {
  return (
    <table className="table-fixed">
      <thead>
        <tr>
          <th className="border border-white"></th>
          {createRange(INITIAL_COLUMNS).map((_, idx) => {
            return (
              <th className="border border-white min-w-28" key={idx}>
                {solveLetterHeader(idx)}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {createRange(INITIAL_ROWS).map((_, idx) => {
          return (
            <tr key={idx}>
              <td className="border border-white">{idx + 1}</td>
              {createRange(INITIAL_COLUMNS).map((_, cIdx) => {
                const position = {
                  x: idx,
                  y: cIdx,
                };
                return (
                  <td
                    className="border border-white min-w-28"
                    key={`${position.x}-${position.y}`}
                  >
                    <Cell position={position} />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
