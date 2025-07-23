import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, Heart, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface Recipient {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface AuthenticatedRecipientSelectionProps {
  user: any;
  onNext: (recipients: Recipient[], flightInfo: any) => void;
  onBack: () => void;
}

export default function AuthenticatedRecipientSelection({ 
  user, 
  onNext, 
  onBack 
}: AuthenticatedRecipientSelectionProps) {
  const [recipients, setRecipients] = useState<Recipient[]>([
    { id: '1', name: '', email: '', phone: '', message: '' }
  ]);
  const [flightInfo, setFlightInfo] = useState({
    flightNumber: '',
    flightDate: '',
    route: ''
  });
  const { toast } = useToast();

  const addRecipient = () => {
    if (recipients.length < 5) {
      setRecipients([...recipients, {
        id: Date.now().toString(),
        name: '',
        email: '',
        phone: '',
        message: ''
      }]);
    }
  };

  const removeRecipient = (id: string) => {
    if (recipients.length > 1) {
      setRecipients(recipients.filter(r => r.id !== id));
    }
  };

  const updateRecipient = (id: string, field: keyof Recipient, value: string) => {
    setRecipients(recipients.map(r => 
      r.id === id ? { ...r, [field]: value } : r
    ));
  };

  const updateFlightInfo = (field: string, value: string) => {
    setFlightInfo(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = recipients.every(r => r.name && r.message) && 
                     recipients.some(r => r.email || r.phone) &&
                     flightInfo.flightNumber;

  const handleNext = () => {
    if (isFormValid) {
      onNext(recipients, flightInfo);
    }
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
            Back to Dashboard
          </Button>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center shadow-warm">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-trust-navy mb-2">
              Create New Flight Message
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Set up your heartfelt messages for your upcoming flight
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Flight Information */}
          <Card className="p-6 mb-6 shadow-card border-0">
            <h3 className="text-lg font-semibold text-trust-navy mb-4">Flight Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="flight-number">Flight Number *</Label>
                <Input
                  id="flight-number"
                  value={flightInfo.flightNumber}
                  onChange={(e) => updateFlightInfo('flightNumber', e.target.value)}
                  placeholder="e.g., AI 2031"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="flight-date">Flight Date *</Label>
                <Input
                  id="flight-date"
                  type="date"
                  value={flightInfo.flightDate}
                  onChange={(e) => updateFlightInfo('flightDate', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="route">Route (Optional)</Label>
              <Input
                id="route"
                value={flightInfo.route}
                onChange={(e) => updateFlightInfo('route', e.target.value)}
                placeholder="e.g., DEL → BOM"
                className="mt-1"
              />
            </div>
          </Card>

          {/* Recipients */}
          {recipients.map((recipient, index) => (
            <Card key={recipient.id} className="p-6 mb-6 shadow-card border-0">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-trust-navy">
                  Person {index + 1}
                </h3>
                {recipients.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRecipient(recipient.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor={`name-${recipient.id}`}>Name *</Label>
                  <Input
                    id={`name-${recipient.id}`}
                    value={recipient.name}
                    onChange={(e) => updateRecipient(recipient.id, 'name', e.target.value)}
                    placeholder="Their full name"
                    className="mt-1"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`email-${recipient.id}`}>Email</Label>
                    <Input
                      id={`email-${recipient.id}`}
                      type="email"
                      value={recipient.email}
                      onChange={(e) => updateRecipient(recipient.id, 'email', e.target.value)}
                      placeholder="their@email.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`phone-${recipient.id}`}>Phone</Label>
                    <Input
                      id={`phone-${recipient.id}`}
                      type="tel"
                      value={recipient.phone}
                      onChange={(e) => updateRecipient(recipient.id, 'phone', e.target.value)}
                      placeholder="+91 98765 43210"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor={`message-${recipient.id}`}>Your Message *</Label>
                  <Textarea
                    id={`message-${recipient.id}`}
                    value={recipient.message}
                    onChange={(e) => updateRecipient(recipient.id, 'message', e.target.value)}
                    placeholder="Write something meaningful for them..."
                    className="mt-1 min-h-[100px]"
                    maxLength={500}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {recipient.message.length}/500 characters
                  </p>
                </div>
              </div>
            </Card>
          ))}

          {/* Add More Recipients */}
          {recipients.length < 5 && (
            <Card className="p-6 mb-6 border-2 border-dashed border-gentle-blue/30 bg-gentle-blue/5">
              <button
                onClick={addRecipient}
                className="w-full flex items-center justify-center text-gentle-blue hover:text-gentle-blue/80 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Another Person ({recipients.length}/5)
              </button>
            </Card>
          )}

          {/* Continue Button */}
          <div className="text-center">
            <Button
              variant="comfort"
              size="lg"
              onClick={handleNext}
              disabled={!isFormValid}
              className="text-lg px-12 py-4 mb-4"
            >
              Continue to Options
            </Button>
            <p className="text-sm text-muted-foreground">
              Your messages are encrypted and stored securely
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}