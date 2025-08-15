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

  const handleSignUp = async (email, password, fullName) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      });

      if (error) {
        if (error.message.includes("User already registered")) {
          setErrorMessage("User already registered with this email.");
          toast({ title: "User already registered", description: error.message, status: "error" });
          navigate('/signin'); // Redirect to sign in if the email already exists
        } else {
          toast({ title: "Sign Up Error", description: error.message, status: "error" });
        }
      }

      // If sign up is successful, redirect to sign in page
      toast({ title: "Sign Up Successful", description: "Please sign in to continue.", status: "success" });
      setFullName("");
      setEmail("");
      setPassword("");
      navigate('/signin'); // Redirect to sign in page
      return data;
    } catch (error) {
      console.error("Sign Up Error:", error);
      setErrorMessage(error.message);
      toast({ title: "Sign Up Error", description: error.message, status: "error" });
      return null;
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
            handleSignUp(email, password, fullName)
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
