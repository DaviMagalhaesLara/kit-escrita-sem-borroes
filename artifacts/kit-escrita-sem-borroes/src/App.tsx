import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  FileDown,
  Hand,
  Heart,
  Maximize2,
  Menu,
  MapPin,
  PartyPopper,
  Pencil,
  Printer,
  Quote,
  ShoppingBag,
  Smile,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from 'lucide-react';

import './index.css';

// Edite somente este endereço para apontar para o seu checkout.
export const CHECKOUT_URL = 'https://pay.kiwify.com.br/gidtVTn';

// Seção que contém o botão principal de compra (com preço e o que vem no produto).
const MAIN_CHECKOUT_SECTION_ID = 'comprar';

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function scrollToMainCheckout(event?: { preventDefault: () => void }) {
  event?.preventDefault();
  scrollTo(MAIN_CHECKOUT_SECTION_ID);
}

function PurchaseLink({
  children,
  className = '',
  testId,
  variant = 'scroll',
}: {
  children: ReactNode;
  className?: string;
  testId: string;
  /** 'checkout' vai direto para o Kiwify (reservado ao botão principal). 'scroll' desce até o botão principal. */
  variant?: 'checkout' | 'scroll';
}) {
  const isCheckout = variant === 'checkout';
  return (
    <a
      href={isCheckout ? CHECKOUT_URL : `#${MAIN_CHECKOUT_SECTION_ID}`}
      onClick={isCheckout ? undefined : scrollToMainCheckout}
      data-testid={testId}
      className={`btn-lift inline-flex items-center justify-center gap-2 rounded-full bg-[hsl(var(--secondary))] px-6 py-3.5 text-sm font-bold text-[hsl(var(--foreground))] no-underline ${className}`}
    >
      {children}
    </a>
  );
}

function LogoMark() {
  return (
    <div className="flex items-center gap-2.5" data-testid="brand-logo">
      <span className="relative flex h-10 w-10 items-center justify-center rounded-[13px] bg-[hsl(var(--primary))] text-[hsl(var(--secondary))]">
        <Pencil size={19} strokeWidth={2.5} />
        <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-[hsl(var(--background))] bg-[hsl(var(--accent))]" />
      </span>
      <span className="font-display text-[19px] font-bold leading-[.9] tracking-[-.04em]">
        escrita
        <br />
        sem borrões
      </span>
    </div>
  );
}

function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={`eyebrow mb-4 flex items-center gap-3 ${light ? 'text-[hsl(var(--secondary))]' : 'text-[hsl(var(--accent))]'}`}>
      <span className="h-px w-8 bg-current" />
      {children}
    </div>
  );
}

function PagePreview({
  number,
  title,
  kind,
}: {
  number: string;
  title: string;
  kind: 'trace' | 'syllable' | 'text';
}) {
  return (
    <div className="group relative rotate-[-2deg] rounded-[4px] border border-[#d8cdbb] bg-[#fffdf8] p-4 shadow-[7px_9px_0_rgba(23,50,77,.13)] transition-transform duration-300 hover:rotate-0" data-testid={`card-preview-${kind}`}>
      <div className="mb-3 flex items-center justify-between font-mono-label text-[8px] font-bold uppercase tracking-[.14em] text-[#7c7b71]">
        <span>página {number}</span>
        <span className="h-2 w-2 rounded-full bg-[#e96957]" />
      </div>
      <div className="font-display text-[23px] font-bold leading-none text-[#17324d]">{title}</div>
      {kind === 'trace' && (
        <div className="mt-5 space-y-2">
          <div className="flex items-center gap-2 text-[34px] font-bold text-[#d8cdbb]"><span>A</span><span className="text-[18px] text-[#e96957]">→</span><span className="text-[#f5b84b]">A</span></div>
          <div className="h-px border-t border-dashed border-[#d8cdbb]" />
          <div className="flex gap-2">{[1, 2, 3, 4].map((i) => <span key={i} className="h-5 w-5 rounded-full border-2 border-dashed border-[#f5b84b]" />)}</div>
        </div>
      )}
      {kind === 'syllable' && (
        <div className="mt-5">
          <div className="grid grid-cols-2 gap-2">
            {['PA', 'PE', 'PI', 'PO'].map((s, i) => <div key={s} className={`rounded-md border-2 p-2 text-center font-mono-label text-[13px] font-bold ${i === 1 ? 'border-[#e96957] bg-[#fff0eb] text-[#e96957]' : 'border-dashed border-[#d8cdbb] text-[#17324d]'}`}>{s}</div>)}
          </div>
          <div className="mt-4 h-2 w-24 rounded bg-[#d8cdbb]" />
        </div>
      )}
      {kind === 'text' && (
        <div className="mt-5">
          <div className="rounded-lg bg-[#f8edcf] p-3">
            <div className="mb-2 flex gap-1"><span className="h-2 w-2 rounded-full bg-[#e96957]" /><span className="h-2 w-2 rounded-full bg-[#f5b84b]" /></div>
            <p className="font-display text-[13px] leading-[1.25] text-[#17324d]">A pipoca pula na panela.</p>
          </div>
          <div className="mt-3 flex gap-1">{[1, 2, 3, 4, 5].map((i) => <span key={i} className="h-1.5 flex-1 rounded bg-[#d8cdbb]" />)}</div>
        </div>
      )}
    </div>
  );
}

