import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ExternalLink, Filter, Search } from 'lucide-react';

interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  status: string;
  type: string;
  sender: string;
  recipient: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  const [sortField, setSortField] = useState<keyof Transaction>('amount');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (field: keyof Transaction) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredTransactions = transactions.filter(transaction =>
    Object.values(transaction).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === 'amount') {
      aValue = Number(aValue);
      bValue = Number(bValue);
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      completed: 'bg-green-100 text-green-700 border-green-200',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      failed: 'bg-red-100 text-red-700 border-red-200',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
        {status}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeStyles = {
      NEFT: 'bg-blue-100 text-blue-700',
      RTGS: 'bg-purple-100 text-purple-700',
      IMPS: 'bg-green-100 text-green-700',
      UPI: 'bg-orange-100 text-orange-700',
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${typeStyles[type as keyof typeof typeStyles] || 'bg-gray-100 text-gray-700'}`}>
        {type}
      </span>
    );
  };

  const isTransactionId = (text: string) => {
    return /^\d{16}$/.test(text);
  };

  const SortIcon = ({ field }: { field: keyof Transaction }) => {
    if (sortField !== field) return <ChevronDown className="w-4 h-4 opacity-30" />;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="p-6">
      {/* Search and Filter */}
      <div className="mb-6 flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">
                <button
                  onClick={() => handleSort('id')}
                  className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                >
                  <span>Transaction ID</span>
                  <SortIcon field="id" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">
                <button
                  onClick={() => handleSort('amount')}
                  className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                >
                  <span>Amount</span>
                  <SortIcon field="amount" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                >
                  <span>Date</span>
                  <SortIcon field="date" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                }`}
              >
                <td className="py-4 px-4">
                  {isTransactionId(transaction.id) ? (
                    <Link
                      to={`/transaction/${transaction.id}`}
                      className="font-mono text-sm text-blue-600 hover:text-blue-700 hover:underline flex items-center space-x-1"
                    >
                      <span>{transaction.id}</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  ) : (
                    <span className="font-mono text-sm text-gray-600">{transaction.id}</span>
                  )}
                </td>
                <td className="py-4 px-4">
                  <span className="font-semibold text-gray-900">₹{transaction.amount.toLocaleString()}</span>
                </td>
                <td className="py-4 px-4 text-gray-600">{transaction.date}</td>
                <td className="py-4 px-4">
                  <div>
                    <p className="text-gray-900 font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-500">
                      {transaction.sender} → {transaction.recipient}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-4">{getTypeBadge(transaction.type)}</td>
                <td className="py-4 px-4">{getStatusBadge(transaction.status)}</td>
                <td className="py-4 px-4">
                  <Link
                    to={`/transaction/${transaction.id}`}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedTransactions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No transactions found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;