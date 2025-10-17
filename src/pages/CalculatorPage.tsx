import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CalculatorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hasAccess = localStorage.getItem('hasCalculatorAccess');
    if (hasAccess !== 'true') {
      // If user hasn't submitted the form, send them back to the landing page
      navigate('/resources/roi-calculator');
    }
  }, [navigate]);

  return (
    // FIX: This container is now set to fill the available space, making it flexible.
    <div className="h-full">
      <iframe
        src="/tools/tool-term-sheet.html"
        title="ROI & Term Sheet Calculator"
        // FIX: The iframe now takes 100% of its container's height instead of a fixed value.
        className="w-full h-full border-0"
      />
    </div>
  );
};

export default CalculatorPage;

