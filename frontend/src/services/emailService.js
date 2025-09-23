// EmailJS Service Configuration
export const EMAIL_CONFIG = {
  SERVICE_ID: 'service_xxbj3sv',
  TEMPLATE_ID: 'template_l1wo2lg',
  PUBLIC_KEY: '61WpC-MTI2cvq-BE_'
};

// EmailJS Service Functions
export const emailService = {
  // Send contact form email
  sendContactForm: async (formData) => {
    try {
      // Check if EmailJS is loaded
      if (typeof window.emailjs === 'undefined') {
        throw new Error('EmailJS is not loaded. Please refresh the page and try again.');
      }

      // Prepare template parameters (updated to match your current template)
      const templateParams = {
        name: formData.name, // Changed from from_name to name
        title: formData.message, // Changed from message to title
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        to_name: 'Shyara Team',
        reply_to: formData.email,
      };

      // Send email using EmailJS
      const response = await window.emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAIL_CONFIG.PUBLIC_KEY
      );

      console.log('Email sent successfully:', response);
      return { success: true, message: 'Message sent successfully!' };
    } catch (error) {
      console.error('Email sending failed:', error);
      
      // Handle specific error cases
      if (error.status === 400) {
        return { success: false, message: 'Invalid email configuration. Please contact support.' };
      } else if (error.status === 401) {
        return { success: false, message: 'Email service authentication failed. Please try again later.' };
      } else if (error.status === 403) {
        return { success: false, message: 'Email service access denied. Please contact support.' };
      } else if (error.status === 500) {
        return { success: false, message: 'Email service is temporarily unavailable. Please try again later.' };
      } else {
        return { success: false, message: 'Failed to send message. Please try again or contact us directly.' };
      }
    }
  },

  // Initialize EmailJS (optional, since it's already initialized in HTML)
  init: () => {
    if (typeof window.emailjs !== 'undefined') {
      window.emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
    }
  }
};

export default emailService;
