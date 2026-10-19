import React from "react";
import Link from "next/link";

export function parseInlineMarkdown(text: string, keyPrefix: string): React.ReactNode[] {
  const tokenRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|~~([^~]+)~~|`([^`]+)`)/g;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let idx = 0;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index));
    }

    const [, , linkText, linkHref, boldText, italicText, strikeText, codeText] = match;

    if (linkText && linkHref) {
      elements.push(
        <Link
          key={`${keyPrefix}-lnk-${idx++}`}
          href={linkHref}
          className="text-rose-600 dark:text-rose-400 font-bold underline hover:text-rose-700 transition"
        >
          {linkText}
        </Link>
      );
    } else if (boldText) {
      elements.push(
        <strong key={`${keyPrefix}-b-${idx++}`} className="font-bold text-slate-900 dark:text-white">
          {boldText}
        </strong>
      );
    } else if (italicText) {
      elements.push(
        <em key={`${keyPrefix}-i-${idx++}`} className="italic opacity-90">
          {italicText}
        </em>
      );
    } else if (strikeText) {
      elements.push(
        <del key={`${keyPrefix}-s-${idx++}`} className="line-through opacity-60">
          {strikeText}
        </del>
      );
    } else if (codeText) {
      elements.push(
        <code
          key={`${keyPrefix}-c-${idx++}`}
          className="bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded text-[11px] font-mono"
        >
          {codeText}
        </code>
      );
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return elements;
}

export function FormattedSenseiMessage({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) {
  const lines = content.split("\n");

  return (
    <div className={`space-y-1.5 leading-relaxed ${className}`}>
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={`empty-${lineIdx}`} className="h-1" />;
        }

        if (/^(\s*[-*_]{3,}\s*)$/.test(line)) {
          return <hr key={`hr-${lineIdx}`} className="border-t border-slate-200 dark:border-slate-700 my-2" />;
        }

        const headerMatch = line.match(/^(\s*)(#{1,3})\s+(.*)$/);
        if (headerMatch) {
          const level = headerMatch[2].length;
          return (
            <div
              key={`h-${lineIdx}`}
              className={`font-bold text-slate-900 dark:text-white mt-2 mb-1 ${
                level === 1 ? "text-base" : level === 2 ? "text-[14px]" : "text-[13px]"
              }`}
            >
              {parseInlineMarkdown(headerMatch[3], `h-${lineIdx}`)}
            </div>
          );
        }

        const quoteMatch = line.match(/^(\s*)>\s*(.*)$/);
        if (quoteMatch) {
          return (
            <div
              key={`q-${lineIdx}`}
              className="border-l-2 border-rose-400 pl-2.5 py-0.5 text-slate-600 dark:text-slate-300 italic my-1 bg-rose-50/40 dark:bg-rose-950/20 rounded-r"
            >
              {parseInlineMarkdown(quoteMatch[2], `q-${lineIdx}`)}
            </div>
          );
        }

        const bulletMatch = line.match(/^(\s*)(?:[-•*])\s+(.*)$/);
        if (bulletMatch) {
          const indent = bulletMatch[1].length > 0 ? "ml-4" : "ml-0.5";
          return (
            <div key={`line-${lineIdx}`} className={`flex items-start gap-1.5 ${indent}`}>
              <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
              <div className="flex-1">{parseInlineMarkdown(bulletMatch[2], `b-${lineIdx}`)}</div>
            </div>
          );
        }

        const numMatch = line.match(/^(\s*)(\d+)\.\s+(.*)$/);
        if (numMatch) {
          const indent = numMatch[1].length > 0 ? "ml-4" : "ml-0.5";
          return (
            <div key={`line-${lineIdx}`} className={`flex items-start gap-1.5 ${indent}`}>
              <span className="text-rose-500 font-bold shrink-0 text-xs mt-0.5">{numMatch[2]}.</span>
              <div className="flex-1">{parseInlineMarkdown(numMatch[3], `n-${lineIdx}`)}</div>
            </div>
          );
        }

        return (
          <div key={`line-${lineIdx}`}>
            {parseInlineMarkdown(line, `l-${lineIdx}`)}
          </div>
        );
      })}
    </div>
  );
}

