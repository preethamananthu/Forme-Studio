const industries = ['Clinics', 'Law Firms', 'Restaurants', 'Architects', 'Boutiques', 'Coaches']

export function TrustBar() {
  return (
    <section className="border-y border-border bg-secondary py-4">
      <div className="studio-container flex flex-wrap items-center gap-x-6 gap-y-2">
        <span className="label-mono text-muted-foreground/60">Designed for:</span>
        <div className="flex flex-wrap items-center">
          {industries.map((industry, index) => (
            <span key={industry} className="flex items-center">
              {index > 0 && <span className="mx-1 text-muted-foreground/30">·</span>}
              <span className="label-mono">{industry}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
