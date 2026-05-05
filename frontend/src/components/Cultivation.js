import React, { useState } from 'react';
import './Cultivation.css'

const Cultivation = () => {
  const [activeTab, setActiveTab] = useState('cultivation');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const cultivationData = [
    {
      id: 1,
      crop: "Wheat",
      seasonality: "Winter/Spring varieties available",
      soilRequirements: "Well-drained loamy soil, pH 6.0-7.0",
      waterNeeds: "400-500mm during growing season",
      fertilization: "N:P:K ratio of 120:60:40 kg/ha",
      techniques: "Row spacing of 15-20cm, depth of 5cm"
    },
    {
      id: 2,
      crop: "Rice",
      seasonality: "Warm season crop, requires temperatures above 20°C",
      soilRequirements: "Clay or clay loam, pH 5.5-6.5",
      waterNeeds: "Flooding during vegetative stage, 1500mm total",
      fertilization: "N:P:K ratio of 100:50:50 kg/ha",
      techniques: "Puddling, transplanting, or direct seeding"
    },
    {
      id: 3,
      crop: "Corn (Maize)",
      seasonality: "Warm season crop, frost sensitive",
      soilRequirements: "Well-drained loamy soil, pH 5.8-6.8",
      waterNeeds: "500-800mm during growing season",
      fertilization: "N:P:K ratio of 150:60:60 kg/ha",
      techniques: "Row spacing of 60-75cm, plant spacing 20-25cm"
    }
  ];

  const protectionData = [
    {
      id: 1,
      category: "Pest Management",
      methods: [
        "Integrated Pest Management (IPM)",
        "Biological control using beneficial insects",
        "Crop rotation to break pest cycles",
        "Pheromone traps for monitoring and control"
      ],
      description: "A holistic approach combining multiple strategies to control pests while minimizing chemical use."
    },
    {
      id: 2,
      category: "Disease Control",
      methods: [
        "Disease-resistant varieties",
        "Proper field sanitation",
        "Fungicide application when necessary",
        "Proper spacing for air circulation"
      ],
      description: "Strategies to prevent and manage crop diseases through cultural, biological, and chemical means."
    },
    {
      id: 3,
      category: "Weather Protection",
      methods: [
        "Windbreaks and shelterbelts",
        "Frost protection methods",
        "Irrigation scheduling based on weather forecasts",
        "Shade structures for sensitive crops"
      ],
      description: "Techniques to shield crops from adverse weather conditions including frost, heat, wind, and heavy rainfall."
    }
  ];

  const faqs = [
    {
      id: 1,
      question: "When is the best time to apply fertilizers?",
      answer: "The optimal timing for fertilizer application depends on the crop and growth stage. In general, apply base fertilizers before planting, and top dressings during key growth stages like tillering for cereals or flowering for fruiting crops. Soil tests can help determine precise timing and amounts needed."
    },
    {
      id: 2,
      question: "How can I identify nutrient deficiencies in my crops?",
      answer: "Nutrient deficiencies often show specific symptoms. Yellowing of older leaves often indicates nitrogen deficiency, purple coloration on leaves suggests phosphorus deficiency, and yellowing/browning of leaf margins often signals potassium deficiency. Soil and tissue testing can confirm suspicions and guide corrective actions."
    },
    {
      id: 3,
      question: "What natural methods can I use to control pests?",
      answer: "Natural pest control methods include introducing beneficial insects like ladybugs and lacewings, using companion planting (e.g., marigolds repel nematodes), applying neem oil or insecticidal soaps, setting up physical barriers like row covers, and maintaining biodiversity to create a balanced ecosystem where no single pest dominates."
    }
  ];

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">Crop Cultivation & Protection Guide</h1>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'cultivation' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('cultivation')}
        >
          Cultivation Techniques
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'protection' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('protection')}
        >
          Crop Protection
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'faq' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('faq')}
        >
          FAQs
        </button>
      </div>
      
      {/* Cultivation Content */}
      {activeTab === 'cultivation' && (
        <div>
          <p className="mb-6 text-gray-700">
            Successful crop cultivation requires understanding the specific needs of each crop and implementing appropriate techniques. Below are guidelines for some common crops.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cultivationData.map(crop => (
              <div key={crop.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-green-100 p-3 border-b">
                  <h3 className="text-xl font-semibold text-green-800">{crop.crop}</h3>
                </div>
                <div className="p-4">
                  <p className="mb-2"><span className="font-medium">Season:</span> {crop.seasonality}</p>
                  <p className="mb-2"><span className="font-medium">Soil:</span> {crop.soilRequirements}</p>
                  <p className="mb-2"><span className="font-medium">Water:</span> {crop.waterNeeds}</p>
                  <p className="mb-2"><span className="font-medium">Fertilization:</span> {crop.fertilization}</p>
                  <p><span className="font-medium">Techniques:</span> {crop.techniques}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Sustainable Cultivation Practices</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li className="mb-1">Practice crop rotation to maintain soil health and break pest cycles</li>
              <li className="mb-1">Implement cover cropping during off-seasons to prevent erosion</li>
              <li className="mb-1">Use precision farming techniques to optimize resource use</li>
              <li className="mb-1">Consider no-till or reduced tillage methods to preserve soil structure</li>
              <li>Monitor soil health regularly through testing and observation</li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Protection Content */}
      {activeTab === 'protection' && (
        <div>
          <p className="mb-6 text-gray-700">
            Protecting your crops from pests, diseases, and adverse weather conditions is essential for maximizing yield and quality. Implement these strategies to safeguard your investment.
          </p>
          
          {protectionData.map(category => (
            <div key={category.id} className="mb-6 bg-white rounded-lg border shadow-sm p-5">
              <h3 className="text-xl font-semibold text-green-800 mb-3">{category.category}</h3>
              <p className="mb-4 text-gray-700">{category.description}</p>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium mb-2">Recommended Methods:</h4>
                <ul className="grid gap-2 md:grid-cols-2">
                  {category.methods.map((method, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>{method}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100 mt-4">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Early Warning Signs</h3>
            <p className="text-gray-700 mb-3">
              Early detection of problems can prevent major crop losses. Monitor your fields regularly and watch for:
            </p>
            <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">⚠️</span>
                <span>Discoloration or unusual spots on leaves</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">⚠️</span>
                <span>Wilting despite adequate water</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">⚠️</span>
                <span>Stunted growth or deformities</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">⚠️</span>
                <span>Presence of insects or egg masses</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">⚠️</span>
                <span>Holes or chewed edges on leaves</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">⚠️</span>
                <span>Unusual smell or sticky residue</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      
      {/* FAQ Content */}
      {activeTab === 'faq' && (
        <div>
          <p className="mb-6 text-gray-700">
            Find answers to commonly asked questions about crop cultivation and protection below. Click on a question to view the answer.
          </p>
          
          <div className="space-y-4">
            {faqs.map(faq => (
              <div key={faq.id} className="border rounded-lg overflow-hidden shadow-sm">
                <button 
                  className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 font-medium flex justify-between items-center"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <span>{faq.question}</span>
                  <span>{expandedFaq === faq.id ? '−' : '+'}</span>
                </button>
                {expandedFaq === faq.id && (
                  <div className="p-4 bg-white">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-100">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Need More Help?</h3>
            <p className="text-gray-700">
              Contact our agricultural experts for personalized advice on cultivation and protection strategies specific to your region and crops.
            </p>
            <div className="mt-4 flex">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md mr-3">
                Contact Expert
              </button>
              <button className="border border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 rounded-md">
                Join Community Forum
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cultivation;