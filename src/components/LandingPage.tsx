import React, { useState } from 'react';
import { ChevronRight, Shield, Network, DollarSign, BarChart3, Settings, Upload, FileText, Rocket } from 'lucide-react';
import Assessment from './AssessmentPage';
import AssessmentQuestions from './AssessmentQuestions';
import AssessmentScopePage from './AssessmentScopePage';
import CloudProviderSelectionPage from './CloudProviderSelectionPage';
import AccountInfoPage from './AccountInfoPage';
import PremiumAssessmentPage from './PremiumAssessmentPage';
import PremiumCloudProviderPage from './PremiumCloudProviderPage';
import ResourceManagementPage from './ResourceManagementPage';
import IaCToolConfigPage from './IaCToolConfigPage';
import InfrastructureExportPage from './InfrastructureExportPage';
import FileUploadPage from './FileUploadPage';
import ChatbotWidget from './ChatbotWidget';
import ConnectedAssessmentPage from './ConnectedAssessmentPage';
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
  const [showResourceManagement, setShowResourceManagement] = useState(false);
  const [showIaCToolConfig, setShowIaCToolConfig] = useState(false);
  const [showInfrastructureExport, setShowInfrastructureExport] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [managementType, setManagementType] = useState<'automated' | 'manual' | 'hybrid' | null>(null);
  const [iacConfig, setIaCConfig] = useState<{ toolType: 'single' | 'multiple'; selectedTool?: string } | null>(null);
  const [showPremiumAccountInfo, setShowPremiumAccountInfo] = useState(false);
  const [showConnectedAssessment, setShowConnectedAssessment] = useState(false);
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
    setShowPremiumAccountInfo(true);
  };

  const handleBackFromPremiumProvider = () => {
    setShowPremiumProviderPage(false);
    setShowPremiumAssessment(true);
  };

  const handlePremiumAccountInfoSubmit = (info: { accountId: string; provider: string }) => {
    setAccountInfo(info);
    setShowPremiumAccountInfo(false);
    if (premiumAssessmentType === 'guided') {
      setShowResourceManagement(true);
    } else {
      setShowConnectedAssessment(true);
    }
  };

  const handleBackFromPremiumAccountInfo = () => {
    setShowPremiumAccountInfo(false);
    setShowPremiumProviderPage(true);
  };

  const handleConnectedAssessmentStart = () => {
    setShowConnectedAssessment(false);
    setShowChatbot(true);
  };

  const handleBackFromConnectedAssessment = () => {
    setShowConnectedAssessment(false);
    setShowPremiumAccountInfo(true);
  };

  const handleResourceManagementSelection = (type: 'automated' | 'manual' | 'hybrid') => {
    setManagementType(type);
    setShowResourceManagement(false);
    if (type === 'automated') {
      setShowIaCToolConfig(true);
    } else {
      // For manual or hybrid, skip to file upload
      setShowFileUpload(true);
    }
  };

  const handleBackFromResourceManagement = () => {
    setShowResourceManagement(false);
    setShowPremiumAccountInfo(true);
  };

  const handleIaCToolConfigSelection = (config: { toolType: 'single' | 'multiple'; selectedTool?: string }) => {
    setIaCConfig(config);
    setShowIaCToolConfig(false);
    if (config.toolType === 'single' && config.selectedTool) {
      setShowInfrastructureExport(true);
    } else {
      setShowFileUpload(true);
    }
  };

  const handleBackFromIaCToolConfig = () => {
    setShowIaCToolConfig(false);
    setShowResourceManagement(true);
  };

  const handleInfrastructureExportContinue = () => {
    setShowInfrastructureExport(false);
    setShowFileUpload(true);
  };

  const handleBackFromInfrastructureExport = () => {
    setShowInfrastructureExport(false);
    setShowIaCToolConfig(true);
  };

  const handleFileUploadStartAssessment = () => {
    setShowFileUpload(false);
    setShowChatbot(true);
  };

  const handleBackFromFileUpload = () => {
    setShowFileUpload(false);
    if (showInfrastructureExport) {
      setShowInfrastructureExport(true);
    } else {
      setShowIaCToolConfig(true);
    }
  };

  const closeAssessment = () => {
    setShowAssessment(false);
    setShowScopePage(false);
    setShowProviderPage(false);
    setShowAccountInfoPage(false);
    setShowPremiumAssessment(false);
    setShowPremiumProviderPage(false);
    setShowResourceManagement(false);
    setShowIaCToolConfig(false);
    setShowInfrastructureExport(false);
    setShowFileUpload(false);
    setShowPremiumAccountInfo(false);
    setShowConnectedAssessment(false);
  };

  const handleAssessmentComplete = (score: number) => {
    setAssessmentScore(score);
    setShowAssessment(false);
    setShowScopePage(false);
    setShowProviderPage(false);
    setShowAccountInfoPage(false);
    setShowPremiumAssessment(false);
    setShowPremiumProviderPage(false);
    setShowResourceManagement(false);
    setShowIaCToolConfig(false);
    setShowInfrastructureExport(false);
    setShowFileUpload(false);
    setShowPremiumAccountInfo(false);
    setShowConnectedAssessment(false);
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

  if (showPremiumAccountInfo && selectedProvider) {
    return (
      <AccountInfoPage 
        onBack={handleBackFromPremiumAccountInfo}
        onContinue={handlePremiumAccountInfoSubmit}
        selectedProvider={selectedProvider}
      />
    );
  }

  if (showConnectedAssessment && selectedProvider && accountInfo) {
    return (
      <ConnectedAssessmentPage 
        onBack={handleBackFromConnectedAssessment}
        onStartAssessment={handleConnectedAssessmentStart}
        selectedProvider={selectedProvider}
        accountInfo={accountInfo}
      />
    );
  }

  if (showResourceManagement && selectedProvider) {
    return (
      <ResourceManagementPage 
        onBack={handleBackFromResourceManagement}
        onContinue={handleResourceManagementSelection}
        selectedProvider={selectedProvider}
      />
    );
  }

  if (showIaCToolConfig && selectedProvider) {
    return (
      <IaCToolConfigPage 
        onBack={handleBackFromIaCToolConfig}
        onContinue={handleIaCToolConfigSelection}
        selectedProvider={selectedProvider}
      />
    );
  }

  if (showInfrastructureExport && selectedProvider && iacConfig?.selectedTool) {
    return (
      <InfrastructureExportPage 
        onBack={handleBackFromInfrastructureExport}
        onContinue={handleInfrastructureExportContinue}
        selectedProvider={selectedProvider}
        selectedTool={iacConfig.selectedTool}
      />
    );
  }

  if (showFileUpload && selectedProvider) {
    return (
      <FileUploadPage 
        onBack={handleBackFromFileUpload}
        onStartAssessment={handleFileUploadStartAssessment}
        selectedProvider={selectedProvider}
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
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg mr-4"
          >
            Start Quick Assessment
            <ChevronRight className="ml-2 w-5 h-5" />
          </button>
          <button
            onClick={startPremiumAssessment}
            className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Start Premium Assessment
            <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </header>
      {/* How It Works Section */}

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="mr-2">❓</span>
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Everything You Need to Know
            </h2>
            <p className="text-lg text-gray-300">
              Get answers to common questions about our cloud maturity assessments
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <button className="w-full text-left p-6 focus:outline-none">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">
                    What is a Cloud Maturity Assessment?
                  </h3>
                  <ChevronRight className="h-5 w-5 text-gray-400 transform rotate-90" />
                </div>
              </button>
            </div>
            
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <button className="w-full text-left p-6 focus:outline-none">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">
                    What's the difference between Quick Insight and AI-Powered Deep Assessment?
                  </h3>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </button>
            </div>
            
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <button className="w-full text-left p-6 focus:outline-none">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">
                    Do I need to provide cloud credentials or access?
                  </h3>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </button>
            </div>
            
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <button className="w-full text-left p-6 focus:outline-none">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">
                    What cloud providers do you support?
                  </h3>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </button>
            </div>
            
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <button className="w-full text-left p-6 focus:outline-none">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">
                    How long does each assessment take?
                  </h3>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </button>
            </div>
            
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <button className="w-full text-left p-6 focus:outline-none">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">
                    What files do I need for the Guided Upload assessment?
                  </h3>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </button>
            </div>
            
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <button className="w-full text-left p-6 focus:outline-none">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">
                    Is my data secure and private?
                  </h3>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </button>
            </div>
            
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <button className="w-full text-left p-6 focus:outline-none">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">
                    What kind of recommendations will I receive?
                  </h3>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </button>
            </div>
          </div>
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
            className="inline-flex items-center bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl mr-4"
          >
            Start Quick Assessment
            <ChevronRight className="ml-2 w-5 h-5" />
          </button>
          <button
            onClick={startPremiumAssessment}
            className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Start Premium Assessment
            <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;