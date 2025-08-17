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
    if (!email || !password || !fullName) {
      toast({ title: "Error", description: "All fields are required", variant: "destructive" });
      return;
    }
    try {
      // console.log("Signing up user:", { email, password, fullName });
      // Sign up the user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { 
            full_name: fullName,
          },
        },
      });


      if (data?.user) {
        // User signed up successfully
        setUser(data.user);
        toast({ title: "Account created successfully!", variant: "success" });
        navigate("/signin");
      } else {
        setErrorMessage("Error signing up");
      }

      if (error) {
        if (error.message === "User already registered") {
          setErrorMessage("User already registered");
          toast({ title: "Error", description: "User already registered", variant: "destructive" });
        } else {
          setErrorMessage("Error signing up");
          toast({ title: "Error", description: "Error signing up", variant: "destructive" });
        }
      }

      // console.log("User signed up:", data.user);
      console.log("Error signing up:", error);
    } catch (error) {
      setErrorMessage("Error signing up");
      console.log("Signup Error", error);
      toast({ title: "Error", description: "Error signing up", variant: "destructive" });
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
            onSubmit={(e) => {
              e.preventDefault();
              handleSignUp(email, password, fullName);
              console.log(email, password, fullName);
            }}
          >
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            <Label htmlFor="email">Email</Label>
            <Input id="email"  value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button type="submit">Create account</Button>
            <div className="text-sm">Already have an account? <Link to="/signin" className="story-link">Sign in</Link></div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
