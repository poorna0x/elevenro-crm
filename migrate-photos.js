// Migration script to move photos from 'images' field to 'before_photos' field
// Run this script to fix existing job records

import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase URL and anon key
const supabaseUrl = 'https://cgpjfmbyxjetmzehkumo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNncGpmbWJ5eGpldG16ZWhrdW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4Mjk4MjgsImV4cCI6MjA3MzQwNTgyOH0.f30aVh06s_FjEXbXuH-8LEwTx774QmnXQwztacK4NHI';

const supabase = createClient(supabaseUrl, supabaseKey);

async function migratePhotos() {
  try {
    console.log('Starting photo migration...');
    
    // Get all jobs that have photos in the 'images' field
    const { data: jobs, error: fetchError } = await supabase
      .from('jobs')
      .select('id, images, before_photos')
      .not('images', 'is', null);
    
    if (fetchError) {
      throw new Error(`Error fetching jobs: ${fetchError.message}`);
    }
    
    console.log(`Found ${jobs.length} jobs with images field`);
    
    for (const job of jobs) {
      // Only migrate if images exist and before_photos is empty
      if (job.images && Array.isArray(job.images) && job.images.length > 0 && 
          (!job.before_photos || job.before_photos.length === 0)) {
        
        console.log(`Migrating photos for job ${job.id}...`);
        
        const { error: updateError } = await supabase
          .from('jobs')
          .update({ 
            before_photos: job.images,
            images: null // Clear the old images field
          })
          .eq('id', job.id);
        
        if (updateError) {
          console.error(`Error updating job ${job.id}:`, updateError);
        } else {
          console.log(`Successfully migrated photos for job ${job.id}`);
        }
      }
    }
    
    console.log('Photo migration completed!');
    
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Run migration if this script is executed directly
migratePhotos();

export { migratePhotos };
