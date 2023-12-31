"use client";

import html2canvas from "html2canvas";
import { MdOutlineCameraAlt } from "react-icons/md";

interface PrintVerseProps {
  opt: string;
}

export default function PrintVerse({ opt }: PrintVerseProps) {
  const handleDownloadImage = async () => {
    const element = document.getElementById("print");
    const opts = document.getElementById(`opts${opt}`);

    if (element && opts) {
      opts.style.display = "none";
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL("image/jpg");
      const link = document.createElement("a");

      link.href = data;
      link.download = "downloaded-image.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      opts.style.display = "flex";
    }
  };

  return (
    <button type="button" onClick={handleDownloadImage}>
      <MdOutlineCameraAlt size={35} />
    </button>
  );
}
