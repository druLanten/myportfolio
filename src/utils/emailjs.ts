import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("YOUR_PUBLIC_KEY");

export const sendEmail = async (data: any) => {
  try {
    const response = await emailjs.send(
      "YOUR_SERVICE_ID", // Email JS service ID
      "YOUR_TEMPLATE_ID", // Email JS template ID
      {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
