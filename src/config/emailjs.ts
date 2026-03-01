// EmailJS Configuration
// Values are loaded from environment variables (.env.local)
export const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
  TO_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL!,
};

// Template parameters that will be sent to EmailJS
export const EMAILJS_TEMPLATE_PARAMS = {
  from_name: '',
  from_email: '',
  from_phone: '',
  message: '',
  to_email: EMAILJS_CONFIG.TO_EMAIL
};
