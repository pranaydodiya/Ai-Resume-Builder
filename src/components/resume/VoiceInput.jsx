import { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FiMic, FiMicOff, FiCheck, FiX } from 'react-icons/fi';
import './VoiceInput.css';

function VoiceInput({ onTranscriptComplete, fieldName, placeholder }) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setError('Your browser does not support voice input.');
    }
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    if (!isMicrophoneAvailable) {
      setError('Please allow microphone access to use voice input.');
    }
  }, [isMicrophoneAvailable]);

  const startListening = async () => {
    try {
      setError(null);
      setIsListening(true);
      resetTranscript();
      await SpeechRecognition.startListening({ continuous: true });
    } catch (err) {
      setError('Failed to start voice input. Please try again.');
      setIsListening(false);
    }
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
  };

  const handleAccept = () => {
    if (transcript.trim()) {
      onTranscriptComplete(fieldName, transcript);
      resetTranscript();
    }
  };

  const handleCancel = () => {
    resetTranscript();
    stopListening();
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div className="voice-input">
      {error && (
        <div className="voice-error">
          <FiX className="error-icon" />
          {error}
        </div>
      )}
      
      <div className="voice-controls">
        {!isListening ? (
          <button
            type="button"
            className="voice-button"
            onClick={startListening}
            disabled={!!error}
          >
            <FiMic />
            Start Voice Input
          </button>
        ) : (
          <button
            type="button"
            className="voice-button recording"
            onClick={stopListening}
          >
            <FiMicOff />
            Stop Recording
          </button>
        )}
        
        {transcript && (
          <div className="transcript-actions">
            <button
              type="button"
              className="action-button accept"
              onClick={handleAccept}
            >
              <FiCheck />
              Accept
            </button>
            <button
              type="button"
              className="action-button cancel"
              onClick={handleCancel}
            >
              <FiX />
              Cancel
            </button>
          </div>
        )}
      </div>
      
      {isListening && (
        <div className="recording-indicator">
          <div className="pulse-dot"></div>
          Recording...
        </div>
      )}
      
      {transcript && (
        <div className="transcript-preview">
          <p>{transcript || placeholder}</p>
        </div>
      )}
    </div>
  );
}

export default VoiceInput;