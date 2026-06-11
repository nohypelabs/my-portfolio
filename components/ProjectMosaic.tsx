'use client';

/**
 * Premium grid mosaic of project screenshots.
 * Used as background content for CursorSpotlight.
 */
const projects = [
  { src: '/projects/lakupos-thumb.jpg', name: 'LakuPOS', tag: 'POS System' },
  { src: '/projects/selisih-thumb.jpg', name: 'Serat QC', tag: 'Logistics' },
  { src: '/projects/wccheck-thumb.jpg', name: 'WC Check', tag: 'Monitoring' },
  { src: '/projects/ecommerce-thumb.jpg', name: 'Qohira', tag: 'E-commerce' },
  { src: '/projects/signalflow-thumb.jpg', name: 'SignalFlow', tag: 'AI Agent' },
  { src: '/projects/shadowbid-thumb.jpg', name: 'ShadowBid', tag: 'Trading' },
  { src: '/projects/traceflow-thumb.jpg', name: 'TraceFlow', tag: 'Fleet Track' },
  { src: '/projects/eduvate-thumb.jpg', name: 'Eduvate', tag: 'Education' },
];

export function ProjectMosaic() {
  return (
    <div className="absolute inset-0 bg-neutral-950">
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-[2px]">
        {projects.map((project, i) => (
          <div
            key={i}
            className="relative overflow-hidden group"
          >
            {/* Image */}
            <img
              src={project.src}
              alt={project.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="eager"
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Project info */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-bold text-white tracking-wide leading-tight">
                    {project.name}
                  </p>
                  <p className="text-[8px] text-white/50 mt-0.5 uppercase tracking-widest">
                    {project.tag}
                  </p>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
              </div>
            </div>

            {/* Top-right index */}
            <div className="absolute top-2 right-2">
              <span className="text-[8px] font-mono text-white/20">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Grid lines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '25% 50%',
        }}
      />
    </div>
  );
}
