import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroAnt from "@/assets/hero-ant.jpg";
import gameArt from "@/assets/game-art.jpg";
import teamPhoto from "@/assets/team.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mezumo — Serious strategy, hilarious fun" },
      {
        name: "description",
        content:
          "Indie game studio from Kraków, Poland. Creators of Ants in Space — a roguelike strategy game. We make games we want to play.",
      },
      { property: "og:title", content: "Mezumo — Serious strategy, hilarious fun" },
      {
        property: "og:description",
        content:
          "An indie studio making playful, strategic games. Currently building Ants in Space.",
      },
    ],
  }),
  component: Home,
});

const NAV = [
  { href: "#about", label: "About" },
  { href: "#game", label: "Game" },
  { href: "#team", label: "Team" },
  { href: "#consulting", label: "Consulting" },
  { href: "#contact", label: "Contact" },
];

function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`group inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 32 32" className="size-7" aria-hidden>
        <path d="M3 22 L10 8 L13 14 L9 22 Z" fill="var(--coral)" />
        <path d="M14 22 L21 8 L24 14 L20 22 Z" fill="var(--mint)" />
        <circle cx="25.5" cy="18.5" r="3.5" fill="none" stroke="var(--sand)" strokeWidth="2" />
      </svg>
      <span className="font-display text-[1.05rem] font-semibold tracking-tight">
        Mezumo
      </span>
    </a>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-6 lg:px-10">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="https://store.steampowered.com/app/2366290/Ants_in_Space/"
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.02] sm:inline-flex"
        >
          <span>Wishlist on Steam</span>
          <ArrowRight className="size-3.5" />
        </a>
      </div>
    </header>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-[1320px] px-6 pt-10 pb-20 lg:px-10 lg:pt-16 lg:pb-32">
        {/* Eyebrow row */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="eyebrow">Issue 01 · Kraków, PL</span>
          <span className="eyebrow">Est. 2023 — We make it for fun</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h1 className="font-display text-[clamp(2.6rem,7.5vw,6.25rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-balance">
              Serious strategy.{" "}
              <span className="italic font-serif text-coral">Hilarious</span> fun.
            </h1>
            <p className="mt-8 max-w-[44ch] text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl">
              Mezumo is a small studio of seasoned developers from Kraków making
              the kind of games we actually want to play. Currently flying:{" "}
              <span className="text-foreground">Ants in Space</span>.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#game"
                className="group inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Meet the ants
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#consulting"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
              >
                Hire us to consult
              </a>
            </div>

            {/* Studio stats */}
            <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-8 max-w-xl">
              <Stat n="3" label="People in the studio" />
              <Stat n="32y" label="Combined experience" />
              <Stat n="21" label="Shipped titles" />
            </dl>
          </div>

          <div className="lg:col-span-5">
            <figure className="relative">
              <div className="overflow-hidden rounded-2xl border border-border bg-surface grain">
                <img
                  src={heroAnt}
                  alt="An ant astronaut in a spacesuit stands on an alien planet"
                  width={1600}
                  height={1200}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span className="eyebrow">Fig. 01 — Field Commander, Class A</span>
                <span className="font-serif italic text-foreground/70">Mezumo, 2026</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <dt className="font-display text-3xl font-semibold tracking-tight">{n}</dt>
      <dd className="mt-1 text-xs leading-snug text-muted-foreground">{label}</dd>
    </div>
  );
}

function SectionHeader({
  index,
  kicker,
  title,
}: {
  index: string;
  kicker: string;
  title: string;
}) {
  return (
    <div className="mb-12 grid gap-4 border-t border-border pt-6 md:grid-cols-12">
      <div className="md:col-span-3">
        <div className="flex items-center gap-3">
          <span className="font-display text-sm text-coral">{index}</span>
          <span className="eyebrow">{kicker}</span>
        </div>
      </div>
      <div className="md:col-span-9">
        <h2 className="font-display text-[clamp(1.9rem,4.5vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-balance">
          {title}
        </h2>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-28">
      <SectionHeader index="01" kicker="About" title="A small studio with very big ant ambitions." />
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-3 md:col-start-4">
          <p className="font-serif text-2xl leading-snug text-foreground italic">
            “We left stable jobs to make games we'd want to play after work.”
          </p>
        </div>
        <div className="md:col-span-5 space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>
            Mezumo is an independent game studio founded in 2023 in Kraków,
            Poland. We're three friends with eight years of trenches together at
            Bloober Team — and a soft spot for strategy games that don't take
            themselves too seriously.
          </p>
          <p>
            Everything we ship starts the same way: a tiny, weird idea that
            makes us laugh. Then we sweat the systems until the laugh sticks.
          </p>
        </div>
      </div>
    </section>
  );
}

function Game() {
  return (
    <section id="game" className="bg-surface grain">
      <div className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-28">
        <SectionHeader
          index="02"
          kicker="Now Playing"
          title="Ants in Space — a roguelike strategy game."
        />
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="overflow-hidden rounded-2xl border border-border">
              <img
                src={gameArt}
                alt="Ants in Space key art — tiny ants in a cockpit battling termites on asteroids"
                width={1600}
                height={1200}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            <p className="text-lg leading-relaxed text-foreground text-pretty">
              Lead your Space Ants tribe to conquer planets and save the
              universe from these damn termites.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Fly through procedurally generated galaxies. Explore planets.
              Gather resources. <em className="font-serif text-foreground">Evolve</em>{" "}
              your species in a quest to destroy the invaders — the asteroid-riding
              Termites.
            </p>

            <ul className="mt-2 divide-y divide-border border-y border-border">
              {[
                ["Genre", "Roguelike · Strategy"],
                ["Platforms", "PC (Steam)"],
                ["Status", "In development"],
                ["Players", "Single-player"],
              ].map(([k, v]) => (
                <li key={k} className="flex items-baseline justify-between py-3 text-sm">
                  <span className="eyebrow">{k}</span>
                  <span className="font-display font-medium text-foreground">{v}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://store.steampowered.com/app/2366290/Ants_in_Space/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
              >
                Steam page <ArrowRight className="size-3.5" />
              </a>
              <a
                href="#videos"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-surface-2"
              >
                Watch gameplay
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const VIDEOS = [
  {
    id: "cE_kSZcIK0U",
    title: "I Evolved Ants To Battle Space Termites",
    by: "Frazzz",
  },
  {
    id: "1fLvqcAsXu4",
    title: "“The Ants Will Save Us!” — Demo",
    by: "GameHopping",
  },
  {
    id: "KQ93x9YKRHc",
    title: "Evolving Ants to Take Over the Galaxy",
    by: "InterndotGif",
  },
];

function Videos() {
  return (
    <section id="videos" className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-28">
      <SectionHeader
        index="03"
        kicker="On the internet"
        title="People playing our weird little game."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {VIDEOS.map((v, i) => (
          <a
            key={v.id}
            href={`https://www.youtube.com/watch?v=${v.id}`}
            target="_blank"
            rel="noreferrer"
            className="group block"
          >
            <div className="relative overflow-hidden rounded-xl border border-border bg-surface">
              <img
                src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                alt={v.title}
                loading="lazy"
                className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="grid size-14 place-items-center rounded-full bg-background/80 text-foreground backdrop-blur transition-transform group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-3">
              <span className="font-display text-xs text-muted-foreground">
                0{i + 1} / {VIDEOS.length.toString().padStart(2, "0")}
              </span>
              <span className="eyebrow">{v.by}</span>
            </div>
            <h3 className="mt-1 font-display text-lg font-medium leading-snug tracking-tight text-foreground">
              {v.title}
            </h3>
          </a>
        ))}
      </div>
    </section>
  );
}

