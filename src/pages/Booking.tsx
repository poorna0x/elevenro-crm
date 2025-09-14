import React, { useState, useRef } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, MapPin, Camera, Upload, Check, Phone, Mail, User, Home, Clock, Wrench } from 'lucide-react';
import { db } from '@/lib/supabase';
import { cloudinaryService, compressImage } from '@/lib/cloudinary';
import { emailService } from '@/lib/email';
import { generateJobNumber } from '@/lib/supabase';

interface FormData {
  // Customer Information
  fullName: string;
  phone: string;
  email: string;
  alternatePhone: string;
  
  // Service Information
  serviceType: 'RO' | 'SOFTENER';
  service: string;
  brandName: string;
  modelName: string;
  
  // Location Information
  address: string;
  coordinates: { lat: number; lng: number };
  
  // Scheduling
  serviceDate: string;
  preferredTime: 'MORNING' | 'AFTERNOON' | 'EVENING';
  
  // Additional Information
  description: string;
  images: File[];
}

const Booking: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const loadingRef = useRef(false);
  const [brandSuggestions, setBrandSuggestions] = useState<string[]>([]);
  const [modelSuggestions, setModelSuggestions] = useState<string[]>([]);
  const [showBrandSuggestions, setShowBrandSuggestions] = useState(false);
  const [showModelSuggestions, setShowModelSuggestions] = useState(false);
  // Get tomorrow's date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    alternatePhone: '',
    serviceType: 'RO',
    service: '',
    brandName: '',
    modelName: '',
    address: '',
    coordinates: { lat: 0, lng: 0 },
    serviceDate: getTomorrowDate(),
    preferredTime: 'MORNING',
    description: '',
    images: []
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Brand and model data - Real-world popular RO brands in India
  const brandData = {
    'K': ['Kent'],
    'A': ['Aquaguard', 'AO Smith'],
    'P': ['Pureit'],
    'L': ['Livpure', 'LG'],
    'B': ['Blue Star'],
    'T': ['Tata Swach'],
    'E': ['Eureka Forbes']
  };

  const modelData = {
    'Kent': [
      'Grand Plus RO + UV + UF',
      'Supreme Extra RO + UV + UF', 
      'Pearl RO + UV',
      'Gold RO + UV + UF'
    ],
    'Aquaguard': [
      'Delight RO + UV + Mineral Guard',
      'Geneus RO + UV + UF',
      'Crystal Plus RO + UV',
      'Amaze RO + UV'
    ],
    'AO Smith': [
      'Z1',
      'Z8', 
      'Delight RO + UV'
    ],
    'Pureit': [
      'Classic RO + UV',
      'Advanced RO + UV + MF',
      'Ultima RO + UV',
      'Copper+ RO + UV'
    ],
    'Livpure': [
      'Glo RO + UV + Mineral',
      'Smart RO + UV + UF',
      'Pep Pro RO + UV + UF'
    ],
    'LG': [
      'Puricare RO + UV + UF',
      'WW180EP RO + UV',
      'Puricare Hot & Cold RO',
      'Puricare Alkaline RO'
    ],
    'Blue Star': [
      'Aristo RO + UV + Mineral Cartridge',
      'Stella RO + UV',
      'Majesto RO + UV + UF'
    ],
    'Tata Swach': [
      'Standard RO',
      'Advanced RO + UV',
      'Premium RO + UV + UF'
    ],
    'Eureka Forbes': [
      'Aquasure RO + UV',
      'Aquasure Delight RO + UV',
      'Aquasure Geneus RO + UV + UF'
    ]
  };

  const steps = [
    { id: 1, title: 'Personal Info', icon: User, emoji: '👤' },
    { id: 2, title: 'Service Details', icon: Wrench, emoji: '🔧' },
    { id: 3, title: 'Location', icon: MapPin, emoji: '📍' },
    { id: 4, title: 'Schedule', icon: Clock, emoji: '⏰' },
    { id: 5, title: 'Review & Submit', icon: Check, emoji: '✅' }
  ];

  const totalSteps = steps.length;
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Handle address autocomplete
  };


  const handleBrandInput = (value: string) => {
    setFormData(prev => ({ ...prev, brandName: value }));
    
    if (value.length > 0) {
      const firstLetter = value.charAt(0).toUpperCase();
      const suggestions = brandData[firstLetter as keyof typeof brandData] || [];
      const filtered = suggestions.filter(brand => 
        brand.toLowerCase().includes(value.toLowerCase())
      );
      setBrandSuggestions(filtered);
      setShowBrandSuggestions(true);
    } else {
      setShowBrandSuggestions(false);
    }
  };

  const handleModelInput = (value: string) => {
    setFormData(prev => ({ ...prev, modelName: value }));
    
    if (value.length > 0 && formData.brandName) {
      const brandKey = Object.keys(modelData).find(key => 
        key.toLowerCase() === formData.brandName.toLowerCase()
      );
      
      if (brandKey) {
        const suggestions = modelData[brandKey as keyof typeof modelData] || [];
        const filtered = suggestions.filter(model => 
          model.toLowerCase().includes(value.toLowerCase())
        );
        setModelSuggestions(filtered);
        setShowModelSuggestions(true);
      }
    } else {
      setShowModelSuggestions(false);
    }
  };

  const selectBrand = (brand: string) => {
    setFormData(prev => ({ ...prev, brandName: brand }));
    setShowBrandSuggestions(false);
    setFormData(prev => ({ ...prev, modelName: '' })); // Reset model when brand changes
  };

  const selectModel = (model: string) => {
    setFormData(prev => ({ ...prev, modelName: model }));
    setShowModelSuggestions(false);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const checkLocationPermission = async () => {
    if (!navigator.permissions) {
      return 'unknown';
    }
    
    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
      return permission.state;
    } catch (error) {
      return 'unknown';
    }
  };

  const getCurrentLocation = async () => {
    console.log('Starting location fetch, setting loading to true');
    loadingRef.current = true;
    setIsLoadingLocation(true);
    console.log('Loading state set to true, current state:', isLoadingLocation);
    
    // Add a small delay to ensure the loading state is visible
    await new Promise(resolve => setTimeout(resolve, 100));
    
    try {
      if (!navigator.geolocation) {
        toast.error('Geolocation is not supported by this browser.');
        loadingRef.current = false;
        setIsLoadingLocation(false);
        return;
      }

      // Check if we're on HTTPS or localhost
      const isSecure = window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      if (!isSecure) {
        toast.error('Location access requires HTTPS. Please use a secure connection.');
        loadingRef.current = false;
        setIsLoadingLocation(false);
        return;
      }

      // Check permission status
      const permissionStatus = await checkLocationPermission();
      
      if (permissionStatus === 'denied') {
        toast.error('Location permission denied. Please enable location access in your browser settings and refresh the page.');
        loadingRef.current = false;
        setIsLoadingLocation(false);
        return;
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve, 
          (error) => {
            console.error('Geolocation error:', error);
            switch (error.code) {
              case error.PERMISSION_DENIED:
                reject(new Error('Location access denied. Please allow location permission and try again.'));
                break;
              case error.POSITION_UNAVAILABLE:
                reject(new Error('Location information unavailable. Please check your GPS settings.'));
                break;
              case error.TIMEOUT:
                reject(new Error('Location request timed out. Please try again.'));
                break;
              default:
                reject(new Error('An unknown error occurred while retrieving location.'));
                break;
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 300000
          }
        );
      });

      const { latitude, longitude } = position.coords;
      
      // Try multiple approaches to get detailed addresses
      const geocodingPromises = [
        // Try OpenStreetMap Nominatim with CORS proxy
        fetch(`https://corsproxy.io/?${encodeURIComponent(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&extratags=1&namedetails=1&accept-language=en`)}`)
          .then(res => res.json())
          .then(data => {
            console.log('Nominatim detailed response:', data);
            
            if (data && data.display_name) {
              // Use the full display_name if it's detailed enough
              let detailedAddress = data.display_name;
              
              // If display_name is too generic, try to build a better one
              if (data.display_name.length < 50 || data.display_name.includes(data.address?.city + ', ' + data.address?.city)) {
                const addr = data.address || {};
                const addressParts = [];
                
                // Add house number if available
                if (addr.house_number) addressParts.push(addr.house_number);
                
                // Add street/road information
                if (addr.road) {
                  addressParts.push(addr.road);
                } else if (data.extratags?.ref) {
                  // Use reference if no street name (like VJVJ+8XW)
                  addressParts.push(data.extratags.ref);
                }
                
                // Add area/locality information with priority order
                if (addr.suburb && addr.suburb !== addr.city) addressParts.push(addr.suburb);
                if (addr.neighbourhood && addr.neighbourhood !== addr.suburb && addr.neighbourhood !== addr.city) addressParts.push(addr.neighbourhood);
                if (addr.quarter && addr.quarter !== addr.suburb && addr.quarter !== addr.city) addressParts.push(addr.quarter);
                if (addr.district && addr.district !== addr.city) addressParts.push(addr.district);
                
                // Add city
                if (addr.city) addressParts.push(addr.city);
                
                // Add state
                if (addr.state && addr.state !== addr.city) addressParts.push(addr.state);
                
                // Add pincode
                if (addr.postcode) addressParts.push(addr.postcode);
                
                // Add country
                if (addr.country && addr.country !== 'India') addressParts.push(addr.country);
                
                if (addressParts.length >= 4) {
                  detailedAddress = addressParts.join(', ');
                }
              }
              
              return {
                service: 'nominatim',
                address: detailedAddress,
                pincode: data.address?.postcode || '',
                city: data.address?.city || '',
                state: data.address?.state || '',
                area: data.address?.suburb || data.address?.neighbourhood || '',
                street: data.address?.road || '',
                houseNumber: data.address?.house_number || '',
                country: data.address?.country || '',
                fullDetails: data
              };
            }
            return null;
          })
          .catch(() => null),
        
        // Try alternative CORS proxy
        fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&extratags=1&namedetails=1&accept-language=en`)}`)
          .then(res => res.json())
          .then(data => {
            console.log('Nominatim alternative response:', data);
            
            if (data && data.display_name) {
              return {
                service: 'nominatim-alt',
                address: data.display_name,
                pincode: data.address?.postcode || '',
                city: data.address?.city || '',
                state: data.address?.state || '',
                area: data.address?.suburb || data.address?.neighbourhood || '',
                street: data.address?.road || '',
                houseNumber: data.address?.house_number || '',
                country: data.address?.country || '',
                fullDetails: data
              };
            }
            return null;
          })
          .catch(() => null),
        
        // BigDataCloud as fallback
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&localityInfo=true`)
          .then(res => res.json())
          .then(data => {
            console.log('BigDataCloud fallback response:', data);
            
            const addressParts = [];
            
            if (data.localityInfo?.administrative) {
              const admin = data.localityInfo.administrative;
              if (admin[4]?.name && admin[4].name !== admin[2]?.name) addressParts.push(admin[4].name);
              if (admin[3]?.name && admin[3].name !== admin[4]?.name && admin[3].name !== admin[2]?.name) addressParts.push(admin[3].name);
              if (admin[2]?.name) addressParts.push(admin[2].name);
              if (admin[1]?.name && admin[1].name !== admin[2]?.name) addressParts.push(admin[1].name);
              if (data.postcode) addressParts.push(data.postcode);
            } else {
              if (data.locality && data.locality !== data.city) addressParts.push(data.locality);
              if (data.city) addressParts.push(data.city);
              if (data.principalSubdivision && data.principalSubdivision !== data.city) addressParts.push(data.principalSubdivision);
              if (data.postcode) addressParts.push(data.postcode);
            }
            
            const address = addressParts.length > 0 
              ? addressParts.join(', ')
              : `Current Location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
            
            return {
              service: 'bigdatacloud',
              address: address,
              pincode: data.postcode || '',
              city: data.city || '',
              state: data.principalSubdivision || '',
              area: data.locality || '',
              street: '',
              houseNumber: '',
              country: data.countryName || '',
              fullDetails: data
            };
          })
          .catch(() => null)
      ];

      // Wait for all geocoding services to complete and pick the best result
      Promise.allSettled(geocodingPromises.filter(p => p !== null))
        .then(results => {
          const successfulResults = results
            .filter(r => r.status === 'fulfilled' && r.value)
            .map(r => r.value);
          
          
          // Find the best result based on address detail and length
          const bestResult = successfulResults.reduce((best, current) => {
            const currentScore = current.address.length + (current.address.includes(',') ? 10 : 0) + (current.street ? 20 : 0);
            const bestScore = best.address.length + (best.address.includes(',') ? 10 : 0) + (best.street ? 20 : 0);
            return currentScore > bestScore ? current : best;
          }, successfulResults[0]);
          
          if (bestResult) {
            console.log('Setting address to:', bestResult.address);
            
            setFormData(prev => ({ 
              ...prev, 
              address: bestResult.address,
              coordinates: { lat: latitude, lng: longitude }
            }));

          } else {
            const coordinateAddress = `Current Location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
            setFormData(prev => ({ 
              ...prev, 
              address: coordinateAddress,
              coordinates: { lat: latitude, lng: longitude }
            }));
            toast.warning('Location detected but detailed address lookup failed. Please verify the coordinates.');
          }
        })
        .catch(() => {
          const coordinateAddress = `Current Location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          setFormData(prev => ({ 
            ...prev, 
            address: coordinateAddress,
            coordinates: { lat: latitude, lng: longitude }
          }));
          toast.warning('Location detected but address lookup failed. Please verify the coordinates.');
        });
    } catch (error) {
      console.error('Error getting location:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to get current location.';
      toast.error(`${errorMessage} Please try manual entry or check your browser settings.`, { duration: 8000 });
      
      // Show helpful instructions
      setTimeout(() => {
        toast.info('💡 Alternative: Start typing your address above for suggestions, or enter manually with full details including pincode.', { duration: 10000 });
      }, 2000);
    } finally {
      console.log('Location fetch completed, setting loading to false');
      loadingRef.current = false;
      setIsLoadingLocation(false);
    }
  };

  const processFiles = async (files: File[]) => {
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file.`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    try {
      const processedFiles = await Promise.all(
        validFiles.map(async (file) => {
          const compressedFile = await compressImage(file, 1280, 0.3); // Aggressive compression
          return compressedFile;
        })
      );

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...processedFiles]
      }));

      toast.success(`${validFiles.length} image(s) added successfully!`);
    } catch (error) {
      console.error('Error processing images:', error);
      toast.error('Failed to process images. Please try again.');
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;
    await processFiles(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;
    await processFiles(files);
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Upload images to Cloudinary
      const imageUrls = await Promise.all(
        formData.images.map(file => cloudinaryService.uploadImage(file))
      );

      // Check if customer already exists by phone number
      let customer;
      let isExistingCustomer = false;
      const { data: existingCustomer, error: findError } = await db.customers.getByPhone(formData.phone);
      
      if (findError && findError.code !== 'PGRST116') { // PGRST116 is "not found" error
        throw new Error(`Error checking existing customer: ${findError.message}`);
      }
      
      if (existingCustomer) {
        // Customer exists, update their information
        isExistingCustomer = true;
        console.log('Customer exists, updating information');
        console.log('Existing customer data:', existingCustomer);
        const updateData = {
          full_name: formData.fullName,
          email: formData.email,
          alternate_phone: formData.alternatePhone,
          address: {
            street: formData.address,
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560001',
          },
          location: {
            latitude: formData.coordinates.lat,
            longitude: formData.coordinates.lng,
            formattedAddress: formData.address,
          },
          preferred_time_slot: formData.preferredTime,
          updated_at: new Date().toISOString(),
        };
        
        console.log('Updating customer with ID:', existingCustomer.id);
        console.log('Update data:', updateData);
        
        const { data: updatedCustomer, error: updateError } = await db.customers.update(existingCustomer.id, updateData);
        
        console.log('Update result:', { updatedCustomer, updateError });
        
        if (updateError) {
          console.error('Customer update error:', updateError);
          throw new Error(`Error updating customer: ${updateError.message}`);
        }
        
        if (!updatedCustomer) {
          console.error('No customer data returned from update');
          throw new Error('Customer update failed: No data returned');
        }
        
        customer = updatedCustomer;
      } else {
        // Customer doesn't exist, create new one
        console.log('Customer does not exist, creating new customer');
        const customerData = {
          full_name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          alternate_phone: formData.alternatePhone,
          address: {
            street: formData.address,
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560001',
          },
          location: {
            latitude: formData.coordinates.lat,
            longitude: formData.coordinates.lng,
            formattedAddress: formData.address,
          },
          service_type: formData.serviceType,
          brand: formData.brandName,
          model: formData.modelName,
          status: 'ACTIVE' as const,
          customer_since: new Date().toISOString(),
          preferred_time_slot: formData.preferredTime,
          preferred_language: 'ENGLISH' as const,
        };

        const { data: newCustomer, error: customerError } = await db.customers.create(customerData);
        
        if (customerError) {
          console.error('Customer creation error:', customerError);
          throw new Error(`Error creating customer: ${customerError.message}`);
        }
        
        if (!newCustomer) {
          throw new Error('Customer creation failed: No data returned');
        }
        
        customer = newCustomer;
      }

      // Create job record
      const jobData = {
        job_number: generateJobNumber(formData.serviceType),
        customer_id: customer.id,
        service_type: formData.serviceType,
        service_sub_type: formData.service,
        brand: formData.brandName,
        model: formData.modelName,
        status: 'PENDING' as const,
        priority: 'MEDIUM' as const,
        description: formData.description,
        images: imageUrls,
        scheduled_date: formData.serviceDate ? new Date(formData.serviceDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        scheduled_time_slot: formData.preferredTime || 'MORNING',
        estimated_duration: 120,
        service_address: {
          street: formData.address,
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560001',
        },
        service_location: {
          latitude: formData.coordinates.lat,
          longitude: formData.coordinates.lng,
          formattedAddress: formData.address,
        },
        requirements: [],
        estimated_cost: 0,
        payment_status: 'PENDING' as const,
      };

      const { data: job, error: jobError } = await db.jobs.create(jobData);
      
      if (jobError) {
        throw new Error(jobError.message);
      }

      // Send confirmation email
      await emailService.sendBookingConfirmation({
        customerName: formData.fullName,
        customerEmail: formData.email,
        jobNumber: job.job_number,
        serviceType: formData.serviceType,
        serviceSubType: formData.service,
        brand: formData.brandName,
        model: formData.modelName,
        scheduledDate: new Date().toISOString(),
        scheduledTimeSlot: formData.preferredTime,
        serviceAddress: formData.address,
        phone: formData.phone,
        email: formData.email,
      });

      const customerAction = isExistingCustomer ? 'updated' : 'created';
      toast.success(`Booking submitted successfully! Customer ${customerAction} and job scheduled. You will receive a confirmation email shortly.`);
      
      // Reset form
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        alternatePhone: '',
        serviceType: 'RO',
        service: '',
        brandName: '',
        modelName: '',
        address: '',
        coordinates: { lat: 0, lng: 0 },
        serviceDate: getTomorrowDate(),
        preferredTime: 'MORNING',
        description: '',
        images: []
      });
      setCurrentStep(1);
      
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(`Booking failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="w-12 h-12 mx-auto mb-3 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Personal Information</h3>
              <p className="text-muted-foreground">Tell us about yourself</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+91 98765 43210"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="alternatePhone">Alternate Phone</Label>
                <Input
                  id="alternatePhone"
                  type="tel"
                  value={formData.alternatePhone}
                  onChange={(e) => handleInputChange('alternatePhone', e.target.value)}
                  placeholder="+91 98765 43211"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Wrench className="w-12 h-12 mx-auto mb-3 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Service Details</h3>
              <p className="text-muted-foreground">What service do you need?</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="serviceType">Service Type *</Label>
                <Select value={formData.serviceType} onValueChange={(value: 'RO' | 'SOFTENER') => handleInputChange('serviceType', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RO">RO Water Purifier</SelectItem>
                    <SelectItem value="SOFTENER">Water Softener</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="service">Service Required *</Label>
                <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INSTALLATION">Installation</SelectItem>
                    <SelectItem value="REPAIR">Repair</SelectItem>
                    <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                    <SelectItem value="REPLACEMENT">Replacement</SelectItem>
                    <SelectItem value="SERVICE">General Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="relative">
                <Label htmlFor="brandName">Brand Name *</Label>
                <Input
                  id="brandName"
                  value={formData.brandName}
                  onChange={(e) => handleBrandInput(e.target.value)}
                  onFocus={() => {
                    if (formData.brandName.length > 0) {
                      const firstLetter = formData.brandName.charAt(0).toUpperCase();
                      const suggestions = brandData[firstLetter as keyof typeof brandData] || [];
                      setBrandSuggestions(suggestions);
                      setShowBrandSuggestions(true);
                    }
                  }}
                  onBlur={() => setTimeout(() => setShowBrandSuggestions(false), 200)}
                  placeholder="e.g., Kent, Aquaguard, Pureit"
                  className="mt-1"
                />
                {showBrandSuggestions && brandSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {brandSuggestions.map((brand, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => selectBrand(brand)}
                      >
                        {brand}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="relative">
                <Label htmlFor="modelName">Model Name *</Label>
                <Input
                  id="modelName"
                  value={formData.modelName}
                  onChange={(e) => handleModelInput(e.target.value)}
                  onFocus={() => {
                    if (formData.modelName.length > 0 && formData.brandName) {
                      const brandKey = Object.keys(modelData).find(key => 
                        key.toLowerCase() === formData.brandName.toLowerCase()
                      );
                      if (brandKey) {
                        const suggestions = modelData[brandKey as keyof typeof modelData] || [];
                        setModelSuggestions(suggestions);
                        setShowModelSuggestions(true);
                      }
                    }
                  }}
                  onBlur={() => setTimeout(() => setShowModelSuggestions(false), 200)}
                  placeholder="e.g., Grand Plus, Max, Ultra"
                  className="mt-1"
                />
                {showModelSuggestions && modelSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {modelSuggestions.map((model, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => selectModel(model)}
                      >
                        {model}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="description">Additional Details</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the issue or any specific requirements..."
                  className="mt-1 min-h-[100px]"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <MapPin className="w-12 h-12 mx-auto mb-3 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Service Location</h3>
              <p className="text-muted-foreground">Where should we come?</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Service Address *</Label>
                <div className="relative">
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Please click 'Use Current Location' for easy navigation, or enter your complete address manually..."
                    className="mt-1 min-h-[100px]"
                  />
                </div>
              </div>
              
              <Button
                type="button"
                variant="outline"
                onClick={getCurrentLocation}
                disabled={isLoadingLocation}
                className="w-full relative"
              >
                {isLoadingLocation ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                    Getting Location...
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 mr-2" />
                    Use Current Location
                  </>
                )}
                {/* Debug: Loading state = {isLoadingLocation ? 'TRUE' : 'FALSE'} */}
              </Button>
              
              {/* Additional loading indicator */}
              {isLoadingLocation && (
                <div className="mt-2 text-center">
                  <div className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary mr-2"></div>
                    Fetching your location...
                  </div>
                </div>
              )}
              
              
              <div>
                <Label>Upload Images (Optional)</Label>
                
                {/* Note about RO and problem images */}
                <div className="mt-2 mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>💡 Helpful tip:</strong> Please share images of your RO system and any problems you're experiencing. This helps our technicians understand the issue better and come prepared with the right tools and parts.
                  </p>
                </div>
                
                <div className="mt-2 space-y-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  
                  {/* Camera input for direct capture */}
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  
                  {/* Drag and Drop Area */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      isDragOver 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400 dark:text-gray-500" />
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      Drag and drop images here, or
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        size="sm"
                      >
                        Choose from Gallery
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => cameraInputRef.current?.click()}
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Camera className="w-4 h-4" />
                        Take Photo
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Supports JPG, PNG, WebP (Max 10MB each)
                    </p>
                  </div>
                  
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {formData.images.map((file, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Clock className="w-12 h-12 mx-auto mb-3 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Schedule Service</h3>
              <p className="text-muted-foreground">When would you like us to come?</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="serviceDate">Service Date *</Label>
                <Input
                  id="serviceDate"
                  type="date"
                  value={formData.serviceDate}
                  onChange={(e) => handleInputChange('serviceDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="preferredTime">Time Slot *</Label>
                <Select value={formData.preferredTime} onValueChange={(value: 'MORNING' | 'AFTERNOON' | 'EVENING') => handleInputChange('preferredTime', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select preferred time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MORNING">Morning (9 AM - 12 PM)</SelectItem>
                    <SelectItem value="AFTERNOON">Afternoon (12 PM - 5 PM)</SelectItem>
                    <SelectItem value="EVENING">Evening (5 PM - 8 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Service Information</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>• We'll call you to confirm the exact time</p>
                  <p>• Our technician will arrive within the selected slot</p>
                  <p>• Service typically takes 1-2 hours</p>
                  <p>• Free consultation and quote provided</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Check className="w-12 h-12 mx-auto mb-3 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Review & Submit</h3>
              <p className="text-muted-foreground">Please review your booking details</p>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div><strong>Name:</strong> {formData.fullName}</div>
                  <div><strong>Phone:</strong> {formData.phone}</div>
                  <div><strong>Email:</strong> {formData.email}</div>
                  {formData.alternatePhone && <div><strong>Alternate:</strong> {formData.alternatePhone}</div>}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Wrench className="w-5 h-5 mr-2" />
                    Service Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div><strong>Type:</strong> {formData.serviceType}</div>
                  <div><strong>Service:</strong> {formData.service}</div>
                  <div><strong>Brand:</strong> {formData.brandName}</div>
                  <div><strong>Model:</strong> {formData.modelName}</div>
                  {formData.description && <div><strong>Details:</strong> {formData.description}</div>}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Location & Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div><strong>Address:</strong> {formData.address}</div>
                  <div><strong>Service Date:</strong> {formData.serviceDate ? new Date(formData.serviceDate).toLocaleDateString() : 'Not selected'}</div>
                  <div><strong>Time Slot:</strong> {formData.preferredTime}</div>
                  {formData.images.length > 0 && <div><strong>Images:</strong> {formData.images.length} uploaded</div>}
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.phone && formData.email;
      case 2:
        return formData.service && formData.brandName && formData.modelName;
      case 3:
        return formData.address;
      case 4:
        return formData.serviceDate && formData.preferredTime;
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Book Your Service
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Get professional RO installation, repair, and maintenance
              </p>
              
              {/* No Account Required Notice */}
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-2 text-gray-900 dark:text-white">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    No account required! Book directly and we'll contact you.
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Step Indicators */}
            <div className="flex justify-between mb-8">
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      isActive ? 'bg-primary text-primary-foreground' :
                      isCompleted ? 'bg-green-500 text-white' :
                      'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}>
                      {/* Keep Lucide icons as primary, emojis as fallback */}
                      <Icon className="w-5 h-5" />
                    </div>
                    {/* Show text only on desktop */}
                    <span className={`hidden md:block text-xs text-center ${
                      isActive ? 'text-primary font-medium' :
                      isCompleted ? 'text-green-600 dark:text-green-400 font-medium' :
                      'text-gray-500 dark:text-gray-400'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Form Content */}
            <Card className="mb-6">
              <CardContent className="p-6 max-h-[70vh] overflow-y-auto">
                {renderStepContent()}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="flex items-center"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className="flex items-center"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Booking'}
                  <Check className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Booking;