import { useState } from "react";

const CORRECT_PASSWORD = "votre_mot_de_passe"; // ← changez ici

interface PasswordGateProps {
  children: React.ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === CORRECT_PASSWORD) {
      setUnlocked(true);
    } else {
      setError(true);
      setInput("");
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-md">
        <h2 className="mb-2 text-center text-xl font-semibold text-foreground">
          Accès protégé
        </h2>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Entrez le mot de passe pour accéder au CV.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            placeholder="Mot de passe"
            className="rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            autoFocus
          />
          {error && (
            <p className="text-center text-xs text-destructive">
              Mot de passe incorrect.
            </p>
          )}
          <button
            type="submit"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Accéder
          </button>
        </form>
      </div>
    </div>
  );
}
