"use client";

import { useState, useEffect } from "react";

export function useSubmitLead() {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    zipCode: "",
  });

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ text: "Lead submitted successfully!", type: "success" });
        setForm({ name: "", email: "", phone: "", zipCode: "" });
      } else {
        setMessage({
          text: data.error || "Failed to submit lead",
          type: "error",
        });
      }
    } catch {
      setMessage({ text: "Network error. Try again.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  }

  const updateField = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  return {
    form,
    submitting,
    message,
    handleSubmit,
    updateField,
  };
}
