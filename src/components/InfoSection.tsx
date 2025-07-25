import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface InfoSectionProps {
  title: string;
  icon: React.ReactNode;
  data: Record<string, string>;
  iconColor: string;
  bgColor: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, icon, data, iconColor, bgColor }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const dataEntries = Object.entries(data);
  const isLargeDataset = dataEntries.length > 8;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-6">
      <div className={`px-6 py-4 bg-gradient-to-r ${bgColor} border-b border-gray-200`}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-white/80 rounded-lg flex items-center justify-center ${iconColor}`}>
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600">{dataEntries.length} fields</p>
            </div>
          </div>
          {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
        </button>
      </div>
      
      {isExpanded && (
        <div className="p-6">
          <div className={`grid gap-4 ${
            isLargeDataset 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2' 
              : 'grid-cols-1 sm:grid-cols-2'
          }`}>
            {dataEntries.map(([key, value]) => (
              <div 
                key={key} 
                className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <div className="flex flex-col space-y-1">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {key}
                  </span>
                  <span className="text-sm font-semibold text-gray-900 break-all">
                    {value.includes('✅') || value.includes('❌') ? (
                      <span className="flex items-center space-x-1">
                        <span>{value}</span>
                      </span>
                    ) : value.toLowerCase().includes('low') ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {value}
                      </span>
                    ) : value.toLowerCase().includes('high') ? (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        {value}
                      </span>
                    ) : value.toLowerCase().includes('cleared') || value.toLowerCase().includes('passed') || value.toLowerCase().includes('complete') ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {value}
                      </span>
                    ) : value.includes('₹') ? (
                      <span className="font-mono">{value}</span>
                    ) : value.match(/^\d{4}-\d{2}-\d{2}$/) ? (
                      <span className="font-mono text-blue-600">{value}</span>
                    ) : (
                      value
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoSection;