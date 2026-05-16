import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  description: ReactNode;
  href: string;
  icon: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Open Spec",
    description:
      "Spec-driven development workflow — how we capture, review, and ship change proposals using OpenSpec.",
    href: "/docs/open-spec/developer-workflow-with-open-spec",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </svg>
    ),
  },
  {
    title: "Browse All Docs",
    description:
      "Jump into the full knowledge base — workflows, standards, and best practices used across our projects.",
    href: "/docs/intro",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14H6a2 2 0 0 0-2 2V5Z" />
        <path d="M4 19a2 2 0 0 0 2 2h12" />
      </svg>
    ),
  },
  {
    title: "Source on GitHub",
    description:
      "Contribute improvements, open issues, or read the raw markdown — the knowledge base is open source.",
    href: "https://github.com/adheepgeorge/knowledge-base",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 19c-4 1.5-4-2-6-2.5" />
        <path d="M15 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-7 0C5.27.65 4.09 1 4.09 1A5.07 5.07 0 0 0 4 4.77 5.44 5.44 0 0 0 2.5 8.55c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 18.13V22" />
      </svg>
    ),
  },
];

function Feature({ title, description, href, icon }: FeatureItem) {
  return (
    <div className={clsx("col col--4", styles.featureCol)}>
      <Link to={href} className={styles.card}>
        <div className={styles.iconTile} aria-hidden="true">
          {icon}
        </div>
        <Heading as="h3" className={styles.cardTitle}>
          {title}
        </Heading>
        <p className={styles.cardDescription}>{description}</p>
        <span className={styles.cardCta} aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </span>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
