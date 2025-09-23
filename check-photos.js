import { createClient } from '@supabase/supabase-js';

// You'll need to set these environment variables or replace with actual values
const supabaseUrl = 'https://cgpjfmbyxjetmzehkumo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNncGpmbWJ5eGpldG16ZWhrdW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4Mjk4MjgsImV4cCI6MjA3MzQwNTgyOH0.f30aVh06s_FjEXbXuH-8LEwTx774QmnXQwztacK4NHI';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is not defined in environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkPhotos() {
  console.log('Checking jobs for photos...');

  // Fetch all jobs with photo data
  const { data: jobs, error: fetchError } = await supabase
    .from('jobs')
    .select('id, job_number, before_photos, after_photos, images, description, created_at')
    .order('created_at', { ascending: false })
    .limit(10);

  if (fetchError) {
    console.error('Error fetching jobs:', fetchError);
    return;
  }

  if (!jobs || jobs.length === 0) {
    console.log('No jobs found.');
    return;
  }

  console.log(`Found ${jobs.length} jobs:`);
  
  jobs.forEach((job, index) => {
    console.log(`\n--- Job ${index + 1} ---`);
    console.log(`ID: ${job.id}`);
    console.log(`Job Number: ${job.job_number}`);
    console.log(`Created: ${job.created_at}`);
    console.log(`Description: ${job.description || 'N/A'}`);
    console.log(`Before Photos:`, job.before_photos);
    console.log(`After Photos:`, job.after_photos);
    console.log(`Images (old field):`, job.images);
    
    const beforeCount = job.before_photos ? job.before_photos.length : 0;
    const afterCount = job.after_photos ? job.after_photos.length : 0;
    const imagesCount = job.images ? job.images.length : 0;
    
    console.log(`Photo counts - Before: ${beforeCount}, After: ${afterCount}, Images: ${imagesCount}`);
    
    if (beforeCount > 0) {
      console.log('Before photo URLs:');
      job.before_photos.forEach((url, i) => {
        console.log(`  ${i + 1}: ${url}`);
      });
    }
    
    if (afterCount > 0) {
      console.log('After photo URLs:');
      job.after_photos.forEach((url, i) => {
        console.log(`  ${i + 1}: ${url}`);
      });
    }
  });
}

checkPhotos();
