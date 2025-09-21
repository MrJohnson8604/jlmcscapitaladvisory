import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Mail, Phone, MapPin, DollarSign, FileText, Calendar, ExternalLink } from "lucide-react";
import { format } from "date-fns";

interface Referral {
  id: string;
  your_name: string;
  your_email: string;
  your_phone: string | null;
  lead_name: string;
  lead_contact: string;
  deal_type: string | null;
  property_state: string | null;
  loan_amount: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

const SubmissionsDashboard = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error("Failed to load referrals: " + error.message);
        console.error('Error fetching referrals:', error);
      } else {
        setReferrals(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number | null) => {
    if (!amount) return "Not specified";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getDealTypeColor = (dealType: string | null) => {
    switch (dealType?.toLowerCase()) {
      case 'fix_flip': return 'bg-blue-100 text-blue-800';
      case 'dscr_rental': return 'bg-green-100 text-green-800';
      case 'new_construction': return 'bg-purple-100 text-purple-800';
      case 'commercial_bridge': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDealType = (dealType: string | null) => {
    if (!dealType) return "Not specified";
    const types: { [key: string]: string } = {
      'fix_flip': 'Fix & Flip',
      'dscr_rental': 'DSCR Rental',
      'new_construction': 'New Construction',
      'commercial_bridge': 'Commercial Bridge'
    };
    return types[dealType] || dealType;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading submissions...</span>
      </div>
    );
  }

  if (referrals.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Submissions Yet</h3>
          <p className="text-muted-foreground mb-4">
            Form submissions will appear here once users start referring deals.
          </p>
          <Button onClick={fetchReferrals} variant="outline">
            Refresh
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-display font-bold">Referral Submissions</h3>
          <p className="text-muted-foreground">
            {referrals.length} total submission{referrals.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={fetchReferrals} variant="outline">
          Refresh
        </Button>
      </div>

      <div className="grid gap-6">
        {referrals.map((referral) => (
          <Card key={referral.id} className="shadow-medium">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl mb-2">
                    {referral.lead_name}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(referral.created_at), 'MMM d, yyyy h:mm a')}
                    </div>
                    {referral.deal_type && (
                      <Badge className={getDealTypeColor(referral.deal_type)}>
                        {formatDealType(referral.deal_type)}
                      </Badge>
                    )}
                  </div>
                </div>
                {referral.loan_amount && (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {formatCurrency(referral.loan_amount)}
                    </div>
                    <div className="text-sm text-muted-foreground">Loan Amount</div>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Lead Information */}
              <div>
                <h4 className="font-semibold mb-3 text-primary">Lead Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{referral.lead_contact}</div>
                      <div className="text-sm text-muted-foreground">Contact</div>
                    </div>
                  </div>
                  {referral.property_state && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{referral.property_state}</div>
                        <div className="text-sm text-muted-foreground">Property State</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Referrer Information */}
              <div>
                <h4 className="font-semibold mb-3 text-primary">Referred By</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium">{referral.your_name}</div>
                      <div className="text-sm text-muted-foreground">Name</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{referral.your_email}</div>
                      <div className="text-sm text-muted-foreground">Email</div>
                    </div>
                  </div>
                  {referral.your_phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{referral.your_phone}</div>
                        <div className="text-sm text-muted-foreground">Phone</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes */}
              {referral.notes && (
                <div>
                  <h4 className="font-semibold mb-2 text-primary">Additional Notes</h4>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm leading-relaxed">{referral.notes}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <Button size="sm" asChild>
                  <a href={`mailto:${referral.lead_contact}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Email Lead
                  </a>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <a href={`mailto:${referral.your_email}`}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Contact Referrer
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubmissionsDashboard;