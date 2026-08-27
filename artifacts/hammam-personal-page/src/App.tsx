import { useEffect, useState, type FormEvent } from 'react';
import QRCode from 'qrcode';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Github,
  Globe2,
  LineChart,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  QrCode,
  Rocket,
  Send,
  Sun,
  UserRoundPlus,
  X,
} from 'lucide-react';

type Lang = 'en' | 'ar';
type Localized = { en: string; ar: string };

const copy = {
  nav: {
    about: { en: 'About', ar: 'نبذة' },
    services: { en: 'Services', ar: 'الخدمات' },
    work: { en: 'Selected work', ar: 'أعمال مختارة' },
    contact: { en: "Let's talk", ar: 'لنتحدث' },
  },
  hero: {
    eyebrow: { en: 'Independent digital partner · Amman, Jordan', ar: 'شريك رقمي مستقل · عمّان، الأردن' },
    titleA: { en: 'Build a digital', ar: 'نبني حضوراً' },
    titleB: { en: 'presence that moves.', ar: 'رقمياً يتحرّك.' },
    body: { en: 'I help ambitious people and teams turn sharp ideas into useful products, clear brands, and measurable growth.', ar: 'أساعد الأشخاص والفرق الطموحة على تحويل الأفكار الواضحة إلى منتجات مفيدة، وعلامات مؤثرة، ونمو قابل للقياس.' },
    cta: { en: 'Start a conversation', ar: 'ابدأ محادثة' },
    work: { en: 'Explore the work', ar: 'استكشف الأعمال' },
    availability: { en: 'Available for select projects', ar: 'متاح لمشاريع مختارة' },
  },
  about: {
    kicker: { en: '01 / A little context', ar: '٠١ / لمحة' },
    title: { en: 'Technical thinking. Human outcomes.', ar: 'تفكير تقني. ونتائج إنسانية.' },
    p1: { en: 'I’m Hammam Ali Omar Taha — a software engineer, web developer, designer, and the founder of Norv.ai.', ar: 'أنا همام علي عمر طه — مهندس برمجيات ومطور ويب ومصمم، ومؤسس Norv.ai.' },
    p2: { en: 'My work sits at the useful intersection of technology, design, and promotion. I care about the details people feel: speed, clarity, trust, and the one next action that makes sense.', ar: 'يقع عملي عند التقاطع المفيد بين التقنية والتصميم والترويج. أهتم بالتفاصيل التي يشعر بها الناس: السرعة، والوضوح، والثقة، والخطوة التالية المنطقية.' },
    note: { en: 'Good digital work should make the complex feel obvious.', ar: 'العمل الرقمي الجيد يجعل المعقد يبدو بديهياً.' },
  },
  services: {
    kicker: { en: '02 / What I do', ar: '٠٢ / ماذا أقدم' },
    title: { en: 'A compact team of one.', ar: 'فريق متكامل، بشخص واحد.' },
    intro: { en: 'From first sketch to the first real customer, I bring the strategy and the craft together.', ar: 'من أول رسم إلى أول عميل حقيقي، أجمع بين الاستراتيجية والتنفيذ المتقن.' },
  },
  work: {
    kicker: { en: '03 / Selected work', ar: '٠٣ / أعمال مختارة' },
    title: { en: 'Built to be useful.', ar: 'صُممت لتكون مفيدة.' },
    intro: { en: 'A couple of ideas I’ve taken from a blank page into the world.', ar: 'بعض الأفكار التي نقلتها من صفحة بيضاء إلى العالم.' },
  },
  connect: {
    kicker: { en: '04 / Keep in touch', ar: '٠٤ / ابقَ على تواصل' },
    title: { en: 'One scan. Every way to connect.', ar: 'مسح واحد. وكل طرق التواصل.' },
    intro: { en: 'Save the QR for later, add my details to your contacts, or choose the fastest way to reach me now.', ar: 'احفظ رمز QR لوقت لاحق، أو أضف بياناتي إلى جهات الاتصال، أو اختر أسرع طريقة للتواصل الآن.' },
    qrLabel: { en: 'Scan to visit my website', ar: 'امسح لزيارة موقعي' },
    live: { en: 'Live personal website', ar: 'الموقع الشخصي المباشر' },
    qrLoading: { en: 'Preparing QR…', ar: 'جارٍ تجهيز رمز QR…' },
    qrUnavailable: { en: 'QR unavailable', ar: 'رمز QR غير متاح حالياً' },
    download: { en: 'Download QR code', ar: 'تنزيل رمز QR' },
    vcard: { en: 'Save contact card', ar: 'حفظ بطاقة التواصل' },
    actions: { en: 'Quick links', ar: 'روابط سريعة' },
    call: { en: 'Call me', ar: 'اتصل بي' },
    whatsapp: { en: 'WhatsApp', ar: 'واتساب' },
    email: { en: 'Email me', ar: 'راسلني بالبريد' },
    norv: { en: 'Visit Norv.ai', ar: 'زيارة Norv.ai' },
    linkedin: { en: 'LinkedIn', ar: 'لينكدإن' },
    github: { en: 'GitHub', ar: 'غيت هب' },
  },
  contact: {
    kicker: { en: '05 / Your next move', ar: '٠٥ / خطوتك التالية' },
    title: { en: 'Have something worth building?', ar: 'لديك شيء يستحق البناء؟' },
    intro: { en: 'Tell me the useful version. I’ll reply with a clear point of view and a practical next step.', ar: 'أخبرني عن النسخة المفيدة من فكرتك. سأرد برؤية واضحة وخطوة عملية تالية.' },
    name: { en: 'Your name', ar: 'اسمك' },
    email: { en: 'Email address', ar: 'البريد الإلكتروني' },
    project: { en: 'What are we building?', ar: 'ماذا سنبني؟' },
    intent: { en: 'How can I help?', ar: 'كيف يمكنني مساعدتك؟' },
    intentOptions: {
      subscribe: { en: 'Subscribe / stay in touch', ar: 'الاشتراك / البقاء على تواصل' },
      hire: { en: 'Hire me for a project', ar: 'توظيفي لمشروع' },
      consultation: { en: 'Request a growth consultation', ar: 'طلب استشارة نمو' },
    },
    send: { en: 'Send the brief', ar: 'أرسل التفاصيل' },
    success: { en: 'Your email draft is ready. I’ll be in touch soon.', ar: 'تم تجهيز مسودة البريد. سأتواصل معك قريباً.' },
    error: { en: 'Please add your name, a valid email, and a short project note.', ar: 'يرجى إضافة الاسم وبريد إلكتروني صحيح ووصف مختصر للمشروع.' },
  },
} as const;

