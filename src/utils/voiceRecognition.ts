
export const startVoiceRecognition = (
  callback: (transcript: string) => void,
  onStateChange: (listening: boolean) => void,
  onError: (error: string) => void
): () => void => {
  // Check if browser supports the Web Speech API
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    onError("Your browser doesn't support speech recognition. Please try a different browser.");
    return () => {};
  }

  // Initialize speech recognition
  // @ts-ignore - TypeScript doesn't have types for webkitSpeechRecognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onstart = () => {
    console.log("Voice recognition started");
    onStateChange(true);
  };

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    console.log("Transcript:", transcript);
    callback(transcript);
    onStateChange(false);
  };

  recognition.onerror = (event: any) => {
    console.error("Voice recognition error:", event.error);
    onError(`Error: ${event.error}`);
    onStateChange(false);
  };

  recognition.onend = () => {
    console.log("Voice recognition ended");
    onStateChange(false);
  };

  // Start recognition
  recognition.start();

  // Return function to stop recognition
  return () => {
    recognition.stop();
  };
};

// Parse voice input to extract preferences
export const parseVoiceInput = (input: string) => {
  const loweredInput = input.toLowerCase();
  
  // This is a simplified version - in a real app, you'd use NLP or a trained model
  const preferences = {
    gender: extractGender(loweredInput),
    category: extractCategory(loweredInput),
    sizes: extractSizes(loweredInput),
    colors: extractColors(loweredInput),
    priceRange: extractPriceRange(loweredInput),
    fit: extractFit(loweredInput),
    fabric: extractFabric(loweredInput)
  };
  
  return preferences;
};

function extractGender(input: string) {
  if (input.match(/\b(men|man|male)\b/)) return 'Men';
  if (input.match(/\b(women|woman|female)\b/)) return 'Women';
  if (input.match(/\b(kid|kids|children|child|boy|girl)\b/)) return 'Kids';
  if (input.match(/\b(unisex|any gender)\b/)) return 'Unisex';
  return undefined;
}

function extractCategory(input: string) {
  const categories = [
    { keywords: ['shirt', 'shirts'], value: 'Shirts' },
    { keywords: ['t-shirt', 't shirt', 'tee', 'tshirt', 't-shirts'], value: 'T-Shirts' },
    { keywords: ['jeans', 'denim'], value: 'Jeans' },
    { keywords: ['pants', 'trousers'], value: 'Pants' },
    { keywords: ['dress', 'dresses'], value: 'Dresses' },
    { keywords: ['jacket', 'jackets'], value: 'Jackets' },
    { keywords: ['sweater', 'sweaters', 'pullover'], value: 'Sweaters' },
  ];
  
  for (const category of categories) {
    if (category.keywords.some(keyword => input.includes(keyword))) {
      return category.value;
    }
  }
  
  return undefined;
}

function extractSizes(input: string) {
  const sizes: string[] = [];
  
  // Check for standard sizes
  const standardSizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  for (const size of standardSizes) {
    if (input.match(new RegExp(`\\b${size.toLowerCase()}\\b`)) ||
        input.match(new RegExp(`\\bsize\\s+${size.toLowerCase()}\\b`))) {
      sizes.push(size);
    }
  }
  
  // Check for numeric sizes
  const sizeMatch = input.match(/\bsize\s+(\d{1,2})\b/);
  if (sizeMatch) {
    sizes.push(sizeMatch[1]);
  }
  
  return sizes.length > 0 ? sizes : undefined;
}

function extractColors(input: string) {
  const commonColors = [
    'black', 'white', 'red', 'blue', 'green', 'yellow', 'purple', 'pink',
    'orange', 'brown', 'gray', 'navy', 'beige', 'burgundy', 'olive'
  ];
  
  const foundColors = commonColors.filter(color => input.includes(color));
  return foundColors.length > 0 ? foundColors : undefined;
}

function extractPriceRange(input: string) {
  // Check for specific price patterns
  const underMatch = input.match(/under\s+(\d+)/);
  if (underMatch) {
    return { min: 0, max: parseInt(underMatch[1]) };
  }
  
  const betweenMatch = input.match(/between\s+(\d+)\s+and\s+(\d+)/);
  if (betweenMatch) {
    return { min: parseInt(betweenMatch[1]), max: parseInt(betweenMatch[2]) };
  }
  
  const rangeMatch = input.match(/(\d+)\s+to\s+(\d+)/);
  if (rangeMatch) {
    return { min: parseInt(rangeMatch[1]), max: parseInt(rangeMatch[2]) };
  }
  
  return undefined;
}

function extractFit(input: string) {
  if (input.match(/\b(slim|skinny|fitted)\b/)) return 'Slim';
  if (input.match(/\b(regular|normal|classic)\b/)) return 'Regular';
  if (input.match(/\b(loose|relaxed)\b/)) return 'Loose';
  if (input.match(/\b(oversized|baggy)\b/)) return 'Oversized';
  return undefined;
}

function extractFabric(input: string) {
  const fabrics = [
    'cotton', 'linen', 'silk', 'wool', 'denim', 'polyester', 
    'leather', 'suede', 'nylon', 'cashmere', 'velvet'
  ];
  
  const foundFabrics = fabrics.filter(fabric => input.includes(fabric));
  return foundFabrics.length > 0 ? foundFabrics : undefined;
}
