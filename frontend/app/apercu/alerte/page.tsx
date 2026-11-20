import { Bell } from 'lucide-react';

export const metadata = { title: 'Invitation à l’alerte · essais', robots: { index: false, follow: false } };

// Page d'essai, hors menu et hors moteurs : cinq façons de présenter l'invitation à créer une alerte.
const TITLE = 'Le bien que vous cherchez n’est peut-être pas encore en ligne.';
const black = 'inline-flex h-12 flex-none items-center rounded-full bg-stone-900 px-8 text-[15px] font-medium text-white';
const yellow = 'inline-flex h-12 flex-none items-center rounded-full bg-[#F4E7B5] px-8 text-[15px] font-medium text-stone-900';

function Label({ k, name, note }: { k: string; name: string; note: string }) {
  return (
    <p className="mb-4 flex items-center gap-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-900 text-sm font-medium text-white">{k}</span>
      <span>
        <span className="block font-medium text-stone-900">{name}</span>
        <span className="block text-sm text-stone-500">{note}</span>
      </span>
    </p>
  );
}

export default function AlertTrials() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] px-6 py-12 font-sans text-[#191919]">
      <div className="mx-auto max-w-6xl space-y-14">
        <h1 className="font-serif text-4xl tracking-tight text-stone-900">Invitation à l’alerte : cinq essais</h1>

        <section>
          <Label k="A" name="Actuelle" note="Un titre et le bouton, entre deux filets." />
          <div className="grid gap-x-12 gap-y-5 border-y border-stone-200 py-10 md:grid-cols-[1fr_auto] md:items-center">
            <h2 className="font-serif text-2xl leading-snug text-stone-900">{TITLE}</h2>
            <span className={black}>Créer mon alerte</span>
          </div>
        </section>

        <section>
          <Label k="B" name="Carte jaune" note="Un aplat du jaune de la marque : on ne peut pas la manquer." />
          <div className="grid gap-x-12 gap-y-6 rounded-[20px] bg-[#F4E7B5] p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
            <h2 className="font-serif text-3xl leading-tight text-stone-900 md:text-4xl">{TITLE}</h2>
            <span className={black}>Créer mon alerte</span>
          </div>
        </section>

        <section>
          <Label k="C" name="Carte noire" note="Fond noir, bouton jaune : le moment fort de la page." />
          <div className="grid gap-x-12 gap-y-6 rounded-[20px] bg-stone-900 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
            <h2 className="font-serif text-3xl leading-tight text-white md:text-4xl">{TITLE}</h2>
            <span className={yellow}>Créer mon alerte</span>
          </div>
        </section>

        <section>
          <Label k="D" name="Centrée" note="Sans cadre : le titre en grand, le bouton dessous." />
          <div className="py-10 text-center">
            <h2 className="mx-auto max-w-3xl font-serif text-3xl leading-tight text-stone-900 md:text-5xl">
              Le bien que vous cherchez n’est peut-être pas <span className="italic [background:linear-gradient(transparent_62%,#F4E7B5_62%)]">encore en ligne.</span>
            </h2>
            <span className={`${black} mt-8`}>Créer mon alerte</span>
          </div>
        </section>

        <section>
          <Label k="E" name="Carte blanche à la cloche" note="Une carte blanche arrondie, une cloche dans une pastille jaune." />
          <div className="flex flex-wrap items-center gap-x-8 gap-y-5 rounded-[20px] border border-stone-200 bg-white p-6 md:p-8">
            <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-[#F4E7B5]">
              <Bell className="h-6 w-6 text-stone-900" strokeWidth={1.75} />
            </span>
            <h2 className="min-w-[16rem] flex-1 font-serif text-2xl leading-snug text-stone-900">{TITLE}</h2>
            <span className={black}>Créer mon alerte</span>
          </div>
        </section>
      </div>
    </div>
  );
}
