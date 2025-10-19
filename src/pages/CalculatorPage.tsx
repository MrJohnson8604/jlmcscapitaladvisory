import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const CalculatorPage = () => {
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState('100vh'); // Start with a default height

  // This is the "route guard" to check for access
  useEffect(() => {
    const hasAccess = localStorage.getItem('hasCalculatorAccess');
    if (hasAccess !== 'true') {
      console.log("Access denied. Redirecting to form.");
      navigate('/resources/roi-calculator');
    }
  }, [navigate]);

  // This effect listens for messages from the iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Check if the message is the one we're expecting (for resizing)
      if (event.data && event.data.type === 'resize') {
        // Add a little extra padding for better spacing
        const newHeight = event.data.payload.height + 48; 
        setIframeHeight(`${newHeight}px`);
      }
    };

    // Add the event listener
    window.addEventListener('message', handleMessage);

    // This is a "cleanup function" that removes the listener when the component is unmounted
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []); // The empty array ensures this effect runs only once

  const calculatorUrl = '/tools/tool-term-sheet.html';

  return (
    // We remove flex properties to allow the content to define the height naturally
    <div className="w-full">
      <iframe
        ref={iframeRef}
        src={calculatorUrl}
        title="ROI & Term Sheet Calculator"
        className="w-full border-0"
        style={{ height: iframeHeight, transition: 'height 0.3s ease-in-out' }}
        scrolling="no" // We turn off the iframe's scrollbar
      />
    </div>
  );
};

export default CalculatorPage;