const services = [
  {
    number: '01',
    icon: Code2,
    title: { en: 'Smart Web Development', ar: 'تطوير ويب ذكي' },
    text: { en: 'Fast, responsive websites and focused web apps that make your offer easy to understand and easier to choose.', ar: 'مواقع وتطبيقات ويب سريعة ومتجاوبة تجعل عرضك سهل الفهم وأسهل في الاختيار.' },
    tags: { en: 'Websites · Web apps · UI systems', ar: 'مواقع · تطبيقات ويب · أنظمة واجهة' },
  },
  {
    number: '02',
    icon: Rocket,
    title: { en: 'Norv.ai Solutions', ar: 'حلول Norv.ai' },
    text: { en: 'Practical AI systems that remove friction from everyday work — without the theatre or the black box.', ar: 'أنظمة ذكاء اصطناعي عملية تزيل التعقيد من العمل اليومي — بلا استعراض أو صندوق أسود.' },
    tags: { en: 'Automation · AI workflows · Prototypes', ar: 'أتمتة · مسارات ذكاء اصطناعي · نماذج أولية' },
  },
  {
    number: '03',
    icon: LineChart,
    title: { en: 'Growth & Promotion Strategies', ar: 'استراتيجيات النمو والترويج' },
    text: { en: 'Clear campaigns, content direction, and conversion paths that turn attention into momentum.', ar: 'حملات واضحة، وتوجيه للمحتوى، ومسارات تحويل تحوّل الانتباه إلى زخم.' },
    tags: { en: 'Positioning · Campaigns · Conversion', ar: 'تموضع · حملات · تحويل' },
  },
] satisfies Array<{ number: string; icon: typeof Code2; title: Localized; text: Localized; tags: Localized }>;

function t(value: Localized, lang: Lang) {
  return value[lang];
}

