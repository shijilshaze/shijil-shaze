import { useEffect, useRef, useState, useCallback } from "react";
import "./Projects.css";
import spiderman from "./assets/spiderman2.png";
import zonexLogo from "./assets/zonex.png";
import zicatLogo from "./assets/zicat.png";
import zonexPreviewImg from "./assets/zonex build.png";
import zicatPreviewImg from "./assets/zicat build.png";


/* ==========================================================================
   CATEGORY IMAGES — no code editing needed.
   Put your photos in:  src/assets/categories/
   Name them exactly:   company.jpg, branding.jpg, blog.jpg,
                        ecommerce.jpg, personal.jpg, education.jpg
   (.jpg .jpeg .png .webp all work). Any missing image keeps the drawn scene.
   ========================================================================== */
const localImages = import.meta.glob(
  "./assets/categories/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, import: "default" }
);
const COVER_LINKS = {};
Object.entries(localImages).forEach(([path, url]) => {
  const id = path.split("/").pop().replace(/\.[^.]+$/, "").toLowerCase();
  COVER_LINKS[id] = url;
});

/*
  CATEGORIES — exactly six. `cover` is optional: set it to an imported image
  (e.g. import cover from "./assets/company-cover.jpg") and it replaces the
  drawn scene for that category.
*/
const categories = [
  {
    id: "company",
    number: "01",
    title: "Company Websites",
    tagline: "Corporate presence built for trust, clarity and growth.",
    intro:
      "Websites for institutions and agencies — designed to communicate credibility, present services clearly and turn visitors into enquiries.",
    cover: import.meta.env.PROD ? COVER_LINKS.company : "https://images.alphacoders.com/997/thumb-1920-997360.jpg",
    focus: "62% 50%",
  },
  {
    id: "branding",
    number: "02",
    title: "Personal Branding",
    tagline: "Identity, reputation and a digital presence that is unmistakably yours.",
    intro:
      "Profile and brand-led websites that turn a person's story, expertise and reputation into a confident online identity.",
    cover: import.meta.env.PROD ? COVER_LINKS.branding : "https://wallpapercat.com/w/full/8/b/b/309490-1920x1551-desktop-hd-spider-man-wallpaper-photo.jpg",
    focus: "50% 28%",
  },
  {
    id: "blog",
    number: "03",
    title: "Blog & News Websites",
    tagline: "Editorial layouts made for readers and publishers.",
    intro:
      "Digital publications, magazines and news platforms with strong reading experiences and easy content publishing.",
    cover: import.meta.env.PROD ? COVER_LINKS.blog : "https://i.pinimg.com/originals/04/5c/11/045c11362d0e28a7733f15809da24a2f.jpg",
    focus: "50% 50%",
  },
  {
    id: "ecommerce",
    number: "04",
    title: "E-commerce Websites",
    tagline: "Online stores that make products easy to love and buy.",
    intro:
      "Storefronts and shopping experiences focused on product presentation, smooth browsing and a clear path to checkout.",
    cover: import.meta.env.PROD ? COVER_LINKS.ecommerce : "https://images.wallpapersden.com/image/download/spider-man-no-way-home-4k-movie-mcu_bG1nammUmZqaraWkpJRobWllrWdma2U.jpg",
    focus: "50% 55%",
  },
  {
    id: "personal",
    number: "05",
    title: "Personal Websites",
    tagline: "Portfolios and profiles with a creative, personal voice.",
    intro:
      "Individual portfolios and professional profiles with modern hero sections, personal photography and refined typography.",
    cover: import.meta.env.PROD ? COVER_LINKS.personal : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbQ4HmJnKoo23U265NNfG6zHo0MLgPqZxentpv_kAWjDk9cLiQDXwz4vY&s=10",
    focus: "55% 50%",
  },
  {
    id: "education",
    number: "06",
    title: "Education & Learning Websites",
    tagline: "Learning platforms and institutions, made simple to explore.",
    intro:
      "Websites for training, mentorship and online learning — organised so students find programs and get started quickly.",
    cover: import.meta.env.PROD ? COVER_LINKS.education : "https://i.pinimg.com/736x/39/44/65/394465d7fe51c01178c0e5285acd5e44.jpg",
    focus: "50% 45%",
  },
];

