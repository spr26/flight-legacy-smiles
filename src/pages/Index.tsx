import { useState } from "react";
import { Button } from "@/components/ui/button";
import OnboardingScreen from "@/components/OnboardingScreen";
import RecipientSelection from "@/components/RecipientSelection";
import UpgradeScreen from "@/components/UpgradeScreen";
import PostFlightStatus from "@/components/PostFlightStatus";
import RefundScreen from "@/components/RefundScreen";
import FAQScreen from "@/components/FAQScreen";
import { HelpCircle } from "lucide-react";

type Screen = 'onboarding' | 'recipients' | 'upgrade' | 'status' | 'refund' | 'faq';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');

  const goToNext = () => {
    switch (currentScreen) {
      case 'onboarding':
        setCurrentScreen('recipients');
        break;
      case 'recipients':
        setCurrentScreen('upgrade');
        break;
      case 'upgrade':
        setCurrentScreen('status');
        break;
      case 'status':
        setCurrentScreen('refund');
        break;
      case 'refund':
        setCurrentScreen('onboarding');
        break;
      default:
        setCurrentScreen('onboarding');
    }
  };

  const goBack = () => {
    switch (currentScreen) {
      case 'recipients':
        setCurrentScreen('onboarding');
        break;
      case 'upgrade':
        setCurrentScreen('recipients');
        break;
      case 'status':
        setCurrentScreen('upgrade');
        break;
      case 'refund':
        setCurrentScreen('status');
        break;
      case 'faq':
        setCurrentScreen('onboarding');
        break;
      default:
        setCurrentScreen('onboarding');
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen onNext={goToNext} />;
      case 'recipients':
        return <RecipientSelection onNext={goToNext} onBack={goBack} />;
      case 'upgrade':
        return <UpgradeScreen onNext={goToNext} onBack={goBack} />;
      case 'status':
        return <PostFlightStatus onNext={goToNext} />;
      case 'refund':
        return <RefundScreen onNext={goToNext} onBack={goBack} />;
      case 'faq':
        return <FAQScreen onBack={goBack} />;
      default:
        return <OnboardingScreen onNext={goToNext} />;
    }
  };

  return (
    <div className="relative">
      {/* FAQ Button - Always visible */}
      {currentScreen !== 'faq' && (
        <Button
          variant="gentle"
          size="sm"
          onClick={() => setCurrentScreen('faq')}
          className="fixed top-4 right-4 z-50 shadow-card"
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          FAQ
        </Button>
      )}
      
      {renderScreen()}
    </div>
  );
};

export default Index;
