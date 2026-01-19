import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", 
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", 
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", 
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", 
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", 
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", 
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const DEAL_TYPES = [
  "Fix & Flip",
  "DSCR Rental", 
  "New Construction",
  "Commercial Bridge",
  "Other"
];

const TIMELINES = [
  "ASAP",
  "7–14 days",
  "15–30 days", 
  "30+ days"
];

const quickIntakeSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  bestContact: z.string().min(1, "Contact is required").refine(
    (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      return emailRegex.test(value) || phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''));
    },
    "Please enter a valid email or phone number"
  ),
  propertyState: z.string().min(1, "State is required"),
  dealType: z.string().min(1, "Deal type is required"),
  estimatedLoanAmount: z.string().min(1, "Loan amount is required"),
  timelineToClose: z.string().min(1, "Timeline is required"),
  consent: z.boolean().refine(val => val === true, "Consent is required"),
  honeypot: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(), 
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
});

type QuickIntakeFormData = z.infer<typeof quickIntakeSchema>;

interface ConfirmationPanelProps {
  onClose: () => void;
}

const ConfirmationPanel = ({ onClose }: ConfirmationPanelProps) => (
  <div className="text-center space-y-6">
    <div>
      <h3 className="text-2xl font-display font-bold text-primary mb-2">
        Thank you!
      </h3>
      <p className="text-muted-foreground">
        We'll review your submission and reply the same business day.
      </p>
    </div>
    <div className="quick-intake-ctas flex flex-col sm:flex-row gap-4 justify-center">
      <Button 
        className="bg-amber-500 text-gray-900 border-2 border-amber-500 hover:bg-white hover:text-amber-500 active:bg-white active:text-amber-500 focus:ring-amber-500/45 rounded-xl px-6 py-3 font-semibold" 
        asChild
      >
        <a href="https://form.jotform.com/251521627688060" target="_blank" rel="noopener noreferrer">
          Continue to Full Intake Form
        </a>
      </Button>
      <Button 
        className="bg-amber-500 text-gray-900 border-2 border-amber-500 hover:bg-white hover:text-amber-500 active:bg-white active:text-amber-500 focus:ring-amber-500/45 rounded-xl px-6 py-3 font-semibold" 
        asChild
      >
        <a href="https://calendly.com/chris-johnson-jlmcsfunding/investor-consulting-call" target="_blank" rel="noopener noreferrer">
          Book a Call
        </a>
      </Button>
    </div>
    <button 
      onClick={onClose}
      className="text-sm text-muted-foreground hover:text-primary transition-colors"
    >
      Submit another form
    </button>
  </div>
);

