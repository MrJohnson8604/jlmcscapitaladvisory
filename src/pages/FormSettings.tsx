import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, FormInput, Users, BarChart3 } from "lucide-react";
import { toast } from "sonner";

const FormSettings = () => {
  const [quickIntakeSettings, setQuickIntakeSettings] = useState({
    enabled: true,
    title: "Quick Deal Intake",
    description: "Tell us about your project and we'll get back to you within 24 hours.",
    submitButtonText: "Submit Deal Info",
    successMessage: "Thank you! We'll review your information and get back to you within 24 hours.",
    requireConsent: true,
    enableAnalytics: true,
  });

  const [referralSettings, setReferralSettings] = useState({
    enabled: true,
    title: "Refer a Deal",
    description: "Know someone who needs financing? Refer them and earn up to $5,000.",
    submitButtonText: "Submit Referral",
    successMessage: "Thank you for your referral! We'll contact the lead within 48 hours.",
    requireConsent: true,
    enableAnalytics: true,
  });

  const handleSaveQuickIntake = () => {
    // TODO: Save to database or local storage
    toast.success("Quick Intake form settings saved successfully!");
  };

  const handleSaveReferral = () => {
    // TODO: Save to database or local storage
    toast.success("Referral form settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Settings className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-display font-bold text-primary">
                Form Settings
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Configure your form behavior, content, and analytics settings.
            </p>
          </div>

          <Tabs defaultValue="quick-intake" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="quick-intake" className="flex items-center gap-2">
                <FormInput className="h-4 w-4" />
                Quick Intake
              </TabsTrigger>
              <TabsTrigger value="referral" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Referral Form
              </TabsTrigger>
              <TabsTrigger value="submissions" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Submissions
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            {/* Quick Intake Settings */}
            <TabsContent value="quick-intake" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Deal Intake Form</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Enable Form</Label>
                      <p className="text-sm text-muted-foreground">Show the quick intake form on your homepage</p>
                    </div>
                    <Switch 
                      checked={quickIntakeSettings.enabled}
                      onCheckedChange={(checked) => 
                        setQuickIntakeSettings(prev => ({ ...prev, enabled: checked }))
                      }
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="quick-title">Form Title</Label>
                      <Input
                        id="quick-title"
                        value={quickIntakeSettings.title}
                        onChange={(e) => 
                          setQuickIntakeSettings(prev => ({ ...prev, title: e.target.value }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quick-button">Submit Button Text</Label>
                      <Input
                        id="quick-button"
                        value={quickIntakeSettings.submitButtonText}
                        onChange={(e) => 
                          setQuickIntakeSettings(prev => ({ ...prev, submitButtonText: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quick-description">Form Description</Label>
                    <Textarea
                      id="quick-description"
                      value={quickIntakeSettings.description}
                      onChange={(e) => 
                        setQuickIntakeSettings(prev => ({ ...prev, description: e.target.value }))
                      }
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quick-success">Success Message</Label>
                    <Textarea
                      id="quick-success"
                      value={quickIntakeSettings.successMessage}
                      onChange={(e) => 
                        setQuickIntakeSettings(prev => ({ ...prev, successMessage: e.target.value }))
                      }
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Require Consent Checkbox</Label>
                      <p className="text-sm text-muted-foreground">Require users to agree to terms before submitting</p>
                    </div>
                    <Switch 
                      checked={quickIntakeSettings.requireConsent}
                      onCheckedChange={(checked) => 
                        setQuickIntakeSettings(prev => ({ ...prev, requireConsent: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Enable Analytics</Label>
                      <p className="text-sm text-muted-foreground">Track form views, submissions, and conversion rates</p>
                    </div>
                    <Switch 
                      checked={quickIntakeSettings.enableAnalytics}
                      onCheckedChange={(checked) => 
                        setQuickIntakeSettings(prev => ({ ...prev, enableAnalytics: checked }))
                      }
                    />
                  </div>

                  <Button onClick={handleSaveQuickIntake} className="w-full">
                    Save Quick Intake Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Referral Form Settings */}
            <TabsContent value="referral" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Referral Form</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Enable Form</Label>
                      <p className="text-sm text-muted-foreground">Show the referral form at /refer-deal</p>
                    </div>
                    <Switch 
                      checked={referralSettings.enabled}
                      onCheckedChange={(checked) => 
                        setReferralSettings(prev => ({ ...prev, enabled: checked }))
                      }
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="referral-title">Form Title</Label>
                      <Input
                        id="referral-title"
                        value={referralSettings.title}
                        onChange={(e) => 
                          setReferralSettings(prev => ({ ...prev, title: e.target.value }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="referral-button">Submit Button Text</Label>
                      <Input
                        id="referral-button"
                        value={referralSettings.submitButtonText}
                        onChange={(e) => 
                          setReferralSettings(prev => ({ ...prev, submitButtonText: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referral-description">Form Description</Label>
                    <Textarea
                      id="referral-description"
                      value={referralSettings.description}
                      onChange={(e) => 
                        setReferralSettings(prev => ({ ...prev, description: e.target.value }))
                      }
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referral-success">Success Message</Label>
                    <Textarea
                      id="referral-success"
                      value={referralSettings.successMessage}
                      onChange={(e) => 
                        setReferralSettings(prev => ({ ...prev, successMessage: e.target.value }))
                      }
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Require Consent Checkbox</Label>
                      <p className="text-sm text-muted-foreground">Require users to agree to terms before submitting</p>
                    </div>
                    <Switch 
                      checked={referralSettings.requireConsent}
                      onCheckedChange={(checked) => 
                        setReferralSettings(prev => ({ ...prev, requireConsent: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Enable Analytics</Label>
                      <p className="text-sm text-muted-foreground">Track form views, submissions, and conversion rates</p>
                    </div>
                    <Switch 
                      checked={referralSettings.enableAnalytics}
                      onCheckedChange={(checked) => 
                        setReferralSettings(prev => ({ ...prev, enableAnalytics: checked }))
                      }
                    />
                  </div>

                  <Button onClick={handleSaveReferral} className="w-full">
                    Save Referral Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Submissions Tab */}
            <TabsContent value="submissions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Form Submissions Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Submissions Dashboard</h3>
                    <p className="text-muted-foreground mb-6">
                      View and manage all form submissions in one place. Authentication required to access sensitive data.
                    </p>
                    <Button variant="outline">
                      Set Up Authentication First
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Form Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
                    <p className="text-muted-foreground mb-6">
                      Track form performance, conversion rates, and user behavior.
                    </p>
                    <Button variant="outline">
                      Enable Analytics Tracking
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FormSettings;