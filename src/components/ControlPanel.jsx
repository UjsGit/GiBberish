import { sliderToUnit, unitToSlider, UNIT_BOUNDS } from '../calculate';
import { useState } from 'preact/hooks';
import { MathModal } from './MathModal';

export function ControlPanel({
  deviceProfile,
  advertisedValue,
  setAdvertisedValue,
  unit,
  setUnit,
  osMode,
  setOsMode,
  customOsGB,
  setCustomOsGB
}) {
  const isCustom = osMode === 'custom';
  const showOsConfig = deviceProfile !== 'pc' && deviceProfile !== 'raw';
  const [isInvalid, setIsInvalid] = useState(false);
  const [showMathModal, setShowMathModal] = useState(false);

  const bounds = UNIT_BOUNDS[unit] || UNIT_BOUNDS.GB;

  const handleSliderChange = (e) => {
    const sVal = parseFloat(e.target.value);
    const unitVal = sliderToUnit(sVal, bounds.min, bounds.max);
    const displayVal = (unit === 'TB' || unit === 'PB') ? Number(unitVal.toFixed(2)) : Math.round(unitVal);
    setAdvertisedValue(displayVal);
  };

  const handleInputChange = (e) => {
    let val = parseFloat(e.target.value);
    if (val < 0) {
      setIsInvalid(true);
      setTimeout(() => setIsInvalid(false), 80); // shake duration
      return;
    }
    setAdvertisedValue(isNaN(val) ? 0 : val);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const sliderPos = unitToSlider(advertisedValue > 0 ? advertisedValue : bounds.min, bounds.min, bounds.max);

  return (
    <section className="p-8 flex flex-col gap-8 h-auto md:h-full md:overflow-y-auto no-scrollbar relative w-full">
      <div className="text-[11px] uppercase text-text-secondary tracking-[0.12em] font-semibold">
        INPUT PARAMETERS
      </div>

      {/* INPUT BLOCK 1 - OS CONFIGURATION */}
      <div className="flex flex-col gap-3 w-full">
        <div className="text-[10px] uppercase text-text-secondary tracking-[0.1em]">
          OS CONFIGURATION
        </div>

        {!showOsConfig ? (
          <div className="bg-canvas border border-border rounded-[10px] p-3 flex gap-2 items-start">
            <span className="text-text-secondary mt-[2px]">ℹ</span>
            <span className="text-[12px] text-text-muted italic leading-snug">
              {deviceProfile === 'pc'
                ? "OS installs on its own partition — no deduction applied for PC / Mac."
                : "Just the decimal vs. binary math tax—perfect for SD cards, USB flash drives, and external SSDs."}
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setOsMode('standard')}
              className={`w-full text-left rounded-[12px] p-4 border transition-all duration-200 flex justify-between items-center ${!isCustom
                ? 'border-usable bg-usable/5'
                : 'border-border bg-canvas'
                }`}
            >
              <div>
                <div className={`text-[14px] font-[600] mb-1 ${!isCustom ? 'text-usable' : 'text-text-primary'}`}>
                  Standard OS
                </div>
                <div className="text-[12px] text-text-secondary">
                  Factory default OS footprint (approx. 13–15 GB)
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${!isCustom ? 'border-usable' : 'border-text-secondary'}`}>
                {!isCustom && <div className="w-2.5 h-2.5 bg-usable rounded-full"></div>}
              </div>
            </button>

            <button
              onClick={() => setOsMode('custom')}
              className={`w-full text-left rounded-[12px] p-4 border transition-all duration-200 flex justify-between items-center ${isCustom
                ? 'border-usable bg-usable/5'
                : 'border-border bg-canvas'
                }`}
            >
              <div>
                <div className={`text-[14px] font-[600] mb-1 ${isCustom ? 'text-usable' : 'text-text-primary'}`}>
                  Custom OS
                </div>
                <div className="text-[12px] text-text-secondary">
                  Custom ROM or debloated OS
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isCustom ? 'border-usable' : 'border-text-secondary'}`}>
                {isCustom && <div className="w-2.5 h-2.5 bg-usable rounded-full"></div>}
              </div>
            </button>

            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isCustom ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
              <label className="text-[12px] text-text-secondary mb-1 block">Custom Deduction (GB)</label>
              <input
                type="number"
                min="0"
                max="200"
                value={customOsGB}
                onInput={(e) => setCustomOsGB(parseFloat(e.target.value) || 0)}
                className="w-full bg-canvas border border-border rounded-lg p-3 font-mono text-[16px] text-text-primary focus:outline-none focus:border-usable"
              />
            </div>
          </div>
        )}
      </div>

      {/* INPUT BLOCK 2 - ADVERTISED CAPACITY */}
      <div className="flex flex-col gap-2">
        <div className="text-[10px] uppercase text-text-secondary tracking-widest">
          ADVERTISED CAPACITY
        </div>
        <div className="flex gap-2 h-12 w-full">
          <input
            type="number"
            min="0"
            step={unit === 'TB' ? '0.01' : '1'}
            value={advertisedValue}
            onInput={handleInputChange}
            className={`flex-1 bg-canvas border rounded-lg px-4 font-mono text-[16px] text-text-primary focus:outline-none focus:border-usable focus:border-2 transition-colors ${isInvalid ? 'border-os border-2 animate-shake' : 'border-border'}`}
          />
          <div className="relative">
            <select
              value={unit}
              onChange={handleUnitChange}
              className="h-full appearance-none bg-canvas border border-border rounded-lg pl-3 pr-8 font-sans text-[14px] text-text-primary focus:outline-none focus:border-usable cursor-pointer"
            >
              <option value="MB">MB</option>
              <option value="GB">GB</option>
              <option value="TB">TB</option>
              <option value="PB">PB</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* INPUT BLOCK 3 - QUICK SELECT SLIDER */}
      <div className="flex flex-col gap-3">
        <div className="text-[10px] uppercase text-text-secondary tracking-widest">
          QUICK SELECT
        </div>
        <div className="relative pt-2 pb-6 w-full">
          <input
            type="range"
            role="slider"
            aria-valuemin={bounds.min}
            aria-valuemax={bounds.max}
            aria-valuenow={advertisedValue}
            aria-valuetext={`${advertisedValue} ${unit}`}
            min="0"
            max="1000"
            value={Math.max(0, Math.min(1000, sliderPos))}
            onInput={handleSliderChange}
            className="w-full appearance-none h-1 bg-surface-raised rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-usable focus-visible:ring-offset-2 focus-visible:ring-offset-surface relative z-10"
            style={{
              background: `linear-gradient(to right, var(--color-usable) ${Math.max(0, Math.min(1000, sliderPos)) / 10}%, var(--color-surface-raised) ${Math.max(0, Math.min(1000, sliderPos)) / 10}%)`
            }}
          />
          <style dangerouslySetInnerHTML={{
            __html: `
            input[type=range]::-webkit-slider-thumb {
              -webkit-appearance: none;
              height: 18px;
              width: 18px;
              border-radius: 50%;
              background: #ffffff;
              cursor: pointer;
              box-shadow: 0 0 10px rgba(34,197,94,0.6);
            }
            input[type=range]::-moz-range-thumb {
              height: 18px;
              width: 18px;
              border-radius: 50%;
              background: #ffffff;
              cursor: pointer;
              border: none;
              box-shadow: 0 0 10px rgba(34,197,94,0.6);
            }
          `}} />
          <div className="absolute top-6 left-0 right-0 flex justify-between text-[11px] text-text-muted pointer-events-none px-1">
            <span>{bounds.min}{unit}</span>
            <span>{unit === 'GB' ? '256GB' : unit === 'MB' ? '512MB' : '10' + unit}</span>
            <span>{bounds.max}{unit}</span>
          </div>
        </div>
      </div>

      {/* INPUT BLOCK 4 - WHY LINK */}
      <button
        className="text-[12px] text-gap border border-gap/50 px-3 py-1.5 rounded-[6px] hover:bg-gap/10 flex items-center gap-2 mt-3 w-max transition-all"
        onClick={() => setShowMathModal(true)}
      >
        ❓ Why this discrepancy?
      </button>

      {/* INPUT BLOCK 5 - SYSTEM DEDUCTION NOTE */}
      {showOsConfig && (
        <div className="bg-canvas border border-border rounded-lg p-3 flex gap-3 items-start mt-2">
          <span className="text-gap mt-[2px] leading-none text-base">⚠</span>
          <span className="text-[12px] text-text-secondary italic leading-snug">
            {deviceProfile === 'phone'
              ? "System deduction is an estimate. Actual overhead varies by OEM, OS version, and pre-installed apps."
              : "Based on PS5/Xbox Series observed partitions. ~100 GB reserved by system firmware."}
          </span>
        </div>
      )}

      {showMathModal && <MathModal onClose={() => setShowMathModal(false)} />}
    </section>
  );
}
