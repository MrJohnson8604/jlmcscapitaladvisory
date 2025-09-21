import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const referralSchema = z.object({
  yourName: z.string().min(2, "Name is required"),
  yourEmail: z.string().email("Valid email is required"),
  yourPhone: z.string().optional(),
  leadName: z.string().min(2, "Lead name is required"),
  leadContact: z.string().min(1, "Lead contact is required"),
  dealType: z.string().optional(),
  propertyState: z.string().optional(),
  loanAmount: z.string().optional(),
  notes: z.string().optional(),
  agreedToTerms: z.boolean().refine(val => val === true, "You must agree to the terms"),
  notCompensated: z.boolean().refine(val => val === true, "You must confirm you are not being compensated"),
});

type ReferralFormData = z.infer<typeof referralSchema>;

const ReferDeal = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    setValue,
    watch,
    reset
  } = useForm<ReferralFormData>({
    resolver: zodResolver(referralSchema),
    defaultValues: {
      agreedToTerms: false,
      notCompensated: false
    }
  });

  const onSubmit = async (data: ReferralFormData) => {
    setIsSubmitting(true);
    
    try {
      const referralData = {
        yourName: data.yourName,
        yourEmail: data.yourEmail,
        yourPhone: data.yourPhone || "",
        leadName: data.leadName,
        leadContact: data.leadContact,
        dealType: data.dealType || "",
        propertyState: data.propertyState || "",
        loanAmount: data.loanAmount || "",
        notes: data.notes || "",
      };

      console.log("Submitting referral data:", referralData);

      // Call the edge function
      const { data: result, error } = await supabase.functions.invoke("submit-referral", {
        body: referralData,
      });

      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(error.message);
      }

      if (!result.success) {
        throw new Error(result.error || "Failed to submit referral");
      }

      console.log("Referral submitted successfully:", result);
      
      toast({
        title: "Referral Submitted!",
        description: "Thanks! We'll contact your referral within 1 business day and send you confirmation.",
      });

      // Reset form
      reset();

    } catch (error: any) {
      console.error("Error submitting referral:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error submitting your referral. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const usStates = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Refer a Deal, Earn $500
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Paid on funding when you are not otherwise compensated in the transaction and where permitted by law.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="shadow-medium text-center">
              <CardContent className="p-8">
                <DollarSign className="h-12 w-12 text-amber mx-auto mb-4" />
                <h3 className="text-xl font-display font-semibold mb-2 text-primary">$500 Referral Fee</h3>
                <p className="text-muted-foreground">Paid upon successful funding</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-medium text-center">
              <CardContent className="p-8">
                <Users className="h-12 w-12 text-amber mx-auto mb-4" />
                <h3 className="text-xl font-display font-semibold mb-2 text-primary">No Limits</h3>
                <p className="text-muted-foreground">Refer as many deals as you'd like</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-medium text-center">
              <CardContent className="p-8">
                <CheckCircle2 className="h-12 w-12 text-amber mx-auto mb-4" />
                <h3 className="text-xl font-display font-semibold mb-2 text-primary">Fast Response</h3>
                <p className="text-muted-foreground">Contact within 1 business day</p>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="shadow-large">
              <CardHeader>
                <CardTitle className="text-2xl font-display font-bold text-primary">
                  Submit a Referral
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Your Information */}
                  <div>
                    <h3 className="text-lg font-display font-semibold mb-4 text-primary">
                      Your Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="yourName">Your Name *</Label>
                        <Input id="yourName" {...register('yourName')} />
                        {errors.yourName && (
                          <p className="text-sm text-destructive">{errors.yourName.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="yourEmail">Your Email *</Label>
                        <Input id="yourEmail" {...register('yourEmail')} type="email" />
                        {errors.yourEmail && (
                          <p className="text-sm text-destructive">{errors.yourEmail.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="yourPhone">Your Phone (optional)</Label>
                      <Input id="yourPhone" {...register('yourPhone')} type="tel" />
                    </div>
                  </div>

                  {/* Lead Information */}
                  <div>
                    <h3 className="text-lg font-display font-semibold mb-4 text-primary">
                      Referral Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="leadName">Lead's Name *</Label>
                        <Input id="leadName" {...register('leadName')} />
                        {errors.leadName && (
                          <p className="text-sm text-destructive">{errors.leadName.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="leadContact">Lead's Email or Phone *</Label>
                        <Input id="leadContact" {...register('leadContact')} />
                        {errors.leadContact && (
                          <p className="text-sm text-destructive">{errors.leadContact.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Deal Information */}
                  <div>
                    <h3 className="text-lg font-display font-semibold mb-4 text-primary">
                      Deal Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="dealType">Deal Type</Label>
                        <Select onValueChange={(value) => setValue('dealType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select deal type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fix-flip">Fix & Flip</SelectItem>
                            <SelectItem value="dscr">DSCR</SelectItem>
                            <SelectItem value="new-construction">New Construction</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="propertyState">Property State</Label>
                        <Select onValueChange={(value) => setValue('propertyState', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {usStates.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <Label htmlFor="loanAmount">Estimated Loan Amount</Label>
                      <Input 
                        id="loanAmount" 
                        {...register('loanAmount')}
                        type="number" 
                        placeholder="250000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="notes">Notes (max 240 characters)</Label>
                      <Textarea 
                        id="notes" 
                        {...register('notes')}
                        maxLength={240}
                        placeholder="Additional details about the deal..."
                      />
                    </div>
                  </div>

                  {/* Required Checkboxes */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="notCompensated"
                        onCheckedChange={(checked) => setValue('notCompensated', !!checked)}
                      />
                      <Label htmlFor="notCompensated" className="text-sm">
                        I am not being compensated in this transaction. *
                      </Label>
                    </div>
                    {errors.notCompensated && (
                      <p className="text-sm text-destructive">{errors.notCompensated.message}</p>
                    )}

                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="consent"
                        onCheckedChange={(checked) => setValue('agreedToTerms', !!checked)}
                      />
                      <Label htmlFor="consent" className="text-sm">
                        I consent to JLMCS Capital Advisory contacting this referral and understand 
                        that referral fees are paid only upon funding and where permitted by law. *
                      </Label>
                    </div>
                    {errors.agreedToTerms && (
                      <p className="text-sm text-destructive">{errors.agreedToTerms.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-amber w-full"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Referral"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Terms Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Card className="border-amber/20 bg-amber/5">
              <CardContent className="p-6">
                <h3 className="text-lg font-display font-semibold mb-4 text-amber">
                  Referral Terms
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• $500 referral fee paid upon successful funding</li>
                  <li>• Fee only applies when you are not otherwise compensated in the transaction</li>
                  <li>• Payment subject to applicable laws and regulations</li>
                  <li>• We'll contact your referral within 1 business day</li>
                  <li>• Multiple referrals welcome</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReferDeal;