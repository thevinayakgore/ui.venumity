"use client";
import { useState } from "react";
import { AvatarUpload } from "./index";

export default function UploadAvatarDemo() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <AvatarUpload
          size="xl"
          initials="Jane Doe"
          onChange={(f) => setFile(f)}
        />
        <AvatarUpload size="lg" onChange={() => {}} />
      </div>
      <p className="text-xs md:text-sm">
        {file ? (
          <>
            Picked: <code>{file.name}</code>
          </>
        ) : (
          "Hover the avatar - the overlay reveals a camera icon."
        )}
      </p>
    </div>
  );
}
