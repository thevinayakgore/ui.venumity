import { Label } from "../../typography/label";
import { Attachment } from "./index";

export default function AttachmentDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 md:p-10 max-w-7xl w-full">
      {/* PDF */}
      <div className="w-full">
        <Label variant="muted" className="mb-3">
          .pdf
        </Label>
        <Attachment
          variant="compact"
          fileName="contract.pdf"
          fileSize="412 KB"
        />
      </div>

      {/* Spreadsheet */}
      <div className="w-full">
        <Label variant="muted" className="mb-3">
          .xlsx
        </Label>
        <Attachment
          variant="compact"
          fileName="spreadsheet.xlsx"
          fileSize="88 KB"
        />
      </div>

      {/* Archive */}
      <div className="w-full">
        <Label variant="muted" className="mb-3">
          .zip
        </Label>
        <Attachment variant="compact" fileName="photos.zip" fileSize="24 MB" />
      </div>

      {/* Image */}
      <div className="w-full">
        <Label variant="muted" className="mb-3">
          .png
        </Label>
        <Attachment
          variant="compact"
          fileName="vacation.png"
          fileSize="1.2 MB"
        />
      </div>

      {/* Video */}
      <div className="w-full">
        <Label variant="muted" className="mb-3">
          .mp4
        </Label>
        <Attachment variant="compact" fileName="demo.mp4" fileSize="94 MB" />
      </div>

      {/* Audio */}
      <div className="w-full">
        <Label variant="muted" className="mb-3">
          .mp3
        </Label>
        <Attachment variant="compact" fileName="podcast.mp3" fileSize="12 MB" />
      </div>

      {/* Markdown */}
      <div className="w-full">
        <Label variant="muted" className="mb-3">
          .md
        </Label>
        <Attachment variant="compact" fileName="readme.md" fileSize="3 KB" />
      </div>

      {/* Presentation */}
      <div className="w-full">
        <Label variant="muted" className="mb-3">
          .pptx
        </Label>
        <Attachment
          variant="compact"
          fileName="slides.pptx"
          fileSize="6.8 MB"
        />
      </div>
    </div>
  );
}
