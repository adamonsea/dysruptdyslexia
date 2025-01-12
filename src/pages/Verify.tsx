import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Verify = () => {
  const [verifying, setVerifying] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleVerification = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (session) {
          toast.success("Email verified successfully!");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          toast.error("Verification failed. Please try signing up again.");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } catch (error) {
        console.error("Verification error:", error);
        toast.error("An error occurred during verification");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } finally {
        setVerifying(false);
      }
    };

    handleVerification();
  }, [navigate]);

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