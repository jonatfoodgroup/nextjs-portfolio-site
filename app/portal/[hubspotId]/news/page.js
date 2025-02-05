"use client";
import { useState } from "react";

export default function NewsSelection() {
  const [newsArticles, setNewsArticles] = useState([
    {
      title: "Meta Platforms' Potential Reincorporation in Texas",
      description:
        "Meta Platforms is reportedly considering moving its legal incorporation from Delaware to Texas. This move aligns with a trend of major corporations seeking more favorable legal and regulatory environments, with Texas emerging as a preferred destination.",
      url: "https://www.wsj.com/tech/meta-in-talks-to-reincorporate-in-texas-or-another-state-exit-delaware-f06e8bab?utm_source=chatgpt.com",
    },
    {
      title: "Texas Stock Exchange's National Ambitions",
      description:
        "The Texas Stock Exchange (TXSE) has filed an application to become a national securities exchange, aiming to commence trading in early 2026. With $161 million in capital from investors like BlackRock and Citadel Securities, TXSE seeks to position itself as a challenger to established exchanges such as Nasdaq and the New York Stock Exchange.",
      url: "https://www.reuters.com/markets/us/texas-stock-exchange-files-operate-nationally-eyes-trading-early-2026-2025-01-31/?utm_source=chatgpt.com",
    },
    {
      title: "Lifted Trucks' New Dealership in Lubbock",
      description:
        "Lifted Trucks, a custom truck dealership, is set to open a new location in Lubbock, Texas, this month. Known for selling professionally lifted trucks from brands like Ford and Chevrolet, this expansion reflects the growing demand for customized vehicles in the region.",
      url: "https://www.the-sun.com/motors/13441388/custom-car-dealership-open-lifted-trucks-texas-lubbock/?utm_source=chatgpt.com",
    },
    {
      title: "Oil Industry Optimism in Midland",
      description:
        "Following recent political developments, there is renewed enthusiasm among oil industry leaders in Midland, Texas. They anticipate a resurgence in drilling activities, driven by expectations of deregulation and increased support for fossil fuels.",
      url: "https://www.thetimes.co.uk/article/the-real-landman-the-texan-oil-barons-betting-on-a-trump-boom-nmd3hhclk?utm_source=chatgpt.com",
    },
    {
      title: "Texas Rangers' New Broadcasting Network",
      description:
        "The Texas Rangers have established the Rangers Sports Network to oversee the production and distribution of their game broadcasts. This initiative aims to provide fans with more viewing options and reflects a broader trend of sports teams taking control of their media rights.",
      url: "https://apnews.com/article/5d93798fa9f4acc127dd54e0d6cbe0ce?utm_source=chatgpt.com",
    },
  ]);

  const [selectedArticles, setSelectedArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({
    title: "",
    description: "",
    url: "",
  });

  const handleSelectArticle = (index) => {
    const article = newsArticles[index];
    setSelectedArticles((prev) =>
      prev.some((a) => a.title === article.title)
        ? prev.filter((a) => a.title !== article.title)
        : [...prev, article]
    );
  };

  const handleAddArticle = () => {
    if (newArticle.title && newArticle.description && newArticle.url) {
      setNewsArticles([...newsArticles, newArticle]);
      setNewArticle({ title: "", description: "", url: "" });
    }
  };

  return (
    <div className="p-8 text-center min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-gray-200">📌 Select News for Content Calendar</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsArticles.map((article, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 text-start">
            <h2 className="text-xl font-semibold text-gray-100">{article.title}</h2>
            <p className="text-sm text-gray-400 mt-2">{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline mt-3 inline-block"
            >
              Read More
            </a>
            <button
              onClick={() => handleSelectArticle(index)}
              className={`mt-4 px-6 py-2 text-sm font-bold rounded transition ${
                selectedArticles.some((a) => a.title === article.title)
                  ? "bg-green-500 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              } w-full`}
            >
              {selectedArticles.some((a) => a.title === article.title) ? "✅ Selected" : "Use"}
            </button>
          </div>
        ))}
      </div>

      {/* Add New Article Section */}
      <div className="mt-12 p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-200">📤 Share Your Own News</h2>
        
        <input
          type="text"
          placeholder="Title"
          value={newArticle.title}
          onChange={(e) =>
            setNewArticle({ ...newArticle, title: e.target.value })
          }
          className="border border-gray-600 bg-gray-700 text-white p-3 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Description"
          value={newArticle.description}
          onChange={(e) =>
            setNewArticle({ ...newArticle, description: e.target.value })
          }
          className="border border-gray-600 bg-gray-700 text-white p-3 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="URL"
          value={newArticle.url}
          onChange={(e) => setNewArticle({ ...newArticle, url: e.target.value })}
          className="border border-gray-600 bg-gray-700 text-white p-3 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddArticle}
          className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded transition"
        >
          ➕ Add Article
        </button>
      </div>

      {/* Selected Articles Display */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-200">📌 Selected Articles for Calendar</h2>
        {selectedArticles.length > 0 ? (
          <ul className="list-disc ml-6 mt-4 text-gray-300">
            {selectedArticles.map((article, index) => (
              <li key={index}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-4">No articles selected yet.</p>
        )}
      </div>
    </div>
  );
}