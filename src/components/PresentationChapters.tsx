import { useState } from "react";
import type { PresentationChapter } from "@/data/presentationsSfS1";

const FILE_ICONS: Record<string, { icon: string; color: string; label: string }> = {
  pdf: { icon: "fa-solid fa-file-pdf", color: "#dc2626", label: "PDF" },
  ppt: { icon: "fa-solid fa-file-powerpoint", color: "#d24726", label: "PowerPoint" },
  doc: { icon: "fa-solid fa-file-word", color: "#2b579a", label: "Word" },
  xls: { icon: "fa-solid fa-file-excel", color: "#217346", label: "Excel" },
  img: { icon: "fa-solid fa-file-image", color: "#7c3aed", label: "Image" },
  other: { icon: "fa-solid fa-file-lines", color: "#6b7280", label: "Document" },
};

function fileKind(filename: string, mime: string) {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "pdf" || mime.includes("pdf")) return FILE_ICONS.pdf;
  if (["ppt", "pptx"].includes(ext) || mime.includes("presentation")) return FILE_ICONS.ppt;
  if (["doc", "docx"].includes(ext) || mime.includes("word")) return FILE_ICONS.doc;
  if (["xls", "xlsx", "csv"].includes(ext) || mime.includes("sheet")) return FILE_ICONS.xls;
  if (["png", "jpg", "jpeg", "webp", "gif"].includes(ext) || mime.startsWith("image/")) return FILE_ICONS.img;
  return FILE_ICONS.other;
}

const humanSize = (bytes: number) =>
  bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} Mo` : `${Math.max(1, Math.round(bytes / 1024))} Ko`;

interface Props {
  chapters: PresentationChapter[];
  color: string;
  light: string;
}

/** Présentations regroupées par chapitre, en accordéon dépliable. */
export default function PresentationChapters({ chapters, color, light }: Props) {
  const firstFilled = chapters.find((ch) => ch.documents.length > 0)?.id ?? chapters[0]?.id ?? null;
  const [open, setOpen] = useState<string | null>(firstFilled);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {chapters.map((ch) => {
        const isOpen = open === ch.id;
        return (
          <section key={ch.id} style={{ border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden", background: "#fff" }}>
            <button
              onClick={() => setOpen(isOpen ? null : ch.id)}
              aria-expanded={isOpen}
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                gap: 12, padding: "14px 16px", background: isOpen ? light : "#fafafa",
                border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.2s",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{
                  width: 30, height: 30, borderRadius: "50%", background: color, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0,
                }}>{ch.numero}</span>
                <span style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>{ch.titre}</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: light, color }}>
                  {ch.documents.length > 0 ? `${ch.documents.length} document${ch.documents.length > 1 ? "s" : ""}` : "À venir"}
                </span>
                <i
                  className="fa-solid fa-chevron-right"
                  aria-hidden="true"
                  style={{ color: "#9ca3af", fontSize: 13, transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}
                />
              </span>
            </button>

            {isOpen && (
              <div style={{ padding: "1rem 1.1rem", borderTop: `3px solid ${color}` }}>
                {ch.documents.length === 0 ? (
                  <div style={{ padding: "1.25rem", textAlign: "center", color: "#6b7280", fontSize: 14 }}>
                    <i className="fa-regular fa-clock" aria-hidden="true" style={{ marginRight: 8, color: "#9ca3af" }} />
                    Contenu à venir
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {ch.documents.map((d) => {
                      const kind = fileKind(d.filename, d.type);
                      return (
                        <div key={d.fichier} style={{
                          display: "flex", alignItems: "center", gap: 14, padding: "12px 14px",
                          border: "1px solid #e5e7eb", borderRadius: 12, background: "#fafafa", flexWrap: "wrap",
                        }}>
                          <div style={{
                            width: 38, height: 38, borderRadius: 10, background: kind.color + "18",
                            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                          }}>
                            <i className={kind.icon} aria-hidden="true" style={{ color: kind.color, fontSize: 18 }} />
                          </div>
                          <div style={{ flex: 1, minWidth: 180 }}>
                            <div style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>{d.titre}</div>
                            <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2, wordBreak: "break-all" }}>
                              {d.filename} · {kind.label} · {humanSize(d.size)}
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                            <a href={d.fichier} target="_blank" rel="noreferrer" style={{
                              display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8,
                              fontSize: 13, fontWeight: 700, border: `1.5px solid ${color}`, color, textDecoration: "none",
                            }}>
                              <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" style={{ fontSize: 12 }} />
                              Ouvrir
                            </a>
                            <a href={d.fichier} download={d.filename} style={{
                              display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8,
                              fontSize: 13, fontWeight: 700, background: color, color: "#fff", textDecoration: "none",
                            }}>
                              <i className="fa-solid fa-download" aria-hidden="true" style={{ fontSize: 12 }} />
                              Télécharger
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