const TEAM = [
  { name: "Barbara Miklas", role: "3D & 2D Artist", years: "11y", shipped: "8" },
  { name: "Paweł Niezabitowski", role: "Designer · Programmer", years: "13y", shipped: "8" },
  { name: "Bartosz Stachura", role: "Level Designer · Scripter", years: "11y", shipped: "5" },
];

function Team() {
  return (
    <section id="team" className="bg-surface grain">
      <div className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-28">
        <SectionHeader
          index="04"
          kicker="The Studio"
          title="Three people. One office in Kraków. A lot of coffee."
        />
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <figure className="lg:col-span-6">
            <div className="overflow-hidden rounded-2xl border border-border">
              <img
                src={teamPhoto}
                alt="The Mezumo team in their Kraków studio"
                width={1408}
                height={1600}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-xs text-muted-foreground eyebrow">
              The team — Mogilska 43, Kraków
            </figcaption>
          </figure>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <ul className="divide-y divide-border border-y border-border">
              {TEAM.map((p) => (
                <li key={p.name} className="grid grid-cols-12 gap-4 py-6 items-baseline">
                  <span className="col-span-12 md:col-span-5 font-display text-xl font-medium tracking-tight">
                    {p.name}
                  </span>
                  <span className="col-span-7 md:col-span-4 text-sm text-muted-foreground">
                    {p.role}
                  </span>
                  <span className="col-span-3 md:col-span-2 text-right font-display text-sm">
                    {p.years}
                  </span>
                  <span className="col-span-2 md:col-span-1 text-right text-sm text-coral">
                    {p.shipped}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-muted-foreground eyebrow">
              Name · Role · Years · Shipped
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Consulting() {
  return (
    <section id="consulting" className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-28">
      <SectionHeader
        index="05"
        kicker="Services"
        title="We also help other studios ship better games."
      />
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5 space-y-5 text-muted-foreground leading-relaxed">
          <p>
            With over three decades of combined experience in everything from
            AAA horror to systemic strategy, we offer hands-on consulting for
            indie teams and established studios alike.
          </p>
          <p>
            We dig in where it matters: game design, development pipelines,
            production, and go-to-market. Honest opinions only.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-mint px-5 py-2.5 text-sm font-medium text-background hover:-translate-y-0.5 transition-transform"
          >
            Start a conversation <ArrowRight className="size-3.5" />
          </a>
        </div>
        <ul className="md:col-span-7 grid gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {[
            ["Game Design Reviews", "Mechanics, loops, balance, fun-finding."],
            ["Production & Scoping", "Roadmaps, milestones, scope you can ship."],
            ["Prototype to Vertical Slice", "From concept to playable, with you."],
            ["Launch & Community", "Steam, press, Discord, the whole rodeo."],
          ].map(([t, d]) => (
            <li key={t} className="bg-background p-6">
              <h3 className="font-display text-lg font-medium tracking-tight">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section className="border-y border-border bg-surface-2 grain">
      <div className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 items-end">
          <h2 className="lg:col-span-8 font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-balance">
            Come hang out in our Discord.{" "}
            <span className="text-muted-foreground">
              Share strategies, send memes, watch us break our own game in
              real-time.
            </span>
          </h2>
          <div className="lg:col-span-4 flex lg:justify-end">
            <a
              href="https://discord.gg/Yf5pDTXW"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-medium text-primary-foreground hover:-translate-y-0.5 transition-transform"
            >
              Join the Discord <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "Serious Strategy",
    "Hilarious Fun",
    "Made in Kraków",
    "Est. 2023",
    "We make it for fun",
    "Ants in Space",
  ];
  return (
    <div className="overflow-hidden border-y border-border py-4">
      <div className="flex animate-[marquee_38s_linear_infinite] gap-10 whitespace-nowrap font-display text-2xl tracking-tight md:text-3xl">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className={i % 2 ? "text-mint" : "text-foreground"}>{t}</span>
            <span className="size-1.5 rounded-full bg-coral" aria-hidden />
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }`}</style>
    </div>
  );
}

function Footer() {
  return (
    <footer id="contact" className="mx-auto max-w-[1320px] px-6 py-16 lg:px-10 lg:py-20">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-6 max-w-sm text-sm text-muted-foreground">
            A small indie game studio from Kraków, Poland. We make games we'd
            want to play.
          </p>

          <a
            href="mailto:contact@mezumo.com"
            className="mt-8 inline-block font-display text-2xl tracking-tight underline decoration-coral decoration-2 underline-offset-4 hover:text-coral"
          >
            contact@mezumo.com
          </a>
        </div>

        <div className="md:col-span-3">
          <span className="eyebrow">Studio</span>
          <address className="mt-3 not-italic text-sm leading-relaxed text-muted-foreground">
            MEZUMO Sp. z o. o.<br />
            Mogilska 43<br />
            31-545 Kraków<br />
            Poland (PL)<br />
            <span className="text-xs">NIP: 6783207334</span>
          </address>
        </div>

        <div className="md:col-span-4">
          <span className="eyebrow">Find us</span>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              ["Discord", "https://discord.gg/Yf5pDTXW"],
              ["Twitter / X", "https://twitter.com/MezumoGames"],
              ["TikTok", "https://www.tiktok.com/@mezumogames"],
              ["Steam — Ants in Space", "https://store.steampowered.com/app/2366290/Ants_in_Space/"],
            ].map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-foreground hover:text-coral"
                >
                  {label}
                  <ArrowRight className="size-3 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Mezumo Sp. z o. o.</span>
        <span className="eyebrow">We make it for fun</span>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Game />
        <Videos />
        <Team />
        <Consulting />
        <Community />
      </main>
      <Footer />
    </div>
  );
}
