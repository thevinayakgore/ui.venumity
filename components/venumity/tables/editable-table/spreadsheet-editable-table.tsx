"use client";
import { useState, useRef, useEffect } from "react";
import { Download, Upload, Trash2, Plus } from "lucide-react";

export default function EditableTable3_4() {
  const [activeCell, setActiveCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [data, setData] = useState([
    ["Product", "Category", "Price", "Stock", "Status"],
    ["iPhone 14 Pro", "Electronics", "999", "45", "In Stock"],
    ["MacBook Air", "Computers", "1199", "23", "Low Stock"],
    ["AirPods Pro", "Audio", "249", "156", "In Stock"],
    ["iPad Air", "Tablets", "599", "34", "In Stock"],
    ["Apple Watch", "Wearables", "399", "89", "In Stock"],
  ]);

  const cellRefs = useRef<(HTMLInputElement | null)[][]>([]);

  useEffect(() => {
    // Initialize refs array
    cellRefs.current = data.map((row) =>
      row.map(() => null)
    );
  }, [data]);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    setActiveCell({ row: rowIndex, col: colIndex });
    setTimeout(() => {
      cellRefs.current[rowIndex]?.[colIndex]?.focus();
      cellRefs.current[rowIndex]?.[colIndex]?.select();
    }, 0);
  };

  const handleCellChange = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    const newData = [...data];
    newData[rowIndex][colIndex] = value;
    setData(newData);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    rowIndex: number,
    colIndex: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextRow = rowIndex + 1;
      if (nextRow < data.length) {
        handleCellClick(nextRow, colIndex);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const nextCol = colIndex + 1;
      if (nextCol < data[0].length) {
        handleCellClick(rowIndex, nextCol);
      } else if (rowIndex + 1 < data.length) {
        handleCellClick(rowIndex + 1, 0);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextRow = rowIndex + 1;
      if (nextRow < data.length) {
        handleCellClick(nextRow, colIndex);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevRow = rowIndex - 1;
      if (prevRow >= 0) {
        handleCellClick(prevRow, colIndex);
      }
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextCol = colIndex + 1;
      if (nextCol < data[0].length) {
        handleCellClick(rowIndex, nextCol);
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevCol = colIndex - 1;
      if (prevCol >= 0) {
        handleCellClick(rowIndex, prevCol);
      }
    }
  };

  const addRow = () => {
    const newRow = Array(data[0].length).fill("");
    setData([...data, newRow]);
  };

  const deleteRow = (rowIndex: number) => {
    if (rowIndex === 0) return; // Don't delete header
    const newData = data.filter((_, index) => index !== rowIndex);
    setData(newData);
  };

  const addColumn = () => {
    const newData = data.map((row) => [...row, ""]);
    setData(newData);
  };

  const deleteColumn = (colIndex: number) => {
    if (colIndex === 0) return; // Don't delete first column
    const newData = data.map((row) =>
      row.filter((_, index) => index !== colIndex)
    );
    setData(newData);
  };

  const exportData = () => {
    const csv = data.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "spreadsheet.csv";
    a.click();
  };

  const getCellStyle = (rowIndex: number, colIndex: number) => {
    if (rowIndex === 0) {
      return "bg-gray-100 dark:bg-gray-800 font-semibold text-gray-900 dark:text-white";
    }
    if (activeCell?.row === rowIndex && activeCell?.col === colIndex) {
      return "bg-blue-100 dark:bg-blue-900/30 ring-2 ring-blue-500";
    }
    return "bg-white dark:bg-gray-900 text-gray-900 dark:text-white";
  };

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Spreadsheet Editor
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Click cells to edit. Use arrow keys to navigate.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={exportData}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Import
              </button>
              <button
                onClick={addRow}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Row
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <div>• Click any cell to edit its content</div>
            <div>• Press Enter to move down, Tab to move right</div>
            <div>• Use arrow keys for navigation</div>
          </div>
        </div>

        {/* Spreadsheet */}
        <div className="overflow-auto max-h-[600px]">
          <div className="min-w-max">
            {/* Column Headers */}
            <div className="flex border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
              <div className="w-12 border-r border-gray-200 dark:border-gray-800"></div>
              {data[0]?.map((header, colIndex) => (
                <div
                  key={colIndex}
                  className="relative group flex-1 min-w-[150px] border-r border-gray-200 dark:border-gray-800"
                >
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 font-semibold text-gray-900 dark:text-white">
                    {header}
                  </div>
                  {colIndex > 0 && (
                    <button
                      onClick={() => deleteColumn(colIndex)}
                      className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 p-1 bg-red-500 text-white rounded-full"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addColumn}
                className="w-12 flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <Plus className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Rows */}
            {data.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
              >
                {/* Row Header */}
                <div className="relative group w-12 border-r border-gray-200 dark:border-gray-800 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                  {rowIndex === 0 ? (
                    <span className="text-xs text-gray-500">#</span>
                  ) : (
                    <>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {rowIndex}
                      </span>
                      <button
                        onClick={() => deleteRow(rowIndex)}
                        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 p-1 bg-red-500 text-white rounded-full"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>

                {/* Cells */}
                {row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`flex-1 min-w-[150px] border-r border-gray-200 dark:border-gray-800 p-0 ${getCellStyle(
                      rowIndex,
                      colIndex
                    )}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {activeCell?.row === rowIndex &&
                    activeCell?.col === colIndex ? (
                      <input
                        ref={(el) => {
                          if (!cellRefs.current[rowIndex])
                            cellRefs.current[rowIndex] = [];
                          cellRefs.current[rowIndex][colIndex] = el;
                        }}
                        type="text"
                        value={cell}
                        onChange={(e) =>
                          handleCellChange(rowIndex, colIndex, e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                        onBlur={() => setActiveCell(null)}
                        className="w-full h-full px-3 py-2 bg-transparent focus:outline-none"
                        autoFocus
                      />
                    ) : (
                      <div className="px-3 py-2 min-h-[40px] flex items-center">
                        {rowIndex === 0 ? (
                          <span className="font-semibold">{cell}</span>
                        ) : (
                          <span>{cell}</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {/* Empty cell for alignment */}
                <div className="w-12"></div>
              </div>
            ))}

            {/* Add Row Button */}
            <div className="flex">
              <div className="w-12 border-r border-gray-200 dark:border-gray-800"></div>
              <button
                onClick={addRow}
                className="flex-1 p-3 border border-dashed border-gray-300 dark:border-gray-700 text-gray-500 hover:border-gray-400 hover:text-gray-600 transition flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Row
              </button>
              <div className="w-12"></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div>
              {data.length - 1} rows × {data[0]?.length} columns
              {activeCell &&
                ` • Selected: R${activeCell.row + 1}C${activeCell.col + 1}`}
            </div>
            <div className="flex items-center gap-2">
              <span>Press</span>
              <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">
                Enter
              </kbd>
              <span>to save and move down</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
