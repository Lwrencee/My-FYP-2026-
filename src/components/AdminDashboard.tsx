import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, Users, Trophy, Settings, Loader2, Save, LogOut, UploadCloud, Copy, Check, ShieldAlert } from 'lucide-react';
import { collection, getDocs, doc, getDoc, setDoc, orderBy, query } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, auth, storage, handleFirestoreError, OperationType } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { COURSES } from '../data';

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [aboutText, setAboutText] = useState("Aegis Academy offers tactical training and simulations for young cyber defenders.");
  const [helpText, setHelpText] = useState("If you need assistance, please consult the academy handbook or reach out to an instructor.");
  const [savingSettings, setSavingSettings] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  // Upload state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(-1);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [mediaType, setMediaType] = useState<'audio' | 'video'>('audio');

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch leaderboard / all users
        const q = query(collection(db, 'users'), orderBy('xp', 'desc'));
        const qs = await getDocs(q);
        const fetchedUsers = qs.docs.map(d => ({ id: d.id, ...d.data() }));
        setUsers(fetchedUsers);

        // Fetch settings
        const settingsDoc = await getDoc(doc(db, 'appSettings', 'general'));
        if (settingsDoc.exists()) {
          const data = settingsDoc.data();
          if (data.aboutText) setAboutText(data.aboutText);
          if (data.helpText) setHelpText(data.helpText);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    try {
      await setDoc(doc(db, 'appSettings', 'general'), {
        aboutText,
        helpText
      }, { merge: true });
      alert("Settings saved successfully.");
    } catch (e) {
      console.error(e);
      alert("Failed to save settings.");
    } finally {
      setSavingSettings(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.reload();
  };

  const handleFileUpload = async () => {
    if (!uploadFile || !selectedCourseId) return;
    
    // Create a reference to the file in Firebase Storage
    const storageRef = ref(storage, `course_media/${Date.now()}_${uploadFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, uploadFile);

    setUploadProgress(0);
    setUploadedUrl(null);
    setUploadError(null);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload error:", error);
        setUploadError(error.message || "Failed to upload the file. Make sure Firebase Storage is enabled in your project.");
        setUploadProgress(-1);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        
        // Save to Firestore
        try {
          const docId = selectedCourseId;
          const currentDocRef = doc(db, 'courseMedia', docId);
          await setDoc(currentDocRef, {
            [mediaType + 'Src']: downloadURL
          }, { merge: true });
          
          setUploadedUrl(downloadURL);
        } catch(e: any) {
          console.error("Error saving to firestore", e);
          setUploadError(`Storage upload succeeded, but Firestore update failed: ${e.message || "Permission denied."}`);
        }
        
        setUploadProgress(-1);
        setUploadFile(null);
      }
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0F12] flex items-center justify-center text-[#8B949E]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0F12] text-[#E2E8F0] p-6 lg:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#30363D] pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center rounded-xl text-indigo-400 font-bold shadow-sm">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-[#F0F6FC]">Welcome, Admin</h1>
              <p className="text-sm text-[#8B949E] font-medium">Aegis Academy Global Overwatch</p>
            </div>
          </div>
          <button 
            onClick={() => setShowSignOutConfirm(true)}
            className="px-4 py-2 bg-[#F85149]/10 hover:bg-[#F85149]/20 text-[#F85149] border border-[#F85149]/30 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main User List / Leaderboard */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center bg-[#161B22] p-4 rounded-xl border border-[#30363D]">
              <div className="flex items-center gap-2 text-[#58A6FF]">
                <Users className="w-5 h-5" />
                <h2 className="text-lg font-bold text-[#F0F6FC]">Registered Cadets</h2>
              </div>
              <div className="text-sm font-black text-[#8B949E] px-3 py-1 bg-[#0D0F12] rounded-lg border border-[#30363D]">
                Total: {users.length}
              </div>
            </div>

            <div className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden shadow-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#30363D] bg-[#0D0F12]">
                    <th className="p-4 text-xs font-bold text-[#8B949E] uppercase">Defenders</th>
                    <th className="p-4 text-xs font-bold text-[#8B949E] uppercase text-right">Level</th>
                    <th className="p-4 text-xs font-bold text-[#8B949E] uppercase text-right">XP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#30363D]">
                  {users.map((u, i) => (
                    <tr key={u.id} className="hover:bg-[#0D0F12]/50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-[#F0F6FC]">{u.defenderName || 'Unknown'}</div>
                        <div className="text-[10px] text-[#8B949E]">{u.university}</div>
                      </td>
                      <td className="p-4 text-right">
                        <span className="inline-block px-2.5 py-1 bg-[#30363D] rounded-full text-xs font-black text-[#F0F6FC]">
                          Lvl {u.level || 1}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <span className="font-mono text-xs font-bold text-amber-500">
                          {u.xp || 0} XP
                        </span>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={3} className="p-8 text-center text-[#8B949E] text-sm">
                        No registered users yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Settings / Configuration Panel */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 bg-[#161B22] p-4 rounded-xl border border-[#30363D] text-[#3FB950]">
              <Settings className="w-5 h-5" />
              <h2 className="text-lg font-bold text-[#F0F6FC]">Platform Settings</h2>
            </div>
            
            <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-5 space-y-5 shadow-xl">
              
              <div>
                <label className="block text-xs font-bold text-[#8B949E] uppercase tracking-wider mb-2">
                  About Section Text
                </label>
                <textarea 
                  value={aboutText}
                  onChange={(e) => setAboutText(e.target.value)}
                  rows={4}
                  className="w-full bg-[#0D0F12] border border-[#30363D] rounded-lg p-3 text-sm text-[#F0F6FC] focus:outline-none focus:border-[#58A6FF] resize-none"
                  placeholder="Information about the platform..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8B949E] uppercase tracking-wider mb-2">
                  Help Section Text
                </label>
                <textarea 
                  value={helpText}
                  onChange={(e) => setHelpText(e.target.value)}
                  rows={4}
                  className="w-full bg-[#0D0F12] border border-[#30363D] rounded-lg p-3 text-sm text-[#F0F6FC] focus:outline-none focus:border-[#58A6FF] resize-none"
                  placeholder="Need help..."
                />
              </div>

              <button
                onClick={handleSaveSettings}
                disabled={savingSettings}
                className="w-full py-3 bg-[#3FB950] hover:bg-[#3FB950]/90 disabled:opacity-50 text-[#0D0F12] rounded-lg text-sm font-black flex justify-center items-center gap-2 transition-all"
              >
                {savingSettings ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Publish Changes
              </button>
            </div>

            <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-5 space-y-2">
               <h3 className="text-sm font-bold text-[#F0F6FC]">Admin Instructions</h3>
               <p className="text-xs text-[#8B949E] leading-relaxed">
                 You are logged in as the global administrator. You have read access to all user profiles and write access to global platform configurations. Changes to the platform settings will immediately reflect in the users' Profile tabs.
               </p>
            </div>

            {/* Media Uploader Section */}
            <div className="flex items-center gap-2 bg-[#161B22] p-4 rounded-xl border border-[#30363D] text-[#BC8CFF] mt-6">
              <UploadCloud className="w-5 h-5" />
              <h2 className="text-lg font-bold text-[#F0F6FC]">Media Uploader</h2>
            </div>

            <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-5 space-y-5 shadow-xl">
              <p className="text-xs text-[#8B949E] leading-relaxed">
                Upload your course media (Audio / Video) completely remotely! Select the specific course, then upload the file. It will automatically sync to the academy app.
              </p>
              
              <div className="space-y-4">
                {/* Select Course */}
                <div>
                  <label className="block text-xs font-bold text-[#8B949E] uppercase tracking-wider mb-2">
                    1. Select Course
                  </label>
                  <select 
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    className="w-full bg-[#0D0F12] border border-[#30363D] rounded-lg p-3 text-sm text-[#F0F6FC] focus:outline-none focus:border-[#58A6FF]"
                  >
                    <option value="">-- Choose Course --</option>
                    {COURSES.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>

                {/* Media Type & Upload */}
                {selectedCourseId && (
                  <div className="pt-2 border-t border-[#30363D]">
                    <label className="block text-xs font-bold text-[#8B949E] uppercase tracking-wider mb-2">
                      2. Media Type
                    </label>
                    <div className="flex gap-4 mb-4">
                      <label className="flex items-center gap-2 text-sm text-[#F0F6FC]">
                        <input type="radio" name="mediaType" checked={mediaType === 'audio'} onChange={() => setMediaType('audio')} />
                        Audio
                      </label>
                      <label className="flex items-center gap-2 text-sm text-[#F0F6FC]">
                        <input type="radio" name="mediaType" checked={mediaType === 'video'} onChange={() => setMediaType('video')} />
                        Video
                      </label>
                    </div>

                    <input 
                      type="file" 
                      accept={mediaType === 'audio' ? "audio/*" : "video/*"}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setUploadFile(e.target.files[0]);
                        }
                      }}
                      className="block w-full text-sm text-[#8B949E] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-[#30363D] file:text-[#F0F6FC] hover:file:bg-[#8B949E] hover:file:text-[#0D0F12] transition-all mb-4"
                    />
                    <button
                      onClick={handleFileUpload}
                      disabled={!uploadFile || uploadProgress >= 0}
                      className="w-full py-2 bg-[#58A6FF] hover:bg-[#58A6FF]/90 disabled:opacity-50 disabled:bg-[#30363D] disabled:text-[#8B949E] text-[#0D0F12] rounded-lg text-sm font-black transition-all flex items-center justify-center gap-2"
                    >
                      {uploadProgress >= 0 ? `Uploading & Saving... ${Math.round(uploadProgress)}%` : 'Upload and Link Media'}
                    </button>
                  </div>
                )}
              </div>

              {uploadProgress >= 0 && (
                <div className="w-full bg-[#0D0F12] rounded-full h-2 border border-[#30363D] overflow-hidden">
                  <div className="bg-[#58A6FF] h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              )}

              {uploadError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Upload Failed</p>
                    <p className="text-xs text-red-300">{uploadError}</p>
                  </div>
                </div>
              )}

              {uploadedUrl && (
                <div className="p-3 bg-[#0D0F12] border border-[#30363D] rounded-lg flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#3FB950] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-[#3FB950] uppercase tracking-wider">Save Successful</p>
                    <p className="text-xs text-[#8B949E]">The media has been linked to the selected course section.</p>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Sign Out Confirmation Modal */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 bg-[#0D0F12]/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#161B22] border border-[#30363D] rounded-2xl max-w-sm w-full p-6 shadow-2xl relative space-y-6 flex flex-col text-center text-[#E2E8F0]"
          >
            <div className="mx-auto w-12 h-12 bg-[#F85149]/10 rounded-full flex items-center justify-center mb-2">
              <LogOut className="w-6 h-6 text-[#F85149]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#F0F6FC] mb-2">Sign Out</h3>
              <p className="text-sm text-[#8B949E] px-4">
                Are you sure you want to sign out of the Admin Dashboard?
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSignOutConfirm(false)}
                className="flex-1 py-3 px-4 bg-transparent border border-[#30363D] hover:bg-[#30363D]/50 text-[#C9D1D9] font-bold text-sm rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3 px-4 bg-[#F85149] hover:bg-[#F85149]/90 text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
