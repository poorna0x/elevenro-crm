/** Careers applications are stored and pushed from the HydrogenRO function (shared database, FCM). */
export function jobApplicationEndpoint(): string {
  const host = typeof window !== 'undefined' ? window.location.hostname.toLowerCase() : '';
  if (host === 'localhost' || host === '127.0.0.1') {
    return '/.netlify/functions/job-application';
  }
  return 'https://hydrogenro.com/.netlify/functions/job-application';
}
