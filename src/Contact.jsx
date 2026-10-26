import React, { useState } from "react";
import spiderman from "./assets/image copy 3.png"; // put your image at src/assets/spiderman.png
import "./Contact.css";

/* ==========================================================================
   YOUR WHATSAPP NUMBER
   Country code + number, digits only (no +, spaces or dashes).
   Example for India: 919876543210
   ========================================================================== */
const WHATSAPP_NUMBER = "91XXXXXXXXXX";

// Decorative spider web (radial threads + concentric rings)
const Web = () => {
  const cx = 300,
    cy = 300,
    threads = 14,
    rings = 7;
  const lines = [];
  for (let i = 0; i < threads; i++) {
    const a = (i / threads) * Math.PI * 2;
    lines.push(
      <line key={`t${i}`} x1={cx} y1={cy} x2={cx + Math.cos(a) * 290} y2={cy + Math.sin(a) * 290} />
    );
  }
  const rs = [];
  for (let r = 1; r <= rings; r++) {
    const radius = r * 40;
    const pts = [];
    for (let i = 0; i < threads; i++) {
      const a = (i / threads) * Math.PI * 2;
      const wob = 1 - 0.08 * Math.sin(i * 2.3 + r);
      pts.push(`${cx + Math.cos(a) * radius * wob},${cy + Math.sin(a) * radius * wob}`);
    }
    rs.push(<polygon key={`r${r}`} points={pts.join(" ")} />);
  }
  return (
    <svg className="contact-web" viewBox="0 0 600 600" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        {lines}
        {rs}
      </g>
    </svg>
  );
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build the WhatsApp message from the form
    const text =
      `*New message from your portfolio*\n\n` +
      `*Name:* ${form.name}\n` +
      `*Email:* ${form.email}\n` +
      `*Message:* ${form.message}`;

    const url = `https://wa.me/${7559028950}?text=${encodeURIComponent(text)}`;

    // Open WhatsApp (app on phone, WhatsApp Web on desktop)
    window.open(url, "_blank", "noopener,noreferrer");

    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section className="contact" id="contact">
      <Web />

      <div className="contact-header">
        <span className="contact-eyebrow">
          <span className="contact-eyebrow-icon" />
          GET IN TOUCH
        </span>
        <h2 className="contact-title" data-text="CONTACT.">
          CONTACT.
        </h2>
        <span className="contact-underline" />
      </div>

      <form className="contact-card" onSubmit={handleSubmit}>
        <div className="contact-row">
          <div className="contact-field">
            <label htmlFor="name">Your Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Peter Parker"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contact-field">
            <label htmlFor="email">Your Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="peter@stark.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="contact-field">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Let's build something amazing together..."
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="contact-btn">
          {sent ? "MESSAGE SENT ✓" : "SEND MESSAGE"}
        </button>
      </form>

      <img src={spiderman} alt="Spider-Man hanging upside down" className="contact-spidey" />
    </section>
  );
};

export default Contact; 