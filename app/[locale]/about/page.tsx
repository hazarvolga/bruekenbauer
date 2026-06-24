import Image from "next/image";
import { TechnicalButton } from "@/components/layout/TechnicalButton";
import { TechnicalButtonGroup } from "@/components/layout/TechnicalButtonGroup";
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
      image: "/images/team/andreas-werthmueller-yeni.jpeg",
      name: "Andreas Werthmüller",
      title: "Dr. rer. nat., dipl. phys.",
      bio: [t("team.andreas.bio_1"), t("team.andreas.bio_2"), t("team.andreas.bio_3")],
      focus: [t("team.andreas.focus_1"), t("team.andreas.focus_2"), t("team.andreas.focus_3")],
    },
    {
      id: "02",
      image: "/images/team/konstantin-gochua-yeni.jpeg",
      name: "Konstantin Gochua, PhD",
      title: t("team.konstantin.title"),
      bio: [t("team.konstantin.bio_1"), t("team.konstantin.bio_2"), t("team.konstantin.bio_3")],
      focus: [
        t("team.konstantin.focus_1"),
        t("team.konstantin.focus_2"),
        t("team.konstantin.focus_3"),
      ],
    },
    {
      id: "03",
      image: "/images/team/iponey-huang-yeni.jpeg",
      name: "Mr. Iponey HUANG 丨MBA",
      title: t("team.iponey.title"),
      bio: [t("team.iponey.bio_1"), t("team.iponey.bio_2")],
      focus: [t("team.iponey.focus_1"), t("team.iponey.focus_2"), t("team.iponey.focus_3")],
    },
  ];

  return (
    <PageShell className="min-h-screen pt-20 md:ml-20">
      <section className="grid lg:min-h-[720px] lg:grid-cols-[1.08fr_0.92fr]">
        <div className="flex flex-col justify-start px-margin-mobile py-12 md:px-margin-desktop md:py-16 lg:pb-12 lg:pt-20">
          <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
            {t("label")}
          </span>
          <h1 className="mt-5 max-w-4xl font-mono text-[38px] uppercase leading-[1.14] text-on-surface sm:text-[50px] sm:leading-[1.1] md:text-[56px] lg:text-[60px]">
            {t("title_1")}
            <br />
            {t("title_2")}
          </h1>
          <p className="mt-7 max-w-xl whitespace-pre-line font-mono text-technical-md leading-relaxed text-industrial-silver">
            {t("description")}
          </p>
          <div className="mt-10 max-w-xl border border-graphite-muted bg-surface-container-low/45 p-6">
            <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
              {t("services.label")}
            </span>
            <h2 className="mt-4 font-mono text-[30px] uppercase leading-tight text-on-surface md:text-[36px]">
              {t("services.title")}
            </h2>
            <p className="mt-5 font-mono text-data-sm uppercase leading-relaxed text-industrial-silver">
              {t("services.intro")}
            </p>
            <div className="mt-6 divide-y divide-graphite-muted border-t border-graphite-muted">
              {services.map((service) => (
                <div key={service.id} className="py-4">
                  <h3 className="font-mono text-[15px] uppercase leading-tight text-industrial-silver">
                    {service.title}
                  </h3>
                  <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed text-on-surface-variant">
                    {service.copy}
                  </p>
                </div>
              ))}
              <div className="pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-warning-red">
                {t("services.and_more")}
              </div>
            </div>
          </div>
        </div>
        <div className="relative min-h-[460px] overflow-hidden border-t border-graphite-muted lg:min-h-[720px] lg:border-l lg:border-t-0">
          <Image
            src={images.aboutHero}
            alt=""
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-y border-graphite-muted bg-background px-margin-mobile py-12 md:px-margin-desktop">
        <div className="grid gap-gutter border border-graphite-muted bg-surface-container-low/45 p-6 md:grid-cols-[0.38fr_0.62fr] md:items-end md:p-8">
          <div>
            <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
              {t("team.label")}
            </span>
            <h2 className="mt-4 max-w-xl font-mono text-[34px] uppercase leading-tight text-on-surface md:text-[44px]">
              {t("team.title")}
            </h2>
          </div>
          <p className="max-w-lg font-mono text-data-sm uppercase leading-relaxed text-industrial-silver md:justify-self-end">
            {t("team.subtitle")}
          </p>
        </div>
      </section>

      <section className="border-b border-graphite-muted bg-background px-margin-mobile py-12 md:px-margin-desktop md:py-14">
        <div className="mx-auto grid w-full max-w-[1600px] gap-gutter lg:grid-cols-3">
          {teamMembers.map((member) => (
            <article
              key={member.id}
              className="reticle-corners group flex min-w-0 flex-col overflow-hidden border border-graphite-muted bg-surface-container-low/50"
            >
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden border-b border-graphite-muted bg-graphite-muted/20">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(min-width: 1800px) 500px, (min-width: 1280px) 30vw, (min-width: 768px) 60vw, 100vw"
                  className="object-contain object-center grayscale transition duration-700 ease-out group-focus-within:grayscale-0 group-hover:grayscale-0"
                />
                <div className="bg-industrial-blue/20 absolute inset-0 mix-blend-multiply transition-opacity duration-700 ease-out group-focus-within:opacity-0 group-hover:opacity-0" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-start p-5 md:p-6">
                <div className="min-w-0 border-b border-graphite-muted pb-4">
                  <h3 className="break-words font-mono text-[21px] uppercase leading-[27px] tracking-normal text-on-surface xl:text-[23px] xl:leading-[29px]">
                    {member.name}
                  </h3>
                  <p className="mt-3 break-words font-mono text-[9px] uppercase leading-tight tracking-[0.08em] text-warning-red">
                    {member.title}
                  </p>
                </div>

                <div className="mt-4 space-y-3">
                  {member.bio.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="break-words font-mono text-[10.75px] uppercase leading-[1.62] tracking-normal text-on-surface-variant md:text-[11px]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-4 grid gap-0.5 border-t border-graphite-muted pt-2.5">
                  {member.focus.map((item) => (
                    <span
                      key={item}
                      className="min-w-0 break-words border border-graphite-muted/70 px-3 py-1 font-mono text-[10px] uppercase leading-tight tracking-[0.08em] text-industrial-silver"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-margin-mobile py-14 md:px-margin-desktop md:py-16">
        <div className="grid gap-gutter lg:grid-cols-[0.34fr_0.66fr]">
          <div>
            <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
              {t("sequence.label")}
            </span>
            <h2 className="mt-4 max-w-md font-mono text-headline-lg-mobile uppercase leading-tight text-on-surface md:text-[34px]">
              {t("sequence.title")}
            </h2>
          </div>
          <div className="divide-y divide-graphite-muted border border-graphite-muted bg-surface-container-low/60 shadow-[0_18px_60px_rgba(0,0,0,0.14)]">
            {processSteps.map((step) => (
              <article key={step.id} className="grid gap-5 p-6 md:grid-cols-[120px_1fr]">
                <div className="font-mono text-data-sm uppercase tracking-[0.16em] text-warning-red">
                  {t("sequence.phase")} {step.id}
                </div>
                <div>
                  <h3 className="font-mono text-[22px] uppercase leading-tight text-industrial-silver">
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

      <section className="border-t border-graphite-muted bg-surface-container-lowest px-margin-mobile py-12 md:px-margin-desktop">
        <div className="grid gap-6 border border-graphite-muted bg-surface-container-low/50 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
              {t("cta.label")}
            </span>
            <h2 className="mt-3 max-w-3xl font-mono text-technical-md uppercase text-industrial-silver md:text-[28px] md:leading-tight">
              {t("cta.title")}
            </h2>
            <p className="mt-4 max-w-2xl font-mono text-data-sm uppercase leading-relaxed text-on-surface-variant">
              {t("cta.copy")}
            </p>
          </div>
          <TechnicalButtonGroup className="md:w-72">
            <TechnicalButton href="/contact">{t("cta.contact")}</TechnicalButton>
            <TechnicalButton href="/rfq" variant="ghost">
              {t("cta.rfq")}
            </TechnicalButton>
            <TechnicalButton href="/contact" variant="ghost">
              {t("cta.consultation")}
            </TechnicalButton>
          </TechnicalButtonGroup>
        </div>
      </section>
    </PageShell>
  );
}
