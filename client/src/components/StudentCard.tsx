import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";

interface StudentCardProps {
  student: {
    id: string;
    name: string;
    email: string;
    phone: string;
    class: string;
    section: string;
    rollNumber: string;
    address: string;
    joinDate: string;
    avatar?: string;
    attendance: number;
    grade: string;
  };
  onViewDetails?: (studentId: string) => void;
}

export function StudentCard({ student, onViewDetails }: StudentCardProps) {
  const initials = student.name.split(' ').map(n => n[0]).join('').toUpperCase();
  
  return (
    <Card className="hover-elevate" data-testid={`card-student-${student.id}`}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={student.avatar} alt={student.name} />
            <AvatarFallback className="text-lg font-semibold">{initials}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground" data-testid={`text-student-name-${student.id}`}>
                {student.name}
              </h3>
              <Badge variant="secondary" data-testid={`badge-class-${student.id}`}>
                {student.class}-{student.section}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">Roll: {student.rollNumber}</p>
            
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {student.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {student.phone}
              </span>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex space-x-4 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Attendance: <Badge variant={student.attendance >= 90 ? "default" : student.attendance >= 75 ? "secondary" : "destructive"}>
                    {student.attendance}%
                  </Badge>
                </span>
                <span>Grade: <Badge variant="outline">{student.grade}</Badge></span>
              </div>
              
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onViewDetails?.(student.id)}
                data-testid={`button-view-student-${student.id}`}
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}