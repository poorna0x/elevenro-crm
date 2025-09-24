import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Wrench, 
  Search, 
  Filter, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  CheckCircle,
  Play,
  Pause,
  AlertCircle,
  LogOut,
  User,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';
import { db } from '@/lib/supabase';
import { Job } from '@/types';
import { sendNotification, createJobCompletedNotification } from '@/lib/notifications';

const TechnicianDashboard = () => {
  const { user, logout, isTechnician } = useAuth();
  const navigate = useNavigate();
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobNotes, setJobNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Redirect if not technician
  useEffect(() => {
    if (!isTechnician) {
      navigate('/technician/login');
    }
  }, [isTechnician, navigate]);

  // Load assigned jobs
  useEffect(() => {
    if (user?.technicianId) {
      loadAssignedJobs();
    }
  }, [user?.technicianId]);

  // Filter jobs based on search and status
  useEffect(() => {
    let filtered = jobs;

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(job => {
        const jobNumber = (job as any).job_number || '';
        const customerName = (job.customer as any)?.full_name || '';
        const customerPhone = job.customer?.phone || '';
        const brand = job.brand || '';
        const model = job.model || '';
        const description = job.description || '';
        
        return (
          jobNumber.toLowerCase().includes(searchLower) ||
          customerName.toLowerCase().includes(searchLower) ||
          customerPhone.includes(searchTerm) ||
          brand.toLowerCase().includes(searchLower) ||
          model.toLowerCase().includes(searchLower) ||
          description.toLowerCase().includes(searchLower)
        );
      });
    }

    // Filter by status
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(job => job.status === statusFilter);
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, statusFilter]);

  const loadAssignedJobs = async () => {
    if (!user?.technicianId) return;

    try {
      setLoading(true);
      const { data, error } = await db.jobs.getByTechnicianId(user.technicianId);
      
      if (error) {
        throw new Error(error.message);
      }

      setJobs(data || []);
    } catch (error) {
      console.error('Error loading assigned jobs:', error);
      toast.error('Failed to load assigned jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (jobId: string, newStatus: string) => {
    try {
      setIsUpdating(true);
      
      const { error } = await db.jobs.update(jobId, { 
        status: newStatus as any,
        ...(newStatus === 'IN_PROGRESS' && { start_time: new Date().toISOString() }),
        ...(newStatus === 'COMPLETED' && { 
          end_time: new Date().toISOString()
        })
      });

      if (error) {
        throw new Error(error.message);
      }

      // Update local state
      setJobs(prev => prev.map(job => 
        job.id === jobId 
          ? { 
              ...job, 
              status: newStatus as any,
              ...(newStatus === 'IN_PROGRESS' && { start_time: new Date().toISOString() }),
              ...(newStatus === 'COMPLETED' && { 
                end_time: new Date().toISOString()
              })
            }
          : job
      ));

      toast.success(`Job status updated to ${newStatus}`);

      // Send notification for job completion
      if (newStatus === 'COMPLETED') {
        const job = jobs.find(j => j.id === jobId);
        if (job) {
          const customer = job.customer as any;
          const notification = createJobCompletedNotification(
            (job as any).job_number,
            customer?.full_name || 'Customer',
            user?.fullName || 'Technician',
            jobId
          );
          await sendNotification(notification);
        }
      }
    } catch (error) {
      console.error('Error updating job status:', error);
      toast.error('Failed to update job status');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      ASSIGNED: { color: 'bg-blue-100 text-blue-800', icon: Wrench },
      IN_PROGRESS: { color: 'bg-orange-100 text-orange-800', icon: Play },
      COMPLETED: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      CANCELLED: { color: 'bg-red-100 text-red-800', icon: AlertCircle },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} border-0`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const getStatusActions = (job: Job) => {
    switch (job.status) {
      case 'ASSIGNED':
        return (
          <Button
            size="sm"
            onClick={() => handleStatusUpdate(job.id, 'IN_PROGRESS')}
            disabled={isUpdating}
            className="bg-orange-600 hover:bg-orange-700 w-full sm:w-auto"
          >
            <Play className="w-4 h-4 mr-1" />
            Start Job
          </Button>
        );
      case 'IN_PROGRESS':
        return (
          <Button
            size="sm"
            onClick={() => handleStatusUpdate(job.id, 'COMPLETED')}
            disabled={isUpdating}
            className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Complete Job
          </Button>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your assigned jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 sm:py-0 sm:h-16">
            <div className="flex items-center mb-4 sm:mb-0">
              <Wrench className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Technician Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome, {user?.fullName || user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/')}
              >
                <User className="w-4 h-4 mr-2" />
                Home
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Assigned</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {jobs.filter(job => job.status === 'ASSIGNED').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Play className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {jobs.filter(job => job.status === 'IN_PROGRESS').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {jobs.filter(job => job.status === 'COMPLETED').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Wrench className="h-8 w-8 text-gray-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search jobs by job number, customer name, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Status</SelectItem>
                    <SelectItem value="ASSIGNED">Assigned</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Wrench className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== 'ALL' 
                    ? 'No jobs match your current filters.' 
                    : 'You have no assigned jobs at the moment.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-lg text-gray-900">
                            {(job as any).job_number}
                          </span>
                          {getStatusBadge(job.status)}
                        </div>
                        <span className="text-sm text-gray-600">
                          {(job as any).service_type || job.serviceType} - {(job as any).service_sub_type || job.serviceSubType}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                        <div>
                          <div className="font-medium text-gray-700">Customer</div>
                          <div className="flex items-center gap-2">
                            <span>{(job.customer as any)?.full_name}</span>
                            <a 
                              href={`tel:${job.customer?.phone}`}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Phone className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                        
                        <div>
                          <div className="font-medium text-gray-700">Scheduled</div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date((job as any).scheduled_date || job.scheduledDate).toLocaleDateString()} - {(job as any).scheduled_time_slot || job.scheduledTimeSlot}
                          </div>
                        </div>
                        
                        <div>
                          <div className="font-medium text-gray-700">Equipment</div>
                          <div>{job.brand} - {job.model}</div>
                        </div>
                        
                        <div>
                          <div className="font-medium text-gray-700">Location</div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {(job.serviceAddress as any)?.address || 'Address not available'}
                          </div>
                        </div>
                        
                        {job.description && (
                          <div className="md:col-span-2 lg:col-span-1">
                            <div className="font-medium text-gray-700">Description</div>
                            <div className="truncate">{job.description}</div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:ml-4">
                      {getStatusActions(job)}
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="w-full sm:w-auto">
                            <Eye className="w-4 h-4 mr-1" />
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Job Details - {(job as any).job_number}</DialogTitle>
                            <DialogDescription>
                              Complete information for this service job
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-gray-700">Customer Name</label>
                                <p className="text-sm text-gray-900">{(job.customer as any)?.full_name}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700">Phone</label>
                                <p className="text-sm text-gray-900">{job.customer?.phone}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <p className="text-sm text-gray-900">{job.customer?.email}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700">Status</label>
                                <div className="mt-1">{getStatusBadge(job.status)}</div>
                              </div>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium text-gray-700">Service Address</label>
                              <p className="text-sm text-gray-900">
                                {(job.serviceAddress as any)?.address || 'Address not available'}
                              </p>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium text-gray-700">Description</label>
                              <p className="text-sm text-gray-900">{job.description}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnicianDashboard;
