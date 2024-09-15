"use client"
import { AnimatePresence, motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';


interface ModalProps {
  openModal: boolean;
  handleCloseModal: () => void;
  interviewId: string;
}

const UserPermissionModal = ({ openModal, handleCloseModal, interviewId }: ModalProps) => {
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [microphonePermission, setMicrophonePermission] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const router = useRouter(); // Use router to programmatically navigate

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleCameraToggle = () => {
    setCameraPermission((prev) => !prev);
  };

  const handleMicrophoneToggle = () => {
    setMicrophonePermission((prev) => !prev);
  };

  const handlePermissionToggle = () => {
    if (cameraPermission && microphonePermission) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(() => {
          setWebcamEnabled(true);
        })
        .catch(() => {
          setWebcamEnabled(false);
        });
    } else {
      if (webcamRef.current) {
        const stream = webcamRef.current.stream;
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
      }
      setWebcamEnabled(false);
    }
  };

  const handleProceed = () => {
    if (cameraPermission && microphonePermission) {
      console.log('Permissions granted. Proceeding...');
      handleCloseModal(); // Optionally close the modal
      router.push(`/dashboard/interviews/${interviewId}`); // Navigate to the interview page
    }
  };

  return (
    <AnimatePresence>
      {openModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-white p-5 w-full max-w-xl  rounded-lg shadow-lg"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <div className="flex justify-between items-center relative mb-4">
              <div>
                <h2 className="text-xl font-black">Permission Request</h2>
                <p className="text-xs font-semibold text-zinc-600">
                  We need access to your microphone and camera for the best experience.
                </p>
              </div>
              <button
                className="text-3xl absolute -top-3 right-0 text-gray-500 hover:text-gray-700"
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <div className="flex flex-col gap-y-3 border border-gray-200 rounded-lg p-2 bg-blue-200 text-blue-800 font-semibold">
              <div className="flex gap-1">
                <Lightbulb />
                <h1 className="text-base">Note:</h1>
              </div>
              <p className="text-sm">
                To provide you with real-time feedback and interactive features, we need access to your microphone and camera. Your privacy and security are important to us, and we will only use these permissions for the intended purpose.
              </p>
            </div>

            <div className="mt-4">
              <div className="flex items-center mb-4">
                <span className="mr-2 text-gray-700 font-semibold text-base text-nowrap">
                Turn on camera permissions to interact in real-time:
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cameraPermission}
                    onChange={handleCameraToggle}
                    className="sr-only"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full"></div>
                  <div
                    className={`absolute left-1 w-5 h-5 ${cameraPermission ? 'bg-blue-600' : 'bg-white'} rounded-full transform transition-transform ${
                      cameraPermission ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  ></div>
                </label>
              </div>

              <div className="flex items-center mb-4">
                <span className="mr-2 text-gray-700 font-semibold text-base text-nowrap">
                Turn on microphone permissions to participate in voice interaction:
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={microphonePermission}
                    onChange={handleMicrophoneToggle}
                    className="sr-only"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full"></div>
                  <div
                    className={`absolute left-1 w-5 h-5 ${microphonePermission ? 'bg-blue-600' : 'bg-white'} rounded-full transform transition-transform ${
                      microphonePermission ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  ></div>
                </label>
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-4">
              <button
                className={`px-4 py-2 rounded-lg text-white ${
                  cameraPermission && microphonePermission ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'
                }`}
                onClick={handlePermissionToggle}
                disabled={!cameraPermission || !microphonePermission}
              >
                {webcamEnabled ? 'Revoke Access' : 'Grant Access'}
              </button>

              <button
                className={`px-4 py-2 rounded-lg text-white ${
                  cameraPermission && microphonePermission ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
                }`}
                onClick={handleProceed}
                disabled={!cameraPermission || !microphonePermission}
              >
                Start Interview
              </button>
            </div>

            {webcamEnabled && (
              <div className="mt-4 flex justify-center">
                <Webcam ref={webcamRef} className="h-72 w-72" />
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UserPermissionModal;