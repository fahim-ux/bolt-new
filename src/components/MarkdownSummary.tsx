import React from 'react';
import { FileText, Sparkles } from 'lucide-react';

interface MarkdownSummaryProps {
  content: string;
}

const MarkdownSummary: React.FC<MarkdownSummaryProps> = ({ content }) => {
  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold text-gray-900 mb-4">{line.substring(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-semibold text-gray-800 mb-3 mt-6">{line.substring(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-medium text-gray-700 mb-2 mt-4">{line.substring(4)}</h3>;
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const content = line.substring(2);
        return (
          <li key={index} className="ml-4 mb-1 text-gray-700">
            {content.includes('**') ? (
              <span dangerouslySetInnerHTML={{
                __html: content.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
              }} />
            ) : content}
          </li>
        );
      }
      if (line.startsWith('✅ ')) {
        return (
          <div key={index} className="flex items-center space-x-2 mb-2 text-gray-700">
            <span className="text-green-500">✅</span>
            <span>{line.substring(3)}</span>
          </div>
        );
      }
      if (line.trim() === '') {
        return <div key={index} className="mb-2"></div>;
      }
      if (line.includes('**')) {
        return (
          <p key={index} className="mb-3 text-gray-700 leading-relaxed">
            <span dangerouslySetInnerHTML={{
              __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
            }} />
          </p>
        );
      }
      if (line.startsWith('*') && line.endsWith('*')) {
        return <p key={index} className="text-sm text-gray-500 italic mt-4">{line.substring(1, line.length - 1)}</p>;
      }
      return <p key={index} className="mb-3 text-gray-700 leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-6">
      <div className="px-6 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <span>AI-Generated Summary</span>
              <Sparkles className="w-4 h-4 text-emerald-600" />
            </h2>
            <p className="text-sm text-gray-600">Intelligent analysis and insights</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="prose prose-gray max-w-none">
          {renderMarkdown(content)}
        </div>
      </div>
    </div>
  );
};

export default MarkdownSummary;