/*
  PROJECTS — add a new project by appending an object with a `categoryId`
  matching one of the ids above. `url`, `domain`, `logo`, `previewImg` and
  `type` are all optional; the layout adapts when they are missing.
*/
const projects = [
  {
    categoryId: "company",
    number: "01",
    name: "ZONEX EDUHUB",
    category: "TRADING EDUCATION & FINANCIAL MARKETS",
    description:
      "Zonex EduHub is a trading education institution based in Kochi, Kerala, focused on trading education, market knowledge, and mentorship. Designed and developed a modern digital experience to present the institution's brand, trading education programs, and mentorship services.",
    domain: "zonexedu.com",
    url: "https://zonexedu.com",
    logo: zonexLogo,
    previewImg: zonexPreviewImg,
    type: "trading",
  },
  {
    categoryId: "company",
    number: "02",
    name: "ZICAT",
    category: "DIGITAL MARKETING & ONLINE REPUTATION",
    description:
      "Zicat is Kerala's first reputation-focused digital marketing agency, specializing in digital reputation, strategic branding, public relations, and digital marketing. Designed and developed a premium digital experience to communicate Zicat's brand identity, services, and reputation-management expertise.",
    domain: "zicat.in",
    url: "https://zicat.in",
    logo: zicatLogo,
    previewImg: zicatPreviewImg,
    type: "marketing",
  },
];

const S = "rgba(255,255,255,0.3)";
const F = "rgba(255,255,255,0.12)";
const R = "#C8102E";

