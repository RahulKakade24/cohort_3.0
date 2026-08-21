import { useState } from "react";
import { Check, Code, Copy } from "lucide-react";
import CodeBlock from "@/components/Personal/CodeBlock";

interface ComponentDemoProps {
  children?: React.ReactNode;
  code: string;
}

export default function ComponentDemo({ children, code }: ComponentDemoProps) {
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="demo-shell">
      <div className="demo-toolbar">
        <span>Preview</span>
        <div className="demo-actions">
          <button type="button" onClick={handleCopy}>
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "Copied" : "Copy Code"}
          </button>
          <button type="button" onClick={() => setIsCodeVisible((value) => !value)}>
            <Code size={15} />
            {isCodeVisible ? "Hide Code" : "View Code"}
          </button>
        </div>
      </div>

      <div className="demo-preview">{children}</div>

      {isCodeVisible && (
        <div className="demo-code">
          <CodeBlock code={code} />
        </div>
      )}
    </div>
  );
}
