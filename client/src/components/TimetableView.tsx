import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, User } from "lucide-react";

interface TimeSlot {
  time: string;
  subject: string;
  teacher: string;
  room: string;
  type: 'lecture' | 'lab' | 'break' | 'exam';
}

interface DaySchedule {
  day: string;
  slots: TimeSlot[];
}

interface TimetableViewProps {
  schedule: DaySchedule[];
  title?: string;
  currentDay?: string;
}

const typeStyles = {
  lecture: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200',
  lab: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200',
  break: 'bg-gray-50 border-gray-200 text-gray-600 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-400',
  exam: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200'
};

export function TimetableView({ schedule, title = "Class Timetable", currentDay }: TimetableViewProps) {
  return (
    <Card className="hover-elevate" data-testid="card-timetable">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {schedule.map((daySchedule) => {
          const isCurrentDay = currentDay === daySchedule.day;
          
          return (
            <div key={daySchedule.day} className="space-y-3">
              <h3 className={`font-semibold text-base flex items-center gap-2 ${
                isCurrentDay ? 'text-primary' : 'text-foreground'
              }`}>
                {daySchedule.day}
                {isCurrentDay && (
                  <Badge variant="default" className="text-xs">Today</Badge>
                )}
              </h3>
              
              <div className="grid gap-2">
                {daySchedule.slots.map((slot, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg border-2 transition-all hover:shadow-sm ${
                      typeStyles[slot.type]
                    } ${isCurrentDay ? 'ring-1 ring-primary/20' : ''}`}
                    data-testid={`slot-${daySchedule.day}-${index}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium text-sm">{slot.time}</span>
                          <Badge variant="outline" className="text-xs capitalize">
                            {slot.type}
                          </Badge>
                        </div>
                        
                        <h4 className="font-semibold text-base mb-2" data-testid={`text-subject-${daySchedule.day}-${index}`}>
                          {slot.subject}
                        </h4>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {slot.teacher}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {slot.room}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}