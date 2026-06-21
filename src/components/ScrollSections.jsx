import { useState } from 'preact/hooks';
import { CONSTANTS } from '../calculate';

export function ScrollSections({ advertisedValue, unit, result }) {
  const [convValue, setConvValue] = useState(1);
  const [convUnitIn, setConvUnitIn] = useState('TB');
  const [convUnitOut, setConvUnitOut] = useState('GiB');

  const getBytes = (val, u) => val * (CONSTANTS.BASE10[u] || CONSTANTS.BASE2[u] || 1);
  const outVal = getBytes(convValue, convUnitIn) / (CONSTANTS.BASE10[convUnitOut] || CONSTANTS.BASE2[convUnitOut] || 1);
  const convResult = outVal < 10 ? outVal.toFixed(3) : outVal.toFixed(2);

  // Discrepancy Showdown calculations
  const rawBytes = advertisedValue * (CONSTANTS.BASE10[unit] || 1e9);
  const advertisedString = advertisedValue.toLocaleString();
  const rawBytesString = rawBytes.toLocaleString();
  const realSpace = result ? result.realSpace : "0.00";
  const base2Unit = result ? result.base2Unit : "GiB";

  return (
    <div className="flex flex-col w-full text-text-primary">
      
      {/* SECTION: #how-to-use */}
      <section id="how-to-use" className="bg-canvas border-t border-border py-20 px-8 w-full">
        <div className="max-w-[900px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between mb-6">
            <div className="flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-usable"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <h2 className="text-[28px] font-[700] text-text-primary m-0">How to Use & What This Means</h2>
            </div>
            <a 
              href="#quick-converter"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('quick-converter').scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[13px] font-semibold text-usable bg-usable/10 hover:bg-usable/20 transition-colors px-4 py-2 rounded-full no-underline flex items-center gap-2 w-max"
            >
              Skip to Quick Converter ↓
            </a>
          </div>
          
          <div className="text-[16px] text-text-secondary leading-relaxed mb-10 max-w-2xl">
            In short: We calculate the exact difference between "the number on the retail box" vs. "what you actually get to store your photos and games on."
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="text-[18px] font-[600] text-usable mb-3">Standard Mode</h3>
              <p className="text-[14px] text-text-secondary leading-relaxed">
                Selecting preset profiles (like PC/Mac or Smartphone) automatically deducts a standard "Out-of-the-Box System Tax." This accounts for the typical space swallowed up by default operating systems like Windows or iOS before you even install a single app or game.
              </p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="text-[18px] font-[600] text-usable mb-3">Custom Deduction</h3>
              <p className="text-[14px] text-text-secondary leading-relaxed">
                Toggle this to play detective! Open your real phone or computer's "Storage Settings", look at the exact number of GBs swallowed by "System Files" or "OS Data", and type that exact number into our dashboard to see your true remaining space.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: #why-discrepancy */}
      <section id="why-discrepancy" className="bg-canvas border-t border-border py-20 px-8 w-full">
        <div className="max-w-[900px] mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-[28px] font-[700] text-text-primary m-0">The Discrepancy Showdown</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Column */}
            <div className="flex flex-col gap-4">
              <div className="text-[10px] uppercase text-text-secondary tracking-widest">
                DECIMAL / BASE-10
              </div>
              <div>
                <h3 className="text-[18px] font-[600] m-0">🏭 Manufacturer Math</h3>
                <div className="text-[13px] text-text-secondary mt-1">Humans and marketing count in tens.</div>
              </div>
              <div className="bg-gap/10 border border-gap/20 rounded-[10px] p-4 font-mono text-[14px] text-gap">
                1 GB = 10⁹ bytes<br/>
                = 1,000,000,000 bytes
              </div>
              <div>
                <div className="text-[10px] uppercase text-text-secondary tracking-wider mb-2">ADVERTISED CONVERSION</div>
                <div className="text-[15px] leading-relaxed">
                  Advertised: {advertisedString} × 10^{unit === 'MB' ? '6' : unit === 'GB' ? '9' : unit === 'TB' ? '12' : '15'}<br/>
                  = <span className="text-gap font-[600]">{rawBytesString}</span> bytes manufactured
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4">
              <div className="text-[10px] uppercase text-text-secondary tracking-widest">
                BINARY / BASE-2
              </div>
              <div>
                <h3 className="text-[18px] font-[600] m-0">💻 Computer Math</h3>
                <div className="text-[13px] text-text-secondary mt-1">Transistors use powers of 2.</div>
              </div>
              <div className="bg-usable/10 border border-usable/20 rounded-[10px] p-4 font-mono text-[14px] text-usable">
                1 {base2Unit} = 2^{unit === 'MB' ? '20' : unit === 'GB' ? '30' : unit === 'TB' ? '40' : '50'} bytes<br/>
                = {(CONSTANTS.BASE2[base2Unit] || 1073741824).toLocaleString()} bytes
              </div>
              <div>
                <div className="text-[10px] uppercase text-text-secondary tracking-wider mb-2">DISCREPANCY DIVISION</div>
                <div className="text-[15px] leading-relaxed">
                  ({rawBytesString} / {(CONSTANTS.BASE2[base2Unit] || 1073741824).toLocaleString()})<br/>
                  ≈ <span className="text-[24px] font-mono text-usable font-[700] leading-none inline-block mt-1">{realSpace} {base2Unit}</span> raw capacity
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gap/5 border border-gap rounded-[10px] p-4 text-[14px] text-gap">
            🟡 On a 4 TB NAS drive, this gap alone costs you ≈ 363 GiB before the OS claims a single byte. That's roughly 72 HD movies you were promised and never received.
          </div>
        </div>
      </section>

      {/* SECTION: #about */}
      <section id="about" className="bg-surface border-t border-border py-20 px-8 w-full">
        <div className="max-w-[760px] mx-auto">
          <div className="text-[11px] uppercase text-text-secondary tracking-[0.15em] mb-4">ABOUT</div>
          <h2 className="text-[32px] font-[700] text-text-primary leading-[1.2] m-0">
            Why GiBberish exists.
          </h2>
          <div className="w-[48px] h-[2px] bg-usable mt-4 mb-8"></div>
          
          <div className="text-[16px] text-text-secondary leading-[1.75] space-y-6">
            <p className="m-0">
              Every time you buy a hard drive, SSD, or smartphone, the box says one thing. Your computer says another. The number is always smaller — and nobody explains why. That silence is where GiBberish comes in.
            </p>
            <p className="m-0">
              Storage manufacturers count in multiples of 1,000 (decimal). Your operating system counts in multiples of 1,024 (binary). A 1 TB drive holds exactly 1,000,000,000,000 bytes. Your OS, however, divides that by 1,073,741,824 — and reports back 931 GiB. The remaining ~69 GiB didn't vanish. They were never there to begin with. GiBberish makes that visible.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-8">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[28px] text-usable font-bold">~7.37%</span>
              <span className="text-[13px] text-text-muted">gap per GB</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[28px] text-gap font-bold">~9.95%</span>
              <span className="text-[13px] text-text-muted">gap per TB</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[28px] text-text-primary font-bold">1998</span>
              <span className="text-[13px] text-text-muted">year IEC named GiB</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: #storage-loss */}
      <section id="storage-loss" className="bg-canvas border-t border-border py-20 px-8 w-full">
        <div className="max-w-[900px] mx-auto">
          <div className="text-[11px] uppercase text-text-secondary mb-2">STORAGE LOSS REALITY</div>
          <h2 className="text-[32px] font-[700] text-text-primary m-0 mb-10">What you lose before you begin.</h2>

          <div className="flex flex-col">
            <StorageLossRow 
              num="01" 
              title="Decimal Marketing Gap" 
              body="Manufacturers use 1 GB = 10⁹ bytes. Your OS uses 1 GiB = 2³⁰ bytes. On a 1 TB drive, this gap alone eats ≈ 68.7 GiB."
              badgeText="−68.7 GiB"
              badgeColor="text-gap"
              badgeBg="bg-gap/10"
            />
            <StorageLossRow 
              num="02" 
              title="OS Partition Reserve" 
              body="Your operating system reserves space for its own installation, recovery partitions, and firmware. Smartphone: ~14 GiB. Gaming Console: ~93 GiB. PC: separate partition."
              badgeText="−14 to −93 GiB"
              badgeColor="text-os"
              badgeBg="bg-os/10"
            />
            <StorageLossRow 
              num="03" 
              title="File System Overhead" 
              body="NTFS, APFS, and ext4 reserve small amounts for file allocation tables, journaling, and metadata. Typically 1–5% of capacity."
              badgeText="−1 to −5%"
              badgeColor="text-text-secondary"
              badgeBg="bg-text-secondary/10"
              note="Not modeled in GiBberish — shown for completeness."
            />
            <StorageLossRow 
              num="04" 
              title={<span className="text-usable">The Honest Number</span>} 
              body="What remains after the decimal gap and OS overhead is your actual working canvas. GiBberish shows you this number — the one manufacturers never put on the box."
              badgeText="What GiBberish shows"
              badgeColor="text-usable"
              badgeBg="bg-usable/10"
              isLast
            />
          </div>
        </div>
      </section>

      {/* SECTION: Quick Converter */}
      <section id="quick-converter" className="bg-canvas py-16 px-8 w-full border-t border-border flex justify-center">
        <div className="max-w-[700px] w-full flex flex-col">
          <h3 className="text-[18px] font-[600] text-text-primary mb-6">Quick Converter</h3>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex w-full sm:w-auto bg-surface border border-border rounded-lg overflow-hidden flex-1 shadow-sm transition-colors focus-within:border-usable focus-within:ring-1 focus-within:ring-usable">
              <input 
                type="number" 
                value={convValue} 
                onInput={(e) => setConvValue(e.target.value)}
                className="w-full bg-transparent text-[16px] font-mono p-4 outline-none text-text-primary"
              />
              <select 
                value={convUnitIn}
                onChange={(e) => setConvUnitIn(e.target.value)}
                className="bg-surface-raised border-l border-border px-4 font-bold text-text-secondary outline-none cursor-pointer"
              >
                <option value="MB">MB</option>
                <option value="GB">GB</option>
                <option value="TB">TB</option>
                <option value="PB">PB</option>
                <option value="MiB">MiB</option>
                <option value="GiB">GiB</option>
                <option value="TiB">TiB</option>
                <option value="PiB">PiB</option>
              </select>
            </div>

            <div className="text-text-muted text-[24px] font-mono shrink-0">
              =
            </div>

            <div className="flex w-full sm:w-auto bg-surface-raised border border-border rounded-lg overflow-hidden flex-1 shadow-sm">
              <div className="w-full bg-transparent text-[16px] font-mono p-4 outline-none text-usable truncate flex items-center">
                {convResult}
              </div>
              <select 
                value={convUnitOut}
                onChange={(e) => setConvUnitOut(e.target.value)}
                className="bg-canvas border-l border-border px-4 font-bold text-text-secondary outline-none cursor-pointer"
              >
                <option value="MB">MB</option>
                <option value="GB">GB</option>
                <option value="TB">TB</option>
                <option value="PB">PB</option>
                <option value="MiB">MiB</option>
                <option value="GiB">GiB</option>
                <option value="TiB">TiB</option>
                <option value="PiB">PiB</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}

function StorageLossRow({ num, title, body, badgeText, badgeColor, badgeBg, note, isLast }) {
  return (
    <div className={`flex flex-col md:flex-row gap-6 py-8 ${!isLast ? 'border-b border-border' : ''}`}>
      <div className="w-[60px] font-mono text-[28px] font-[800] text-usable leading-none shrink-0">
        {num}
      </div>
      <div className="flex-1 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-start">
        <div className="max-w-[500px]">
          <h4 className="text-[16px] font-[600] m-0 mb-2 text-text-primary">{title}</h4>
          <p className="text-[14px] text-text-secondary m-0 leading-relaxed">{body}</p>
          {note && <div className="text-[11px] text-text-muted italic mt-2">{note}</div>}
        </div>
        <div className={`whitespace-nowrap px-3 py-1.5 rounded-pill font-mono text-[14px] font-medium ${badgeColor} ${badgeBg}`}>
          {badgeText}
        </div>
      </div>
    </div>
  );
}
