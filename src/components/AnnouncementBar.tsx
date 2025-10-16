import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, X } from 'lucide-react';

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-amber-500 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-center p-2 text-sm font-medium">
          <Megaphone className="h-4 w-4 mr-2" />
          <p>
            <Link to="/resources/roi-calculator" className="underline font-semibold hover:text-amber-100">
              Try our FREE ROI & Term Sheet Calculator
            </Link>
            <span className="hidden sm:inline"> — Analyze your next deal in seconds.</span>
          </p>
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="absolute top-1/2 right-4 -translate-y-1/2 rounded-md p-1 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span className="sr-only">Dismiss</span>
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
