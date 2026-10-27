import { useEffect, useState, type FormEvent } from 'react';
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, BriefcaseBusiness,
  Check, ChevronLeft, ChevronRight, Database, Github, GraduationCap, HeartPulse,
  Linkedin, Mail, MapPin, MapPinned, Menu, Moon, Phone, ShieldCheck, Sun, Users,
  Wrench, X, type LucideIcon,
} from 'lucide-react';

type ProcessStep = { title: string; description: string; deliverable: string };
type Project = {
  number: string;
  title: string;
  role: string;
  location: string;
  description: string;
  builtFor?: string;
  impact: string;
  equipment: string[];
  categories: string[];
  point: [number, number];
};

const portfolio = {
  name: 'Eng Doughlas',
  role: 'Lead Biomedical Engineer & Clinical Engineering Consultant',
  tagline: 'Keeping healthcare technology current, safe, reliable and ready for advanced clinical care.',
  email: 'bosiredoughlas001@gmail.com',
  phone: '+254 702 781 964',
  linkedin: 'https://www.linkedin.com/in/daggieh/',
  about: 'I am a Biomedical Engineer and Healthcare Technology Consultant with 6+ years of experience across clinical, medical-device and healthcare-systems environments in East Africa. I lead equipment and infrastructure work from technical assessment through installation, commissioning and lifecycle support.',
  aboutDetail: 'My work connects clinical needs with practical engineering across diagnostic, laboratory and radiology/imaging equipment; therapeutic, surgical, monitoring and life-support technologies; dental and sterilization systems; rehabilitation devices; medical gas systems; and hospital infrastructure. I support the full equipment lifecycle, from needs assessment and specification through installation, commissioning, safety checks, preventive and corrective maintenance, calibration, asset planning, compliance coordination and user training. My focus is safe, reliable technology that fits clinical workflows and can be maintained over time.',
  stats: [
    { value: '6+', label: 'years in biomedical engineering' },
    { value: '20+', label: 'hospitals and clinics supported' },
    { value: '99%+', label: 'equipment uptime reported' },
  ],
};

