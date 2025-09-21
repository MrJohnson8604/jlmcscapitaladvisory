-- Fix security issue: Remove public access to sensitive referral data
-- Drop the existing policy that allows anyone to view referrals
DROP POLICY IF EXISTS "Anyone can view referrals" ON public.referrals;

-- Create a restrictive policy that only allows authenticated users to view referrals
-- This ensures only staff/admin users can access the sensitive data
CREATE POLICY "Only authenticated users can view referrals" 
ON public.referrals 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Keep the insert policy as-is since we want the public form to work
-- The "Anyone can submit referrals" policy remains unchanged