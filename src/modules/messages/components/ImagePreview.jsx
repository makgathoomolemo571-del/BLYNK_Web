import { useEffect } from "react";
import { FaTimes, FaDownload, FaExpand } from "react-icons/fa";

export default function ImagePreview({
  open,
  image,
  fileName,
  onClose
}) {
  useEffect(() => {
    if (!open) return;

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open || !image) return null;

  const download = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = fileName || "image";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative max-w-7xl max-h-[95vh] w-full flex justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image}
          alt={fileName || "Preview"}
          className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-2xl"
        />

        <div className="absolute top-4 right-4 flex gap-2">

          <button
            onClick={() => window.open(image, "_blank")}
            className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-zinc-700"
            title="Open"
          >
            <FaExpand />
          </button>

          <button
            onClick={download}
            className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700"
            title="Download"
          >
            <FaDownload />
          </button>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700"
            title="Close"
          >
            <FaTimes />
          </button>

        </div>

        {fileName && (
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
            {fileName}
          </div>
        )}
      </div>
    </div>
  );
}