// src/pages/api/submit-calculator-form.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import Airtable from 'airtable';

// Initialize Airtable using the credentials from your .env.local file
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID as string
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // We only want to handle POST requests to this endpoint
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    // Get the form data from the request body
    const { firstName, lastName, email, role } = req.body;

    // Basic validation: ensure required fields are present
    if (!firstName || !email) {
      return res.status(400).json({ error: 'First name and email are required.' });
    }

    // Send the data to your Airtable table
    // The table name comes from your .env.local file
    await base(process.env.AIRTABLE_TABLE_NAME as string).create([
      {
        fields: {
          // IMPORTANT: The keys here ('First Name', 'Email', etc.)
          // MUST EXACTLY MATCH the field names (column headers) in your Airtable base.
          'First Name': firstName,
          'Last Name': lastName,
          'Email Address': email,
          'Primary Role': role,
        },
      },
    ]);

    // Send a success response back to the form
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error(error); // Log the error for debugging
    // Send an error response back to the form
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}