const scenes = {
  company: (
    <>
      <g fill="none" stroke={S} strokeWidth="1.2">
        <rect x="18" y="240" width="70" height="300" />
        <rect x="98" y="130" width="84" height="410" />
        <rect x="192" y="200" width="62" height="340" />
        <rect x="262" y="300" width="50" height="240" />
      </g>
      <path
        d="M110 165H170M110 195H170M110 225H170M110 255H170M110 285H170M110 315H170M30 270H76M30 300H76M30 330H76M204 230H242M204 260H242M204 290H242"
        stroke={F}
        strokeWidth="1.5"
      />
      <path d="M98 130 L140 84 L182 130" fill="none" stroke={R} strokeWidth="1.6" />
      <polyline points="0,470 80,425 150,438 230,340 320,270" fill="none" stroke={R} strokeWidth="2" />
    </>
  ),
  branding: (
    <>
      <rect x="45" y="80" width="210" height="340" fill="none" stroke={S} strokeWidth="1.2" />
      <path d="M45 110V80H75M225 80H255V110M255 390V420H225M75 420H45V390" fill="none" stroke={R} strokeWidth="2" />
      <circle cx="150" cy="200" r="48" fill={F} stroke={S} />
      <path d="M62 420C62 320 238 320 238 420" fill={F} stroke={S} />
      <circle cx="150" cy="200" r="92" fill="none" stroke={R} strokeDasharray="3 7" opacity="0.7" />
      <path d="M85 460H215M110 484H190" stroke={S} strokeWidth="1.5" />
    </>
  ),
  blog: (
    <>
      <rect x="30" y="70" width="240" height="120" fill={F} stroke={S} />
      <path d="M30 220H270M30 246H220M30 272H250" stroke={S} strokeWidth="2" />
      <path d="M30 70V190M30 190H270" stroke={R} strokeWidth="2" />
      <g stroke={F} strokeWidth="1.5">
        <path d="M30 330H130M30 350H130M30 370H110M30 390H130M30 410H100" />
        <path d="M170 330H270M170 350H270M170 370H250M170 390H270M170 410H230" />
      </g>
      <rect x="30" y="440" width="110" height="46" fill="none" stroke={S} />
      <rect x="160" y="440" width="110" height="46" fill="none" stroke={S} />
    </>
  ),
  ecommerce: (
    <>
      <rect x="85" y="190" width="130" height="150" rx="6" fill={F} stroke={S} strokeWidth="1.2" />
      <path d="M118 190C118 130 182 130 182 190" fill="none" stroke={R} strokeWidth="2" />
      <circle cx="150" cy="265" r="22" fill="none" stroke={S} />
      <g fill="none" stroke={S}>
        <rect x="30" y="380" width="75" height="100" rx="4" />
        <rect x="112" y="380" width="75" height="100" rx="4" />
        <rect x="194" y="380" width="75" height="100" rx="4" />
      </g>
      <circle cx="67" cy="415" r="14" fill={F} />
      <circle cx="149" cy="415" r="14" fill={R} opacity="0.7" />
      <circle cx="231" cy="415" r="14" fill={F} />
      <path d="M40 450H95M122 450H177M204 450H259" stroke={S} />
    </>
  ),
  personal: (
    <>
      <rect x="25" y="90" width="250" height="300" rx="6" fill="none" stroke={S} strokeWidth="1.2" />
      <path d="M25 122H275" stroke={S} />
      <circle cx="40" cy="106" r="3" fill={R} />
      <circle cx="54" cy="106" r="3" fill={F} />
      <circle cx="68" cy="106" r="3" fill={F} />
      <circle cx="150" cy="215" r="42" fill={F} stroke={S} />
      <path d="M70 300H230M95 324H205M120 348H180" stroke={S} strokeWidth="2" />
      <path d="M70 300H110" stroke={R} strokeWidth="2.5" />
      <rect x="25" y="420" width="115" height="60" fill="none" stroke={S} />
      <rect x="160" y="420" width="115" height="60" fill="none" stroke={S} />
    </>
  ),
  education: (
    <>
      <polygon points="150,110 262,160 150,210 38,160" fill={F} stroke={S} strokeWidth="1.2" />
      <path d="M85 185V235C85 262 215 262 215 235V185" fill="none" stroke={S} />
      <path d="M262 160V225" stroke={R} strokeWidth="2" />
      <circle cx="262" cy="230" r="5" fill={R} />
      <rect x="30" y="330" width="240" height="14" rx="7" fill="none" stroke={S} />
      <rect x="30" y="330" width="160" height="14" rx="7" fill={R} opacity="0.75" />
      <rect x="30" y="370" width="240" height="14" rx="7" fill="none" stroke={S} />
      <rect x="30" y="370" width="95" height="14" rx="7" fill={F} />
      <rect x="30" y="410" width="240" height="14" rx="7" fill="none" stroke={S} />
      <rect x="30" y="410" width="200" height="14" rx="7" fill={F} />
    </>
  ),
};

function CategoryVisual({ category }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  if (category.cover && !failed) {
    return (
      <>
        <img
          className={`pj-cat-cover ${loaded ? "is-loaded" : ""}`}
          src={category.cover}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          style={{ objectPosition: category.focus || "50% 50%" }}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
        <span className="pj-cat-tint" aria-hidden="true" />
      </>
    );
  }
  return (
    <svg
      className="pj-cat-svg"
      viewBox="0 0 300 520"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {scenes[category.id]}
    </svg>
  );
}

