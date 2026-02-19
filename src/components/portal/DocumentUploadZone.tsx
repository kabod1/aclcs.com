"use client";

import { useState, useRef } from "react";
import { Upload, X, FileText, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { registerDocument } from "@/lib/actions/documents";
import { toast } from "sonner";

interface Props {
  caseId: string;
  cases: Array<{ id: string; title: string; reference_number: string }>;
}

export default function DocumentUploadZone({ caseId, cases }: Props) {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedCase, setSelectedCase] = useState(caseId);
  const inputRef = useRef<HTMLInputElement>(null);

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...dropped]);
  }

  function removeFile(i: number) {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleUpload() {
    if (!files.length || !selectedCase) return;
    setUploading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { toast.error("Not authenticated"); setUploading(false); return; }

    for (const file of files) {
      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `cases/${selectedCase}/${timestamp}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from("case-documents")
        .upload(path, file, { upsert: false });

      if (uploadError) {
        toast.error(`Failed to upload ${file.name}: ${uploadError.message}`);
        continue;
      }

      const fd = new FormData();
      fd.set("case_id", selectedCase);
      fd.set("name", file.name);
      fd.set("file_path", path);
      fd.set("size", String(file.size));
      fd.set("mime_type", file.type);
      fd.set("category", "submitted");

      const result = await registerDocument(fd);
      if (result?.error) {
        toast.error(`DB error for ${file.name}: ${result.error}`);
      } else {
        toast.success(`${file.name} uploaded successfully`);
      }
    }

    setFiles([]);
    setUploading(false);
  }

  return (
    <div className="space-y-4">
      {/* Case selector if multiple cases */}
      {cases.length > 1 && (
        <div>
          <label className="block text-sm font-semibold text-navy-700 mb-2">Upload to case</label>
          <select
            value={selectedCase}
            onChange={(e) => setSelectedCase(e.target.value)}
            className="select-field"
          >
            {cases.map((c) => (
              <option key={c.id} value={c.id}>
                {c.reference_number} — {c.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
          dragging ? "border-brand-500 bg-brand-50" : "border-navy-200 hover:border-brand-300 hover:bg-navy-50/50"
        }`}
      >
        <Upload size={28} className="text-navy-300 mx-auto mb-3" />
        <p className="text-sm font-semibold text-navy-600">Drop files here or click to browse</p>
        <p className="text-xs text-navy-400 mt-1">PDF, Word, Excel, images up to 20MB each</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => setFiles((prev) => [...prev, ...Array.from(e.target.files ?? [])])}
        />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file, i) => (
            <li key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-navy-100">
              <FileText size={18} className="text-brand-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-navy-800 truncate">{file.name}</p>
                <p className="text-xs text-navy-400">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
              <button
                onClick={() => removeFile(i)}
                className="text-navy-300 hover:text-red-500 transition-colors"
              >
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {files.length > 0 && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="btn-primary w-full justify-center disabled:opacity-60 disabled:pointer-events-none"
        >
          {uploading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Uploading {files.length} file{files.length > 1 ? "s" : ""}...
            </span>
          ) : (
            <>
              <CheckCircle size={16} />
              Upload {files.length} file{files.length > 1 ? "s" : ""}
            </>
          )}
        </button>
      )}
    </div>
  );
}
