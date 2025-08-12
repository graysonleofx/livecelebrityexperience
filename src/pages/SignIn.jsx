import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import supabase from "@/lib/supabaseClient"; // Ensure you have the Supabase client set up
import { useState, useEffect } from "react";
import {useToast} from "@/hooks/use-toast"; // Custom hook for toast notifications

const SignIn = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);

  // Create a sign-IN a system with Supabase
  // When a user signs in, get full name and email from Supabase
  // Redirect user to the home page after successful sign in
  // On home page, show user's email instead of login/signup buttons

  const handleSignIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (data?.user) {
      // User signed in successfully
      setUser(data.user);
      toast({ title: "Sign in successful!", description: "Welcome back!", status: "success" });
      navigate('/'); // Redirect to dashboard or home page after successful sign in
    } else {
      // Handle errors
      const errorMsg = error?.message || "Unknown error occurred";
      console.error("Error signing in:", errorMsg);
      setErrorMessage(errorMsg);
      toast({ title: "Sign in failed", description: errorMsg, status: "error" });
      if (error.message.includes("User not found")) {
        setErrorMessage("User not found. Please sign up.");
        navigate('/signup'); // Redirect to sign up if the user does not exist
      } else if (error.message.includes("Invalid login credentials")) {
        setErrorMessage("Invalid login credentials. Please try again.");
        navigate('/signin'); // Redirect to sign in if the user does not exist
      } 
    }
  };

  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <SEO title="Sign In — Celebrity Experience" />
      <Card>
        <CardHeader><CardTitle>Sign In</CardTitle></CardHeader>
        <CardContent>
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSignIn(email, password);
            }}
          >
            <div className="grid gap-2"><Label>Email</Label><Input value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <div className="grid gap-2"><Label>Password</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
            <Button type="submit">Continue</Button>
            <div className="text-sm text-muted-foreground">
              <Link to="#" className="story-link">Forgot password?</Link>
            </div>
            <div className="text-sm">No account? <Link to="/signup" className="story-link">Sign up</Link></div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
