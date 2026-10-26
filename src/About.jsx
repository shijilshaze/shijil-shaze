import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import spiderman from "./assets/spiderman.png"; // Spider-Man artwork -> band thumbnails
import profile from "./assets/profile.png"; // your personal photo -> circular portrait
import "./About.css";

/* The portrait shows black & white, and its ORIGINAL colours while the mouse is on it.
   CSS can only remove colour, never add it back, so this needs a photo that really is in colour.
   - If src/assets/profile.png is a colour photo: nothing else to do.
   - If profile.png is already black & white: add your colour photo to src/assets/ with
     "color" or "colour" in its name, e.g. profile-color.png, my-photo-color.jpg, color.webp
     (png / jpg / jpeg / webp). It is picked up automatically and cross-faded in on click. */
const COLOR_PHOTOS = import.meta.glob("./assets/*{color,colour,Color,Colour}*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
});
const COLOR_SRC = Object.values(COLOR_PHOTOS)[0] || null;

/* ------------------------------------------------------------------ */
/* Content: edit these to change the text on the page                  */
/* ------------------------------------------------------------------ */
const OWNER_NAME = "MUHAMMED SHIJIL NK";
const BIO = [
  "I’m Shijil Shaze, a passionate Full-Stack Web Developer specializing in building modern, responsive, and scalable web applications. My focus is on creating high-performance digital experiences that combine intuitive user interfaces, reliable backend systems, and clean, maintainable code. With expertise in frontend and backend development, I transform ideas into functional web solutions that deliver real value to users and businesses.",
  "My technical expertise spans React.js, Next.js, JavaScript, TypeScript, Node.js, and Express.js, enabling me to develop interactive websites and robust web applications from the ground up. I also work with MongoDB and PostgreSQL for database management, alongside Tailwind CSS and GSAP to create visually engaging interfaces with smooth animations and responsive designs.",
  "Beyond web development, I have experience with Python, Artificial Intelligence and Machine Learning fundamentals, Docker, Git, GitHub, and data structures. I value performance, scalability, security, and user experience in every project I undertake, continuously refining my skills to keep pace with evolving web technologies and development practices.",
  "As a Full-Stack Web Developer, my goal is to build digital products that are not only visually appealing but also technically reliable, accessible, and ready to grow. Whether developing a responsive business website, an interactive web application, or a complete full-stack solution, I approach every project with a problem-solving mindset and a commitment to quality.",
];
const TECH_STACK = ["React", "JavaScript", "Node.js", "Express", "MongoDB", "Git", "GitHub"];
// 7 chips laid out as 4 + 3, each row with its own small vertical offsets (px)
// for the hand-placed, staggered look from the reference.
const TECH_ROWS = [
  { items: TECH_STACK.slice(0, 4), offsets: [0, 13, 0, 6] },
  { items: TECH_STACK.slice(4), offsets: [0, 4, -3] },
];

const RED_LABELS = [
  "GSAP ANIMATIONS",
  "REACT NATIVE",
  "FULL STACK ENGINEER",
  "FRONTEND DEVELOPMENT",
  "CREATIVE DEVELOPMENT",
  "UI/UX DESIGN",
];
const BLACK_LABELS = [
  "REACT NATIVE",
  "FULL STACK ENGINEER",
  "FRONTEND DEVELOPMENT",
  "INTERACTIVE EXPERIENCES",
  "GSAP ANIMATIONS",
  "UI/UX DESIGN",
];

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ */
/* Reveal once when scrolled into view (does not replay on every scroll) */
/* ------------------------------------------------------------------ */
function useInViewOnce(ref, threshold = 0.2) {
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);

  return seen;
}

/* ------------------------------------------------------------------ */
/* Hand-drawn spider web as SVG (transparent, no image asset needed)    */
/* ------------------------------------------------------------------ */
function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pt = (cx, cy, angle, r) =>
  `${(cx + Math.cos(angle) * r).toFixed(1)} ${(cy + Math.sin(angle) * r).toFixed(1)}`;

