// --- hooks/useVoiceControl.js ---
import { useState } from 'react';

const useVoiceControl = (userSettings, router) => {
    const [isListening, setIsListening] = useState(false);
    const [systemMessage, setSystemMessage] = useState("");
    const [isVoiceControlActive, setIsVoiceControlActive] = useState(false); 

    const speakFeedback = (text) => {
        const lang = userSettings.languageCode || 'en';
        console.log(`TTS Speaking [${lang}]: ${text}`);
        setSystemMessage(text);

        // Clear the message after 5 seconds
        setTimeout(() => {
            setSystemMessage("");
        }, 5000); 
    };

    const startListening = () => {
        if (!isVoiceControlActive || isListening) return; 

        setIsListening(true);
        setSystemMessage("Listening..."); 
        
        // Simulates the time taken for the API to process speech
        setTimeout(() => {
            handleCommand("Smart help me navigate to home page");
        }, 2000); 
    };

    const handleCommand = (transcribedText) => {
        setIsListening(false);
        const text = transcribedText.toLowerCase();

        if (text.includes("navigate to home") || text.includes("pulang ke rumah")) {
            speakFeedback("Ok noted Jun, Now i will redirect to Home Page.");
            // Navigate to home using the passed router object
            if (router) {
                 router.replace('HomeScreen'); 
            }
            setIsVoiceControlActive(false); // Close the modal after command
        } else {
            speakFeedback("I did not understand. Please try again.");
        }
    };
    
    return { 
        isListening, 
        systemMessage, 
        startListening, 
        isVoiceControlActive, 
        setIsVoiceControlActive 
    };
};

export default useVoiceControl;