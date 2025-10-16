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
    <div>
      {/* This iframe will securely embed your standalone HTML calculator */}
      <iframe
        src="/tools/tool-term-sheet.html"
        title="ROI & Term Sheet Calculator"
        style={{
          width: '100%',
          height: 'calc(100vh - 64px)', // Adjust 64px to your header's height
          border: 'none',
        }}
      />
    </div>
  );
};

export default CalculatorPage;
