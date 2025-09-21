-- Fix critical security issue: Restrict referrals access to admin users only
-- Drop the overly permissive existing policy
DROP POLICY IF EXISTS "Only authenticated users can view referrals" ON public.referrals;

-- Create a restrictive policy that only allows specific admin users to view referrals
-- This uses the authenticated user's email to control access
CREATE POLICY "Only admin users can view referrals" 
ON public.referrals 
FOR SELECT 
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    'chris.johnson@jlmcsfunding.com'
    -- Add more admin emails here as needed
  )
);

-- Keep the existing INSERT policy for public referral submissions
-- (This allows anyone to submit referrals but only admins can view them)