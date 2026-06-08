import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Knowledge Base",
  tagline:
    "a curated collection of workflows, standards, and best practices used across our projects.",
  favicon: "img/logo.svg",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: "https://adheepgeorge.github.io",
  baseUrl: "/knowledge-base/",

  organizationName: "adheepgeorge",
  projectName: "knowledge-base",
  deploymentBranch: "gh-pages",
  trailingSlash: false,

  onBrokenLinks: "throw",

  markdown: {
    mermaid: true,
  },

  themes: [
    "@docusaurus/theme-mermaid",
    [
      "@easyops-cn/docusaurus-search-local",
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        docsRouteBasePath: "/docs",
      },
    ],
  ],

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/adheepgeorge/knowledge-base/tree/main/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/logo.svg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    mermaid: {
      theme: { light: "neutral", dark: "dark" },
    },
    navbar: {
      title: "Knowledge Base",
      logo: {
        alt: "Knowledge Base logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Docs",
        },
        {
          type: "doc",
          docId: "embedding-claude-designs",
          position: "left",
          label: "Embed designs",
        },
        {
          href: "https://github.com/adheepgeorge/knowledge-base",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Open Spec",
              to: "/docs/category/open-spec",
            },
            {
              label: "Agent Skills",
              to: "/docs/category/agent-skills",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/adheepgeorge/knowledge-base",
            },
          ],
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
