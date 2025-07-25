export interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  status: string;
  type: string;
  sender: string;
  recipient: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: '1234567890123456',
    amount: 125000,
    date: '2024-05-15',
    description: 'Software License Payment',
    status: 'completed',
    type: 'NEFT',
    sender: 'Tech Solutions Pvt Ltd',
    recipient: 'Global Enterprises Ltd'
  },
  {
    id: '2345678901234567',
    amount: 89500,
    date: '2024-05-14',
    description: 'Equipment Purchase',
    status: 'completed',
    type: 'RTGS',
    sender: 'Manufacturing Co.',
    recipient: 'Equipment Suppliers Inc'
  },
  {
    id: '3456789012345678',
    amount: 67800,
    date: '2024-05-13',
    description: 'Consultant Fees',
    status: 'completed',
    type: 'IMPS',
    sender: 'Consulting Group',
    recipient: 'Expert Solutions'
  },
  {
    id: '4567890123456789',
    amount: 234000,
    date: '2024-05-12',
    description: 'Real Estate Transaction',
    status: 'completed',
    type: 'RTGS',
    sender: 'Property Developers',
    recipient: 'Investment Holdings'
  },
  {
    id: '5678901234567890',
    amount: 45600,
    date: '2024-05-11',
    description: 'Marketing Services',
    status: 'pending',
    type: 'NEFT',
    sender: 'Digital Agency',
    recipient: 'Creative Studios'
  },
  {
    id: '6789012345678901',
    amount: 178900,
    date: '2024-05-10',
    description: 'Supply Chain Payment',
    status: 'completed',
    type: 'UPI',
    sender: 'Logistics Corp',
    recipient: 'Warehouse Solutions'
  },
  {
    id: '7890123456789012',
    amount: 98750,
    date: '2024-05-09',
    description: 'Professional Services',
    status: 'completed',
    type: 'NEFT',
    sender: 'Law Firm Associates',
    recipient: 'Business Consultants'
  },
  {
    id: '8901234567890123',
    amount: 156300,
    date: '2024-05-08',
    description: 'Technology Infrastructure',
    status: 'failed',
    type: 'RTGS',
    sender: 'IT Solutions Ltd',
    recipient: 'Cloud Services Inc'
  }
];

export const getTransactionById = (id: string): Transaction | undefined => {
  return mockTransactions.find(transaction => transaction.id === id);
};

export const mockElasticQuery = `{
  "query": {
    "bool": {
      "must": [
        {
          "range": {
            "amount": {
              "gte": 1000000
            }
          }
        },
        {
          "range": {
            "transaction_date": {
              "gte": "2024-05-01",
              "lte": "2024-05-31"
            }
          }
        }
      ]
    }
  },
  "sort": [
    {
      "amount": {
        "order": "desc"
      }
    }
  ],
  "size": 100,
  "_source": [
    "transaction_id",
    "amount",
    "transaction_date",
    "description",
    "status",
    "payment_type",
    "sender_name",
    "recipient_name"
  ]
}`;

export const mockPythonCode = `import pandas as pd
from elasticsearch import Elasticsearch
from datetime import datetime

def search_high_value_transactions(min_amount=1000000, month=5, year=2024):
    """
    Search for high-value transactions in specified month
    """
    # Initialize Elasticsearch client
    es = Elasticsearch(['localhost:9200'])
    
    # Build date range
    start_date = f"{year}-{month:02d}-01"
    end_date = f"{year}-{month:02d}-31"
    
    # Construct query
    query = {
        "query": {
            "bool": {
                "must": [
                    {"range": {"amount": {"gte": min_amount}}},
                    {"range": {"transaction_date": {
                        "gte": start_date,
                        "lte": end_date
                    }}}
                ]
            }
        },
        "sort": [{"amount": {"order": "desc"}}],
        "size": 100
    }
    
    # Execute search
    response = es.search(index="banking_transactions", body=query)
    
    # Convert to DataFrame
    transactions = []
    for hit in response['hits']['hits']:
        transactions.append(hit['_source'])
    
    df = pd.DataFrame(transactions)
    
    # Generate summary statistics
    total_amount = df['amount'].sum()
    avg_amount = df['amount'].mean()
    transaction_count = len(df)
    
    print(f"Found {transaction_count} transactions")
    print(f"Total amount: ₹{total_amount:,.2f}")
    print(f"Average amount: ₹{avg_amount:,.2f}")
    
    return df

# Execute the search
results = search_high_value_transactions(min_amount=1000000, month=5, year=2024)`;