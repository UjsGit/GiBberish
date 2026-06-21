export function AppHeader() {
  return (
    <header className="app-header flex justify-between items-center border-b border-border pb-4">
      <div>
        <h1 className="font-display text-[1.5rem] leading-none text-usable font-[800]">
          GiBberish
        </h1>
        <p className="text-[0.875rem] text-text-secondary italic mt-1">
          "The space they never gave you, explained."
        </p>
      </div>
      <div className="bg-surface-raised px-3 py-1 rounded-pill text-[0.75rem] font-medium text-text-primary">
        v1.0.0
      </div>
    </header>
  );
}
