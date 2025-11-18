import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/Nhk4dWoYLj83rV44/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* Gradient overlays for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-slate-950/80" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-cyan-200 text-sm">
          Futuristic CRM • 3D Experience
        </span>
        <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-400">
          Contact Management, Reimagined
        </h1>
        <p className="mt-4 md:mt-6 text-slate-200/80 max-w-2xl mx-auto">
          Organize relationships, track interactions, and act faster — wrapped in a modern 3D interface.
        </p>
      </div>
    </section>
  );
}
