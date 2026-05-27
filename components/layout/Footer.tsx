import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-graphite-muted bg-surface px-margin-mobile py-5 font-mono text-data-sm text-on-surface-variant md:ml-20 md:px-gutter">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <span>brüeckenbauer GmbH // System status active</span>
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
