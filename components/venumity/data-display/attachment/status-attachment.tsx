import { Label } from "../../typography/label";
import { Attachment } from "./index";

export default function StatusAttachmentDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 md:p-10 max-w-7xl w-full">
      {/* Idle */}
      <div className="w-full">
        <Label variant="muted" className="mb-3">
          status = &quot;idle&quot;
        </Label>
        <Attachment
          removable
          status="idle"
          fileSize="2.4 MB"
          fileName="annual-review.docx"
        />
      </div>

      {/* Pending */}
      <div className="w-full">
        <Label variant="muted" className="mb-3">
          status = &quot;pending&quot;
        </Label>
        <Attachment
          removable
          status="pending"
          fileSize="1.8 MB"
          fileName="quarterly-report.pdf"
        />
      </div>

      {/* Uploading */}
      <div className="w-full">
        <Label variant="muted" className="mb-3">
          status = &quot;uploading&quot;
        </Label>
        <Attachment
          removable
          progress={42}
          status="uploading"
          fileSize="12.6 MB"
          fileName="design-assets.zip"
        />
      </div>

      {/* Processing */}
      <div className="w-full">
        <Label variant="muted" className="mb-3">
          status = &quot;processing&quot;
        </Label>
        <Attachment
          fileSize="48.2 MB"
          status="processing"
          fileName="onboarding-video.mp4"
        />
      </div>

      {/* Success */}
      <div className="w-full">
        <Label variant="muted" className="mb-3">
          status = &quot;success&quot;
        </Label>
        <Attachment
          removable
          status="success"
          fileSize="3.1 MB"
          fileName="project-brief.docx"
        />
      </div>

      {/* Error */}
      <div className="w-full">
        <Label variant="muted" className="mb-3">
          status = &quot;error&quot;
        </Label>
        <Attachment
          removable
          status="error"
          fileSize="1.2 MB"
          fileName="client-logo.png"
          onRetry={() => console.log("retry")}
          errorMessage="Network error. Try again."
        />
      </div>
    </div>
  );
}
