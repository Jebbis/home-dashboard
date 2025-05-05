import { ReactSketchCanvas } from "react-sketch-canvas";
import { useRef, useState } from "react";

const SketchCanvas = () => {
  const canvasRef = useRef(null);
  const [eraseMode, setEraseMode] = useState(false);

  const handleEraserClick = () => {
    setEraseMode(true);
    canvasRef.current?.eraseMode(true);
  };

  const handlePenClick = () => {
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  };

  const handleUndoClick = () => {
    canvasRef.current?.undo();
  };

  const handleRedoClick = () => {
    canvasRef.current?.redo();
  };

  const handleClearClick = () => {
    canvasRef.current?.clearCanvas();
  };

  const handleResetClick = () => {
    canvasRef.current?.resetCanvas();
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl h-full p-4 bg-[#1B1B1B] border-none text-dark">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-2">
          <button
            type="button"
            className={`px-6 py-2 rounded-2xl font-medium shadow-md transition-all active:scale-95 ${
              !eraseMode
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            disabled={!eraseMode}
            onClick={handlePenClick}
          >
            Pen
          </button>

          <button
            type="button"
            className={`px-6 py-2 rounded-2xl font-medium shadow-md transition-all active:scale-95 ${
              eraseMode
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            disabled={eraseMode}
            onClick={handleEraserClick}
          >
            Eraser
          </button>
        </div>
        <div className="flex flex-row gap-2">
          <button
            type="button"
            className="px-6 py-2 rounded-2xl bg-blue-600 text-white font-medium shadow-md transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
            onClick={handleUndoClick}
          >
            Undo
          </button>
          <button
            type="button"
            className="px-6 py-2 rounded-2xl bg-blue-600 text-white font-medium shadow-md transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
            onClick={handleRedoClick}
          >
            Redo
          </button>
          <button
            type="button"
            className="px-6 py-2 rounded-2xl bg-blue-600 text-white font-medium shadow-md transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
            onClick={handleClearClick}
          >
            Clear
          </button>
        </div>
      </div>
      <ReactSketchCanvas ref={canvasRef} height="100%" canvasColor="#e1e1e1" />
    </div>
  );
};

export default SketchCanvas;