const navItems = [
  { label: 'Home', id: 'home' }, { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' }, { label: 'Portfolio', id: 'portfolio' },
  { label: 'Experience', id: 'experience' }, { label: 'Education', id: 'education' },
  { label: 'Engagements', id: 'engagements' },
];

const processSteps: ProcessStep[] = [
  { title: 'Need / Fault', description: 'Start with the clinical need or equipment fault. Understand who is affected, how the service is used and what a safe, workable outcome needs to look like.', deliverable: 'Clear need statement' },
  { title: 'Assessment & Specification', description: 'Assess the equipment, site and workflow before recommending a solution. Define technical requirements, service needs and practical constraints.', deliverable: 'Assessment and specification' },
  { title: 'Procurement & Installation', description: 'Coordinate procurement and site readiness with clinical teams, suppliers and contractors. Keep utilities, layout and equipment interfaces in view.', deliverable: 'Coordinated installation' },
  { title: 'Testing & Commissioning', description: 'Verify operation, safety and handover requirements with documented checks. Orient users and close out issues before equipment enters service.', deliverable: 'Commissioning and handover records' },
  { title: 'Preventive Maintenance & Training', description: 'Plan maintenance around equipment criticality and service needs. Build confidence through practical user training and clear maintenance routines.', deliverable: 'Maintenance plan and user training' },
  { title: 'Uptime & Compliance', description: 'Track reliability, safety and compliance over the equipment lifecycle. Use service history and user feedback to identify what needs attention next.', deliverable: 'Reliable, supportable equipment' },
];

const skillGroups: { title: string; Icon: LucideIcon; skills: string[] }[] = [
  { title: 'Medical Gas Systems', Icon: Activity, skills: ['Oxygen generation plants', 'Medical gas pipelines', 'Vacuum & suction', 'Compressed air', 'Manifold systems'] },
  { title: 'Dental & Diagnostic Imaging', Icon: MapPinned, skills: ['Dental units', 'Radiology equipment', 'Diagnostic imaging', 'Laparoscopy', 'Electrosurgery'] },
  { title: 'Life Support & Patient Monitoring', Icon: HeartPulse, skills: ['Critical-care equipment', 'Patient monitoring', 'Ventilator prototype collaboration', 'Equipment safety checks'] },
  { title: 'Sterilisation & Infection Control', Icon: ShieldCheck, skills: ['CSSD equipment', 'Sterilisation systems', 'Rehabilitation devices', 'Safe-use orientation'] },
  { title: 'Maintenance & Calibration', Icon: Wrench, skills: ['Preventive maintenance', 'Corrective maintenance', 'Calibration', 'Troubleshooting', 'Equipment audits'] },
  { title: 'Hospital Infrastructure', Icon: BriefcaseBusiness, skills: ['Power & electrical systems', 'HVAC interfaces', 'Water treatment', 'Site coordination', 'Clinical workflow integration'] },
  { title: 'Asset & Maintenance Systems', Icon: Database, skills: ['Asset inventories', 'Lifecycle planning', 'Service records', 'CAD & process simulation'] },
  { title: 'Standards & Regulatory Affairs', Icon: Check, skills: ['Device conformity support', 'CSDT preparation support', 'MOH / KNRA coordination', 'ISO 13485 certification · ongoing', 'PPB device & IVD registration guidance', 'MDSW / SaMD guideline study · 2026', 'Risk classification & technical documentation', 'Post-market surveillance principles'] },
  { title: 'Leadership & Management', Icon: Users, skills: ['Lead Biomedical Engineer', 'Biomedical Engineering Consultant', 'University Electoral College Chair', 'Technical Advisor', 'Multi-branch operations', 'Project & vendor coordination', 'Clinical staff training · 150+'] },
];

const softSkills = ['Leadership', 'Team management', 'Problem solving', 'Communication', 'Safety mindset', 'Training', 'Vendor management', 'Attention to detail'];
const clients = ['Molars Dental Hospital', 'Epione Health', 'AMEK', 'Sai Pharmaceuticals', 'Elmar Med Systems', 'Technical University of Mombasa'];
const filters = ['All', 'Medical Gas', 'Equipment Installation', 'Maintenance Programs', 'Consulting', 'Training'];
const regulatoryResources = [
  { label: 'PPB MDSW / SaMD guideline', href: 'https://web.pharmacyboardkenya.org/download/guideline-on-regulation-of-medical-device-software-in-kenya-mdsw/' },
  { label: 'Medical-device & IVD registration guideline', href: 'https://web.pharmacyboardkenya.org/download/guidelines-for-registration-of-medical-devices-including-in-vitro-diagnostics/' },
  { label: 'Medical-device registration procedure', href: 'https://web.pharmacyboardkenya.org/medical-devices-evaluation-and-registration-procedure/' },
  { label: 'PPB registered medical-device list', href: 'https://products.pharmacyboardkenya.org/ppb_admin/pages/public_view_md_retained.php' },
];

const projects: Project[] = [
  {
    number: '01', title: 'Clinical engineering across six branches', role: 'Lead Biomedical Engineer', location: 'Kenya',
    description: 'Equipment lifecycle planning, installation, calibration, commissioning and maintenance coordination across a multi-branch dental hospital operation.',
    builtFor: 'Molars Dental Hospital', impact: 'Six branches supported, 150+ clinical staff trained and 99%+ equipment uptime reported in the supplied resume.',
    equipment: ['Dental', 'Radiology', 'Theatre', 'CSSD', 'Medical gases'], categories: ['Equipment Installation', 'Maintenance Programs', 'Consulting', 'Training'], point: [67, 49],
  },
  {
    number: '02', title: 'Medical gas systems & healthcare infrastructure', role: 'Biomedical Engineering Consultant', location: 'Kenya',
    description: 'Technical consultation and project coordination for medical gas pipeline systems, including oxygen, vacuum, compressed air and manifold systems.',
    builtFor: 'Beacon of Hope Hospital · PCEA Kikuyu Mission Hospital · Adventist Hospital', impact: 'Coordinated technical planning and delivery across public and private healthcare facilities.',
    equipment: ['Oxygen', 'Vacuum', 'Compressed air', 'Manifold systems'], categories: ['Medical Gas', 'Equipment Installation', 'Consulting'], point: [57, 59],
  },
  {
    number: '03', title: 'Medical-device compliance & commissioning', role: 'Biomedical Contracts Compliance Officer', location: 'Kenya',
    description: 'Technical conformity, installation, training, commissioning, calibration and regulatory coordination for a broad medical-device portfolio.',
    builtFor: 'Sai Pharmaceuticals Kenya Limited', impact: 'Supported product conformity, technical evaluations and registration / retention activities with the regulatory pharmacist.',
    equipment: ['Theatre', 'Laboratory', 'Laparoscopy', 'Electrosurgery', 'Medical gases'], categories: ['Equipment Installation', 'Consulting', 'Training'], point: [60, 67],
  },
  {
    number: '04', title: 'Clinical staff training & equipment handover', role: 'Lead Biomedical Engineer', location: 'Six branches · Kenya',
    description: 'Clinical user orientation and training as part of equipment lifecycle support and safe day-to-day operation.',
    builtFor: 'Molars Dental Hospital', impact: '150+ clinical staff trained, as reported in the supplied resume.',
    equipment: ['User orientation', 'Safe operation', 'Handover'], categories: ['Training', 'Consulting'], point: [63, 39],
  },
];

const experience = [
  { title: 'Lead Biomedical Engineer', company: 'Molars Dental Hospital', dates: 'Sep 2025 - Present', detail: 'Six branches · equipment lifecycle, team training and uptime' },
  { title: 'Biomedical Engineering Consultant', company: 'Epione Health Limited', dates: 'Aug 2025 - Present', detail: 'Healthcare infrastructure and medical gas projects' },
  { title: 'Biomedical Contracts Compliance Officer', company: 'Sai Pharmaceuticals Kenya Limited', dates: 'Oct 2023 - Sep 2025', detail: 'Device conformity, commissioning and regulatory coordination' },
  { title: 'Technical Field Service Technician', company: 'Elmar Med Systems Engineering Limited', dates: 'Jan 2023 - Aug 2023', detail: 'Field service and equipment support' },
  { title: 'Biomedical Engineering Intern', company: 'The Mombasa Hospital', dates: 'Jan 2022 - Apr 2022', detail: 'Biomedical engineering internship' },
];

const education = [
  { dates: '2017 - 2022', title: 'BSc Biomedical Engineering · Second Class Upper', place: 'Technical University of Mombasa' },
  { dates: '2025', title: 'Certificate in Asset Management', place: 'Alison College · Jan - Jun 2025' },
  { dates: '2016 - 2017', title: 'Diploma in Software Management and Operations', place: 'Kenya Institute of Management' },
];

function AfricaMap() {
  return (
    <div className="map-image-frame">
      <img className="map-art-image" src={`${import.meta.env.BASE_URL}kenya-in-africa.png`} alt="Map of Africa with Kenya highlighted in green as the home base" />
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = window.localStorage.getItem('portfolio-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'light';
  });
  const [activeNav, setActiveNav] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState(5);
  const [activeFilter, setActiveFilter] = useState('All');
  const [mapOpen, setMapOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [zoom, setZoom] = useState(1);
  const [activeExperience, setActiveExperience] = useState(0);
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  useEffect(() => {
    const targets = navItems.map((item) => document.getElementById(item.id)).filter((element): element is HTMLElement => Boolean(element));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActiveNav(visible[0].target.id);
    }, { rootMargin: '-92px 0px -65% 0px', threshold: 0 });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>('.reveal');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mapOpen) return;
    document.body.classList.add('modal-open');
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setMapOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mapOpen]);

  const visibleProjects = activeFilter === 'All' ? projects : projects.filter((project) => project.categories.includes(activeFilter));
  const mapProjects = activeFilter === 'All' ? projects : projects.filter((project) => project.categories.includes(activeFilter));
  const currentStep = processSteps[selectedStep];

  const openMap = () => {
    setSelectedProject(null);
    setActiveFilter('All');
    setMapOpen(true);
  };

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const subject = encodeURIComponent(String(values.get('subject') || `Portfolio enquiry from ${values.get('name')}`));
    const body = encodeURIComponent(`Name: ${values.get('name')}\nEmail: ${values.get('email')}\n\n${values.get('message')}`);
    setFormStatus('Your email app should open with this message ready to send.');
    window.location.href = `mailto:${portfolio.email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} />
      <header className="site-header">
        <a className="brand" href="#home" aria-label={`${portfolio.name} home`}>{portfolio.name.toUpperCase()}</a>
        <button className="mobile-menu-button icon-button" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={`main-nav ${menuOpen ? 'main-nav--open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => <a key={item.id} className={activeNav === item.id ? 'is-active' : ''} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
          <button className="contact-nav" type="button" onClick={() => { setMenuOpen(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Contact Me</button>
        </nav>
        <button className="theme-button icon-button" type="button" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme === 'light' ? <Moon /> : <Sun />}</button>
      </header>

      <main>
        <section className="hero page-width" id="home">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">BIOMEDICAL ENGINEERING <span>·</span> NAIROBI, KENYA</p>
            <h1>Hi, I'm <span>Doughlas</span></h1>
            <p className="hero-role">{portfolio.role}</p>
            <p className="hero-tagline">{portfolio.tagline}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#portfolio">View Portfolio <ArrowDownRight size={17} /></a>
              <a className="button button-secondary" href="#contact"><Mail size={16} /> Contact Me</a>
            </div>
            <div className="social-row" aria-label="Social profiles">
              <a className="social-button" href={portfolio.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
              <a className="social-button" href={`mailto:${portfolio.email}`} aria-label="Email"><Mail /></a>
              <a className="social-button" href={`https://wa.me/${portfolio.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Phone /></a>
              <a className="social-button" href="https://github.com/dag-gieh" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
            </div>
            <div className="stats-card">
              {portfolio.stats.map((stat) => <div className="stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
            </div>
          </div>
          <div className="hero-map-wrap">
            <AfricaMap />
          </div>
          <a className="scroll-cue" href="#clients" aria-label="Scroll to client organizations"><span className="mouse-icon"><i /></span><span>SCROLL TO EXPLORE</span></a>
        </section>

        <section className="clients-strip" id="clients" aria-label="Organizations and affiliations">
          <p className="eyebrow">SELECTED TEAMS & ORGANISATIONS</p>
          <div className="marquee-mask"><div className="marquee-track">{[...clients, ...clients].map((client, index) => <span className="client-wordmark" key={`${client}-${index}`} aria-hidden={index >= clients.length}>{client}</span>)}</div></div>
        </section>

        <section className="section page-width" id="about">
          <SectionHeading first="About" accent="Me" />
          <div className="about-grid">
            <div className="about-portrait"><img src={`${import.meta.env.BASE_URL}profile-photo.png`} alt="Doughlas Nyarango Bosire, biomedical engineer" loading="lazy" decoding="async" /></div>
            <div className="about-copy reveal">
              <p className="location-label"><MapPin size={14} /> NAIROBI, KENYA</p>
              <h3>Clinical engineering for dependable care.</h3>
              <p>{portfolio.about}</p>
              <p>{portfolio.aboutDetail}</p>
              <div className="about-chips"><span>Clinical Engineering</span><span>Medical Gas Systems</span><span>Biomedical Maintenance</span><span>Hospital Infrastructure</span><span>AMEK Member</span></div>
            </div>
          </div>
          <div className="process-section">
            <div className="process-intro"><div><p className="eyebrow">FROM NEED TO RELIABLE SERVICE</p><h3>My <span>Process</span></h3></div><p>Each step rests on the one before it. When a solution is not working as intended, I go back to the layer that needs attention and address it there.</p></div>
            <div className="process-grid">
              <div className="process-stack" aria-label="Select a project delivery layer">
                <div className="stack-plates">{processSteps.map((step, index) => <button className={`process-plate ${index === selectedStep ? 'is-selected' : ''} ${index > selectedStep ? 'is-above' : ''}`} key={step.title} style={{ '--step': index } as React.CSSProperties} type="button" onClick={() => setSelectedStep(index)} aria-label={`Select step ${index + 1}: ${step.title}`} aria-pressed={index === selectedStep}><span>{String(index + 1).padStart(2, '0')}</span></button>)}</div>
                <div className="stack-labels">{[...processSteps].reverse().map((step, reverseIndex) => {
                  const index = processSteps.length - 1 - reverseIndex;
                  return <button key={step.title} className={index === selectedStep ? 'is-selected' : ''} type="button" onClick={() => setSelectedStep(index)}><small>{String(index + 1).padStart(2, '0')}</small>{step.title}</button>;
                })}</div>
              </div>
              <article className="process-card" aria-live="polite">
                <div className="process-card-top"><span className="process-number">{String(selectedStep + 1).padStart(2, '0')}</span><span className="eyebrow">LAYER {selectedStep + 1} OF 6</span></div>
                <h4>{currentStep.title}</h4><p>{currentStep.description}</p>
                <span className="eyebrow deliverable-label">WHAT I DELIVER</span><span className="deliverable-chip">{currentStep.deliverable}</span>
                <div className="process-card-footer"><div className="step-progress">{processSteps.map((step, index) => <i key={step.title} className={index <= selectedStep ? 'is-filled' : ''} />)}</div><div className="step-buttons"><button type="button" className="button button-secondary" disabled={selectedStep === 0} onClick={() => setSelectedStep((step) => Math.max(0, step - 1))}><ChevronLeft size={15} /> Back</button><button type="button" className="button button-primary" disabled={selectedStep === processSteps.length - 1} onClick={() => setSelectedStep((step) => Math.min(processSteps.length - 1, step + 1))}>Next <ChevronRight size={15} /></button></div></div>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-tint" id="skills">
          <div className="page-width"><SectionHeading first="My" accent="Toolbox" />
            <div className="toolbox-grid">{skillGroups.map(({ title, Icon, skills }, index) => <article className="tool-card reveal" key={title} style={{ '--delay': `${index * 55}ms` } as React.CSSProperties}><div className="tool-card-heading"><span className="tool-icon"><Icon size={19} /></span><h3>{title}</h3></div><div className="tool-chips">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></article>)}</div>
            <div className="regulatory-resources">
              <h3>PPB Regulatory References</h3>
              <div className="regulatory-links">{regulatoryResources.map((resource) => <a key={resource.href} href={resource.href} target="_blank" rel="noreferrer">{resource.label}<ArrowUpRight size={14} /></a>)}</div>
            </div>
            <div className="soft-skills"><h3>Soft Skills</h3><p>How I work with teams and deliver dependable outcomes</p><div className="marquee-mask"><div className="soft-track">{[...softSkills, ...softSkills].map((skill, index) => <span key={`${skill}-${index}`}>{skill}</span>)}</div></div></div>
          </div>
        </section>

        <section className="section page-width" id="portfolio">
          <SectionHeading first="Featured" accent="Projects" />
          <div className="project-toolbar"><div className="filter-row" role="group" aria-label="Filter projects">{filters.map((filter) => {
            const count = filter === 'All' ? projects.length : projects.filter((project) => project.categories.includes(filter)).length;
            return <button type="button" className={activeFilter === filter ? 'filter-pill is-active' : 'filter-pill'} key={filter} onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter}>{filter}<span>{count}</span></button>;
          })}</div><button className="button button-primary map-open" type="button" onClick={openMap}><MapPinned size={16} /> View map</button></div>
          <div className="projects-grid">{visibleProjects.map((project) => <ProjectCard project={project} key={project.number} />)}</div>
        </section>

        <section className="section section-tint" id="experience">
          <div className="page-width"><SectionHeading first="Work" accent="Experience" />
            <div className="career-chart" aria-label="Interactive career timeline">
              <svg className="career-line" viewBox="0 0 1000 250" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="career-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="currentColor" stopOpacity=".18" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></linearGradient></defs><path className="career-area" d="M0 205 H160 V182 H360 V145 H555 V104 H760 V65 H1000 V250 H0Z" /><path className="career-path" d="M0 205 H160 V182 H360 V145 H555 V104 H760 V65 H1000" /></svg>
              {experience.slice(0, 3).map((item, index) => <button type="button" className={`career-node career-node--${index} ${activeExperience === index ? 'is-active' : ''}`} key={item.title} onClick={() => setActiveExperience(index)} aria-pressed={activeExperience === index}><span className="career-node-dot" /><span className="career-node-label"><strong>{item.title}</strong><small>{item.company}</small></span></button>)}
              <div className="career-years"><span>2022</span><span>2023</span><span>2024</span><span>2025</span><span>2026</span></div>
            </div>
            <article className="experience-card reveal" aria-live="polite"><div><p className="eyebrow">CAREER DETAIL · {String(activeExperience + 1).padStart(2, '0')}</p><h3>{experience[activeExperience].title}</h3><p className="experience-company">{experience[activeExperience].company}</p><span className="experience-dates">{experience[activeExperience].dates}</span></div><p className="experience-summary">{experience[activeExperience].detail}</p><div className="experience-controls"><button type="button" className="icon-button" aria-label="Previous role" onClick={() => setActiveExperience((current) => (current + experience.length - 1) % experience.length)}><ChevronLeft /></button><button type="button" className="icon-button" aria-label="Next role" onClick={() => setActiveExperience((current) => (current + 1) % experience.length)}><ChevronRight /></button></div></article>
            <div className="all-roles">{experience.map((item, index) => <button type="button" className={activeExperience === index ? 'role-row is-active' : 'role-row'} key={`${item.title}-${item.dates}`} onClick={() => setActiveExperience(index)}><span>{item.dates}</span><strong>{item.title}</strong><span>{item.company}</span><ArrowUpRight size={15} /></button>)}</div>
          </div>
        </section>

        <section className="section page-width" id="education">
          <SectionHeading first="Education" accent="& Training" />
          <div className="education-list">{education.map((item) => <article className="education-card reveal" key={item.title}><span className="education-date">{item.dates}</span><span className="education-icon"><GraduationCap size={20} /></span><div><h3>{item.title}</h3><p>{item.place}</p></div></article>)}</div>
          <div className="membership-note"><ShieldCheck size={17} /><span>Professional Association of Biomedical Engineers of Kenya (AMEK) · Member</span></div>
        </section>

        <section className="section section-tint" id="engagements">
          <div className="page-width"><SectionHeading first="Community" accent="Engagements" />
            <article className="engagement-card reveal"><div className="engagement-top"><span className="eyebrow">2022 - 2023 · UNIVERSITY LEADERSHIP</span><span className="role-tag">LEADERSHIP</span></div><div className="engagement-body"><div><h3>University electoral leadership & technical advising</h3><p>Technical University of Mombasa</p></div><Users size={25} /></div><ul><li>Spearheaded the first online university elections at TUM.</li><li>Chaired the university electoral college and served as a technical advisor.</li></ul></article>
          </div>
        </section>

        <section className="section page-width" id="contact">
          <SectionHeading first="Get in" accent="Touch" />
          <div className="contact-grid">
            <article className="contact-card contact-details"><h3>Contact Information</h3>
              <a className="contact-item" href={`mailto:${portfolio.email}`}><span><Mail /></span><div><small>EMAIL</small><strong>{portfolio.email}</strong></div></a>
              <a className="contact-item" href={`tel:${portfolio.phone.replace(/\s/g, '')}`}><span><Phone /></span><div><small>PHONE</small><strong>{portfolio.phone}</strong></div></a>
              <div className="contact-item"><span><MapPin /></span><div><small>LOCATION</small><strong>Nairobi, Kenya</strong></div></div>
              <div className="contact-socials"><h4>Connect with Me</h4><div className="social-row"><a className="social-button" href={portfolio.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a><a className="social-button" href={`mailto:${portfolio.email}`} aria-label="Email"><Mail /></a><a className="social-button" href={`https://wa.me/${portfolio.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Phone /></a></div></div>
            </article>
            <article className="contact-card"><h3>Send Me a Message</h3><form className="contact-form" onSubmit={submitMessage}><input name="name" placeholder="Your Name" aria-label="Your name" required /><input name="email" type="email" placeholder="Your Email" aria-label="Your email" required /><input name="subject" placeholder="Subject" aria-label="Subject" required /><textarea name="message" placeholder="Your Message" aria-label="Your message" required rows={5} /><button className="button button-primary" type="submit">Send Message <ArrowRight size={16} /></button><p className="form-status" aria-live="polite">{formStatus}</p></form></article>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="page-width"><p>(c) 2026, {portfolio.name}</p><p>{portfolio.role}</p></div></footer>

      {mapOpen && <div className="map-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setMapOpen(false); }}>
        <section className="map-modal" role="dialog" aria-modal="true" aria-labelledby="map-title">
          <header className="map-modal-header"><div><h2 id="map-title">Facilities on the map</h2><p>Locations are illustrative until branch addresses are confirmed.</p></div><button type="button" className="icon-button" aria-label="Close map" onClick={() => setMapOpen(false)}><X /></button></header>
          <div className="map-modal-filters">{['All', 'Medical Gas', 'Equipment Installation', 'Maintenance Programs', 'Consulting', 'Training'].map((filter) => <button key={filter} type="button" className={activeFilter === filter ? 'filter-pill is-active' : 'filter-pill'} onClick={() => { setActiveFilter(filter); setSelectedProject(null); }}>{filter}</button>)}</div>
          <div className="map-modal-content"><div className="facility-map"><div className="map-grid-lines" /><div className="map-label-north">NAIROBI & CONSULTING SITES · SCHEMATIC</div><svg className="map-roads" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true"><path d="M0 540 270 360 580 410 1000 80M30 130 300 260 510 120 970 400M100 700 250 20M500 700 650 0M850 700 740 0M0 330 1000 560" /><path d="M0 560 270 380 580 430 1000 100M30 150 300 280 510 140 970 420M120 700 270 20M520 700 670 0M870 700 760 0M0 350 1000 580" className="road-secondary" /></svg>
            <div className="map-site-cloud" style={{ transform: `scale(${zoom})` }}>{mapProjects.map((project) => <button key={project.number} type="button" className={`map-marker ${selectedProject?.number === project.number ? 'is-selected' : ''} ${project.placeholder ? 'is-placeholder' : ''}`} style={{ left: `${project.point[0]}%`, top: `${project.point[1]}%` }} onClick={() => setSelectedProject(project)} aria-label={`Select ${project.title}`}><span>{project.number}</span></button>)}</div>
            <div className="map-zoom"><button type="button" aria-label="Zoom in" onClick={() => setZoom((value) => Math.min(1.35, value + .1))}>+</button><button type="button" aria-label="Zoom out" onClick={() => setZoom((value) => Math.max(.8, value - .1))}>-</button></div>
            <div className="map-disclaimer">ILLUSTRATIVE ONLY · ADD CONFIRMED BRANCH LOCATIONS</div>
            {selectedProject && <article className="map-info-card"><button type="button" aria-label="Close project detail" onClick={() => setSelectedProject(null)}><X size={15} /></button><span className="map-info-number">{selectedProject.number}</span><h3>{selectedProject.title}</h3><p>{selectedProject.location} · {selectedProject.role}</p><div>{selectedProject.impact}</div></article>}
          </div></div><aside className="map-project-list" aria-label="Projects and facility locations">{mapProjects.map((project) => <button type="button" key={project.number} className={selectedProject?.number === project.number ? 'map-project-row is-selected' : 'map-project-row'} onClick={() => setSelectedProject(project)}><span>{project.number}</span><strong>{project.title}</strong><small>{project.location}</small></button>)}</aside>
        </section>
      </div>}
    </>
  );
}

function SectionHeading({ first, accent }: { first: string; accent: string }) {
  return <div className="section-heading reveal"><h2>{first} <span>{accent}</span></h2><i aria-hidden="true" /></div>;
}

function ProjectCard({ project }: { project: Project }) {
  return <article className={`project-card reveal ${project.placeholder ? 'project-card--placeholder' : ''}`}>
    <div className="project-card-top"><span className="project-number">{project.number}</span><span className="project-mark"><Wrench size={18} /></span></div>
    <h3>{project.title}</h3><div className="project-meta"><span className="role-chip">{project.role}</span><span className="location-chip"><MapPin size={12} />{project.location}</span></div>
    <p className="project-description">{project.description}</p>
    {project.builtFor && <div className="built-for"><small>PROJECT / ORGANISATION</small><strong>{project.builtFor}</strong></div>}
    <p className="project-impact"><strong>RESULT / IMPACT</strong>{project.impact}</p>
    <div className="project-tech">{project.equipment.map((item) => <span key={item}>{item}</span>)}</div>
  </article>;
}

export default App;
