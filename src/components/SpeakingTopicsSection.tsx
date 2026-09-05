import { useState } from 'react';
import { motion } from 'motion/react';
import { Mic2, Users, Target, Clock, ChevronDown, ChevronUp, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { SPEAKING_TOPICS } from '../data/mediaKitData';
import { KeynoteTopic } from '../types';

interface SpeakingTopicsSectionProps {
  onSelectTopicForInquiry: (topicTitle: string) => void;
}

export function SpeakingTopicsSection({ onSelectTopicForInquiry }: SpeakingTopicsSectionProps) {
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedTopicId(expandedTopicId === id ? null : id);
  };

  return (
    <section
      id="speaking"
      className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg shadow-slate-950/50 backdrop-blur-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Mic2 className="w-5 h-5 text-sky-400" />
            <h2 className="text-2xl font-bold text-sky-400 tracking-tight">
              Keynote &amp; Speaking Topics
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Available for keynote addresses, executive fireside chats, conference panels, and corporate masterclasses.
          </p>
        </div>

        <button
          onClick={() => onSelectTopicForInquiry('General Keynote Inquiry')}
          className="inline-flex items-center gap-1.5 self-start sm:self-auto px-4 py-2 text-xs font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-all shadow-sm shadow-sky-500/20"
        >
          <span>Book Keynote</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bento Topic Tiles for Mobile and Structured View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {SPEAKING_TOPICS.map((topic) => {
          const isExpanded = expandedTopicId === topic.id;
          return (
            <div
              key={topic.id}
              onClick={() => toggleExpand(topic.id)}
              className="bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between transition-all cursor-pointer group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[11px] font-bold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded">
                    {topic.duration}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">{topic.format}</span>
                </div>

                <h3 className="text-base font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                  {topic.topic}
                </h3>

                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-semibold text-slate-400">Audience:</span>
                    <span className="truncate">{topic.targetAudience}</span>
                  </div>

                  <div className="flex items-start gap-1.5 text-slate-300">
                    <Target className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <span className="font-semibold text-slate-400">Deliverable:</span>
                    <span className="line-clamp-2">{topic.deliverable}</span>
                  </div>
                </div>

                {isExpanded && topic.takeaways && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 pt-3 border-t border-slate-800/80 space-y-1.5"
                  >
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Key Takeaways:
                    </div>
                    {topic.takeaways.map((takeaway, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-sky-400 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(topic.id);
                  }}
                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
                >
                  <span>{isExpanded ? 'Less' : 'Details'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTopicForInquiry(topic.topic);
                  }}
                  className="px-3 py-1 text-xs font-bold text-sky-400 hover:text-slate-950 bg-sky-500/10 hover:bg-sky-400 border border-sky-500/30 hover:border-sky-400 rounded-md transition-all cursor-pointer"
                >
                  Inquire
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Speaker Requirements / Rider Summary Note */}
      <div className="mt-4 p-3.5 bg-slate-950/40 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Accepting select keynote and panel bookings for Q3/Q4 and upcoming fiscal seasons.</span>
        </div>
        <div className="text-slate-300 font-medium">
          Standard A/V: Wireless Lapel / Handheld Mic, HDMI 16:9 Presentation Display
        </div>
      </div>
    </section>
  );
}
