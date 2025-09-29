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
import { Link } from "wouter";
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
  School,
  TrendingUp
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
        { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
        { title: "Analytics", url: "/admin/analytics", icon: FileText },
      ]
    },
    {
      title: "Management",
      items: [
        { title: "Students", url: "/admin/students", icon: Users },
        { title: "Teachers", url: "/admin/teachers", icon: GraduationCap },
        { title: "Parents", url: "/admin/parents", icon: Users },
        { title: "Classes", url: "/admin/classes", icon: School },
      ]
    },
    {
      title: "Operations",
      items: [
        { title: "Attendance", url: "/admin/attendance", icon: UserCheck },
        { title: "Timetable", url: "/admin/timetable", icon: Calendar },
        { title: "Fee Management", url: "/admin/fees", icon: DollarSign },
        { title: "Exams & Results", url: "/admin/exams", icon: ClipboardCheck },
      ]
    },
    {
      title: "Communication",
      items: [
        { title: "Notice Board", url: "/admin/notices", icon: MessageSquare },
        { title: "Messages", url: "/admin/messages", icon: MessageSquare },
      ]
    }
  ],
  teacher: [
    {
      title: "Teaching",
      items: [
        { title: "Dashboard", url: "/teacher/dashboard", icon: LayoutDashboard },
        { title: "My Classes", url: "/teacher/classes", icon: School },
        { title: "Students", url: "/teacher/students", icon: Users },
        { title: "Attendance", url: "/teacher/attendance", icon: UserCheck },
      ]
    },
    {
      title: "Academic",
      items: [
        { title: "Timetable", url: "/teacher/timetable", icon: Calendar },
        { title: "Assignments", url: "/teacher/assignments", icon: BookOpen },
        { title: "Gradebook", url: "/teacher/grades", icon: ClipboardCheck },
        { title: "Exams", url: "/teacher/exams", icon: FileText },
      ]
    },
    {
      title: "Communication",
      items: [
        { title: "Messages", url: "/teacher/messages", icon: MessageSquare },
      ]
    }
  ],
  student: [
    {
      title: "Academic",
      items: [
        { title: "Dashboard", url: "/student/dashboard", icon: LayoutDashboard },
        { title: "Timetable", url: "/student/timetable", icon: Calendar },
        { title: "Assignments", url: "/student/assignments", icon: BookOpen },
        { title: "Grades", url: "/student/grades", icon: ClipboardCheck },
      ]
    },
    {
      title: "School Life",
      items: [
        { title: "Attendance", url: "/student/attendance", icon: UserCheck },
        { title: "Exams", url: "/student/exams", icon: FileText },
        { title: "Notices", url: "/student/notices", icon: MessageSquare },
        { title: "Fee Status", url: "/student/fees", icon: DollarSign },
      ]
    },
    {
      title: "Communication",
      items: [
        { title: "Messages", url: "/student/messages", icon: MessageSquare },
      ]
    }
  ],
  parent: [
    {
      title: "Child's Progress",
      items: [
        { title: "Dashboard", url: "/parent/dashboard", icon: LayoutDashboard },
        { title: "Attendance", url: "/parent/attendance", icon: UserCheck },
        { title: "Grades & Results", url: "/parent/grades", icon: ClipboardCheck },
        { title: "Timetable", url: "/parent/timetable", icon: Calendar },
      ]
    },
    {
      title: "Communication",
      items: [
        { title: "Notices", url: "/parent/notices", icon: MessageSquare },
        { title: "Teacher Messages", url: "/parent/messages", icon: MessageSquare },
        { title: "Fee Management", url: "/parent/fees", icon: DollarSign },
      ]
    },
    {
      title: "Other",
      items: [
        { title: "Child Progress", url: "/parent/child-progress", icon: TrendingUp },
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
                      <Link href={item.url} className="w-full text-left flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
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
