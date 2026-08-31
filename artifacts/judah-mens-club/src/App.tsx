import { type AnchorHTMLAttributes, type FormEvent, type ReactNode, useState } from 'react';
import { ArrowRight, Clock3, Instagram, MapPin, Menu, Phone, Scissors, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const WHATSAPP = 'https://wa.me/351965832312';

const services = [
  { number: '01', name: 'Corte Judah', description: 'Consultoria, corte e finalização', price: '€ 22' },
  { number: '02', name: 'Corte + Barba', description: 'O ritual completo de precisão', price: '€ 32' },
  { number: '03', name: 'Barba & Contornos', description: 'Esculpida à navalha, sem pressa', price: '€ 16' },
  { number: '04', name: 'Corte Júnior', description: 'Dos 6 aos 12 anos', price: '€ 16' },
  { number: '05', name: 'The Full Experience', description: 'Corte, barba, toalha quente e massagem', price: '€ 42' },
];

const priceRows = [
  ['Corte clássico', 'Corte à tesoura e máquina', '€ 22'],
  ['Corte degradé', 'Precisão milimétrica', '€ 24'],
  ['Barba completa', 'Toalha quente incluída', '€ 16'],
  ['Corte & barba', 'O nosso ritual assinatura', '€ 32'],
  ['The Full Experience', 'Corte, barba, ritual e massagem', '€ 42'],
  ['Corte júnior', 'Dos 6 aos 12 anos', '€ 16'],
];

function AppLink({ children, href, className = '', onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; href: string }) {
  return <a href={href} className={className} onClick={onClick} {...props}>{children}</a>;
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState('');
  const [service, setService] = useState('Corte Judah');
  const [status, setStatus] = useState('');

  const closeMenu = () => setMenuOpen(false);
  const handleBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = `Olá, Judah. Sou ${name || 'um novo cliente'} e gostaria de agendar ${service}.`;
    window.open(`${WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setStatus('A conversa abriu no WhatsApp. Até já.');
  };

  return (
    <div className="site-shell min-h-[100dvh]">
      <header>
        <div className="topbar">Atendimento por marcação · Viseu · Portugal</div>
        <nav className={`nav-shell ${menuOpen ? 'menu-open' : ''}`} aria-label="Navegação principal">
          <div className="nav-inner">
            <AppLink href="#top" className="wordmark" onClick={closeMenu}>
              <img
                className="wordmark-logo"
                src="/judah-logo.png"
                alt="Judah Studio Barbershop"
              />
              <span className="wordmark-name">Men&apos;s Club<span className="wordmark-sub">Barbearia privada</span></span>
            </AppLink>
            <div className="nav-links">
              <AppLink href="#experiencia" onClick={closeMenu}>A casa</AppLink>
              <AppLink href="#servicos" onClick={closeMenu}>Serviços</AppLink>
              <AppLink href="#galeria" onClick={closeMenu}>Galeria</AppLink>
              <AppLink href="#visita" onClick={closeMenu}>Visite-nos</AppLink>
              <AppLink href={WHATSAPP} className="nav-book" onClick={closeMenu}>Agendar horário</AppLink>
            </div>
            <button type="button" className="menu-button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} data-testid="button-mobile-menu">
              {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-content">
            <div className="hero-logo" aria-label="Logótipo Judah Studio Barbershop">
              <img src="/judah-logo.png" alt="Judah Studio Barbershop" />
            </div>
            <div className="hero-kicker eyebrow"><span>Est. 2019</span><span className="hairline" style={{ width: 46 }} /><span>Viseu · PT</span></div>
            <h1 className="hero-title" id="hero-title">Mais que<br /><em>um corte.</em><br />Uma experiência.</h1>
            <div className="hero-footer">
              <p className="hero-copy">Um espaço para abrandar o ritmo, afinar a presença e sair exatamente como quer ser visto.</p>
              <AppLink href={WHATSAPP} className="arrow-link">Agendar horário <ArrowRight size={16} strokeWidth={1} /></AppLink>
              <span className="hero-index">01 / 07</span>
            </div>
          </div>
        </section>

        <section className="intro section-wrap" id="experiencia" aria-labelledby="intro-title">
          <div className="intro-grid">
            <div>
              <span className="intro-number">01</span>
              <p className="eyebrow" style={{ marginTop: 26 }}>A casa Judah</p>
            </div>
            <div>
              <h2 className="intro-heading" id="intro-title">O seu tempo.<br /><em>Bem investido.</em></h2>
              <p className="intro-text">A Judah nasceu de uma ideia simples: um corte pode mudar a forma como entramos no mundo. Aqui, cada visita é um ritual. A luz, a música, a toalha quente, a conversa — tudo tem o seu lugar.</p>
              <p className="intro-text" style={{ marginTop: 18 }}>Trabalhamos com técnica, atenção e a convicção de que o luxo verdadeiro não precisa de fazer barulho.</p>
              <p className="signature">Bem-vindo à sua casa.</p>
            </div>
          </div>
        </section>

        <section className="feature-band" aria-label="O ritual Judah">
          <div className="feature-image" role="img" aria-label="Detalhe de um corte masculino na Judah" />
          <div className="feature-panel">
            <span className="eyebrow">O ritual</span>
            <h2>Precisão<br />é uma<br /><em>forma de respeito.</em></h2>
            <div className="feature-rule" />
            <p>Não há duas cabeças iguais. Antes da máquina, há uma conversa. Antes do espelho, há intenção. O resultado é seu — a nossa assinatura está nos detalhes.</p>
          </div>
        </section>

        <section className="services section-wrap" id="servicos" aria-labelledby="services-title">
          <div className="section-header">
            <div><span className="eyebrow">02 / O menu</span><h2 className="section-title" id="services-title">Serviços</h2></div>
            <p className="section-header-copy">Escolha o ritual que combina com o seu momento. Se tiver dúvidas, falamos consigo.</p>
          </div>
          <div className="service-list">
            {services.map((item) => (
              <div className="service-item" key={item.number} data-testid={`service-${item.number}`}>
                <span className="service-num">{item.number}</span>
                <div><div className="service-name">{item.name}</div><div className="service-description">{item.description}</div></div>
                <span className="service-price">{item.price}</span>
                <AppLink href={WHATSAPP} aria-label={`Agendar ${item.name}`}><ArrowRight size={18} strokeWidth={1} /></AppLink>
              </div>
            ))}
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track"><span>Tempo para si</span><span>·</span><span>Precisão Judah</span><span>·</span><span>Uma experiência</span><span>·</span><span>Tempo para si</span><span>·</span><span>Precisão Judah</span><span>·</span><span>Uma experiência</span></div>
        </div>

        <section className="pricing dark-panel" id="precos" aria-labelledby="pricing-title">
          <div className="section-wrap">
            <div className="section-header">
              <div><span className="eyebrow">03 / Investimento</span><h2 className="section-title" id="pricing-title">A tabela.</h2></div>
              <p className="section-header-copy">A qualidade não é um extra. É o ponto de partida de cada serviço Judah.</p>
            </div>
            <div className="price-grid">
              {priceRows.map(([title, note, price], index) => (
                <div className="price-row" key={title} data-testid={`price-${index}`}>
                  <div><div className="price-row-name">{title}</div><div className="price-row-note">{note}</div></div>
                  <strong>{price}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="gallery section-wrap" id="galeria" aria-labelledby="gallery-title">
          <div className="gallery-intro">
            <div><span className="eyebrow">04 / Dentro da Judah</span><h2 className="section-title" id="gallery-title">O ambiente.</h2></div>
            <p>Uma pausa com boa luz, boas conversas e nenhum detalhe deixado ao acaso.</p>
          </div>
          <div className="gallery-grid">
            <figure className="gallery-image"><img loading="lazy" src="https://images.pexels.com/photos/1570806/pexels-photo-1570806.jpeg?auto=compress&cs=tinysrgb&w=1000" alt="Barbeiro a trabalhar num corte de precisão" /></figure>
            <figure className="gallery-image"><img loading="lazy" src="https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&w=1000" alt="Cadeira e espelho de uma barbearia" /></figure>
            <figure className="gallery-image"><img loading="lazy" src="https://images.pexels.com/photos/3998426/pexels-photo-3998426.jpeg?auto=compress&cs=tinysrgb&w=1000" alt="Detalhe de acabamento de barba" /></figure>
            <figure className="gallery-image"><img loading="lazy" src="https://images.pexels.com/photos/15777323/pexels-photo-15777323.jpeg?auto=compress&cs=tinysrgb&w=1000" alt="Ferramentas profissionais de barbearia" /></figure>
          </div>
          <div className="gallery-caption"><span>Judah Men&apos;s Club</span><span>O detalhe fica.</span></div>
        </section>

        <section className="booking" id="agendar" aria-labelledby="booking-title">
          <div className="section-wrap booking-grid">
            <div>
              <span className="eyebrow" style={{ color: 'var(--ink)' }}>05 / A sua vez</span>
              <h2 id="booking-title">Reserve<br />o seu<br /><em>momento.</em></h2>
              <p>Indique-nos o seu nome e o serviço que procura. A nossa equipa responde no WhatsApp e encontra consigo a melhor hora.</p>
              <form className="booking-form" onSubmit={handleBooking}>
                <input aria-label="O seu nome" required value={name} onChange={(event) => setName(event.target.value)} placeholder="O seu nome" data-testid="input-booking-name" />
                <select aria-label="Escolha um serviço" value={service} onChange={(event) => setService(event.target.value)} data-testid="select-booking-service">
                  {services.map((item) => <option key={item.name}>{item.name}</option>)}
                </select>
                <button type="submit" data-testid="button-booking-submit">Agendar online <ArrowRight size={14} /></button>
                {status && <span className="form-status" role="status" data-testid="status-booking">{status}</span>}
              </form>
            </div>
            <div className="booking-options">
              <div className="booking-option"><span>WhatsApp</span><AppLink href={WHATSAPP}>+351 965 832 312</AppLink></div>
              <div className="booking-option"><span>Resposta rápida</span><AppLink href={WHATSAPP}>Falar connosco <ArrowRight size={15} /></AppLink></div>
              <div className="booking-option"><span>Sem compromisso</span><AppLink href={WHATSAPP}>Agendar horário <ArrowRight size={15} /></AppLink></div>
            </div>
          </div>
        </section>

        <section className="visit section-wrap" id="visita" aria-labelledby="visit-title">
          <div className="visit-grid">
            <div>
              <span className="eyebrow">06 / Encontramo-nos aqui</span>
              <h2 id="visit-title">Venha<br /><em>conhecer-nos.</em></h2>
              <div className="hours" aria-label="Horário de funcionamento">
                <div className="hours-row"><span>Terça — Sexta</span><span>09:30 — 19:30</span></div>
                <div className="hours-row"><span>Sábado</span><span>09:00 — 18:00</span></div>
                <div className="hours-row"><span>Domingo — Segunda</span><span>Encerrado</span></div>
              </div>
            </div>
            <div className="visit-card">
              <Clock3 size={20} color="var(--gold)" strokeWidth={1} />
              <h3>Uma morada<br />com carácter.</h3>
              <p>Viseu<br />Portugal</p>
              <div className="visit-links">
                <AppLink href="https://maps.google.com/?q=Viseu+Portugal" target="_blank" rel="noreferrer"><MapPin size={13} /> Abrir mapas</AppLink>
                <AppLink href={WHATSAPP}><Phone size={13} /> +351 965 832 312</AppLink>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contactos">
        <div className="section-wrap">
          <div className="footer-top">
            <div className="footer-brand">Judah<br /><em>Men&apos;s Club.</em><small>Mais que um corte. Uma experiência.</small></div>
            <div className="footer-contact">
              <AppLink href={WHATSAPP}><Phone size={14} /> +351 965 832 312</AppLink>
              <AppLink href="https://instagram.com/judah_mensclub" target="_blank" rel="noreferrer"><Instagram size={14} /> @judah_mensclub</AppLink>
              <AppLink href="mailto:ola@judahmensclub.pt">ola@judahmensclub.pt</AppLink>
            </div>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} Judah Men&apos;s Club</span><span>Precisão · Ritual · Presença</span></div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;