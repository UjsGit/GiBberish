import { useState, useMemo, useEffect } from 'preact/hooks';
import { Sidebar } from './components/Sidebar';
import { ControlPanel } from './components/ControlPanel';
import { OutputPanel } from './components/OutputPanel';
import { ScrollSections } from './components/ScrollSections';
import { Footer } from './components/Footer';
import { calculateStorage } from './calculate';

const PROFILE_DEFAULTS = {
  raw:     { value: 128, unit: 'GB' },
  pc:      { value: 512, unit: 'GB' },
  phone:   { value: 128, unit: 'GB' },
  console: { value: 1,   unit: 'TB' },
};

export function App() {
  const [deviceProfile, setDeviceProfile] = useState('raw');
  const [advertisedValue, setAdvertisedValue] = useState(128);
  const [unit, setUnit] = useState('GB');
  const [vizMode, setVizMode] = useState('bar');
  const [osMode, setOsMode] = useState('standard');
  const [customOsGB, setCustomOsGB] = useState(6);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const r = calculateStorage(
      advertisedValue, 
      unit, 
      deviceProfile,
      osMode === 'custom', 
      customOsGB
    );
    setResult(r);
  }, [advertisedValue, unit, deviceProfile, osMode, customOsGB]);

  const handleDeviceProfileChange = (profile) => {
    setDeviceProfile(profile);
    setOsMode('standard');
    setAdvertisedValue(PROFILE_DEFAULTS[profile].value);
    setUnit(PROFILE_DEFAULTS[profile].unit);
  };

  return (
    <div className="flex flex-col min-h-[100dvh] w-full bg-canvas text-text-primary">
      {/* ZONE 1 - Main Application Panel */}
      <div id="top" className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-7xl mx-auto min-h-[100dvh] md:h-[100dvh] py-6 px-4 md:px-8 overflow-x-hidden md:overflow-hidden">
        <div className="col-span-3 h-auto md:h-full md:overflow-hidden rounded-[20px] border border-border shadow-2xl bg-sidebar">
          <Sidebar 
            deviceProfile={deviceProfile} 
            setDeviceProfile={handleDeviceProfileChange} 
          />
        </div>
        <div className="col-span-4 h-auto md:h-full md:overflow-hidden rounded-[20px] border border-border shadow-2xl bg-surface">
          <ControlPanel 
            deviceProfile={deviceProfile}
            advertisedValue={advertisedValue}
            setAdvertisedValue={setAdvertisedValue}
            unit={unit}
            setUnit={setUnit}
            osMode={osMode}
            setOsMode={setOsMode}
            customOsGB={customOsGB}
            setCustomOsGB={setCustomOsGB}
          />
        </div>
        <div className="col-span-5 h-auto md:h-full md:overflow-hidden rounded-[20px] border border-border shadow-2xl bg-canvas">
          <OutputPanel 
            result={result} 
            vizMode={vizMode} 
            setVizMode={setVizMode}
            deviceProfile={deviceProfile}
            advertisedValue={advertisedValue}
            unit={unit}
          />
        </div>
      </div>

      {/* ZONE 2 - Scroll Sections */}
      <ScrollSections 
        advertisedValue={advertisedValue || 0} 
        unit={unit} 
        result={result} 
      />

      {/* ZONE 3 - Footer */}
      <Footer />
    </div>
  );
}
