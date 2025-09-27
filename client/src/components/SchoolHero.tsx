import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Users, Calendar, Award, ArrowRight } from "lucide-react";
import heroImage from "@assets/generated_images/School_classroom_hero_image_05c2d0c7.png";
import buildingImage from "@assets/generated_images/Modern_school_building_exterior_6302bd44.png";

interface SchoolHeroProps {
  schoolName?: string;
  onGetStarted?: () => void;
  onLearnMore?: () => void;
}

export function SchoolHero({ 
  schoolName = "Springfield Academy",
  onGetStarted,
  onLearnMore 
}: SchoolHeroProps) {
  const stats = [
    { icon: Users, label: "Students", value: "1,284" },
    { icon: GraduationCap, label: "Teachers", value: "47" },
    { icon: Calendar, label: "Years of Excellence", value: "25+" },
    { icon: Award, label: "Achievement Rate", value: "96%" }
  ];
  
  return (
    <div className="relative">
      {/* Hero Section */}
      <div 
        className="relative min-h-[600px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
        data-testid="hero-section"
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        
        <div className="relative container mx-auto px-6 py-20 flex items-center min-h-[600px]">
          <div className="max-w-2xl text-white space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold font-heading leading-tight" data-testid="text-school-name">
              Welcome to<br />
              <span className="text-yellow-400">{schoolName}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Empowering students, supporting teachers, and connecting families through 
              comprehensive school management solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white border-0 shadow-lg"
                onClick={onGetStarted}
                data-testid="button-get-started"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                onClick={onLearnMore}
                data-testid="button-learn-more"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="bg-background border-t">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="hover-elevate" data-testid={`stat-card-${index}`}>
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1" data-testid={`text-stat-value-${index}`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid={`text-stat-label-${index}`}>
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="bg-accent/30">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-heading text-foreground">
                Modern School Management
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our comprehensive platform streamlines daily operations, enhances communication, 
                and provides powerful insights to help your school thrive in the digital age.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Real-time attendance tracking and reporting</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Integrated fee management with online payments</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Parent-teacher communication portal</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Comprehensive grade and progress tracking</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={buildingImage} 
                alt="Modern school building" 
                className="rounded-lg shadow-xl w-full h-auto"
                data-testid="img-school-building"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}