import React from 'react';
import { Brain, Lightbulb, Target } from 'lucide-react';

interface ReasoningCardProps {
  reasoning: string;
}

const ReasoningCard: React.FC<ReasoningCardProps> = ({ reasoning }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">AI Reasoning</h2>
            <p className="text-sm text-gray-600">How I interpreted your query</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-gray-700 leading-relaxed">{reasoning}</p>
            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4" />
                <span>Query processed in 0.23s</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <span>Confidence: 96%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReasoningCard;