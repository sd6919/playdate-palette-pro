import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroAnt from "@/assets/hero-ants-in-space.png";
import gameArt from "@/assets/ants-in-space-banner.png";
import teamPhoto from "@/assets/team.png";
import mezumoLogo from "@/assets/mezumo-mark.png";
import mezumoLogoLetter from "@/assets/mezumo-logo-letter.png";
import bgShapes from "@/assets/bg-shapes.png";

function BackgroundShapes() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shift = progress * 60; // vw travel
  const fade = 1 - progress;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden md:block"
      style={{ opacity: 0.35 * fade + 0.05 }}
    >
      <style>{`
        @keyframes bgFloatL { 0%,100%{transform:translate3d(var(--sx,0),0,0)} 50%{transform:translate3d(var(--sx,0),-14px,0)} }
        @keyframes bgFloatR { 0%,100%{transform:translate3d(var(--sx,0),0,0)} 50%{transform:translate3d(var(--sx,0),12px,0)} }
      `}</style>
      <div
        className="absolute inset-y-0 left-0 w-1/2"
        style={{
          ["--sx" as string]: `-${shift}vw`,
          animation: "bgFloatL 7s ease-in-out infinite",
          willChange: "transform",
        }}
      >
        <img
          src={bgShapes}
          alt=""
          className="absolute inset-y-0 left-0 h-full w-[100vw] max-w-none object-cover object-left"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />
      </div>
      <div
        className="absolute inset-y-0 right-0 w-1/2"
        style={{
          ["--sx" as string]: `${shift}vw`,
          animation: "bgFloatR 8s ease-in-out infinite",
          willChange: "transform",
        }}
      >
        <img
          src={bgShapes}
          alt=""
          className="absolute inset-y-0 right-0 h-full w-[100vw] max-w-none object-cover object-right"
          style={{ clipPath: "inset(0 0 0 50%)" }}
        />
      </div>
    </div>
  );
}

