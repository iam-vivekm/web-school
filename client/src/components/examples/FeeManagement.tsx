import { FeeManagement } from '../FeeManagement';

// TODO: Remove mock data
const mockFees = [
  {
    id: '1',
    description: 'Tuition Fee - Semester 2',
    amount: 2500,
    dueDate: new Date('2024-04-15'),
    status: 'pending' as const,
    category: 'tuition' as const
  },
  {
    id: '2',
    description: 'Library Fee - Annual',
    amount: 150,
    dueDate: new Date('2024-03-01'),
    status: 'overdue' as const,
    category: 'library' as const
  },
  {
    id: '3',
    description: 'Transportation Fee - March',
    amount: 120,
    dueDate: new Date('2024-03-10'),
    paidDate: new Date('2024-03-08'),
    status: 'paid' as const,
    category: 'transport' as const
  },
  {
    id: '4',
    description: 'Examination Fee - Final Exams',
    amount: 300,
    dueDate: new Date('2024-04-01'),
    status: 'partial' as const,
    category: 'exam' as const
  },
  {
    id: '5',
    description: 'Sports Equipment Fee',
    amount: 75,
    dueDate: new Date('2024-03-20'),
    paidDate: new Date('2024-03-18'),
    status: 'paid' as const,
    category: 'misc' as const
  }
];

export default function FeeManagementExample() {
  const handlePayNow = (feeId: string) => {
    console.log('Pay now for fee:', feeId);
  };
  
  const handleDownloadReceipt = (feeId: string) => {
    console.log('Download receipt for fee:', feeId);
  };
  
  return (
    <div className="p-4">
      <FeeManagement 
        fees={mockFees}
        onPayNow={handlePayNow}
        onDownloadReceipt={handleDownloadReceipt}
      />
    </div>
  );
}