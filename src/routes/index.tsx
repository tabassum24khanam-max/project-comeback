import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import sheCss from "@/she/she.css?url";
import markup from "@/she/markup.html?raw";
import loaderScript from "@/she/loader-script.js?raw";
import siteScript from "@/she/site-script.js?raw";

const TITLE = "SHE — Saudi House of Expertise | Supply & Procurement Since 1971";
const DESCRIPTION =
  "Saudi House of Expertise (SHE) — a Saudi-owned single-source supply & procurement partner since 1971. Twelve product lines, nationwide, from one point of contact.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "theme-color", content: "#0A4D28" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Saudi House of Expertise" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SHE — Saudi House of Expertise" },
      {
        name: "twitter:description",
        content: "Single-source supply & procurement partner to the Kingdom since 1971.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Newsreader:ital,opsz@1,7..72&display=swap",
      },
      { rel: "stylesheet", href: sheCss },
    ],
  }),
  component: Index,
});

function runScript(source: string, id: string) {
  if (document.getElementById(id)) return;
  const el = document.createElement("script");
  el.id = id;
  el.textContent = source;
  document.body.appendChild(el);
}

function Index() {
  useEffect(() => {
    runScript(loaderScript, "she-loader-script");
    runScript(siteScript, "she-site-script");
  }, []);

  return <div id="she-site" dangerouslySetInnerHTML={{ __html: markup }} />;
}