function StarField() {
  // Deterministic pseudo-random stars so SSR/CSR match
  const stars = (() => {
    const arr: { x: number; y: number; s: number; o: number; d: number; t: number }[] = [];
    let seed = 1337;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < 220; i++) {
      arr.push({
        x: rand() * 100,
        y: rand() * 100,
        s: rand() * 1.6 + 0.4,
        o: rand() * 0.6 + 0.2,
        d: rand() * 4 + 2,
        t: rand() * 5,
      });
    }
    return arr;
  })();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0, opacity: 0.35 }}
    >
      <style>{`@keyframes starTwinkle{0%,100%{opacity:var(--o,0.5)}50%{opacity:calc(var(--o,0.5) * 0.25)}}`}</style>
      {stars.map((st, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${st.x}%`,
            top: `${st.y}%`,
            width: `${st.s}px`,
            height: `${st.s}px`,
            borderRadius: "9999px",
            background: "white",
            boxShadow: "0 0 4px rgba(255,255,255,0.6)",
            ["--o" as string]: st.o,
            opacity: st.o,
            animation: `starTwinkle ${st.d}s ease-in-out ${st.t}s infinite`,
          }}
        />
      ))}
    </div>
  );
}


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
    <a
      href="#top"
      aria-label="Mezumo — home"
      className={`group inline-flex items-center gap-2 text-foreground ${className}`}
    >
      <img
        src={mezumoLogoLetter}
        alt="Mezumo"
        className="h-8 w-auto shrink-0"
      />
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
          <Link
            to="/ue"
            className="rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
          >
            UE
          </Link>
        </nav>
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
          <span className="eyebrow">KRAKÓW, PL</span>
          <span className="eyebrow">EST. 2023 | WE MAKE IT FOR FUN</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h1
              className="font-display text-[clamp(2.6rem,7.5vw,6.25rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-balance text-coral"
              style={{ textShadow: "0 0 28px rgba(238, 33, 108, 0.35)" }}
            >
              Ants in Space!
            </h1>
            <p className="mt-8 max-w-[44ch] text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl whitespace-pre-line">
              Ants in Space!
              Lead your Space Ants tribe to conquer planets and save the universe from these damn termites!
              Ants in Space is a Roguelike Strategy game.
              Fly through generated galaxies, explore planets, gather resources, and EVOLVE your species in a quest to destroy the invaders:
              The asteroid-riding Termites.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#game"
                className="group inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Meet the ants
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

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
                <span className="eyebrow">{"\n"}</span>
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
            {"\n"}
          </p>
        </div>
        <div className="md:col-span-5 space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>
            Mezumo is an independent game studio founded in 2023 in Kraków,
            Poland. We're three friends with eight years of trenches together at
            Bloober Team and a soft spot for strategy games that don't take
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
          title="Ants in Space. A roguelike strategy game."
        />
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="overflow-hidden rounded-2xl border border-border bg-background">
              <img
                src={gameArt}
                alt="Ants in Space key art — a blue space ant faces a giant red termite on an alien cliff"
                width={1200}
                height={1500}
                loading="lazy"
                className="aspect-[460/215] w-full object-cover object-center"
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
              your species in a quest to destroy the invaders, the asteroid-riding
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
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-black transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: "#ee216c" }}
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
    id: "v2TdF8Cp6FU",
    title: "\"The Ants Will Save Us!\" — Demo",
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
  { name: "Barbara Miklas", role: "3D & 2D Artist", years: "+10y", shipped: "8", label: "ARTIST" },
  { name: "Paweł Niezabitowski", role: "Designer · Programmer", years: "+15y", shipped: "8", label: "DEVELOPER" },
  { name: "Bartosz Stachura", role: "Level Designer · Scripter", years: "+10y", shipped: "8", label: "SCRIPTER" },
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

        <figure className="mb-14">
          <div className="overflow-hidden rounded-2xl border border-border">
            <img
              src={teamPhoto}
              alt="The Mezumo team — Barbara, Paweł and Bartosz"
              loading="lazy"
              className="aspect-[21/9] w-full object-cover object-center"
            />
          </div>
          <figcaption className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span className="eyebrow">{"\n"}</span>
            <span className="font-serif italic text-foreground/70">{"\n"}</span>
          </figcaption>
        </figure>

        <ul className="grid gap-px bg-border rounded-2xl overflow-hidden border border-border md:grid-cols-3">
          {TEAM.map((p, i) => (
            <li key={p.name} className="bg-background p-8 flex flex-col gap-4">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-xs text-coral">0{i + 1}</span>
                <span className="eyebrow">{p.label}</span>
              </div>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-coral">
                {p.name}
              </h3>
              <p className="text-sm text-muted-foreground">{p.role}</p>
              <dl className="mt-auto grid grid-cols-2 gap-4 border-t border-border pt-4">
                <div>
                  <dt className="eyebrow">Experience</dt>
                  <dd className="mt-1 font-display text-lg text-foreground">{p.years}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Shipped</dt>
                  <dd className="mt-1 font-display text-lg text-foreground">{p.shipped} titles</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Consulting() {
  return (
    <section id="consulting" className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-28">
      <SectionHeader
        index="05"
        kicker="GAME CONSULTING"
        title="We also help other studios ship better games."
      />
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5 space-y-5 text-muted-foreground leading-relaxed">
          <p>
            Unlock Your Game's Potential with Mezumo.
          </p>
          <p>
            At Mezumo, we provide expert game consulting services to help developers turn their visions into reality. Whether you're an indie developer or an established studio, we tailor our insights to meet your unique needs, ensuring your game stands out in a competitive market.{"\u00a0"}
            Partner with us, and let's create something extraordinary together.
          </p>
          <a
            href="#contact"
            style={{ backgroundColor: "#ee216c" }}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-background hover:-translate-y-0.5 transition-transform"
          >
            Start a conversation <ArrowRight className="size-3.5" />
          </a>
        </div>
        <ul className="md:col-span-7 grid gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {[
            ["Game Design Reviews", "Mechanics, loops, balance, fun-finding."],
            ["Prototype to Vertical Slice", "From concept to playable, with you."],
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
              href="https://discord.gg/phYj8yzg68"
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
              ["Discord", "https://discord.gg/phYj8yzg68"],
              ["Twitter / X", "https://twitter.com/MezumoGames"],
              ["TikTok", "https://www.tiktok.com/@mezumogames"],
              ["Steam - Ants in Space", "https://store.steampowered.com/app/2366290/Ants_in_Space/"],
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

function DiscordIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.095 2.157 2.418 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.095 2.157 2.418 0 1.334-.946 2.419-2.157 2.419z" />
    </svg>
  );
}

function TwitterIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function SteamIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0C5.594 0 .337 4.997.03 11.324l6.446 2.665a3.4 3.4 0 0 1 1.906-.583c.06 0 .118.003.177.005l2.867-4.154v-.06a4.542 4.542 0 0 1 4.541-4.54 4.545 4.545 0 0 1 4.54 4.544 4.545 4.545 0 0 1-4.61 4.542L11.81 15.66c0 .05.003.1.003.15a3.416 3.416 0 0 1-3.417 3.416 3.42 3.42 0 0 1-3.337-2.66L.42 14.663C1.845 19.982 6.464 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zM7.53 18.212l-1.475-.61a2.575 2.575 0 0 0 1.343 1.264c1.303.543 2.808-.077 3.35-1.382a2.55 2.55 0 0 0 .002-1.958 2.53 2.53 0 0 0-1.386-1.379 2.56 2.56 0 0 0-1.918-.007l1.524.63a1.885 1.885 0 0 1 1.009 2.472 1.888 1.888 0 0 1-2.469 1.01zm11.089-9.113a3.028 3.028 0 0 0-3.024-3.023 3.03 3.03 0 0 0-3.027 3.023 3.03 3.03 0 0 0 3.027 3.025 3.028 3.028 0 0 0 3.024-3.025zm-5.294-.006a2.272 2.272 0 0 1 2.275-2.27 2.272 2.272 0 0 1 2.272 2.27 2.272 2.272 0 0 1-2.272 2.273 2.272 2.272 0 0 1-2.275-2.273z" />
    </svg>
  );
}

const SOCIALS = [
  { href: "https://store.steampowered.com/app/2366290/Ants_in_Space/", label: "Steam", message: "WISHLIST ON STEAM", Icon: SteamIcon },
  { href: "https://discord.gg/phYj8yzg68", label: "Discord", message: "JOIN OUR DISCORD", Icon: DiscordIcon },
  { href: "https://twitter.com/MezumoGames", label: "Twitter / X", message: "FOLLOW US ON TWITTER", Icon: TwitterIcon },
  { href: "https://www.tiktok.com/@mezumogames", label: "TikTok", message: "FOLLOW US ON TIKTOK", Icon: TikTokIcon },
];

function SocialSidebar() {
  return (
    <aside className="fixed right-4 top-1/2 z-40 -translate-y-1/2 hidden md:flex flex-col gap-3 items-end">
      {SOCIALS.map(({ href, label, message, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          style={{ backgroundColor: "#ee216c" }}
          className="group relative flex h-11 w-11 hover:w-56 items-center overflow-hidden rounded-xl text-primary-foreground shadow-lg shadow-[#ee216c]/20 transition-[width,box-shadow] duration-300 ease-out hover:shadow-[#ee216c]/50"
        >
          <span className="absolute right-0 top-0 grid h-11 w-11 place-items-center transition-transform duration-300 ease-out group-hover:-translate-x-[11.25rem]">
            <Icon className="size-5" />
          </span>
          <span className="pl-12 pr-4 text-[11px] font-semibold tracking-[0.18em] whitespace-nowrap opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0">
            {message}
          </span>
        </a>
      ))}
    </aside>
  );
}


function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <StarField />
      <BackgroundShapes />
      <Nav />
      <SocialSidebar />
      <main className="relative z-10">
        <Hero />
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
