import { createFileRoute, Link } from "@tanstack/react-router";
import ueFunding from "@/assets/ue-funding.png";
import mezumoLogo from "@/assets/mezumo-mark.png";

export const Route = createFileRoute("/ue")({
  head: () => ({
    meta: [
      { title: "UE — Mezumo" },
      {
        name: "description",
        content:
          "Informacje o projekcie badawczo-rozwojowym Mezumo Sp. z o.o. dofinansowanym w ramach Programu Operacyjnego Inteligentny Rozwój 2014–2020.",
      },
      { property: "og:title", content: "UE — Mezumo" },
      {
        property: "og:description",
        content:
          "Projekt Ants in Space! dofinansowany ze środków Europejskiego Funduszu Rozwoju Regionalnego.",
      },
    ],
  }),
  component: UEPage,
});

function UEPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-6 lg:px-10">
          <Link
            to="/"
            aria-label="Mezumo — home"
            className="inline-flex items-center gap-2 text-foreground"
          >
            <img src={mezumoLogo} alt="" aria-hidden="true" className="h-7 w-auto shrink-0" />
            <span className="font-display text-[1.05rem] font-bold uppercase tracking-[0.18em] leading-none">
              Mezumo
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            <Link
              to="/"
              className="rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              ← Back
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Fundusze Europejskie
        </p>
        <h1
          className="mb-10 font-display text-5xl font-bold tracking-tight text-coral lg:text-6xl"
          style={{ textShadow: "0 0 40px rgba(238, 33, 108, 0.35)" }}
        >
          UE
        </h1>

        <div className="space-y-6 text-base leading-relaxed text-foreground/90">
          <p>
            MEZUMO SP. Z O. O. realizuje projekt badawczo – rozwojowy pt. „Opracowanie
            prototypu gry komputerowej, wykorzystującej innowacyjne systemy proceduralnego
            generowania wszechświatów i planet oraz postaci insektów" (Ants in space!)
            dofinansowany w ramach realizacji Projektu Grantowego Bridge Alfa, Działanie
            1.3.1 Programu Operacyjnego Inteligentny Rozwój 2014 - 2020 współfinansowanego
            ze środków Europejskiego Funduszu Rozwoju Regionalnego.
          </p>
          <p>
            Głównym celem projektu jest opracowanie prototypu innowacyjnej gry komputerowej
            „Ants in space!", zawierającej systemy proceduralnego generowania zmieniających
            się dynamicznie wszechświatów i planet, a także nowych postaci przez mieszanie
            jednostek w grupie wyjściowo zdefiniowanej.
          </p>

          <dl className="grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Wartość projektu
              </dt>
              <dd className="mt-1 font-display text-2xl font-semibold">400 000 PLN</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Wartość dofinansowania
              </dt>
              <dd className="mt-1 font-display text-2xl font-semibold">320 000 PLN</dd>
            </div>
          </dl>
        </div>

        <figure className="mt-12 overflow-hidden rounded-lg border border-border bg-surface">
          <img
            src={ueFunding}
            alt="Znaki Funduszy Europejskich, Rzeczpospolitej Polskiej, Unii Europejskiej"
            className="h-auto w-full"
          />
        </figure>
      </main>
    </div>
  );
}
