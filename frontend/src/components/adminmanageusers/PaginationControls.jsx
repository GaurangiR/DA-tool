export default function PaginationControls({ page, setPage, totalPages }) {
  return (
    <div className="flex justify-center items-center mt-4 gap-2">
      <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
      <span className="px-2 font-medium">Page {page} of {totalPages}</span>
      <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
    </div>
  );
}
