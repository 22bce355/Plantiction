import React, { useState } from 'react';
import { Mail, Phone, MapPin, User, MessageSquare } from 'lucide-react';

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [activeTab, setActiveTab] = useState('contact-form');
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-green-600" />,
      title: "Email Support",
      details: [
        "support@agriculturehelp.com",
        "information@agriculturehelp.com"
      ]
    },
    {
      icon: <Phone className="w-6 h-6 text-green-600" />,
      title: "Phone Support",
      details: [
        "+1 (555) 123-4567",
        "+1 (555) 987-6543"
      ]
    },
    {
      icon: <MapPin className="w-6 h-6 text-green-600" />,
      title: "Office Location",
      details: [
        "123 Farming Avenue",
        "Agriculture City, AC 12345",
        "United States"
      ]
    }
  ];

  const faqs = [
    {
      question: "How long does it take to get a response?",
      answer: "We aim to respond to all inquiries within 24-48 hours during business days. For urgent matters, please call our support line."
    },
    {
      question: "Can I get personalized agricultural advice?",
      answer: "Yes! We offer personalized consultation services. Our agricultural experts can provide detailed guidance tailored to your specific needs and region."
    },
    {
      question: "Do you offer technical support?",
      answer: "We provide comprehensive technical support for agricultural technologies, farming techniques, and crop management strategies."
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulated form submission
    console.log("Form Submitted", formData);
    setSubmitStatus("success");
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitStatus(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">Contact Agricultural Support</h1>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'contact-form' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('contact-form')}
        >
          Contact Form
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'support-info' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('support-info')}
        >
          Support Information
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'faqs' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('faqs')}
        >
          FAQs
        </button>
      </div>

      {/* Contact Form Tab */}
      {activeTab === 'contact-form' && (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center border rounded-lg px-3 py-2">
                <User className="w-5 h-5 text-green-600 mr-2" />
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name" 
                  required
                  className="w-full focus:outline-none"
                />
              </div>

              <div className="flex items-center border rounded-lg px-3 py-2">
                <Mail className="w-5 h-5 text-green-600 mr-2" />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address" 
                  required
                  className="w-full focus:outline-none"
                />
              </div>

              <div className="flex items-center border rounded-lg px-3 py-2">
                <Phone className="w-5 h-5 text-green-600 mr-2" />
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number" 
                  className="w-full focus:outline-none"
                />
              </div>

              <div className="flex items-center border rounded-lg px-3 py-2">
                <MessageSquare className="w-5 h-5 text-green-600 mr-2" />
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full focus:outline-none bg-white"
                >
                  <option value="">Select Subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="consultation">Agricultural Consultation</option>
                </select>
              </div>

              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message" 
                required
                className="w-full border rounded-lg px-3 py-2 h-32 resize-none focus:outline-green-600"
              />

              <button 
                type="submit" 
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Send Message
              </button>

              {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                  Your message has been sent successfully!
                </div>
              )}
            </form>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-800 mb-4">Contact Support Guidelines</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Include detailed information about your inquiry
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Attach relevant documents or images if applicable
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Provide your preferred contact method
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Be as specific as possible about your agricultural needs
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Support Information Tab */}
      {activeTab === 'support-info' && (
        <div className="grid md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <div 
              key={index} 
              className="bg-white border rounded-lg p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-4">
                {method.icon}
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">{method.title}</h3>
              {method.details.map((detail, idx) => (
                <p key={idx} className="text-gray-700">{detail}</p>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* FAQs Tab */}
      {activeTab === 'faqs' && (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-center text-green-800 mb-6">Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border-b last:border-b-0 py-4"
            >
              <h3 className="text-lg font-medium text-green-700 mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Contactus;