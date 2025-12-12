"use client";

export function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-80 space-y-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-slate-600">{message}</p>

        <div className="flex gap-2 justify-end">
          <button
            className="px-3 py-2 bg-slate-300 rounded"
            onClick={onCancel}
          >
            Cancelar
          </button>

          <button
            className="px-3 py-2 bg-red-600 text-white rounded"
            onClick={onConfirm}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
