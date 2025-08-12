import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import supabase from "@/lib/supabaseClient"; // Ensure you have the Supabase client set up
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast"; // Custom hook for toast notifications 


const SignUp = () => {
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [ user, setUser ] = useState(null);

  // Create a sign-up and sign-in system with Supabase
  // When a user signs up, save full name and email to Supabase
  // Redirect user to the login page after successful registration
  // When user signs in successfully, redirect to the home page
  // On home page, show user's email instead of login/signup buttons
  // Save user info to Supabase database (not just auth)
  // Use useState and useEffect to manage user session

  useEffect(() => {
    const fetchSession = async () => {
      const {data: { session }, error } = await supabase.auth.getSession();
      if (session) {
        // User is signed in
        setUser(session.user);
      }
    };
    fetchSession();
  }, []);

  const handleSignUp = async (email, password) => {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (user) {
      // User signed up successfully
      toast({ title: "Sign up successful!", description: "Please check your email for confirmation.", status: "success" });
      // Redirect to sign in page after successful sign up
      navigate('/signin');
      // Save user info to Supabase database
      const { error: dbError } = await supabase.from('users').insert([{ full_name: fullName, email, password }]);
      if (dbError) {
        console.error("Error saving user info:", dbError);
        setErrorMessage(dbError.message);
        toast({ title: "Error saving user info", description: dbError.message, status: "error" });
        return;
      }

    }
    // Handle errors
    if (error) {
      console.error("Error signing up:", error);
      if (error.message.includes("User already registered")) {
        toast({ title: "User already registered", description: "Sign in instead.", status: "error" });
        setErrorMessage("User already registered. Sign in instead.");
        navigate('/signin'); // Redirect to sign in if the email already exists
        return;
      } else if (error.message.includes("Invalid sign up credentials")) {
        toast({ title: "Invalid sign up credentials", description: error.message, status: "error" });
        setErrorMessage("Invalid sign up credentials.");
        e.target.email.focus(); // Focus on the email input field
        navigate('/signup'); // Redirect to sign up if there's an error
        return;
      }
      toast({ title: "Error signing up", description: error.message, status: "error" });
      e.target.email.focus(); // Focus on the email input field
      navigate('/signup'); // Redirect to sign up if there's an error
    }
  };

  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <SEO title="Sign Up — Celebrity Experience" />
      <Card>
        <CardHeader><CardTitle>Create your account</CardTitle></CardHeader>
        <CardContent>
          <form
            className="grid gap-4"
            onSubmit={(e)=>{e.preventDefault(); 
            handleSignUp(email, password)
            .then(() => {
              if (errorMessage.includes("User already registered")) {
                toast({ title: "User already registered", description: errorMessage, status: "error" });
                e.target.email.focus();
                navigate('/signin'); // Redirect to sign in if the email already exists
              } else if (errorMessage.includes("Invalid sign up credentials")) {
                toast({ title: "Invalid sign up credentials", description: errorMessage, status: "error" });
                e.target.email.focus();
              } else {
                navigate('/signin'); // Redirect to sign in after successful sign up
              }
            });
          }}
          >
            <div className="grid gap-2"><Label>Full Name</Label><Input value={fullName} onChange={(e) => setFullName(e.target.value)} required /></div>
            <div className="grid gap-2"><Label>Email</Label><Input value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
            <div className="grid gap-2"><Label>Password</Label><Input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}  required /></div>
            <Button type="submit">Create account</Button>
            <div className="text-sm">Already have an account? <Link to="/signin" className="story-link">Sign in</Link></div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
