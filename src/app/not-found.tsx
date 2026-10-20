import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="space-y-2">
        <h1 className="text-6xl font-bold tracking-tight text-foreground">404</h1>
        <p className="text-lg text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <Link
        href="/"
        className="gitea-button-primary inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium"
      >
        Back to home
      </Link>
    </div>
  );
}
