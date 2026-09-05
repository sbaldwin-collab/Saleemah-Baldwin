import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeaderHero } from './components/HeaderHero';
import { MusicPlayerBar } from './components/MusicPlayerBar';
import { ExecutiveProfileSection } from './components/ExecutiveProfileSection';
import { PressReleaseSection } from './components/PressReleaseSection';
import { SpeakingTopicsSection } from './components/SpeakingTopicsSection';
import { ApprovedQuotesSection } from './components/ApprovedQuotesSection';
import { MediaAssetsSection } from './components/MediaAssetsSection';
import { ContactFormSection } from './components/ContactFormSection';
import { InterviewRequestModal } from './components/InterviewRequestModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

export default function App() {
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [selectedTopicForInquiry, setSelectedTopicForInquiry] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleOpenInterviewModal = (topic: string = '') => {
    setSelectedTopicForInquiry(topic);
    setIsInterviewModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* Sticky Navigation Bar */}
      <Navbar
        onRequestInterview={() => handleOpenInterviewModal('')}
        onShowToast={showToast}
      />

      {/* Main Content Container matching max-w-1000px */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-10 sm:space-y-12">
        {/* Header Hero */}
        <HeaderHero onRequestInterview={() => handleOpenInterviewModal('')} />

        {/* Generative Ambient Music Player */}
        <MusicPlayerBar onShowToast={showToast} />

        {/* Executive Profile Section */}
        <ExecutiveProfileSection
          onRequestInterview={() => handleOpenInterviewModal('')}
          onShowToast={showToast}
        />

        {/* Official Press Release */}
        <PressReleaseSection onShowToast={showToast} />

        {/* Keynote & Speaking Topics */}
        <SpeakingTopicsSection
          onSelectTopicForInquiry={(topic) => handleOpenInterviewModal(topic)}
        />

        {/* Approved Soundbites & Quotes */}
        <ApprovedQuotesSection onShowToast={showToast} />

        {/* Media Assets & Brand Downloads */}
        <MediaAssetsSection onShowToast={showToast} />

        {/* Dedicated HTML Contact Form Section */}
        <ContactFormSection onShowToast={showToast} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interview & Speaking Request Modal */}
      <InterviewRequestModal
        isOpen={isInterviewModalOpen}
        onClose={() => setIsInterviewModalOpen(false)}
        initialTopic={selectedTopicForInquiry}
        onShowToast={showToast}
      />

      {/* Toast Feedback Notification */}
      <Toast message={toastMessage} />
    </div>
  );
}
