'use client';

/**
 * Grid mosaic of project screenshots.
 * Used as background content for CursorSpotlight.
 */
const projects = [
  { src: '/projects/lakupos-thumb.jpg', name: 'LakuPOS' },
  { src: '/projects/selisih-thumb.jpg', name: 'Serat QC' },
  { src: '/projects/wccheck-thumb.jpg', name: 'WC Check' },
  { src: '/projects/ecommerce-thumb.jpg', name: 'Qohira' },
  { src: '/projects/signalflow-thumb.jpg', name: 'SignalFlow' },
  { src: '/projects/shadowbid-thumb.jpg', name: 'ShadowBid' },
  { src: '/projects/traceflow-thumb.jpg', name: 'TraceFlow' },
  { src: '/projects/eduvate-thumb.jpg', name: 'Eduvate' },
];

export function ProjectMosaic() {
  return (
    <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-1 p-1">
      {projects.map((project, i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-sm"
        >
          <img
            src={project.src}
            alt={project.name}
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Subtle overlay with project name */}
          <div className="absolute inset-0 bg-black/20 flex items-end p-2">
            <span className="text-[9px] font-semibold text-white/80 tracking-wide uppercase">
              {project.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