function ProjectRow({ project, index }) {
  const isEven = index % 2 === 1;
  return (
    <article
      className={`pj-project-row ${isEven ? "pj-row-reverse" : ""}`}
      style={{ "--i": index }}
    >
      <div className="pj-content-side">
        <div className="pj-meta-row">
          <span className="pj-number">{project.number}</span>
          <span className="pj-divider-line" />
          <span className="pj-category">{project.category}</span>
        </div>

        <div className="pj-name-row">
          {project.logo && <img src={project.logo} alt="" className="pj-project-logo" />}
          <h3 className="pj-project-name">{project.name}</h3>
        </div>

        <p className="pj-description">{project.description}</p>

        {project.domain && (
          <div className="pj-domain-badge">
            <span>DOMAIN:</span> <strong>{project.domain}</strong>
          </div>
        )}

        {project.url && (
          <div className="pj-action-wrapper">
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="pj-visit-btn">
              VISIT WEBSITE
              <svg className="pj-visit-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>
        )}
      </div>

      <div className="pj-visual-side">
        <div className="pj-browser-preview">
          <div className="pj-browser-bar">
            <span className="pj-dot red" />
            <span className="pj-dot yellow" />
            <span className="pj-dot green" />
            {project.domain && <span className="pj-browser-url">{project.domain}</span>}
          </div>

          <div className={`pj-browser-screen ${project.type ? "" : "is-image-only"}`}>
            {project.previewImg ? (
              <div className="pj-asset-screenshot-wrapper">
                <img src={project.previewImg} alt={`${project.name} preview`} className="pj-asset-screenshot" />
                <div className="pj-screenshot-overlay-gradient"></div>
              </div>
            ) : null}

            {project.type === "trading" ? (
              <div className="pj-trading-preview">
                <div className="pj-trading-header">
                  <div className="pj-trading-ticker">
                    <span className="ticker-symbol">NIFTY / BANKNIFTY</span>
                    <span className="ticker-val">22,450.80</span>
                    <span className="ticker-badge green">+2.45%</span>
                  </div>
                  <div className="pj-trading-pills">
                    <span className="pill active">1D</span>
                    <span className="pill">1W</span>
                    <span className="pill">1M</span>
                  </div>
                </div>

                <div className="pj-trading-chart-area">
                  <div className="pj-chart-grid-lines">
                    <span></span><span></span><span></span><span></span>
                  </div>
                  <svg className="pj-candlestick-svg" viewBox="0 0 500 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="tradingGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00E676" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#00E676" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path className="pj-chart-area" d="M0,150 Q60,130 120,110 T240,80 T360,95 T500,45 L500,200 L0,200 Z" fill="url(#tradingGrad)" />
                    <path className="pj-chart-line" d="M0,150 Q60,130 120,110 T240,80 T360,95 T500,45" fill="none" stroke="#00E676" strokeWidth="2.5" />
                    <g className="pj-candles">
                      <line x1="45" y1="120" x2="45" y2="160" stroke="#FF5252" strokeWidth="1.5" />
                      <rect x="41" y="130" width="8" height="22" fill="#FF5252" rx="1" />
                      <line x1="95" y1="100" x2="95" y2="145" stroke="#00E676" strokeWidth="1.5" />
                      <rect x="91" y="110" width="8" height="25" fill="#00E676" rx="1" />
                      <line x1="145" y1="90" x2="145" y2="135" stroke="#00E676" strokeWidth="1.5" />
                      <rect x="141" y="98" width="8" height="20" fill="#00E676" rx="1" />
                      <line x1="195" y1="110" x2="195" y2="155" stroke="#FF5252" strokeWidth="1.5" />
                      <rect x="191" y="120" width="8" height="18" fill="#FF5252" rx="1" />
                      <line x1="245" y1="70" x2="245" y2="120" stroke="#00E676" strokeWidth="1.5" />
                      <rect x="241" y="80" width="8" height="30" fill="#00E676" rx="1" />
                      <line x1="295" y1="85" x2="295" y2="130" stroke="#FF5252" strokeWidth="1.5" />
                      <rect x="291" y="95" width="8" height="22" fill="#FF5252" rx="1" />
                      <line x1="345" y1="60" x2="345" y2="110" stroke="#00E676" strokeWidth="1.5" />
                      <rect x="341" y="70" width="8" height="28" fill="#00E676" rx="1" />
                      <line x1="395" y1="50" x2="395" y2="95" stroke="#00E676" strokeWidth="1.5" />
                      <rect x="391" y="58" width="8" height="25" fill="#00E676" rx="1" />
                      <line x1="445" y1="40" x2="445" y2="85" stroke="#00E676" strokeWidth="1.5" />
                      <rect x="441" y="48" width="8" height="24" fill="#00E676" rx="1" />
                    </g>
                  </svg>
                </div>

                <div className="pj-trading-footer">
                  <div className="trading-indicator-item">
                    <span className="ind-label">RSI (14)</span>
                    <span className="ind-val green">68.4 (Bullish)</span>
                  </div>
                  <div className="trading-indicator-item">
                    <span className="ind-label">MACD</span>
                    <span className="ind-val green">Momentum Up</span>
                  </div>
                  <div className="trading-indicator-item">
                    <span className="ind-label">VOLATILITY</span>
                    <span className="ind-val">-0.82%</span>
                  </div>
                </div>

                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="pj-screen-overlay-link">
                    EXPLORE TRADING PLATFORM
                  </a>
                )}
              </div>
            ) : project.type === "marketing" ? (
              <div className="pj-marketing-preview">
                <div className="pj-marketing-glow red-glow-1"></div>
                <div className="pj-marketing-glow red-glow-2"></div>

                <div className="pj-marketing-header-bar">
                  <span className="brand-tag">ZICAT AGENCY</span>
                  <span className="live-status"><span className="pulsing-dot"></span>LIVE MONITORING</span>
                </div>

                <div className="pj-network-visual">
                  <svg className="pj-network-svg" viewBox="0 0 500 200" preserveAspectRatio="none">
                    <path className="net-line" d="M50,150 L150,100 L250,130 L350,60 L450,90" fill="none" stroke="rgba(200, 16, 46, 0.4)" strokeWidth="1.5" />
                    <path className="net-line" d="M100,40 L150,100 L280,50 L350,60 L420,150" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
                    <circle cx="150" cy="100" r="5" fill="#C8102E" className="net-node pulse" />
                    <circle cx="250" cy="130" r="4" fill="#FFFFFF" className="net-node" />
                    <circle cx="350" cy="60" r="6" fill="#C8102E" className="net-node pulse" />
                    <circle cx="280" cy="50" r="35" fill="none" stroke="rgba(200, 16, 46, 0.3)" strokeDasharray="4 4" className="spinning-ring" />
                  </svg>

                  <div className="floating-metric-card metric-1">
                    <span className="m-title">BRAND REACH</span>
                    <span className="m-val">+340%</span>
                  </div>
                  <div className="floating-metric-card metric-2">
                    <span className="m-title">REPUTATION SCORE</span>
                    <span className="m-val green">99.4%</span>
                  </div>
                </div>

                <div className="pj-marketing-footer">
                  <div className="reputation-bar-wrap">
                    <span className="rep-label">PR & CAMPAIGN INDEX</span>
                    <div className="rep-progress"><div className="rep-fill"></div></div>
                  </div>
                </div>

                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="pj-screen-overlay-link">
                    EXPLORE REPUTATION PLATFORM
                  </a>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}


function handleMove(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  el.style.setProperty("--mx", `${x * 100}%`);
  el.style.setProperty("--my", `${y * 100}%`);
  el.style.setProperty("--px", ((x - 0.5) * 2).toFixed(3));
  el.style.setProperty("--py", ((y - 0.5) * 2).toFixed(3));
}

function handleLeave(e) {
  e.currentTarget.style.setProperty("--px", "0");
  e.currentTarget.style.setProperty("--py", "0");
}

function CategoryOverview({ categories, projects, onOpen }) {
  return (
    <div className="pj-overview">
      <p className="pj-overview-lead">
        Choose a category to explore the websites built within it.
      </p>

      <div className="pj-cat-grid">
        {categories.map((c, i) => {
          const count = projects.filter((p) => p.categoryId === c.id).length;
          return (
            <button
              type="button"
              key={c.id}
              className="pj-cat-panel"
              style={{ "--i": i }}
              onClick={() => onOpen(c.id)}
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
              aria-label={`Open ${c.title}`}
            >
              <span className="pj-cat-scene">
                <CategoryVisual category={c} />
              </span>
              <span className="pj-cat-shade" />
              <span className="pj-cat-glow" />

              <span className="pj-cat-body">
                <span className="pj-cat-num">{c.number}</span>
                <span className="pj-cat-name">{c.title}</span>
                <span className="pj-cat-tag">{c.tagline}</span>
                <span className="pj-cat-meta">
                  <span>
                    {count > 0
                      ? `${count} project${count > 1 ? "s" : ""}`
                      : "Coming soon"}
                  </span>
                  <svg className="pj-cat-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}


function CategoryGallery({ category, projects, onBack }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onBack();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onBack]);

  return (
    <div className="pj-gallery">
      <div className="pj-gal-hero">
        <div className="pj-gal-scene" aria-hidden="true">
          <CategoryVisual category={category} />
        </div>
        <div className="pj-gal-hero-inner">
          <span className="pj-gal-num">{category.number}</span>
          <h3 className="pj-gal-title">{category.title}</h3>
          <p className="pj-gal-intro">{category.intro}</p>
        </div>
      </div>

      {projects.length > 0 ? (
        <div className="pj-gallery-list">
          {projects.map((project, index) => (
            <ProjectRow key={project.name} project={project} index={index} />
          ))}
          <div className="pj-gallery-footer">
            <button type="button" className="pj-back-btn" onClick={onBack}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Projects
            </button>
          </div>
        </div>
      ) : (
        <div className="pj-empty">
          <div className="pj-empty-scene" aria-hidden="true">
            <CategoryVisual category={category} />
          </div>
          <div className="pj-empty-inner">
            <h4>New Projects Coming Soon</h4>
            <p>{category.title} projects will appear here as they are completed.</p>
            <button type="button" className="pj-back-btn" onClick={onBack}>
              Back to Projects
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Projects() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const timerRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const [leaving, setLeaving] = useState(false);

  /* Original reveal observer — unchanged */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const goTo = useCallback((nextId) => {
    const reduced = prefersReducedMotion();
    const finish = () => {
      setActiveId(nextId);
      setLeaving(false);
      stageRef.current?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    };
    if (reduced) return finish();
    setLeaving(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(finish, 380);
  }, []);

  const closeGallery = useCallback(() => goTo(null), [goTo]);

  const activeCategory = categories.find((c) => c.id === activeId);

  return (
    <section className="pj-section" id="projects" ref={sectionRef}>
      <div className="pj-corner-web" aria-hidden="true">
        <svg viewBox="0 0 500 500" fill="none" stroke="currentColor">
          <path d="M500,0 L350,150 M500,50 L280,120 M500,120 L200,200 M500,200 L120,300 M350,150 Q280,220 200,200 M280,120 Q200,180 120,300" strokeWidth="1.2" />
          <path d="M420,0 Q320,100 280,120 M350,150 Q300,260 120,300" strokeWidth="0.8" stroke="var(--pj-red)" />
        </svg>
      </div>

      <header className="pj-header">
        <span className="pj-eyebrow">DIGITAL EXPERIENCES & CREATIVE WORK</span>
        <h2 className="pj-title">SELECTED PROJECTS</h2>
        <div className="pj-title-underline" />
      </header>

      <div className="pj-spiderman-container" aria-hidden="true">
        <img src={spiderman} alt="Spider-Man" className="pj-spiderman-img" />
      </div>

      <div
        ref={stageRef}
        className={`pj-stage ${leaving ? "is-leaving" : ""}`}
      >
        {activeCategory ? (
          <CategoryGallery
            key={activeCategory.id}
            category={activeCategory}
            projects={projects.filter((p) => p.categoryId === activeCategory.id)}
            onBack={closeGallery}
          />
        ) : (
          <CategoryOverview
            categories={categories}
            projects={projects}
            onOpen={goTo}
          />
        )}
      </div>
    </section>
  );
}