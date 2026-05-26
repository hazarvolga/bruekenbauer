import Image from "next/image";
import { PageShell } from "@/components/motion/MotionProvider";
import { images } from "@/lib/assets";

const services = [
  {
    title: "Strategic and operational support",
    copy: "We support or manage projects that are geared towards achieving clear goals, and we provide our clients with sound advice.",
  },
  {
    title: "Cooperation and negotiations",
    copy: "We facilitate cooperation with authorities, business partners or other relevant bodies and efficiently bring together complex interests.",
  },
  {
    title: "Business development",
    copy: "We identify growth opportunities, develop business models and support our clients in fully realizing their potential.",
  },
  {
    title: "Strengthening the team",
    copy: "In the short term and for a defined period, we supplement our customers' teams with our know-how to bridge resource gaps or to successfully complete projects.",
  },
];

const processSteps = [
  {
    title: "Understanding your needs",
    copy: "We support you in defining your needs and help you finding means and ways to implement your strategy and achieve your goals.",
  },
  {
    title: "Action plan",
    copy: "We will create a detailed roadmap that includes all phases of the project and the measures to be implemented.",
  },
  {
    title: "Delivery and support",
    copy: "We provide the necessary support and all related elements. We also advise you on your long-term strategy.",
  },
];

export default function AboutPage() {
  return (
    <PageShell className="min-h-screen pt-20 md:ml-20">
      <section className="grid min-h-[calc(100vh-80px)] lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col justify-center px-margin-mobile py-16 md:px-margin-desktop">
          <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
            Swiss engineering precision
          </span>
          <h1 className="mt-6 font-mono text-headline-lg-mobile uppercase text-on-surface md:text-display-xl">
            We don&apos;t just
            <br />
            advise
          </h1>
          <p className="mt-8 max-w-2xl whitespace-pre-line font-mono text-technical-md text-on-surface-variant">
            {`At brückenbauer GmbH, we build bridges - between disciplines, sectors and borders.
Based in Switzerland since 2022, we combine extensive experience at the intersection of politics, administration, business, and innovation. Thanks to a broad network, we connect local expertise with a global perspective and support our clients in mastering complex challenges and unlocking new potential.
We connect, design and empower.`}
          </p>
        </div>
        <div className="relative min-h-[520px] overflow-hidden border-l border-graphite-muted">
          <Image
            src={images.aboutHero}
            alt=""
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/65 via-transparent to-transparent" />
        </div>
      </section>

      <section className="border-y border-graphite-muted bg-surface-container-lowest px-margin-mobile py-20 md:px-margin-desktop">
        <div className="grid gap-gutter lg:grid-cols-[0.34fr_0.66fr]">
          <div>
            <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
              Services
            </span>
            <h2 className="mt-5 max-w-xl font-mono text-headline-lg-mobile uppercase text-on-surface md:text-headline-lg">
              Strategic and operational support
            </h2>
          </div>
          <div className="grid gap-gutter md:grid-cols-2">
            {services.map((service, index) => (
              <article
                key={service.title}
                className="reticle-corners relative min-h-72 border border-graphite-muted bg-surface/55 p-6"
              >
                <div className="flex items-center justify-between border-b border-graphite-muted pb-4 font-mono text-label-xs uppercase tracking-[0.16em]">
                  <span className="text-warning-red">SRV-{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-outline">Active</span>
                </div>
                <h3 className="mt-8 font-mono text-technical-md uppercase text-industrial-silver">
                  {service.title}
                </h3>
                <p className="mt-5 font-mono text-data-sm uppercase leading-relaxed text-on-surface-variant">
                  {service.copy}
                </p>
              </article>
            ))}
            <div className="border border-dashed border-graphite-muted bg-background/40 p-6 font-mono text-technical-md uppercase text-warning-red">
              And more...
            </div>
          </div>
        </div>
      </section>

      <section className="px-margin-mobile py-20 md:px-margin-desktop">
        <div className="grid gap-gutter lg:grid-cols-[0.34fr_0.66fr]">
          <div>
            <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
              Operating sequence
            </span>
            <h2 className="mt-5 max-w-xl font-mono text-headline-lg-mobile uppercase text-on-surface md:text-headline-lg">
              From need definition to long-term support
            </h2>
          </div>
          <div className="divide-y divide-graphite-muted border border-graphite-muted bg-surface-container-low/40">
            {processSteps.map((step, index) => (
              <article key={step.title} className="grid gap-5 p-6 md:grid-cols-[120px_1fr]">
                <div className="font-mono text-label-xs uppercase tracking-[0.16em] text-warning-red">
                  Phase {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-mono text-technical-md uppercase text-industrial-silver">
                    {step.title}
                  </h3>
                  <p className="mt-4 font-mono text-data-sm uppercase leading-relaxed text-on-surface-variant">
                    {step.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
