// Simple test to add sample photos to a job
console.log('Testing photo display...');

// Sample photo URLs (using placeholder images)
const samplePhotos = [
  'https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Before+1',
  'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Before+2',
  'https://via.placeholder.com/400x300/EF4444/FFFFFF?text=After+1',
  'https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=After+2'
];

console.log('Sample photos:', samplePhotos);

// Test if we can create a job with photos
const testJobData = {
  id: 'test-job-123',
  job_number: 'TEST-2025-001',
  before_photos: samplePhotos.slice(0, 2),
  after_photos: samplePhotos.slice(2, 4),
  description: 'Test job with sample photos',
  status: 'PENDING',
  serviceType: 'RO',
  brand: 'Test Brand',
  model: 'Test Model'
};

console.log('Test job data:', testJobData);

// Test photo loading
samplePhotos.forEach((photo, index) => {
  const img = new Image();
  img.onload = () => console.log(`✅ Photo ${index + 1} loaded successfully:`, photo);
  img.onerror = () => console.log(`❌ Photo ${index + 1} failed to load:`, photo);
  img.src = photo;
});
