
import React, { useEffect, useState } from 'react';
import { Quote } from '../types';
import { getRandomQuote } from '../utils/mockData';
import { Sparkles } from 'lucide-react';

interface QuoteCardProps {
  progressPercentage: number;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ progressPercentage }) => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Get a new quote when progress percentage changes significantly
    setFadeIn(false);
    setTimeout(() => {
      setQuote(getRandomQuote(progressPercentage));
      setFadeIn(true);
    }, 300);
  }, [progressPercentage]);

  if (!quote) return <div className="h-24"></div>;

  return (
    <div 
      className={`quote-card transition-opacity duration-300 ease-in-out
                 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="flex items-start gap-2">
        <Sparkles className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
        <p className="text-lg font-medium italic text-gray-800 mb-2">"{quote.text}"</p>
      </div>
      <p className="text-sm text-right text-gray-600">— {quote.author}</p>
    </div>
  );
};

export default QuoteCard;
