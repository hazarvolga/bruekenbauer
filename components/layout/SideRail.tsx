import Link from "next/link";

const railLinks = [
  { href: "/intro", icon: "power", label: "Power Management" },
  { href: "/documents", icon: "archive", label: "Documents" },
  { href: "/compliance", icon: "shield", label: "Compliance" },
];

export function SideRail() {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-full w-20 flex-col justify-between border-r border-graphite-muted bg-graphite-surface/90 pb-8 pt-28 backdrop-blur-xl md:flex">
      <nav className="flex flex-col items-center gap-5" aria-label="Technical navigation">
        {railLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            title={link.label}
            className="group relative flex h-12 w-12 items-center justify-center border border-transparent font-mono text-label-xs text-on-surface-variant transition-colors hover:border-warning-red hover:bg-surface-container-highest hover:text-warning-red focus-visible:border-warning-red focus-visible:outline-none"
          >
            <RailIcon name={link.icon} />
            <span className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 border border-graphite-muted bg-surface-container-high px-3 py-2 font-mono text-label-xs uppercase tracking-[0.16em] text-industrial-silver opacity-0 shadow-2xl transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              {link.label}
            </span>
            <span className="sr-only">{link.label}</span>
          </Link>
        ))}
      </nav>
      <div className="px-2 text-center font-mono text-label-xs uppercase text-warning-red">
        <div className="truncate">OPERATOR_01</div>
        <Link
          href="/contact"
          className="mt-4 block border border-warning-red p-1 transition-colors hover:bg-warning-red hover:text-primary-container"
        >
          CONTACT
        </Link>
      </div>
    </aside>
  );
}

function RailIcon({ name }: { name: string }) {
  const common = {
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "square" as const,
    strokeLinejoin: "miter" as const,
    strokeWidth: 1.7,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  if (name === "power") {
    return (
      <svg {...common}>
        <path d="M12 3v8" />
        <path d="M7.2 6.8a7 7 0 1 0 9.6 0" />
      </svg>
    );
  }

  if (name === "archive") {
    return (
      <svg {...common}>
        <path d="M4 6h16v4H4z" />
        <path d="M6 10v9h12v-9" />
        <path d="M9 14h6" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M12 3l7 3v5c0 4.8-2.8 8-7 10-4.2-2-7-5.2-7-10V6z" />
      <path d="M9 12l2 2 4-5" />
    </svg>
  );
}
