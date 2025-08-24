import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
// Import the repo root markdown file as raw text (Vite supports ?raw)
// Adjust path relative to this file location
import privacyMd from "../../PRIVACY-POLICY.md?raw";

const Privacy = () => {
  // Ensure page starts at top on mount
  useEffect(() => {
    try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch {}
  }, []);

  return (
    <div className="min-h-screen">
      {/* Content */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <article className="prose prose-invert max-w-3xl mx-auto prose-headings:text-white prose-p:text-white/90 prose-strong:text-white prose-a:text-sca-gold [&_*]:scroll-mt-28">
            <ReactMarkdown>{privacyMd}</ReactMarkdown>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