const EBOOK_SAMPLES = [
  { page: 1, title: 'Vamos começar!', subtitle: 'Guia para pais e professoras', image: 'ebook-samples/page-01.png' },
  { page: 6, title: 'Caminhos', subtitle: 'Aquecimento e coordenação', image: 'ebook-samples/page-06.png' },
  { page: 10, title: 'Arcos', subtitle: 'Pré-escrita', image: 'ebook-samples/page-10.png' },
  { page: 15, title: 'Letras maiúsculas', subtitle: 'Observe, cubra e pratique', image: 'ebook-samples/page-15.png' },
  { page: 25, title: 'Sílabas', subtitle: 'Observe, copie e escreva', image: 'ebook-samples/page-25.png' },
  { page: 30, title: 'Mais palavras', subtitle: 'Palavras do dia a dia', image: 'ebook-samples/page-30.png' },
  { page: 40, title: 'Texto 2', subtitle: 'Pequenos textos', image: 'ebook-samples/page-40.png' },
] as const;

const ebookAssetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const TESTIMONIALS = [
  {
    name: 'Carlos Eduardo',
    location: 'Rio de Janeiro',
    quote: 'Meu filho conseguiu escrever com autonomia e está se dando muito bem!! Atividades muito práticas e divertidas, ele amou! Muito obrigado!',
  },
  {
    name: 'Renata de Oliveira',
    location: 'Minas Gerais',
    quote: 'A escrita da minha filha se desenvolveu de uma maneira absurda! Ela se divertiu demais fazendo as atividades e aprendeu a dominar sua mão esquerda! Desde já agradeço!',
  },
  {
    name: 'Anderson Santos',
    location: 'Recife',
    quote: 'Meus filhotinhos que nasceram canhotos aprenderam certinho a escrita com o seu material, tamo junto demais!!',
  },
] as const;

const RECENT_PURCHASES = [
  'Lucas Machado',
  'Gabriel Souza',
  'Ingrid de Jesus',
  'Milena Pereira',
] as const;

function StarRating({ label = '5,0 de 5 estrelas' }: { label?: string }) {
  return (
    <div className="flex items-center gap-1" aria-label={label}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} size={15} fill="currentColor" strokeWidth={1.5} className="text-[#f5b84b]" aria-hidden="true" />
      ))}
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section id="avaliacoes" className="section-pad scroll-mt-20 border-y border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
      <div className="container-wide">
        <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <SectionLabel>Quem já colocou a mão na massa</SectionLabel>
            <h2 className="max-w-3xl font-display text-[clamp(2.7rem,5vw,4.7rem)] font-bold leading-[.9] tracking-[-.06em] text-[hsl(var(--primary))]">
              Pequenas conquistas que merecem um “muito bem!”.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
              Avaliações recebidas de famílias que já experimentaram as atividades do Kit Escrita Sem Borrões.
            </p>
          </div>
          <div className="rating-summary rounded-[22px] border border-[hsl(var(--secondary))] bg-[hsl(var(--card))] px-6 py-5 text-center shadow-[5px_6px_0_rgba(23,50,77,.08)]">
            <div className="font-mono-label text-[9px] font-bold uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">avaliação média</div>
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="font-display text-4xl font-bold leading-none text-[hsl(var(--primary))]">4,9</span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">/ 5</span>
            </div>
            <StarRating label="4,9 de 5 estrelas" />
            <div className="mt-2 text-[10px] font-bold text-[hsl(var(--muted-foreground))]">mais de 4,7 estrelas</div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <article key={testimonial.name} className={`testimonial-card rounded-[24px] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-7 ${index === 1 ? 'lg:-translate-y-3' : ''}`} data-testid={`testimonial-card-${index}`}>
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0c7] text-[hsl(var(--accent))]">
                  <Quote size={20} fill="currentColor" strokeWidth={1.5} />
                </span>
                <StarRating />
              </div>
              <blockquote className="mt-6 font-display text-[21px] font-bold leading-[1.12] text-[hsl(var(--primary))]">“{testimonial.quote}”</blockquote>
              <div className="mt-7 border-t border-[hsl(var(--border))] pt-5">
                <div className="text-sm font-bold text-[hsl(var(--primary))]">{testimonial.name}</div>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))]">
                  <MapPin size={13} className="text-[hsl(var(--accent))]" />
                  {testimonial.location}
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-7 text-center font-mono-label text-[9px] font-bold uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">
          Depoimentos compartilhados por clientes
        </p>
      </div>
    </section>
  );
}

function PurchaseNotification({ customer, exiting }: { customer: string; exiting: boolean }) {
  return (
    <div
      className={`purchase-notification${exiting ? ' is-exiting' : ''}`}
      role="status"
      aria-live="polite"
      data-testid="purchase-notification"
    >
      <div className="flex items-start gap-3">
        <span className="purchase-notification-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d9f1ec] text-[hsl(var(--primary))]">
          <ShoppingBag size={18} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold leading-5 text-[hsl(var(--primary))]">
            {customer} acabou de comprar o kit
          </p>
        </div>
      </div>
    </div>
  );
}

