import { useState } from "react";
import type { FormEvent } from "react";
import "./GateForm.css";

type Props = {
  onUnlock: () => void;
};

type FormState = {
  first_name: string;
  password: string;
};

const API_BASE = import.meta.env.VITE_API_BASE ?? "";

export default function GateForm({ onUnlock }: Props) {
  const [form, setForm] = useState<FormState>({
    first_name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/gate/unlock/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.message || "No pudimos abrir la puerta…");
        return;
      }

      onUnlock();
    } catch {
      setError("No hay conexión con el servidor. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="gate">
      <section className="gate-panel">
        <p className="gate-brand">Para ti</p>
        <h1 className="gate-title">Abre esto con el corazón</h1>
        <p className="gate-subtitle">
          Dos respuestas. Una sola persona las conoce.
        </p>

        <form className="gate-form" onSubmit={onSubmit} noValidate>
          <label className="field">
            <span>Ingresa tu primer nombre</span>
            <input
              type="text"
              name="first_name"
              autoComplete="given-name"
              value={form.first_name}
              onChange={(e) => update("first_name", e.target.value)}
              placeholder="Tu nombre"
              required
            />
          </label>

          <label className="field">
            <span>Bailando, ¿qué ritmo nos conocimos?</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>

          {error ? <p className="gate-error" role="alert">{error}</p> : null}

          <button className="gate-submit" type="submit" disabled={loading}>
            {loading ? "Abriendo…" : "Entrar"}
          </button>
        </form>
      </section>
    </main>
  );
}
