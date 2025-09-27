import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  DollarSign,
  BookOpen,
  ClipboardCheck,
  MessageSquare,
  Settings,
  FileText,
  UserCheck,
  School
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AppSidebarProps {
  userRole?: 'admin' | 'teacher' | 'student' | 'parent';
  userName?: string;
  userAvatar?: string;
}

const menuItems = {
  admin: [
    {
      title: "Overview",
      items: [
        { title: "Dashboard", url: "/", icon: LayoutDashboard },
        { title: "Analytics", url: "/analytics", icon: FileText },
      ]
    },
    {
      title: "Management",
      items: [
        { title: "Students", url: "/students", icon: Users },
        { title: "Teachers", url: "/teachers", icon: GraduationCap },
        { title: "Classes", url: "/classes", icon: School },
        { title: "Subjects", url: "/subjects", icon: BookOpen },
      ]
    },
    {
      title: "Operations",
      items: [
        { title: "Attendance", url: "/attendance", icon: UserCheck },
        { title: "Timetable", url: "/timetable", icon: Calendar },
        { title: "Fee Management", url: "/fees", icon: DollarSign },
        { title: "Exams & Results", url: "/exams", icon: ClipboardCheck },
      ]
    },
    {
      title: "Communication",
      items: [
        { title: "Notice Board", url: "/notices", icon: MessageSquare },
        { title: "Messages", url: "/messages", icon: MessageSquare },
      ]
    }
  ],
  teacher: [
    {
      title: "Teaching",
      items: [
        { title: "Dashboard", url: "/", icon: LayoutDashboard },
        { title: "My Classes", url: "/classes", icon: School },
        { title: "Students", url: "/students", icon: Users },
        { title: "Attendance", url: "/attendance", icon: UserCheck },
      ]
    },
    {
      title: "Academic",
      items: [
        { title: "Timetable", url: "/timetable", icon: Calendar },
        { title: "Assignments", url: "/assignments", icon: BookOpen },
        { title: "Gradebook", url: "/grades", icon: ClipboardCheck },
        { title: "Exams", url: "/exams", icon: FileText },
      ]
    }
  ],
  student: [
    {
      title: "Academic",
      items: [
        { title: "Dashboard", url: "/", icon: LayoutDashboard },
        { title: "Timetable", url: "/timetable", icon: Calendar },
        { title: "Assignments", url: "/assignments", icon: BookOpen },
        { title: "Grades", url: "/grades", icon: ClipboardCheck },
      ]
    },
    {
      title: "School Life",
      items: [
        { title: "Attendance", url: "/attendance", icon: UserCheck },
        { title: "Notices", url: "/notices", icon: MessageSquare },
        { title: "Fee Status", url: "/fees", icon: DollarSign },
      ]
    }
  ],
  parent: [
    {
      title: "Child's Progress",
      items: [
        { title: "Dashboard", url: "/", icon: LayoutDashboard },
        { title: "Attendance", url: "/attendance", icon: UserCheck },
        { title: "Grades & Results", url: "/grades", icon: ClipboardCheck },
        { title: "Timetable", url: "/timetable", icon: Calendar },
      ]
    },
    {
      title: "Communication",
      items: [
        { title: "Notices", url: "/notices", icon: MessageSquare },
        { title: "Teacher Messages", url: "/messages", icon: MessageSquare },
        { title: "Fee Management", url: "/fees", icon: DollarSign },
      ]
    }
  ]
};

const roleConfig = {
  admin: { label: "Administrator", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
  teacher: { label: "Teacher", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
  student: { label: "Student", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  parent: { label: "Parent", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" }
};

export function AppSidebar({ 
  userRole = 'student',
  userName = 'John Doe',
  userAvatar 
}: AppSidebarProps) {
  const roleInfo = roleConfig[userRole];
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase();
  const currentMenuItems = menuItems[userRole] || menuItems.student;
  
  return (
    <Sidebar collapsible="icon" data-testid="sidebar-main">
      <SidebarContent>
        {/* User Profile Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <div className="flex items-center gap-3 w-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userAvatar} alt={userName} />
                      <AvatarFallback className="text-sm font-semibold">{userInitials}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start flex-1">
                      <span className="font-semibold text-sm" data-testid="text-user-name">{userName}</span>
                      <Badge className={`text-xs ${roleInfo.color}`} variant="outline">
                        {roleInfo.label}
                      </Badge>
                    </div>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Navigation Menu */}
        {currentMenuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild
                      data-testid={`nav-item-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <a href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        
        {/* Settings Group */}
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild data-testid="nav-item-settings">
                  <a href="/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="p-2 text-xs text-muted-foreground text-center">
              School Management System v1.0
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  );
}