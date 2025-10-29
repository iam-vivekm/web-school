import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Building2,
  BookOpen,
  Users,
  Bell,
  Shield,
  CreditCard,
  Settings,
  Save,
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Award,
  Clock,
  Eye,
  EyeOff
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AdminSettings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Institute Information State
  const [instituteData, setInstituteData] = useState({
    name: "Example International School",
    shortName: "EIS",
    address: "123 Education Lane, Academic City, State 12345",
    phone: "+1 (555) 123-4567",
    email: "info@example-school.edu",
    website: "https://www.example-school.edu",
    established: "1995",
    accreditation: "Regional Board of Education",
    principalName: "Dr. Sarah Johnson",
    principalEmail: "principal@example-school.edu",
    motto: "Excellence Through Learning",
    description: "A premier educational institution committed to nurturing young minds and fostering academic excellence.",
    boardAffiliation: "State Board of Education",
    registrationNumber: "SCH-REG-2024-001",
    studentCount: "1284",
    teacherCount: "85",
    classCount: "42"
  });

  // Academic Settings State
  const [academicSettings, setAcademicSettings] = useState({
    academicYear: "2024-2025",
    semesterCount: "2",
    gradingScale: "percentage",
    passingMarks: "40",
    maxMarks: "100",
    attendanceRequired: "75",
    workingDays: "220",
    holidaysCount: "15",
    enableOnlineClasses: true,
    enableAssignments: true,
    enableQuizzes: true,
    curriculums: ["CBSE", "ICSE", "State Board"],
    subjects: ["Mathematics", "Physics", "Chemistry", "English", "History", "Biology"]
  });

  // User Management Settings State
  const [userManagement, setUserManagement] = useState({
    maxStudents: "2000",
    maxTeachers: "150",
    passwordMinLength: "8",
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
    sessionTimeout: "30",
    allowMultipleSessions: false,
    enableRoleBasedAccess: true,
    defaultRolePermissions: {
      student: ["view_grades", "view_attendance", "submit_assignments"],
      teacher: ["create_assignments", "manage_attendance", "view_students", "grade_assignments"],
      parent: ["view_student_progress", "view_reports", "contact_teachers"],
      admin: ["full_access"]
    }
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: {
      studentRegistration: true,
      teacherAssignment: true,
      feeReminders: true,
      examResults: true,
      attendanceAlerts: true,
      emergencyAlerts: true
    },
    smsNotifications: {
      attendanceAlerts: true,
      feePayments: true,
      examSchedules: true,
      emergencyAlerts: true,
      reportCards: false,
      birthdays: false
    },
    pushNotifications: {
      announcements: true,
      deadlines: true,
      messages: true,
      updates: false
    },
    notificationFrequency: "daily",
    emailFrequency: "immediate"
  });

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: "60",
    maxLoginAttempts: "5",
    lockoutDuration: "30",
    passwordExpiryDays: "90",
    ipWhitelist: false,
    enableAuditLogs: true,
    dataBackupFrequency: "daily",
    encryptionEnabled: true,
    apiRateLimit: "1000",
    sensitiveDataMasking: true
  });

  // Payment Settings State
  const [paymentSettings, setPaymentSettings] = useState({
    currency: "INR",
    paymentGateway: "razorpay",
    enableOnlinePayments: true,
    enableOfflinePayments: true,
    feeTypes: ["Tuition", "Transportation", "Library", "Examination", "Sports"],
    lateFeePolicy: "5_percent",
    discountTypes: ["Merit", "Siblings", "Sports", "Scholarship"],
    installmentPlans: ["Monthly", "Quarterly", "Half-Yearly", "Yearly"],
    paymentReminders: "7",
    refundPolicy: "14_days",
    taxSettings: {
      gstEnabled: true,
      gstRate: "18",
      serviceTax: "2"
    }
  });

  // System Settings State
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    debugMode: false,
    timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",
    language: "en",
    theme: "light",
    backupFrequency: "daily",
    logRetentionDays: "90",
    apiVersion: "v1.0",
    enableCaching: true,
    compressionEnabled: true,
    supportEmail: "support@example-school.edu"
  });

  const handleSave = (section: string) => {
    setLoading(true);
    setTimeout(() => {
      toast({
        title: "Success",
        description: `${section} settings saved successfully`,
      });
      setLoading(false);
    }, 1000);
  };

  const handleInstituteChange = (field: string, value: string | number | string[]) => {
    setInstituteData(prev => ({ ...prev, [field]: Array.isArray(value) ? value.join(', ') : value }));
  };

  const handleAcademicChange = (field: string, value: string | number | boolean | string[]) => {
    setAcademicSettings(prev => ({ ...prev, [field]: Array.isArray(value) ? value.join(', ') : value }));
  };

  const handleUserManagementChange = (field: string, value: string | number | boolean) => {
    setUserManagement(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (section: string, field: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleSecurityChange = (field: string, value: string | number | boolean) => {
    setSecuritySettings(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field: string, value: string | number | boolean) => {
    setPaymentSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSystemChange = (field: string, value: string | number | boolean) => {
    setSystemSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground">
            Configure and manage all system settings for your institution
          </p>
        </div>
      </div>

      <Tabs defaultValue="institute" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="institute">Institute</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {/* Institute Information Tab */}
        <TabsContent value="institute" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              <span className="text-lg font-semibold">Institute Information</span>
            </div>
            <Button onClick={() => handleSave("Institute")} disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Fundamental details about your institution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input value={instituteData.name} onChange={(e) => handleInstituteChange('name', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Short Name</Label>
                    <Input value={instituteData.shortName} onChange={(e) => handleInstituteChange('shortName', e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Institution Motto</Label>
                  <Input value={instituteData.motto} onChange={(e) => handleInstituteChange('motto', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={instituteData.description} onChange={(e) => handleInstituteChange('description', e.target.value)} rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Established Year</Label>
                    <Input value={instituteData.established} onChange={(e) => handleInstituteChange('established', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Registration Number</Label>
                    <Input value={instituteData.registrationNumber} onChange={(e) => handleInstituteChange('registrationNumber', e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Contact details and communication information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Address
                  </Label>
                  <Textarea value={instituteData.address} onChange={(e) => handleInstituteChange('address', e.target.value)} rows={2} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone
                    </Label>
                    <Input value={instituteData.phone} onChange={(e) => handleInstituteChange('phone', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input type="email" value={instituteData.email} onChange={(e) => handleInstituteChange('email', e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Website
                  </Label>
                  <Input type="url" value={instituteData.website} onChange={(e) => handleInstituteChange('website', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Principal Name</Label>
                    <Input value={instituteData.principalName} onChange={(e) => handleInstituteChange('principalName', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Principal Email</Label>
                    <Input type="email" value={instituteData.principalEmail} onChange={(e) => handleInstituteChange('principalEmail', e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Accreditation & Board
                </CardTitle>
                <CardDescription>Educational board and accreditation details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Board Affiliation</Label>
                  <Input value={instituteData.boardAffiliation} onChange={(e) => handleInstituteChange('boardAffiliation', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Accreditation</Label>
                  <Input value={instituteData.accreditation} onChange={(e) => handleInstituteChange('accreditation', e.target.value)} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Statistics
                </CardTitle>
                <CardDescription>Current enrollment and capacity information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Students</Label>
                    <Input type="number" value={instituteData.studentCount} onChange={(e) => handleInstituteChange('studentCount', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Teachers</Label>
                    <Input type="number" value={instituteData.teacherCount} onChange={(e) => handleInstituteChange('teacherCount', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Classes</Label>
                    <Input type="number" value={instituteData.classCount} onChange={(e) => handleInstituteChange('classCount', e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Academic Settings Tab */}
        <TabsContent value="academic" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <span className="text-lg font-semibold">Academic Settings</span>
            </div>
            <Button onClick={() => handleSave("Academic")} disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Educational Structure</CardTitle>
                <CardDescription>Academic year and curriculum settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Academic Year</Label>
                    <Input value={academicSettings.academicYear} onChange={(e) => handleAcademicChange('academicYear', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Semesters</Label>
                    <Input type="number" value={academicSettings.semesterCount} onChange={(e) => handleAcademicChange('semesterCount', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Working Days</Label>
                    <Input type="number" value={academicSettings.workingDays} onChange={(e) => handleAcademicChange('workingDays', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Holidays</Label>
                    <Input type="number" value={academicSettings.holidaysCount} onChange={(e) => handleAcademicChange('holidaysCount', e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Curriculum Types</Label>
                  <Textarea value={academicSettings.curriculums.join(', ')} onChange={(e) => handleAcademicChange('curriculums', e.target.value.split(', '))} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grading & Assessment</CardTitle>
                <CardDescription>Grading systems and assessment parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Grading Scale</Label>
                    <Select value={academicSettings.gradingScale} onValueChange={(value) => handleAcademicChange('gradingScale', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="gpa">GPA</SelectItem>
                        <SelectItem value="letter">Letter Grade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Maximum Marks</Label>
                    <Input type="number" value={academicSettings.maxMarks} onChange={(e) => handleAcademicChange('maxMarks', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Passing Marks</Label>
                    <Input type="number" value={academicSettings.passingMarks} onChange={(e) => handleAcademicChange('passingMarks', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Attendance Required (%)</Label>
                    <Input type="number" value={academicSettings.attendanceRequired} onChange={(e) => handleAcademicChange('attendanceRequired', e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Subject Areas</Label>
                  <Textarea value={academicSettings.subjects.join(', ')} onChange={(e) => handleAcademicChange('subjects', e.target.value.split(', '))} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Features</CardTitle>
                <CardDescription>Enable various learning and assessment features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Online Classes</Label>
                  <Switch checked={academicSettings.enableOnlineClasses} onCheckedChange={(checked) => handleAcademicChange('enableOnlineClasses', checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Assignments</Label>
                  <Switch checked={academicSettings.enableAssignments} onCheckedChange={(checked) => handleAcademicChange('enableAssignments', checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Quizzes & Tests</Label>
                  <Switch checked={academicSettings.enableQuizzes} onCheckedChange={(checked) => handleAcademicChange('enableQuizzes', checked)} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* User Management Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-lg font-semibold">User Management</span>
            </div>
            <Button onClick={() => handleSave("User Management")} disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Capacity Limits</CardTitle>
                <CardDescription>Maximum number of users for each role</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Max Students</Label>
                    <Input type="number" value={userManagement.maxStudents} onChange={(e) => handleUserManagementChange('maxStudents', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Teachers</Label>
                    <Input type="number" value={userManagement.maxTeachers} onChange={(e) => handleUserManagementChange('maxTeachers', e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Password Policy</CardTitle>
                <CardDescription>Password strength requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Minimum Length</Label>
                  <Input type="number" value={userManagement.passwordMinLength} onChange={(e) => handleUserManagementChange('passwordMinLength', e.target.value)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Require Numbers</Label>
                  <Switch checked={userManagement.requireNumbers} onCheckedChange={(checked) => handleUserManagementChange('requireNumbers', checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Require Uppercase</Label>
                  <Switch checked={userManagement.requireUppercase} onCheckedChange={(checked) => handleUserManagementChange('requireUppercase', checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Require Special Characters</Label>
                  <Switch checked={userManagement.requireSpecialChars} onCheckedChange={(checked) => handleUserManagementChange('requireSpecialChars', checked)} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Management</CardTitle>
                <CardDescription>Session timeout and access control</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Session Timeout (minutes)</Label>
                  <Input type="number" value={userManagement.sessionTimeout} onChange={(e) => handleUserManagementChange('sessionTimeout', e.target.value)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Allow Multiple Sessions</Label>
                  <Switch checked={userManagement.allowMultipleSessions} onCheckedChange={(checked) => handleUserManagementChange('allowMultipleSessions', checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Role-Based Access</Label>
                  <Switch checked={userManagement.enableRoleBasedAccess} onCheckedChange={(checked) => handleUserManagementChange('enableRoleBasedAccess', checked)} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <span className="text-lg font-semibold">Notification Settings</span>
            </div>
            <Button onClick={() => handleSave("Notifications")} disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Student Registration</Label>
                  <Checkbox checked={notificationSettings.emailNotifications.studentRegistration} onCheckedChange={(checked) => handleNotificationChange('emailNotifications', 'studentRegistration', checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Teacher Assignment</Label>
                  <Checkbox checked={notificationSettings.emailNotifications.teacherAssignment} onCheckedChange={(checked) => handleNotificationChange('emailNotifications', 'teacherAssignment', checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Fee Reminders</Label>
                  <Checkbox checked={notificationSettings.emailNotifications.feeReminders} onCheckedChange={(checked) => handleNotificationChange('emailNotifications', 'feeReminders', checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Exam Results</Label>
                  <Checkbox checked={notificationSettings.emailNotifications.examResults} onCheckedChange={(checked) => handleNotificationChange('emailNotifications', 'examResults', checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Attendance Alerts</Label>
                  <Checkbox checked={notificationSettings.emailNotifications.attendanceAlerts} onCheckedChange={(checked) => handleNotificationChange('emailNotifications', 'attendanceAlerts', checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Emergency Alerts</Label>
                  <Checkbox checked={notificationSettings.emailNotifications.emergencyAlerts} onCheckedChange={(checked) => handleNotificationChange('emailNotifications', 'emergencyAlerts', checked)} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SMS Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Attendance Alerts</Label>
                  <Checkbox checked={notificationSettings.smsNotifications.attendanceAlerts} onCheckedChange={(checked) => handleNotificationChange('smsNotifications', 'attendanceAlerts', checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Fee Payments</Label>
                  <Checkbox checked={notificationSettings.smsNotifications.feePayments} onCheckedChange={(checked) => handleNotificationChange('smsNotifications', 'feePayments', checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Exam Schedules</Label>
                  <Checkbox checked={notificationSettings.smsNotifications.examSchedules} onCheckedChange={(checked) => handleNotificationChange('smsNotifications', 'examSchedules', checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Emergency Alerts</Label>
                  <Checkbox checked={notificationSettings.smsNotifications.emergencyAlerts} onCheckedChange={(checked) => handleNotificationChange('smsNotifications', 'emergencyAlerts', checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Report Cards</Label>
                  <Checkbox checked={notificationSettings.smsNotifications.reportCards} onCheckedChange={(checked) => handleNotificationChange('smsNotifications', 'reportCards', checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Birthdays</Label>
                  <Checkbox checked={notificationSettings.smsNotifications.birthdays} onCheckedChange={(checked) => handleNotificationChange('smsNotifications', 'birthdays', checked)} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Announcements</Label>
                  <Checkbox checked={notificationSettings.pushNotifications.announcements} onCheckedChange={(checked) => handleNotificationChange('pushNotifications', 'announcements', checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Deadlines</Label>
                  <Checkbox checked={notificationSettings.pushNotifications.deadlines} onCheckedChange={(checked) => handleNotificationChange('pushNotifications', 'deadlines', checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Messages</Label>
                  <Checkbox checked={notificationSettings.pushNotifications.messages} onCheckedChange={(checked) => handleNotificationChange('pushNotifications', 'messages', checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Updates</Label>
                  <Checkbox checked={notificationSettings.pushNotifications.updates} onCheckedChange={(checked) => handleNotificationChange('pushNotifications', 'updates', checked)} />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure notification timing and frequency</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Notification Frequency</Label>
                  <Select value={notificationSettings.notificationFrequency} onValueChange={(value) => setNotificationSettings(prev => ({ ...prev, notificationFrequency: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Email Frequency</Label>
                  <Select value={notificationSettings.emailFrequency} onValueChange={(value) => setNotificationSettings(prev => ({ ...prev, emailFrequency: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-lg font-semibold">Security Settings</span>
            </div>
            <Button onClick={() => handleSave("Security")} disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Authentication</CardTitle>
                <CardDescription>Login security and access control settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Two-Factor Authentication</Label>
                  <Switch checked={securitySettings.twoFactorAuth} onCheckedChange={(checked) => handleSecurityChange('twoFactorAuth', checked)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Max Login Attempts</Label>
                    <Input type="number" value={securitySettings.maxLoginAttempts} onChange={(e) => handleSecurityChange('maxLoginAttempts', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Lockout Duration (min)</Label>
                    <Input type="number" value={securitySettings.lockoutDuration} onChange={(e) => handleSecurityChange('lockoutDuration', e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Password Expiry (days)</Label>
                  <Input type="number" value={securitySettings.passwordExpiryDays} onChange={(e) => handleSecurityChange('passwordExpiryDays', e.target.value)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>IP Whitelist</Label>
                  <Switch checked={securitySettings.ipWhitelist} onCheckedChange={(checked) => handleSecurityChange('ipWhitelist', checked)} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session & Logging</CardTitle>
                <CardDescription>Session management and audit logging</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Session Timeout (minutes)</Label>
                  <Input type="number" value={securitySettings.sessionTimeout} onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Enable Audit Logs</Label>
                  <Switch checked={securitySettings.enableAuditLogs} onCheckedChange={(checked) => handleSecurityChange('enableAuditLogs', checked)} />
                </div>
                <div className="space-y-2">
                  <Label>Backup Frequency</Label>
                  <Select value={securitySettings.dataBackupFrequency} onValueChange={(value) => handleSecurityChange('dataBackupFrequency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Protection</CardTitle>
                <CardDescription>Data encryption and privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Data Encryption</Label>
                  <Switch checked={securitySettings.encryptionEnabled} onCheckedChange={(checked) => handleSecurityChange('encryptionEnabled', checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Sensitive Data Masking</Label>
                  <Switch checked={securitySettings.sensitiveDataMasking} onCheckedChange={(checked) => handleSecurityChange('sensitiveDataMasking', checked)} />
                </div>
                <div className="space-y-2">
                  <Label>API Rate Limit (requests/minute)</Label>
                  <Input type="number" value={securitySettings.apiRateLimit} onChange={(e) => handleSecurityChange('apiRateLimit', e.target.value)} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payment Tab */}
        <TabsContent value="payment" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              <span className="text-lg font-semibold">Payment Settings</span>
            </div>
            <Button onClick={() => handleSave("Payment")} disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Gateway</CardTitle>
                <CardDescription>Configure payment processing options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select value={paymentSettings.currency} onValueChange={(value) => handlePaymentChange('currency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">Indian Rupee (INR)</SelectItem>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Payment Gateway</Label>
                  <Select value={paymentSettings.paymentGateway} onValueChange={(value) => handlePaymentChange('paymentGateway', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="razorpay">Razorpay</SelectItem>
                      <SelectItem value="paytm">Paytm</SelectItem>
                      <SelectItem value="stripe">Stripe</SelectItem>
                      <SelectItem value="payu">PayU</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Online Payments</Label>
                  <Switch checked={paymentSettings.enableOnlinePayments} onCheckedChange={(checked) => handlePaymentChange('enableOnlinePayments', checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Offline Payments</Label>
                  <Switch checked={paymentSettings.enableOfflinePayments} onCheckedChange={(checked) => handlePaymentChange('enableOfflinePayments', checked)} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fee Structure</CardTitle>
                <CardDescription>Configure fee types and policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Fee Types</Label>
                  <Textarea value={paymentSettings.feeTypes.join(', ')} onChange={(e) => handlePaymentChange('feeTypes', e.target.value.split(', '))} />
                </div>
                <div className="space-y-2">
                  <Label>Installment Plans</Label>
                  <Textarea value={paymentSettings.installmentPlans.join(', ')} onChange={(e) => handlePaymentChange('installmentPlans', e.target.value.split(', '))} />
                </div>
                <div className="space-y-2">
                  <Label>Discount Types</Label>
                  <Textarea value={paymentSettings.discountTypes.join(', ')} onChange={(e) => handlePaymentChange('discountTypes', e.target.value.split(', '))} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Payment Reminders (days before due)</Label>
                    <Input type="number" value={paymentSettings.paymentReminders} onChange={(e) => handlePaymentChange('paymentReminders', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Refund Policy (days)</Label>
                    <Input type="number" value={paymentSettings.refundPolicy} onChange={(e) => handlePaymentChange('refundPolicy', e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax Settings</CardTitle>
                <CardDescription>GST and tax configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enable GST</Label>
                  <Switch checked={paymentSettings.taxSettings.gstEnabled} onCheckedChange={(checked) => setPaymentSettings(prev => ({ ...prev, taxSettings: { ...prev.taxSettings, gstEnabled: checked } }))} />
                </div>
                <div className="space-y-2">
                  <Label>GST Rate (%)</Label>
                  <Input type="number" value={paymentSettings.taxSettings.gstRate} onChange={(e) => setPaymentSettings(prev => ({ ...prev, taxSettings: { ...prev.taxSettings, gstRate: e.target.value } }))} />
                </div>
                <div className="space-y-2">
                  <Label>Service Tax (%)</Label>
                  <Input type="number" value={paymentSettings.taxSettings.serviceTax} onChange={(e) => setPaymentSettings(prev => ({ ...prev, taxSettings: { ...prev.taxSettings, serviceTax: e.target.value } }))} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <span className="text-lg font-semibold">System Settings</span>
            </div>
            <Button onClick={() => handleSave("System")} disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Maintenance and debugging options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Maintenance Mode</Label>
                  <Switch checked={systemSettings.maintenanceMode} onCheckedChange={(checked) => handleSystemChange('maintenanceMode', checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Debug Mode</Label>
                  <Switch checked={systemSettings.debugMode} onCheckedChange={(checked) => handleSystemChange('debugMode', checked)} />
                </div>
                <div className="space-y-2">
                  <Label>API Version</Label>
                  <Input value={systemSettings.apiVersion} onChange={(e) => handleSystemChange('apiVersion', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Support Email</Label>
                  <Input type="email" value={systemSettings.supportEmail} onChange={(e) => handleSystemChange('supportEmail', e.target.value)} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Settings</CardTitle>
                <CardDescription>Timezone and localization preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select value={systemSettings.timezone} onValueChange={(value) => handleSystemChange('timezone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select value={systemSettings.dateFormat} onValueChange={(value) => handleSystemChange('dateFormat', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={systemSettings.language} onValueChange={(value) => handleSystemChange('language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select value={systemSettings.theme} onValueChange={(value) => handleSystemChange('theme', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance & Caching</CardTitle>
                <CardDescription>System optimization and caching settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enable Caching</Label>
                  <Switch checked={systemSettings.enableCaching} onCheckedChange={(checked) => handleSystemChange('enableCaching', checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Compression Enabled</Label>
                  <Switch checked={systemSettings.compressionEnabled} onCheckedChange={(checked) => handleSystemChange('compressionEnabled', checked)} />
                </div>
                <div className="space-y-2">
                  <Label>Backup Frequency</Label>
                  <Select value={systemSettings.backupFrequency} onValueChange={(value) => handleSystemChange('backupFrequency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Log Retention (days)</Label>
                  <Input type="number" value={systemSettings.logRetentionDays} onChange={(e) => handleSystemChange('logRetentionDays', e.target.value)} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AdminSettings;
