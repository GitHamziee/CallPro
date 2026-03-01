"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const EMPTY_FORM = {
  leadType: "",
  name: "",
  phone: "",
  email: "",
  address: "",
  propertyType: "",
  bedsBaths: "",
  timeline: "",
  contractStatus: "",
  appointmentTime: "",
  notes: "",
};

export function useSubmitLead() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [submitting, setSubmitting] = useState(false);
  const [loadingLead, setLoadingLead] = useState(!!editId);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  // Fetch lead data when editing
  const fetchLead = useCallback(async () => {
    if (!editId) return;
    setLoadingLead(true);
    try {
      const res = await fetch(`/api/leads/${editId}`);
      const data = await res.json();
      if (res.ok && data.lead) {
        const l = data.lead;
        const apt = new Date(l.appointmentTime);
        const aptLocal = isNaN(apt.getTime())
          ? ""
          : `${apt.getFullYear()}-${String(apt.getMonth() + 1).padStart(2, "0")}-${String(apt.getDate()).padStart(2, "0")}T${String(apt.getHours()).padStart(2, "0")}:${String(apt.getMinutes()).padStart(2, "0")}`;

        setForm({
          leadType: l.leadType || "",
          name: l.name || "",
          phone: l.phone || "",
          email: l.email || "",
          address: l.address || "",
          propertyType: l.propertyType || "",
          bedsBaths: l.bedsBaths || "",
          timeline: l.timeline || "",
          contractStatus: l.contractStatus || "",
          appointmentTime: aptLocal,
          notes: l.notes || "",
        });
      } else {
        setMessage({ text: data.error || "Lead not found", type: "error" });
      }
    } catch {
      setMessage({ text: "Failed to load lead", type: "error" });
    } finally {
      setLoadingLead(false);
    }
  }, [editId]);

  useEffect(() => {
    fetchLead();
  }, [fetchLead]);

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
      const url = editId ? `/api/leads/${editId}` : "/api/leads";
      const method = editId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        if (editId) {
          setMessage({ text: "Lead updated successfully!", type: "success" });
          setTimeout(() => router.push("/leads/history"), 1000);
        } else {
          setMessage({ text: "Lead submitted successfully!", type: "success" });
          setForm(EMPTY_FORM);
        }
      } else {
        setMessage({
          text: data.error || `Failed to ${editId ? "update" : "submit"} lead`,
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
    loadingLead,
    message,
    editId,
    handleSubmit,
    updateField,
  };
}
