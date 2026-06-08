import React, { useCallback, useEffect, useRef, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

type EmbedProps = {
  /**
   * Path to the standalone HTML file, relative to the site root.
   * Drop the file in `static/embeds/<topic>/` (mirror the docs/ tree) and pass
   * e.g. "embeds/agent-skills/my-design.html".
   * `useBaseUrl` prepends the site's baseUrl automatically.
   */
  src: string;
  /** Accessible title for the iframe (screen readers, etc.). */
  title?: string;
  /**
   * Fixed height — a number (px) or any CSS length string
   * (e.g. "calc(100vh - var(--ifm-navbar-height))" to fill the viewport so the
   * artifact scrolls internally and keeps its own sticky UI). Omit to auto-size
   * to the content's height (works because embeds are served same-origin).
   */
  height?: number | string;
  /** Minimum height while the content loads / before measurement. */
  minHeight?: number;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Embeds a self-contained HTML document (e.g. a Claude design artifact) inside
 * an isolated iframe. The artifact keeps its own CSS/JS — nothing leaks into the
 * Docusaurus theme, and Docusaurus styles don't leak into the artifact.
 */
export default function Embed({
  src,
  title = "Embedded design",
  height,
  minHeight = 400,
  className,
  style,
}: EmbedProps): React.ReactNode {
  const url = useBaseUrl(src);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const [measured, setMeasured] = useState<number | string | undefined>(height);

  const resize = useCallback(() => {
    if (height) return; // explicit height wins; skip auto-measure
    const doc = iframeRef.current?.contentWindow?.document;
    if (!doc?.body) return;
    const h = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight);
    if (h) setMeasured((prev) => (prev === h ? prev : h));
  }, [height]);

  const onLoad = useCallback(() => {
    // With a fixed height there's nothing to measure, so don't observe the
    // iframe body. Animated artifacts resize continuously, and an observer here
    // would surface the benign "ResizeObserver loop" warning in dev.
    if (height) return;
    resize();
    // Re-measure as fonts/images settle and on any content size change. Defer
    // to the next frame so a measurement-driven reflow can't loop the observer.
    const body = iframeRef.current?.contentWindow?.document?.body;
    if (!body) return;
    observerRef.current?.disconnect();
    const observer = new ResizeObserver(() => window.requestAnimationFrame(resize));
    observer.observe(body);
    observerRef.current = observer;
  }, [resize, height]);

  // In a production build the static HTML is served instantly (often from
  // cache), so the iframe's `load` event can fire before React hydration
  // attaches `onLoad`. Detect the already-loaded case on mount and wire up
  // measurement manually so the iframe isn't stuck at `minHeight`.
  useEffect(() => {
    const doc = iframeRef.current?.contentWindow?.document;
    if (doc?.readyState === "complete") onLoad();
  }, [onLoad]);

  useEffect(() => () => observerRef.current?.disconnect(), []);

  return (
    <iframe
      ref={iframeRef}
      src={url}
      title={title}
      onLoad={onLoad}
      loading="lazy"
      className={className}
      style={{
        width: "100%",
        height: measured ?? minHeight,
        minHeight,
        border: "1px solid var(--ifm-toc-border-color, #e3e3e3)",
        borderRadius: "8px",
        background: "#fff",
        display: "block",
        ...style,
      }}
    />
  );
}
