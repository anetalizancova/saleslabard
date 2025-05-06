
import { SalesRep, Quote } from "../types";

// Sample sales reps data
export const initialSalesReps: SalesRep[] = [
  { 
    id: "1", 
    name: "Alex Johnson", 
    avatar: "AJ", 
    weeklyGoal: 50000, 
    currentSales: 27500, 
    lastUpdated: new Date().toISOString() 
  },
  { 
    id: "2", 
    name: "Morgan Smith", 
    avatar: "MS", 
    weeklyGoal: 40000, 
    currentSales: 30000, 
    lastUpdated: new Date().toISOString() 
  },
  { 
    id: "3", 
    name: "Taylor Rodriguez", 
    avatar: "TR", 
    weeklyGoal: 45000, 
    currentSales: 15750, 
    lastUpdated: new Date().toISOString() 
  },
  { 
    id: "4", 
    name: "Jordan Lee", 
    avatar: "JL", 
    weeklyGoal: 55000, 
    currentSales: 55000, 
    lastUpdated: new Date().toISOString() 
  },
  { 
    id: "5", 
    name: "Casey Martinez", 
    avatar: "CM", 
    weeklyGoal: 48000, 
    currentSales: 12000, 
    lastUpdated: new Date().toISOString() 
  },
  { 
    id: "6", 
    name: "Riley Thompson", 
    avatar: "RT", 
    weeklyGoal: 42000, 
    currentSales: 38000, 
    lastUpdated: new Date().toISOString() 
  },
  { 
    id: "7", 
    name: "Dakota Wilson", 
    avatar: "DW", 
    weeklyGoal: 60000, 
    currentSales: 42000, 
    lastUpdated: new Date().toISOString() 
  },
  { 
    id: "8", 
    name: "Avery Thomas", 
    avatar: "AT", 
    weeklyGoal: 52000, 
    currentSales: 26000, 
    lastUpdated: new Date().toISOString() 
  },
  { 
    id: "9", 
    name: "Quinn Parker", 
    avatar: "QP", 
    weeklyGoal: 47000, 
    currentSales: 11750, 
    lastUpdated: new Date().toISOString() 
  }
];

// Motivational quotes for different progress levels
export const quotes: Quote[] = [
  // Low progress quotes (0-33%)
  {
    id: 1,
    text: "Coffee first, sales second. Unless you're behind on targets, then maybe skip the coffee?",
    author: "Caffeinated Closer",
    progressLevel: "low"
  },
  {
    id: 2,
    text: "Your sales pitch is like your dating profile - nobody reads it all, but they'll swipe right for a good deal!",
    author: "Tinder Sales Expert",
    progressLevel: "low"
  },
  {
    id: 3,
    text: "Nobody puts Baby in a corner... or at the bottom of the leaderboard. Let's hustle!",
    author: "Dirty Dancing Sales Coach",
    progressLevel: "low"
  },
  
  // Medium progress quotes (34-66%)
  {
    id: 4,
    text: "You're halfway there! That's what we call a glass half FULL of commission!",
    author: "Optimistic Sales Manager",
    progressLevel: "medium"
  },
  {
    id: 5,
    text: "Keep closing deals like you close your fridge - frequently and with purpose!",
    author: "Midnight Snacker",
    progressLevel: "medium"
  },
  {
    id: 6,
    text: "If sales were easy, they'd call it marketing. Wait... don't tell the marketing team I said that!",
    author: "Department Rivalry Specialist",
    progressLevel: "medium"
  },
  
  // High progress quotes (67-99%)
  {
    id: 7,
    text: "You're so close to hitting target that your commission check is drafting its acceptance speech!",
    author: "Commission Whisperer",
    progressLevel: "high"
  },
  {
    id: 8,
    text: "Almost there! Remember: an energy drink a day keeps the sales manager away!",
    author: "Caffeinated Closer",
    progressLevel: "high"
  },
  {
    id: 9,
    text: "If you hit your target, I heard the boss might do the worm at the next sales meeting. Just saying.",
    author: "Office Gossip",
    progressLevel: "high"
  },
  
  // Achievement quotes (100%+)
  {
    id: 10,
    text: "Target smashed! Your bank account just sent you a friend request!",
    author: "Financial Influencer",
    progressLevel: "achieved"
  },
  {
    id: 11,
    text: "Congratulations! You sold so much the accounting department is filing your commission as a business expense!",
    author: "Tax Avoidance Specialist",
    progressLevel: "achieved"
  },
  {
    id: 12,
    text: "Achievement unlocked: Sales Beast Mode! Side effects include excessive high-fives and mysterious new LinkedIn followers.",
    author: "Social Media Guru",
    progressLevel: "achieved"
  }
];

export const getRandomQuote = (progressPercentage: number): Quote => {
  let level: "low" | "medium" | "high" | "achieved";
  
  if (progressPercentage >= 100) {
    level = "achieved";
  } else if (progressPercentage >= 67) {
    level = "high";
  } else if (progressPercentage >= 34) {
    level = "medium";
  } else {
    level = "low";
  }
  
  const filteredQuotes = quotes.filter(q => q.progressLevel === level);
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  
  return filteredQuotes[randomIndex];
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CZK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};
