import React, { useState, useEffect } from 'react';
import emailService from '../services/emailService';

const ContactTest = () => {
  const [emailjsLoaded, setEmailjsLoaded] = useState(false);
  const [testResult, setTestResult] = useState('');
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    // Check if EmailJS is loaded
    const checkEmailJS = () => {
      if (typeof window.emailjs !== 'undefined') {
        setEmailjsLoaded(true);
        setTestResult('✅ EmailJS is loaded and ready');
      } else {
        setTestResult('❌ EmailJS is not loaded');
      }
    };

    // Check immediately and after a short delay
    checkEmailJS();
    const timer = setTimeout(checkEmailJS, 1000);

    return () => clearTimeout(timer);
  }, []);

  const testEmailJS = async () => {
    setTesting(true);
    setTestResult('🔄 Testing EmailJS integration...');
    
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+91 9876543210',
      message: 'This is a test message to verify EmailJS integration is working correctly.'
    };

    try {
      const result = await emailService.sendContactForm(testData);
      if (result.success) {
        setTestResult('✅ Test successful! Check your email inbox.');
      } else {
        setTestResult(`❌ Test failed: ${result.message}`);
      }
    } catch (error) {
      setTestResult(`❌ Test error: ${error.message}`);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div style={{ 
      padding: '30px', 
      border: '2px solid #7f42a7', 
      borderRadius: '12px', 
      margin: '20px',
      backgroundColor: 'rgba(30,30,40,0.22)',
      color: '#e0d7f7',
      maxWidth: '600px',
      margin: '20px auto'
    }}>
      <h2 style={{ color: '#a259f7', textAlign: 'center', marginBottom: '20px' }}>
        EmailJS Integration Test
      </h2>
      
      <div style={{ marginBottom: '20px' }}>
        <strong>Status:</strong> {testResult}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <strong>Configuration:</strong>
        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
          <li>Service ID: service_xxbj3sv</li>
          <li>Template ID: template_sk6yw4m</li>
          <li>Public Key: 61WpC-MTI2cvq-BE_</li>
        </ul>
      </div>

      <button 
        onClick={testEmailJS} 
        disabled={testing || !emailjsLoaded}
        style={{
          width: '100%',
          padding: '12px 20px',
          backgroundColor: testing || !emailjsLoaded ? '#555' : '#a259f7',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: testing || !emailjsLoaded ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        {testing ? 'Testing...' : 'Send Test Email'}
      </button>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#ccc' }}>
        <strong>Note:</strong> This will send a test email to your configured EmailJS recipient address.
        If successful, you should receive an email within a few seconds.
      </div>
    </div>
  );
};

export default ContactTest;
