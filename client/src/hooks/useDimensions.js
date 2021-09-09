import { useState, useEffect } from 'react';

function getDimensions() {
  const { innerWidth, innerHeight } = window;
  let width, height;
  if (innerHeight > (innerWidth - 20) / 2.03) {
    width = innerWidth - 20;
    height = width / 2.03;
  } else {
    height = innerHeight;
    width = height * 2.03;
  }

  return {
    width,
    height
  };
}

export default function useDimensions() {
  const [dimensions, setDimensions] = useState(getDimensions());

  useEffect(() => {
    function handleResize() {
      setDimensions(getDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
}