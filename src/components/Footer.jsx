export function Footer() {
  return (
    <footer className="bg-sidebar border-t border-border p-8 w-full flex flex-col md:flex-row gap-6 justify-between items-center">
      
      {/* Left */}
      <div className="flex flex-col items-center md:items-start">
        <div className="font-mono font-[700] text-[16px] flex">
          <span className="text-usable">GiB</span>
          <span className="text-text-primary">berish</span>
        </div>
        <div className="text-[12px] text-text-secondary mt-1">
          Storage truth, open-sourced.
        </div>
      </div>

      {/* Right */}
      <div className="text-[12px] text-text-secondary text-center md:text-right">
        Built with 0 trackers · 0 cookies · 100% math
      </div>
      
    </footer>
  );
}
