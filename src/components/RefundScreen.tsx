import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, RefreshCw, Calendar, Shield, CheckCircle, Clock } from "lucide-react";

interface RefundScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function RefundScreen({ onNext, onBack }: RefundScreenProps) {
  const [autoRefundEnabled, setAutoRefundEnabled] = useState(true);

  const flightInfo = {
    flightNumber: "AI 2031",
    amount: "₹104",
    date: "March 15, 2024"
  };

  return (
    <div className="min-h-screen bg-gradient-gentle">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-gentle">
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-trust-navy mb-2">
                Refund Options
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Choose how you'd like to handle refunds for your safe flights
              </p>
            </div>
          </div>

          {/* Flight Summary */}
          <Card className="p-6 mb-6 shadow-card border-0 bg-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-trust-navy">Recent Flight</h3>
                <p className="text-sm text-muted-foreground">Flight {flightInfo.flightNumber} • {flightInfo.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-green-700 font-medium">Completed Safely</span>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-green-800 font-medium mb-1">Payment: {flightInfo.amount}</p>
              <p className="text-green-700 text-sm">Eligible for 30-day refund policy</p>
            </div>
          </Card>

          {/* Auto-Refund Option */}
          <Card className="p-6 mb-6 shadow-card border-2 border-gentle-blue/20">
            <div className="flex items-start space-x-4">
              <Checkbox
                id="auto-refund"
                checked={autoRefundEnabled}
                onCheckedChange={(checked) => setAutoRefundEnabled(checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="auto-refund" className="text-lg font-semibold text-trust-navy cursor-pointer flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-gentle-blue" />
                  30-Day Auto-Refund Protection
                </Label>
                <p className="text-muted-foreground mt-2 mb-4">
                  Get your money back automatically if no flight incident occurs within 30 days. 
                  This gives you complete financial peace of mind.
                </p>
                
                {autoRefundEnabled && (
                  <div className="bg-gentle-blue/10 rounded-lg p-4 mt-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Calendar className="w-5 h-5 text-gentle-blue" />
                      <div>
                        <p className="font-medium text-trust-navy">Refund Schedule</p>
                        <p className="text-sm text-muted-foreground">April 14, 2024 (30 days after flight)</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-gentle-blue" />
                      <div>
                        <p className="font-medium text-trust-navy">Processing Time</p>
                        <p className="text-sm text-muted-foreground">3-5 business days after refund date</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* How it Works */}
          <Card className="p-6 mb-6 shadow-card border-0">
            <h3 className="text-lg font-semibold text-trust-navy mb-4">How the 30-Day Refund Works</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gentle-blue/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-gentle-blue font-semibold text-sm">1</span>
                </div>
                <div>
                  <p className="font-medium text-trust-navy">Flight Monitoring</p>
                  <p className="text-sm text-muted-foreground">We monitor all flights for 30 days after completion</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gentle-blue/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-gentle-blue font-semibold text-sm">2</span>
                </div>
                <div>
                  <p className="font-medium text-trust-navy">Automatic Processing</p>
                  <p className="text-sm text-muted-foreground">If no incidents occur, refund is automatically initiated</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gentle-blue/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-gentle-blue font-semibold text-sm">3</span>
                </div>
                <div>
                  <p className="font-medium text-trust-navy">Money Back</p>
                  <p className="text-sm text-muted-foreground">Full refund credited to your original payment method</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Alternative Options */}
          {!autoRefundEnabled && (
            <Card className="p-6 mb-6 shadow-card border-0 bg-comfort-cream/30">
              <h3 className="text-lg font-semibold text-trust-navy mb-4">Manual Refund Request</h3>
              <p className="text-muted-foreground mb-4">
                You can request a refund manually at any time within 30 days of your flight.
              </p>
              <Button variant="gentle" className="w-full">
                Request Refund Now
              </Button>
            </Card>
          )}

          {/* Continue Button */}
          <div className="text-center">
            <Button
              variant="comfort"
              size="lg"
              onClick={onNext}
              className="text-lg px-12 py-4 mb-4"
            >
              {autoRefundEnabled ? 'Enable Auto-Refund' : 'Continue Without Auto-Refund'}
            </Button>
            <p className="text-sm text-muted-foreground">
              You can change these settings anytime in your account
            </p>
          </div>

          {/* Trust Message */}
          <div className="mt-8 text-center p-6 bg-comfort-cream/50 rounded-2xl">
            <p className="text-trust-navy font-medium mb-2">Our Promise</p>
            <p className="text-sm text-muted-foreground">
              We believe in complete transparency and your right to get your money back 
              when our service isn't needed. Your trust means everything to us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}