import React, { useState } from 'react';
import emailService from '../services/emailService';

// Test component to verify EmailJS integration
// This can be temporarily added to test the email functionality
const EmailJSTest = () => {
  const [testResult, setTestResult] = useState('');
  const [testing, setTesting] = useState(false);

  const testEmailJS = async () => {
    setTesting(true);
    setTestResult('Testing EmailJS connection...');
    
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+91 9876543210',
      message: 'This is a test message from EmailJS integration.'
    };

    try {
      const result = await emailService.sendContactForm(testData);
      setTestResult(result.success ? '✅ Test successful!' : `❌ Test failed: ${result.message}`);
    } catch (error) {
      setTestResult(`❌ Test error: ${error.message}`);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '8px', 
      margin: '20px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>EmailJS Integration Test</h3>
      <button 
        onClick={testEmailJS} 
        disabled={testing}
        style={{
          padding: '10px 20px',
          backgroundColor: testing ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: testing ? 'not-allowed' : 'pointer'
        }}
      >
        {testing ? 'Testing...' : 'Test EmailJS'}
      </button>
      {testResult && (
        <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{testResult}</p>
      )}
    </div>
  );
};

export default EmailJSTest;
