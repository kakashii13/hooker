import { getDownloadURL, UploadTask } from "firebase/storage";
import { useEffect, useState } from "react";
import { uploadImage } from "../firebase/client";

enum DragImageStates {
    ERROR = -1,
    NONE = 0,
    DRAG_OVER = 1,
    UPLOADING = 2,
    COMPLETE = 3,
  }
  

export const useUploadImg = () => {
    const [drag, setDrag] = useState(DragImageStates.NONE)
    const [file, setFile] = useState<File | undefined>(undefined)
    const [task, setTask] = useState<UploadTask | null>(null)
  const [imgURL, setImgURL] = useState<string | null>(null);
    const [previewImg, setPreviewImg] = useState<
    string | ArrayBuffer | undefined
  >(undefined);

    const handleDragEnter = (e: React.DragEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setDrag(DragImageStates.DRAG_OVER);
      };
    
      const handleDragLeave = (e: React.DragEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setDrag(DragImageStates.NONE);
      };
    
      const handleDragDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setDrag(DragImageStates.UPLOADING);
        const file = e.dataTransfer.files[0];
        setFile(file);
        const taskTest = uploadImage(file);
        setTask(taskTest);
      };
    
      const handleDelete = () => {
        setPreviewImg("");
      };

      useEffect(() => {
        if (task) {
          const onProgress = () => {
            setDrag(DragImageStates.UPLOADING)
          };
          const onError = () => {};
          const onComplete = () => {
            getDownloadURL(task.snapshot.ref).then((downloadImg) => {
              setImgURL(downloadImg);
              setDrag(DragImageStates.COMPLETE)
            });
          };
    
          task.on("state_changed", onProgress, onError, onComplete);
        }
      }, [task]);
    
      // show preview img
      useEffect(() => {
        if (file) {
          const fileReader = new FileReader();
          fileReader.onload = (e) => {
            if (!e.target) return;
            const { result } = e.target;
            if (result) {
              setPreviewImg(result);
            }
          };
          fileReader.readAsDataURL(file);
        }
      }, [file]);

      return{handleDelete, handleDragDrop, handleDragEnter, handleDragLeave, drag, task, previewImg, imgURL}
}