import React from 'react';
import { Clock, CheckCircle, Circle } from 'lucide-react';

interface PaymentEvent {
  stage: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

interface PaymentEventsProps {
  events: PaymentEvent[];
}

const PaymentEvents: React.FC<PaymentEventsProps> = ({ events }) => {
  const getStatusIcon = (status: string, index: number) => {
    if (status === 'completed') {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    return <Circle className="w-5 h-5 text-gray-300" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-6">
      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Payment Timeline</h2>
            <p className="text-sm text-gray-600">Transaction processing stages</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {getStatusIcon(event.status, index)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{event.stage}</p>
                    <p className="text-sm text-gray-500 font-mono">{event.timestamp}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.status === 'completed' 
                        ? 'bg-green-100 text-green-700'
                        : event.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                </div>
              </div>
              {index < events.length - 1 && (
                <div className="absolute left-8 mt-8 h-6 w-px bg-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentEvents;