export const CONSTANTS = {
  BASE10: { MB: 1e6, GB: 1e9, TB: 1e12, PB: 1e15 },
  BASE2:  { MiB: Math.pow(2, 20), GiB: Math.pow(2, 30), TiB: Math.pow(2, 40), PiB: Math.pow(2, 50) },
  // Standard OS deductions in decimal GB
  OS_OVERHEAD_GB: { raw: 0, pc: 0, phone: 15, console: 100 },
  // Payload file sizes in decimal bytes to prevent math conversion bugs
  PAYLOAD_BYTES: { aaa_game: 100 * 1e9, hd_movie: 5 * 1e9, photo: 5 * 1e6, app: 100 * 1e6, video_4k: 300 * 1e6 },
};

export const UNIT_BOUNDS = {
  MB: { min: 16, max: 8000 },
  GB: { min: 16, max: 4000 },
  TB: { min: 1, max: 100 },
  PB: { min: 1, max: 100 }
};

export function calculateStorage(advertisedValue, unit, deviceProfile, customOsEnabled, customOsGB) {
  if (advertisedValue === null || advertisedValue === undefined || advertisedValue <= 0) return null;

  const rawBytes = advertisedValue * CONSTANTS.BASE10[unit];
  const base2Unit = unit.replace('B', 'iB');
  const base2Divisor = CONSTANTS.BASE2[base2Unit];

  const realSpace = rawBytes / base2Divisor;

  const osGB = customOsEnabled
                 ? parseFloat(customOsGB) || 0
                 : CONSTANTS.OS_OVERHEAD_GB[deviceProfile];
  const osBytes = osGB * CONSTANTS.BASE10.GB;
  const osDeduction = osBytes / base2Divisor;

  const usableSpace = Math.max(0, realSpace - osDeduction);

  const expectedSpace = advertisedValue;
  const mathGap = Math.max(0, expectedSpace - realSpace);

  const totalDisplay = expectedSpace;
  const bars = {
    usable: (usableSpace / totalDisplay) * 100,
    gap:    (mathGap / totalDisplay) * 100,
    os:     (osDeduction / totalDisplay) * 100,
  };

  const payloads = {};
  const usableBytes = usableSpace * base2Divisor;
  for (const [key, sizeBytes] of Object.entries(CONSTANTS.PAYLOAD_BYTES)) {
    if (key === 'aaa_game') {
      payloads[key] = (usableBytes / sizeBytes).toFixed(1);
    } else {
      payloads[key] = Math.floor(usableBytes / sizeBytes);
    }
  }

  // Display values formatting
  let finalDisplayValue = usableSpace;
  let finalDisplayUnit = base2Unit;
  
  if (base2Unit === 'MiB' && finalDisplayValue >= 1024) {
    finalDisplayValue /= 1024; finalDisplayUnit = 'GiB';
  } else if (base2Unit === 'GiB' && finalDisplayValue >= 1024) {
    finalDisplayValue /= 1024; finalDisplayUnit = 'TiB';
  } else if (base2Unit === 'TiB' && finalDisplayValue >= 1024) {
    finalDisplayValue /= 1024; finalDisplayUnit = 'PiB';
  }

  return {
    rawBytes,
    realSpace: realSpace.toFixed(2),
    osDeduction: osDeduction.toFixed(2),
    mathGap: mathGap.toFixed(2),
    usableSpace: usableSpace.toFixed(2),
    base2Unit,
    displayValue: finalDisplayValue.toFixed(2),
    displayUnit: finalDisplayUnit,
    bars,
    payloads,
  };
}

export function formatPayloadCount(n) {
  if (typeof n === 'string') return n;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

export function sliderToUnit(v, minVal, maxVal) {
  return minVal * Math.pow(maxVal / minVal, v / 1000);
}

export function unitToSlider(val, minVal, maxVal) {
  if (val <= 0) return 0;
  return (Math.log(val) - Math.log(minVal)) / (Math.log(maxVal) - Math.log(minVal)) * 1000;
}
