import React, { useState } from 'react';
import { ArrowLeft, Cloud } from 'lucide-react';

interface PremiumCloudProviderPageProps {
  onBack: () => void;
  onContinue: (provider: string) => void;
  assessmentType: 'guided' | 'connected';
}

export default function PremiumCloudProviderPage({ onBack, onContinue, assessmentType }: PremiumCloudProviderPageProps) {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const providers = [
    {
      id: 'aws',
      name: 'Amazon Web Services',
      description: 'AWS cloud infrastructure',
      color: 'bg-orange-500',
      icon: '☁️'
    },
    {
      id: 'azure',
      name: 'Microsoft Azure',
      description: 'Azure cloud platform',
      color: 'bg-blue-500',
      icon: '☁️'
    },
    {
      id: 'gcp',
      name: 'Google Cloud Platform',
      description: 'Google Cloud services',
      color: 'bg-green-500',
      icon: '☁️'
    }
  ];

  const handleContinue = () => {
    if (selectedProvider) {
      onContinue(selectedProvider);
    }
  };

  const getTitle = () => {
    return assessmentType === 'guided' 
      ? 'AI-Powered Guided Upload'
      : 'AI-Powered Connected Assessment';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getTitle()}
          </h1>
          <p className="text-gray-600 text-lg">
            Select your cloud provider
          </p>
        </div>

        {/* Provider Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className={`bg-white border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                selectedProvider === provider.id
                  ? 'border-blue-500 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => setSelectedProvider(provider.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`${provider.color} p-3 rounded-lg mr-4`}>
                    <Cloud className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {provider.name}
                    </h3>
                    <p className="text-gray-600">
                      {provider.description}
                    </p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedProvider === provider.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedProvider === provider.id && (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          
          <button
            onClick={handleContinue}
            disabled={!selectedProvider}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center ${
              selectedProvider
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue
            <ArrowLeft className="h-5 w-5 ml-2 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}