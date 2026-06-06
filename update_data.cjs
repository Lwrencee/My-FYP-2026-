const fs = require('fs');

const finalQuizVar = `
export const FINAL_QUIZ_QUESTIONS = [
  {
    question: \`What does the "A" in the CIA triad stand for in the context of keeping a system fully secure?\`,
    options: [
      'Authentication',
      'Availability',
      'Accuracy',
      'Authorization'
    ],
    correctOptionIndex: 1,
    explanation: \`The CIA triad is a fundamental framework in cybersecurity representing Confidentiality, Integrity, and Availability. Availability specifically means ensuring that your system doesn’t suddenly crash or get blocked by malware exactly when you need to access your accounts.\`
  },
  {
    question: \`According to the lesson, why are university students frequently targeted by cybercriminals despite not necessarily having billions in their accounts?\`,
    options: [
      'Hackers specifically harbor resentment towards university networks.',
      'Students are targeted because modern hackers use automated software bots that scan the entire internet for any vulnerable device, regardless of wealth.',
      'Students are manually researched by criminals looking for high-value future targets.',
      'Hackers target students primarily because they rarely use passwords on their devices.'
    ],
    correctOptionIndex: 1,
    explanation: \`Modern attackers use automated tools and software bots that scan the internet 24/7 to find soft targets with unlocked virtual doors. These automated systems do not care if you are a broke student or a billionaire; they simply exploit vulnerable accounts indiscriminately.\`
  },
  {
    question: \`Imagine you submit an assignment file to your lecturer via the campus portal, but before it is received, a malicious actor secretly edits the data inside the document. Which specific pillar of the CIA triad has been compromised?\`,
    options: [
      'Confidentiality',
      'Integrity',
      'Availability',
      'Authentication'
    ],
    correctOptionIndex: 1,
    explanation: \`Integrity is the pillar focused on making sure your data is accurate and has not been sneakily altered by a hacker. Because the assignment file was maliciously modified before the lecturer received it, the file lost its integrity.\`
  },
  {
    question: \`You are at the university gate trying to show security your school fees receipt, but your phone is suddenly blocked by malware and you cannot access the file. Which pillar of cybersecurity has failed?\`,
    options: [
      'Integrity',
      'Confidentiality',
      'Availability',
      'Authorization'
    ],
    correctOptionIndex: 2,
    explanation: \`Availability ensures that you always have access to your accounts and that your device does not crash or get blocked right when you need it. Because the malware prevented you from accessing your receipt at the gate, the availability pillar failed.\`
  },
  {
    question: \`You are sitting at a local campus buka and notice a free Wi-Fi network that doesn't have a password or a padlock sign next to it. Based on the lesson's guidelines, what is the most secure action to take?\`,
    options: [
      'Connect to it but only use it for basic web searches.',
      'Connect to it briefly to download urgent app updates.',
      'Never connect to it, as an attacker could use it to log into your backend and steal your information.',
      'Connect to it, but ensure your phone\\'s screen lock is turned on.'
    ],
    correctOptionIndex: 2,
    explanation: \`The modules explicitly instruct users to "shine your eye" and never connect to free Wi-Fi networks that lack a password or padlock sign. Doing so is highly dangerous because hackers use these unsecured networks as digital playgrounds to sneak into devices and steal information.\`
  },
  {
    question: \`According to the modules, what specifically defines the attack known as "Smishing"?\`,
    options: [
      'An automated dictionary attack targeting short passwords.',
      'A fraudulent message disguised as a trusted organization sent specifically via SMS or WhatsApp.',
      'A targeted email attack that uses your actual name and university department.',
      'An attack where a cybercriminal fakes a phone call to trick you into revealing a PIN.'
    ],
    correctOptionIndex: 1,
    explanation: \`Smishing stands for SMS Phishing. It occurs when the digital trap of sending fraudulent messages disguised as a trusted entity happens via SMS or WhatsApp instead of email.\`
  },
  {
    question: \`You receive a customized email that addresses you by your actual name, correctly names your specific university department, and references your hostel room number. What type of attack are you likely looking at?\`,
    options: [
      'Vishing',
      'Broad Phishing',
      'Spear Phishing',
      'Smishing'
    ],
    correctOptionIndex: 2,
    explanation: \`Spear Phishing is a laser-focused attack where the hacker researches specific details about you, such as your actual name or department, to make their lie appear 100% genuine. This is distinct from broad attacks that are randomly blasted to millions of users.\`
  },
  {
    question: \`You receive an urgent alert from what looks like your bank, asking you to update your settings via the link "yourbank-security-update.com". Based on the lesson, what does this domain structure indicate?\`,
    options: [
      'It is a legitimate, encrypted link used for deep web banking.',
      'It indicates a temporary network error that redirected your traffic.',
      'It is a secure sub-domain specifically created for official updates.',
      'It is a sign of a phishing trap, as hackers often attach extra words to the official core name to mimic the real site.'
    ],
    correctOptionIndex: 3,
    explanation: \`Hackers can completely duplicate a website's look, but they cannot duplicate its exact web address (URL). A domain that adds extra words to the name (like yourbank-security-update.com instead of just yourbank.com) is a prominent warning sign of a phishing trap.\`
  },
  {
    question: \`You receive an SMS from someone claiming to be an "Access Bank support agent," demanding immediate action to prevent your account from being permanently blocked. What represents the most appropriate behavioral habit to handle this?\`,
    options: [
      'Reply to the SMS asking the agent for proof of identity.',
      'Stop, do not click anything, and open your official banking app independently to check.',
      'Forward the message to a friend to see if they received a similar warning.',
      'Click the link to investigate, but do not type in your real password.'
    ],
    correctOptionIndex: 1,
    explanation: \`Phishing attacks thrive on creating false urgency and panic to make you act without thinking. The correct defensive habit is to never click under pressure, abort the mission, and independently open the official app to verify the claim.\`
  },
  {
    question: \`A classmate forwards a broadcast message to your campus WhatsApp group promising "Free 20GB Student Data" with a link attached. What is the correct behavioral response?\`,
    options: [
      'Ask the classmate how much data they actually received before trying it yourself.',
      'Click the link to verify if it is a legitimate university grant.',
      'Do not click the link, treating it immediately as a digital trap.',
      'Click the link only if you are using an incognito browser tab.'
    ],
    correctOptionIndex: 2,
    explanation: \`The modules strictly advise users to treat random WhatsApp links promising free data or grants as malicious traps. You should absolutely not click the link, keeping in mind the principle that there is "nothing for free in this life".\`
  },
  {
    question: \`What are the primary characteristics that make a strong password resistant to modern automated hacking tools?\`,
    options: [
      'Using your childhood nickname and adding "123" at the end.',
      'Making it exceptionally long, random, and unpredictable.',
      'Ensuring it is changed exactly every seven days.',
      'Replacing letters with complex symbols in a short, five-character word.'
    ],
    correctOptionIndex: 1,
    explanation: \`A strong password relies heavily on length, randomness, and unpredictability to defend against automated guessing tools. Short passwords, even those stuffed with complex symbols, are incredibly easy for computers to crack.\`
  },
  {
    question: \`How do cybercriminals primarily attempt to guess passwords using automated software bots?\`,
    options: [
      'By manually guessing character by character over several days.',
      'By physically removing the storage drive from your device.',
      'By running dictionary attacks and brute-force attacks to test billions of combinations in seconds.',
      'By calling your phone provider to reset your master PIN.'
    ],
    correctOptionIndex: 2,
    explanation: \`Hackers do not manually sit down and guess your password. Instead, they use automated bots to run dictionary and brute-force attacks, testing billions of common word combinations and leaked credentials in mere seconds.\`
  },
  {
    question: \`You use the exact same weak password for your student portal, your email account, and your mobile banking app. If an automated bot cracks your student portal login, what is the immediate consequence for your other accounts?\`,
    options: [
      'The hacker will immediately try that exact same combination on your bank and email apps to gain full access.',
      'Your other accounts will automatically lock themselves down for 24 hours.',
      'The weak password will be deleted from the university system entirely.',
      'The automated bot will skip the bank app because it requires a different username.'
    ],
    correctOptionIndex: 0,
    explanation: \`Reusing a single password across multiple platforms is highly dangerous. If an automated bot cracks your portal password, it will instantly try that exact same credential combination on your other apps, leading to a total collapse of your digital security.\`
  },
  {
    question: \`Which of the following represents the most secure method for creating a password, according to the lesson on "passphrases"?\`,
    options: [
      'Using a single, highly complex word like "P@$$w0rd1!".',
      'Using your favorite football club combined with your birth year.',
      'Combining four or five random, unrelated words together, such as "MyMumsJollofIsTheBest".',
      'Typing a random string of numbers generated by a physical calculator.'
    ],
    correctOptionIndex: 2,
    explanation: \`The modules strongly advocates for the passphrase method, which involves combining four or five random, unrelated words. This creates a key that is incredibly long and easy for a human to visualize, but takes a computer centuries to guess.\`
  },
  {
    question: \`Since remembering thirty different long passphrases is impossible, what is the definitively secure action recommended to manage your unique digital keys?\`,
    options: [
      'Write them all down on a piece of paper and keep it securely in your physical wallet.',
      'Save them in a standard text message draft or notes app on your phone.',
      'Use only two strong passphrases and alternate them between all your accounts.',
      'Install a reputable, encrypted password manager app or use Google Chrome\\'s built-in password manager.'
    ],
    correctOptionIndex: 3,
    explanation: \`Because it is impossible to memorize numerous long passphrases, the text recommends installing an encrypted password manager. This tool acts as a digital safe, storing all your unique keys securely behind one master password.\`
  }
];
`;

let data = fs.readFileSync('src/data.ts', 'utf8');
data += '\n' + finalQuizVar;
fs.writeFileSync('src/data.ts', data);
