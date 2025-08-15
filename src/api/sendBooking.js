// import { Resend } from "resend";

// const resend = new Resend({ apiKey: process.env.RESEND_API_KEY });

// export default async function handler(req, res){
//   if(req.method !== 'POST') {
//       return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const bookingDetails = req.body;
//   // const { name, email, bookingType, concept, paymentMethod } = req.body;

//   try {
//       const response = await resend.emails.send({
//           from: "Celebrity Booking <info@livecelebrityexperience.online>",
//           to: 'leograyson1969@gmail.com',
//           subject: "New Celebrity Booking Request",
//           html: `
//           <div style="font-family: Arial, sans-serif; color: #333;">
//             <h1>New Booking Request</h1>
//             <p> <strong>New booking request from ${bookingDetails.name}</strong></p>
//             <p> <strong>Email:</strong> ${bookingDetails.email}</p>
//             <p><strong>Booking Type:</strong> ${bookingDetails.bookingType}</p>
//             <p><strong>Concert:</strong> ${bookingDetails.concept}</p>
//             <p><strong>Payment Method:</strong> ${bookingDetails.paymentMethod}</p>
//           </div>
//           `,
//       });
//     return res.status(200).json({ success: true, response });
//   } catch (error) {
//       console.error("Error sending booking email:", error);
//       return res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

// // export const sendBookingEmail = async (bookingDetails) => {
// //   try {
// //     const response = await resend.emails.send({
// //       from: "your-email@example.com",
// //       to: bookingDetails.email,
// //       subject: "Booking Confirmation",
// //       html: `<p>Your booking is confirmed!</p>`,
// //     });
// //     return response;
// //   } catch (error) {
// //     console.error("Error sending booking email:", error);
// //     throw error;
// //   }
// // };