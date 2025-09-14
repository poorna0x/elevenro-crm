import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookingRedirect: React.FC = () => {
  const navigate = useNavigate();

  const handleBookService = () => {
    navigate('/book');
  };

  return (
    <section id="booking" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Book RO Service in Bengaluru
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Schedule your RO water purifier service with our certified technicians across Bangalore, Karnataka
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                Ready to Book Your Service?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Quick Booking</h3>
                  <p className="text-sm text-muted-foreground">
                    Fill out our simple form and get instant confirmation
                  </p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Flexible Scheduling</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred date and time slot
                  </p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">All Areas Covered</h3>
                  <p className="text-sm text-muted-foreground">
                    We serve all areas of Bengaluru with professional service
                  </p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-6 mb-6">
                <p className="text-sm text-muted-foreground mb-4">
                  <strong>Note:</strong> We won't ask you to create an account. Email is only for sending confirmation and service updates.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>*</strong> means compulsory fields. Other fields you can skip, but we recommend providing all information for faster service.
                </p>
              </div>

              <Button 
                onClick={handleBookService}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold"
              >
                Book Service Now
              </Button>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Need help choosing the right service? Call us for free consultation
            </p>
            <Button 
              variant="outline"
              onClick={() => window.open('tel:+918884944288', '_self')}
              className="flex items-center gap-2 mx-auto"
            >
              <Phone className="w-4 h-4" />
              Call: +91-8884944288
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingRedirect;
