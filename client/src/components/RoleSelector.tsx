import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, GraduationCap, BookOpen, Heart } from "lucide-react";

interface RoleSelectorProps {
  onSelectRole: (role: 'admin' | 'teacher' | 'student' | 'parent') => void;
  selectedRole?: 'admin' | 'teacher' | 'student' | 'parent';
}

const roles = [
  {
    id: 'admin' as const,
    title: 'Administrator',
    description: 'Manage school operations, students, teachers, and finances',
    icon: Users,
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    features: ['Student Management', 'Teacher Management', 'Fee Collection', 'Analytics']
  },
  {
    id: 'teacher' as const,
    title: 'Teacher',
    description: 'Manage classes, attendance, grades, and student progress',
    icon: GraduationCap,
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    features: ['Class Management', 'Attendance Tracking', 'Grade Books', 'Assignments']
  },
  {
    id: 'student' as const,
    title: 'Student',
    description: 'View timetables, assignments, grades, and school notices',
    icon: BookOpen,
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    features: ['Class Schedule', 'Assignment Tracking', 'Grade Viewing', 'School Notices']
  },
  {
    id: 'parent' as const,
    title: 'Parent',
    description: 'Track child\'s progress, attendance, fees, and communicate with teachers',
    icon: Heart,
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    features: ['Child Progress', 'Fee Management', 'Teacher Communication', 'Event Updates']
  }
];

export function RoleSelector({ onSelectRole, selectedRole }: RoleSelectorProps) {
  return (
    <div className="space-y-6" data-testid="role-selector">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold font-heading text-foreground">
          Choose Your Role
        </h2>
        <p className="text-muted-foreground">
          Select your role to see the customized dashboard experience
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;
          
          return (
            <Card 
              key={role.id}
              className={`hover-elevate cursor-pointer transition-all ${
                isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
              }`}
              onClick={() => onSelectRole(role.id)}
              data-testid={`role-card-${role.id}`}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-full ${role.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground" data-testid={`text-role-title-${role.id}`}>
                        {role.title}
                      </h3>
                      <Badge className={role.color} variant="outline">
                        {role.title.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  
                  {isSelected && (
                    <Badge variant="default" className="animate-pulse">
                      SELECTED
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {role.description}
                </p>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {role.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  variant={isSelected ? "default" : "outline"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectRole(role.id);
                  }}
                  data-testid={`button-select-${role.id}`}
                >
                  {isSelected ? 'Selected' : `View ${role.title} Dashboard`}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}