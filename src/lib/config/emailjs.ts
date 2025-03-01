// EmailJS configuration
export const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_gmail",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_contact",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY",
  toEmail: "my.abdullah.nauman@gmail.com"
};
