import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import spiderman from "./assets/profile.png";
import profile from "./assets/spiderman.png";
import "./Hero.css";

const NAV_LINKS = [
  { label: "ABOUT", target: "about" },
  { label: "SKILLS", target: "skills" },
  { label: "PROJECTS", target: "projects" },
  { label: "CONTACT", target: "contact" },
];

const FULL_NAME = "MR. MUHAMMED SHIJIL"; // shown on ONE line
const RESUME_URL = "/resume.png"; // place resume.png inside /public

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }
  return false;
}

/* ------------------------------------------------------------------ */
/* Hand-drawn spider web, generated as SVG (transparent, no PNG needed) */
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

function buildWeb(seed, spokeCount = 13, ringCount = 8) {
  const rnd = mulberry32(seed);
  const cx = 100;
  const cy = 100;

  const spokes = Array.from({ length: spokeCount }, (_, i) => ({
    angle: (i / spokeCount) * Math.PI * 2 + (rnd() - 0.5) * 0.28,
    radius: 94 * (0.78 + rnd() * 0.22),
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
      const sag = ((ra + rb) / 2) * (0.8 + rnd() * 0.06); // thread sags toward the centre
      const skip = k > 2 && rnd() < 0.07; // a few broken threads for a sketchy look
      d += `${i === 0 || skip ? "M" : "L"} ${pt(cx, cy, a.angle, ra)} `;
      d += `Q ${pt(cx, cy, mid, sag)} ${pt(cx, cy, bAngle, rb)} `;
    }
    ringPaths.push(d.replace(/^L/, "M"));
  }
  return { spokePaths, ringPaths };
}

function Web({ seed, className }) {
  const { spokePaths, ringPaths } = useMemo(() => buildWeb(seed), [seed]);
  return (
    <div className={`web-wrap ${className}`}>
      <svg
        className="web"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
      >
        <g strokeWidth="1.5">
          {spokePaths.map((d, i) => (
            <path key={`s${i}`} d={d} />
          ))}
        </g>
        <g strokeWidth="1">
          {ringPaths.map((d, i) => (
            <path key={`r${i}`} d={d} />
          ))}
        </g>
      </svg>
    </div>
  );
}

function SpiderLogo() {
  return (
    <svg
      className="logo__mark"
      viewBox="0 0 32 32"
      width="28"
      height="28"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="#D71920" strokeWidth="1.6" strokeLinecap="round" fill="none">
        <path d="M13 13 L5 6 L2 8" />
        <path d="M13 16 L3 15" />
        <path d="M13 19 L4 24 L3 28" />
        <path d="M13 22 L8 29" />
        <path d="M19 13 L27 6 L30 8" />
        <path d="M19 16 L29 15" />
        <path d="M19 19 L28 24 L29 28" />
        <path d="M19 22 L24 29" />
      </g>
      <ellipse cx="16" cy="19" rx="4.2" ry="6.2" fill="#D71920" />
      <circle cx="16" cy="11" r="3" fill="#D71920" />
    </svg>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  const handleNav = useCallback((e, target) => {
    if (scrollToSection(target)) e.preventDefault();
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="nav">
      <a
        className="logo"
        href="#home"
        aria-label="Home"
        onClick={(e) => {
          if (scrollToSection("home")) e.preventDefault();
        }}
      >
        <SpiderLogo />
        <span className="logo__text">SHIJIL NK</span>
      </a>

      <button
        type="button"
        className="nav__toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <nav aria-label="Primary">
        <ul id="nav-links" className={`nav__links ${open ? "is-open" : ""}`}>
          {NAV_LINKS.map(({ label, target }) => (
            <li key={target}>
              <a
                className="nav__link"
                href={`#${target}`}
                onClick={(e) => handleNav(e, target)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const characterRef = useRef(null);

  // One rAF loop drives everything that follows the pointer. Values are eased and
  // written to CSS variables on the hero, so React never re-renders while moving.
  //   --mx / --my : parallax (-1..1)          --sy : scroll offset (px)
  //   --cx / --cy : reveal centre (px, relative to the character image)
  //   --rv        : reveal strength 0..1 (fades in on enter, out on leave)
  useEffect(() => {
    const root = heroRef.current;
    const character = characterRef.current;
    if (!root || !character) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const target = { x: 0, y: 0, s: window.scrollY, rx: 0, ry: 0, rv: 0 };
    const cur = { x: 0, y: 0, s: window.scrollY, rx: 0, ry: 0, rv: 0 };
    const pointer = { x: 0, y: 0, active: false };
    let raf = 0;

    // Convert the pointer position (viewport) into the character image's own
    // coordinate space, so the reveal stays glued to the cursor even while the
    // image shifts slightly with parallax.
    const place = () => {
      const rect = character.getBoundingClientRect();
      target.rx = pointer.x - rect.left;
      target.ry = pointer.y - rect.top;
    };

    const isDirty = () =>
      Math.abs(target.x - cur.x) > 0.001 ||
      Math.abs(target.y - cur.y) > 0.001 ||
      Math.abs(target.s - cur.s) > 0.05 ||
      cur.rx !== target.rx ||
      cur.ry !== target.ry ||
      cur.rv !== target.rv;

    const tick = () => {
      if (pointer.active) place();

      const kPos = reduce ? 1 : 0.2;
      const kFade = reduce ? 1 : 0.14;

      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      cur.s += (target.s - cur.s) * 0.1;
      cur.rx += (target.rx - cur.rx) * kPos;
      cur.ry += (target.ry - cur.ry) * kPos;
      cur.rv += (target.rv - cur.rv) * kFade;

      if (Math.abs(target.rv - cur.rv) < 0.003) cur.rv = target.rv;
      if (Math.abs(target.rx - cur.rx) < 0.1) cur.rx = target.rx;
      if (Math.abs(target.ry - cur.ry) < 0.1) cur.ry = target.ry;

      root.style.setProperty("--mx", cur.x.toFixed(4));
      root.style.setProperty("--my", cur.y.toFixed(4));
      root.style.setProperty("--sy", cur.s.toFixed(2));
      root.style.setProperty("--cx", cur.rx.toFixed(1));
      root.style.setProperty("--cy", cur.ry.toFixed(1));
      root.style.setProperty("--rv", cur.rv.toFixed(3));

      // Frames only continue while something is still easing. With a stationary
      // pointer and everything settled, the loop stops and costs nothing.
      raf = isDirty() ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    // ---- reveal: pointer inside the hero (mouse hover, or finger while touching)
    const onPointerMove = (e) => {
      // Listening on the window (not just the hero) keeps the reveal alive while the
      // cursor passes over the fixed navbar; it only shows inside the hero's bounds.
      const box = root.getBoundingClientRect();
      const inside =
        e.clientX >= box.left &&
        e.clientX <= box.right &&
        e.clientY >= box.top &&
        e.clientY <= box.bottom;
      if (!inside) {
        hideReveal();
        return;
      }
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      place();
      // Coming back after it faded out: appear right under the cursor, not at the old spot.
      if (cur.rv < 0.05) {
        cur.rx = target.rx;
        cur.ry = target.ry;
      }
      target.rv = 1;
      kick();
    };
    const hideReveal = () => {
      pointer.active = false;
      target.rv = 0;
      kick();
    };
    const onPointerUp = (e) => {
      if (e.pointerType === "touch") hideReveal();
    };

    // ---- parallax (mouse + scroll), disabled for reduced motion
    const onMove = (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
      kick();
    };
    const onLeaveWindow = () => {
      target.x = 0;
      target.y = 0;
      kick();
    };
    const onScroll = () => {
      target.s = Math.min(window.scrollY, window.innerHeight * 1.5);
      kick();
    };

    window.addEventListener("pointerdown", onPointerMove, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", hideReveal, { passive: true });
    document.documentElement.addEventListener("pointerleave", hideReveal);

    if (!reduce) {
      if (finePointer) {
        window.addEventListener("mousemove", onMove, { passive: true });
        document.documentElement.addEventListener("mouseleave", onLeaveWindow);
      }
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    kick();

    return () => {
      window.removeEventListener("pointerdown", onPointerMove);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", hideReveal);
      document.documentElement.removeEventListener("pointerleave", hideReveal);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const handleExplore = () => {
    if (!scrollToSection("projects")) {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />

      <section id="home" className="hero" ref={heroRef} aria-labelledby="hero-title">
        {/* Decorative webs, behind everything */}
        <div className="webs" aria-hidden="true">
          <Web seed={7} className="web-wrap--tl" />
          <Web seed={21} className="web-wrap--br" />
          <Web seed={5} className="web-wrap--r" />
        </div>

        {/* Central character: portrait is always the base; Spider-Man is revealed
            only around the pointer through a radial mask (see Hero.css). */}
        <div className="character" ref={characterRef}>
          <img
            className="character__img character__img--base"
            src={profile}
            alt="Portrait of Muhammed Shijil"
            draggable="false"
          />
          {/* The mask lives on this wrapper (so the circle tracks the cursor exactly);
              the image inside can be scaled / moved independently with the --face-*
              variables in Hero.css without moving the circle. */}
          <div className="character__reveal">
            <img
              className="character__img character__img--reveal"
              src={spiderman}
              alt=""
              aria-hidden="true"
              draggable="false"
            />
          </div>
        </div>

        {/* Left intro */}
        <div className="intro">
          <p className="intro__label" style={{ "--i": 0 }}>
            YOUR FRIENDLY NEIGHBORHOOD DESIGNER & DEVELOPER
          </p>

          <h1 id="hero-title" className="intro__title">
            <span className="intro__line" style={{ "--i": 1 }}>
              {FULL_NAME}
            </span>
          </h1>

          <div className="intro__actions" style={{ "--i": 3 }}>
            <button type="button" className="btn btn--red" onClick={handleExplore}>
              EXPLORE PROJECTS
            </button>
            <a className="btn btn--dark" href={RESUME_URL} download="resume.png">
              <Download size={16} aria-hidden="true" />
              DOWNLOAD RESUME.PDF
            </a>
          </div>
        </div>
      </section>
    </>
  );
}