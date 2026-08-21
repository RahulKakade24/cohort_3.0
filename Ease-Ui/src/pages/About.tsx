import { Link } from "react-router";
import { ArrowRight, Check, Code2, Layers3, Sparkles } from "lucide-react";

const features = [
  { icon: Layers3, title: "Reusable components", text: "Buttons, cards, modals, inputs and more are documented with live previews." },
  { icon: Code2, title: "Developer friendly", text: "Every component page includes an API reference and copy-ready usage examples." },
  { icon: Sparkles, title: "Polished interactions", text: "Animations, responsive layouts, accessible controls and light/dark themes are built in." },
];

export default function About() {
  return (
    <div className="page-container about-page">
      <section className="about-hero">
        <span className="eyebrow">About EaseUi</span>
        <h1 className="page-title">A practical component library for modern React interfaces.</h1>
        <p className="page-description">
          EaseUi brings reusable components, live demonstrations, API references and responsive behavior into one simple documentation experience.
        </p>
        <div className="about-actions">
          <Link to="/components/button" className="primary-action">
            Explore components <ArrowRight size={17} />
          </Link>
          <Link to="/templates" className="secondary-action">Browse templates</Link>
        </div>
      </section>

      <section className="about-grid" aria-label="EaseUi features">
        {features.map(({ icon: Icon, title, text }) => (
          <article key={title} className="about-card">
            <div className="about-card-icon"><Icon size={20} /></div>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="about-mission">
        <div>
          <span className="eyebrow">Our mission</span>
          <h2>Make good UI patterns easier to reuse.</h2>
        </div>
        <ul>
          <li><Check size={17} /> Responsive from the start</li>
          <li><Check size={17} /> Keyboard-friendly interactions</li>
          <li><Check size={17} /> Light and dark theme support</li>
          <li><Check size={17} /> Clear component documentation</li>
        </ul>
      </section>
    </div>
  );
}
