import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Heart, Plane, ArrowRight } from "lucide-react";
import safeLandingImage from "@/assets/safe-landing.jpg";

interface PostFlightStatusProps {
  onNext: () => void;
}

export default function PostFlightStatus({ onNext }: PostFlightStatusProps) {
  const flightInfo = {
    flightNumber: "AI 2031",
    route: "DEL → BOM",
    date: "March 15, 2024",
    time: "18:45"
  };

  return (
    <div className="min-h-screen bg-gradient-gentle">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Hero Image */}
          <div className="mb-8">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <img 
                src={safeLandingImage}
                alt="Safe Landing"
                className="w-full h-full object-cover rounded-full shadow-warm"
              />
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Main Message */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-trust-navy mb-4">
              Your Love Has Safely Landed
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Flight {flightInfo.flightNumber} completed successfully
            </p>
            <p className="text-muted-foreground">
              {flightInfo.route} • {flightInfo.date} • {flightInfo.time}
            </p>
          </div>

          {/* Flight Status Card */}
          <Card className="p-8 mb-8 shadow-card border-0 bg-white/90 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-gentle mr-4">
                <Plane className="w-8 h-8 text-white transform rotate-45" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-trust-navy">Flight Completed</h3>
                <p className="text-muted-foreground">Your journey ended safely</p>
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-green-600 mr-2" />
                <span className="text-green-800 font-semibold">Your messages remain safe with us</span>
              </div>
              <p className="text-green-700 text-sm">
                Since your flight completed without incident, your heartfelt messages 
                will continue to be stored securely and will not be sent to your loved ones.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-trust-navy mb-1">5</div>
                <div className="text-sm text-muted-foreground">People protected</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-trust-navy mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Messages secure</div>
              </div>
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="p-6 mb-8 shadow-card border-0">
            <h3 className="text-lg font-semibold text-trust-navy mb-4">What happens now?</h3>
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-trust-navy">Your messages remain private</p>
                  <p className="text-sm text-muted-foreground">They're stored securely and will only be sent in case of a future emergency</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-trust-navy">Continue flying with peace of mind</p>
                  <p className="text-sm text-muted-foreground">Your protection continues for all future flights</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-trust-navy">Update anytime</p>
                  <p className="text-sm text-muted-foreground">You can modify your messages or recipients whenever you want</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              variant="comfort"
              size="lg"
              onClick={onNext}
              className="text-lg px-12 py-4"
            >
              View Refund Options
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <div className="space-y-2">
              <Button variant="gentle" className="w-full">
                Update My Messages
              </Button>
              <Button variant="ghost" className="w-full text-muted-foreground">
                Flight History
              </Button>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="mt-12 p-6 bg-comfort-cream/50 rounded-2xl">
            <p className="text-trust-navy font-medium mb-2">Thank you for choosing our service</p>
            <p className="text-sm text-muted-foreground">
              We're honored to be part of your journey and grateful that you arrived safely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}