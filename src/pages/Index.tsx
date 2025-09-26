import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Zap, Shield, BarChart3, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-parking.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const features = [
    {
      icon: Zap,
      title: "Real-time Monitoring",
      description: "Track parking availability instantly across all zones and buildings",
      gradient: "bg-gradient-primary"
    },
    {
      icon: Shield,
      title: "AI-Powered Security",
      description: "Advanced surveillance with intelligent threat detection and alerts",
      gradient: "bg-gradient-secondary"
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "Data-driven insights for optimal parking management and planning",
      gradient: "bg-parking-orange"
    }
  ];

  const stats = [
    { value: "99.9%", label: "Uptime", color: "text-parking-green" },
    { value: "500+", label: "Locations", color: "text-parking-purple" },
    { value: "1M+", label: "Vehicles", color: "text-accent" }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-glow-primary">
                <Car className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">InnoAIParking</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-foreground hover:text-accent transition-colors">Home</a>
              <a href="#features" className="text-foreground hover:text-accent transition-colors">Features</a>
              <a href="#about" className="text-foreground hover:text-accent transition-colors">About Us</a>
              <a href="#contact" className="text-foreground hover:text-accent transition-colors">Contact</a>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/login")}
                className="text-foreground hover:text-accent"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate("/login")}
                className="bg-gradient-primary hover:shadow-glow-primary transition-all duration-300"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-12 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`space-y-8 ${animateIn ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="space-y-4">
                <Badge className="bg-accent/20 text-accent border-accent/30">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Next-Gen Parking Solutions
                </Badge>
                
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  We Make{" "}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Your Parking
                  </span>{" "}
                  Easier!
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Welcome to a World of Seamless Parking and Superior Monitoring! Our advanced AI-powered solutions are designed to ensure safe, efficient, and hassle-free vehicle management.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={() => navigate("/login")}
                  className="bg-gradient-primary hover:shadow-glow-primary transition-all duration-300 text-lg px-8"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className={`relative ${animateIn ? 'animate-scale-in' : 'opacity-0'}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                <img 
                  src={heroImage} 
                  alt="Smart Parking Dashboard Interface" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                
                {/* Floating Stats Cards */}
                <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-parking-green rounded-full animate-pulse" />
                    <span className="text-foreground font-medium">LIVE</span>
                  </div>
                </div>

                <Card className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border-border">
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">AI-Powered</div>
                    <div className="font-semibold text-foreground">Parking Demo</div>
                    <div className="text-xs text-muted-foreground">(System in action)</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Powerful Features for Modern Parking
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of parking management with our comprehensive suite of intelligent solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card border-border hover:shadow-elevated transition-all duration-300 group cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex p-4 rounded-xl ${feature.gradient} shadow-glow-primary group-hover:scale-110 transition-transform duration-300 mb-6`}>
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                  <div className="mt-6">
                    <CheckCircle className="h-5 w-5 text-parking-green mx-auto" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-card">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your Parking Experience?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have revolutionized their parking management with SmartPark
          </p>
          <Button 
            size="lg"
            onClick={() => navigate("/login")}
            className="bg-gradient-primary hover:shadow-glow-primary transition-all duration-300 text-lg px-12"
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
