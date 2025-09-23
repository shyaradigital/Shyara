import React from 'react';
import { X, FileText } from 'lucide-react';

const TermsAndConditions = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '20px',
      }}
      onClick={handleBackdropClick}
    >
      <div
        style={{
          background: 'rgba(30,30,30,0.98)',
          border: '1.5px solid rgba(162,89,247,0.3)',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
          maxWidth: '800px',
          width: '100%',
          maxHeight: '90vh',
          position: 'relative',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 32px 16px',
            borderBottom: '1px solid rgba(162,89,247,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FileText style={{ width: '28px', height: '28px', color: '#a259f7' }} />
            <h2
              style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                color: '#a259f7',
                margin: 0,
              }}
            >
              Terms & Conditions
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#a7a7a7',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(162,89,247,0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'none';
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            padding: '24px 32px 32px',
            overflowY: 'auto',
            flex: 1,
            // Hide scrollbar
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className="terms-content"
        >
          <div style={{ fontSize: '1rem', lineHeight: '1.7', color: '#e7e7e7' }}>
            <div
              style={{
                textAlign: 'center',
                marginBottom: '32px',
                padding: '16px',
                background: 'rgba(162,89,247,0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(162,89,247,0.2)',
              }}
            >
              <h3 style={{ color: '#a259f7', fontSize: '1.3rem', fontWeight: '600', margin: '0 0 8px 0' }}>
                Shyara Digital — Rules & Regulations
              </h3>
              <p style={{ color: '#bdbdbd', fontSize: '0.95rem', margin: 0 }}>
                Welcome to Shyara Digital. By engaging our services, you agree to the following terms and conditions, which ensure smooth operations and mutual clarity.
              </p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ color: '#a259f7', fontSize: '1.2rem', fontWeight: '600', margin: '0 0 12px 0' }}>
                1. Payments
              </h4>
              <ul style={{ margin: '0 0 16px 0', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Advance Payment is required before starting any project.</li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>Social Media Management (SMM) / Video Editing:</strong>
                  <ul style={{ margin: '8px 0 0 20px', paddingLeft: '0' }}>
                    <li style={{ marginBottom: '4px' }}>50% advance before work begins.</li>
                    <li style={{ marginBottom: '4px' }}>Remaining 50% due within 15 days of service initiation.</li>
                  </ul>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>Website Development & Festive Post Design:</strong>
                  <ul style={{ margin: '8px 0 0 20px', paddingLeft: '0' }}>
                    <li style={{ marginBottom: '4px' }}>50% advance before project starts.</li>
                    <li style={{ marginBottom: '4px' }}>Remaining balance payable upon completion, before submission/posting.</li>
                  </ul>
                </li>
                <li style={{ marginBottom: '8px' }}>All payments must be made via the channels communicated by Shyara Digital (UPI, Bank Transfer, PayPal, or payment gateway).</li>
                <li style={{ marginBottom: '8px' }}>Invoices must be settled within 7 days of issue, unless otherwise agreed.</li>
                <li style={{ marginBottom: '8px' }}>Late payments may incur a 2% fee per week after the due date.</li>
                <li style={{ marginBottom: '8px' }}>No refunds will be issued after advance payment.</li>
              </ul>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ color: '#a259f7', fontSize: '1.2rem', fontWeight: '600', margin: '0 0 12px 0' }}>
                2. Project Planning & Requirements
              </h4>
              <ul style={{ margin: '0 0 16px 0', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>We require 2–3 working days after initial discussions to analyze requirements and prepare a detailed project plan.</li>
                <li style={{ marginBottom: '8px' }}>Clients must provide all necessary credentials (e.g., social media logins, hosting access, brand assets) to allow us to deliver services smoothly.</li>
                <li style={{ marginBottom: '8px' }}>Delays in providing credentials or content may result in adjustments to timelines.</li>
              </ul>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ color: '#a259f7', fontSize: '1.2rem', fontWeight: '600', margin: '0 0 12px 0' }}>
                3. Deliverables & Revisions
              </h4>
              <ul style={{ margin: '0 0 16px 0', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Social Media Posts & Reels will be shared for verification one day before posting.</li>
                <li style={{ marginBottom: '8px' }}>Each deliverable (post, reel, video, design or website/app component) includes up to 5 revisions within the agreed scope.</li>
                <li style={{ marginBottom: '8px' }}>Additional revisions beyond 5 rounds will be charged separately.</li>
                <li style={{ marginBottom: '8px' }}>Final deliverables will only be shared after all payments are cleared as per payment terms.</li>
              </ul>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ color: '#a259f7', fontSize: '1.2rem', fontWeight: '600', margin: '0 0 12px 0' }}>
                4. Scope Changes
              </h4>
              <ul style={{ margin: '0 0 16px 0', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Any requests outside the agreed scope (new features, extra posts, additional designs) must be submitted as a Scope Change Request (SCR).</li>
                <li style={{ marginBottom: '8px' }}>Scope changes may affect cost and delivery timelines.</li>
              </ul>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ color: '#a259f7', fontSize: '1.2rem', fontWeight: '600', margin: '0 0 12px 0' }}>
                5. Refunds & Cancellations
              </h4>
              <ul style={{ margin: '0 0 16px 0', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>No refunds are available after advance payment, in case of Social Media Management, Video Editing and Ads Management.</li>
                <li style={{ marginBottom: '8px' }}>Refunds (if any) will only apply in cases where less than 20% of the project work has been delivered and the amount to be refunded will not exceed by more than 60% of the total project fee.</li>
                <li style={{ marginBottom: '8px' }}>Gateway charges (PayPal, Razorpay, Stripe fees) are non-refundable.</li>
              </ul>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ color: '#a259f7', fontSize: '1.2rem', fontWeight: '600', margin: '0 0 12px 0' }}>
                6. Confidentiality & Intellectual Property
              </h4>
              <ul style={{ margin: '0 0 16px 0', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>All client data, credentials, and business information will remain confidential.</li>
                <li style={{ marginBottom: '8px' }}>All deliverables remain the intellectual property of Shyara Digital until final payment is received.</li>
                <li style={{ marginBottom: '8px' }}>Once fully paid, ownership of deliverables is transferred to the client (except for stock assets licensed by Shyara).</li>
              </ul>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ color: '#a259f7', fontSize: '1.2rem', fontWeight: '600', margin: '0 0 12px 0' }}>
                7. Timelines & Communication
              </h4>
              <ul style={{ margin: '0 0 16px 0', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Standard response time: within 24 business hours.</li>
                <li style={{ marginBottom: '8px' }}>Weekly project updates will be shared via email.</li>
                <li style={{ marginBottom: '8px' }}>Any delay from the client's side in approvals, credentials, or payments will extend timelines proportionally.</li>
              </ul>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ color: '#a259f7', fontSize: '1.2rem', fontWeight: '600', margin: '0 0 12px 0' }}>
                8. Dispute Resolution
              </h4>
              <ul style={{ margin: '0 0 16px 0', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>In case of disputes, both parties will first attempt resolution via discussion and email communication.</li>
                <li style={{ marginBottom: '8px' }}>If unresolved, matters will be subject to the jurisdiction of Indian courts.</li>
              </ul>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ color: '#a259f7', fontSize: '1.2rem', fontWeight: '600', margin: '0 0 12px 0' }}>
                9. General
              </h4>
              <ul style={{ margin: '0 0 16px 0', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>By engaging our services, you confirm that you have the right to provide all content, media, and credentials necessary for the project.</li>
                <li style={{ marginBottom: '8px' }}>Shyara Digital reserves the right to update these Rules & Regulations at any time.</li>
              </ul>
            </div>

            <div
              style={{
                marginTop: '32px',
                padding: '20px',
                background: 'rgba(162,89,247,0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(162,89,247,0.15)',
                textAlign: 'center',
              }}
            >
              <p style={{ color: '#bdbdbd', fontSize: '0.9rem', margin: 0, fontStyle: 'italic' }}>
                Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '16px 32px',
            borderTop: '1px solid rgba(162,89,247,0.2)',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: 'linear-gradient(90deg, #a259f7, #7f42a7)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '12px 32px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(162,89,247,0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 6px 20px rgba(162,89,247,0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 16px rgba(162,89,247,0.3)';
            }}
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