function EbookCarouselSlot() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const pointerStart = useRef<number | null>(null);

  const goTo = (index: number) => {
    setActiveIndex((index + EBOOK_SAMPLES.length) % EBOOK_SAMPLES.length);
  };

  const goNext = () => goTo(activeIndex + 1);
  const goPrevious = () => goTo(activeIndex - 1);

  useEffect(() => {
    if (modalIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setModalIndex(null);
      if (event.key === 'ArrowRight') setModalIndex((index) => index === null ? null : (index + 1) % EBOOK_SAMPLES.length);
      if (event.key === 'ArrowLeft') setModalIndex((index) => index === null ? null : (index - 1 + EBOOK_SAMPLES.length) % EBOOK_SAMPLES.length);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [modalIndex]);

  const samplePositions = [
    { index: (activeIndex - 1 + EBOOK_SAMPLES.length) % EBOOK_SAMPLES.length, position: 'prev' },
    { index: activeIndex, position: 'center' },
    { index: (activeIndex + 1) % EBOOK_SAMPLES.length, position: 'next' },
  ] as const;

  return (
    <div id="ebook-carousel" className="ebook-carousel mt-16 scroll-mt-24 rounded-[28px] border border-[hsl(var(--secondary))]/70 bg-[hsl(var(--card))]/[.06] p-4 md:p-7" data-testid="ebook-carousel-slot" aria-label="Carrossel com amostras reais do e-book">
      <div className="carousel-panel relative overflow-hidden rounded-[23px] p-5 md:p-8">
        <span className="carousel-doodle carousel-doodle-one" aria-hidden="true">✦</span>
        <span className="carousel-doodle carousel-doodle-two" aria-hidden="true">✷</span>
        <span className="carousel-doodle carousel-doodle-three" aria-hidden="true">●</span>
        <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3 py-2 font-mono-label text-[9px] font-bold uppercase tracking-[.13em] text-[#17324d] shadow-[3px_4px_0_rgba(23,50,77,.08)]">
              <Pencil size={12} className="text-[#e96957]" />
              folheie comigo
            </div>
            <h3 className="mt-4 max-w-lg font-display text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[.9] tracking-[-.05em] text-[#17324d]">Um pouquinho do que acontece em cada página.</h3>
          </div>
          <div className="flex items-center gap-2 text-right font-mono-label text-[9px] font-bold uppercase tracking-[.12em] text-[#17324d]/60">
            <BookOpen size={16} className="text-[#e96957]" />
            <span>7 amostras reais<br />de 50 páginas</span>
          </div>
        </div>

        <div
          className="carousel-stage relative z-10 mt-8 touch-pan-y"
          onPointerDown={(event) => { pointerStart.current = event.clientX; }}
          onPointerUp={(event) => {
            if (pointerStart.current === null) return;
            const distance = event.clientX - pointerStart.current;
            if (Math.abs(distance) > 45) distance < 0 ? goNext() : goPrevious();
            pointerStart.current = null;
          }}
          onPointerCancel={() => { pointerStart.current = null; }}
          data-testid="ebook-carousel-stage"
        >
          {samplePositions.map(({ index, position }) => {
            const sample = EBOOK_SAMPLES[index];
            const isCenter = position === 'center';
            return (
              <button
                key={`${sample.page}-${position}`}
                type="button"
                className={`carousel-slide is-${position}`}
                onClick={() => isCenter ? setModalIndex(index) : goTo(index)}
                aria-label={isCenter ? `Ampliar amostra da página ${sample.page}` : `Mostrar amostra da página ${sample.page}`}
                data-testid={`carousel-slide-${sample.page}`}
              >
                <span className="carousel-page-tag">página {sample.page}</span>
                <img src={ebookAssetUrl(sample.image)} alt={`Página ${sample.page}: ${sample.title}`} draggable="false" />
                {isCenter && <span className="carousel-zoom-hint"><Maximize2 size={13} /> ampliar</span>}
              </button>
            );
          })}
        </div>

        <div className="relative z-10 mt-5 flex items-center justify-center gap-3">
          <button type="button" onClick={goPrevious} className="carousel-control" aria-label="Amostra anterior" data-testid="button-carousel-previous"><ChevronLeft size={19} /></button>
          <div className="flex items-center gap-2" aria-label={`Amostra ${activeIndex + 1} de ${EBOOK_SAMPLES.length}`}>
            {EBOOK_SAMPLES.map((sample, index) => (
              <button
                key={sample.page}
                type="button"
                onClick={() => goTo(index)}
                className={`carousel-dot ${index === activeIndex ? 'is-active' : ''}`}
                aria-label={`Ir para a página ${sample.page}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                data-testid={`button-carousel-dot-${sample.page}`}
              />
            ))}
          </div>
          <button type="button" onClick={goNext} className="carousel-control" aria-label="Próxima amostra" data-testid="button-carousel-next"><ChevronRight size={19} /></button>
        </div>
        <div className="relative z-10 mt-4 flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
          <p className="font-display text-xl font-bold text-[#17324d]">{EBOOK_SAMPLES[activeIndex].title}</p>
          <p className="font-mono-label text-[9px] font-bold uppercase tracking-[.12em] text-[#17324d]/55">{EBOOK_SAMPLES[activeIndex].subtitle} · deslize para ver mais</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 px-1 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <p className="flex items-center justify-center gap-2 font-mono-label text-[9px] font-bold uppercase tracking-[.12em] text-[hsl(var(--secondary))] md:justify-start"><Sparkles size={13} /> páginas reais do kit</p>
        <p className="text-xs text-[hsl(var(--card))]/65">Clique na página central para ampliar.</p>
      </div>

      {modalIndex !== null && (
        <div className="carousel-lightbox fixed inset-0 z-[70] flex items-center justify-center bg-[#10263b]/90 p-4 backdrop-blur-sm" onClick={(event) => { if (event.currentTarget === event.target) setModalIndex(null); }} role="dialog" aria-modal="true" aria-label={`Visualização ampliada da página ${EBOOK_SAMPLES[modalIndex].page}`}>
          <button type="button" onClick={() => setModalIndex(null)} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25" aria-label="Fechar visualização" data-testid="button-carousel-close"><X size={22} /></button>
          <button type="button" onClick={() => setModalIndex((modalIndex - 1 + EBOOK_SAMPLES.length) % EBOOK_SAMPLES.length)} className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 md:left-8" aria-label="Página ampliada anterior" data-testid="button-lightbox-previous"><ChevronLeft size={25} /></button>
          <div className="relative max-h-[92vh] max-w-[min(82vw,660px)]">
            <img className="max-h-[92vh] max-w-full rounded-[4px] bg-white object-contain shadow-[0_20px_80px_rgba(0,0,0,.35)]" src={ebookAssetUrl(EBOOK_SAMPLES[modalIndex].image)} alt={`Página ${EBOOK_SAMPLES[modalIndex].page}: ${EBOOK_SAMPLES[modalIndex].title}`} />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-[#17324d]/90 px-4 py-2 font-mono-label text-[9px] font-bold uppercase tracking-[.12em] text-white">página {EBOOK_SAMPLES[modalIndex].page} · {EBOOK_SAMPLES[modalIndex].title}</div>
          </div>
          <button type="button" onClick={() => setModalIndex((modalIndex + 1) % EBOOK_SAMPLES.length)} className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 md:right-8" aria-label="Próxima página ampliada" data-testid="button-lightbox-next"><ChevronRight size={25} /></button>
        </div>
      )}
    </div>
  );
}

function FaqItem({
  question,
  answer,
  open,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div className="border-b border-[hsl(var(--border))]" data-testid={`faq-item-${index}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        data-testid={`button-faq-${index}`}
        className="flex w-full items-center justify-between gap-5 py-5 text-left font-display text-[19px] font-bold text-[hsl(var(--primary))]"
      >
        <span>{question}</span>
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--muted))] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          <ChevronDown size={17} />
        </span>
      </button>
      <div className="faq-answer" data-open={open} aria-hidden={!open}>
        <div>
          <p className="max-w-2xl pb-5 pr-12 text-sm leading-7 text-[hsl(var(--muted-foreground))]">{answer}</p>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [purchaseIndex, setPurchaseIndex] = useState(0);
  const [notificationPhase, setNotificationPhase] = useState<'visible' | 'exiting' | 'hidden'>('visible');
  const navItems = [
    { label: 'Por dentro', id: 'por-dentro' },
    { label: 'Amostras', id: 'amostras' },
    { label: 'Como funciona', id: 'como-funciona' },
    { label: 'Avaliações', id: 'avaliacoes' },
    { label: 'Dúvidas', id: 'duvidas' },
  ];
  const faqs = [
    ['É um material físico?', 'Não. Você recebe um arquivo PDF digital com 50 páginas para imprimir em casa, em folhas A4. Assim, a criança pode escrever, apagar e repetir no próprio ritmo.'],
    ['Para qual idade o kit é indicado?', 'O conteúdo foi pensado para crianças aproximadamente entre 4 e 7 anos, acompanhando diferentes momentos da descoberta da escrita. Um adulto pode escolher as atividades que fazem sentido para cada criança.'],
    ['Preciso de uma impressora especial?', 'Não. Uma impressora doméstica comum dá conta. Imprima as páginas em papel A4, de preferência com gramatura a partir de 90 g/m², e use um lápis confortável.'],
    ['A criança precisa escrever com a mão esquerda?', 'Sim. O kit foi organizado para crianças canhotas, com orientações visuais e espaço que tornam o uso da folha mais confortável para quem escreve com a mão esquerda.'],
    ['Como recebo o arquivo?', 'Depois da confirmação da compra, o acesso ao PDF é enviado conforme as instruções do checkout. O arquivo pode ser baixado e impresso quando você quiser.'],
  ];

  useEffect(() => {
    const visibleDuration = 3000;
    const fadeOutDuration = 400;
    const hiddenDuration = 5000;

    let timeoutId: number;

    const runPhase = (phase: 'visible' | 'exiting' | 'hidden') => {
      const delay =
        phase === 'visible' ? visibleDuration : phase === 'exiting' ? fadeOutDuration : hiddenDuration;

      timeoutId = window.setTimeout(() => {
        if (phase === 'visible') {
          setNotificationPhase('exiting');
          runPhase('exiting');
        } else if (phase === 'exiting') {
          setNotificationPhase('hidden');
          runPhase('hidden');
        } else {
          setPurchaseIndex((index) => (index + 1) % RECENT_PURCHASES.length);
          setNotificationPhase('visible');
          runPhase('visible');
        }
      }, delay);
    };

    runPhase('visible');

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <main className="site-shell min-h-[100dvh] bg-[hsl(var(--background))]">
      <header className="sticky top-0 z-40 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/95 backdrop-blur-md">
        <div className="container-wide flex h-[76px] items-center justify-between">
          <a href="#inicio" onClick={() => scrollTo('inicio')} aria-label="Ir para o início" data-testid="link-brand">
            <LogoMark />
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Navegação principal">
            {navItems.map((item) => (
              <button key={item.id} type="button" onClick={() => scrollTo(item.id)} data-testid={`button-nav-${item.id}`} className="text-xs font-bold text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))]">
                {item.label}
              </button>
            ))}
          </nav>
          <div className="hidden md:block">
            <PurchaseLink testId="link-header-checkout" className="px-5 py-2.5 text-xs">Quero o kit <ArrowRight size={14} /></PurchaseLink>
          </div>
          <button type="button" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} data-testid="button-mobile-menu" className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--muted))] md:hidden">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 pb-5 pt-3 md:hidden">
            {navItems.map((item) => (
              <button key={item.id} type="button" onClick={() => { scrollTo(item.id); setMenuOpen(false); }} data-testid={`button-mobile-nav-${item.id}`} className="block w-full border-b border-[hsl(var(--border))] py-3 text-left text-sm font-bold">
                {item.label}
              </button>
            ))}
            <PurchaseLink testId="link-mobile-menu-checkout" className="mt-4 w-full">Quero o kit <ArrowRight size={15} /></PurchaseLink>
          </div>
        )}
      </header>

      <section id="inicio" className="relative overflow-hidden border-b border-[hsl(var(--border))]">
        <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-[hsl(var(--secondary))]/25 blur-3xl" />
        <div className="absolute bottom-0 left-[-8rem] h-80 w-80 rounded-full bg-[hsl(var(--accent))]/10 blur-3xl" />
        <div className="container-wide grid min-h-[650px] items-center gap-8 py-16 md:grid-cols-[1.02fr_.98fr] md:py-20">
          <div className="relative z-10">
            <div className="reveal inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 font-mono-label text-[9px] font-bold uppercase tracking-[.13em] text-[hsl(var(--muted-foreground))]">
              <span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
              PDF A4 · 50 páginas · para imprimir
            </div>
            <h1 className="reveal reveal-delay-1 mt-7 max-w-[650px] font-display text-[clamp(3.15rem,7vw,6.2rem)] font-bold leading-[.87] tracking-[-.065em] text-[hsl(var(--primary))]">
              Um caderno de escrita feito pensando em quem escreve com a <span className="relative inline-block text-[hsl(var(--accent))]">mão esquerda.</span>
            </h1>
            <div className="kid-hello reveal reveal-delay-2 mt-6 inline-flex items-center gap-2 rounded-full border border-[#b6ddd5] bg-[#e8f7f3] px-3 py-2 text-sm font-bold text-[#17324d]">
              <Smile size={17} className="text-[#e96957]" />
              <span>Oi, pequeno escritor! Vamos começar?</span>
              <span className="kid-hello-stars" aria-hidden="true">✦ ✦</span>
            </div>
            <p className="reveal reveal-delay-2 mt-7 max-w-[490px] text-[17px] leading-7 text-[hsl(var(--muted-foreground))]">
              50 páginas para brincar de traçar, descobrir letras, juntar sílabas e escrever as primeiras frases — prontas para imprimir e fazer em casa.
            </p>
            <div className="reveal reveal-delay-3 mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <PurchaseLink testId="link-hero-checkout" className="w-full px-7 py-4 sm:w-auto">Quero o Kit Escrita Sem Borrões <ArrowRight size={17} /></PurchaseLink>
              <button type="button" onClick={() => scrollTo('amostras')} data-testid="button-hero-samples" className="group inline-flex items-center gap-2 px-1 py-2 text-sm font-bold text-[hsl(var(--primary))]">
                Ver páginas por dentro <ArrowDown size={16} className="transition-transform group-hover:translate-y-1" />
              </button>
            </div>
            <div className="mt-8 flex items-center gap-4 font-mono-label text-[9px] font-bold uppercase tracking-[.08em] text-[hsl(var(--muted-foreground))]">
              <span className="flex items-center gap-1.5"><CircleCheck size={14} className="text-[hsl(var(--accent))]" /> acesso digital</span>
              <span className="h-3 w-px bg-[hsl(var(--border))]" />
              <span className="flex items-center gap-1.5"><CircleCheck size={14} className="text-[hsl(var(--accent))]" /> uso em casa</span>
            </div>
          </div>
          <div className="reveal reveal-delay-2 relative">
            <div className="relative mx-auto max-w-[560px] md:mx-0 md:ml-auto md:w-[calc(100%+2rem)] md:max-w-none lg:w-[calc(100%+5rem)] xl:w-[calc(100%+8rem)]">
              <img
                src={ebookAssetUrl('kit-mockup-hero.jpg')}
                alt="Mockup do Kit Escrita Sem Borrões: capa do caderno com 50 páginas para canhotos e prévia das páginas de caligrafia"
                className="book-float page-shadow w-full rounded-[20px] border border-[hsl(var(--border))]"
                loading="eager"
                data-testid="img-hero-mockup"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[hsl(var(--border))] bg-[hsl(var(--primary))] text-[hsl(var(--card))]">
        <div className="container-wide grid grid-cols-1 divide-y divide-[hsl(var(--card))]/20 py-1 md:grid-cols-3 md:divide-x md:divide-y-0">
          {[
            [Printer, 'Prepare a brincadeira', 'Folhas A4, lápis e um cantinho gostoso'],
            [Hand, 'Mão esquerda, do seu jeito', 'Orientações que acompanham cada pequeno movimento'],
            [Pencil, 'Vamos tentar?', 'Atividades curtas para praticar sem pressa'],
          ].map(([Icon, title, detail], index) => {
            const IconComponent = Icon as typeof Printer;
            return (
              <div key={title as string} className="flex items-center gap-4 px-2 py-5 md:px-8" data-testid={`feature-strip-${index}`}>
                <IconComponent size={25} strokeWidth={1.6} className={`shrink-0 ${['text-[hsl(var(--secondary))]', 'text-[#a9e0d4]', 'text-[#ffc7d1]'][index]}`} />
                <div><div className="font-display text-lg font-bold">{title as string}</div><div className="mt-0.5 text-xs text-[hsl(var(--card))]/65">{detail as string}</div></div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-pad bg-[hsl(var(--muted))]">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Feito desde o começo para canhotos</SectionLabel>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[.9] tracking-[-.06em] text-[hsl(var(--primary))]">Por que um material específico?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">Em vez de adaptar um material genérico depois, o Kit foi estruturado desde o início pensando na experiência da criança canhota.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              [Pencil, 'Posicionamento', 'Orientações visuais para encontrar uma posição confortável para o papel e a escrita.'],
              [Hand, 'Movimento', 'Atividades com indicações visuais de movimento e direção dos traços.'],
              [FileDown, 'Prática', 'Folhas preparadas para imprimir e preencher diretamente com lápis.'],
            ].map(([Icon, title, detail], index) => {
              const IconComponent = Icon as typeof Pencil;
              return (
                <div key={title as string} className="rounded-[22px] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-7 transition-transform duration-300 hover:-translate-y-1" data-testid={`card-why-${index}`}>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-[hsl(var(--primary))] ${['bg-[#ffd86e]', 'bg-[#b7e6dc]', 'bg-[#ffc7d1]'][index]}`}><IconComponent size={21} strokeWidth={1.8} /></div>
                  <h3 className="mt-9 font-display text-[24px] font-bold text-[hsl(var(--primary))]">{title as string}</h3>
                  <p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{detail as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="por-dentro" className="section-pad scroll-mt-20">
        <div className="container-wide">
          <div className="grid gap-12 md:grid-cols-[.72fr_1.28fr] md:gap-20">
            <div>
              <SectionLabel>Do primeiro traço ao “eu consegui!”</SectionLabel>
              <h2 className="font-display text-[clamp(2.6rem,5vw,4.4rem)] font-bold leading-[.92] tracking-[-.055em] text-[hsl(var(--primary))]">Cada página prepara a próxima aventura.</h2>
              <p className="mt-6 max-w-sm text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">A criança começa com movimentos gostosos de fazer e vai ganhando confiança até formar suas primeiras frases. Um passo de cada vez, com espaço para comemorar.</p>
              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d9f1ec] text-[hsl(var(--primary))]"><BookOpen size={19} /></div>
                <div><div className="text-sm font-bold">50 páginas para explorar</div><div className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))]">do “vamos tentar?” ao certificado</div></div>
              </div>
              <div className="kid-note mt-4 flex items-center gap-2 text-sm font-bold text-[hsl(var(--primary))]"><Star size={16} fill="currentColor" className="text-[#f5b84b]" /><span>Todo rabisco pode virar uma descoberta.</span></div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['01', 'Coordenação motora', 'Linhas, curvas e caminhos para aquecer a mão e o olhar.'],
                ['02', 'Letras maiúsculas e minúsculas', 'Traçados guiados para experimentar cada formato.'],
                ['03', 'Sílabas, palavras e frases', 'A escrita cresce em passos curtos e possíveis.'],
                ['04', 'Desafios + certificado', 'Um final para celebrar o caminho percorrido.'],
              ].map(([number, title, detail], index) => (
                <div key={number} className={`group rounded-[22px] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 ${index === 1 ? 'translate-y-5 bg-[hsl(var(--secondary))]' : ''} ${index === 3 ? 'translate-y-5 bg-[hsl(var(--accent))] text-[hsl(var(--card))]' : ''}`} data-testid={`card-module-${number}`}>
                  <div className="font-mono-label text-[10px] font-bold tracking-[.12em] opacity-55">{number}</div>
                  <div className="mt-12 font-display text-[22px] font-bold leading-[1.05]">{title}</div>
                  <p className="mt-3 text-sm leading-6 opacity-70">{detail}</p>
                  <ArrowRight size={18} className="mt-6 transition-transform group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="amostras" className="scroll-mt-20 bg-[hsl(var(--primary))] py-20 text-[hsl(var(--card))] md:py-28">
        <div className="container-wide">
          <div className="grid items-end gap-8 md:grid-cols-[1fr_.72fr]">
            <div>
              <SectionLabel light>Abra o caderno</SectionLabel>
              <h2 className="max-w-2xl font-display text-[clamp(2.7rem,6vw,5.2rem)] font-bold leading-[.88] tracking-[-.06em]">Atividades que parecem brincadeira. E ensinam de verdade.</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-[hsl(var(--card))]/65 md:pb-2">Um gostinho da variedade do kit: traçar, reconhecer, juntar, ler, escrever e comemorar.</p>
          </div>
          <div className="mt-14 grid gap-7 md:grid-cols-3 md:items-start">
            <div className="md:mt-8"><PagePreview number="08" title="Siga o caminho" kind="trace" /></div>
            <div><PagePreview number="24" title="Junte as sílabas" kind="syllable" /></div>
            <div className="md:mt-14"><PagePreview number="39" title="Leia e escreva" kind="text" /></div>
          </div>
          <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-[hsl(var(--card))]/20 pt-7 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3"><Sparkles size={19} className="text-[hsl(var(--secondary))]" /><span className="font-display text-xl font-bold">Material simples, bonito e possível.</span></div>
            <button type="button" onClick={() => scrollTo('comprar')} data-testid="button-samples-buy" className="inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--secondary))]">Quero começar em casa <ArrowRight size={15} /></button>
          </div>
          <EbookCarouselSlot />
        </div>
      </section>

      <section id="como-funciona" className="section-pad scroll-mt-20">
        <div className="container-wide">
          <div className="grid gap-12 md:grid-cols-[.8fr_1.2fr] md:gap-24">
            <div>
              <SectionLabel>Passo a passo, sem pressa</SectionLabel>
              <h2 className="font-display text-[clamp(2.7rem,5vw,4.5rem)] font-bold leading-[.9] tracking-[-.06em] text-[hsl(var(--primary))]">Uma rotina pequena que vira aventura.</h2>
            </div>
            <div className="relative">
              <div className="absolute bottom-8 left-[17px] top-8 w-px bg-[hsl(var(--border))]" />
              {[
                ['01', 'Escolha uma missão', 'Comece por uma página e diga: “vamos tentar juntos?”.'],
                ['02', 'Prepare a mesa', 'Escolha papel A4, um lápis confortável e um cantinho tranquilo.'],
                ['03', 'Trace, brinque e tente', 'Acompanhe sem corrigir cada traço. O importante é experimentar.'],
                ['04', 'Comemore o “consegui!”', 'Volte quando quiser e repita a atividade no ritmo da criança.'],
              ].map(([number, title, detail]) => (
                <div key={number} className="relative flex gap-6 pb-9 last:pb-0" data-testid={`step-${number}`}>
                  <span className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--background))] bg-[hsl(var(--secondary))] font-mono-label text-[10px] font-bold text-[hsl(var(--primary))] shadow-[0_0_0_1px_hsl(var(--border))]">{number}</span>
                  <div><h3 className="font-display text-[24px] font-bold leading-none text-[hsl(var(--primary))]">{title}</h3><p className="mt-2 max-w-md text-sm leading-6 text-[hsl(var(--muted-foreground))]">{detail}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="conteudo" className="border-y border-[hsl(var(--border))] bg-[hsl(var(--muted))] py-20 md:py-28">
        <div className="container-wide grid items-center gap-12 md:grid-cols-[1.08fr_.92fr] md:gap-24">
          <div>
            <SectionLabel>O que vem no arquivo</SectionLabel>
            <h2 className="font-display text-[clamp(2.6rem,5vw,4.4rem)] font-bold leading-[.9] tracking-[-.06em] text-[hsl(var(--primary))]">Uma sequência completa, sem páginas soltas.</h2>
            <div className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {['Coordenação motora', 'Pré-escrita', 'Letras maiúsculas', 'Letras minúsculas', 'Sílabas', 'Palavras', 'Frases', 'Textos curtos', 'Desafios', 'Desafio final', 'Certificado'].map((item, index) => (
                <div key={item} className="flex items-center gap-2.5 text-sm font-bold text-[hsl(var(--primary))]" data-testid={`content-item-${index}`}><Check size={16} className="text-[hsl(var(--accent))]" />{item}</div>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[390px]">
            <div className="absolute -right-4 -top-4 rounded-full bg-[hsl(var(--accent))] px-4 py-2 font-mono-label text-[9px] font-bold uppercase tracking-[.1em] text-[hsl(var(--card))] shadow-[3px_4px_0_rgba(23,50,77,.12)]">página final</div>
            <div className="page-shadow rotate-3 rounded-[5px] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-7">
              <div className="flex items-center justify-between"><span className="font-mono-label text-[9px] font-bold uppercase tracking-[.1em] text-[hsl(var(--accent))]">meu certificado</span><Sparkles size={18} className="text-[hsl(var(--secondary))]" /></div>
              <div className="mt-12 text-center">
                <div className="font-display text-[42px] font-bold leading-[.85] tracking-[-.06em] text-[hsl(var(--primary))]">Muito bem!</div>
                <p className="mx-auto mt-4 max-w-[230px] text-xs leading-5 text-[hsl(var(--muted-foreground))]">Este certificado celebra cada tentativa, cada descoberta e cada palavra escrita.</p>
                <div className="mx-auto my-8 h-px w-44 bg-[hsl(var(--border))]" />
                <div className="font-mono-label text-[9px] uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]">nome da criança</div>
                <div className="mx-auto mt-5 h-px w-48 border-t border-dashed border-[hsl(var(--accent))]" />
              </div>
              <div className="mt-14 flex items-end justify-between"><div className="h-8 w-20 rounded-full border border-dashed border-[hsl(var(--secondary))]" /><Heart size={21} fill="currentColor" className="text-[hsl(var(--accent))]" /><div className="h-8 w-20 rounded-full border border-dashed border-[hsl(var(--secondary))]" /></div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <section id="comprar" className="section-pad scroll-mt-20">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-[30px] bg-[hsl(var(--accent))] px-6 py-12 text-[hsl(var(--card))] md:px-16 md:py-16">
            <div className="absolute -right-14 -top-20 h-60 w-60 rounded-full border-[35px] border-[hsl(var(--card))]/10" />
            <div className="absolute -bottom-32 right-28 h-64 w-64 rounded-full border-[20px] border-[hsl(var(--card))]/10" />
            <div className="relative grid items-center gap-10 md:grid-cols-[1fr_auto]">
              <div>
                <SectionLabel light>Pronto para a mesa?</SectionLabel>
                <h2 className="max-w-xl font-display text-[clamp(2.7rem,5vw,4.9rem)] font-bold leading-[.88] tracking-[-.06em]">A próxima página pode começar hoje.</h2>
                <p className="mt-5 max-w-md text-sm leading-6 text-[hsl(var(--card))]/75">Um único kit digital para imprimir, guardar e revisitar sempre que a criança quiser escrever.</p>
              </div>
              <div className="rounded-[22px] bg-[hsl(var(--card))] p-6 text-[hsl(var(--primary))] shadow-[8px_9px_0_rgba(23,50,77,.15)] md:min-w-[280px]">
                <div className="font-mono-label text-[9px] font-bold uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">kit completo em PDF</div>
                <ul className="mt-4 space-y-2">
                  {[
                    'Módulo de Coordenação Motora',
                    'Módulo de Pré-Escrita',
                    'Módulo Completo de Letras',
                    'Módulo de Sílabas',
                    'Módulo de Palavras',
                    'Módulo de Frases',
                    'Módulo de Pequenos Textos',
                    'Desafios de Escrita',
                    'Certificado de Conclusão',
                  ].map((item, index) => (
                    <li key={item} className="flex items-center gap-2 text-[13px] font-bold leading-tight" data-testid={`pricing-item-${index}`}>
                      <CircleCheck size={16} className="shrink-0 text-[hsl(var(--accent))]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 border-t border-[hsl(var(--border))] pt-4">
                  <div className="text-sm font-bold text-[hsl(var(--muted-foreground))] line-through">R$ 47,90</div>
                  <div className="mt-1 flex items-end gap-2"><span className="font-display text-5xl font-bold leading-none tracking-[-.06em]">R$ 19,90</span></div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]"><FileDown size={15} /> acesso digital após a compra</div>
                <PurchaseLink testId="link-main-checkout" variant="checkout" className="mt-6 w-full bg-[hsl(var(--primary))] text-[hsl(var(--card))]">Quero meu kit <ArrowRight size={16} /></PurchaseLink>
                <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] font-bold text-[hsl(var(--muted-foreground))]"><ShieldCheck size={14} className="text-[hsl(var(--accent))]" /> compra segura pelo checkout</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {notificationPhase !== 'hidden' && (
        <PurchaseNotification
          key={purchaseIndex}
          customer={RECENT_PURCHASES[purchaseIndex]}
          exiting={notificationPhase === 'exiting'}
        />
      )}

      <section className="border-y border-[hsl(var(--border))] bg-[hsl(var(--muted))] py-20 md:py-24">
        <div className="container-wide">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[24px] border border-[hsl(var(--accent))]/35 bg-[hsl(var(--card))] p-7 md:p-9">
              <div className="eyebrow text-[hsl(var(--accent))]">É para você se</div>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[.95] tracking-[-.05em] text-[hsl(var(--primary))]">Você quer praticar junto, no papel.</h2>
              <ul className="mt-7 space-y-4 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                {['Procura atividades de escrita para uma criança canhota.', 'Quer um material físico para imprimir em casa.', 'Está na fase inicial da alfabetização.', 'Prefere um material organizado por etapas.'].map((item) => (
                  <li key={item} className="flex items-start gap-3"><Check size={17} className="mt-1 shrink-0 text-[hsl(var(--accent))]" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[24px] border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-7 md:p-9">
              <div className="eyebrow text-[hsl(var(--muted-foreground))]">Não é para você se</div>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[.95] tracking-[-.05em] text-[hsl(var(--primary))]">O que você procura é outra coisa.</h2>
              <ul className="mt-7 space-y-4 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                {['Procura um curso completo de alfabetização.', 'Busca aulas particulares ou acompanhamento individual.', 'Precisa de material exclusivamente para crianças já alfabetizadas.'].map((item) => (
                  <li key={item} className="flex items-start gap-3"><X size={17} className="mt-1 shrink-0 text-[hsl(var(--accent))]" />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="duvidas" className="section-pad scroll-mt-20 border-t border-[hsl(var(--border))]">
        <div className="container-wide grid gap-12 md:grid-cols-[.8fr_1.2fr] md:gap-24">
          <div>
            <SectionLabel>Antes de abrir o PDF</SectionLabel>
            <h2 className="font-display text-[clamp(2.8rem,5vw,4.5rem)] font-bold leading-[.9] tracking-[-.06em] text-[hsl(var(--primary))]">Ficou uma pergunta?</h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-[hsl(var(--muted-foreground))]">Reunimos os detalhes que ajudam a decidir se este é o próximo caderno da sua criança.</p>
          </div>
          <div>
            {faqs.map(([question, answer], index) => (
              <FaqItem key={question} question={question} answer={answer} index={index} open={openFaq === index} onToggle={() => setOpenFaq(openFaq === index ? null : index)} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[hsl(var(--primary))] py-20 text-[hsl(var(--card))] md:py-28">
        <div className="absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border-[30px] border-[hsl(var(--secondary))]/15" />
        <div className="container-wide relative text-center">
          <SectionLabel light>Vamos escrever juntos?</SectionLabel>
          <h2 className="mx-auto max-w-3xl font-display text-[clamp(2.8rem,6vw,5.2rem)] font-bold leading-[.88] tracking-[-.06em]">Toda grande história começa com um pequeno traço.</h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[hsl(var(--card))]/70">Tenha 50 páginas de atividades organizadas para acompanhar cada tentativa, cada descoberta e cada “olha o que eu fiz!”.</p>
          <PurchaseLink testId="link-final-checkout" className="mt-8 px-7 py-4"><PartyPopper size={17} /> Quero começar a brincadeira <ArrowRight size={17} /></PurchaseLink>
          <div className="mt-5 font-mono-label text-[9px] font-bold uppercase tracking-[.12em] text-[hsl(var(--card))]/50">PDF imprimível · 50 páginas · para crianças canhotas</div>
        </div>
      </section>

      <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--primary))] py-10 pb-28 text-[hsl(var(--card))] md:pb-10">
        <div className="container-wide flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div><LogoMark /><p className="mt-5 max-w-xs text-xs leading-5 text-[hsl(var(--card))]/55">Um material de papel e lápis para acompanhar o começo de muitas histórias.</p></div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-[hsl(var(--card))]/70">
            <button type="button" onClick={() => scrollTo('inicio')} data-testid="button-footer-top">Voltar ao início</button>
            <button type="button" onClick={() => scrollTo('duvidas')} data-testid="button-footer-faq">Dúvidas</button>
            <a href={CHECKOUT_URL} data-testid="link-footer-checkout" className="text-[hsl(var(--secondary))]">Ir para o checkout</a>
          </div>
        </div>
        <div className="container-wide mt-8 border-t border-[hsl(var(--card))]/15 pt-5 font-mono-label text-[9px] uppercase tracking-[.12em] text-[hsl(var(--card))]/40">Kit Escrita Sem Borrões · material digital em PDF</div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[hsl(var(--border))] bg-[hsl(var(--card))]/95 p-3 shadow-[0_-8px_25px_rgba(23,50,77,.1)] backdrop-blur-md md:hidden">
        <div className="mx-auto flex max-w-[600px] items-center justify-between gap-3">
          <div><div className="font-mono-label text-[8px] font-bold uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]">kit completo · PDF A4</div><div className="flex items-baseline gap-2"><span className="text-xs font-bold text-[hsl(var(--muted-foreground))] line-through">R$ 47,90</span><span className="font-display text-xl font-bold text-[hsl(var(--primary))]">R$ 19,90</span></div></div>
          <PurchaseLink testId="link-mobile-fixed-checkout" className="px-5 py-3 text-xs">Quero o kit <ArrowRight size={14} /></PurchaseLink>
        </div>
      </div>
    </main>
  );
}

function App() {
  return <Home />;
}

export default App;