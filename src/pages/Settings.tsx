import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings as SettingsIcon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Settings: React.FC = () => {
  const { theme: currentTheme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [email, setEmail] = useState("admin@smartpark.com");

  const handleSave = () => {
    // Placeholder save logic
    alert("Settings saved!");
  };

  const handleThemeToggle = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  const handleThemeSelect = (selectedTheme: string) => {
    setTheme(selectedTheme as 'dark' | 'light' | 'system');
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <div className="flex items-center gap-3">
        <SettingsIcon className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
      </div>
      <Card className="border-border shadow-sm transition-all duration-300 hover:shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Application Settings
          </CardTitle>
          <CardDescription>Configure notifications, theme, and contact information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-foreground">Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive email alerts for security events.</p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
                className="transition-colors duration-200"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-foreground">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
              </div>
              <Switch
                checked={currentTheme === 'dark'}
                onCheckedChange={handleThemeToggle}
                className="transition-colors duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Theme</Label>
              <Select value={currentTheme} onValueChange={handleThemeSelect}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Admin Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                className="transition-shadow duration-200 focus-visible:ring-primary"
              />
            </div>
          </div>
          <Button onClick={handleSave} className="w-full transition-all duration-200 hover:scale-105">
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
