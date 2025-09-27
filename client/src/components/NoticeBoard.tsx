import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, AlertCircle, Info, CheckCircle, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Notice {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  author: string;
  createdAt: Date;
  targetAudience: 'all' | 'students' | 'teachers' | 'parents';
  isRead?: boolean;
}

interface NoticeBoardProps {
  notices: Notice[];
  onMarkAsRead?: (noticeId: string) => void;
  onViewAll?: () => void;
  title?: string;
  maxItems?: number;
}

const typeConfig = {
  info: { icon: Info, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  warning: { icon: AlertCircle, color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
  success: { icon: CheckCircle, color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  urgent: { icon: AlertCircle, color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' }
};

export function NoticeBoard({ 
  notices, 
  onMarkAsRead, 
  onViewAll, 
  title = "Notice Board",
  maxItems = 5 
}: NoticeBoardProps) {
  const displayNotices = notices.slice(0, maxItems);
  
  return (
    <Card className="hover-elevate" data-testid="card-notice-board">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        {onViewAll && (
          <Button variant="outline" size="sm" onClick={onViewAll} data-testid="button-view-all-notices">
            View All
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {displayNotices.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No notices to display
          </p>
        ) : (
          displayNotices.map((notice) => {
            const config = typeConfig[notice.type];
            const Icon = config.icon;
            
            return (
              <div 
                key={notice.id} 
                className={`p-4 rounded-lg border transition-colors hover:bg-accent/50 ${
                  notice.isRead ? 'opacity-70' : ''
                }`}
                data-testid={`notice-item-${notice.id}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-full ${config.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground" data-testid={`text-notice-title-${notice.id}`}>
                          {notice.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {notice.targetAudience}
                          </Badge>
                          {notice.type === 'urgent' && (
                            <Badge variant="destructive" className="text-xs animate-pulse">
                              URGENT
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {notice.content}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(notice.createdAt, { addSuffix: true })}
                        </span>
                        <span>By {notice.author}</span>
                      </div>
                    </div>
                  </div>
                  
                  {onMarkAsRead && !notice.isRead && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => onMarkAsRead(notice.id)}
                      data-testid={`button-mark-read-${notice.id}`}
                      className="text-xs"
                    >
                      Mark Read
                    </Button>
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