function buildWeb(seed, spokeCount = 14, ringCount = 9) {
  const rnd = mulberry32(seed);
  const cx = 100;
  const cy = 100;
  const spokes = Array.from({ length: spokeCount }, (_, i) => ({
    angle: (i / spokeCount) * Math.PI * 2 + (rnd() - 0.5) * 0.3,
    radius: 96 * (0.76 + rnd() * 0.24),
  }));
  const spokePaths = spokes.map(
    (s) => `M ${pt(cx, cy, s.angle, 2 + rnd() * 3)} L ${pt(cx, cy, s.angle, s.radius)}`
  );
  const ringPaths = [];
  for (let k = 1; k <= ringCount; k += 1) {
    const t = 0.1 + (k / ringCount) * 0.9;
    let d = "";
    for (let i = 0; i < spokeCount; i += 1) {
      const a = spokes[i];
      const b = spokes[(i + 1) % spokeCount];
      const ra = a.radius * t * (0.95 + rnd() * 0.07);
      const rb = b.radius * t * (0.95 + rnd() * 0.07);
      let bAngle = b.angle;
      if (bAngle < a.angle) bAngle += Math.PI * 2;
      const mid = (a.angle + bAngle) / 2;
      const sag = ((ra + rb) / 2) * (0.8 + rnd() * 0.06);
      const skip = k > 2 && rnd() < 0.07;
      d += `${i === 0 || skip ? "M" : "L"} ${pt(cx, cy, a.angle, ra)} `;
      d += `Q ${pt(cx, cy, mid, sag)} ${pt(cx, cy, bAngle, rb)} `;
    }
    ringPaths.push(d.replace(/^L/, "M"));
  }
  return { spokePaths, ringPaths };
}

function Web({ seed }) {
  const { spokePaths, ringPaths } = useMemo(() => buildWeb(seed), [seed]);
  return (
    <svg
      className="web"
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
    >
      <g strokeWidth="1.8">
        {spokePaths.map((d, i) => (
          <path key={`s${i}`} d={d} />
        ))}
      </g>
      <g strokeWidth="1.2">
        {ringPaths.map((d, i) => (
          <path key={`r${i}`} d={d} />
        ))}
      </g>
    </svg>
  );
}

function SpiderGlyph() {
  return (
    <svg className="band__glyph" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none">
        <path d="M13 13 L5 6 L2 8" />
        <path d="M13 16 L3 15" />
        <path d="M13 19 L4 24 L3 28" />
        <path d="M13 22 L8 29" />
        <path d="M19 13 L27 6 L30 8" />
        <path d="M19 16 L29 15" />
        <path d="M19 19 L28 24 L29 28" />
        <path d="M19 22 L24 29" />
      </g>
      <ellipse cx="16" cy="19" rx="4.2" ry="6.2" fill="currentColor" />
      <circle cx="16" cy="11" r="3" fill="currentColor" />
    </svg>
  );
}

