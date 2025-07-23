import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, HelpCircle, Shield, Heart, Plane, Clock, RefreshCw } from "lucide-react";

interface FAQScreenProps {
  onBack: () => void;
}

export default function FAQScreen({ onBack }: FAQScreenProps) {
  const faqs = [
    {
      id: "1",
      question: "How does this service work?",
      answer: "When you sign up, you create heartfelt messages for up to 5 people you care about. These messages are securely stored and are only sent if there's a verified flight emergency or incident. If your flight completes safely (which is almost always the case), your messages remain private and are never sent.",
      icon: <Plane className="w-5 h-5" />
    },
    {
      id: "2", 
      question: "What constitutes a 'flight emergency' or incident?",
      answer: "Messages are only sent in cases of verified fatal accidents or extreme emergencies where passengers cannot communicate themselves. We work with official aviation authorities and only act on confirmed incidents. This is an extremely rare occurrence - the vast majority of flights (99.99%+) complete safely.",
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: "3",
      question: "How much does it cost?",
      answer: "The basic service costs ₹5 per flight and covers messages to up to 5 people. You can optionally upgrade for ₹99 to include surprise gifts worth thousands of rupees, but this is completely optional. We also offer a 30-day refund policy if no incident occurs.",
      icon: <Heart className="w-5 h-5" />
    },
    {
      id: "4",
      question: "Is my personal information safe?",
      answer: "Absolutely. Your messages and personal information are encrypted and stored with bank-level security. They are never shared with anyone and are only accessed in the extremely rare case of a verified incident. We take your privacy very seriously.",
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: "5",
      question: "What happens if my flight is just delayed or has minor issues?",
      answer: "Messages are only sent in cases of fatal accidents or extreme emergencies. Flight delays, turbulence, mechanical issues that result in safe landings, or other non-fatal incidents do not trigger message delivery. Only verified fatal accidents result in message sending.",
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: "6",
      question: "Can I get my money back?",
      answer: "Yes! We offer a 30-day auto-refund policy. If no incident occurs within 30 days of your flight, you can get your money back automatically. This removes any financial worry and shows our confidence that you'll arrive safely.",
      icon: <RefreshCw className="w-5 h-5" />
    },
    {
      id: "7",
      question: "How do you verify flight incidents?",
      answer: "We work with official aviation authorities, news agencies, and airline communications to verify incidents. We never act on rumors or unconfirmed reports. Only officially confirmed fatal accidents or extreme emergencies trigger our service.",
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: "8",
      question: "What kind of gifts are included in the upgrade?",
      answer: "The premium upgrade includes surprise gifts worth ₹5,000-75,000 such as electronics (smartphones, tablets), meaningful jewelry, or experience vouchers. These are only delivered in case of verified incidents and are meant to provide additional comfort to your loved ones.",
      icon: <Heart className="w-5 h-5" />
    },
    {
      id: "9",
      question: "Can I update my messages or recipients?",
      answer: "Yes, you can update your messages, change recipients, or modify your account anytime through our app. Your messages stay current and relevant to your relationships.",
      icon: <Heart className="w-5 h-5" />
    },
    {
      id: "10",
      question: "What if I don't want the service anymore?",
      answer: "You can cancel anytime. If you haven't flown yet, you'll get a full refund. If you have the 30-day refund option enabled, you can get your money back for recent safe flights. There are no long-term commitments.",
      icon: <RefreshCw className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-gentle">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
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
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-trust-navy mb-2">
                Frequently Asked Questions
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Everything you need to know about our service
              </p>
            </div>
          </div>

          {/* FAQ Accordion */}
          <Card className="p-6 shadow-card border-0 mb-8">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq) => (
                <AccordionItem 
                  key={faq.id} 
                  value={faq.id}
                  className="border border-border/50 rounded-lg px-4"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gentle-blue/20 rounded-full flex items-center justify-center flex-shrink-0">
                        {faq.icon}
                      </div>
                      <span className="font-semibold text-trust-navy">
                        {faq.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-2 ml-11 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          {/* Contact Support */}
          <Card className="p-6 shadow-card border-0 text-center">
            <h3 className="text-lg font-semibold text-trust-navy mb-2">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-4">
              Our support team is here to help you with any concerns
            </p>
            <div className="space-y-3">
              <Button variant="comfort" className="w-full">
                Contact Support
              </Button>
              <Button variant="gentle" className="w-full">
                Email Us: support@leavealittlelove.com
              </Button>
            </div>
          </Card>

          {/* Trust Message */}
          <div className="mt-8 text-center p-6 bg-comfort-cream/50 rounded-2xl">
            <p className="text-trust-navy font-medium mb-2">Our Commitment</p>
            <p className="text-sm text-muted-foreground">
              We understand this service touches on sensitive topics. We're committed to handling 
              your trust with the utmost care, respect, and transparency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}