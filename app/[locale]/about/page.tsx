import Image from "next/image";
import { PageShell } from "@/components/motion/MotionProvider";
import { images } from "@/lib/assets";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AboutPage");

  const services = [
    {
      id: "01",
      title: t("services.srv_01_title"),
      copy: t("services.srv_01_copy"),
    },
    {
      id: "02",
      title: t("services.srv_02_title"),
      copy: t("services.srv_02_copy"),
    },
    {
      id: "03",
      title: t("services.srv_03_title"),
      copy: t("services.srv_03_copy"),
    },
    {
      id: "04",
      title: t("services.srv_04_title"),
      copy: t("services.srv_04_copy"),
    },
  ];

  const processSteps = [
    {
      id: "01",
      title: t("sequence.step_1_title"),
      copy: t("sequence.step_1_copy"),
    },
    {
      id: "02",
      title: t("sequence.step_2_title"),
      copy: t("sequence.step_2_copy"),
    },
    {
      id: "03",
      title: t("sequence.step_3_title"),
      copy: t("sequence.step_3_copy"),
    },
  ];

  const teamMembers = [
    {
      id: "01",
      image: "/images/team/andreas-werthmueller.webp",
      name: "Andreas Werthmüller",
      title: "Dr. rer. nat., dipl. phys.",
      bio: [t("team.andreas.bio_1"), t("team.andreas.bio_2"), t("team.andreas.bio_3")],
      focus: [t("team.andreas.focus_1"), t("team.andreas.focus_2"), t("team.andreas.focus_3")],
    },
    {
      id: "02",
      image: "/images/team/konstantin-gochua.webp",
      name: "Konstantin Gochua, PhD",
      title: "Business Development & Semiconductor Specialist",
      bio: [t("team.konstantin.bio_1"), t("team.konstantin.bio_2"), t("team.konstantin.bio_3")],
      focus: [
        t("team.konstantin.focus_1"),
        t("team.konstantin.focus_2"),
        t("team.konstantin.focus_3"),
      ],
    },
  ];

  return (
    <PageShell className="min-h-screen pt-20 md:ml-20">
      <section className="grid min-h-[calc(100vh-80px)] lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col justify-center px-margin-mobile py-16 md:px-margin-desktop">
          <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
            {t("label")}
          </span>
          <h1 className="mt-6 font-mono text-headline-lg-mobile uppercase text-on-surface md:text-display-xl">
            {t("title_1")}
            <br />
            {t("title_2")}
          </h1>
          <p className="mt-8 max-w-2xl whitespace-pre-line font-mono text-technical-md text-on-surface-variant">
            {t("description")}
          </p>
        </div>
        <div className="relative min-h-[520px] overflow-hidden border-l border-graphite-muted">
          <Image
            src={images.aboutHero}
            alt=""
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-y border-graphite-muted bg-surface-container-lowest px-margin-mobile py-20 md:px-margin-desktop">
        <div className="grid gap-gutter lg:grid-cols-[0.34fr_0.66fr]">
          <div>
            <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
              {t("services.label")}
            </span>
            <h2 className="mt-5 max-w-xl font-mono text-headline-lg-mobile uppercase text-on-surface md:text-headline-lg">
              {t("services.title")}
            </h2>
          </div>
          <div className="grid gap-gutter md:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.id}
                className="reticle-corners relative min-h-72 border border-graphite-muted bg-surface/55 p-6"
              >
                <div className="flex items-center justify-between border-b border-graphite-muted pb-4 font-mono text-label-xs uppercase tracking-[0.16em]">
                  <span className="text-warning-red">SRV-{service.id}</span>
                  <span className="text-outline">{t("services.active")}</span>
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
              {t("services.and_more")}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-graphite-muted bg-background px-margin-mobile py-20 md:px-margin-desktop">
        <div className="grid gap-gutter lg:grid-cols-[0.34fr_0.66fr]">
          <div>
            <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
              {t("team.label")}
            </span>
            <h2 className="mt-5 max-w-xl font-mono text-headline-lg-mobile uppercase text-on-surface md:text-headline-lg">
              {t("team.title")}
            </h2>
            <p className="mt-6 max-w-md font-mono text-data-sm uppercase leading-relaxed text-on-surface-variant">
              {t("team.subtitle")}
            </p>
          </div>

          <div className="grid gap-gutter xl:grid-cols-2">
            {teamMembers.map((member) => (
              <article
                key={member.id}
                className="reticle-corners group grid gap-0 overflow-hidden border border-graphite-muted bg-surface-container-low/50 md:grid-cols-[0.42fr_0.58fr] xl:grid-cols-1"
              >
                <div className="relative aspect-[4/3] border-b border-graphite-muted bg-graphite-muted/20 md:aspect-auto md:min-h-full md:border-b-0 md:border-r xl:min-h-[420px] xl:border-b xl:border-r-0">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1280px) 28vw, (min-width: 768px) 32vw, 100vw"
                    className="object-cover object-center grayscale transition duration-700 ease-out group-focus-within:grayscale-0 group-hover:grayscale-0"
                  />
                  <div className="bg-industrial-blue/20 absolute inset-0 mix-blend-multiply transition-opacity duration-700 ease-out group-focus-within:opacity-0 group-hover:opacity-0" />
                  <div className="absolute left-5 top-5 border border-graphite-muted bg-background/70 px-3 py-2 font-mono text-label-xs uppercase tracking-[0.16em] text-warning-red backdrop-blur-sm">
                    TEAM-{member.id}
                  </div>
                </div>

                <div className="flex min-h-full flex-col p-6 md:p-8">
                  <div className="border-b border-graphite-muted pb-6">
                    <h3 className="font-mono text-[24px] uppercase leading-[30px] text-on-surface">
                      {member.name}
                    </h3>
                    <p className="mt-3 font-mono text-label-xs uppercase tracking-[0.14em] text-warning-red">
                      {member.title}
                    </p>
                  </div>

                  <div className="mt-6 space-y-4">
                    {member.bio.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="font-mono text-data-sm uppercase leading-relaxed text-on-surface-variant"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="mt-8 grid gap-2 border-t border-graphite-muted pt-6 sm:grid-cols-3">
                    {member.focus.map((item) => (
                      <span
                        key={item}
                        className="border border-graphite-muted px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-industrial-silver"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-margin-mobile py-20 md:px-margin-desktop">
        <div className="grid gap-gutter lg:grid-cols-[0.34fr_0.66fr]">
          <div>
            <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
              {t("sequence.label")}
            </span>
            <h2 className="mt-5 max-w-xl font-mono text-headline-lg-mobile uppercase text-on-surface md:text-headline-lg">
              {t("sequence.title")}
            </h2>
          </div>
          <div className="divide-y divide-graphite-muted border border-graphite-muted bg-surface-container-low/40">
            {processSteps.map((step) => (
              <article key={step.id} className="grid gap-5 p-6 md:grid-cols-[120px_1fr]">
                <div className="font-mono text-label-xs uppercase tracking-[0.16em] text-warning-red">
                  {t("sequence.phase")} {step.id}
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
