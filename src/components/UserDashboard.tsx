import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Upload, File, X, CheckCircle, Clock, AlertCircle, LogOut, User, History, Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface UserDashboardProps {
  user: any;
  onSignOut: () => void;
  onCreateNew: () => void;
}

interface Message {
  id: string;
  flight_number: string | null;
  flight_date: string | null;
  recipients: any;
  upgrade_selected: boolean;
  amount_paid: number;
  status: 'active' | 'completed' | 'refunded';
  created_at: string;
  boarding_passes?: BoardingPass[];
}

interface BoardingPass {
  id: string;
  file_path: string;
  file_name: string;
  uploaded_at: string;
}

export default function UserDashboard({ user, onSignOut, onCreateNew }: UserDashboardProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingFiles, setUploadingFiles] = useState<{ [key: string]: boolean }>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          boarding_passes (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading messages",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (messageId: string, file: File) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image (JPEG, PNG) or PDF file",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    setUploadingFiles(prev => ({ ...prev, [messageId]: true }));

    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${messageId}-${Date.now()}.${fileExt}`;
      const filePath = `boarding-passes/${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('boarding-passes')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Save file info to database
      const { error: dbError } = await supabase
        .from('boarding_passes')
        .insert({
          user_id: user.id,
          message_id: messageId,
          file_path: filePath,
          file_name: file.name
        });

      if (dbError) throw dbError;

      toast({
        title: "Boarding pass uploaded",
        description: "Your boarding pass has been uploaded successfully"
      });

      // Refresh messages to show new boarding pass
      fetchMessages();
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUploadingFiles(prev => ({ ...prev, [messageId]: false }));
    }
  };

  const removeBoardingPass = async (boardingPassId: string, filePath: string) => {
    try {
      // Delete from storage
      await supabase.storage
        .from('boarding-passes')
        .remove([filePath]);

      // Delete from database
      const { error } = await supabase
        .from('boarding_passes')
        .delete()
        .eq('id', boardingPassId);

      if (error) throw error;

      toast({
        title: "Boarding pass removed",
        description: "The boarding pass has been removed successfully"
      });

      fetchMessages();
    } catch (error: any) {
      toast({
        title: "Error removing file",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'active':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'refunded':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'refunded':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-gentle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-gentle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-trust-navy">
              Welcome back, {user.user_metadata?.full_name || user.email}
            </h1>
            <p className="text-muted-foreground">
              Manage your flight messages and boarding passes
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="comfort" onClick={onCreateNew}>
              <Plus className="w-4 h-4 mr-2" />
              New Message
            </Button>
            <Button variant="outline" onClick={onSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 shadow-card border-0">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <History className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-trust-navy">{messages.length}</p>
                <p className="text-sm text-muted-foreground">Total Messages</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 shadow-card border-0">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-trust-navy">
                  {messages.filter(m => m.status === 'completed').length}
                </p>
                <p className="text-sm text-muted-foreground">Safe Flights</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 shadow-card border-0">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-soft-purple rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-trust-navy">
                  {messages.reduce((acc, m) => acc + (m.recipients?.length || 0), 0)}
                </p>
                <p className="text-sm text-muted-foreground">People Protected</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Messages List */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-trust-navy">Your Flight Messages</h2>
          
          {messages.length === 0 ? (
            <Card className="p-12 shadow-card border-0 text-center">
              <div className="w-16 h-16 bg-gradient-gentle rounded-full flex items-center justify-center mx-auto mb-4">
                <History className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-trust-navy mb-2">No messages yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first flight message to get started
              </p>
              <Button variant="comfort" onClick={onCreateNew}>
                Create Your First Message
              </Button>
            </Card>
          ) : (
            messages.map((message) => (
              <Card key={message.id} className="p-6 shadow-card border-0">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-trust-navy">
                        {message.flight_number || 'Flight TBD'}
                      </h3>
                      <Badge className={`${getStatusColor(message.status)} border-0`}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(message.status)}
                          <span className="capitalize">{message.status}</span>
                        </div>
                      </Badge>
                      {message.upgrade_selected && (
                        <Badge className="bg-soft-purple/20 text-soft-purple border-0">
                          Premium
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {message.flight_date ? 
                        `Flight Date: ${new Date(message.flight_date).toLocaleDateString()}` : 
                        'Flight date not set'
                      }
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-trust-navy">₹{message.amount_paid}</p>
                    <p className="text-xs text-muted-foreground">
                      {message.recipients?.length || 0} recipients
                    </p>
                  </div>
                </div>

                {/* Recipients */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-trust-navy mb-2">Recipients:</h4>
                  <div className="flex flex-wrap gap-2">
                    {message.recipients?.map((recipient: any, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {recipient.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Boarding Pass Upload */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-trust-navy">Boarding Pass</h4>
                    {!uploadingFiles[message.id] && (
                      <Label htmlFor={`file-${message.id}`} className="cursor-pointer">
                        <div className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80">
                          <Upload className="w-4 h-4" />
                          <span>Upload</span>
                        </div>
                        <Input
                          id={`file-${message.id}`}
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(message.id, file);
                          }}
                        />
                      </Label>
                    )}
                  </div>

                  {uploadingFiles[message.id] && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span>Uploading...</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    {message.boarding_passes?.map((bp) => (
                      <div key={bp.id} className="flex items-center justify-between bg-comfort-cream/50 rounded-lg p-3">
                        <div className="flex items-center space-x-3">
                          <File className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-trust-navy">{bp.file_name}</p>
                            <p className="text-xs text-muted-foreground">
                              Uploaded {new Date(bp.uploaded_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBoardingPass(bp.id, bp.file_path)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {(!message.boarding_passes || message.boarding_passes.length === 0) && !uploadingFiles[message.id] && (
                      <p className="text-sm text-muted-foreground italic">
                        No boarding pass uploaded yet
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}