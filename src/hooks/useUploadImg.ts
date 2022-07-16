import { getDownloadURL, UploadTask } from "firebase/storage";
import { useEffect, useState } from "react";
import { DragImageStates } from "../enum";
import { uploadImage } from "../firebase/client";

export const useUploadImg = (setDrag: any, setImgURL: any) => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [task, setTask] = useState<UploadTask | null>(null);
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
    setImgURL(null);
    setFile(undefined);
  };

  useEffect(() => {
    if (task) {
      const onProgress = () => {
        setDrag(DragImageStates.UPLOADING);
        console.log("onProgress");
      };
      const onError = () => {};
      const onComplete = () => {
        getDownloadURL(task.snapshot.ref).then((downloadImg) => {
          setImgURL(downloadImg);
          setDrag(DragImageStates.COMPLETE);
          console.log("onComplete");
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

  return {
    handleDelete,
    handleDragDrop,
    handleDragEnter,
    handleDragLeave,
    previewImg,
  };
};
