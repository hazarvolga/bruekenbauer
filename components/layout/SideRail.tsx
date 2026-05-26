import Link from "next/link";

const railLinks = [
  { href: "/intro", icon: "power", label: "Initiate" },
  { href: "/documents", icon: "archive", label: "Archive" },
  { href: "/compliance", icon: "shield", label: "Protocol" },
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
            className="flex h-12 w-12 items-center justify-center border border-transparent font-mono text-label-xs text-on-surface-variant transition-colors hover:border-warning-red hover:bg-surface-container-highest hover:text-warning-red"
          >
            <RailIcon name={link.icon} />
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
          STOP
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
