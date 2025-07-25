import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodePanelProps {
  code: string;
  language: string;
}

const CodePanel: React.FC<CodePanelProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600 capitalize">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-green-600">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-gray-600" />
              <span className="text-gray-600">Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre className="text-sm text-gray-300">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodePanel;