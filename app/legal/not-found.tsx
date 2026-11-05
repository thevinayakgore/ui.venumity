// app/legal/not-found.tsx
import Link from "next/link";

export default function LegalNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold mb-4">Legal Page Not Found</h1>
      <p className="text-muted-foreground mb-6">
        The legal page you are looking for does not exist.
      </p>
      <Link href="/" className="text-primary hover:underline">
        Return to Home
      </Link>
    </div>
  );
}