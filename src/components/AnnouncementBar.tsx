import { useState } from "react";
import { Link } from "react-router-dom";
import { Megaphone, X } from "lucide-react";

/**
 * AnnouncementBar
 * - Tightened vertical padding to reduce top whitespace on mobile
 * - Keeps good readability on larger screens
 * - Accessible close button; remembers only for the session (simple state)
 */
const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-amber-500 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* NOTE: changed p-2 -> py-1 sm:py-2 to tighten height on phones */}
        <div className="relative flex items-center justify-center py-1 sm:py-2 text-sm font-medium">
          {/* Slightly smaller icon on phones */}
          <Megaphone className="h-3.5 w-3.5 mr-2 sm:h-4 sm:w-4" aria-hidden="true" />
          <div className="text-center">
            <Link
              to="/resources/roi-calculator"
              className="underline font-semibold hover:text-white/90"
            >
              Try our FREE ROI & Term Sheet Calculator
            </Link>{" "}
            — Analyze your next deal in seconds.
          </div>

          {/* Dismiss button */}
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-md p-1 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Dismiss announcement"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
