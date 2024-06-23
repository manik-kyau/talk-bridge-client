import { useState } from 'react';

const ClickOnceButton = () => {
  // State to track if button has been clicked
  const [clicked, setClicked] = useState(false);

  // Function to handle button click
  const handleClick = () => {
    if (!clicked) {
      setClicked(true);
      console.log('Button clicked!');
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={clicked} // Disable the button if it has been clicked
      className={`px-4 py-2 font-semibold text-white rounded ${clicked ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}`}
    >
      {clicked ? 'Clicked' : 'Click Me'}
    </button>
  );
};

export default ClickOnceButton;