

interface TemplateCard {
  id: number;
  title: string;
  description: string;
}

const templateCards: TemplateCard[] = [
  { 
    id: 1, 
    title: "SaaS Dashboard", 
    description: "Modern responsive metrics dashboard with real-time statistics." 
  },
  { 
    id: 2, 
    title: "E-Commerce Store", 
    description: "Product grid layout optimized for mobile conversion and desktop browsing." 
  },
  { 
    id: 3, 
    title: "Portfolio Landing", 
    description: "Clean creative showcase with adaptive dark mode contrast." 
  },
];

export default function Templates() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold  `text-(--text-main)`mb-2">
        Templates
      </h1>
      <p className="`text-(--text-muted)` mb-8">
        Explore our ready-to-use responsive layouts and components.
      </p>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templateCards.map((card) => (
          <div 
            key={card.id}
            className="p-6 rounded-xl `bg-(--bg-card)`  `border-(--border-color)` shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold `text-(--text-main)` mb-2">
                {card.title}
              </h3>
              <p className="`text-(--text-muted)`text-sm mb-6">
                {card.description}
              </p>
            </div>
            <button className="w-full py-2 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors cursor-pointer">
              Use Template
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
