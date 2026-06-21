import { useState } from 'preact/hooks';
import { formatPayloadCount } from '../calculate';

export function OutputPanel({ result, vizMode, setVizMode, deviceProfile, advertisedValue, unit }) {
  if (!result || advertisedValue === 0) {
    return (
      <section className="bg-canvas p-7 flex items-center justify-center h-full overflow-y-auto">
        <p className="text-text-muted font-medium text-lg">Enter a capacity to see the analysis.</p>
      </section>
    );
  }

  const {
    realSpace,
    osDeduction,
    mathGap,
    usableSpace,
    base2Unit,
    displayValue,
    displayUnit,
    bars,
    payloads
  } = result;

  const showOs = deviceProfile !== 'pc' && deviceProfile !== 'raw';

  return (
    <section className="p-7 flex flex-col gap-7 h-auto md:h-full md:overflow-y-auto no-scrollbar w-full">
      
      {/* OUTPUT BLOCK 0 - VISUALIZATION TOGGLE */}
      <div className="flex justify-end">
        <div className="bg-canvas flex rounded-md border border-border p-1">
          <button 
            className={`p-2 rounded-[4px] transition-all duration-200 ${vizMode === 'bar' ? 'bg-surface-raised text-text-primary shadow-sm' : 'bg-transparent text-text-muted hover:text-text-secondary'}`}
            onClick={() => setVizMode('bar')}
            title="Linear/Bar View"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 3v18h18"/>
              <path d="M7 16h8"/>
              <path d="M7 11h12"/>
              <path d="M7 6h4"/>
            </svg>
          </button>
          <button 
            className={`p-2 rounded-[4px] transition-all duration-200 ${vizMode === 'circle' ? 'bg-surface-raised text-text-primary shadow-sm' : 'bg-transparent text-text-muted hover:text-text-secondary'}`}
            onClick={() => setVizMode('circle')}
            title="Radial/Circle View"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
              <path d="M22 12A10 10 0 0 0 12 2v10z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* OUTPUT BLOCK 1 - PRIMARY VISUALIZATION */}
      <div className="flex justify-center items-center relative min-h-[300px] transition-opacity duration-250 w-full">
        {vizMode === 'circle' ? (
          <CircularDonut 
            bars={bars} 
            displayValue={displayValue} 
            displayUnit={displayUnit} 
            realSpace={realSpace}
            usableSpace={usableSpace}
            mathGap={mathGap}
            osDeduction={osDeduction}
            base2Unit={base2Unit}
            showOs={showOs}
          />
        ) : (
          <StackedBar 
            bars={bars} 
            displayValue={displayValue} 
            displayUnit={displayUnit} 
            realSpace={realSpace}
            usableSpace={usableSpace}
            mathGap={mathGap}
            osDeduction={osDeduction}
            base2Unit={base2Unit}
            showOs={showOs}
          />
        )}
      </div>

      {/* OUTPUT BLOCK 2 - STAT CARDS ROW */}
      <div className={`grid grid-cols-1 ${showOs ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-3.5`}>
        <StatCard 
          value={realSpace} 
          unit={base2Unit}
          label="RAW BINARY" 
          caption={`Advertised ${unit} to Base-2`} 
          borderColor="border-usable"
        />
        <StatCard 
          value={mathGap} 
          unit={base2Unit}
          label="MARKETING LOSS" 
          caption="The decimal vs binary gap" 
          borderColor="border-gap"
        />
        {showOs && (
          <StatCard 
            value={`−${osDeduction}`} 
            unit={base2Unit}
            label="OS OVERHEAD" 
            caption={deviceProfile === 'phone' ? "Est. Android/iOS base image" : "PS5/Xbox system reserve"} 
            borderColor="border-os"
          />
        )}
      </div>

      {/* PS5 Special Callout */}
      {(deviceProfile === 'console' && advertisedValue <= 500 && unit === 'GB') && (
        <div className="bg-[#f59e0b1a] border border-gap rounded-lg p-3.5 mt-1 text-[13px] text-gap">
          ⚠️ <strong>PS5 owners:</strong> After system overhead, your 825 GB SSD yields approximately 667 GiB — not what the box suggests.
        </div>
      )}

      {/* OUTPUT BLOCK 3 - PAYLOAD ESTIMATION */}
      <div className="mt-2">
        <h3 className="text-[16px] font-[600] text-text-primary mb-4">
          What fits in {displayValue} {displayUnit}?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {deviceProfile === 'phone' ? (
            <PayloadCell icon="📱" label="APPS" count={payloads.app} size="~100MB ea" />
          ) : deviceProfile === 'raw' ? (
            <PayloadCell icon="🎥" label="4K VIDEO" count={payloads.video_4k} size="~300MB/min" />
          ) : (
            <PayloadCell icon="🎮" label="GAMES" count={payloads.aaa_game} size="~100GB ea" />
          )}
          <PayloadCell icon="🎬" label="HD MOVIES" count={payloads.hd_movie} size="~5GB ea" />
          <PayloadCell icon="📷" label="PHOTOS" count={payloads.photo} size="~5MB ea" />
        </div>
      </div>
    </section>
  );
}

