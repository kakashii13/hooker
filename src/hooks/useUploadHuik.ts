export const useUploadHuik = () => {
  const addToFirebase = async () => {
    const huikObj = {
      name: currentUser?.displayName,
      userName: currentUser?.email,
      content: contentHuik,
      avatar: currentUser?.photoURL,
      idUser: currentUser?.uid,
      createdAt: Timestamp.fromDate(new Date()),
      likesCount: 0,
      sharedCount: 0,
    };
    setStatus(ComposeStatus.LOADING);
    await addDoc(collection(db, "Huiks"), huikObj);
    setStatus(ComposeStatus.SUCCESS);
    navigate("/");
  };
};
