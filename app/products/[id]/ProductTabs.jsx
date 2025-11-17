export default function ProductTabs({ activeTab, setActiveTab, product }) {
  return (
    <>
      {/* Tabs Navigation */}
      <nav className="mt-4">
        <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700">
          {["description", "specs", "reviews"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`pb-2 -mb-[1px] ${
                activeTab === t
                  ? "border-b-2 border-red-600 text-red-600 dark:text-red-400 font-semibold"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      {/* Tab Content */}
      <div className="mt-4 text-gray-700 dark:text-gray-200">
        {activeTab === "description" && (
          <p className="leading-relaxed">{product.description}</p>
        )}

        {activeTab === "specs" && (
          <ul className="list-disc list-inside space-y-1">
            {product.specs && product.specs.length
              ? product.specs.map((s, idx) => <li key={idx}>{s}</li>)
              : ["High performance", "Fast processor", "Lightweight"].map(
                  (s, idx) => <li key={idx}>{s}</li>
                )}
          </ul>
        )}

        {activeTab === "reviews" && <p>No reviews yet.</p>}
      </div>
    </>
  );
}
