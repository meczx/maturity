import React, { useState } from 'react';
import { ChevronRight, Shield, Network, DollarSign, BarChart3, Settings, Upload, FileText, Rocket } from 'lucide-react';
import Assessment from './AssessmentPage';
import AssessmentQuestions from './AssessmentQuestions';
import ChatbotWidget from './ChatbotWidget';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const [showAssessment, setShowAssessment] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [assessmentScore, setAssessmentScore] = useState<number | null>(null);
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
    setShowAssessment(true);
  };

  const closeAssessment = () => {
    setShowAssessment(false);
  };

  const handleAssessmentComplete = (score: number) => {
    setAssessmentScore(score);
    setShowAssessment(false);
    setShowChatbot(true);
  };

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center">
              <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <strong className="text-lg block mb-2 text-white">Step 1:  Quick Check</strong>
              <p className="text-gray-300">A fast, no-commitment assessment based on strategic cloud questions. </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center">
              <FileText className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <strong className="text-lg block mb-2 text-white">Step 2: AI Powered Deep Scan</strong>
              <p className="text-gray-300">
Analyze your real infrastructure using your own IaC templates (Cloud Formation, Terraform, etc.)</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center">
              <Rocket className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <strong className="text-lg block mb-2 text-white">Step 3: AI Powered Total Audit</strong>
              <p className="text-gray-300"> Full visibility into all provisioned cloud resources, even manual ones, via IAM access or guided script.</p>
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