import Hero from './components/Hero';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero with 3D Spline */}
      <Hero />

      {/* Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 -mt-10 md:-mt-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-2">
            <ContactForm onCreated={() => { /* no-op: list fetch handles itself via search debounce */ }} />
          </div>
          <div className="md:col-span-3">
            <ContactList />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-400">Made with a futuristic 3D vibe</footer>
    </div>
  );
}

export default App;
