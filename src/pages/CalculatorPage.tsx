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
    // FIX: This container now absolutely fills its parent (<main>)
    <div className="absolute inset-0">
      <iframe
        src="/tools/tool-term-sheet.html"
        title="ROI & Term Sheet Calculator"
        // FIX: The iframe fills its container, which now has the correct full height
        className="w-full h-full border-0"
      />
    </div>
  );
};

export default CalculatorPage;

