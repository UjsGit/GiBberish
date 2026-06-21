export function Compendium() {
  return (
    <section className="compendium bg-surface rounded-card p-8 flex flex-col gap-8">
      <h2 className="text-xl font-bold text-text-primary text-center">
        THE GB vs GiB FILE
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Column A */}
        <div className="flex flex-col gap-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-border text-text-secondary">
                  <th className="pb-2 font-medium">Attribute</th>
                  <th className="pb-2 font-medium text-text-primary">GB <span className="text-text-muted font-normal text-xs ml-1">(Gigabyte)</span></th>
                  <th className="pb-2 font-medium text-usable">GiB <span className="text-text-muted font-normal text-xs ml-1">(Gibibyte)</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-text-secondary">
                <tr>
                  <td className="py-2 font-medium">Standard</td>
                  <td className="py-2">SI / International</td>
                  <td className="py-2">IEC 80000-13</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Definition</td>
                  <td className="py-2 font-mono text-xs">10^9 bytes</td>
                  <td className="py-2 font-mono text-xs">2^30 bytes</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Exact Bytes</td>
                  <td className="py-2 font-mono text-xs">1,000,000,000</td>
                  <td className="py-2 font-mono text-xs">1,073,741,824</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">% Difference</td>
                  <td className="py-2">—</td>
                  <td className="py-2 text-usable">7.37% larger</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <blockquote className="bg-surface-raised border-l-4 border-gap p-4 rounded-r-lg text-sm text-text-primary italic leading-relaxed">
            "In 1998, the IEC published IEC 60027-2, introducing GiB, TiB, and MiB to permanently separate binary and decimal naming. Most storage manufacturers, consumer operating systems, and retail packaging never adopted the standard — creating a structural mislabeling that persists to this day."
          </blockquote>
        </div>

        {/* Column B */}
        <div className="flex flex-col gap-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-border text-text-secondary">
                  <th className="pb-2 font-medium">Attribute</th>
                  <th className="pb-2 font-medium text-text-primary">TB <span className="text-text-muted font-normal text-xs ml-1">(Terabyte)</span></th>
                  <th className="pb-2 font-medium text-usable">TiB <span className="text-text-muted font-normal text-xs ml-1">(Tebibyte)</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-text-secondary">
                <tr>
                  <td className="py-2 font-medium">Standard</td>
                  <td className="py-2">SI / International</td>
                  <td className="py-2">IEC 80000-13</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Definition</td>
                  <td className="py-2 font-mono text-xs">10^12 bytes</td>
                  <td className="py-2 font-mono text-xs">2^40 bytes</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Exact Bytes</td>
                  <td className="py-2 font-mono text-xs">1,000,000,000,000</td>
                  <td className="py-2 font-mono text-xs">1,099,511,627,776</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">% Difference</td>
                  <td className="py-2">—</td>
                  <td className="py-2 text-usable">~9.95% larger</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gap/10 border border-gap rounded-card p-4 mt-auto">
            <p className="text-sm text-text-primary leading-relaxed">
              <span className="text-gap mr-2">🟡</span>
              <strong>The Scale of the Problem:</strong> On a 4 TB NAS drive, the binary math gap alone costs you approximately <strong>363 GiB</strong> before your OS reserves a single byte. That gap represents roughly <strong>72 HD movies</strong> you were promised and never received.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