/* One half of a marquee loop. Rendered twice so the -50% translate loops seamlessly. */
function BandSet({ labels, hidden }) {
  return (
    <div className="band__set" aria-hidden={hidden ? "true" : undefined}>
      {labels.map((label, i) => (
        <Fragment key={`${label}-${i}`}>
          <span className="band__label">{label}</span>
          {i % 2 === 0 ? (
            <span className="band__thumb">
              <img src={spiderman} alt="" draggable="false" />
            </span>
          ) : (
            <SpiderGlyph />
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const bandsRef = useRef(null);
  const copyRef = useRef(null);
  const asideRef = useRef(null);
  const stackRef = useRef(null);

  // Portrait: black & white by default. Colour fades in as soon as the mouse touches it
  // and fades back out when the mouse leaves. On touch screens (no hover), a tap toggles it.
  const [colored, setColored] = useState(false);
  const onPortraitEnter = (e) => {
    if (e.pointerType === "mouse") setColored(true);
  };
  const onPortraitLeave = (e) => {
    if (e.pointerType === "mouse") setColored(false);
  };
  const onPortraitClick = (e) => {
    // A real mouse is already handled by hover; taps and keyboard presses toggle.
    if (e.nativeEvent.pointerType === "mouse") return;
    setColored((v) => !v);
  };

  // Dev-only hint: warns in the console if profile.png is already black & white,
  // because then no CSS can bring the colours back.
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.info(
        COLOR_SRC
          ? "[About] colour photo found: " + Object.keys(COLOR_PHOTOS)[0]
          : "[About] no colour photo found in src/assets (name must contain 'color' or 'colour')."
      );
    }
    if (!import.meta.env.DEV || COLOR_SRC) return undefined;
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      try {
        const size = 48;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, size, size);
        const data = ctx.getImageData(0, 0, size, size).data;
        let spread = 0;
        let count = 0;
        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] < 200) continue;
          spread += Math.max(data[i], data[i + 1], data[i + 2]) - Math.min(data[i], data[i + 1], data[i + 2]);
          count += 1;
        }
        if (count && spread / count < 4) {
          console.warn(
            "[About] profile.png is already black & white, so the click cannot show colour. " +
              "Add a colour version as src/assets/profile-color.png (name must contain 'color')."
          );
        }
      } catch {
        /* ignore: only a development hint */
      }
    };
    img.src = profile;
    return () => {
      cancelled = true;
    };
  }, []);

  const bandsIn = useInViewOnce(bandsRef, 0.15);
  const copyIn = useInViewOnce(copyRef, 0.2);
  const asideIn = useInViewOnce(asideRef, 0.2);
  const stackIn = useInViewOnce(stackRef, 0.3);

  // Scroll progress (--p, 0..1) drives the gentle band / web parallax, and the
  // navbar turns black once the About section starts to enter the screen.
  // Written straight to CSS, so React does not re-render while scrolling.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const reduce = prefersReducedMotion();
    const root = document.documentElement;
    let raf = 0;
    let tone = "";

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (!reduce) {
        const p = clamp((vh - rect.top) / (vh + rect.height), 0, 1);
        el.style.setProperty("--p", p.toFixed(4));
      }
      const next = rect.top < vh * 0.9 ? "dark" : "light";
      if (next !== tone) {
        tone = next;
        root.setAttribute("data-nav-tone", next);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      root.removeAttribute("data-nav-tone");
    };
  }, []);

  return (
    <section id="about" className="about" ref={sectionRef} aria-labelledby="about-title">
      {/* ---------- Opening: two crossing bands ---------- */}
      <div className={`bands ${bandsIn ? "is-in" : ""}`} ref={bandsRef} aria-hidden="true">
        <div className="band-slot band-slot--black">
          <div className="band band--black">
            <div className="band__track">
              <BandSet labels={BLACK_LABELS} />
              <BandSet labels={BLACK_LABELS} hidden />
            </div>
          </div>
        </div>
        <div className="band-slot band-slot--red">
          <div className="band band--red">
            <div className="band__track">
              <BandSet labels={RED_LABELS} />
              <BandSet labels={RED_LABELS} hidden />
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Pale spider webs (behind the content) ---------- */}
      <div className="about__webs" aria-hidden="true">
        <div className="web-box web-box--l">
          <Web seed={11} />
        </div>
        <div className="web-hang">
          <div className="web-box web-box--r">
            <Web seed={33} />
          </div>
        </div>
      </div>

      {/* ---------- Introduction ---------- */}
      <div className="about__inner">
        <div className={`about__copy ${copyIn ? "is-in" : ""}`} ref={copyRef}>
          <p className="about__label rv" style={{ "--d": 0 }}>
            <span className="about__tick" aria-hidden="true">
              <img src={spiderman} alt="" draggable="false" />
            </span>
            BEHIND THE MASK
          </p>

          <h2 id="about-title" className="about__title rv" style={{ "--d": 0.12 }}>
            {OWNER_NAME}
          </h2>

          {BIO.map((text, i) => (
            <p key={i} className={`about__bio rv ${i % 2 === 0 ? "about__bio--red" : "about__bio--black"}`} style={{ "--d": 0.26 + i * 0.12 }}>
              {text}
            </p>
          ))}

          <div className={`stack ${stackIn ? "is-in" : ""}`} ref={stackRef}>
            <h3 className="stack__label">PRIMARY TECH STACK</h3>
            <div className="stack__rows">
              {TECH_ROWS.map((row, r) => (
                <ul key={r} className="stack__row">
                  {row.items.map((tech, i) => {
                    const n = r * 4 + i; // running index for stagger timing
                    return (
                      <li
                        key={tech}
                        className="stack__item"
                        style={{ "--dy": `${row.offsets[i]}px`, "--d": `${0.09 * n}s` }}
                      >
                        <span
                          className="chip-float"
                          style={{ "--cd": `${-0.8 * (n % 5)}s`, "--cs": `${4.4 + (n % 3) * 0.7}s` }}
                        >
                          <span className="chip">{tech}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ))}
            </div>
          </div>
        </div>

        <div className={`about__aside ${asideIn ? "is-in" : ""}`} ref={asideRef}>
          <div className="about__swing">
            <span className="about__line" aria-hidden="true" />
            <div className="about__portrait">
              <button
                type="button"
                className={`portrait__btn ${COLOR_SRC ? "has-alt" : ""} ${colored ? "is-color" : ""}`}
                onPointerEnter={onPortraitEnter}
                onPointerLeave={onPortraitLeave}
                onFocus={(e) => e.target.matches(":focus-visible") && setColored(true)}
                onBlur={() => setColored(false)}
                onClick={onPortraitClick}
                aria-pressed={colored}
                aria-label="Show portrait in original colour"
              >
                <span className="portrait__photo">
                  <img
                    className={`portrait__img ${
                      colored && !COLOR_SRC ? "portrait-color" : "portrait-grayscale"
                    }`}
                    src={profile}
                    alt={`Portrait of ${OWNER_NAME.replace(".", "")}`}
                    draggable="false"
                  />
                  {COLOR_SRC && (
                    <img
                      className="portrait__img portrait__img--alt portrait-color"
                      src={COLOR_SRC}
                      alt=""
                      aria-hidden="true"
                      draggable="false"
                    />
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}