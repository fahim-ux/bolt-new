import React, { useState } from 'react';
import { Search, Brain, Code, Database, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import QueryBubble from '../components/QueryBubble';
import ReasoningCard from '../components/ReasoningCard';
import TransactionTable from '../components/TransactionTable';
import CodePanel from '../components/CodePanel';
import { mockTransactions, mockElasticQuery, mockPythonCode } from '../data/mockData';

const ResultsPage: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<'elastic' | 'python'>('elastic');
  const [showCode, setShowCode] = useState(false);

  const query = "Show me all transactions over ₹10,000 in May";
  const reasoning = "I've analyzed your request for high-value transactions in May. The search filters transactions by amount (>₹10,000) and date range (May 2024), then sorts by transaction value in descending order to prioritize the largest amounts first.";

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Banking Intelligence Dashboard</h1>
        <p className="text-gray-600">Natural language banking queries with AI-powered insights</p>
      </div>

      {/* Query Display */}
      <QueryBubble query={query} />

      {/* AI Reasoning */}
      <ReasoningCard reasoning={reasoning} />

      {/* Results Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Database className="w-5 h-5 mr-2 text-blue-600" />
            Transaction Results ({mockTransactions.length} found)
          </h2>
        </div>
        <TransactionTable transactions={mockTransactions} />
      </div>

      {/* Code Panels */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center text-xl font-semibold text-gray-900 hover:text-purple-600 transition-colors"
          >
            <Code className="w-5 h-5 mr-2" />
            Generated Queries
            {showCode ? <ChevronUp className="w-5 h-5 ml-2" /> : <ChevronDown className="w-5 h-5 ml-2" />}
          </button>
        </div>
        
        {showCode && (
          <div className="p-6">
            <div className="flex space-x-1 mb-4">
              <button
                onClick={() => setActiveCodeTab('elastic')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeCodeTab === 'elastic'
                    ? 'bg-orange-100 text-orange-700 border border-orange-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                ElasticSearch Query
              </button>
              <button
                onClick={() => setActiveCodeTab('python')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeCodeTab === 'python'
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Python Code
              </button>
            </div>
            
            <CodePanel
              code={activeCodeTab === 'elastic' ? mockElasticQuery : mockPythonCode}
              language={activeCodeTab === 'elastic' ? 'json' : 'python'}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;