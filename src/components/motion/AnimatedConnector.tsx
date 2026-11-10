/** Quiet two-way data-flow connector. Horizontal on wide screens, vertical on phones. */
export function AnimatedConnector({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 120 28" className="hidden h-7 w-full min-w-16 lg:block" preserveAspectRatio="none" fill="none">
        <line x1="0" y1="9" x2="120" y2="9" stroke="#1cb2bb" strokeWidth="2" className="flow-line" />
        <line x1="0" y1="19" x2="120" y2="19" stroke="#293b47" strokeOpacity="0.45" strokeWidth="2" className="flow-line-rev" />
      </svg>
      <svg viewBox="0 0 28 64" className="h-16 w-7 lg:hidden" fill="none">
        <line x1="9" y1="0" x2="9" y2="64" stroke="#1cb2bb" strokeWidth="2" className="flow-line" />
        <line x1="19" y1="0" x2="19" y2="64" stroke="#293b47" strokeOpacity="0.45" strokeWidth="2" className="flow-line-rev" />
      </svg>
    </div>
  );
}
