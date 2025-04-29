
import { useState, useEffect } from 'react';
import { Mic, MicOff, Search, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { startVoiceRecognition } from "@/utils/voiceRecognition";
import { useShoppingContext } from "@/contexts/ShoppingContext";

const VoiceSearchBar = () => {
  const { 
    searchQuery, 
    updateSearchQuery, 
    isVoiceListening, 
    setVoiceListening,
    processVoiceQuery 
  } = useShoppingContext();
  
  const [stopListening, setStopListening] = useState<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      // Clean up voice recognition when component unmounts
      if (stopListening) {
        stopListening();
      }
    };
  }, [stopListening]);

  const handleVoiceButtonClick = () => {
    if (isVoiceListening && stopListening) {
      stopListening();
      setStopListening(null);
      setVoiceListening(false);
      return;
    }

    const stop = startVoiceRecognition(
      (transcript) => {
        processVoiceQuery(transcript);
        toast.success("Voice input processed!");
      },
      (listening) => {
        setVoiceListening(listening);
      },
      (error) => {
        toast.error(error);
      }
    );

    setStopListening(() => stop);
  };

  const handleClearSearch = () => {
    updateSearchQuery('');
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            className="pl-10 pr-10 h-12 rounded-full bg-white shadow-sm"
            placeholder="Search for products or try: 'slim fit cotton shirt under 50'"
            value={searchQuery}
            onChange={(e) => updateSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={handleClearSearch}
            >
              <X size={18} />
            </button>
          )}
        </div>
        <Button
          variant={isVoiceListening ? "destructive" : "default"}
          className={`ml-2 rounded-full h-12 w-12 p-0 ${isVoiceListening ? "animate-pulse-soft" : ""}`}
          onClick={handleVoiceButtonClick}
        >
          {isVoiceListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
      </div>
      {isVoiceListening && (
        <div className="absolute left-0 right-0 text-center -bottom-8 text-sm font-medium text-primary">
          Listening... Speak now
        </div>
      )}
    </div>
  );
};

export default VoiceSearchBar;
