import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Building2, Wallet, QrCode, University } from 'lucide-react';
import './pay.css';

const PaymentMethods = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const serviceData = location.state || { amount: '₹2,499', serviceName: 'AC Service' };
  
  // Extract amount and service name from passed data
  const amount = serviceData.amount || '₹2,499';
  const serviceName = serviceData.serviceName || 'AC Service';
  const servicerName = serviceData.servicerName || 'Service Provider';
  const [selectedMethod, setSelectedMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI',
      description: 'Pay using UPI ID or QR Code',
      icon: <QrCode className="w-6 h-6" />,
      popular: true
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, RuPay',
      icon: <CreditCard className="w-6 h-6" />
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      description: 'Pay directly from your bank account',
      icon: <University className="w-6 h-6" />
    },
    {
      id: 'wallet',
      name: 'Digital Wallets',
      description: 'Paytm, PhonePe, Google Pay, Amazon Pay',
      icon: <Wallet className="w-6 h-6" />,
      popular: true
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay when you receive',
      icon: <Building2 className="w-6 h-6" />
    }
  ];

  const popularWallets = [
    { name: 'Paytm', logo: '💙' },
    { name: 'PhonePe', logo: '💜' },
    { name: 'Google Pay', logo: '🔵' },
    { name: 'Amazon Pay', logo: '🟠' },
    { name: 'MobiKwik', logo: '🔴' },
    { name: 'Freecharge', logo: '🟡' }
  ];

  const popularBanks = [
    'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank',
    'Punjab National Bank', 'Bank of Baroda', 'Canara Bank', 'Union Bank of India',
    'IDFC First Bank', 'Yes Bank', 'Kotak Mahindra Bank', 'IndusInd Bank'
  ];

  const handleCardInputChange = (field, value) => {
    if (field === 'number') {
      // Format card number with spaces
      value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (value.length > 19) return;
    }
    if (field === 'expiry') {
      // Format expiry as MM/YY
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (value.length > 5) return;
    }
    if (field === 'cvv' && value.length > 4) return;
    
    setCardDetails(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentConfirmation = async () => {
    if (!selectedMethod) {
      alert('Please select a payment method');
      return;
    }

    setIsProcessing(true);
    setPaymentStatus(null);

    try {
      // Check if user is logged in
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('Please login to complete payment');
        navigate('/login');
        return;
      }

      const paymentData = {
        serviceName,
        amount,
        paymentMethod: selectedMethod,
        servicerName
      };

      const response = await fetch('https://homiecare-1.onrender.com/api/payment/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(paymentData)
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server is not responding properly. Please check if backend is running.');
      }

      const result = await response.json();

      if (result.success) {
        const emailMessage = result.emailSent 
          ? 'Payment successful! Check your email for confirmation and PDF bill.'
          : 'Payment successful! However, there was an issue sending the confirmation email.';
        
        setPaymentStatus({
          type: 'success',
          message: emailMessage,
          transactionId: result.transactionId
        });
        
        // Show success message but stay on the same page
        // setTimeout(() => {
        //   navigate('/');
        // }, 5000);
      } else {
        setPaymentStatus({
          type: 'error',
          message: result.message || 'Payment failed. Please try again.'
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'upi':
        return (
          <div className="payment-form">
            <div className="form-group">
              <label>Enter UPI ID</label>
              <input
                type="text"
                placeholder="yourname@paytm"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="upi-apps">
              <p>Or pay with UPI apps:</p>
              <div className="upi-grid">
                <button className="upi-app">📱 PhonePe</button>
                <button className="upi-app">💙 Paytm</button>
                <button className="upi-app">🔵 Google Pay</button>
                <button className="upi-app">🏦 BHIM</button>
              </div>
            </div>
          </div>
        );

      case 'card':
        return (
          <div className="payment-form">
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) => handleCardInputChange('number', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Cardholder Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={cardDetails.name}
                onChange={(e) => handleCardInputChange('name', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="card-types">
              <span className="card-type">💳 Visa</span>
              <span className="card-type">💳 Mastercard</span>
              <span className="card-type">🇮🇳 RuPay</span>
            </div>
          </div>
        );

      case 'netbanking':
        return (
          <div className="payment-form">
            <div className="form-group">
              <label>Select Your Bank</label>
              <select className="form-select">
                <option value="">Choose your bank</option>
                {popularBanks.map((bank, index) => (
                  <option key={index} value={bank}>{bank}</option>
                ))}
              </select>
            </div>
            <p className="bank-note">You will be redirected to your bank's secure login page</p>
          </div>
        );

      case 'wallet':
        return (
          <div className="payment-form">
            <div className="wallet-grid">
              {popularWallets.map((wallet, index) => (
                <button key={index} className="wallet-option">
                  <span className="wallet-logo">{wallet.logo}</span>
                  <span className="wallet-name">{wallet.name}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 'cod':
        return (
          <div className="payment-form">
            <div className="cod-info">
              <p>💰 Pay {amount} when your order is delivered</p>
              <p>📦 Available for orders up to ₹50,000</p>
              <p>🚚 Extra ₹50 handling charges may apply</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h2>Choose Payment Method</h2>
        <div className="order-summary">
          <div>
            <span>Service: {serviceName}</span>
          </div>
          <div>
            <span>Total Amount: </span>
            <span className="amount">{amount}</span>
          </div>
        </div>
      </div>

      <div className="payment-methods">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`payment-method ${selectedMethod === method.id ? 'selected' : ''}`}
            onClick={() => setSelectedMethod(method.id)}
          >
            <div className="method-info">
              <div className="method-icon">{method.icon}</div>
              <div className="method-details">
                <div className="method-name">
                  {method.name}
                  {method.popular && <span className="popular-badge">Popular</span>}
                </div>
                <div className="method-description">{method.description}</div>
              </div>
            </div>
            <div className="radio-button">
              {selectedMethod === method.id && <div className="radio-selected"></div>}
            </div>
          </div>
        ))}
      </div>

      {selectedMethod && (
        <div className="payment-details">
          {renderPaymentForm()}
          
          <div className="payment-actions">
            <button 
              className="pay-button"
              onClick={handlePaymentConfirmation}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay ${amount}`}
            </button>
            <p className="security-note">
              🔒 Your payment information is secure and encrypted
            </p>
          </div>
        </div>
      )}

      <div className="accepted-cards">
        <p>We accept:</p>
        <div className="card-logos">
          <span>💳 Visa</span>
          <span>💳 Mastercard</span>
          <span>🇮🇳 RuPay</span>
          <span>🏦 All Major Banks</span>
          <span>📱 UPI</span>
        </div>
      </div>

             {/* Payment Status Display */}
       {paymentStatus && (
         <div className={`payment-status ${paymentStatus.type}`}>
           <div className="status-content">
             <h3>{paymentStatus.type === 'success' ? '✅ Payment Successful!' : '❌ Payment Failed'}</h3>
             <p>{paymentStatus.message}</p>
             {paymentStatus.transactionId && (
               <p><strong>Transaction ID:</strong> {paymentStatus.transactionId}</p>
             )}
             

           </div>
         </div>
       )}
    </div>
  );
};

export default PaymentMethods;
