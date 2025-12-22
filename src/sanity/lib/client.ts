// sanity/lib/client.ts
import { createClient } from 'next-sanity';

// ✅ Read-only client (for public queries)
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true, // Use CDN for faster read queries
});

// ✅ Write client (for webhooks and mutations - requires SANITY_API_TOKEN)
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false, // Never use CDN for writes
  token: process.env.SANITY_API_TOKEN, // ✅ Your write token
});