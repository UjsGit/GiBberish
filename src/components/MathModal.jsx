export function MathModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}>
      <div 
        className="bg-canvas border border-border rounded-2xl shadow-2xl max-w-[500px] w-full p-8 text-text-primary relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-surface hover:bg-surface-raised text-text-muted hover:text-text-primary transition-colors"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-[22px] font-bold mb-6 mt-1">The Mathematical Discrepancy</h2>
        
        <div className="space-y-6 text-[14px]">
          <div>
            <div className="text-[10px] uppercase text-text-secondary tracking-widest mb-2 font-semibold">MANUFACTURER MATH (BASE-10)</div>
            <div className="bg-surface border border-border rounded-xl p-4 font-mono text-[15px]">
              <div>1 GB = 10<sup className="text-[10px]">9</sup> bytes</div>
              <div className="text-text-secondary mt-1 text-[13px]">= 1,000 × 1,000 × 1,000 bytes</div>
              <div className="text-text-secondary text-[13px]">= 1,000,000,000 bytes</div>
            </div>
          </div>
          
          <div>
            <div className="text-[10px] uppercase text-text-secondary tracking-widest mb-2 font-semibold">PROCESSOR MATH (BASE-2)</div>
            <div className="bg-surface border border-border rounded-xl p-4 font-mono text-[15px]">
              <div>1 GiB = 2<sup className="text-[10px]">30</sup> bytes</div>
              <div className="text-text-secondary mt-1 text-[13px]">= 1,024 × 1,024 × 1,024 bytes</div>
              <div className="text-text-secondary text-[13px]">= 1,073,741,824 bytes</div>
            </div>
          </div>

          <div className="pt-2">
            <div className="text-[10px] uppercase text-text-secondary tracking-widest mb-2 font-semibold">THE CONVERSION EQUATION</div>
            <div className="bg-gap/10 border border-gap/30 text-gap rounded-xl p-6 font-mono text-center flex items-center justify-center gap-4">
              <span className="text-[20px] font-bold">GiB</span>
              <span className="text-[20px]">=</span>
              <span className="inline-flex flex-col items-center">
                <span className="border-b-2 border-gap/50 px-3 pb-1.5 text-[15px]">Advertised GB × 10<sup className="text-[10px]">9</sup></span>
                <span className="pt-1.5 text-[15px]">2<sup className="text-[10px]">30</sup></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