export const QuickIntakeForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number | null>(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    setValue,
    watch,
    reset
  } = useForm<QuickIntakeFormData>({
    resolver: zodResolver(quickIntakeSchema),
    defaultValues: {
      honeypot: "",
      consent: false
    }
  });

  // Capture UTM parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    
    utmFields.forEach(field => {
      const value = urlParams.get(field);
      if (value) {
        const camelCaseField = field.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        setValue(camelCaseField as keyof QuickIntakeFormData, value);
      }
    });
  }, [setValue]);

  // Track view event when component becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          // Analytics tracking
          if (typeof (window as any).gtag !== 'undefined') {
            (window as any).gtag('event', 'quick_intake_view', {
              event_category: 'form',
              event_label: 'quick_deal_intake'
            });
          }
          setHasTrackedView(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('quick-intake-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [hasTrackedView]);

  // Format loan amount with thousands separators
  const formatLoanAmount = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatLoanAmount(e.target.value);
    setValue('estimatedLoanAmount', formatted);
  };

  const detectContactType = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? 'email' : 'phone';
  };

  const onSubmit = async (data: QuickIntakeFormData) => {
    // Honeypot check
    if (data.honeypot) {
      return;
    }

    // Rate limiting check
    const now = Date.now();
    if (lastSubmissionTime && now - lastSubmissionTime < 15000) {
      toast({
        title: "Too Fast",
        description: "Please wait 15 seconds before submitting again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setLastSubmissionTime(now);

    try {
      // Submit to edge function
      const response = await fetch(`https://zfypycrqovozdegxcooz.supabase.co/functions/v1/submit-quick-intake`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      // Analytics tracking
      if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('event', 'quick_intake_submit', {
          event_category: 'form',
          event_label: 'quick_deal_intake',
          deal_type: data.dealType,
          state: data.propertyState,
          est_amount: data.estimatedLoanAmount,
          timeline: data.timelineToClose
        });
      }
      
      toast({
        title: "Success!",
        description: "Thanks! We'll review and reply the same business day.",
      });

      setShowConfirmation(true);

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: "There was an issue submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewSubmission = () => {
    setShowConfirmation(false);
    reset();
  };

  if (showConfirmation) {
    return (
      <section id="quick-intake-section" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-2xl mx-auto rounded-xl shadow-soft">
            <CardContent className="p-8">
              <ConfirmationPanel onClose={handleNewSubmission} />
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="quick-intake-section" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-display font-bold mb-4 text-primary">
              Quick Deal Intake
            </h2>
            <p className="text-lg text-muted-foreground">
              Share the basics—get matched to a lender fast.
            </p>
          </div>

          <Card className="rounded-xl shadow-soft">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Hidden honeypot field */}
                <input
                  type="text"
                  {...register('honeypot')}
                  style={{ display: 'none' }}
                  autoComplete="off"
                />

                {/* Hidden UTM fields */}
                <input type="hidden" {...register('utmSource')} />
                <input type="hidden" {...register('utmMedium')} />
                <input type="hidden" {...register('utmCampaign')} />
                <input type="hidden" {...register('utmTerm')} />
                <input type="hidden" {...register('utmContent')} />

                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    {...register('fullName')}
                    className="text-base rounded-xl h-12"
                    autoComplete="name"
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Best Contact */}
                <div className="space-y-2">
                  <Label htmlFor="bestContact" className="text-sm font-medium">
                    Best Contact (Email or Phone) *
                  </Label>
                  <Input
                    id="bestContact"
                    {...register('bestContact')}
                    className="text-base rounded-xl h-12"
                    placeholder="email@domain.com or (555) 123-4567"
                  />
                  {errors.bestContact && (
                    <p className="text-sm text-destructive">{errors.bestContact.message}</p>
                  )}
                  {watch('bestContact') && !errors.bestContact && (
                    <p className="text-xs text-muted-foreground">
                      Detected as: {detectContactType(watch('bestContact'))}
                    </p>
                  )}
                </div>

                {/* Property State */}
                <div className="space-y-2">
                  <Label htmlFor="propertyState" className="text-sm font-medium">
                    Property State *
                  </Label>
                  <Select onValueChange={(value) => setValue('propertyState', value)}>
                    <SelectTrigger className="h-12 rounded-xl text-base">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {US_STATES.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.propertyState && (
                    <p className="text-sm text-destructive">{errors.propertyState.message}</p>
                  )}
                </div>

                {/* Deal Type */}
                <div className="space-y-2">
                  <Label htmlFor="dealType" className="text-sm font-medium">
                    Deal Type *
                  </Label>
                  <Select onValueChange={(value) => setValue('dealType', value)}>
                    <SelectTrigger className="h-12 rounded-xl text-base">
                      <SelectValue placeholder="Select deal type" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEAL_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.dealType && (
                    <p className="text-sm text-destructive">{errors.dealType.message}</p>
                  )}
                </div>

                {/* Estimated Loan Amount */}
                <div className="space-y-2">
                  <Label htmlFor="estimatedLoanAmount" className="text-sm font-medium">
                    Estimated Loan Amount *
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="estimatedLoanAmount"
                      {...register('estimatedLoanAmount')}
                      onChange={handleLoanAmountChange}
                      className="text-base rounded-xl h-12 pl-8"
                      placeholder="250,000"
                      inputMode="numeric"
                    />
                  </div>
                  {errors.estimatedLoanAmount && (
                    <p className="text-sm text-destructive">{errors.estimatedLoanAmount.message}</p>
                  )}
                </div>

                {/* Timeline to Close */}
                <div className="space-y-2">
                  <Label htmlFor="timelineToClose" className="text-sm font-medium">
                    Timeline to Close *
                  </Label>
                  <Select onValueChange={(value) => setValue('timelineToClose', value)}>
                    <SelectTrigger className="h-12 rounded-xl text-base">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIMELINES.map((timeline) => (
                        <SelectItem key={timeline} value={timeline}>
                          {timeline}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.timelineToClose && (
                    <p className="text-sm text-destructive">{errors.timelineToClose.message}</p>
                  )}
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consent"
                    onCheckedChange={(checked) => setValue('consent', !!checked)}
                    className="mt-1"
                  />
                  <Label htmlFor="consent" className="text-sm leading-5">
                    I agree to be contacted and to the Privacy Policy. *
                  </Label>
                </div>
                {errors.consent && (
                  <p className="text-sm text-destructive">{errors.consent.message}</p>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-500 text-gray-900 border-2 border-amber-500 hover:bg-white hover:text-amber-500 active:bg-white active:text-amber-500 focus:ring-amber-500/45 text-lg px-8 py-3 rounded-xl font-display font-semibold shadow-soft transition-all duration-300"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>

                {/* Secondary Actions */}
                <div className="pt-4 border-t border-border">
                  <div className="quick-intake-ctas flex flex-col sm:flex-row gap-4 justify-center mt-4">
                    <Button 
                      className="bg-amber-500 text-gray-900 border-2 border-amber-500 hover:bg-white hover:text-amber-500 active:bg-white active:text-amber-500 focus:ring-amber-500/45 rounded-xl px-6 py-3 font-semibold" 
                      asChild
                    >
                      <a href="https://form.jotform.com/251521627688060" target="_blank" rel="noopener noreferrer">
                        Continue to Full Intake Form
                      </a>
                    </Button>
                    <Button 
                      className="bg-amber-500 text-gray-900 border-2 border-amber-500 hover:bg-white hover:text-amber-500 active:bg-white active:text-amber-500 focus:ring-amber-500/45 rounded-xl px-6 py-3 font-semibold" 
                      asChild
                    >
                      <a href="https://calendly.com/chris-johnson-jlmcsfunding/investor-consulting-call" target="_blank" rel="noopener noreferrer">
                        Book a Call
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Microcopy */}
                <p className="text-xs text-center text-muted-foreground pt-2">
                  No hard credit pull for initial review.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};