// Subcomponents

function CircularDonut({ bars, displayValue, displayUnit, realSpace, usableSpace, mathGap, osDeduction, base2Unit, showOs }) {
  const [hovered, setHovered] = useState(null);

  // Math for SVG Arcs. Total 340 deg (-170 to +170)
  // Top is -90 deg. So start is -90 - 170 = -260? No, let's just make 0 deg at top.
  // We want gap at top. Gap is 20 deg (10 each side).
  // Arc starts at -170 deg, ends at +170 deg.
  // Standard SVG 0 is right (3 o'clock). Top is -90.
  // So start angle = -90 + 10 = -80 deg. End angle = -90 + 350 = 270 deg. Wait. 
  // Gap at top: start at 10 deg past top (-80), go clockwise to -10 deg past top (260).
  const startAngle = -90; 
  const totalAngle = 359.99;

  const center = 140;
  const radius = 115;

  const getCoordinatesForAngle = (angle) => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(radians),
      y: center + radius * Math.sin(radians)
    };
  };

  const getArcPath = (start, end) => {
    const startCoord = getCoordinatesForAngle(start);
    const endCoord = getCoordinatesForAngle(end);
    const largeArc = end - start > 180 ? 1 : 0;
    return `M ${startCoord.x} ${startCoord.y} A ${radius} ${radius} 0 ${largeArc} 1 ${endCoord.x} ${endCoord.y}`;
  };

  const greenEnd = startAngle + (bars.usable / 100) * totalAngle;
  const amberEnd = greenEnd + (bars.gap / 100) * totalAngle;
  const redEnd = amberEnd + (bars.os / 100) * totalAngle;

  const greenPath = getArcPath(startAngle, greenEnd);
  const amberPath = getArcPath(greenEnd, amberEnd);
  const redPath = showOs ? getArcPath(amberEnd, redEnd) : '';
  const bgPath = getArcPath(startAngle, startAngle + totalAngle);

  // Dynamic center text
  let centerVal = displayValue;
  let centerUnit = displayUnit;
  let centerLabel = "ACTUAL USABLE SPACE";

  if (hovered === 'usable') {
    centerVal = usableSpace; centerUnit = base2Unit; centerLabel = "YOU KEEP";
  } else if (hovered === 'gap') {
    centerVal = mathGap; centerUnit = base2Unit; centerLabel = "MATH TAX";
  } else if (hovered === 'os') {
    centerVal = osDeduction; centerUnit = base2Unit; centerLabel = "OS OVERHEAD";
  }

  return (
    <div className="flex flex-col md:flex-row w-full items-center justify-center gap-10">
      <div className="relative w-[280px] h-[280px] flex-shrink-0">
        <svg viewBox="0 0 280 280" className="w-full h-full" onMouseLeave={() => setHovered(null)}>
          {/* Background Track */}
          <path d={bgPath} fill="none" stroke="#1e293b" stroke-width="22" stroke-linecap="round" />
          
          {/* Green Arc */}
          <path 
            d={greenPath} 
            fill="none" 
            stroke="#22c55e" 
            stroke-width="22" 
            stroke-linecap="round" 
            className="transition-all duration-300 ease-out cursor-pointer"
            style={{ filter: hovered === 'usable' ? 'brightness(1.15)' : 'none', pointerEvents: 'stroke' }}
            onMouseEnter={() => setHovered('usable')}
          />
          <title>Binary bytes your OS can address.</title>

          {/* Amber Arc */}
          <path 
            d={amberPath} 
            fill="none" 
            stroke="#f59e0b" 
            stroke-width="22" 
            stroke-linecap="round" 
            className="transition-all duration-300 ease-out cursor-pointer"
            style={{ filter: hovered === 'gap' ? 'brightness(1.15)' : 'none', pointerEvents: 'stroke' }}
            onMouseEnter={() => setHovered('gap')}
          />
          <title>Lost in the decimal-to-binary conversion.</title>

          {/* Red Arc */}
          {showOs && (
            <path 
              d={redPath} 
              fill="none" 
              stroke="#ef4444" 
              stroke-width="22" 
              stroke-linecap="round" 
              className="transition-all duration-300 ease-out cursor-pointer"
              style={{ filter: hovered === 'os' ? 'brightness(1.15)' : 'none', pointerEvents: 'stroke' }}
              onMouseEnter={() => setHovered('os')}
            />
          )}
        </svg>

        {/* Center Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-250">
          <div className="text-[9px] uppercase text-text-secondary tracking-widest">{centerLabel}</div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-mono text-[2.2rem] font-[800] text-usable leading-none" style={{ color: hovered === 'gap' ? '#f59e0b' : hovered === 'os' ? '#ef4444' : '#22c55e' }}>
              {centerVal}
            </span>
            <span className="font-mono text-[14px] font-bold text-usable opacity-70" style={{ color: hovered === 'gap' ? '#f59e0b' : hovered === 'os' ? '#ef4444' : '#22c55e' }}>
              {centerUnit}
            </span>
          </div>
          {!hovered && <div className="text-[10px] text-text-muted mt-1">from {realSpace} {base2Unit} raw</div>}
        </div>
      </div>

      {/* Stats Chips */}
      <div className="flex flex-col gap-3">
        <StatChip color="bg-usable" textColor="text-usable" label="YOU KEEP" value={usableSpace} unit={base2Unit} />
        <StatChip color="bg-gap" textColor="text-gap" label="MATH TAX" value={mathGap} unit={base2Unit} />
        {showOs && <StatChip color="bg-os" textColor="text-os" label="OS OVERHEAD" value={osDeduction} unit={base2Unit} />}
      </div>
    </div>
  );
}

