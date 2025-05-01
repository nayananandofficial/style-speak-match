
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ResetPasswordPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("If your email is registered, you'll receive instructions to reset your password.");
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
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            
            <Button type="submit" className="w-full">Reset Password</Button>
          </form>
          
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
