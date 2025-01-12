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
        console.log("Starting verification process");
        console.log("Current location:", location);
        
        // Get the hash portion of the URL (excluding the # symbol)
        const hash = location.hash.substring(1);
        console.log("Hash string:", hash);
        
        // Parse the hash string into key-value pairs
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        
        console.log("Tokens found:", { 
          accessToken: accessToken ? "present" : "missing", 
          refreshToken: refreshToken ? "present" : "missing" 
        });

        if (!accessToken || !refreshToken) {
          throw new Error("Verification tokens are missing");
        }

        // Set the session using the tokens
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          console.error("Session error:", error);
          throw error;
        }

        if (data.session) {
          console.log("Session established successfully");
          toast.success("Email verified successfully!");
        } else {
          throw new Error("Failed to establish session");
        }
      } catch (error) {
        console.error("Verification error:", error);
        toast.error("An error occurred during verification. Please try again.");
      } finally {
        setVerifying(false);
        // Redirect after a short delay
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    };

    // Only attempt verification if there's a hash in the URL
    if (location.hash) {
      handleVerification();
    } else {
      console.log("No verification hash found in URL");
      setVerifying(false);
      navigate("/");
    }
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