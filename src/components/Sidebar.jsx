// Lucide-style icons (inline SVGs)
const HardDriveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M22 12H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/></svg>
);
const MonitorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
);
const SmartphoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
);
const GamepadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/></svg>
);

export function Sidebar({ deviceProfile, setDeviceProfile }) {
  return (
    <aside className="p-6 flex flex-col gap-5 h-auto md:h-full md:overflow-y-auto no-scrollbar">
      {/* Block 1 - Logo */}
      <div>
        <svg viewBox="0 0 160 40" className="h-10 mb-2">
          {/* Y-branch icon mark */}
          <path d="M80,30 L80,15" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" />
          <path d="M80,15 L40,15" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" />
          <path d="M80,15 L120,15" stroke="#22c55e" stroke-width="2" stroke-linecap="round" />
          
          <rect x="25" y="5" width="30" height="20" rx="4" fill="#1e293b" />
          <text x="40" y="19" fill="#94a3b8" font-size="10" font-family="JetBrains Mono, monospace" text-anchor="middle" font-weight="bold">1000</text>
          
          <rect x="105" y="5" width="30" height="20" rx="4" fill="#22c55e" />
          <text x="120" y="19" fill="#0f172a" font-size="10" font-family="JetBrains Mono, monospace" text-anchor="middle" font-weight="bold">1024</text>
        </svg>
        <div className="font-mono font-[800] text-2xl leading-none flex">
          <span className="text-usable">GiB</span><span className="text-text-primary">berish</span>
        </div>
        <div className="text-[12px] text-text-secondary mt-1 tracking-wider">
          Calculate Real Space
        </div>
      </div>

      {/* Block 2 - Formula Display */}
      <div className="bg-usable/10 border border-usable/20 rounded-md py-2 px-3">
        <code className="font-mono text-[12px] text-usable">
          x GiB = (y GB × 10⁹) / 2³⁰
        </code>
      </div>

      {/* Block 3 - Device Controls */}
      <div className="flex flex-col gap-2">
        <div className="text-[10px] uppercase text-text-secondary tracking-widest mb-1">
          DEVICE CONTROLS
          <div className="text-[12px] normal-case tracking-normal text-text-muted mt-1">
            Configure hardware parameters
          </div>
        </div>
        <DeviceTab 
          active={deviceProfile === 'raw'} 
          onClick={() => setDeviceProfile('raw')}
          icon={<HardDriveIcon />}
          label="Pure Hardware"
        />
        <DeviceTab 
          active={deviceProfile === 'pc'} 
          onClick={() => setDeviceProfile('pc')}
          icon={<MonitorIcon />}
          label="PC / Mac"
        />
        <DeviceTab 
          active={deviceProfile === 'phone'} 
          onClick={() => setDeviceProfile('phone')}
          icon={<SmartphoneIcon />}
          label="Smartphone"
        />
        <DeviceTab 
          active={deviceProfile === 'console'} 
          onClick={() => setDeviceProfile('console')}
          icon={<GamepadIcon />}
          label="Gaming Console"
        />
      </div>

      {/* Block 3.5 - Storage Lore */}
      <div className="mt-4">
        <div className="text-[10px] uppercase text-text-secondary tracking-widest font-semibold mb-3">
          STORAGE LORE & SCANDALS
        </div>
        <div className="flex flex-col gap-3">
          <LoreCard 
            year="2023"
            title="The 60GB Bloatware Panic"
            desc="How Samsung dumped binary math loss into the system files category."
          />
          <LoreCard 
            year="2014"
            title="The 16GB iPhone Lawsuit"
            desc="Apple sued over iOS 8 taking up 20% of low-capacity hardware."
          />
          <LoreCard 
            year="2009"
            title="The Apple Plot Twist"
            desc="How macOS switched to native Base-10 math calculations to erase the math tax display entirely."
          />
        </div>
      </div>

      {/* Block 4 - Scroll Navigation Links */}
      <div className="h-[1px] bg-border w-full my-4"></div>
      <div className="flex flex-col gap-3">
        <ScrollLink href="#about" label="About" />
        <ScrollLink href="#storage-loss" label="Storage Loss Reality" />
      </div>

      {/* Block 5 - Bottom accent */}
      <div className="mt-auto pt-6 text-[11px] text-text-muted">
        <div>GiBberish v1.0.0</div>
        <div>Built for storage truth.</div>
      </div>
    </aside>
  );
}

function DeviceTab({ active, onClick, icon, label }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center h-11 w-full rounded-md pl-3 text-[13px] font-sans transition-colors duration-200 
      ${active ? 'bg-surface border-l-2 border-l-usable text-text-primary font-semibold' : 'bg-transparent border-l-2 border-l-transparent text-text-secondary hover:bg-surface-raised/40'}`}
    >
      {icon}
      {label}
    </button>
  );
}

function LoreCard({ year, title, desc }) {
  return (
    <div className="bg-canvas border border-border rounded-lg p-3 hover:border-usable transition-colors group">
      <div className="text-[10px] text-usable font-mono font-bold mb-1">{year}</div>
      <div className="text-[13px] font-bold text-text-primary mb-1.5">{title}</div>
      <div className="text-sm text-slate-300 leading-relaxed group-hover:text-text-primary transition-colors">{desc}</div>
    </div>
  );
}

function ScrollLink({ href, label }) {
  return (
    <a 
      href={href}
      className="text-[13px] text-text-secondary no-underline pl-2 hover:text-text-primary transition-colors flex items-center group relative"
      onClick={(e) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <span className="absolute left-0 w-[2px] h-full bg-usable opacity-0 group-hover:opacity-100 transition-opacity"></span>
      <span className="ml-2 group-hover:translate-x-1 transition-transform">→ {label}</span>
    </a>
  );
}
