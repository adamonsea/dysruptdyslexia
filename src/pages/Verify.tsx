import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Verify = () => {
  const [verifying, setVerifying] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleVerification = async () => {
      try {
        // Get the hash portion of the URL (excluding the # symbol)
        const hash = location.hash.substring(1);
        
        // Parse the hash string into key-value pairs
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        const type = params.get('type');

        if (accessToken && type === 'signup') {
          // Set the session using the tokens
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken!
          });

          if (error) throw error;
          
          toast.success("Email verified successfully!");
        } else {
          // Check if user is already verified
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError) throw sessionError;
          
          if (session) {
            toast.success("Already verified!");
          } else {
            toast.error("Verification failed. Please try signing up again.");
          }
        }
      } catch (error) {
        console.error("Verification error:", error);
        toast.error("An error occurred during verification");
      } finally {
        setVerifying(false);
        // Redirect after a short delay
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    };

    handleVerification();
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        {verifying ? (
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Verifying your email...</h1>
            <p className="text-muted-foreground">Please wait while we verify your email address.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Redirecting...</h1>
            <p className="text-muted-foreground">You will be redirected to the homepage shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;