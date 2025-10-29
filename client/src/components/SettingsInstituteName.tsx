import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, Phone, Mail, Globe, Calendar, Award, Users, BookOpen, Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InstituteData {
  id: string;
  name: string;
  shortName: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  established: string | null;
  accreditation: string | null;
  principalName: string | null;
  principalEmail: string | null;
  motto: string | null;
  description: string | null;
  boardAffiliation: string | null;
  registrationNumber: string | null;
  studentCount: string | null;
  teacherCount: string | null;
  classCount: string | null;
  createdAt: string;
  updatedAt: string;
}

export function SettingsInstituteName() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { toast } = useToast();

  const [instituteData, setInstituteData] = useState<InstituteData | null>(null);

  const handleInputChange = (field: string, value: string | number) => {
    setInstituteData(prev => prev ? { ...prev, [field]: value } : null);
  };

  // Load institute data on component mount
  useEffect(() => {
    // Use dummy data for now since API isn't working due to Vite interception
    const dummyData: InstituteData = {
      id: "demo-1",
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
      classCount: "42",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setInstituteData(dummyData);
    setFetching(false);
  }, []);

  const handleSave = async () => {
    if (!instituteData) return;

    setLoading(true);
    try {
      // Prepare data for update (exclude id, createdAt, updatedAt)
      const updateData = {
        name: instituteData.name,
        shortName: instituteData.shortName,
        address: instituteData.address,
        phone: instituteData.phone,
        email: instituteData.email,
        website: instituteData.website,
        established: instituteData.established,
        accreditation: instituteData.accreditation,
        principalName: instituteData.principalName,
        principalEmail: instituteData.principalEmail,
        motto: instituteData.motto,
        description: instituteData.description,
        boardAffiliation: instituteData.boardAffiliation,
        registrationNumber: instituteData.registrationNumber,
        studentCount: instituteData.studentCount,
        teacherCount: instituteData.teacherCount,
        classCount: instituteData.classCount,
      };

      const response = await fetch('/api/institute/current', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setInstituteData(updatedData);
        toast({
          title: "Success",
          description: "Institute information updated successfully",
        });
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update institute information",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading institute information...</span>
        </div>
      </div>
    );
  }

  if (!instituteData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-muted-foreground">Unable to load institute information</p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Institute Information</h1>
            <p className="text-muted-foreground">
              Manage your institution's basic information and settings
            </p>
          </div>
          <Button onClick={handleSave} disabled={loading || fetching} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            {loading ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>
              Fundamental details about your institution
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={instituteData.name || ""}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Institution Full Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shortName">Short Name</Label>
                <Input
                  id="shortName"
                  value={instituteData.shortName || ""}
                  onChange={(e) => handleInputChange('shortName', e.target.value)}
                  placeholder="Short Code"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="motto">Institution Motto</Label>
              <Input
                id="motto"
                value={instituteData.motto || ""}
                onChange={(e) => handleInputChange('motto', e.target.value)}
                placeholder="Institution motto or tagline"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={instituteData.description || ""}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of the institution"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="established">Established Year</Label>
                <Input
                  id="established"
                  value={instituteData.established || ""}
                  onChange={(e) => handleInputChange('established', e.target.value)}
                  placeholder="Year of establishment"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <Input
                  id="registrationNumber"
                  value={instituteData.registrationNumber || ""}
                  onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                  placeholder="Registration/Registration number"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contact Information
            </CardTitle>
            <CardDescription>
              Contact details and communication information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address
              </Label>
              <Textarea
                id="address"
                value={instituteData.address || ""}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Complete address"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={instituteData.phone || ""}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={instituteData.email || ""}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="info@institution.edu"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website
              </Label>
              <Input
                id="website"
                type="url"
                value={instituteData.website || ""}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://www.institution.edu"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="principalName" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Principal Name
                </Label>
                <Input
                  id="principalName"
                  value={instituteData.principalName || ""}
                  onChange={(e) => handleInputChange('principalName', e.target.value)}
                  placeholder="Dr. Principal Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="principalEmail">Principal Email</Label>
                <Input
                  id="principalEmail"
                  type="email"
                  value={instituteData.principalEmail || ""}
                  onChange={(e) => handleInputChange('principalEmail', e.target.value)}
                  placeholder="principal@institution.edu"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accreditation & Board Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Accreditation & Board Information
            </CardTitle>
            <CardDescription>
              Educational board and accreditation details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="boardAffiliation">Board Affiliation</Label>
              <Input
                id="boardAffiliation"
                value={instituteData.boardAffiliation || ""}
                onChange={(e) => handleInputChange('boardAffiliation', e.target.value)}
                placeholder="e.g., CBSE, State Board, ICSE"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accreditation">Accreditation</Label>
              <Input
                id="accreditation"
                value={instituteData.accreditation || ""}
                onChange={(e) => handleInputChange('accreditation', e.target.value)}
                placeholder="Accreditation body or council"
              />
            </div>
          </CardContent>
        </Card>

        {/* Statistics Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Institution Statistics
            </CardTitle>
            <CardDescription>
              Current enrollment and capacity information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentCount" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Students
                </Label>
                <Input
                  id="studentCount"
                  type="number"
                  value={instituteData.studentCount || ""}
                  onChange={(e) => handleInputChange('studentCount', e.target.value)}
                  placeholder="Total students"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacherCount" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Teachers
                </Label>
                <Input
                  id="teacherCount"
                  type="number"
                  value={instituteData.teacherCount || ""}
                  onChange={(e) => handleInputChange('teacherCount', e.target.value)}
                  placeholder="Total faculty"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="classCount" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Classes
                </Label>
                <Input
                  id="classCount"
                  type="number"
                  value={instituteData.classCount || ""}
                  onChange={(e) => handleInputChange('classCount', e.target.value)}
                  placeholder="Total classes"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SettingsInstituteName;
