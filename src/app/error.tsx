"use client";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Something went wrong
        </h1>
        <p className="text-lg text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={reset}
        className="gitea-button-primary inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium"
      >
        Try again
      </button>
    </div>
  );
}
