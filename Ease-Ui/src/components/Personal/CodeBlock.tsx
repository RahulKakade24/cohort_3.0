import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="code-block">
      <div className="flex items-center justify-between bg-gray-900 px-4 py-2 text-gray-100">
        <span className="text-xs font-mono uppercase">{language}</span>
        <button
          type="button"
          onClick={copyToClipboard}
          className="flex items-center gap-2 rounded bg-gray-800 px-2 py-1 text-xs hover:bg-gray-700"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto border-t-0 bg-gray-950 p-4 text-sm text-gray-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}
