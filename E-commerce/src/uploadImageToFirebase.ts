import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./FireBaseConfig";

export async function uploadImageToFirebase(file: File): Promise<string> {
  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}