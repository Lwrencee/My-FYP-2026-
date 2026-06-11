/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, Course } from '../types';
import { COURSES } from '../data';
import CourseSwipeView from './CourseSwipeView';
import * as Icons from 'lucide-react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface AcademyViewProps {
  profile: UserProfile;
  updateProfile: (profile: UserProfile | ((prev: UserProfile) => UserProfile)) => void;
  theme?: 'light' | 'dark';
  onActiveStateChange?: (isActive: boolean) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 } 
  }
};

const MODULES = [
  {
    level: "Beginner Level",
    title: "Beginner Concepts",
    icon: "🟢",
    description: "Learn the basics of online safety and spotting fake messages.",
    colorClass: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
    buttonClass: "bg-emerald-600 hover:bg-emerald-500 text-white",
    topics: [
      "Intro to Cybersecurity",
      "Phishing/Smishing Fundamentals",
      "Strong & Weak Passwords"
    ]
  },
  {
    level: "Intermediate Level",
    title: "Intermediate Ideas",
    icon: "🟡",
    description: "Understand digital footprints and advanced social engineering tricks.",
    colorClass: "bg-amber-500/10 border-amber-500/20 text-amber-500",
    buttonClass: "bg-amber-600 hover:bg-amber-500 text-white",
    topics: [
      "Digital Footprints",
      "Social Engineering",
      "Multi-Factor Authentication (MFA)"
    ]
  },
  {
    level: "Advanced Level",
    title: "Advanced Topics",
    icon: "🔴",
    description: "Dive into how secret codes keep data safe and uncover what really goes on in the hidden parts of the web.",
    colorClass: "bg-rose-500/10 border-rose-500/20 text-rose-500",
    buttonClass: "bg-rose-600 hover:bg-rose-500 text-white",
    topics: [
      "Cryptography Basics Pt. 1 (Symmetric)",
      "Cryptography Basics Pt. 2 (Asymmetric)",
      "Dark Web Basics"
    ]
  }
];

import FinalQuizView from './FinalQuizView';

