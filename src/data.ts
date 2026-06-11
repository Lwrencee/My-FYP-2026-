/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, ChecklistTask, LeaderboardEntry, PhishingScenario, BoardCell, Badge } from './types';

export const AVATARS = [
  { id: '1', name: 'Cyber Knight', emoji: '⚔️', color: 'bg-[#58A6FF]/10 border-[#58A6FF]/40 text-[#58A6FF]' },
  { id: '2', name: 'Cypher Rogue', emoji: '🥷', color: 'bg-[#BC8CFF]/10 border-[#BC8CFF]/40 text-[#BC8CFF]' },
  { id: '3', name: 'Falcon Sentry', emoji: '🦅', color: 'bg-amber-500/10 border-amber-500/30 text-amber-400' },
  { id: '4', name: 'Matrix Sentry', emoji: '🟢', color: 'bg-[#3FB950]/10 border-[#3FB950]/40 text-[#3FB950]' },
  { id: '5', name: 'Neon Valkyrie', emoji: '🌸', color: 'bg-[#FF79C6]/10 border-[#FF79C6]/40 text-[#FF79C6]' },
  { id: '6', name: 'Void Overseer', emoji: '👁️', color: 'bg-[#F85149]/10 border-[#F85149]/40 text-[#F85149]' },
  { id: '7', name: 'Chronos Mech', emoji: '🐢', color: 'bg-teal-500/10 border-teal-500/30 text-teal-400' },
  { id: 's', name: 'Archon Crown', emoji: '👑', color: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' }
];

export const NIGERIAN_UNIVERSITIES = [
  'Caleb University',
  'University of Lagos (UNILAG)',
  'Lagos State University (LASU)',
  'Yaba College of Technology (YABATECH)',
  'Covenant University',
  'Babcock University',
  'University of Ibadan (UI)',
  'Obafemi Awolowo University (OAU)',
  'Federal University of Technology, Akure (FUTA)',
  'University of Nigeria, Nsukka (UNN)',
  'Ahmadu Bello University (ABU)',
  'Pan-Atlantic University',
  'Landmark University',
  'Veritas University, Abuja',
  'Independent Sentry (Not Yet in University)',
  'Other'
];

export const BADGES: Badge[] = [
  {
    id: 'badge-welcome',
    name: 'Defender Initiate',
    description: 'Began the cyber hygiene quest by deploying a unique Defender profile.',
    iconName: 'Sparkles',
    criteria: 'Create and save your custom Defender Name and Avatar.',
    category: 'general'
  },
  {
    id: 'badge-phish-perfect',
    name: 'Phish Detective',
    description: 'Analyzed all phishing emails correctly in the Phish Finder module.',
    iconName: 'Search',
    criteria: 'Achieve a 100% score in the Phish Finder game.',
    category: 'games'
  },
  {
    id: 'badge-password-shield',
    name: 'Fortress Keymaker',
    description: 'Constructed an unbreakable passphrase that defeated brute force hackers.',
    iconName: 'KeyRound',
    criteria: 'Build a password with over 5,000 years crack-time in the strength command.',
    category: 'games'
  },
  {
    id: 'badge-snake-survivor',
    name: 'Server Racer',
    description: 'Successfully reached the end zone in the Race to Servers module.',
    iconName: 'Trophy',
    criteria: 'Win the Race to Servers mapping game.',
    category: 'games'
  },
  {
    id: 'badge-cryptic-pulse',
    name: 'Pulse Decoder',
    description: 'Successfully decoded heavy packets in the Cryptic Pulse mini-game.',
    iconName: 'Terminal',
    criteria: 'Decode 5 or more data packets correctly.',
    category: 'games'
  },
  {
    id: 'badge-first-course',
    name: 'Knowledge Seeker',
    description: 'Completed your first Aegis Academy theoretical training.',
    iconName: 'GraduationCap',
    criteria: 'Pass any 1 Academy course.',
    category: 'academy'
  },
  {
    id: 'badge-first-task',
    name: 'Action Taker',
    description: 'Proactively checked off a real-world defensive security posture task.',
    iconName: 'CheckCircle',
    criteria: 'Complete any 1 task on the Cyber Checklist.',
    category: 'checklist'
  },
  {
    id: 'badge-level-5',
    name: 'Rising Guardian',
    description: 'Reached Level 5 in the Aegis Sentinel ranks.',
    iconName: 'Flame',
    criteria: 'Gain enough XP to achieve Level 5 status.',
    category: 'general'
  },
  {
    id: 'badge-level-10',
    name: 'Elite Vanguard',
    description: 'Reached Level 10 in the Aegis Sentinel ranks.',
    iconName: 'Award',
    criteria: 'Gain enough XP to achieve Level 10 status.',
    category: 'general'
  },
  {
    id: 'badge-checklist-complete',
    name: 'Shield Enforcer',
    description: 'Assessed and activated simple defense measures in real life.',
    iconName: 'ShieldCheck',
    criteria: 'Complete all 8 simple action tasks in the Cyber Checklist.',
    category: 'checklist'
  },
  {
    id: 'badge-academy-scholar',
    name: 'Grand Academician',
    description: 'Passed all Beginner, Intermediate, and Advanced cybersecurity certification quizzes.',
    iconName: 'GraduationCap',
    criteria: 'Verify and pass all 9 academy crash course quizzes.',
    category: 'academy'
  },
  {
    id: 'badge-100-percent',
    name: 'Absolute Fortress',
    description: 'The ultimate distinction. 100% completion in all research criteria blocks.',
    iconName: 'Shield',
    criteria: 'Complete 100% of all games, checklists, and academy courses.',
    category: 'general'
  }
];

export const COURSES: Course[] = [
  {
    id: 'course-intro-cyber',
    title: 'Intro to Cybersecurity',
    level: 'beginner',
    description: 'Learn the core principles of digital safety and why it matters.',
    iconName: 'Shield',
    xpWorth: 100,
    audioSrc: '/Intro_To_Cyber_Security (1).mp3',
    videoSrc: '/Intro_To_Cyber_Security (1).mp4',
    learningObjectives: [
      'Define cybersecurity and its three fundamental pillars: Confidentiality, Integrity, and Availability (the CIA triad).',
      'Why students are targeted by automated hackers, even if they aren’t billionaires.',
      'Quick steps you can take right now to make your personal accounts safe.'
    ],
    lessons: [
      {
        id: 'intro-cyber-1',
        title: 'Introduction',
        duration: '1 min',
        content: `Welcome to the Academy, cadet! Let’s lay the foundation for your digital defense. Cybersecurity simply means protecting your devices, networks, and data from digital criminals who want to steal, alter, or block your information.`
      },
      {
        id: 'intro-cyber-1-2',
        title: 'Explanation',
        duration: '1 min',
        content: `Instead of heavy computer science jargon, cybersecurity can be explained through these three fundamental pillars to keep your accounts secure:
* **_Confidentiality_**: Keeping your secrets private.
* **_Integrity_**: Keeping your data accurate and untampered with.
* **_Availability_**: Ensuring you always have access.

In the tech space, we call this the **CIA triad.**`,
        illustrationType: 'cia-triad'
      },
      {
        id: 'intro-cyber-2',
        title: 'Explanation',
        duration: '2 min',
        content: `Think of your smartphone in terms of your digital campus life.
* **_Confidentiality_** is your FaceID or Screen Lock—keeping _aproko_ friends from snooping in your WhatsApp or sensitive photos.
* **_Integrity_** ensures no one sneakily alters your bank receipts or assignment files before the lecturer gets them.
* **_Availability_** means your phone doesn’t crash when you're at the school gate trying to show your school fees receipt.
\n\nIf one pillar falls, your system is insecure!`
      },
      {
        id: 'intro-cyber-3',
        title: 'Retention Check',
        duration: '1 min',
        content: `To make sure you were paying attention, let's test you a bit:`,
        interactiveCheck: {
          question: `We went through the 3 core security concepts i.e., the CIA triad. What does I stand for?`,
          options: [
            'Internet',
            'Integrity',
            'Identification',
            'Information'
          ],
          correctOptionIndex: 1,
          successMessage: `_Gbam! Your head dey there._ \n\nIntegrity means your data is accurate and hasn't been modified by a hacker.`,
          failureMessage: `_Oya, pause! You dey confuse matter._ \n\nThe correct answer is B (Integrity). It ensures your information remains accurate and completely untampered with.`,
          xpReward: 20
        }
      },
      {
        id: 'intro-cyber-4',
        title: 'Why It Matters',
        duration: '1 min',
        content: `A lot of Nigerian undergraduates look at hackers in movies and think, "Who am I that anyone would want to hack me? I don't have billions in my account." _My friend, change that mindset o!_ \n\nAccording to research, a massive **63% of Nigerian university students** have already fallen victim to at least one form of cyber-attack. 

The biggest mistake is assuming a hacker sits down to target you manually. _No be so!_ Modern hackers use automated tools that scan the entire internet 24/7, looking for any vulnerable device or account. \n\nThese bots don't care if you are a billionaire or a broke student; if your virtual door is unlocked, they will slide in.`,
        illustrationType: 'bot-attack'
      },
      {
        id: 'intro-cyber-4-2',
        title: 'Real-World Consequences',
        duration: '1 min',
        content: `If an attacker gains unauthorized access to your digital life, the consequences are chaotic. A malicious actor can steal your WhatsApp account and send messages to your parents claiming you’re in urgent trouble and need money. \n\nEven worse, if you fall for a fake online giveaway, fraudsters can empty your Bank account in minutes. Attackers don't always target big corporations; they target anyone who leaves their virtual doors unlocked.`
      },
      {
        id: 'intro-cyber-5',
        title: 'What You Can Do',
        duration: '2 min',
        content: `You don’t need an IT degree to harden your personal digital security. Here are simple things you can do right now:

* **Use Passphrases**: Use 4 or 5 random words with symbols (e.g., MomsJollofIsTheBest1!). Easy to remember, but hard for a computer to guess.

* **Lock Doors with Multi-Factor Authentication (MFA)**: Activate Two-Step Verification on WhatsApp, banking, and social apps immediately. This ensures that even if someone steals your password, they still cannot log in without a temporary code sent directly to your phone.

* **Shine Your Eye on Public Wi-Fi**: Never connect to free Wi-Fi without a password or a padlock icon next to it. Person fit use am log into your backend and steal your info!

* **Update Apps Regularly**: Update your apps regularly. Those updates contain vital security patches that fix hidden security issues. If you need to save data (which most of us do), focus on system updates and the core apps you use the most.`,
        illustrationType: 'security-measures'
      },
      {
        id: 'intro-cyber-6',
        title: 'Summary',
        duration: '1 min',
        content: `In conclusion, cybersecurity isn't about becoming a tech professional; it's about building consistent, protective digital habits. By understanding the **_CIA triad_** and acknowledging that automated threats make everyone a target, you can protect your campus and financial life from sudden disruption.

**Reflection Question**: Look at your current passwords for your school portal, social media, and banking. If a bot attacks right now, will your digital door stand strong, or are you leaving the keys in the lock?`
      }
    ],
    quiz: {
      id: 'quiz-intro-cyber',
      xpWorth: 100,
      questions: []
    }
  },
  {
    id: 'course-phishing-smishing',
    title: 'Phishing/Smishing Fundamentals',
    level: 'beginner',
    description: 'Learn to identify deceptive messages, fake links, and social traps.',
    iconName: 'Search',
    xpWorth: 100,
    audioSrc: '/Phishing_Smishing_Basics (1).mp3',
    videoSrc: '/Phishing_Smishing_Basics (1).mp4',
    learningObjectives: [
      'Spot the difference between email scams, text message scams, and highly targeted attacks.',
      'Know why these scams are getting harder to spot.',
      'Understand the risks of falling for a scam, like losing money or having your account stolen.',
      'Learn simple steps to protect yourself and report any attacks.'
    ],
    lessons: [
      {
        id: 'phishing-1',
        title: 'Introduction',
        duration: '1 min',
        illustrationType: 'phishing-email',
        content: `Welcome to your next lesson, cadet. Today, we are looking at the oldest trick in the cybercriminal handbook: **_Phishing_** and its annoying sibling, **_Smishing_**. \n\nIn plain terms, phishing is when cybercriminals send fraudulent messages disguised as trusted organizations to trick you into revealing sensitive data like passwords, OTPs, or bank pins. When this digital trap happens via SMS or WhatsApp instead of email, it is called **_Smishing_** (SMS Phishing).`
      },
      {
        id: 'phishing-2',
        title: 'Explanation',
        duration: '2 min',
        content: `A critical sub-type is **Spear Phishing**—a laser-focused attack where hackers research your specific details (like your name, department, or hostel) to make the lie look 100% genuine.

Think of it like a fake Instagram vendor selling an impossibly cheap "London-used" iPhone. They use a handle like @Jewel_Gadgets_Store_Official, copy real reviews, and look completely authentic. But the moment you click their bio link to pay, your money vanishes. Phishing is exactly like that fake profile—it copies a trusted brand to make you bite the hook.`
      },
      {
        id: 'phishing-3',
        title: 'Retention Check',
        duration: '1 min',
        content: `Let’s see if you were listening. Try this quiz:`,
        interactiveCheck: {
          question: `If a hacker sends a customized fake email specifically addressed to you with your actual department and student ID number, what type of attack is it?`,
          options: [
            'Broad Phishing',
            'Smishing',
            'Spear Phishing',
            'Vishing'
          ],
          correctOptionIndex: 2,
          successMessage: `_Sharp! You sabi._ \n\nSpear phishing is a targeted attack that uses your personal details to lower your guard.`,
          failureMessage: `_Ah, look ground o!_ \n\nThe correct answer is C. Smishing is strictly via SMS, while Vishing is via a voice message or a call.`,
          xpReward: 20
        }
      },
      {
        id: 'phishing-4',
        title: 'Why It Matters',
        duration: '2 min',
        illustrationType: 'scam-warning',
        content: `Many students think phishing is easy to spot because they expect terrible grammar or obvious warning signs. _E no always dey obvious o!_ \n\nOne research paper revealed that **over 56% of users** click a phishing link at some point because attackers are getting incredibly smart with their lures. Another study highlights that people are highly vulnerable to these traps during high-stress periods, like just before exams, or while doing a lot of work.

Automated software bots blast these tailored messages to thousands of students simultaneously.`
      },
      {
        id: 'phishing-4-2',
        title: 'Real-World Consequences',
        duration: '1 min',
        illustrationType: 'smishing-text',
        content: `They can craft a fake university portal login page that looks identical to the real one, claiming your emergency continuous assessment marks or semester results are out. If you type your credentials, they will hijack your portal or take over your linked WhatsApp account to scam your family for money. \n\nWorse, they can impersonate a GTB or Access Bank support agent over SMS, claiming your account is blocked. If you panic and click, _omo, your allowance fit don go like that._`
      },
      {
        id: 'phishing-5',
        title: 'What You Can Do',
        duration: '2 min',
        content: `Block these digital hooks completely by building these habits today:

* **Inspect the URL Closely**: Hackers copy webpage designs 100%, but they cannot duplicate the exact web address. Watch for typos (like g00gle.com), strange extensions (like .xyz instead of .edu.ng), or extra words. If the root name looks fishy, abort mission!
* **Never Click Under Pressure**: Phishing thrives on false urgency. If an SMS demands immediate action on your Access Bank or GTB account to avoid a block, stop. Use your official banking app independently to check.
* **Treat Random WhatsApp Links as Traps**: If a campus group broadcast promises "Free 20GB Student Data" or "Federal Government Grants," do not click. _Nothing for free in this life, shine your eye!_
* **Report and Delete**: Flag suspicious emails as phishing. Gmail and Truecaller will help block those senders.`
      },
      {
        id: 'phishing-6',
        title: 'Summary',
        duration: '1 min',
        content: `In conclusion, **_Phishing_** and **_Smishing_** are psychological traps designed to exploit your curiosity, greed, or panic. Taking five seconds to pause and inspect the website’s domain name or the sender’s email address is your ultimate shield.

**Reflection Question**: Think of the last time you clicked a link sent to a WhatsApp group chat. Did you actually verify where it came from, or did you just trust it blindly because a classmate forwarded it?`
      }
    ],
    quiz: {
      id: 'quiz-phishing-smishing',
      xpWorth: 100,
      questions: []
    }
  },
  {
    id: 'course-strong-weak-passwords',
    title: 'Strong & Weak Passwords',
    level: 'beginner',
    description: 'Master the science of passphrases to defeat brute force attacks.',
    iconName: 'Key',
    xpWorth: 100,
    audioSrc: '/Strong___Weak_Passwords (1).mp3',
    videoSrc: '/Strong___Weak_Passwords (1).mp4',
    learningObjectives: [
      'What a password is and why it\'s your digital key to your accounts.',
      'How to spot the difference between a weak password and a strong one.',
      'Why password length and using a unique one for every site are the strongest defenses against hackers.',
      'Simple steps to dramatically improve your security right now, including using passphrases and a password manager.'
    ],
    lessons: [
      {
        id: 'passwords-1',
        title: 'Introduction',
        duration: '1 min',
        content: `Welcome to the final lesson in the beginner series. Let's talk about the absolute first line of defense you interact with every single day: **_passwords_**. You already kind of know what a password is. \n\nIn simple terms, a password is a digital key used to verify your identity before granting access to your private accounts & devices. By “key“, I don’t mean what you use to open the door. In cyberspace, a key is anything used to grant you access. A password is a type of digital key.`
      },
      {
        id: 'passwords-1-2',
        title: 'Quick Sidenote',
        duration: '1 min',
        content: `If your phone or laptop does not have a security lock like a password, PIN, fingerprint, etc., _oya, go and do that one sharp sharp_ before moving on with this lesson.`
      },
      {
        id: 'passwords-2',
        title: 'Explanation',
        duration: '2 min',
        illustrationType: 'password-strength',
        content: `When it comes to digital defense, we look at keys in two ways: weak passwords and strong passwords. 

* **Weak Passwords**: These are short and predictable, relying on things like your name, favorite football club, or birthdate. It’s like locking your hostel room with a cheap luggage padlock. Anyone with a basic pair of pliers can snap it in two seconds!

* **Strong Passwords**: These rely on length and randomness to block automated guessing tools. It’s like installing a solid steel door with a key and two bolts. Breaking it takes too much time and effort, forcing a thief to give up.`
      },
      {
        id: 'passwords-3',
        title: 'Retention Check',
        duration: '1 min',
        content: `Let's run through a short quiz:`,
        interactiveCheck: {
          question: `Which of the following attributes makes a password the most secure against modern hacking tools?`,
          options: [
            'Changing it exactly every seven days.',
            'Making it exceptionally long, like a phrase of random words.',
            'Using your childhood nickname and adding "123" at the end.',
            'Using only capital letters.'
          ],
          correctOptionIndex: 1,
          successMessage: `_You sabi!_ \n\nLength beats complexity every single time. A long string of words can completely paralyze hacking tools.`,
          failureMessage: `_No be so._ \n\nRegularly changing a weak password or just adding "123" won't stop an automated attack. The correct answer is B.`,
          xpReward: 20
        }
      },
      {
        id: 'passwords-4',
        title: 'Why It Matters',
        duration: '1 min',
        illustrationType: 'brute-force',
        content: `Many people think adding a single capital letter or an exclamation mark to their password makes their account uncrackable. Think again!
According to data from research papers on password strength analysis, short passwords—even those stuffed with complex symbols—are incredibly easy for computers to crack. \n\nHackers don't sit down and guess your password character by character. Instead, they use automated software bots to test billions of common word combinations and leaked credentials in seconds.`
      },
      {
        id: 'passwords-4-2',
        title: 'Real-World Consequences',
        duration: '1 min',
        content: `If you reuse a weak or basic password across your student portal, your email, and your mobile banking apps, you are walking on thin ice. An automated bot can crack your portal password, and the hacker will immediately try that same combination on your Bank app. \n\nOnce they are inside, they can alter your data, steal your funds, or lock you out of your digital life entirely.`
      },
      {
        id: 'passwords-5',
        title: 'What You Can Do',
        duration: '2 min',
        illustrationType: 'password-manager',
        content: `You can upgrade your security setup right now by adopting these behaviors:

* **Embrace Passphrases**: Instead of complex nonsense like P@$$w0rd1!, combine four or five random words (e.g., MyMumsJollofIsTheBest). It’s easy to visualize, but takes a computer centuries to guess.
* **Stop Recycling Passwords**: Never use the same password twice. If your social media password leaks in a data breach, unique passwords keep your student portal and banking apps completely untouched.
* **Check for Leaks**: Enter your email into a trusted database like [Have I Been Pwned](https://haveibeenpwned.com/). If it flags a leak, change the password for that email immediately.
* **Use a Digital Safe**: Since remembering thirty passphrases is impossible, use an encrypted password manager app or Google Chrome’s built-in password manager to store your unique passwords in one place. (Open the Chrome browser if you have it, and check the settings for Password Manager.)`
      },
      {
        id: 'passwords-6',
        title: 'Summary',
        duration: '1 min',
        content: `In conclusion, your digital keys are only as secure as their length and uniqueness. Moving away from short, predictable words to long, distinct passphrases completely changes the game and takes control away from automated hacking tools.

**Reflection Question**: Look at the passwords protecting your most valuable accounts right now. If a software bot started running combinations against them at a rate of one million guesses per second, would your door stand strong, or would it fly open instantly?`
      },
      {
        id: 'passwords-7',
        title: 'A Game To Try',
        duration: '1 min',
        content: `Want to see how long it would really take a computer to guess your passwords? Head over to the **Password Tester** in the Games section! It's an easy way to understand exactly how strong passphrases protect you from automated hackers.`
      }
    ],
    quiz: {
      id: 'quiz-strong-weak-passwords',
      xpWorth: 100,
      questions: []
    }
  },
  {
    id: 'course-digital-footprints',
    title: 'Digital Footprints',
    level: 'intermediate',
    description: 'Understand the traces you leave online and how to manage them.',
    iconName: 'Footprints',
    xpWorth: 100,
    audioSrc: '/Digital_Footprints (1).mp3',
    videoSrc: '/Digital_Footprints (1).mp4',
    learningObjectives: [
      'Define what a digital footprint is and what makes it permanent.',
      'Differentiate between the two main types of digital footprints: active & passive',
      'Recognize the risks of having a large digital footprint, including targeted attacks and losing future opportunities.',
      'Learn practical steps to audit your online presence and reduce the amount of personal data you leave behind.'
    ],
    lessons: [
      {
        id: 'footprints-1',
        title: 'Introduction',
        duration: '1 min',
        content: `Welcome to the first lesson in the Intermediate series, cadet. I’m sure by now, you have a good grasp on _passwords, phishing, and basic cybersecurity concepts._ Well done! \n\nToday, we will be covering something called ***Digital Footprints***. Every single time you open an app, search for a video, or drop a comment online, you leave a trail behind.`
      },
      {
        id: 'footprints-2',
        title: 'Explanation',
        duration: '2 min',
        illustrationType: 'footprint-types',
        content: `In simple terms, a digital footprint is the permanent history of your activities left behind on the internet. It has two main types:
* **Active Footprint**: Data you intentionally leave behind, like Instagram posts, tweets, and WhatsApp status updates.
* **Passive Footprint**: Data collected behind the scenes without your input, like websites tracking your location, IP address, or browsing cookies.`
      },
      {
        id: 'footprints-2-2',
        title: 'Analogy',
        duration: '1 min',
        content: `Imagine right after a heavy rain downpour. If you walk across the wet pavement, your wet shoes leave highly visible tracks for everyone to see—that's your active footprint. \n\nBut at the same time, the security cameras overhead are recording exactly what time you walked by and what you were wearing without you doing anything—that's your passive footprint. Online, you are always leaving both kinds of tracks, _and anybody fit follow your trail!_`
      },
      {
        id: 'footprints-3',
        title: 'Retention Check',
        duration: '1 min',
        content: `Let's test your retention a bit. Try this quiz:`,
        interactiveCheck: {
          question: `If an online shopping website tracks your location and remembers what products you looked at, what kind of data trail is it?`,
          options: [
            'Active digital footprint',
            'Passive digital footprint',
            'Temporary digital trail',
            'Encrypted history'
          ],
          correctOptionIndex: 1,
          successMessage: `_Your head dey there._ \n\nPassive footprints are created automatically in the background without your explicit action.`,
          failureMessage: `_No be so, comrade._ \n\nIf you didn't intentionally post or type it, it cannot be active. The correct answer is B.`,
          xpReward: 20
        }
      },
      {
        id: 'footprints-4',
        title: 'Why It Matters',
        duration: '1 min',
        illustrationType: 'data-scraping',
        content: `Many students assume their digital trail doesn't matter because they aren't public figures or influencers. But cybercriminals don't just look for credit card numbers; they look for data patterns to exploit.

Automated data-scraping bots constantly comb through public social media accounts to harvest personal information. One research paper focused on college campuses highlighted how students frequently underestimate how much an attacker can learn about them just by aggregating their public likes, comments, and location check-ins.`
      },
      {
        id: 'footprints-4-2',
        title: 'Real-World Consequences',
        duration: '2 min',
        content: `If a malicious actor maps out your digital footprint, they can see which bank you complain to on Twitter, where you hang out during weekends, and who your closest friends are. They can then use these exact details to launch a terrifyingly accurate spear-phishing attack (remember that? We talked about it in the beginner section) against you. They could compromise your WhatsApp account or build a fake profile to scam your family. 

Furthermore, future employers and scholarship boards now routinely use automated tools to screen your historical digital footprint. One reckless comment from three years ago _fit cost you life-changing opportunity._`
      },
      {
        id: 'footprints-5',
        title: 'What You Can Do',
        duration: '2 min',
        illustrationType: 'privacy-settings',
        content: `Take control of your data trail right now by following these steps:
* **The Billboard Test**: Before uploading a photo or hot take, pause. Ask: "Would I be comfortable seeing this on a massive billboard?" _If no, no post am!_
* **Audit Privacy Settings**: Change your Instagram, TikTok, and WhatsApp settings from "Public" to "Friends Only" to stop automated scraping bots from harvesting your life.
* **Google Yourself**: Search your full name in quotes (e.g., "Your Name"). If old accounts or sensitive data appear, delete them immediately.
* **Clear Passive Tracks**: Regularly clear browser cookies (Ask ChatGPT to show you how). Turn off background location access for unnecessary apps like mobile games to minimize what you leak!`
      },
      {
        id: 'footprints-6',
        title: 'Summary',
        duration: '1 min',
        content: `In conclusion, your digital footprint is a permanent record that forms your online reputation and cybersecurity risk profile. By limiting your active public posts and blocking passive tracking, you drastically reduce the ammunition a hacker can use against you.

**Reflection Question**: If a stranger spent thirty minutes analyzing everything you have ever posted, liked, or commented on across the internet, how accurately could they guess your bank, your current location, and your daily routine?`
      }
    ],
    quiz: {
      id: 'quiz-digital-footprints',
      xpWorth: 100,
      questions: []
    }
  },
  {
    id: 'course-social-engineering',
    title: 'Social Engineering',
    level: 'intermediate',
    description: 'Discover how hackers exploit human psychology and urgency.',
    iconName: 'Users',
    xpWorth: 100,
    audioSrc: '/Social_Engineering (1).mp3',
    videoSrc: '/Social_Engineering (1).mp4',
    learningObjectives: [
      'Define social engineering and how it manipulates human psychology.',
      'Identify common social engineering techniques like Vishing, Pretexting, and Spoofing.',
      'Understand how emotional triggers like panic are used to bypass logical reasoning.',
      'Apply practical habits to pause, verify, and protect yourself against psychological attacks.'
    ],
    lessons: [
      {
        id: 'social-eng-1',
        title: 'Introduction',
        duration: '1 min',
        content: `Welcome to your next lesson, cadet. Today, we are unpacking the ultimate weapon in a hacker's toolkit: **_Social Engineering_**. This might be the first time hearing that term, but the concept is easy to grasp. \n\nIn plain terms, social engineering is the psychological manipulation of people into performing actions or revealing confidential information. Instead of wasting weeks trying to write complex malware to hack your phone to get sensitive info, cybercriminals simply hack your mind to get you to open the door (reveal the sensitive information) yourself. Think of it as premium psychological trickery.`
      },
      {
        id: 'social-eng-2',
        title: 'Explanation',
        duration: '2 min',
        illustrationType: 'social-manipulation',
        content: `Here are some types of manipulation hackers rely on:
* **Phishing & Smishing**: Fake emails (Phishing) or SMS texts (Smishing) designed to trick you into revealing sensitive data or sending money.
* **Vishing (Voice Phishing)**: Phishing over any voice medium (like phone or video calls). Scammers calling to trick people—_they’ve called you before, shey?_ That's Vishing.
* **Pretexting**: Inventing a fabricated story to gain trust. For example, someone pretending to be an MTN agent calling to "confirm SIM details."
* **Spoofing**: Faking identities, like masking a phone number to show "Access Bank Support" or mirroring your university login portal.
* **Persuasion**: Using strategic communication to influence your emotions, making an insecure action feel completely normal.`
      },
      {
        id: 'social-eng-3',
        title: 'Analogy',
        duration: '1 min',
        content: `To sneak into the faculty exam control room, a guy doesn't bring axes to break the burglar-proof. Instead, he wears a sharp suit, holds a university file jacket, and approaches the secretary looking like a serious executive assistant. He drops the HOD's full name and spins an urgent story.
If the secretary doesn't verify the claim, they will melt under the professional pressure and open the door. That right there is social engineering—manipulating the entire system by deceiving the human, completely without software or technical force.`
      },
      {
        id: 'social-eng-4',
        title: 'Retention Check',
        duration: '1 min',
        content: `Let's see if you were listening. Try this quiz:`,
        interactiveCheck: {
          question: `When a cybercriminal calls you, creates a highly urgent fake story, and convinces you to read out your account number, what specific technique are they primarily utilizing?`,
          options: [
            'Smishing',
            'Vishing',
            'Active Digital Footprinting',
            'Spoofing'
          ],
          correctOptionIndex: 1,
          successMessage: `_Gbam!_ \n\nThe criminal is trying to trick you over a phone call. So the right answer is B.`,
          failureMessage: `_At all o!_ \n\nRecall that Vishing (Voice Phishing) is when a scammer tries to trick people over a voice medium (e.g., a phone call). The correct answer is B.`,
          xpReward: 20
        }
      },
      {
        id: 'social-eng-5',
        title: 'Why It Matters',
        duration: '1 min',
        content: `Why should you care? Because any cybercriminal who knows exactly how to exploit your brain's natural decision-making pathways can trick you into giving them your passwords or PINs. \n\nAccording to behavioral science data, human actions are driven by a mix of Capability, Opportunity, and Motivation. Motivation is critical here because it dictates whether a person wants to or needs to perform a specific action. Most attackers don’t have the strength to try to figure out your password. They just convince you to give it to them by manipulating your immediate motivation using an emotional trigger.`
      },
      {
        id: 'social-eng-5-2',
        title: 'Real-World Consequences',
        duration: '1 min',
        content: `Imagine getting a call or an alert claiming that your Access Bank app has a critical security leak and will be permanently blocked in three minutes unless you verify your identity by reading out a code sent to your phone. \n\nBecause they trigger instant panic (the emotional trigger), your brain completely drops logical reasoning. You follow their voice and drop that token code, and they clear out your account before you even drop the phone.`
      },
      {
        id: 'social-eng-6',
        title: 'What You Can Do',
        duration: '2 min',
        illustrationType: 'verify-identity',
        content: `To secure yourself against these mind games, you have to use specific behavior change techniques to rewrite how you react to digital alerts:
* **Build a 60-Second Pause Habit**: When a message demands urgent action regarding money or passwords, deliberately force yourself to pause for one full minute. Social engineering relies on panic; breaking the time loop breaks the spell. 
* **Never Share OTPs & PINs**: Never share your OTP, password, or PIN with anyone over the phone. Real banks never ask for this. (For example, Sterling Bank explicitly states they will never ask for your PIN.) 
* **Verify via an Independent Channel**: If you get a scary alert from "IT Support" or "Customer Care," hang up. Contact official channels directly—go to the campus department or call your bank's official line. Always verify! 
* **Reduce the Trigger Opportunity**: Block and report spam numbers in your WhatsApp and phone settings immediately to keep scammers out of your workspace.`
      },
      {
        id: 'social-eng-7',
        title: 'Summary',
        duration: '1 min',
        content: `In conclusion, social engineering is a psychological attack that targets human behavior rather than device software. By recognizing that attackers use fake urgency and emotional panic to exploit you, you can use structured habits to pause, verify, and lock down your digital life.

**Reflection Question**: Think about the last time you received an extremely urgent text message or call. Did you take a moment to calm down and look at the situation objectively, or did your emotions instantly take the wheel?`
      }
    ],
    quiz: {
      id: 'quiz-social-engineering',
      xpWorth: 100,
      questions: []
    }
  },
  {
    id: 'course-mfa',
    title: 'Multi-Factor Authentication (MFA)',
    level: 'intermediate',
    description: 'Establish absolute protection beyond simple passcodes.',
    iconName: 'ShieldCheck',
    xpWorth: 100,
    audioSrc: '/Multi-Factor_Authentication (1).mp3',
    videoSrc: '/Multi-Factor_Authentication (1).mp4',
    learningObjectives: [
      'Understand what Multi-Factor Authentication (MFA) is and why it\'s essential for online safety.',
      'Identify the three simple ways to prove your identity for security.',
      'Recognize the serious risks of relying only on a password for your sensitive accounts.',
      'Learn practical, immediate steps to turn on extra security for apps like WhatsApp and banking services.'
    ],
    lessons: [
      {
        id: 'mfa-1',
        title: 'Introduction',
        duration: '1 min',
        content: `Welcome to the final lesson in the intermediate series. Today, we are looking at the heavy-duty security guard of the digital world: **Multi-Factor Authentication (MFA)**. This can also come in the form of Two-Factor Authentication (2FA) or Two-Step Verification. You might have seen this in some of your app settings. \n\nIn plain terms, MFA is a security system that requires you to provide multiple, distinct pieces of evidence to verify your identity before granting access to your account.`
      },
      {
        id: 'mfa-2',
        title: 'Explanation',
        duration: '2 min',
        illustrationType: 'mfa-factors',
        content: `We are all used to just entering our passwords to get verified. But MFA takes this a step further by forcing you to prove your identity using more than just your password.
MFA uses any combination of these three fundamental pillars of identity proof:

* **Something you know**: Information you memorize, like your standard password, PIN, or passphrase.
* **Something you have**: A physical item you possess, such as your smartphone, a registered SIM card, or an authenticator app.
* **Something you are**: Your unique biological data (biometrics), which includes your fingerprint or FaceID profile.`
      },
      {
        id: 'mfa-3',
        title: 'Analogy',
        duration: '1 min',
        content: `Imagine trying to enter an exclusive VIP club lounge. Knowing the secret password at the gate is no longer enough. The bouncer will demand your physical invite card (something you have) and verify your face against the guest photo (something you are) before letting you in.
If an impersonator shows up with just the password, _the bouncer go shift the person to one side immediately, no stories!_ MFA is that bouncer for your accounts—even if someone steals your password, they still can't get in.`
      },
      {
        id: 'mfa-4',
        title: 'Retention Check',
        duration: '1 min',
        content: `Let's see if you were listening. Try this quiz:`,
        interactiveCheck: {
          question: `When you receive a temporary 6-digit token code via SMS on your phone to complete a login, which specific authentication factor category does that text message fall under?`,
          options: [
            'Something you know',
            'Something you are',
            'Something you have',
            'Something you inherit'
          ],
          correctOptionIndex: 2,
          successMessage: `_Sharp! Your head dey there._ \n\nThe text message relies entirely on you physically possessing the registered SIM card or phone hardware that receives the code.`,
          failureMessage: `_Nice try, comrade, but you no get am._ \n\nA text message isn't a secret in your brain or a biometric feature. The correct answer is C.`,
          xpReward: 20
        }
      },
      {
        id: 'mfa-5',
        title: 'Why It Matters',
        duration: '1 min',
        content: `Passwords and PINs should be enough, right? Why add the _wahala_ of another extra setup? Yes, it can seem like extra stress, but if you only have one line of defense, that means if someone guesses your passwords manually, tricks you into giving them, or buys your password from the dark web (yes, your passwords could be on sale somewhere right now), then they have full access already. \n\nBut imagine after they use your password, the app or system asks them for a fingerprint scan. _Abi, will they come and find you to steal your finger?_`
      },
      {
        id: 'mfa-5-2',
        title: 'Why It Matters',
        duration: '1 min',
        content: `According to advanced research on human cyber risk and defensive architectures, technical safeguards like multi-factor authentication provide incredibly robust, definitive protection against credential theft. \n\nWhile training and education can occasionally slip up due to human error, enforcing MFA acts as a rigid barrier that stops automated hacker tools dead in their tracks.`
      },
      {
        id: 'mfa-5-3',
        title: 'Real-World Consequences',
        duration: '1 min',
        content: `If you leave MFA turned off on your university portal (if it’s available), your WhatsApp account, or your mobile banking apps, you are leaving your entire academic and financial life hanging by a single, fragile string. \n\nIf an automated bot steals your reused password, an attacker can log directly into your bank app and empty your monthly allowance instantly. Alternatively, they can hijack your WhatsApp profile to launch scams against people close to you.`
      },
      {
        id: 'mfa-6',
        title: 'What You Can Do',
        duration: '2 min',
        illustrationType: 'authenticator-app',
        content: `You can use the behavioral science principle of establishing secure digital defaults by going into your settings and locking your accounts right now:

* **Lock WhatsApp with Two-Step Verification**: Open your WhatsApp, Go to Settings -> Account -> Two-Step Verification, and create a 6-digit PIN. This ensures that a fraudster cannot clone your account without this PIN. 
* **Harden Banking Apps with Biometrics**: If your phone supports it, activate fingerprint or FaceID scans on your financial apps. Never read out an OTP to anyone over the phone, no matter how professional they sound! 
* **Migrate to App-Based Authenticators**: Switch your primary accounts from SMS codes to apps like Google Authenticator to generate real-time codes locally for extra security. This completely blocks "SIM swap" scams. Click here to find out more about App Authenticators and how to use them.
* **Enforce MFA as Your Personal Standard**: Treat any service handling your private data that lacks multi-factor options with severe suspicion. Turn on MFA today, _before we hear story that touches the heart._`
      },
      {
        id: 'mfa-7',
        title: 'Summary',
        duration: '1 min',
        content: `Multi-factor authentication is a powerful digital defense available to everyone. Passwords can be phished, leaked, or stolen, but adding a secondary validation layer—like an authenticator app token or biometric scan—completely breaks the automated attack chain at the boundary.

**Reflection Question**: Look through your phone apps right now. If someone managed to steal your master password this very minute, how many of your personal, financial, and academic accounts would remain safely locked behind a secondary MFA wall?`
      }
    ],
    quiz: {
      id: 'quiz-mfa',
      xpWorth: 100,
      questions: []
    }
  },
  {
    id: 'course-crypto-symmetric',
    title: 'Cryptography Basics Pt. 1 (Symmetric)',
    level: 'advanced',
    description: '(Coming Soon) Dive into secure key encryption, standard codes, and the challenge of safe key exchange.',
    iconName: 'Lock',
    xpWorth: 100,
    audioSrc: '/Symmetric_Encryption (1).mp3',
    videoSrc: '/Symmetric_Encryption (1).mp4',
    learningObjectives: [
      'What "cryptography" means and why people use it for secret communication.',
      'How data is turned into an unreadable mess (encryption) and back again (decryption) using a single key.',
      'The definition of symmetric encryption and the biggest security challenge when using it.',
      'Simple, practical steps you can take to use encryption to secure your personal data in everyday apps.'
    ],
    lessons: [
      {
        id: 'crypto-sym-1',
        title: 'Introduction',
        duration: '1 min',
        content: `Welcome to the Advanced Topics! We will be beginning this series with ***Cryptography***. Cryptography is the science of secure communication. It comes from two Greek words: *Kryptos* (hidden) and *Graphy* (to write)—literally, "secret writing."\n\nHistorically, war generals encrypted messages so enemies couldn't read them, leaving the King to decrypt the actual message. In modern tech, cryptography is divided into Symmetric and Asymmetric. Today, we are covering ***Symmetric Encryption/Decryption.***`
      },
      {
        id: 'crypto-sym-2',
        title: 'Explanation',
        duration: '2 min',
        illustrationType: 'symmetric-keys',
        content: `Encryption means transforming readable data (Plaintext) into an unreadable mess to prevent people from reading the message (Ciphertext). Decryption means turning that mess back into the original message. Symmetric means the system uses a single secret key to both encrypt and decrypt the information.\n\n* “I am a boy” (Plaintext) gets turned into:\n* “SXC!tT2#S” (ciphertext), and vice versa.\n* You use one key to encrypt the message, and the same key to decrypt it.`
      },
      {
        id: 'crypto-sym-2-2',
        title: 'Analogy',
        duration: '1 min',
        content: `It’s like a hostel locker with a single physical key. To secure your laptop, you lock it with that key. If your roommate needs to get in while you are in class, you must safely get that key to them. If you hide it under the mat and someone steals it, your locker is compromised. That is symmetric encryption—fast when locked, but the moment you share that single key, _anything fit sup!_`
      },
      {
        id: 'crypto-sym-3',
        title: 'Retention Check',
        duration: '1 min',
        content: `Let's see if you were listening. Try this quiz:`,
        interactiveCheck: {
          question: `What is the primary challenge associated with using symmetric encryption over the Internet?`,
          options: [
            'It takes too long to scramble small text files.',
            'You must find a secure way to share the secret key with the receiver.',
            'It requires a constant connection to the server to lock files.',
            'Computers cannot process symmetric keys without special hardware.'
          ],
          correctOptionIndex: 1,
          successMessage: `_Gbam!_ \n\nSince symmetric encryption uses one shared key to lock and unlock data, safely delivering that key without interception is the main issue.`,
          failureMessage: `_Ah! At all o._ \n\nSymmetric encryption is fast and runs locally. The real problem is sharing the key without someone stealing it. The correct answer is B.`,
          xpReward: 20
        }
      },
      {
        id: 'crypto-sym-4',
        title: 'Why It Matters',
        duration: '2 min',
        content: `You interact with encryption more often than you might know. When you back up your photos and videos, or chat with a friend on WhatsApp, all of that data is being stored on someone else’s computer. It is actually very important that the information is encrypted (or scrambled) so that no one else can read or view the data that belongs to you.\n\nSymmetric Encryption uses only one digital key (like a password) that only 2 people know (i.e., the sender and the receiver). That key must be kept safe by both parties. Because if not, _wahala go dey._`
      },
      {
        id: 'crypto-sym-5',
        title: 'What You Can Do',
        duration: '2 min',
        content: `You don't need to manually encrypt anything—your apps handle that. But you should practice these secure behaviors right now:\n\n* **Turn on Encrypted Backups**: In WhatsApp, go to Settings -> Chats -> Chat Backup and enable End-to-End Encrypted Backups. This secures your backup with a password so nobody can read it if stolen.\n* **Practice Safe Key Exchange**: If you lock a folder with a password (using WinRAR or 7-Zip) to email a partner, never put the password in that same email thread. Send it via a separate channel, like a voice note.\n* **Steer Clear of Modified Apps**: Avoid downloading unverified, cloned apps like GBWhatsApp or WhatsApp Plus. They route data through insecure servers, stripping away official encryption protections.`
      },
      {
        id: 'crypto-sym-6',
        title: 'Summary',
        duration: '1 min',
        content: `In conclusion, symmetric encryption is a fast, powerful tool that scrambles your data using a single shared secret key. While the defensive wall it builds is mathematically unbreakable, its safety depends entirely on your behavioral habits in protecting and transferring that secret key.\n\n**Reflection Question**: Think about the personal files and backups sitting in your cloud accounts right now. If a security breach happened to the people keeping your information today, are your files independently encrypted, or are you trusting the house lock to protect your most private secrets?`
      },
      {
        id: 'crypto-sym-7',
        title: 'A Game To Try',
        duration: '1 min',
        content: `If you want to experiment with this idea in the app, try out the ***“Operation: Cryptic Pulse“*** game. It uses a Symmetric Encryption system called the Caesar Cipher. Have fun!`
      }
    ],
    quiz: {
      id: 'quiz-crypto-symmetric',
      xpWorth: 100,
      questions: []
    }
  },
  {
    id: 'course-crypto-asymmetric',
    title: 'Cryptography Basics Pt. 2 (Asymmetric)',
    level: 'advanced',
    description: '(Coming Soon) Understand public and private key pairs, secure handshakes, and how they protect web traffic.',
    iconName: 'KeyRound',
    xpWorth: 100,
    learningObjectives: [
      'Understand the core difference between symmetric and asymmetric key systems.',
      'Identify how public and private keys operate together to keep web traffic secure.',
      'Recognize the dangers of automated network attacks that bypass connection rules.',
      'Apply smart consumer safety habits to protect your device\'s communication channels.'
    ],
    lessons: [
      {
        id: 'crypto-asym-1',
        title: 'Introduction',
        duration: '1 min',
        content: `Welcome to your next lesson, cadet. In our last session, we looked at ***symmetric encryption*** and saw the massive stress behind the "key distribution problem"—the struggle of safely sharing one single key over the whole internet. \n\nToday, we are stepping into the elite penthouse of digital cryptography to see how math completely solved that issue. We are diving into the world of ***Asymmetric Encryption.***`
      },
      {
        id: 'crypto-asym-2',
        title: 'Explanation',
        duration: '2 min',
        illustrationType: 'asymmetric-keys',
        content: `Asymmetric encryption is a security system that does not rely on a single shared key. Instead, it uses two mathematically linked keys that work as a team:
* **The Public Key**: This key is out in the open for the whole world to see. Anyone on the internet can use it to lock (encrypt) a message meant specifically for you.
* **The Private Key**: This key stays strictly hidden inside your device’s secure hardware. It is the only key in existence that can unlock (decrypt) what your open public key locks.`
      },
      {
        id: 'crypto-asym-2-2',
        title: 'Analogy',
        duration: '2 min',
        content: `Think of an anonymous messaging link (like NGL) on an Instagram bio. That public link acts like your Public Key. Anyone on the timeline can click it, type a secret confession, and send it. Once sent, the message is locked; no other user can see inside.
\n\nYour private login credentials serve as your Private Key. Only you hold those details, meaning only you can unlock the backend dashboard to read the messages. _Aproko eyes fit see your public link, but if dem no hold your private backend login, dem go just dey look outside from gate!_ You never have to broadcast your private password across the network just to receive secure messages.`
      },
      {
        id: 'crypto-asym-3',
        title: 'Retention Check',
        duration: '1 min',
        content: `Let's see if you were listening. Try this quiz:`,
        interactiveCheck: {
          question: `In asymmetric encryption, if a banking server wants to send a secure, encrypted balance alert that only your smartphone can open, which key must the server use to lock the data?`,
          options: [
            'The server’s private key',
            'Your public key',
            'A shared password string',
            'Your private key'
          ],
          correctOptionIndex: 1,
          successMessage: `_Sharp! You sabi._ \n\nThe server locks the data using your open public key because only your matching, local private key can open it.`,
          failureMessage: `_Ah, no be so o!_ \n\nThe server cannot use your private key because it doesn't have access to it, and using its own private key is not secure. The correct answer is B.`,
          xpReward: 20
        }
      },
      {
        id: 'crypto-asym-4',
        title: 'Why It Matters',
        duration: '2 min',
        content: `You don’t need to be a tech genius or a cybersecurity expert to care about internet safety. Every time you log into your school portal to check results or send money on your Bank app, a hidden digital padlock is working behind the scenes to protect your live connection.`
      },
      {
        id: 'crypto-asym-4-2',
        title: 'Real-World Consequences',
        duration: '2 min',
        illustrationType: 'hacker-mitm',
        content: `The real danger comes from hackers using automated tools to hijack the path your data travels. If you connect to a free, unsecured campus Wi-Fi, the hacker can act like a fake middleman. It secretly attempts to swap out the legitimate public keys of your bank or school portal with a clone public key belonging to the attacker. \n\nIf your device blindly accepts that fake key, the hacker sits right between you and the website, quietly intercepting your login details and copying your data in real time.`
      },
      {
        id: 'crypto-asym-5',
        title: 'What You Can Do',
        duration: '2 min',
        content: `Lock down your communication channels right now by applying these behavioral habits:
* **Banish Modded Apps Completely**: Delete altered applications like GBWhatsApp or WhatsApp Plus. These cloned apps deliberately strip away certified asymmetric infrastructure, routing your private keys and chats through unverified external servers.
* **Obey Browser Certificate Warnings**: If your browser flags an invalid security certificate or screams "Your connection is not private," do not click proceed anyway. The asymmetric handshake failed, and an attacker might be spoofing the connection. Abort mission immediately!
* **Confirm HTTPS and the Padlock**: Before typing passwords into any portal or bank website, shine your eye on the address bar. Ensure the URL starts with ***https://*** (not http. 's' means secure) and displays a closed padlock icon, proving your phone verified the server's real public key.`
      },
      {
        id: 'crypto-asym-6',
        title: 'Summary',
        duration: '1 min',
        content: `Asymmetric encryption is the crown jewel of web safety, pairing an open public key for locking data with a secret private key for unlocking it. It removes the risk of sending sensitive passwords across the web, but its strength depends entirely on you using official application channels and respecting your system's built-in connection warnings.
\n\n**Reflection Question**: Think about the cloned or modified apps currently running on your phone for "extra styling features." Are those visual tweaks worth letting an unknown external server middleman your device's encrypted connections?`
      }
    ],
    quiz: {
      id: 'quiz-crypto-asymmetric',
      xpWorth: 100,
      questions: []
    }
  },
  {
    id: 'course-dark-web',
    title: 'Dark Web Basics',
    level: 'advanced',
    description: '(Coming Soon) Uncover what really goes on in the hidden parts of the web, and how your data might end up there.',
    iconName: 'Globe',
    xpWorth: 100,
    learningObjectives: [
      'Differentiate clearly between the Surface Web, the Deep Web, and the Dark Web.',
      'Understand the conceptual framework of onion routing and network obfuscation.',
      'Recognize how stolen student data is traded within unindexed anonymous marketplaces.',
      'Apply operational containment habits to protect your daily digital profiles from advanced exposure.'
    ],
    lessons: [
      {
        id: 'dark-web-1',
        title: 'Introduction',
        duration: '1 min',
        content: `Congratulations on making it to the final lesson in the Academy. You should be proud of yourself for coming this far. We have already learned about passwords, social engineering tricks, and encryption. \n\nNow, it is time to map out the entire landscape of the internet itself, including the hidden neighborhoods where automated threats and data dumps often live. Let’s look past the movie myths and break down **The Dark Web.**`
      },
      {
        id: 'dark-web-2',
        title: 'Explanation',
        duration: '2 min',
        illustrationType: 'dark-web-layers',
        content: `To understand the internet, you must view it in three distinct layers:\n\n* **The Surface Web**: The visible tip of an iceberg. This includes any public website you can easily find using a standard search engine like Google without needing a password, like Wikipedia or a news article.\n* **The Deep Web**: The massive, hidden portion below the surface. It isn't sinister; it’s simply the private, password-protected web. Every time you log in to check your email, view your Access Bank statement, or check university grades, you are using the Deep Web.\n* **The Dark Web**: A very small, isolated corner of the Deep Web that intentionally hides ownership and hosting. You cannot use Chrome or Safari here; you need specialized software like the Tor browser. It is used for both intense privacy and illegal activities.`
      },
      {
        id: 'dark-web-2-2',
        title: 'Analogy',
        duration: '2 min',
        content: `To understand onion routing (_no be real onion we dey talk about o_), imagine you want to send a private note to your friend across a lecture hall without getting up. You seal the note inside three nested envelopes and hand it to your neighbor.\n\nThat student peels off the outermost layer, which reveals only the name of the next specific person to pass it to. Each person in the chain only knows who handed them the envelope and who gets it next, but never the original source. By the time it reaches your friend, your identity is completely masked. Normal browsing is walking straight across the hall; the Dark Web is moving through this masked envelope chain.`
      },
      {
        id: 'dark-web-3',
        title: 'Retention Check',
        duration: '1 min',
        content: `Let's see if you were listening. Try this quiz:`,
        interactiveCheck: {
          question: `What major characteristic separates a standard Deep Web page from a Dark Web page?`,
          options: [
            'Deep Web pages require credit card payments, while the Dark Web is entirely free.',
            'Deep Web pages include standard private accounts hidden behind normal login walls, while the Dark Web requires specialized browsers and unindexed protocols to access.',
            'The Deep Web can only be accessed at night, while the Surface Web runs during the day.',
            'There is no mathematical or structural difference between them.'
          ],
          correctOptionIndex: 1,
          successMessage: `_You be correct person!_ \n\nThe Deep Web holds your regular bank apps and university portals, while the Dark Web relies on custom hidden networks like Tor to function.`,
          failureMessage: `_Look am well well o!_ \n\nThe correct answer is B. Special protocols make the dark web a separate entity from your daily private web screens.`,
          xpReward: 20
        }
      },
      {
        id: 'dark-web-4',
        title: 'Why It Matters',
        duration: '2 min',
        content: `Many people believe that using "Incognito Mode" on their browser makes them completely anonymous online. _It doesn’t o!_ \n\nIncognito mode only makes sure your browsing activity doesn’t save on your local device history; it does not hide your online activity or delete it from the internet. The dark web is where online activity is truly hidden.\nAnother reason why this matters is that the dark web is a critical threat vector for students because it serves as the primary dumping ground for leaked credentials (passwords, logins, etc).`
      },
      {
        id: 'dark-web-5',
        title: 'Real-World Consequences',
        duration: '2 min',
        illustrationType: 'credential-leak',
        content: `When global apps or university databases experience a security breach, cybercriminals use automated scripts to package millions of stolen usernames and passwords into "combo lists." These lists are uploaded straight to anonymous dark web marketplaces for malicious actors to trade.\n\nIf you reuse the same weak password across your school portal, WhatsApp, and banking apps, an automated system can cross-reference your leaked credentials. A hacker who has never met you can buy your compromised data off an unindexed forum and log directly into your financial apps to clear your allowance.`
      },
      {
        id: 'dark-web-6',
        title: 'Summary',
        duration: '1 min',
        content: `In conclusion, the dark web is a hidden sub-layer of unindexed cyberspace that utilizes multi-layered encryption to protect network anonymity. While it provides premium privacy for whistleblowers, it also serves as a trade hub for stolen credentials.\n\n**Reflection Question**: If a background automated tool searched the dark web marketplaces for your primary email address right now, would it find your active passwords sitting inside a leaked database folder?`
      }
    ],
    quiz: {
      id: 'quiz-dark-web',
      xpWorth: 100,
      questions: []
    }
  }
];

export const CHECKLIST_TASKS: ChecklistTask[] = [
  {
    id: 'chk-app-lock',
    title: 'Lock Down Individual Apps',
    description: 'Stops others from opening your private apps when you leave your phone unattended around your room.',
    whyItMatters: 'This setting stops friends, roommates, or anyone from opening private spaces on your phone (like your photos, notes, or messages) if you leave your device lying around or if someone is going through your phone.',
    rewardXp: 100,
    category: 'mobile',
    interactiveGuide: [
      'Step 1: Open your phone\'s main Settings app.',
      'Step 2: Scroll down to the Privacy or Security section (or simply search for App Lock in the search bar)',
      'Step 3: Tap on App Lock',
      'Step 4: Select the specific apps you want to lock up.',
      'Step 5: Choose a unique fingerprint or independent PIN to secure them.'
    ]
  },
  {
    id: 'chk-hide-notifications',
    title: 'Hide Lock Screen Notification Previews',
    description: 'Shields private WhatsApp messages and banking OTP codes from showing up on your lock screen.',
    whyItMatters: 'It completely shields private WhatsApp text messages and banking OTP code previews from showing up on your display while your phone is sitting face-up, where other people can see it.',
    rewardXp: 100,
    category: 'mobile',
    interactiveGuide: [
      'Step 1: Open your phone\'s system Settings.',
      'Step 2: Tap on Notifications.',
      'Step 3: Select Lock Screen Notifications.',
      'Step 4: Choose the option that says Hide Sensitive Content or Don\'t Show Previews.'
    ]
  },
  {
    id: 'chk-mifi-config',
    title: 'Change Your MiFi Default Name and Password',
    description: 'Changing default factory names prevents people from looking up your device model to find your password.',
    whyItMatters: 'Leaving the default Mifi name tells everyone near your room exactly what model device you use (e.g MTN DF457S5). This makes it incredibly easy for people to go online and look up passwords for your model name and leech your expensive data plans for free.',
    rewardXp: 100,
    category: 'mobile',
    interactiveGuide: [
      'Step 1: Connect your phone/laptop to your local MiFi network.',
      'Step 2: Open your mobile browser (such as Chrome or Safari).',
      'Step 3: Type your MiFi’s management IP address (found on the inside sticker, usually 192.168.0.1) into the URL bar and hit Enter.',
      'Step 4: Log in using the default admin details (password is usually admin).',
      'Step 5: Navigate to the Wi-Fi Settings menu tab.',
      'Step 6: Delete the default name written inside the SSID input box.',
      'Step 7: Type in a custom, creative network name of your choice.',
      'Step 8: Clear out the old password in the Wi-Fi Password/Key box.',
      'Step 9: Type in a strong, fresh security password.',
      'Step 10: Click the Apply or Save button.'
    ]
  },
  {
    id: 'chk-mifi-limit',
    title: 'Limit Max Connected Devices on Your MiFi',
    description: 'A hard cap limits connections and blocks unauthorized access even if someone steals or guesses your Wi-Fi password.',
    whyItMatters: 'Even if someone secretly steals or guesses your brand-new Wi-Fi password, this hard cap blocks them from connecting. If you set the limit to exactly 2 devices (like your phone and your laptop), the network door slams shut against any 3rd device trying to sneak in.',
    rewardXp: 100,
    category: 'mobile',
    interactiveGuide: [
      'Step 1: Log into your MiFi management dashboard via your web browser.',
      'Step 2: Navigate to the Advanced Settings or Device Management menu.',
      'Step 3: Locate the input field labeled Maximum Allowed Connections (or Max Stations).',
      'Step 4: Delete the default factory number (which is usually set to 10 or 32).',
      'Step 5: Type your exact preferred minimum number of personal devices (e.g., 2).',
      'Step 6: Click the Save button to activate the limit.'
    ]
  },
  {
    id: 'chk-wa-2sv',
    title: 'Turn On WhatsApp Two-Step Verification',
    description: 'Stops remote scammers from hijacking your account with trick group upgrade codes and scamming your contacts.',
    whyItMatters: 'It completely destroys the ability of remote scammers to hijack your account via trick group upgrade codes. It saves you from that painful, awkward text conversation explaining that a random fraudster is using your profile to beg your contacts for urgent money.',
    rewardXp: 100,
    category: 'account',
    interactiveGuide: [
      'Step 1: Open the WhatsApp application.',
      'Step 2: Tap the three dots in the upper right corner to open the menu.',
      'Step 3: Tap on Settings.',
      'Step 4: Select Account.',
      'Step 5: Tap on Two-Step Verification.',
      'Step 6: Tap the Turn On button.',
      'Step 7: Type in a secret 6-digit PIN code.'
    ]
  },
  {
    id: 'chk-bank-bio',
    title: 'Activate Biometric Security on Financial Apps',
    description: 'A secondary biometric lock guarantees bad actors cannot launch banking apps to steal cash or view your balance.',
    whyItMatters: 'Even if a bad actor bypasses your main lock screen while you are distracted, this secondary wall guarantees they cannot launch banking apps (like OPay, PalmPay, or GTBank) to move your cash or peep your balance.',
    rewardXp: 100,
    category: 'mobile',
    interactiveGuide: [
      'Step 1: Launch your primary mobile banking or payment application.',
      'Step 2: Tap on the Me, Profile, or Account section tab.',
      'Step 3: Open the Security Settings menu link.',
      'Step 4: Find the Biometric Login or Fingerprint Unlock switch toggle.',
      'Step 5: Toggle the switch to Enabled.'
    ]
  },
  {
    id: 'chk-google-mfa',
    title: 'Secure Your Google Account with MFA',
    description: 'MFA prevents attackers from accessing your Gmail, portal credentials, and documents even if your password leaks elsewhere.',
    whyItMatters: 'Your Gmail handles all your portal credentials, personal documents, and assignment backups. Enabling Multi-Factor Authentication means even if a password leak happens on a random website, an attacker cannot break in without a validation prompt popping up directly on your phone screen.',
    rewardXp: 100,
    category: 'account',
    interactiveGuide: [
      'Step 1: Open your mobile Gmail app.',
      'Step 2: Tap your circular profile photo in the top right corner.',
      'Step 3: Tap the button that says Manage Your Google Account.',
      'Step 4: Swipe horizontally across the layout headers and select the Security tab.',
      'Step 5: Scroll down to the sub-header named How you sign in to Google.',
      'Step 6: Tap on 2-Step Verification.',
      'Step 7: Follow the guided on-screen wizard to register your active phone number.'
    ]
  },
  {
    id: 'chk-software-update',
    title: 'Enable Automatic iOS/Android OS Updates',
    description: 'Ensures your phone seamlessly installs emergency security patches from Apple/Google to block known hacker exploits.',
    whyItMatters: 'Cybercriminals write automated scripts that specifically scan for outdated phones missing recent patches. Enabling automatic updates ensures you get life-saving security fixes while you sleep.',
    rewardXp: 100,
    category: 'mobile',
    interactiveGuide: [
      'Step 1: Open your phone\'s main Settings application.',
      'Step 2: Tap on General (or System).',
      'Step 3: Open the Software Update section.',
      'Step 4: Locate Automatic Updates (or Smart Updates) and toggle it to ON.'
    ]
  }
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [];

export const PHISHING_SCENARIOS: PhishingScenario[] = [
  // ==========================================
  // LEVEL 1: DOMAIN TYPO CHECK (5 tasks)
  // Focus: Sender address character spellings
  // ==========================================
  {
    id: 'level-1-task-1',
    sender: 'Netflix Support',
    senderEmail: 'security@netfl1x-billing.com',
    subject: 'Your membership is on hold',
    body: 'Please verify your payment details immediately or your service will terminate.',
    isPhishing: true,
    explanation: 'Have a close look at the email address sender! It uses the number "1" instead of the letter "i" in "netfl1x-billing.com". Scammers make these tiny spelling mistakes to trick you.',
    difficulty: 'easy',
    clues: [
      'Spelling mistake in the name: "netfl1x" uses the number "1" instead of the letter "i".',
      'The address ends with "-billing.com" instead of the real "netflix.com".'
    ],
    baitType: 'General',
    level: 1
  },
  {
    id: 'level-1-task-2',
    sender: 'Netflix',
    senderEmail: 'info@account.netflix.com',
    subject: 'New logins detected on your account',
    body: 'A new streaming console signed into your profile.',
    isPhishing: false,
    explanation: 'This email address is safe. It ends exactly with "netflix.com", which is the official website name of the real business.',
    difficulty: 'easy',
    clues: [
      'Ends with genuine netflix.com.',
      'No spelling mistakes or urgent prompts.'
    ],
    baitType: 'General',
    level: 1
  },
  {
    id: 'level-1-task-3',
    sender: 'Google Security',
    senderEmail: 'admin-alert@g00gle-check.com',
    subject: 'Action Required: Verify Password',
    body: 'Someone accessed your account. Reset your password immediately to secure it.',
    isPhishing: true,
    explanation: 'Look closely at the email address: "g00gle-check.com" uses two zeros "00" instead of the letters "oo" in "google". Scammers use lookalike letters to hide fake websites.',
    difficulty: 'easy',
    clues: [
      'The name is spelled "g00gle" with zeros, not letters.',
      'It finishes with an unofficial "-check.com" domain name.'
    ],
    baitType: 'General',
    level: 1
  },
  {
    id: 'level-1-task-4',
    sender: 'Google Accounts',
    senderEmail: 'no-reply@accounts.google.com',
    subject: 'Security alert: New sign-in',
    body: 'A new login occurred on an Android device. If this was not you, review details.',
    isPhishing: false,
    explanation: 'This notice is perfectly safe. It comes from "accounts.google.com", which is a genuine, official sub-section of Google\'s website.',
    difficulty: 'easy',
    clues: [
      'Ends with official google.com website domain.',
      'No strange letters or number-vowel replacements.'
    ],
    baitType: 'General',
    level: 1
  },
  {
    id: 'level-1-task-5',
    sender: 'Amazon Store',
    senderEmail: 'orders@amazon-sh0pping.com',
    subject: 'Your package is on hold',
    body: 'Delivery failed today. Update your address to reschedule the delivery drop-off.',
    isPhishing: true,
    explanation: 'Look at the address domain: "amazon-sh0pping.com" replaces the letter "o" with a zero "0". This is a common trap to steal your personal coordinate details.',
    difficulty: 'medium',
    clues: [
      'Spelling mistake: "sh0pping" uses the number "0" instead of the letter "o".',
      'Uses multiple hyphens to confuse your visual eye.'
    ],
    baitType: 'General',
    level: 1
  },

  // ==========================================
  // LEVEL 2: TRICKY WEB LINKS (8 tasks)
  // Focus: Link Inspections (4 Email, 4 WhatsApp)
  // ==========================================
  {
    id: 'level-2-task-1',
    sender: 'Chicken Republic Rewards',
    senderEmail: 'rewards@chickenrepubl1c-rewards.net',
    subject: 'Claim your free 2-piece meal voucher!',
    body: 'Congrats! You have won a free 2-piece meal voucher from Chicken Republic. Click here to claim: http://chickenrepubl1c-rewards.net/claim',
    isPhishing: true,
    explanation: 'Notice the spelling mistake "chickenrepubl1c" which uses the number "1" instead of the letter "i". Hackers buy look-alike domain websites to steal your credentials.',
    difficulty: 'easy',
    clues: [
      'The domain name "chickenrepubl1c-rewards.net" has a spelling typo ("1" instead of "i").',
      'Chicken Republic is a local business and does not distribute free meals via external rewards domains.'
    ],
    baitType: 'General',
    level: 2,
    isWhatsApp: false
  },
  {
    id: 'level-2-task-2',
    sender: 'Guaranty Trust Bank',
    senderEmail: 'statements@gtbank.com',
    subject: 'Your e-Statement for May 2026 is ready',
    body: 'Your e-Statement for May 2026 is ready. Log in to your mobile app or secure portal to view: https://www.gtbank.com/statements',
    isPhishing: false,
    explanation: 'This email links to "gtbank.com", which is the official and secure website of Guaranty Trust Bank. There are no spelling errors or suspicious domain variations.',
    difficulty: 'medium',
    clues: [
      'Points to the secure, official, well-known domain gtbank.com.',
      'No coercive threats or strange characters.'
    ],
    baitType: 'Bank Security',
    level: 2,
    isWhatsApp: false
  },
  {
    id: 'level-2-task-3',
    sender: 'Spotify Billing',
    senderEmail: 'billing@spotify-naija-update.com',
    subject: 'Payment Failed: Update your Spotify Premium account',
    body: 'Your Spotify Premium subscription payment failed. Update your card details within 48 hours to keep listening: https://spotify-naija-update.com/billing',
    isPhishing: true,
    explanation: 'The website link takes you to "spotify-naija-update.com" instead of the official "spotify.com" website. Scammers use terms like "naija-update" to localise their tricks pointing to external domains.',
    difficulty: 'medium',
    clues: [
      'Redirects to spotify-naija-update.com which is an unofficial website.',
      'Demands immediate action within 48 hours.'
    ],
    baitType: 'General',
    level: 2,
    isWhatsApp: false
  },
  {
    id: 'level-2-task-4',
    sender: 'Federal Ministry of Education',
    senderEmail: 'bursary@fed-bursary.gov.ng.portal-login.xyz',
    subject: 'Federal Government N50,000 Student Bursary Scheme',
    body: 'Federal Government N50,000 Student Bursary Portal is now open for all Nigerian undergraduate students. Apply here: http://fed-bursary.gov.ng.portal-login.xyz',
    isPhishing: true,
    explanation: 'The address ends with ".portal-login.xyz" rather than the official government educational suffix ".gov.ng". Hackers prepend "fed-bursary.gov.ng" as a subdomain to trick students into looking at the beginning of the link.',
    difficulty: 'hard',
    clues: [
      'The true domain of the link is portal-login.xyz, which uses a cheap domain extension (.xyz) and is unrelated to government websites.',
      'It leverages government branding to gain trust.'
    ],
    baitType: 'Scholarship',
    level: 2,
    isWhatsApp: false
  },
  {
    id: 'level-2-task-5',
    sender: 'Democracy Day Promos',
    senderEmail: '+234 812 345 6789',
    subject: 'Democracy Day Fuel Giveaway',
    body: 'NNPC is giving out 10,000 Liters of Free Fuel to celebrate Democracy Day! Click now to get your voucher before it ends: http://nnpc-free-fuel.com',
    isPhishing: true,
    explanation: 'This is a viral WhatsApp forward scam. NNPC is a national agency and will never organize fuel voucher distribution via unencrypted generic sites hosted on "nnpc-free-fuel.com".',
    difficulty: 'easy',
    clues: [
      'Unofficial and unencrypted "nnpc-free-fuel.com" link.',
      'Offers are too good to be true.'
    ],
    baitType: 'Free Data',
    level: 2,
    isWhatsApp: true
  },
  {
    id: 'level-2-task-6',
    sender: 'MTN Offers',
    senderEmail: '+234 905 889 2132',
    subject: 'MTN Youth Day Celebration',
    body: 'MTN Youth Day Celebration! Get 20GB Free Data valid for 30 days. Click here to activate your sim: http://mtn-20gb-free.data-promo.online',
    isPhishing: true,
    explanation: 'The link points to "data-promo.online" instead of official "mtn.ng" or "mtnonline.com". Hackers use keywords like "mtn-20gb-free" as subdomains to hide the real domain name.',
    difficulty: 'medium',
    clues: [
      'The destination address is data-promo.online which is completely unofficial.',
      'Baits you with free high-value 20GB telecom data.'
    ],
    baitType: 'Free Data',
    level: 2,
    isWhatsApp: true
  },
  {
    id: 'level-2-task-7',
    sender: 'Department Course Representative',
    senderEmail: '+234 703 121 4452',
    subject: 'Departmental Study Group Invite',
    body: 'Join our departmental study group on WhatsApp to share exam past questions: https://chat.whatsapp.com/Kj9x8yL2mN45bOpQ',
    isPhishing: false,
    explanation: 'This link is a completely standard, authentic chat invitation starting with the official domain "chat.whatsapp.com". Perfect safety verification.',
    difficulty: 'medium',
    clues: [
      'Points directly to the official, safe domain chat.whatsapp.com.',
      'Standard peer invite without suspicious external redirects.'
    ],
    baitType: 'General',
    level: 2,
    isWhatsApp: true
  },
  {
    id: 'level-2-task-8',
    sender: 'Alert Messenger',
    senderEmail: '+234 810 440 3311',
    subject: 'Moniepoint Refund Alert',
    body: 'Bro, someone just sent N15,000 to your Moniepoint account by mistake. Confirm the transaction here to reject or accept it: https://moniepoint.verify-transfers.com',
    isPhishing: true,
    explanation: 'This link takes you to "verify-transfers.com" instead of the official Moniepoint portal. Bad actors construct fake portals like "moniepoint.verify-transfers.com" to copy bank styling and steal your money or credentials.',
    difficulty: 'hard',
    clues: [
      'The link ends with "verify-transfers.com", which is not Moniepoint.',
      'Targeted personal direct-messaging to lower your critical guard.'
    ],
    baitType: 'Bank Security',
    level: 2,
    isWhatsApp: true
  },

  // ==========================================
  // LEVEL 3: MIND GAMES (8 tasks)
  // Focus: Urgency threats, extreme coercive panic
  // ==========================================
  {
    id: 'level-3-task-1',
    sender: 'UI Portal Admin',
    senderEmail: 'portal-update@ui.edu.ng.portal-verification-service.com',
    subject: 'URGENT UI PORTAL UPDATE: Unpaid Fees Deactivation Notice',
    body: 'UI Portal Update: Your school fees payment was flagged as incomplete. You must re-verify your receipt number within 4 hours or your portal account will be deactivated and your courses deleted.',
    isPhishing: true,
    explanation: 'The message forces an extremely short 4-hour deadline to verify a payment, threatening severe consequences (deactivating your portal account and deleting your courses). Real universities do not deactivate student profiles or delete registered courses on such short notice without a formal, official process.',
    difficulty: 'easy',
    clues: [
      'Extreme time pressure (within 4 hours).',
      'Threat of immediate academic penalties (deleting registered courses).'
    ],
    baitType: 'General',
    level: 3
  },
  {
    id: 'level-3-task-2',
    sender: 'ULSU President Office',
    senderEmail: 'ulsu-president-office@unilag-sec.org',
    subject: 'EMERGENCY: Hostel Lockdown Broadcast Feed Link',
    body: "From: ULSU President Office. 'Guys, there is an emergency security meeting happening now regarding the hostel lockdown. Click this link to join the secret live broadcast feed.'",
    isPhishing: true,
    explanation: 'This message uses authority impersonation (the Student Union President Office) combined with high-pressure campus safety concerns to lure you into tapping an unverified link. Student associations will always announce events via standard official channels, never unofficial external portals.',
    difficulty: 'medium',
    clues: [
      'Leverages an authority figure to demand swift compliance.',
      'Exploits safety anxieties (hostel lockdown emergency).'
    ],
    baitType: 'General',
    level: 3
  },
  {
    id: 'level-3-task-3',
    sender: 'Shell Careers',
    senderEmail: 'shell-nigeria@careers-portal.net',
    subject: 'Shell Student Internship Program shortlist!',
    body: 'Congratulations! Your profile was shortlisted for the 2026 Shell Nigeria Student Internship Program. Monthly stipend is N150,000. Click here to download your interview invitation letter immediately.',
    isPhishing: true,
    explanation: 'This phish targets students with fake, immediate financial windfalls (N150,000 monthly). True oil and gas corporations like Shell use official secure domains (ending in shell.com) and will never rush you to click external download links "immediately" without pre-existing applications.',
    difficulty: 'medium',
    clues: [
      'Greed baiting through high-value unrequested internships (N150,000 allowance).',
      'Urges you to download files "immediately" to bypass logical scanning.'
    ],
    baitType: 'Scholarship',
    level: 3
  },
  {
    id: 'level-3-task-4',
    sender: 'PiggyVest Alerts',
    senderEmail: 'security@piggyvest.com',
    subject: 'PiggyVest Security Log: Login on new device',
    body: 'Security Notification: We noticed a login to your PiggyVest account from a new Android device. If this was you, no action is needed. Keep saving safely!',
    isPhishing: false,
    explanation: 'This is a genuine system notification. It uses a calm, non-threatening tone, clearly states that "no action is needed" if it was you, has no fake deadlines, and links back to official help lines.',
    difficulty: 'easy',
    clues: [
      'Calm, descriptive security update rather than punitive threats.',
      'Explicitly assures the user that no immediate action is required.'
    ],
    baitType: 'Bank Security',
    level: 3
  },
  {
    id: 'level-3-task-5',
    sender: 'Academic Leak Whistleblower',
    senderEmail: 'shhh-exams-leaked@uni-leaks-drive.tk',
    subject: 'CONFIDENTIAL: Next week final exam questions leaked!',
    body: "Hey, a lecturer accidentally uploaded the final exam questions for next week to a hidden drive folder. Access it here: [http://uni-leaks-drive.tk](http://uni-leaks-drive.tk). Delete this chat and don't tell any of your classmates so the department doesn't find out and change the questions.",
    isPhishing: true,
    explanation: 'This is a secrecy trap. Real universities or departments never leak exam questions via third-party web pages demanding complete secrecy and chat deletion. Scammers enforce secrecy ("don’t tell classmates") to avoid their malicious domains being reported and blocked.',
    difficulty: 'medium',
    clues: [
      'Demands strict secrecy ("don\'t tell classmates" & "delete this chat") to bypass verification.',
      'Uses a highly suspicious domain with a .tk extension (often associated with spam or phishing).'
    ],
    baitType: 'General',
    level: 3
  },
  {
    id: 'level-3-task-6',
    sender: 'Yabatech ICT Helpdesk',
    senderEmail: 'support.yabatech.ict@yandex.com',
    subject: 'Urgent Campus Wi-Fi Speed Upgrade: Account Check',
    body: 'Yabatech ICT Desk: We are upgrading campus Wi-Fi speeds for the exam period. To prevent your device from losing connection tomorrow morning, confirm your student login details here right now.',
    isPhishing: true,
    explanation: 'This uses helpfulness as a psychological weapon. They promise faster speeds for exams but threaten the loss of your internet connection tomorrow morning to trick you into inputting your credentials on a fake portal with a sender address pointing to a free, public provider (yandex.com).',
    difficulty: 'medium',
    clues: [
      'Promises helpful resources (Wi-Fi speed boost) to lower suspicions.',
      'Creates fear of exclusion (losing connection tomorrow) to execute a login trap.'
    ],
    baitType: 'General',
    level: 3
  },
  {
    id: 'level-3-task-7',
    sender: 'NBASF Executive Secretariat',
    senderEmail: 'info@nbasf.org.ng',
    subject: 'NBASF Annual Dinner Registration',
    body: 'Hi everyone, the Nigerian Bar Association Student Forum (NBASF) annual dinner registration portal is now open. Regular tickets are N3,000. Please register at your convenience using the link on our official website.',
    isPhishing: false,
    explanation: 'This is an authentic student association registration request. It uses balanced, completely calm language, points to a standard fee, and asks you to register at your own convenience without high-pressure deadlines or panic.',
    difficulty: 'medium',
    clues: [
      'No high-pressure warnings or severe threats.',
      'Asks the user to complete action calmly at their own convenience.'
    ],
    baitType: 'General',
    level: 3
  },
  {
    id: 'level-3-task-8',
    sender: 'Student Affiliate Gigs',
    senderEmail: 'invite-only-promos@naija-student-gigs.com',
    subject: 'Strictly Invite-Only: Earn N30,000 Weekly From Hostel!',
    body: "Earn N30,000 weekly doing simple online tasks from your hostel! Click here to set up your profile and link your bank app: [http://naija-student-gigs.com](http://naija-student-gigs.com). Note: This promo is strictly invite-only. Do not share this link or discuss it with others to ensure your slot is guaranteed.",
    isPhishing: true,
    explanation: 'This is a financial fraud scheme promoting fake income while instructing absolute secrecy. Legitimate online job offers do not ask you to link your bank app or demand you keep the opportunity completely secret from everyone else. This secrecy is a trick to disable external validation and recruit innocent users into setups.',
    difficulty: 'medium',
    clues: [
      'Demands strict secrecy ("Do not share this link or discuss it with others") to prevent critical oversight.',
      'Exploits quick, easy financial return (N30,000 weekly) in exchange for linking your sensitive banking application.'
    ],
    baitType: 'General',
    level: 3
  },


];

export const BOARD_CELLS: BoardCell[] = [
  { index: 1, type: 'normal' },
  { index: 2, type: 'normal' },
  { index: 3, type: 'normal' },
  { index: 4, type: 'ladder-start', connectsTo: 14, habitName: 'Enabled WhatsApp 2FA PIN', message: 'You setup a security PIN! Climbed ladder from square 4 to 14 (+10!)' },
  { index: 5, type: 'normal' },
  { index: 6, type: 'normal' },
  { index: 7, type: 'normal' },
  { index: 8, type: 'normal' },
  { index: 9, type: 'ladder-start', connectsTo: 22, habitName: 'Configured App Fingerprint lock', message: 'You registered your banking biometrics! Climbed ladder from square 9 to 22 (+13!)' },
  { index: 10, type: 'normal' },
  { index: 11, type: 'normal' },
  { index: 12, type: 'snake-head', connectsTo: 3, habitName: 'Clicked WhatsApp Phishing Link', message: 'Oh no! You clicked an MTN Free Data link! Slithered back from 12 to 3 (-9)' },
  { index: 13, type: 'normal' },
  { index: 14, type: 'ladder-end' },
  { index: 15, type: 'normal' },
  { index: 16, type: 'snake-head', connectsTo: 7, habitName: 'Used same portal and bank password', message: 'Password leak! A portal hack leaked your database keys! Fell down from 16 to 7 (-9)' },
  { index: 17, type: 'ladder-start', connectsTo: 25, habitName: 'Upgraded home Wi-Fi security PIN', message: 'Great job! Upgraded default configurations of wireless router! Up to 25 (+8)' },
  { index: 18, type: 'normal' },
  { index: 19, type: 'normal' },
  { index: 20, type: 'normal' },
  { index: 21, type: 'normal' },
  { index: 22, type: 'ladder-end' },
  { index: 23, type: 'normal' },
  { index: 24, type: 'snake-head', connectsTo: 11, habitName: 'Shared SMS OTP in phone call', message: 'Vishing disaster! Shared absolute verify code with a fake support caller! Fell to 11 (-13)' },
  { index: 25, type: 'ladder-end' },
  { index: 26, type: 'normal' },
  { index: 27, type: 'normal' },
  { index: 28, type: 'normal' },
  { index: 29, type: 'normal' },
  { index: 30, type: 'ladder-start', connectsTo: 35, habitName: 'Checked URL on a critical email link', message: 'Safe verification! Spotted mismatch, searched officially. Up to 35 (+5)' },
  { index: 31, type: 'snake-head', connectsTo: 19, habitName: 'Logged on public cyber cafe client', message: 'Keylogger threat! Your logins were recorded on standard cafe browser! Slithered to 19 (-12)' },
  { index: 32, type: 'normal' },
  { index: 33, type: 'normal' },
  { index: 34, type: 'snake-head', connectsTo: 15, habitName: 'Downloaded cracked Microsoft office', message: 'Malware Trojan! Cracks contained payload stealing personal cookie assets! Fell to 15 (-19)' },
  { index: 35, type: 'ladder-end' },
  { index: 36, type: 'normal' }
];


export const FINAL_QUIZ_QUESTIONS = [
  {
    question: `What does the "A" in the CIA triad stand for in the context of keeping a system fully secure?`,
    options: [
      'Authentication',
      'Availability',
      'Accuracy',
      'Authorization'
    ],
    correctOptionIndex: 1,
    explanation: `Availability means ensuring your system doesn't crash or get blocked by malware when you need it.`
  },
  {
    question: `According to the lesson, why are university students frequently targeted by cybercriminals despite not necessarily having billions in their accounts?`,
    options: [
      'Hackers specifically harbor resentment towards university networks.',
      'Students are targeted because modern hackers use automated software bots that scan the entire internet for any vulnerable device, regardless of wealth.',
      'Students are manually researched by criminals looking for high-value future targets.',
      'Hackers target students primarily because they rarely use passwords on their devices.'
    ],
    correctOptionIndex: 1,
    explanation: `Hackers use automated bots that scan the internet for vulnerable targets, indiscriminately exploiting any account.`
  },
  {
    question: `Imagine you submit an assignment file to your lecturer via the campus portal, but before it is received, a malicious actor secretly edits the data inside the document. Which specific pillar of the CIA triad has been compromised?`,
    options: [
      'Confidentiality',
      'Integrity',
      'Availability',
      'Authentication'
    ],
    correctOptionIndex: 1,
    explanation: `Integrity ensures your data remains accurate and unaltered. Since the file was secretly modified, its integrity was compromised.`
  },
  {
    question: `You are at the university gate trying to show security your school fees receipt, but your phone is suddenly blocked by malware and you cannot access the file. Which pillar of cybersecurity has failed?`,
    options: [
      'Integrity',
      'Confidentiality',
      'Availability',
      'Authorization'
    ],
    correctOptionIndex: 2,
    explanation: `Availability ensures you have access to your data when needed. Since malware blocked your phone, availability failed.`
  },
  {
    question: `You are sitting at a local campus buka and notice a free Wi-Fi network that doesn't have a password or a padlock sign next to it. Based on the lesson's guidelines, what is the most secure action to take?`,
    options: [
      'Connect to it but only use it for basic web searches.',
      'Connect to it briefly to download urgent app updates.',
      'Never connect to it, as an attacker could use it to log into your backend and steal your information.',
      'Connect to it, but ensure your phone\'s screen lock is turned on.'
    ],
    correctOptionIndex: 2,
    explanation: `Unsecured, open Wi-Fi networks are highly dangerous, as hackers use them to sneak into devices and steal information.`
  },
  {
    question: `According to the modules, what specifically defines the attack known as "Smishing"?`,
    options: [
      'An automated dictionary attack targeting short passwords.',
      'A fraudulent message disguised as a trusted organization sent specifically via SMS or WhatsApp.',
      'A targeted email attack that uses your actual name and university department.',
      'An attack where a cybercriminal fakes a phone call to trick you into revealing a PIN.'
    ],
    correctOptionIndex: 1,
    explanation: `Smishing (SMS Phishing) occurs when fraudulent messages are sent via SMS or WhatsApp instead of email.`
  },
  {
    question: `You receive a customized email that addresses you by your actual name, correctly names your specific university department, and references your hostel room number. What type of attack are you likely looking at?`,
    options: [
      'Vishing',
      'Broad Phishing',
      'Spear Phishing',
      'Smishing'
    ],
    correctOptionIndex: 2,
    explanation: `Spear Phishing uses specific, researched details about you to make a targeted attack appear completely genuine.`
  },
  {
    question: `You receive an urgent alert from what looks like your bank, asking you to update your settings via the link "yourbank-security-update.com". Based on the lesson, what does this domain structure indicate?`,
    options: [
      'It is a legitimate, encrypted link used for deep web banking.',
      'It indicates a temporary network error that redirected your traffic.',
      'It is a secure sub-domain specifically created for official updates.',
      'It is a sign of a phishing trap, as hackers often attach extra words to the official core name to mimic the real site.'
    ],
    correctOptionIndex: 3,
    explanation: `While a site's look can be copied, its URL cannot. Adding extra words to the core domain is a common sign of a phishing trap.`
  },
  {
    question: `You receive an SMS from someone claiming to be an "Access Bank support agent," demanding immediate action to prevent your account from being permanently blocked. What represents the most appropriate behavioral habit to handle this?`,
    options: [
      'Reply to the SMS asking the agent for proof of identity.',
      'Stop, do not click anything, and open your official banking app independently to check.',
      'Forward the message to a friend to see if they received a similar warning.',
      'Click the link to investigate, but do not type in your real password.'
    ],
    correctOptionIndex: 1,
    explanation: `Never click links under pressure. The correct habit is to independently open the official app to verify any urgent claims.`
  },
  {
    question: `A classmate forwards a broadcast message to your campus WhatsApp group promising "Free 20GB Student Data" with a link attached. What is the correct behavioral response?`,
    options: [
      'Ask the classmate how much data they actually received before trying it yourself.',
      'Click the link to verify if it is a legitimate university grant.',
      'Do not click the link, treating it immediately as a digital trap.',
      'Click the link only if you are using an incognito browser tab.'
    ],
    correctOptionIndex: 2,
    explanation: `Treat unexpected links promising free data or grants as traps. Do not click them, as "nothing is free in this life."`
  },
  {
    question: `What are the primary characteristics that make a strong password resistant to modern automated hacking tools?`,
    options: [
      'Using your childhood nickname and adding "123" at the end.',
      'Making it exceptionally long, random, and unpredictable.',
      'Ensuring it is changed exactly every seven days.',
      'Replacing letters with complex symbols in a short, five-character word.'
    ],
    correctOptionIndex: 1,
    explanation: `Length, randomness, and unpredictability are key to strong passwords. Short passwords are very easy for computers to crack.`
  },
  {
    question: `How do cybercriminals primarily attempt to guess passwords using automated software bots?`,
    options: [
      'By manually guessing character by character over several days.',
      'By physically removing the storage drive from your device.',
      'By running dictionary attacks and brute-force attacks to test billions of combinations in seconds.',
      'By calling your phone provider to reset your master PIN.'
    ],
    correctOptionIndex: 2,
    explanation: `Hackers use automated bots to run dictionary and brute-force attacks, testing billions of combinations in seconds.`
  },
  {
    question: `You use the exact same weak password for your student portal, your email account, and your mobile banking app. If an automated bot cracks your student portal login, what is the immediate consequence for your other accounts?`,
    options: [
      'The hacker will immediately try that exact same combination on your bank and email apps to gain full access.',
      'Your other accounts will automatically lock themselves down for 24 hours.',
      'The weak password will be deleted from the university system entirely.',
      'The automated bot will skip the bank app because it requires a different username.'
    ],
    correctOptionIndex: 0,
    explanation: `Reusing passwords helps hackers everywhere if one account is compromised. A bot will test stolen credentials on all your accounts.`
  },
  {
    question: `Which of the following represents the most secure method for creating a password, according to the lesson on "passphrases"?`,
    options: [
      'Using a single, highly complex word like "P@$$w0rd1!".',
      'Using your favorite football club combined with your birth year.',
      'Combining four or five random, unrelated words together, such as "MyMumsJollofIsTheBest".',
      'Typing a random string of numbers generated by a physical calculator.'
    ],
    correctOptionIndex: 2,
    explanation: `Passphrases combine 4-5 random words. They are easy for humans to remember but take computers centuries to guess.`
  },
  {
    question: `Since remembering thirty different long passphrases is impossible, what is the definitively secure action recommended to manage your unique digital keys?`,
    options: [
      'Write them all down on a piece of paper and keep it securely in your physical wallet.',
      'Save them in a standard text message draft or notes app on your phone.',
      'Use only two strong passphrases and alternate them between all your accounts.',
      'Install a reputable, encrypted password manager app or use Google Chrome\'s built-in password manager.'
    ],
    correctOptionIndex: 3,
    explanation: `Since memorizing many passphrases is hard, password managers act as a digital safe to securely store all your unique keys.`
  }
];


export const INTERMEDIATE_FINAL_QUIZ = [
  {
    question: `What is the permanent history of all your digital activities and data left behind on the internet called?`,
    options: [
      'Active tracking history',
      'Digital footprint',
      'Passive tracking record',
      'Encrypted history'
    ],
    correctOptionIndex: 1,
    explanation: `A digital footprint is the permanent history of all digital activities and data you leave on the internet.`
  },
  {
    question: `If an online shopping site automatically records your device's IP address and saves your browsing history using cookies while you navigate, what type of data trail is being created?`,
    options: [
      'Active digital footprint',
      'Encrypted search history',
      'Passive digital footprint',
      'Intentional tracking footprint'
    ],
    correctOptionIndex: 2,
    explanation: `A passive digital footprint is data collected about you without your active input, such as when systems log your habits and location in the background.`
  },
  {
    question: `According to the modules, if you want to stop automated scraping bots from harvesting your life on apps like Instagram or TikTok, what is the most appropriate action to take?`,
    options: [
      'Clear your browser cookies daily.',
      'Change your default privacy settings from "Public" to "Friends Only" or "Contacts Only".',
      'Only post during specific hours of the day.',
      'Delete the apps entirely and only use them via a browser.'
    ],
    correctOptionIndex: 1,
    explanation: `The modules advise changing default privacy settings from "Public" to "Friends Only" or "Contacts Only" to stop automated scraping bots from harvesting your data.`
  },
  {
    question: `How do the modules define "social engineering"?`,
    options: [
      'Using automated bots to guess your passwords.',
      'The psychological manipulation of people into performing actions or revealing confidential information.',
      'Writing complex malware to extract sensitive information from a phone.',
      'Creating a cloned public key to intercept web traffic.'
    ],
    correctOptionIndex: 1,
    explanation: `Social engineering is the psychological manipulation of people into performing actions or revealing confidential information, relying on tricking the human mind rather than technical force.`
  },
  {
    question: `A person dressed in a sharp suit bypasses identity checks at the faculty office by confidently spinning a believable story using the HOD's actual name. What attack technique does this scenario perfectly illustrate?`,
    options: [
      'Spear Phishing',
      'Social Engineering',
      'Passive Footprinting',
      'Vishing'
    ],
    correctOptionIndex: 1,
    explanation: `This illustrates social engineering, where the attacker manipulates human staff through deception (like a sharp suit and believable story) to bypass security without technical force.`
  },
  {
    question: `You receive an extremely urgent text message claiming your bank account will be closed in 10 minutes unless you reply. What is the recommended behavioral habit to counter this panic-inducing tactic?`,
    options: [
      'The 60-Second Pause Habit',
      'The Billboard Test',
      'The Public Key check',
      'The Tor Routing method'
    ],
    correctOptionIndex: 0,
    explanation: `The "60-Second Pause Habit" is recommended whenever a message demands urgent action. Pausing breaks the attacker's spell, as social engineering relies on speed and panic.`
  },
  {
    question: `What are the three fundamental pillars of identity proof used in Multi-Factor Authentication (MFA)?`,
    options: [
      'Something you read, something you write, something you keep.',
      'Something you know, something you have, something you are.',
      'Something you see, something you hear, something you touch.',
      'Something you send, something you receive, something you process.'
    ],
    correctOptionIndex: 1,
    explanation: `MFA relies on three pillars of identity proof: something you know (password), something you have (smartphone), and something you are (biometrics).`
  },
  {
    question: `Imagine a bouncer at a VIP club asks for a secret password, and also demands to see your custom physical invite card. In the context of MFA, what pillar does the physical custom invite card represent?`,
    options: [
      'Something you inherit',
      'Something you know',
      'Something you are',
      'Something you have'
    ],
    correctOptionIndex: 3,
    explanation: `The physical custom invite card represents "something you have," which is an item you possess to prove your identity, similar to a smartphone or authenticator app.`
  },
  {
    question: `To protect high-value accounts from "SIM swap" scams, what secure behavior do the modules highly recommend over using standard SMS-based codes?`,
    options: [
      'Using biometric locks on your SIM card.',
      'Migrating to app-based authenticators like Google Authenticator or Microsoft Authenticator.',
      'Sending tokens via a direct email instead of SMS.',
      'Turning off Multi-Factor Authentication entirely.'
    ],
    correctOptionIndex: 1,
    explanation: `Because SIM swap scams can intercept SMS codes, the secure action is to migrate to encrypted app-based authenticators (like Google Authenticator or Microsoft Authenticator) which generate codes locally on your device.`
  },
  {
    question: `What specific analogy do the modules use to describe an active digital footprint?`,
    options: [
      'Peeling the layers of an onion.',
      'Leaving wet shoe tracks across a pavement after a heavy rain downpour.',
      'Using a cheap luggage padlock on a hostel door.',
      'A bouncer checking names at a VIP club.'
    ],
    correctOptionIndex: 1,
    explanation: `The analogy used is leaving wet shoe tracks across pavement after rain, which represents the intentionally visible trail of an active digital footprint.`
  },
  {
    question: `When a cybercriminal calls you on the phone, creates a highly urgent fake story, and convinces you to read out your account number, what is this specific technique called?`,
    options: [
      'Smishing',
      'Spear Phishing',
      'Vishing',
      'Spoofing'
    ],
    correctOptionIndex: 2,
    explanation: `Vishing (Voice Phishing) is the technique used when a scammer tries to trick people over a voice medium (like a phone call) to reveal sensitive information.`
  },
  {
    question: `Before you share a hot take or drop a comment on a public forum, the modules advise applying a specific mental check. Which action correctly describes this check?`,
    options: [
      'Asking yourself if you would be comfortable seeing the post printed on a massive public billboard.',
      'Waiting for 60 seconds to see if anyone else posts something similar.',
      'Checking if the forum\'s web address starts with https://.',
      'Generating a new password before posting the comment.'
    ],
    correctOptionIndex: 0,
    explanation: `The "Billboard Test" is a habit that forces you to ask if you would be comfortable seeing your post printed on a massive public billboard before you upload it.`
  },
  {
    question: `If a hacker manages to buy your reused university portal password from a dark web marketplace, what secondary barrier, if activated, will definitively break their automated attack chain and stop them from logging in?`,
    options: [
      'A stronger new password.',
      'Multi-Factor Authentication (MFA), such as a temporary token or biometric scan.',
      'A passive digital footprint audit.',
      'The 60-second pause habit.'
    ],
    correctOptionIndex: 1,
    explanation: `Multi-Factor Authentication (MFA), such as a token or biometric scan, is a secondary barrier that stops hackers from logging in even with a stolen password because they lack the secondary piece of evidence.`
  },
  {
    question: `If you receive a scary call from someone claiming to be "IT Support" or "Customer Care" asking for a password, what is the most appropriate action to take according to the modules?`,
    options: [
      'Give them a fake password to see if they are legitimate.',
      'Reduce the trigger opportunity by answering all their questions quickly.',
      'Hang up immediately and verify the situation via an independent, official channel.',
      'Ask them to send the request via an encrypted SMS token.'
    ],
    correctOptionIndex: 2,
    explanation: `Never share your password over the phone. The correct action is to hang up immediately and verify the claim via an independent, official channel.`
  },
  {
    question: `According to the modules, what specific action should you take to ensure fraudsters cannot easily clone your WhatsApp account on another device, even if they trickily intercept your SMS activation code?`,
    options: [
      'Change your default WhatsApp privacy settings to "Friends Only".',
      'Use the "Clear your passive tracks" feature inside WhatsApp.',
      'Turn on Two-Step Verification inside WhatsApp and create a memorable 6-digit PIN.',
      'Log out of WhatsApp immediately after every use.'
    ],
    correctOptionIndex: 2,
    explanation: `Turn on Two-Step Verification in WhatsApp settings and create a 6-digit PIN. This secondary factor ensures a fraudster who intercepts your SMS code still cannot clone your account without that secret PIN.`
  }
];


export const ADVANCED_FINAL_QUIZ = [
  {
    question: `According to the modules, the word "Cryptography" comes from two Greek words meaning what?`,
    options: [
      'Secret network',
      'Hidden writing',
      'Digital lock',
      'Public ledger'
    ],
    correctOptionIndex: 1,
    explanation: `The modules state that Cryptography comes from the Greek words Kryptos (hidden) and Graphy (to write). Therefore, it simply means writing things that are hidden or secret.`
  },
  {
    question: `What do the modules identify as the biggest security challenge when using symmetric encryption over the internet?`,
    options: [
      'It is too slow to process large text files locally.',
      'You must find a secure way to share the single secret key with the receiver without interception.',
      'It requires a constant, active internet connection to lock files.',
      'It uses two completely different keys that are difficult to manage.'
    ],
    correctOptionIndex: 1,
    explanation: `Symmetric encryption relies on only one digital key that both the sender and the receiver must know. Because of this, safely delivering that single key to the recipient without anyone stealing it over the internet is the ultimate hurdle.`
  },
  {
    question: `You need to send a symmetrically encrypted WinRAR folder to a project partner. Based on the modules, which scenario represents a critical failure in protecting your data?`,
    options: [
      'Sending the locked folder via email and sending the password via a temporary voice note on a different app.',
      'Creating a password by combining four random words together.',
      'Texting the secret password in the exact same email thread as the locked folder.',
      'Ensuring your email address has Multi-Factor Authentication enabled.'
    ],
    correctOptionIndex: 2,
    explanation: `The modules explicitly warn that you should never text the password in the exact same email thread as the locked file. If an attacker intercepts that single email thread, they immediately gain both the locked file and the key to open it.`
  },
  {
    question: `To ensure nobody else can read your personal data if your cloud provider is breached, what specific action do the modules recommend taking in your WhatsApp settings?`,
    options: [
      'Delete your chat history completely at the end of every week.',
      'Toggle on "End-to-End Encrypted Backups" to generate a unique key that only you control.',
      'Turn your default privacy settings from "Public" to "Contacts Only".',
      'Use a cloned app to route your backups to a secure external server.'
    ],
    correctOptionIndex: 1,
    explanation: `The modules instruct users to select End-to-End Encrypted Backups in their WhatsApp settings. This action forces the app to generate a unique key controlled via a password, ensuring your cloud backups are scrambled and unreadable if stolen.`
  },
  {
    question: `If a friend recommends downloading an unverified, cloned application like "WhatsApp Plus" for extra visual features, what is the most appropriate behavioral action according to the modules?`,
    options: [
      'Install it, but only use it for non-sensitive group chats.',
      'Avoid downloading it completely because it strips away official encryption and exposes your raw data to unknown third parties.',
      'Download it, but make sure your phone\'s screen lock is active.',
      'Check if the app\'s website has a padlock icon before downloading.'
    ],
    correctOptionIndex: 1,
    explanation: `The modules strictly advise steering clear of and banishing modded apps like WhatsApp Plus or GBWhatsApp. These cloned tools route your private keys and chat databases through unverified external servers, effectively destroying the platform\'s certified encryption protections.`
  },
  {
    question: `How do the modules define the core functionality of Asymmetric Encryption?`,
    options: [
      'It relies on a single shared secret key that both parties must protect perfectly.',
      'It uses two completely different keys that are mathematically linked to manage your data.',
      'It functions by hiding websites on unindexed anonymous networks.',
      'It relies entirely on biometric data, like fingerprints, to lock files.'
    ],
    correctOptionIndex: 1,
    explanation: `The modules define asymmetric encryption as a security system that does not rely on a single shared secret, but instead uses two completely different keys (a public key and a private key) that are mathematically linked to each other.`
  },
  {
    question: `In an asymmetric encryption system, what is the specific role of the Private Key?`,
    options: [
      'It is placed out in the open for anyone to lock a message meant specifically for you.',
      'It is a shared password string that the sender must securely text to the receiver.',
      'It stays strictly hidden inside your device and is the only key that can unlock what your open public key locks.',
      'It is a temporary OTP token sent to you via SMS.'
    ],
    correctOptionIndex: 2,
    explanation: `According to the modules, the Private Key is your personal code that stays strictly hidden inside your device’s secure hardware chips. It is the only key in existence that can decrypt the data locked by your public key.`
  },
  {
    question: `If a banking server wants to send a secure, encrypted balance alert that only your smartphone can open, which key must the server use to lock the data?`,
    options: [
      'The server’s private key',
      'Your private key',
      'A standard shared password',
      'Your public key'
    ],
    correctOptionIndex: 3,
    explanation: `The banking server must lock the data using your open Public Key. This ensures that only your matching, local Private Key (which the server does not have access to) can unlock and read the alert.`
  },
  {
    question: `The modules compare an anonymous messaging link (like NGL on an Instagram story) to asymmetric encryption. In this analogy, what perfectly represents your Private Key?`,
    options: [
      'The public timeline where everyone can see the link.',
      'The custom link you generated and pasted on your profile.',
      'The secret confession typed by the external user.',
      'Your private login credentials to the main app that let you access the backend dashboard.'
    ],
    correctOptionIndex: 3,
    explanation: `In the analogy, the custom link acts as the public key that anyone can use to drop a locked message. Your private login credentials to the main app serve as your Private Key, as only you hold them to unlock the backend dashboard and read the unscrambled messages.`
  },
  {
    question: `You attempt to open a university portal link and your browser screens a prominent error message saying "Your connection is not private." Based on the modules, what is the required behavioral habit?`,
    options: [
      'Click "proceed anyway" but do not type in your main password.',
      'Abort the mission immediately, as a tool might be spoofing the connection.',
      'Refresh the page three times to force a new symmetric handshake.',
      'Download an unverified proxy browser to bypass the warning.'
    ],
    correctOptionIndex: 1,
    explanation: `The modules instruct users to obey browser certificate warnings. If you see a warning that your connection is not private, it means the asymmetric handshake failed and a fake middleman might be actively intercepting your data, so you must abort the mission immediately.`
  },
  {
    question: `According to the modules, which layer of the internet contains private, password-protected sites like your university portal and bank app that search engines aren\'t allowed to see?`,
    options: [
      'The Surface Web',
      'The Dark Web',
      'The Deep Web',
      'The Onion Layer'
    ],
    correctOptionIndex: 2,
    explanation: `The Deep Web is defined as the massive, completely legal portion of the internet hidden behind standard login walls, which search engines cannot index. This layer includes your bank accounts, emails, and university grades.`
  },
  {
    question: `What network privacy mechanism involves encrypting data inside nested layers so that each person in the chain only knows the identity of the person who handed it to them and the next person to give it to?`,
    options: [
      'End-to-End Chat Backups',
      'The Billboard Test',
      'Onion Routing',
      'Incognito Mode'
    ],
    correctOptionIndex: 2,
    explanation: `The modules explain "onion routing" using the analogy of sealing a note inside three nested envelopes. As it is passed along, each person peels off only the outermost layer, successfully masking the source\'s true identity.`
  },
  {
    question: `A classmate uses "Incognito Mode" on their browser and claims this makes them completely anonymous and hides their online activity from the internet. Based on the modules, is this correct?`,
    options: [
      'Yes, Incognito Mode utilizes multi-layered encryption to protect network anonymity.',
      'Yes, Incognito Mode routes traffic through unindexed Dark Web marketplaces.',
      'No, Incognito Mode only ensures browsing activity doesn’t save on the local device history; it does not hide activity from the internet.',
      'No, Incognito Mode is only effective if they also use a modified application.'
    ],
    correctOptionIndex: 2,
    explanation: `The modules state clearly that using Incognito Mode does not make you completely anonymous online. It only prevents your browsing activity from saving on your local device history, but it does not hide your tracks from the broader internet.`
  },
  {
    question: `If a cybercriminal uses automated scripts to package millions of usernames and passwords from a university database breach, where are these "combo lists" typically uploaded and traded according to the modules?`,
    options: [
      'The Surface Web',
      'Anonymous Dark Web marketplaces',
      'Public Instagram vendor profiles',
      'Unsecured campus Wi-Fi networks'
    ],
    correctOptionIndex: 1,
    explanation: `When apps or databases experience a security breach, cybercriminals package the stolen credentials into "combo lists". These lists are then uploaded straight to unindexed, anonymous Dark Web marketplaces where software bots and malicious actors trade them.`
  },
  {
    question: `Because the Dark Web serves as a trading hub for leaked credentials, what secure operational habit must you apply to prevent an attacker from buying your university portal password and using it to instantly clear your bank allowance?`,
    options: [
      'Access your bank app only using the specialized Tor browser.',
      'Never use the same weak password across multiple different accounts.',
      'Clear your passive browser cookies and cache every single day.',
      'Turn off background location access for all your mobile games.'
    ],
    correctOptionIndex: 1,
    explanation: `The modules explicitly warn against using the exact same weak password for your portal and your bank apps. If your data is breached, an automated system on the dark web will cross-reference your leaked credentials to gain direct access to your other reused accounts. The secure containment habit is to never recycle passwords.`
  }
];


export const LEVEL_THRESHOLDS = [
  { level: 1, minXP: 0, maxXP: 200, title: 'Recruit' },
  { level: 2, minXP: 200, maxXP: 450, title: 'Recruit' },
  { level: 3, minXP: 450, maxXP: 750, title: 'Novice' },
  { level: 4, minXP: 750, maxXP: 1100, title: 'Novice' },
  { level: 5, minXP: 1100, maxXP: 1500, title: 'Guardian' },
  { level: 6, minXP: 1500, maxXP: 1950, title: 'Guardian' },
  { level: 7, minXP: 1950, maxXP: 2450, title: 'Specialist' },
  { level: 8, minXP: 2450, maxXP: 3000, title: 'Specialist' },
  { level: 9, minXP: 3000, maxXP: 3600, title: 'Vanguard' },
  { level: 10, minXP: 3600, maxXP: 4250, title: 'Vanguard' },
  { level: 11, minXP: 4250, maxXP: 4950, title: 'Captain' },
  { level: 12, minXP: 4950, maxXP: 5700, title: 'Captain' },
  { level: 13, minXP: 5700, maxXP: 6500, title: 'Commander' },
  { level: 14, minXP: 6500, maxXP: 7350, title: 'Commander' },
  { level: 15, minXP: 7350, maxXP: 9999999, title: 'Cyber Sentinel' },
];

export function calculateLevelFromXP(xp: number): number {
  const matching = LEVEL_THRESHOLDS.find((t) => xp >= t.minXP && xp < t.maxXP);
  return matching ? matching.level : 15;
}

export function getLevelTitle(level: number): string {
  const match = LEVEL_THRESHOLDS.find((t) => t.level === level);
  return match ? match.title : 'Cyber Sentinel';
}

export function getXpThresholdsForLevel(level: number): { min: number, max: number } {
  const match = LEVEL_THRESHOLDS.find((t) => t.level === level);
  return match ? { min: match.minXP, max: match.maxXP } : { min: 7350, max: 7350 };
}
