import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import OnboardingScreen from "@/components/OnboardingScreen";
import RecipientSelection from "@/components/RecipientSelection";
import UpgradeScreen from "@/components/UpgradeScreen";
import PostFlightStatus from "@/components/PostFlightStatus";
import RefundScreen from "@/components/RefundScreen";
import FAQScreen from "@/components/FAQScreen";
import AuthScreen from "@/components/AuthScreen";
import UserDashboard from "@/components/UserDashboard";
import AuthenticatedRecipientSelection from "@/components/AuthenticatedRecipientSelection";
import { HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Screen = 'onboarding' | 'auth' | 'dashboard' | 'recipients' | 'upgrade' | 'status' | 'refund' | 'faq' | 'authenticated-recipients';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentMessageData, setCurrentMessageData] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        setCurrentScreen('dashboard');
      }
      setLoading(false);
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        setCurrentScreen('dashboard');
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setCurrentScreen('onboarding');
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

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
      case 'authenticated-recipients':
        setCurrentScreen('upgrade');
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
        setCurrentScreen(user ? 'authenticated-recipients' : 'recipients');
        break;
      case 'status':
        setCurrentScreen('upgrade');
        break;
      case 'refund':
        setCurrentScreen('status');
        break;
      case 'faq':
        setCurrentScreen(user ? 'dashboard' : 'onboarding');
        break;
      case 'auth':
        setCurrentScreen('onboarding');
        break;
      case 'authenticated-recipients':
        setCurrentScreen('dashboard');
        break;
      default:
        setCurrentScreen(user ? 'dashboard' : 'onboarding');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentScreen('onboarding');
    toast({
      title: "Signed out",
      description: "You have been signed out successfully"
    });
  };

  const handleCreateNew = () => {
    setCurrentScreen('authenticated-recipients');
  };

  const handleAuthSuccess = () => {
    // User will be set via the auth state change listener
    toast({
      title: "Welcome!",
      description: "You're now signed in to your account"
    });
  };

  const handleRecipientsNext = async (recipients: any[], flightInfo: any) => {
    // Save message data temporarily
    setCurrentMessageData({ recipients, flightInfo });
    setCurrentScreen('upgrade');
  };

  const saveMessageToDatabase = async (upgradeData: any) => {
    if (!user || !currentMessageData) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          user_id: user.id,
          flight_number: currentMessageData.flightInfo.flightNumber,
          flight_date: currentMessageData.flightInfo.flightDate,
          recipients: currentMessageData.recipients,
          upgrade_selected: upgradeData.upgrade || false,
          amount_paid: upgradeData.amount || 5,
          status: 'active'
        });

      if (error) throw error;

      toast({
        title: "Message saved!",
        description: "Your flight message has been saved successfully"
      });

      // Clear temporary data and go to dashboard
      setCurrentMessageData(null);
      setCurrentScreen('dashboard');
    } catch (error: any) {
      toast({
        title: "Error saving message",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const renderScreen = () => {
    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-gentle flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      );
    }

    switch (currentScreen) {
      case 'onboarding':
        return (
          <OnboardingScreen 
            onNext={() => user ? setCurrentScreen('dashboard') : goToNext()} 
          />
        );
      case 'auth':
        return <AuthScreen onSuccess={handleAuthSuccess} onBack={goBack} />;
      case 'dashboard':
        return user ? (
          <UserDashboard 
            user={user} 
            onSignOut={handleSignOut} 
            onCreateNew={handleCreateNew}
          />
        ) : (
          <OnboardingScreen onNext={goToNext} />
        );
      case 'recipients':
        return <RecipientSelection onNext={goToNext} onBack={goBack} />;
      case 'authenticated-recipients':
        return user ? (
          <AuthenticatedRecipientSelection 
            user={user}
            onNext={handleRecipientsNext}
            onBack={goBack}
          />
        ) : (
          <AuthScreen onSuccess={handleAuthSuccess} onBack={goBack} />
        );
      case 'upgrade':
        return (
          <UpgradeScreen 
            onNext={(upgradeData) => {
              if (user && currentMessageData) {
                saveMessageToDatabase(upgradeData);
              } else {
                goToNext();
              }
            }} 
            onBack={goBack} 
          />
        );
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

  const showAuthButton = !user && !['auth', 'faq'].includes(currentScreen);
  const showFAQButton = currentScreen !== 'faq';

  return (
    <div className="relative">
      {/* Action Buttons - Always visible */}
      <div className="fixed top-4 right-4 z-50 flex space-x-2">
        {showFAQButton && (
          <Button
            variant="gentle"
            size="sm"
            onClick={() => setCurrentScreen('faq')}
            className="shadow-card"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ
          </Button>
        )}
        {showAuthButton && (
          <Button
            variant="comfort"
            size="sm"
            onClick={() => setCurrentScreen('auth')}
            className="shadow-card"
          >
            Sign In
          </Button>
        )}
      </div>
      
      {renderScreen()}
    </div>
  );
};

export default Index;
