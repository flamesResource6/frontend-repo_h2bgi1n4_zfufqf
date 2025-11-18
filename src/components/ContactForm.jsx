import { useState } from 'react';

export default function ContactForm({ onCreated }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const backend = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${backend}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to create contact');
      const data = await res.json();
      onCreated?.(data.id);
      setForm({ name: '', email: '', phone: '', company: '', notes: '' });
    } catch (err) {
      setError(err.message || 'Error creating contact');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 md:p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-200 text-sm mb-1">Name</label>
          <input name="name" value={form.name} onChange={handleChange} required className="w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
        </div>
        <div>
          <label className="block text-slate-200 text-sm mb-1">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
        </div>
        <div>
          <label className="block text-slate-200 text-sm mb-1">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
        </div>
        <div>
          <label className="block text-slate-200 text-sm mb-1">Company</label>
          <input name="company" value={form.company} onChange={handleChange} className="w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
        </div>
      </div>
      <div>
        <label className="block text-slate-200 text-sm mb-1">Notes</label>
        <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <div className="flex justify-end">
        <button disabled={loading} className="inline-flex items-center justify-center rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-4 py-2 transition">
          {loading ? 'Saving...' : 'Add Contact'}
        </button>
      </div>
    </form>
  );
}
