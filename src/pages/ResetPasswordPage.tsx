
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    
    try {
      const { error } = await resetPassword(email);
      
      if (!error) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error in reset password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <Link 
          to="/" 
          className="mx-auto mb-8 block text-center text-2xl font-bold bg-gradient-to-r from-fitvogue-purple to-fitvogue-teal bg-clip-text text-transparent"
        >
          FitVogue
        </Link>
        
        <div className="rounded-lg border bg-white shadow-sm p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Reset password</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Enter your email to receive a password reset link
            </p>
          </div>
          
          {success ? (
            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-md mb-4">
              <p>Password reset email sent! Check your inbox for instructions.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? "Sending..." : "Reset Password"}
              </Button>
            </form>
          )}
          
          <div className="mt-6 text-center text-sm">
            <p>
              Remember your password?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            <Link to="/" className="hover:underline">Back to homepage</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
