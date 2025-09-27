import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Calendar, Download, CreditCard, AlertTriangle, CheckCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface FeeRecord {
  id: string;
  description: string;
  amount: number;
  dueDate: Date;
  paidDate?: Date;
  status: 'pending' | 'paid' | 'overdue' | 'partial';
  category: 'tuition' | 'library' | 'transport' | 'exam' | 'misc';
}

interface FeeManagementProps {
  fees: FeeRecord[];
  onPayNow?: (feeId: string) => void;
  onDownloadReceipt?: (feeId: string) => void;
  title?: string;
  showActions?: boolean;
}

const statusConfig = {
  pending: { 
    icon: Calendar, 
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    badge: 'warning'
  },
  paid: { 
    icon: CheckCircle, 
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    badge: 'default'
  },
  overdue: { 
    icon: AlertTriangle, 
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    badge: 'destructive'
  },
  partial: { 
    icon: DollarSign, 
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    badge: 'secondary'
  }
};

const categoryColors = {
  tuition: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  library: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  transport: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  exam: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  misc: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
};

export function FeeManagement({ 
  fees, 
  onPayNow, 
  onDownloadReceipt, 
  title = "Fee Management",
  showActions = true 
}: FeeManagementProps) {
  const totalPending = fees.filter(fee => fee.status === 'pending' || fee.status === 'overdue')
    .reduce((sum, fee) => sum + fee.amount, 0);
  
  const totalPaid = fees.filter(fee => fee.status === 'paid')
    .reduce((sum, fee) => sum + fee.amount, 0);
  
  return (
    <Card className="hover-elevate" data-testid="card-fee-management">
      <CardHeader className="space-y-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-accent/50 rounded-lg">
            <div className="text-sm text-muted-foreground">Total Due</div>
            <div className="text-2xl font-bold text-red-600" data-testid="text-total-due">
              ${totalPending.toLocaleString()}
            </div>
          </div>
          <div className="p-4 bg-accent/50 rounded-lg">
            <div className="text-sm text-muted-foreground">Total Paid</div>
            <div className="text-2xl font-bold text-green-600" data-testid="text-total-paid">
              ${totalPaid.toLocaleString()}
            </div>
          </div>
          <div className="p-4 bg-accent/50 rounded-lg">
            <div className="text-sm text-muted-foreground">Total Records</div>
            <div className="text-2xl font-bold text-primary" data-testid="text-total-records">
              {fees.length}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {fees.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No fee records found
          </p>
        ) : (
          fees.map((fee) => {
            const statusConf = statusConfig[fee.status];
            const StatusIcon = statusConf.icon;
            const isOverdue = fee.status === 'overdue';
            
            return (
              <div 
                key={fee.id}
                className={`p-4 rounded-lg border-2 transition-all hover:shadow-sm ${
                  isOverdue ? 'border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/50' : 'border-border'
                }`}
                data-testid={`fee-record-${fee.id}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-full ${statusConf.color}`}>
                      <StatusIcon className="h-4 w-4" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground" data-testid={`text-fee-description-${fee.id}`}>
                          {fee.description}
                        </h4>
                        <div className="flex items-center gap-2">
                          <Badge className={categoryColors[fee.category]} variant="outline">
                            {fee.category.toUpperCase()}
                          </Badge>
                          <Badge variant={statusConf.badge as any}>
                            {fee.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xl font-bold text-primary" data-testid={`text-fee-amount-${fee.id}`}>
                          ${fee.amount.toLocaleString()}
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          {fee.status === 'paid' && fee.paidDate ? (
                            <span className="flex items-center gap-1 text-green-600">
                              <CheckCircle className="h-3 w-3" />
                              Paid {formatDistanceToNow(fee.paidDate, { addSuffix: true })}
                            </span>
                          ) : (
                            <span className={`flex items-center gap-1 ${
                              isOverdue ? 'text-red-600' : 'text-muted-foreground'
                            }`}>
                              <Calendar className="h-3 w-3" />
                              Due {formatDistanceToNow(fee.dueDate, { addSuffix: true })}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {showActions && (
                    <div className="flex gap-2">
                      {fee.status === 'paid' && onDownloadReceipt && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onDownloadReceipt(fee.id)}
                          data-testid={`button-download-receipt-${fee.id}`}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      
                      {(fee.status === 'pending' || fee.status === 'overdue' || fee.status === 'partial') && onPayNow && (
                        <Button 
                          size="sm" 
                          variant={isOverdue ? "destructive" : "default"}
                          onClick={() => onPayNow(fee.id)}
                          data-testid={`button-pay-now-${fee.id}`}
                          className="flex items-center gap-1"
                        >
                          <CreditCard className="h-4 w-4" />
                          Pay Now
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}