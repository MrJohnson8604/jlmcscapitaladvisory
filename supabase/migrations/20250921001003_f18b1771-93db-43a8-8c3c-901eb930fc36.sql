-- Create referrals table to store form submissions
CREATE TABLE public.referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  -- Referrer information
  your_name TEXT NOT NULL,
  your_email TEXT NOT NULL,
  your_phone TEXT,
  -- Lead information
  lead_name TEXT NOT NULL,
  lead_contact TEXT NOT NULL,
  -- Deal information
  deal_type TEXT,
  property_state TEXT,
  loan_amount NUMERIC,
  notes TEXT,
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (though this will be public for now)
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert referrals (public form)
CREATE POLICY "Anyone can submit referrals" 
ON public.referrals 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow reading referrals (for admin purposes)
CREATE POLICY "Anyone can view referrals" 
ON public.referrals 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_referrals_updated_at
  BEFORE UPDATE ON public.referrals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();