const LIVE_SITE_URL = 'https://hammam-personal-landing-page.replit.app';
const PHONE_NUMBER = '+962781764789';
const DISPLAY_PHONE_NUMBER = '+962 78 176 4789';
const EMAIL_ADDRESS = 'hamamhmam72@gmail.com';

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function Header({
  lang,
  setLang,
  dark,
  setDark,
}: {
  lang: Lang;
  setLang: (lang: Lang) => void;
  dark: boolean;
  setDark: (dark: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const navItems = [
    { href: '#about', label: t(copy.nav.about, lang) },
    { href: '#services', label: t(copy.nav.services, lang) },
    { href: '#work', label: t(copy.nav.work, lang) },
  ];
  const jump = () => setOpen(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:px-12">
        <a href="#top" className="group flex items-center gap-3" data-testid="link-brand">
          <span className="grid size-9 place-items-center bg-foreground font-display text-sm font-bold text-background transition-transform group-hover:rotate-[-8deg]">H</span>
          <span className="hidden font-mono-custom text-[10px] uppercase tracking-[.18em] text-muted-foreground sm:inline">Hammam / digital</span>
        </a>
        <nav className={`${open ? 'absolute left-4 right-4 top-[82px] flex' : 'hidden'} flex-col gap-1 rounded-2xl border border-border bg-card p-3 shadow-xl md:static md:flex md:flex-row md:items-center md:gap-7 md:border-0 md:bg-transparent md:p-0 md:shadow-none`} aria-label="Primary navigation">
           {navItems.map((item) => (
             <a key={item.href} href={item.href} onClick={jump} className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:min-h-0 md:px-0 md:py-1 md:hover:bg-transparent" data-testid={`link-nav-${item.href.slice(1)}`}>{item.label}</a>
          ))}
          <a href="#contact" onClick={jump} className="mt-2 flex items-center justify-between gap-3 rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 md:mt-0 md:justify-start md:rounded-none md:px-3 md:py-2" data-testid="link-nav-contact">
             {t(copy.nav.contact, lang)} <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </nav>
        <div className="flex items-center gap-2">
             <button type="button" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="flex min-h-11 items-center gap-1 rounded-full border border-border px-3 font-mono-custom text-[10px] uppercase tracking-[.14em] transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'} data-testid="button-language">
            <Globe2 size={14} aria-hidden="true" /> {lang === 'en' ? 'عربي' : 'EN'}
          </button>
           <button type="button" onClick={() => setDark(!dark)} className="grid size-11 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label={dark ? 'Use day theme' : 'Use night theme'} data-testid="button-theme">
            {dark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
          </button>
           <button type="button" onClick={() => setOpen(!open)} className="grid size-11 place-items-center rounded-full border border-border md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} data-testid="button-menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function ContactLink({ href, icon: Icon, label, value, external = true, onCopy }: { href: string; icon: typeof Phone; label: string; value: string; external?: boolean; onCopy?: () => void }) {
  return (
    <div className="group flex items-center justify-between gap-4 border-t border-border py-4">
      <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className="flex min-w-0 items-center gap-3" data-testid={`link-contact-${label.toLowerCase().replaceAll(' ', '-')}`}>
        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors group-hover:border-accent group-hover:text-foreground"><Icon size={16} aria-hidden="true" /></span>
        <span className="min-w-0"><span className="block font-mono-custom text-[10px] uppercase tracking-[.14em] text-muted-foreground">{label}</span><span className="block truncate text-sm font-medium">{value}</span></span>
      </a>
      {onCopy && <button type="button" onClick={onCopy} className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label={`Copy ${value}`} data-testid={`button-copy-${label.toLowerCase()}`}><Copy size={15} /></button>}
    </div>
  );
}

function Home() {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('hammam-lang') as Lang) || 'en');
  const [dark, setDark] = useState(() => localStorage.getItem('hammam-theme') !== 'light');
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [qrCodeError, setQrCodeError] = useState(false);
  useReveal();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('hammam-theme', dark ? 'dark' : 'light');
    localStorage.setItem('hammam-lang', lang);
  }, [dark, lang]);

  useEffect(() => {
    let active = true;

    QRCode.toDataURL(LIVE_SITE_URL, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 720,
      color: {
        dark: '#111917',
        light: '#ffffff',
      },
    })
      .then((url) => {
        if (active) setQrCodeUrl(url);
      })
      .catch(() => {
        if (active) setQrCodeError(true);
      });

    return () => {
      active = false;
    };
  }, []);

  const sendBrief = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const intent = String(data.get('intent') || '').trim();
    const project = String(data.get('project') || '').trim();
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !intent || project.length < 12) {
      setFormError(true);
      setSent(false);
      return;
    }
    setFormError(false);
    const subject = encodeURIComponent(`Project enquiry from ${name}`);
     const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nIntent: ${intent}\n\nProject:\n${project}`);
    window.location.href = `mailto:hamamhmam72@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    event.currentTarget.reset();
  };

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(DISPLAY_PHONE_NUMBER);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const downloadQrCode = () => {
    if (!qrCodeUrl) return;
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'hammam-personal-website-qr.png';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const downloadVCard = () => {
    const vCard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Taha;Hammam Ali Omar;;;',
      'FN:Hammam Ali Omar Taha',
      'ORG:Norv.ai',
      'TITLE:Software Engineer & Founder',
      `TEL;TYPE=CELL,VOICE:${PHONE_NUMBER}`,
      `EMAIL;TYPE=INTERNET:${EMAIL_ADDRESS}`,
      `URL;TYPE=WORK:${LIVE_SITE_URL}`,
      'URL;TYPE=WORK:https://norvapp.com/auth/login',
      'URL;TYPE=LinkedIn:https://www.linkedin.com/in/hammam-alhawamdeh',
      'URL;TYPE=GitHub:https://github.com/hamamhmam72-cmd',
      'END:VCARD',
      '',
    ].join('\r\n');
    const link = document.createElement('a');
    const objectUrl = URL.createObjectURL(new Blob([vCard], { type: 'text/vcard;charset=utf-8' }));
    link.href = objectUrl;
    link.download = 'hammam-ali-omar-taha.vcf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
  };

  const quickLinks = [
    { href: `tel:${PHONE_NUMBER}`, icon: Phone, label: t(copy.connect.call, lang), value: DISPLAY_PHONE_NUMBER, external: false },
    { href: `https://wa.me/${PHONE_NUMBER.slice(1)}`, icon: MessageCircle, label: t(copy.connect.whatsapp, lang), value: '@Hammam', external: true },
    { href: `mailto:${EMAIL_ADDRESS}`, icon: Mail, label: t(copy.connect.email, lang), value: EMAIL_ADDRESS, external: false },
    { href: 'https://norvapp.com/auth/login', icon: ExternalLink, label: t(copy.connect.norv, lang), value: 'norvapp.com', external: true },
    { href: 'https://www.linkedin.com/in/hammam-alhawamdeh', icon: Linkedin, label: t(copy.connect.linkedin, lang), value: 'Hammam Alhawamdeh', external: true },
    { href: 'https://github.com/hamamhmam72-cmd', icon: Github, label: t(copy.connect.github, lang), value: '@hamamhmam72-cmd', external: true },
  ];

  return (
    <div id="top" className="noise min-h-[100dvh] bg-background">
      <Header lang={lang} setLang={setLang} dark={dark} setDark={setDark} />
      <main>
        <section className="relative overflow-hidden border-b border-border pt-[72px]" aria-labelledby="hero-title">
          <div className="mx-auto grid min-h-[calc(100dvh-72px)] max-w-[1440px] grid-cols-1 lg:grid-cols-[1.08fr_.92fr]">
             <div className="relative flex min-w-0 flex-col justify-center px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
              <div className="absolute left-5 top-8 h-px w-20 bg-accent sm:left-8 lg:left-12" />
              <p className="reveal font-mono-custom text-[10px] uppercase tracking-[.17em] text-muted-foreground">{t(copy.hero.eyebrow, lang)}</p>
              <h1 id="hero-title" className="reveal reveal-delay-1 mt-7 max-w-4xl break-words font-display text-[clamp(2.9rem,9vw,8.8rem)] font-medium leading-[.91] tracking-[-.075em] text-balance">
                {t(copy.hero.titleA, lang)}<br /><span className="text-muted-foreground">{t(copy.hero.titleB, lang)}</span>
              </h1>
              <p className="reveal reveal-delay-2 mt-8 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{t(copy.hero.body, lang)}</p>
               <div className="reveal reveal-delay-3 mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                 <a href="#contact" className="group inline-flex min-h-12 items-center justify-center gap-3 bg-accent px-5 py-3.5 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:justify-start" data-testid="link-hero-contact">
                  {t(copy.hero.cta, lang)} <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
                 <a href="#work" className="group inline-flex min-h-12 items-center justify-center gap-2 px-2 py-3.5 text-sm font-semibold underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:justify-start" data-testid="link-hero-work">
                  {t(copy.hero.work, lang)} <ArrowDownRight size={16} aria-hidden="true" />
                </a>
              </div>
              <div className="reveal reveal-delay-3 mt-20 flex items-center gap-3 font-mono-custom text-[10px] uppercase tracking-[.14em] text-muted-foreground"><span className="size-2 rounded-full bg-accent" /> {t(copy.hero.availability, lang)}</div>
            </div>
            <div className="relative flex min-h-[520px] items-end overflow-hidden bg-foreground px-5 pb-8 text-background sm:px-8 lg:min-h-0 lg:px-12 lg:pb-12">
              <img src={`${import.meta.env.BASE_URL}hammam-portrait.jpeg`} alt={lang === 'en' ? 'Hammam Ali Omar Taha' : 'همام علي عمر طه'} className="absolute inset-0 size-full object-cover object-top opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/35 to-foreground/5" />
              <div className="relative z-10 w-full">
                <div className="mb-9 flex items-start justify-between font-mono-custom text-[10px] uppercase tracking-[.14em] text-background/50"><span>HT / 2025</span><span>31°57′N<br />35°56′E</span></div>
                <div className="border-t border-background/20 pt-5">
                  <p className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-accent">Software engineer / founder</p>
                  <p className="mt-3 max-w-sm font-display text-3xl leading-tight tracking-[-.04em] sm:text-4xl">Technology should earn its place.</p>
                </div>
              </div>
              <span className="absolute bottom-8 right-5 font-mono-custom text-[10px] uppercase tracking-[.15em] text-background/45 sm:right-8 lg:right-12">Scroll to explore ↓</span>
            </div>
          </div>
        </section>

        <div className="overflow-hidden border-b border-border bg-foreground py-3 text-background">
          <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap font-mono-custom text-[10px] uppercase tracking-[.19em] text-background/65">
            {Array.from({ length: 2 }).map((_, group) => <div className="flex items-center gap-10" key={group}><span>Web development</span><span className="text-accent">+</span><span>Applied AI</span><span className="text-accent">+</span><span>Digital growth</span><span className="text-accent">+</span><span>Amman to everywhere</span><span className="text-accent">+</span></div>)}
          </div>
        </div>

        <section id="connect" className="relative overflow-hidden border-b border-border bg-secondary/45" aria-labelledby="connect-title">
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(hsl(var(--accent)/.45)_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="relative mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
            <div className="mb-12 grid gap-6 lg:grid-cols-[.38fr_1fr]">
              <p className="reveal font-mono-custom text-[10px] uppercase tracking-[.17em] text-muted-foreground">{t(copy.connect.kicker, lang)}</p>
              <div className="reveal reveal-delay-1">
                <h2 id="connect-title" className="max-w-3xl font-display text-4xl tracking-[-.055em] sm:text-6xl">{t(copy.connect.title, lang)}</h2>
                <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">{t(copy.connect.intro, lang)}</p>
              </div>
            </div>
            <div className="grid gap-5 lg:grid-cols-[.82fr_1.18fr]">
              <article className="reveal rounded-[1.5rem] border border-border/80 bg-card/70 p-5 shadow-[0_20px_60px_hsl(var(--foreground)/.08)] backdrop-blur-xl sm:p-8">
                <div className="flex items-center gap-3 font-mono-custom text-[10px] uppercase tracking-[.15em] text-muted-foreground"><QrCode size={15} className="text-accent" aria-hidden="true" /> {t(copy.connect.qrLabel, lang)}</div>
                <div className="mx-auto mt-6 aspect-square w-full max-w-[280px] rounded-2xl border border-border bg-white p-3 shadow-sm">
                  {qrCodeUrl ? <img src={qrCodeUrl} alt={t(copy.connect.qrLabel, lang)} className="size-full rounded-lg object-contain" /> : <div className="grid size-full place-items-center rounded-lg bg-muted px-4 text-center text-sm text-muted-foreground">{t(qrCodeError ? copy.connect.qrUnavailable : copy.connect.qrLoading, lang)}</div>}
                </div>
                <p className="mt-5 text-center font-mono-custom text-[10px] uppercase tracking-[.12em] text-muted-foreground">{t(copy.connect.live, lang)}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <button type="button" onClick={downloadQrCode} disabled={!qrCodeUrl} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-foreground px-4 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card" data-testid="button-download-qr"><Download size={17} aria-hidden="true" /> {t(copy.connect.download, lang)}</button>
                  <button type="button" onClick={downloadVCard} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-background/50 px-4 text-sm font-semibold transition-colors hover:border-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card" data-testid="button-download-vcard"><UserRoundPlus size={17} aria-hidden="true" /> {t(copy.connect.vcard, lang)}</button>
                </div>
              </article>
              <div className="reveal reveal-delay-1 rounded-[1.5rem] border border-border/80 bg-card/70 p-5 shadow-[0_20px_60px_hsl(var(--foreground)/.08)] backdrop-blur-xl sm:p-8">
                <div className="flex items-center gap-3 font-mono-custom text-[10px] uppercase tracking-[.15em] text-muted-foreground"><ArrowUpRight size={15} className="text-accent" aria-hidden="true" /> {t(copy.connect.actions, lang)}</div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {quickLinks.map(({ href, icon: Icon, label, value, external }) => (
                    <a key={label} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className="group flex min-h-20 min-w-0 items-center gap-3 rounded-xl border border-border bg-background/55 p-4 transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" data-testid={`link-quick-${label.toLowerCase().replaceAll(' ', '-')}`}>
                      <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border text-accent transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground"><Icon size={18} aria-hidden="true" /></span>
                      <span className="min-w-0"><span className="block text-sm font-semibold">{label}</span><span className="block truncate pt-0.5 text-xs text-muted-foreground">{value}</span></span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-[1440px] scroll-mt-20 px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <div className="grid gap-12 lg:grid-cols-[.38fr_1fr_.55fr] lg:gap-16">
            <p className="reveal font-mono-custom text-[10px] uppercase tracking-[.17em] text-muted-foreground">{t(copy.about.kicker, lang)}</p>
            <div className="reveal reveal-delay-1">
              <h2 className="max-w-2xl font-display text-4xl leading-[1.05] tracking-[-.055em] sm:text-6xl">{t(copy.about.title, lang)}</h2>
              <div className="mt-8 max-w-2xl space-y-5 text-base leading-7 text-muted-foreground">
                <p>{t(copy.about.p1, lang)}</p><p>{t(copy.about.p2, lang)}</p>
              </div>
            </div>
            <blockquote className="reveal reveal-delay-2 self-end border-l-2 border-accent pl-5 text-xl font-medium leading-7 sm:text-2xl">“{t(copy.about.note, lang)}”<footer className="mt-5 font-mono-custom text-[10px] font-normal uppercase tracking-[.14em] text-muted-foreground">— Hammam</footer></blockquote>
          </div>
        </section>

        <section id="services" className="scroll-mt-20 bg-secondary/55" aria-labelledby="services-title">
          <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
            <div className="mb-14 grid gap-6 lg:grid-cols-[.38fr_1fr]">
              <p className="reveal font-mono-custom text-[10px] uppercase tracking-[.17em] text-muted-foreground">{t(copy.services.kicker, lang)}</p>
              <div className="reveal reveal-delay-1"><h2 id="services-title" className="font-display text-4xl tracking-[-.055em] sm:text-6xl">{t(copy.services.title, lang)}</h2><p className="mt-5 max-w-lg text-muted-foreground">{t(copy.services.intro, lang)}</p></div>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {services.map((service, index) => {
                const Icon = service.icon;
                 return <article key={service.number} className={`reveal reveal-delay-${Math.min(index + 1, 3)} group grid min-w-0 gap-5 py-7 sm:grid-cols-[.2fr_1fr_1.25fr_.8fr] sm:items-center sm:gap-8 sm:py-9`} data-testid={`card-service-${service.number}`}>
                  <span className="font-mono-custom text-xs text-muted-foreground">{service.number}</span>
                  <div className="flex items-center gap-4"><span className="grid size-11 shrink-0 place-items-center border border-border bg-card transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground"><Icon size={19} /></span><h3 className="font-display text-xl tracking-[-.03em] sm:text-2xl">{t(service.title, lang)}</h3></div>
                  <p className="max-w-md text-sm leading-6 text-muted-foreground">{t(service.text, lang)}</p>
                  <p className="font-mono-custom text-[10px] uppercase leading-5 tracking-[.1em] text-muted-foreground sm:text-right">{t(service.tags, lang)}</p>
                </article>;
              })}
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-[1440px] scroll-mt-20 px-5 py-24 sm:px-8 lg:px-12 lg:py-36" aria-labelledby="work-title">
          <div className="mb-14 grid gap-6 lg:grid-cols-[.38fr_1fr]"><p className="reveal font-mono-custom text-[10px] uppercase tracking-[.17em] text-muted-foreground">{t(copy.work.kicker, lang)}</p><div className="reveal reveal-delay-1"><h2 id="work-title" className="font-display text-4xl tracking-[-.055em] sm:text-6xl">{t(copy.work.title, lang)}</h2><p className="mt-5 text-muted-foreground">{t(copy.work.intro, lang)}</p></div></div>
          <div className="grid gap-5 lg:grid-cols-[1.4fr_.85fr]">
            <a href="https://norvapp.com/auth/login" target="_blank" rel="noreferrer" className="reveal group relative min-h-[360px] min-w-0 overflow-hidden bg-foreground p-5 text-background sm:min-h-[500px] sm:p-10" data-testid="link-project-norv">
              <img src={`${import.meta.env.BASE_URL}norv-dashboard.png`} alt={lang === 'en' ? 'Norv AI operational dashboard' : 'لوحة تحكم Norv للذكاء الاصطناعي'} className="absolute inset-0 size-full object-cover object-center opacity-55 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/55 to-foreground/10" />
              <div className="relative flex h-full flex-col justify-between"><div className="flex items-start justify-between"><span className="border border-background/30 px-3 py-1.5 font-mono-custom text-[10px] uppercase tracking-[.15em] text-background/65">Flagship / 01</span><ExternalLink size={20} className="text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div><div><p className="font-mono-custom text-[10px] uppercase tracking-[.15em] text-accent">Norv.ai</p><h3 className="mt-3 max-w-lg font-display text-5xl tracking-[-.07em] sm:text-7xl">Useful intelligence.</h3><p className="mt-5 max-w-md text-sm leading-6 text-background/60">{lang === 'en' ? 'A practical AI solutions studio for teams that want less friction and more forward motion.' : 'استوديو لحلول الذكاء الاصطناعي العملية للفرق التي تريد تعقيداً أقل وتقدماً أكثر.'}</p></div></div>
            </a>
             <a href="https://wa.me/962781764789" target="_blank" rel="noreferrer" className="reveal reveal-delay-1 group flex min-h-[360px] min-w-0 flex-col justify-between border border-border bg-card p-5 sm:min-h-[500px] sm:p-8" data-testid="link-project-whatsapp">
              <div className="flex items-start justify-between"><span className="border border-border px-3 py-1.5 font-mono-custom text-[10px] uppercase tracking-[.15em] text-muted-foreground">{lang === 'en' ? 'Let’s connect / 02' : 'لنتواصل / 02'}</span><MessageCircle size={20} className="text-accent transition-transform group-hover:scale-110" /></div>
              <div><div className="mb-7 grid size-24 place-items-center border border-accent/60 text-accent"><MessageCircle size={38} strokeWidth={1.5} /></div><p className="font-mono-custom text-[10px] uppercase tracking-[.15em] text-accent">WhatsApp</p><h3 className="mt-2 font-display text-4xl tracking-[-.06em] sm:text-5xl">{lang === 'en' ? 'Let’s talk.' : 'لنتحدث.'}</h3><p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">{lang === 'en' ? 'Have an idea, a project, or a question? Send me a message directly on WhatsApp.' : 'لديك فكرة أو مشروع أو سؤال؟ أرسل لي رسالة مباشرة عبر واتساب.'}</p></div>
            </a>
          </div>
        </section>

        <section id="contact" className="scroll-mt-20 bg-foreground text-background" aria-labelledby="contact-title">
          <div className="mx-auto grid max-w-[1440px] gap-16 px-5 py-24 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-24 lg:px-12 lg:py-36">
            <div><p className="reveal font-mono-custom text-[10px] uppercase tracking-[.17em] text-background/50">{t(copy.contact.kicker, lang)}</p><h2 id="contact-title" className="reveal reveal-delay-1 mt-7 max-w-xl font-display text-5xl leading-[.98] tracking-[-.065em] sm:text-7xl">{t(copy.contact.title, lang)}</h2><p className="reveal reveal-delay-2 mt-7 max-w-md leading-7 text-background/60">{t(copy.contact.intro, lang)}</p><div className="reveal reveal-delay-3 mt-12 max-w-sm"><ContactLink href="https://wa.me/962781764789" icon={MessageCircle} label="WhatsApp" value="+962 78 176 4789" /><ContactLink href="https://t.me/Norv_ai" icon={Send} label="Telegram" value="@Norv_ai" /><ContactLink href="mailto:hamamhmam72@gmail.com" icon={Mail} label="Email" value="hamamhmam72@gmail.com" external={false} onCopy={copyPhone} />{copied && <p className="mt-2 flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-wider text-accent"><Check size={13} /> {lang === 'en' ? 'Phone copied' : 'تم نسخ الرقم'}</p>}<ContactLink href="https://www.linkedin.com/in/hammam-alhawamdeh" icon={Linkedin} label="LinkedIn" value="Hammam Alhawamdeh" /></div></div>
            <form onSubmit={sendBrief} className="reveal reveal-delay-1 border-t border-background/20 pt-1" noValidate>
              <label className="mt-7 block"><span className="mb-2 block font-mono-custom text-[10px] uppercase tracking-[.15em] text-background/55">{t(copy.contact.name, lang)}</span><input name="name" required autoComplete="name" className="w-full border-b border-background/25 bg-transparent px-0 py-3 text-lg outline-none transition-colors placeholder:text-background/30 focus:border-accent" placeholder={lang === 'en' ? 'Hammam, your next client…' : 'اكتب اسمك…'} data-testid="input-name" /></label>
              <label className="mt-8 block"><span className="mb-2 block font-mono-custom text-[10px] uppercase tracking-[.15em] text-background/55">{t(copy.contact.email, lang)}</span><input name="email" type="email" required autoComplete="email" className="w-full border-b border-background/25 bg-transparent px-0 py-3 text-lg outline-none transition-colors placeholder:text-background/30 focus:border-accent" placeholder="you@company.com" data-testid="input-email" /></label>
               <label className="mt-8 block"><span className="mb-2 block font-mono-custom text-[10px] uppercase tracking-[.15em] text-background/55">{t(copy.contact.intent, lang)}</span><select name="intent" required defaultValue="" className="w-full border-b border-background/25 bg-transparent px-0 py-3 text-lg outline-none transition-colors focus:border-accent" data-testid="select-intent"><option value="" disabled className="bg-foreground text-background">{lang === 'en' ? 'Choose one…' : 'اختر خياراً…'}</option><option value="subscribe" className="bg-foreground text-background">{t(copy.contact.intentOptions.subscribe, lang)}</option><option value="hire" className="bg-foreground text-background">{t(copy.contact.intentOptions.hire, lang)}</option><option value="consultation" className="bg-foreground text-background">{t(copy.contact.intentOptions.consultation, lang)}</option></select></label>
              <label className="mt-8 block"><span className="mb-2 block font-mono-custom text-[10px] uppercase tracking-[.15em] text-background/55">{t(copy.contact.project, lang)}</span><textarea name="project" required rows={4} className="w-full resize-none border-b border-background/25 bg-transparent px-0 py-3 text-lg leading-7 outline-none transition-colors placeholder:text-background/30 focus:border-accent" placeholder={lang === 'en' ? 'A new site, an AI idea, a growth problem…' : 'موقع جديد، فكرة للذكاء الاصطناعي، تحدٍ في النمو…'} data-testid="input-project" /></label>
              {formError && <p className="mt-5 text-sm text-accent" role="alert" data-testid="status-form-error">{t(copy.contact.error, lang)}</p>}
              {sent && <p className="mt-5 flex items-center gap-2 text-sm text-accent" role="status" data-testid="status-form-success"><CheckCircle2 size={16} /> {t(copy.contact.success, lang)}</p>}
             <button type="submit" className="group mt-9 inline-flex min-h-12 w-full items-center justify-center gap-3 bg-accent px-5 py-3.5 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-foreground sm:w-auto" data-testid="button-submit-brief">{t(copy.contact.send, lang)} <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>
            </form>
          </div>
        </section>
      </main>
      <footer className="border-t border-background/20 bg-foreground text-background">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 py-7 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <div className="flex items-center gap-3"><span className="grid size-8 place-items-center bg-accent font-display text-sm font-bold text-accent-foreground">H</span><span className="font-display text-sm">Hammam Ali Omar Taha</span></div>
          <p className="font-mono-custom text-[10px] uppercase tracking-[.15em] text-background/45">© {new Date().getFullYear()} · Built with clarity</p>
          <a href="#top" className="font-mono-custom text-[10px] uppercase tracking-[.15em] text-background/65 transition-colors hover:text-accent" data-testid="link-back-top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return <Home />;
}

export default App;