
import React, { useRef, useState } from "react";
import { Camera, Upload } from "lucide-react";
import { performOCR } from "@/utils/ocr";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const CameraDialog = ({ isOpen, onClose, onTextExtracted }) => {
  const { toast } = useToast();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('camera'); // 'camera' or 'upload'
  
  // Start the camera when dialog opens and camera tab is active
  React.useEffect(() => {
    if (isOpen && activeTab === 'camera') {
      startCamera();
    } else if (stream) {
      stopCamera();
    }
    
    return () => {
      if (stream) stopCamera();
    };
  }, [isOpen, activeTab]);
  
  const startCamera = async () => {
    setIsCapturing(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Camera error:", error);
      toast({
        title: "خطأ",
        description: "فشل في الوصول للكاميرا",
        variant: "destructive"
      });
      setIsCapturing(false);
      onClose();
    }
  };
  
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCapturing(false);
  };
  
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert canvas to blob
    canvas.toBlob(processOCR, "image/jpeg", 0.95);
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast({
        title: "خطأ",
        description: "الرجاء اختيار ملف صورة صالح",
        variant: "destructive"
      });
      return;
    }
    
    processOCR(file);
  };
  
  const processOCR = async (blob) => {
    setIsProcessing(true);
    try {
      // Create a File object from the blob if it's not already a File
      const imageFile = blob instanceof File ? blob : new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
      
      // Perform OCR on the image
      const extractedText = await performOCR(imageFile);
      
      // Pass the extracted text back
      onTextExtracted(extractedText);
      onClose();
      
      toast({
        title: "تم بنجاح",
        description: "تم استخراج النص من الصورة"
      });
      
    } catch (error) {
      console.error("OCR processing error:", error);
      toast({
        title: "خطأ",
        description: error.message || "فشل في استخراج النص",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center arabic-text">استخراج النص من الصورة</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4">
          {/* Tab Navigation */}
          <div className="flex w-full border-b mb-4">
            <button 
              className={`flex-1 py-2 text-center font-medium ${activeTab === 'camera' ? 'text-arabicGold border-b-2 border-arabicGold' : 'text-gray-500'}`}
              onClick={() => setActiveTab('camera')}
            >
              <Camera className="inline-block w-4 h-4 mr-1" />
              التقاط صورة
            </button>
            <button 
              className={`flex-1 py-2 text-center font-medium ${activeTab === 'upload' ? 'text-arabicGold border-b-2 border-arabicGold' : 'text-gray-500'}`}
              onClick={() => setActiveTab('upload')}
            >
              <Upload className="inline-block w-4 h-4 mr-1" />
              تحميل صورة
            </button>
          </div>
          
          {/* Camera View */}
          {activeTab === 'camera' && (
            <div className="relative w-full aspect-video overflow-hidden rounded-md bg-muted">
              <video 
                ref={videoRef} 
                className="w-full h-full object-cover" 
                autoPlay 
                playsInline
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}
          
          {/* File Upload View */}
          {activeTab === 'upload' && (
            <div className="flex flex-col items-center justify-center w-full aspect-video bg-muted rounded-md border-2 border-dashed border-gray-300 p-6">
              <Upload className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-center text-gray-500 mb-4">اضغط هنا لاختيار صورة</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button 
                onClick={triggerFileInput}
                variant="outline"
                disabled={isProcessing}
              >
                اختيار صورة
              </Button>
            </div>
          )}
          
          <DialogFooter className="w-full flex flex-col sm:flex-row gap-2">
            {activeTab === 'camera' && (
              <Button
                onClick={captureImage}
                className="bg-arabicGold hover:bg-arabicGold/80 text-arabicBlue font-bold"
                disabled={!isCapturing || isProcessing}
              >
                {isProcessing ? "جاري معالجة الصورة..." : "التقاط صورة"}
              </Button>
            )}
            
            {activeTab === 'upload' && (
              <Button
                onClick={triggerFileInput}
                className="bg-arabicGold hover:bg-arabicGold/80 text-arabicBlue font-bold"
                disabled={isProcessing}
              >
                {isProcessing ? "جاري معالجة الصورة..." : "اختيار صورة"}
              </Button>
            )}
            
            <Button variant="outline" onClick={onClose}>
              إلغاء
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CameraDialog;
