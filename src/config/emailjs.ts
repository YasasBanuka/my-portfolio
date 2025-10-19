// EmailJS Configuration
// Replace these values with your actual EmailJS credentials

export const EMAILJS_CONFIG = {
  // Your EmailJS Service ID (from Email Services page)
  SERVICE_ID: 'service_q4swjf7',
  
  // Your EmailJS Template ID (from Email Templates page)
  TEMPLATE_ID: 'template_k6e23sk',
  
  // Your EmailJS Public Key (from Account > General page)
  PUBLIC_KEY: '3RzlreaYbbLjWyiGR',
  
  // Your email address where contact form messages will be sent
  TO_EMAIL: 'ybanuka2003@gmail.com'
};

// Template parameters that will be sent to EmailJS
export const EMAILJS_TEMPLATE_PARAMS = {
  from_name: '',
  from_email: '',
  from_phone: '',
  message: '',
  to_email: EMAILJS_CONFIG.TO_EMAIL
};
