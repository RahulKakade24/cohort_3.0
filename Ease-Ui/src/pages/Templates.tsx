import { ArrowRight, LayoutDashboard, ShoppingBag, UserRound } from "lucide-react";
import { Link } from "react-router";

const templateCards = [
  {
    title: "SaaS Dashboard",
    description: "A responsive analytics layout for products, metrics and admin workflows.",
    icon: LayoutDashboard,
    tag: "Dashboard",
    path: "/components/layout",
  },
  {
    title: "E-Commerce Store",
    description: "A clean storefront structure for product browsing, cards and conversion-focused sections.",
    icon: ShoppingBag,
    tag: "Commerce",
    path: "/components/card",
  },
  {
    title: "Portfolio Landing",
    description: "A minimal creative landing structure for projects, skills and personal branding.",
    icon: UserRound,
    tag: "Portfolio",
    path: "/components/navbar",
  },
];

export default function Templates() {
  return (
    <div className="page-container templates-page">
      <header className="templates-heading">
        <span className="eyebrow">Templates</span>
        <h1 className="page-title">Start from a solid layout.</h1>
        <p className="page-description">Responsive starter structures that connect directly to the components documented in EaseUi.</p>
      </header>

      <div className="template-grid">
        {templateCards.map(({ title, description, icon: Icon, tag, path }) => (
          <article key={title} className="template-card">
            <div className="template-preview">
              <div className="template-preview-top"><span /><span /><span /></div>
              <div className="template-preview-body">
                <div className="template-preview-sidebar" />
                <div className="template-preview-main">
                  <div />
                  <div />
                  <div />
                </div>
              </div>
            </div>
            <div className="template-card-body">
              <div className="template-icon"><Icon size={20} /></div>
              <span className="template-tag">{tag}</span>
              <h2>{title}</h2>
              <p>{description}</p>
              <Link to={path} className="template-link">
                Explore components <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
