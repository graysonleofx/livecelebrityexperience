// Create a Booking Confirmation page that displays the booking details and a confirmation message to the user keep Design in mind .
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BookingConfirm = () => {
  const location = useLocation();
  const { celeb, bookingData } = location.state || {};
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-10 bg-card rounded-lg shadow-lg max-w-md h-auto text-card-foreground text-center">
      <SEO title="Booking Confirmation" description="Your booking has been confirmed." />
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h1 className="text-3xl font-bold mb-6">Booking Under Review</h1>
      <p className="mb-2">Your booking is currently being reviewed, please check your email later for updates.</p>
      <p className="mb-2">Here are the details of your booking:</p>
  
      {/* make well centered aligned */}
      <div className="max-w-md mx-auto bg-background p-6 rounded-lg">
        <div className="grid gap-4 mb-6">
          <div className="grid gap-2">
            <Label><strong className="text-lg">Celeb Name:</strong> </Label>
            <div className="">{celeb?.name || "N/A"}</div>
          </div>
          <div className="grid gap-2">
            <Label className=""><strong className="text-lg">Booking Type:</strong> </Label>
            <div className="">{bookingData.bookingType || "N/A"}</div>
          </div>
          <div className="grid gap-2">
            <Label className=""><strong className="text-lg">Booking Date:</strong> </Label>
            <div className="">{bookingData.date || "N/A"}</div>
          </div>
          <div className="grid gap-2">
            <Label className=""><strong className="text-lg">Payment Method:</strong> </Label>
            <div className="">{bookingData.method || "N/A"}</div>
          </div>
        </div>
      </div>
      <p className="text-lg mb-4">Thank you for your booking!</p>
      <Button variant="hero" className="mt-6" onClick={() => navigate("/")}>Go to Dashboard</Button>
    </div>
  );
};

export default BookingConfirm;