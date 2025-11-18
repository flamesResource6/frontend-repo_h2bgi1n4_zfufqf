import { useEffect, useMemo, useState } from 'react';

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const backend = import.meta.env.VITE_BACKEND_URL;

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const url = new URL(`${backend}/api/contacts`);
      if (query) url.searchParams.set('q', query);
      const res = await fetch(url.toString());
      const data = await res.json();
      setContacts(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = setTimeout(fetchContacts, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-4">
        <h3 className="text-slate-100 font-semibold text-lg flex-1">Contacts</h3>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, email, phone" className="w-full md:w-72 rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
      </div>

      {loading ? (
        <p className="text-slate-300">Loading...</p>
      ) : contacts.length === 0 ? (
        <p className="text-slate-400">No contacts yet.</p>
      ) : (
        <ul className="divide-y divide-slate-700/60">
          {contacts.map((c) => (
            <li key={c.id} className="py-3 flex items-start justify-between gap-4">
              <div>
                <p className="text-slate-100 font-medium">{c.name}</p>
                <p className="text-slate-400 text-sm">{c.email || '—'} • {c.phone || '—'}</p>
                {c.company && <p className="text-slate-400 text-sm">{c.company}</p>}
              </div>
              <span className="text-slate-500 text-xs">{c.created_at ? new Date(c.created_at).toLocaleString() : ''}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
