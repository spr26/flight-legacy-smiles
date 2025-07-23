import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Plane, Shield, Users } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import heartIcon from "@/assets/heart-icon.png";

interface OnboardingScreenProps {
  onNext: () => void;
}

export default function OnboardingScreen({ onNext }: OnboardingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-gentle relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-gentle">
              <img src={heartIcon} alt="Heart" className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-trust-navy mb-4">
            Leave a Little Love Behind
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A gentle way to share your heart with those you care about, just in case your journey takes an unexpected turn.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-card border-0 bg-white/80 backdrop-blur-sm mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-trust-navy mb-4">
                How it works
              </h2>
              <p className="text-muted-foreground">
                Simple, respectful, and meaningful
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4 shadow-warm">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-trust-navy mb-2">Choose Your Circle</h3>
                <p className="text-sm text-muted-foreground">
                  Select up to 5 special people who mean the world to you
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-gentle">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-trust-navy mb-2">Craft Your Message</h3>
                <p className="text-sm text-muted-foreground">
                  Write heartfelt messages or choose meaningful gifts (₹5 each)
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-soft-purple rounded-full flex items-center justify-center mx-auto mb-4 shadow-gentle">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-trust-navy mb-2">Travel with Peace</h3>
                <p className="text-sm text-muted-foreground">
                  Your messages stay safely with us, sent only if needed
                </p>
              </div>
            </div>

            {/* Pricing Info */}
            <div className="bg-comfort-cream rounded-2xl p-6 mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Plane className="w-5 h-5 text-gentle-blue mr-2" />
                  <span className="text-sm font-medium text-trust-navy">Per Flight</span>
                </div>
                <div className="text-3xl font-bold text-trust-navy mb-2">₹5</div>
                <p className="text-sm text-muted-foreground">
                  Send love to up to 5 people • Complete peace of mind
                </p>
              </div>
            </div>
          </Card>

          {/* Call to Action */}
          <div className="text-center">
            <Button
              variant="comfort"
              size="lg"
              onClick={onNext}
              className="text-lg px-12 py-4 mb-4"
            >
              Start Your Journey
            </Button>
            <p className="text-sm text-muted-foreground">
              Takes less than 3 minutes • Your privacy is sacred to us
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}