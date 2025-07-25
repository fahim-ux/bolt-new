import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';

interface QueryBubbleProps {
  query: string;
}

const QueryBubble: React.FC<QueryBubbleProps> = ({ query }) => {
  return (
    <div className="flex justify-center">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl max-w-2xl">
        <div className="p-6 text-white">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium opacity-90">Natural Language Query</span>
              </div>
              <p className="text-lg font-medium leading-relaxed">{query}</p>
            </div>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-b-2xl"></div>
      </div>
    </div>
  );
};

export default QueryBubble;