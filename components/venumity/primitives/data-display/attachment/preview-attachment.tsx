import { Attachment } from "./index";

export default function PreviewAttachmentDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Hero */}
      <Attachment
        variant="preview"
        fileName="hero.png"
        fileSize="842 KB"
        thumbnailSrc="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400"
        onRemove={() => console.log("remove", "hero.png")}
      />

      {/* Team */}
      <Attachment
        variant="preview"
        fileName="team.jpg"
        fileSize="1.1 MB"
        thumbnailSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400"
        onRemove={() => console.log("remove", "team.jpg")}
      />

      {/* Skyline */}
      <Attachment
        variant="preview"
        fileName="skyline.jpg"
        fileSize="2.4 MB"
        thumbnailSrc="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400"
        onRemove={() => console.log("remove", "skyline.jpg")}
      />
    </div>
  );
}
