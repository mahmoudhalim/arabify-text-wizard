
import React, { useRef, useState } from "react";
import { Camera } from "lucide-react";
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
  const [stream, setStream] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Start the camera when dialog opens
  React.useEffect(() => {
    if (isOpen) {
      startCamera();
    } else if (stream) {
      stopCamera();
    }
    
    return () => {
      if (stream) stopCamera();
    };
  }, [isOpen]);
  
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
  
  const processOCR = async (blob) => {
    setIsProcessing(true);
    try {
      // Create a File object from the blob
      const imageFile = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
      
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
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center arabic-text">التقاط صورة للنص العربي</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-full aspect-video overflow-hidden rounded-md bg-muted">
            <video 
              ref={videoRef} 
              className="w-full h-full object-cover" 
              autoPlay 
              playsInline
            />
            <canvas ref={canvasRef} className="hidden" />
          </div>
          
          <DialogFooter className="w-full flex flex-col sm:flex-row gap-2">
            <Button
              onClick={captureImage}
              className="bg-arabicGold hover:bg-arabicGold/80 text-arabicBlue font-bold"
              disabled={!isCapturing || isProcessing}
            >
              {isProcessing ? "جاري معالجة الصورة..." : "التقاط صورة"}
            </Button>
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
