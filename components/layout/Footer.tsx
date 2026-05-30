import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-graphite-muted bg-surface px-margin-mobile py-8 font-mono text-data-sm text-on-surface-variant md:ml-20 md:px-gutter">
      <div className="grid gap-6 border-b border-graphite-muted/40 pb-6 mb-6 md:grid-cols-3">
        <div>
          <span className="text-label-xs text-outline uppercase block tracking-wider mb-2">Corporate Headquarters</span>
          <p className="text-on-surface-variant leading-relaxed">
            brückenbauer GmbH<br />
            Dachsweg 12, 3075 Rüfenacht BE<br />
            Switzerland
          </p>
        </div>
        <div>
          <span className="text-label-xs text-outline uppercase block tracking-wider mb-2">Registry &amp; Identification</span>
          <p className="text-on-surface-variant leading-relaxed">
            UID: CHE-191.442.645<br />
            Commercial Register Canton Bern<br />
            Managing Director: Dr. Andreas Werthmüller
          </p>
        </div>
        <div>
          <span className="text-label-xs text-outline uppercase block tracking-wider mb-2">Direct Contact</span>
          <p className="text-on-surface-variant leading-relaxed">
            Tel: +41 (0)76 222 45 54<br />
            Email: <a href="mailto:werand@bluewin.ch" className="text-warning-red hover:underline">werand@bluewin.ch</a><br />
            Status: System Active
          </p>
        </div>
      </div>
      
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-outline">
        <span>brückenbauer GmbH // UID: CHE-191.442.645</span>
        <div className="flex gap-5 uppercase">
          <Link href="/compliance" className="hover:text-warning-red">
            Compliance
          </Link>
          <Link href="/documents" className="hover:text-warning-red">
            Documents
          </Link>
          <Link href="/contact" className="hover:text-warning-red">
            Contact
          </Link>
        </div>
      </div>
      <div className="mt-4 border-t border-graphite-muted pt-4 text-outline">
        Designed &amp; Developed by{" "}
        <a
          href="https://hazarvolga.com.tr"
          target="_blank"
          rel="noreferrer"
          className="text-industrial-silver transition-colors hover:text-warning-red"
        >
          Hazar Volga Ekiz
        </a>
      </div>
    </footer>
  );
}
