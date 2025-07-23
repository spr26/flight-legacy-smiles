import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Gift, Sparkles, Star, Check } from "lucide-react";

interface UpgradeScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function UpgradeScreen({ onNext, onBack }: UpgradeScreenProps) {
  const [wantsUpgrade, setWantsUpgrade] = useState(false);
  const [selectedGifts, setSelectedGifts] = useState<string[]>([]);

  const giftOptions = [
    {
      id: 'electronics',
      title: 'Premium Electronics',
      description: 'Surprise gifts worth ₹10,000-50,000',
      examples: ['Smartphone', 'Tablet', 'Smartwatch', 'Headphones'],
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      id: 'jewelry',
      title: 'Meaningful Jewelry',
      description: 'Symbolic pieces worth ₹5,000-25,000',
      examples: ['Pendant', 'Bracelet', 'Ring', 'Chain'],
      icon: <Star className="w-6 h-6" />
    },
    {
      id: 'experience',
      title: 'Experience Vouchers',
      description: 'Memorable experiences worth ₹15,000-75,000',
      examples: ['Travel voucher', 'Spa package', 'Fine dining', 'Concert tickets'],
      icon: <Gift className="w-6 h-6" />
    }
  ];

  const toggleGift = (giftId: string) => {
    setSelectedGifts(prev => 
      prev.includes(giftId) 
        ? prev.filter(id => id !== giftId)
        : [...prev, giftId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-gentle">
      <div className="container mx-auto px-4 py-8">
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
              <div className="w-12 h-12 bg-gradient-to-r from-soft-purple to-accent rounded-full flex items-center justify-center shadow-gentle">
                <Gift className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-trust-navy mb-2">
              Add a Touch of Magic
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Optional surprise gifts that bring extra joy to your loved ones
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Basic Plan Summary */}
          <Card className="p-6 mb-6 shadow-card border-0 bg-comfort-cream/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-trust-navy mb-1">Basic Plan</h3>
                <p className="text-sm text-muted-foreground">Heartfelt messages to your loved ones</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-trust-navy">₹5</div>
                <div className="text-xs text-muted-foreground">per flight</div>
              </div>
            </div>
          </Card>

          {/* Upgrade Option */}
          <Card className="p-6 mb-6 shadow-card border-2 border-soft-purple/20">
            <div className="flex items-start space-x-4 mb-4">
              <Checkbox
                id="upgrade"
                checked={wantsUpgrade}
                onCheckedChange={(checked) => setWantsUpgrade(checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="upgrade" className="text-lg font-semibold text-trust-navy cursor-pointer">
                  Premium Surprise Gifts
                </Label>
                <p className="text-muted-foreground mt-1">
                  Add meaningful surprise gifts that will be delivered only in case of a verified incident
                </p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-soft-purple">+₹99</div>
                <div className="text-xs text-muted-foreground">one-time</div>
              </div>
            </div>

            {wantsUpgrade && (
              <div className="mt-6 space-y-4">
                <p className="text-sm font-medium text-trust-navy mb-4">
                  Choose surprise gift categories (select any):
                </p>
                
                {giftOptions.map((gift) => (
                  <div
                    key={gift.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedGifts.includes(gift.id)
                        ? 'border-soft-purple bg-soft-purple/5'
                        : 'border-gray-200 hover:border-soft-purple/50'
                    }`}
                    onClick={() => toggleGift(gift.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${
                        selectedGifts.includes(gift.id) 
                          ? 'bg-soft-purple text-white' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {gift.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-trust-navy">{gift.title}</h4>
                          {selectedGifts.includes(gift.id) && (
                            <Check className="w-4 h-4 text-soft-purple" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{gift.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {gift.examples.map((example, index) => (
                            <span
                              key={index}
                              className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600"
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Total Summary */}
          <Card className="p-6 mb-6 shadow-card border-0 bg-white">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-trust-navy">Total</h3>
                <p className="text-sm text-muted-foreground">
                  {wantsUpgrade ? 'Basic plan + Premium gifts' : 'Basic plan only'}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-trust-navy">
                  ₹{wantsUpgrade ? '104' : '5'}
                </div>
                <div className="text-xs text-muted-foreground">
                  {wantsUpgrade ? 'one-time payment' : 'per flight'}
                </div>
              </div>
            </div>
          </Card>

          {/* Continue Button */}
          <div className="text-center">
            <Button
              variant={wantsUpgrade ? "upgrade" : "comfort"}
              size="lg"
              onClick={onNext}
              className="text-lg px-12 py-4 mb-4"
            >
              {wantsUpgrade ? 'Continue with Premium' : 'Continue with Basic'}
            </Button>
            <p className="text-sm text-muted-foreground">
              All gifts are delivered only in case of verified incidents • Full refund available
            </p>
          </div>
        </div>

        {/* Skip Option */}
        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={onNext}
            className="text-muted-foreground"
          >
            Skip upgrade and continue with basic plan
          </Button>
        </div>
      </div>
    </div>
  );
}