import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, BookOpen, Users, Calendar } from "lucide-react";

interface TeacherCardProps {
  teacher: {
    id: string;
    name: string;
    email: string;
    phone: string;
    subjects: string[];
    classes: string[];
    experience: number;
    department: string;
    avatar?: string;
    totalStudents: number;
    joinDate: string;
  };
  onViewSchedule?: (teacherId: string) => void;
  onAssignClass?: (teacherId: string) => void;
}

export function TeacherCard({ teacher, onViewSchedule, onAssignClass }: TeacherCardProps) {
  const initials = teacher.name.split(' ').map(n => n[0]).join('').toUpperCase();
  
  return (
    <Card className="hover-elevate" data-testid={`card-teacher-${teacher.id}`}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={teacher.avatar} alt={teacher.name} />
            <AvatarFallback className="text-lg font-semibold">{initials}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground" data-testid={`text-teacher-name-${teacher.id}`}>
                {teacher.name}
              </h3>
              <Badge variant="secondary" data-testid={`badge-department-${teacher.id}`}>
                {teacher.department}
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {teacher.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {teacher.phone}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Subjects:</span>
                <div className="flex flex-wrap gap-1">
                  {teacher.subjects.map((subject, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {teacher.totalStudents} Students
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {teacher.experience} years exp.
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Classes:</span>
                <div className="flex flex-wrap gap-1">
                  {teacher.classes.map((className, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {className}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 pt-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onViewSchedule?.(teacher.id)}
                data-testid={`button-view-schedule-${teacher.id}`}
              >
                View Schedule
              </Button>
              <Button 
                size="sm" 
                variant="secondary"
                onClick={() => onAssignClass?.(teacher.id)}
                data-testid={`button-assign-class-${teacher.id}`}
              >
                Assign Class
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}