function StatChip({ color, textColor, label, value, unit }) {
  return (
    <div className="bg-surface rounded-[10px] py-3 px-4 flex flex-col gap-1 w-44">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${color}`}></div>
        <div className="text-[10px] text-text-secondary uppercase">{label}</div>
      </div>
      <div className={`font-mono text-[16px] font-bold ml-4 ${textColor}`}>
        {value} {unit}
      </div>
    </div>
  );
}

function StackedBar({ bars, displayValue, displayUnit, realSpace, usableSpace, mathGap, osDeduction, base2Unit, showOs }) {
  return (
    <div className="w-full flex flex-col justify-center">
      <div className="text-[10px] uppercase text-text-secondary mb-2">CAPACITY BREAKDOWN</div>
      <div className="h-[52px] w-full flex rounded-bar overflow-hidden mb-4">
        <div 
          className="bg-usable transition-all duration-600 ease-out hover:brightness-115 cursor-pointer" 
          style={{ flexGrow: bars.usable || 0.001 }}
          title="Binary bytes your OS can address."
        ></div>
        <div 
          className="bg-gap transition-all duration-600 ease-out hover:brightness-115 cursor-pointer" 
          style={{ flexGrow: bars.gap || 0.001 }}
          title="Lost in the decimal-to-binary conversion."
        ></div>
        {showOs && (
          <div 
            className="bg-os transition-all duration-600 ease-out hover:brightness-115 cursor-pointer" 
            style={{ flexGrow: bars.os || 0.001 }}
            title="Reserved by the OS — not yours."
          ></div>
        )}
      </div>

      <div className="relative">
        <div className="flex items-baseline gap-2 relative z-10">
          <span className="font-mono text-usable font-[800]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            {displayValue} <span className="text-[2rem] opacity-70">{displayUnit}</span>
          </span>
        </div>
        <div className="text-[13px] text-text-muted mt-1 relative z-10">
          from {realSpace} {base2Unit} raw binary capacity
        </div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-48 bg-glow rounded-full blur-[40px] z-0 pointer-events-none"></div>
      </div>

      <div className="flex flex-wrap gap-4 mt-6">
        <LegendChip color="bg-usable" label="You Keep" value={usableSpace} unit={base2Unit} />
        <LegendChip color="bg-gap" label="Math Tax" value={mathGap} unit={base2Unit} />
        {showOs && <LegendChip color="bg-os" label="OS Overhead" value={osDeduction} unit={base2Unit} />}
      </div>
    </div>
  );
}

function LegendChip({ color, label, value, unit }) {
  return (
    <div className="flex items-center gap-1.5 text-[11px]">
      <div className={`w-2.5 h-2.5 ${color}`}></div>
      <span className="text-text-secondary">{label}</span>
      <span className="text-text-primary font-bold">{value} {unit}</span>
    </div>
  );
}

function StatCard({ value, unit, label, caption, borderColor }) {
  return (
    <div className={`bg-surface rounded-[10px] p-4 border-t-4 ${borderColor}`}>
      <div className="font-mono text-[20px] text-text-primary mb-1">{value} <span className="text-[12px] text-text-secondary">{unit}</span></div>
      <div className="text-[10px] text-text-secondary uppercase tracking-wider mb-0.5">{label}</div>
      <div className="text-[11px] text-text-muted">{caption}</div>
    </div>
  );
}

function PayloadCell({ icon, label, count, size }) {
  const isZero = count < 1;
  return (
    <div className="bg-surface rounded-[10px] p-[18px] flex flex-col items-center text-center transition-colors duration-200 hover:border hover:border-usable/30 hover:bg-usable/5 border border-transparent">
      <div className="w-[44px] h-[44px] rounded-full bg-white/5 border border-border flex items-center justify-center text-[22px] mb-3">
        {icon}
      </div>
      <div className={`font-mono text-[24px] font-[700] leading-none mb-2 ${isZero ? 'text-text-muted' : 'text-text-primary'}`}>
        {isZero ? '< 1' : formatPayloadCount(count)}
      </div>
      <div className="text-[11px] text-text-secondary uppercase tracking-wide">{label}</div>
      <div className="text-[11px] text-text-muted mt-0.5">({size})</div>
    </div>
  );
}