export default function AcademyView({ profile, updateProfile, theme = 'dark', onActiveStateChange }: AcademyViewProps) {
  const [selectedModule, setSelectedModule] = useState<typeof MODULES[0] | null>(null);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [courseToStart, setCourseToStart] = useState<Course | null>(null); // For the objectives popup
  const [showFinalQuiz, setShowFinalQuiz] = useState<boolean>(false);
  const [courseMedia, setCourseMedia] = useState<{ [key: string]: { audioSrc?: string, videoSrc?: string } }>({});

  useEffect(() => {
    async function fetchCourseMedia() {
      try {
        const q = query(collection(db, 'courseMedia'));
        const snapshot = await getDocs(q);
        const mediaMap: any = {};
        snapshot.forEach(doc => {
          mediaMap[doc.id] = doc.data();
        });
        setCourseMedia(mediaMap);
      } catch (e) {
        console.error("Failed to fetch course media", e);
      }
    }
    fetchCourseMedia();
  }, []);

  const getEnrichedCourse = (course: Course): Course => {
    return {
      ...course,
      audioSrc: courseMedia[course.id]?.audioSrc || course.audioSrc,
      videoSrc: courseMedia[course.id]?.videoSrc || course.videoSrc,
    };
  };

  useEffect(() => {
    if (onActiveStateChange) {
      onActiveStateChange(activeCourse !== null || showFinalQuiz);
    }
  }, [activeCourse, showFinalQuiz, onActiveStateChange]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [activeCourse, selectedModule, showFinalQuiz]);

  const handleTopicClick = (topicName: string) => {
    // Attempt to find matching course by title
    const matchedCourse = COURSES.find(c => c.title === topicName);
    if (matchedCourse) {
      if (matchedCourse.learningObjectives && matchedCourse.learningObjectives.length > 0) {
        setCourseToStart(getEnrichedCourse(matchedCourse));
      } else {
        setActiveCourse(getEnrichedCourse(matchedCourse));
      }
    }
  };

  const IconComponent = ({ name, size = 20, className = "" }: { name: string, size?: number, className?: string }) => {
    const Icon = (Icons as any)[name];
    if (!Icon) return null;
    return <Icon size={size} className={className} />;
  };

  return (
    <>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={`space-y-6 font-sans pb-12 ${theme === 'light' ? 'text-slate-800' : 'text-[#E2E8F0]'}`}
      >
        <motion.div variants={itemVariants}>
          <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>AegisAcademy Course Center</h2>
          <p className={`text-xs mt-1 ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>Accelerated crash courses designed to empower Nigerian students.</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedModule ? (
            <motion.div 
              key="grid"
              variants={containerVariants} 
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex flex-col gap-6"
            >
              {MODULES.map((module, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className={`group border rounded-3xl p-8 shadow-sm hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden ${
                    theme === 'light' 
                      ? 'bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:border-slate-300' 
                      : 'bg-gradient-to-br from-[#161B22] to-[#0D0F12] border-[#30363D] hover:border-[#4b5563]'
                  }`}
                >
                  {/* Background decorative glow */}
                  <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl group-hover:opacity-[0.04] transition-opacity pointer-events-none ${
                    theme === 'light' ? 'bg-slate-400 opacity-[0.05]' : 'bg-white opacity-[0.02]'
                  }`}></div>
                  
                  <div className="flex flex-col mb-4 relative z-10">
                    <span className={`w-fit text-[10px] font-black border px-3 py-1.5 rounded-full uppercase flex items-center gap-2 mb-4 tracking-wider shadow-sm ${module.colorClass}`}>
                      {module.icon} {module.level}
                    </span>
                    <h3 className={`text-2xl font-black tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>{module.title}</h3>
                  </div>

                  <div className="flex-1 flex flex-col justify-center relative z-10 my-2">
                    <p className={`text-lg font-serif italic transition-colors leading-relaxed ${
                      theme === 'light' ? 'text-slate-600 group-hover:text-slate-900' : 'text-[#8B949E] group-hover:text-[#c9d1d9]'
                    }`}>
                      "{module.description}"
                    </p>
                  </div>

                  <div className={`pt-6 mt-4 border-t relative z-10 ${theme === 'light' ? 'border-slate-200' : 'border-[#30363D]/50'}`}>
                    <button
                      onClick={() => setSelectedModule(module)}
                      className={`w-full md:w-1/3 text-center py-3 rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer ${module.buttonClass}`}
                    >
                      Enter Module
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="module-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`max-w-xl mx-auto border rounded-2xl p-6 shadow-sm space-y-6 ${
                theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#161B22] border-[#30363D]'
              }`}
            >
              {/* Header */}
              <div className={`flex items-center pb-3 border-b ${theme === 'light' ? 'border-slate-200' : 'border-[#30363D]'}`}>
                <button
                  onClick={() => setSelectedModule(null)}
                  className={`px-3 py-1 border rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    theme === 'light' 
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200' 
                      : 'bg-[#30363D] hover:bg-[#30363D]/80 text-[#F0F6FC] border-[#30363D]'
                  }`}
                >
                  ← Academy Catalog
                </button>
              </div>

              <div className="space-y-4 pt-2">
                <h3 className={`text-lg font-bold ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>Course Topics</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {selectedModule.topics.map((topic, tIdx) => {
                    const course = COURSES.find(c => c.title === topic);
                    if (!course) return null;

                    const isCompleted = profile.completedCourses?.includes(course.id);

                    return (
                      <div 
                        key={tIdx} 
                        onClick={() => handleTopicClick(topic)}
                        className={`w-full md:w-[calc(50%_-_8px)] group relative overflow-hidden flex flex-col p-5 rounded-2xl border transition-all duration-300 cursor-pointer hover:-translate-y-1 shadow-sm hover:shadow-md ${
                          theme === 'light' 
                            ? 'bg-white border-slate-200 hover:border-blue-300' 
                            : 'bg-[#161B22] border-[#30363D] hover:border-[#58A6FF]/60'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className={`p-2.5 rounded-xl ${
                            theme === 'light' ? 'bg-slate-100 text-blue-600' : 'bg-[#30363D]/50 text-[#58A6FF]'
                          }`}>
                            <IconComponent name={course.iconName} size={22} />
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              theme === 'light' ? 'bg-orange-100 text-orange-700' : 'bg-orange-500/20 text-orange-400'
                            }`}>
                              +{course.xpWorth} XP
                            </span>
                            {isCompleted && (
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 ${
                                theme === 'light' ? 'bg-green-100 text-green-700' : 'bg-green-500/20 text-green-400'
                              }`}>
                                <Icons.CheckCircle size={10} /> Completed
                              </span>
                            )}
                          </div>
                        </div>

                        <h4 className={`text-base font-bold mb-2 ${theme === 'light' ? 'text-slate-900 group-hover:text-blue-700' : 'text-[#F0F6FC] group-hover:text-[#58A6FF]'}`}>
                          {course.title}
                        </h4>
                        
                        <p className={`text-xs flex-1 line-clamp-2 ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>
                          {course.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className={`mt-8 pt-6 border-t ${theme === 'light' ? 'border-slate-200' : 'border-[#30363D]'}`}>
                  {(() => {
                    const isAllCompleted = selectedModule.topics.every(topicName => {
                      const matchedCourse = COURSES.find(c => c.title === topicName);
                      return matchedCourse && profile.completedCourses?.includes(matchedCourse.id);
                    });
                    
                    return (
                      <div className="flex flex-col gap-2">
                        <button
                          disabled={!isAllCompleted}
                          onClick={() => setShowFinalQuiz(true)}
                          className={`w-full py-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                            isAllCompleted
                              ? (theme === 'light' 
                                ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md cursor-pointer' 
                                : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md cursor-pointer')
                              : (theme === 'light'
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                : 'bg-[#30363D]/50 text-[#8B949E] cursor-not-allowed')
                          }`}
                        >
                          {isAllCompleted ? <Icons.HelpCircle size={20} /> : <Icons.Lock size={20} />}
                          Final Quiz: {selectedModule.level}
                        </button>
                        {!isAllCompleted && (
                          <p className={`text-center text-xs ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>
                            Complete all courses in this module to unlock the final quiz.
                          </p>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {showFinalQuiz && selectedModule && (
          <FinalQuizView
            key="final-quiz"
            theme={theme}
            moduleLevel={selectedModule.level}
            onClose={() => setShowFinalQuiz(false)}
            onComplete={(earnedXp) => {
              setShowFinalQuiz(false);
              updateProfile((prev) => {
                const xpMultiplier = earnedXp; // Add XP
                return {
                  ...prev,
                  xp: Math.max(0, prev.xp + xpMultiplier)
                };
              });
            }}
          />
        )}

        {activeCourse && (
          <CourseSwipeView
            key="swipe-view"
            course={activeCourse}
            theme={theme}
            onClose={() => setActiveCourse(null)}
            onComplete={(earnedXp, courseId) => {
              setActiveCourse(null);
              // Update profile with XP and record completion
              updateProfile((prev) => {
                const prevCompleted = prev.completedCourses || [];
                const alreadyCompleted = prevCompleted.includes(courseId);
                const nextCompleted = alreadyCompleted ? prevCompleted : [...prevCompleted, courseId];
                const xpToAward = alreadyCompleted ? (earnedXp - activeCourse.xpWorth) : earnedXp;

                return {
                  ...prev,
                  xp: Math.max(0, prev.xp + xpToAward),
                  completedCourses: nextCompleted
                };
              });
            }}
          />
        )}

        {courseToStart && (
          <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 ${theme === 'light' ? 'bg-slate-900/40' : 'bg-[#000000]/60'} backdrop-blur-sm`} onClick={(e) => { if (e.target === e.currentTarget) setCourseToStart(null); }}>
             <motion.div
               initial={{ opacity: 0, scale: 0.95, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 10 }}
               className={`w-full max-w-md rounded-3xl p-6 shadow-2xl border ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#161B22] border-[#30363D]'}`}
             >
               <div className="flex justify-between items-start mb-6">
                 <div className="flex items-center gap-3">
                   <div className={`p-2 rounded-xl ${theme === 'light' ? 'bg-blue-50 text-blue-600' : 'bg-[#30363D] text-[#58A6FF]'}`}>
                     <Icons.Target size={24} />
                   </div>
                   <h3 className={`text-xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>Learning Objectives</h3>
                 </div>
                 <button onClick={() => setCourseToStart(null)} className={`p-2 rounded-full transition-colors ${theme === 'light' ? 'hover:bg-slate-100 text-slate-500' : 'hover:bg-[#30363D] text-[#8B949E]'}`}>
                   <Icons.X size={20} />
                 </button>
               </div>

               <div className={`mb-6 p-4 rounded-xl space-y-3 ${theme === 'light' ? 'bg-slate-50' : 'bg-[#0D0F12]'}`}>
                 <p className={`text-sm font-semibold mb-3 ${theme === 'light' ? 'text-slate-700' : 'text-[#F0F6FC]'}`}>
                   By the end of this module, you will learn:
                 </p>
                 <ul className={`space-y-3 text-sm flex flex-col ${theme === 'light' ? 'text-slate-600' : 'text-[#8B949E]'}`}>
                   {courseToStart.learningObjectives?.map((ob, idx) => (
                     <li key={idx} className="flex gap-2.5">
                       <Icons.CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${theme === 'light' ? 'text-green-500' : 'text-green-400'}`} />
                       <span className="leading-relaxed">{ob}</span>
                     </li>
                   ))}
                 </ul>
               </div>

               <button 
                 onClick={() => {
                   setActiveCourse(courseToStart);
                   setCourseToStart(null);
                 }}
                 className={`w-full py-3.5 rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 ${
                   theme === 'light' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-[#58A6FF] hover:bg-[#3182CE] text-white'
                 }`}
               >
                 Start Module <Icons.ChevronRight size={18} />
               </button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
