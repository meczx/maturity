import React, { useState } from 'react';
import { ChevronRight, Shield, Network, DollarSign, BarChart3, Settings, Upload, FileText, Rocket } from 'lucide-react';
import Assessment from './AssessmentPage';
import AssessmentQuestions from './AssessmentQuestions';
import AssessmentScopePage from './AssessmentScopePage';
import CloudProviderSelectionPage from './CloudProviderSelectionPage';
import AccountInfoPage from './AccountInfoPage';
import PremiumAssessmentPage from './PremiumAssessmentPage';
import PremiumCloudProviderPage from './PremiumCloudProviderPage';
import ChatbotWidget from './ChatbotWidget';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const [showAssessment, setShowAssessment] = useState(false);
  const [showScopePage, setShowScopePage] = useState(false);
  const [showProviderPage, setShowProviderPage] = useState(false);
  const [showAccountInfoPage, setShowAccountInfoPage] = useState(false);
  const [showPremiumAssessment, setShowPremiumAssessment] = useState(false);
  const [showPremiumProviderPage, setShowPremiumProviderPage] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [assessmentScore, setAssessmentScore] = useState<number | null>(null);
  const [selectedScope, setSelectedScope] = useState<'organization' | 'account' | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [accountInfo, setAccountInfo] = useState<{ accountId: string; provider: string } | null>(null);
  const [premiumAssessmentType, setPremiumAssessmentType] = useState<'guided' | 'connected' | null>(null);
  const { logout, sessionId } = useAuth();
  const navigate = useNavigate();

  // Call start assessment API as soon as assessment starts
  React.useEffect(() => {
    if (showAssessment && sessionId) {
      fetch('https://2c02ae439d82.ngrok-free.app/cloud_maturity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: sessionId, query: 'start assessment' })
      });
    }
  }, [showAssessment, sessionId]);

  const startAssessment = () => {
    setShowScopePage(true);
  };

  const startPremiumAssessment = () => {
    setShowPremiumAssessment(true);
  };

  const handleScopeSelection = (scope: 'organization' | 'account') => {
    setSelectedScope(scope);
    setShowScopePage(false);
    
    if (scope === 'organization') {
      setShowAssessment(true);
    } else {
      setShowProviderPage(true);
    }
  };

  const handleBackFromScope = () => {
    setShowScopePage(false);
  };

  const handleProviderSelection = (provider: string) => {
    setSelectedProvider(provider);
    setShowProviderPage(false);
    setShowAccountInfoPage(true);
  };

  const handleBackFromProvider = () => {
    setShowProviderPage(false);
    setShowScopePage(true);
  };

  const handleAccountInfoSubmit = (info: { accountId: string; provider: string }) => {
    setAccountInfo(info);
    setShowAccountInfoPage(false);
    setShowAssessment(true);
  };

  const handleBackFromAccountInfo = () => {
    setShowAccountInfoPage(false);
    setShowProviderPage(true);
  };

  const handlePremiumAssessmentSelection = (type: 'guided' | 'connected') => {
    setPremiumAssessmentType(type);
    setShowPremiumAssessment(false);
    setShowPremiumProviderPage(true);
  };

  const handleBackFromPremiumAssessment = () => {
    setShowPremiumAssessment(false);
  };

  const handlePremiumProviderSelection = (provider: string) => {
    setSelectedProvider(provider);
    setShowPremiumProviderPage(false);
    // Here you would continue to the next step (account info or file upload)
    // For now, let's just show a placeholder
    alert(`Selected ${provider} for ${premiumAssessmentType} assessment`);
  };

  const handleBackFromPremiumProvider = () => {
    setShowPremiumProviderPage(false);
    setShowPremiumAssessment(true);
  };

  const closeAssessment = () => {
    setShowAssessment(false);
    setShowScopePage(false);
    setShowProviderPage(false);
    setShowAccountInfoPage(false);
    setShowPremiumAssessment(false);
    setShowPremiumProviderPage(false);
  };

  const handleAssessmentComplete = (score: number) => {
    setAssessmentScore(score);
    setShowAssessment(false);
    setShowScopePage(false);
    setShowProviderPage(false);
    setShowAccountInfoPage(false);
    setShowPremiumAssessment(false);
    setShowPremiumProviderPage(false);
    setShowChatbot(true);
  };

  if (showScopePage) {
    return (
      <AssessmentScopePage 
        onBack={handleBackFromScope}
        onContinue={handleScopeSelection}
      />
    );
  }

  if (showProviderPage) {
    return (
      <CloudProviderSelectionPage 
        onBack={handleBackFromProvider}
        onContinue={handleProviderSelection}
      />
    );
  }

  if (showAccountInfoPage && selectedProvider) {
    return (
      <AccountInfoPage 
        onBack={handleBackFromAccountInfo}
        onContinue={handleAccountInfoSubmit}
        selectedProvider={selectedProvider}
      />
    );
  }

  if (showPremiumAssessment) {
    return (
      <PremiumAssessmentPage 
        onBack={handleBackFromPremiumAssessment}
        onContinue={handlePremiumAssessmentSelection}
      />
    );
  }

  if (showPremiumProviderPage && premiumAssessmentType) {
    return (
      <PremiumCloudProviderPage 
        onBack={handleBackFromPremiumProvider}
        onContinue={handlePremiumProviderSelection}
        assessmentType={premiumAssessmentType}
      />
    );
  }

  if (showAssessment) {
    return (
      <AssessmentQuestions 
        onComplete={handleAssessmentComplete}
        onClose={closeAssessment}
      />
    );
  }

  if (showChatbot) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full max-w-4xl h-[90vh] flex items-center justify-center">
            <ChatbotWidget forceOpen />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header / Hero Section */}
      <header className="bg-gray-800 text-white py-16 px-6 text-center relative">
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="absolute top-6 right-6 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 font-medium z-10"
        >
          Logout
        </button>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Is Your Cloud Environment mature enough for the future?
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Audit your stack, harden your cloud posture, and embrace cloud-native design.
          </p>
          <button
            onClick={startAssessment}
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Start your quick check Cloud Assessment to start step 1
            <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </header>
      {/* How It Works Section */}
      <section className="py-5 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Step 1: Quick Check */}
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Step 1: Quick Check</h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Try Full Assessment
                </button>
              </div>
              <h4 className="text-lg font-semibold text-blue-400 mb-4">Free Assessment</h4>
              <p className="text-gray-300 mb-6">
                A fast, no-commitment assessment based on strategic cloud questions.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Free, no commitments
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  No access required
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Instant results
                </div>
                <div className="flex items-center text-yellow-400">
                  <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Limited depth — self-assessment only
                </div>
              </div>
              
              <button
                onClick={startAssessment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                Start your quick check Cloud Assessment
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </div>
            
            {/* Step 2 & 3: AI-Powered Assessment */}
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">Step 2 & 3: AI-Powered Assessment</h3>
              <h4 className="text-lg font-semibold text-blue-400 mb-4">Premium Assessment</h4>
              <p className="text-gray-300 mb-6">
                Deep scan and total audit with AI-driven analysis of your real infrastructure.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  AI-driven analysis and insights
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Comprehensive infrastructure assessment
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Detailed recommendations
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Interactive AI-powered chat
                </div>
              </div>
              
              <button
                onClick={startPremiumAssessment}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
              >
                Start Premium Assessment
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Assessment Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-400 mb-6">
            Why Cloud Maturity Assessment is Essential
          </h2>
          <p className="text-lg mb-6 text-gray-300">
            Without a clear view of your cloud maturity, you're exposed to:
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center text-lg text-gray-200">
              <span className="text-2xl mr-4">💸</span>
              <span>Uncontrolled costs</span>
            </li>
            <li className="flex items-center text-lg text-gray-200">
              <span className="text-2xl mr-4">🔓</span>
              <span>Security vulnerabilities</span>
            </li>
            <li className="flex items-center text-lg text-gray-200">
              <span className="text-2xl mr-4">🧱</span>
              <span>Fragile, non-resilient architectures</span>
            </li>
            <li className="flex items-center text-lg text-gray-200">
              <span className="text-2xl mr-4">🤯</span>
              <span>Manual chaos from inconsistent IaC practices</span>
            </li>
          </ul>
          <p className="text-lg text-gray-300">
            Our expert-designed AI powered cloud assessment can get you a clear picture of your current state — and insights on how to improve.
          </p>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="py-16 px-6 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center">
            What You'll Get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-3">
                <Shield className="w-6 h-6 text-blue-600 mr-3" />
                <strong className="text-lg text-white">Architecture Resiliency</strong>
              </div>
              <p className="text-gray-300">Multi-AZ, modular design, fault-tolerance</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-3">
                <Shield className="w-6 h-6 text-green-600 mr-3" />
                <strong className="text-lg text-white">Security Posture</strong>
              </div>
              <p className="text-gray-300">IAM, encryption, segmentation, WAFs</p>
          </div>
            <div className="bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-3">
                <Network className="w-6 h-6 text-purple-600 mr-3" />
                <strong className="text-lg text-white">Network Design</strong>
        </div>
              <p className="text-gray-300">VPCs, routing, endpoints, DNS</p>
                  </div>
            <div className="bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-3">
                <DollarSign className="w-6 h-6 text-green-600 mr-3" />
                <strong className="text-lg text-white">Cost Efficiency</strong>
              </div>
              <p className="text-gray-300">Spot usage, right sizing, budgets</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-3">
                <BarChart3 className="w-6 h-6 text-orange-600 mr-3" />
                <strong className="text-lg text-white">Observability</strong>
              </div>
              <p className="text-gray-300">Logs, alarms, tracing, health checks</p>
                </div>
            <div className="bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-3">
                <Settings className="w-6 h-6 text-blue-600 mr-3" />
                <strong className="text-lg text-white">IaC Best Practices</strong>
              </div>
              <p className="text-gray-300">Reusability, modularity, parameters</p>
            </div>
          </div>
        </div>
      </section>

      

      {/* CTA Section */}
      <section id="start" className="py-16 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Begin your free maturity assessment now — no access keys required.
          </p>
          <button
            onClick={startAssessment}
            className="inline-flex items-center bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Start your Cloud Assessment
            <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;