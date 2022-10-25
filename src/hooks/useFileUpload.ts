import {
  useStateUploadedCID,
  useStateUploadedIconUrl,
  useStateUploadStatus,
} from "@/recoilstate/fileUpload";

const DWEB_LINK = ".ipfs.w3s.link/";

export const useFileUpload = () => {
  const [status, setStatus] = useStateUploadStatus();
  const [cid, setCID] = useStateUploadedCID();
  const [icon, setIcon] = useStateUploadedIconUrl();

  const upload = async (files: File[]) => {
    setStatus("uploading");
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    const options = {
      method: "POST",
      body: formData,
    };

    try {
      const res = await fetch("/api/web3StorageUploader", options);
      const data = await res.json();
      if (data.cid) {
        setCID(data.cid);
        setStatus("completed");
        return data.cid as string;
      } else {
        setStatus("failed");
        return;
      }
    } catch (e) {
      console.error(e);
      setStatus("failed");
    }
  };

  const uploadIcon = async (icon: File) => {
    if (!icon) return;
    const fileName = icon.name;
    const cid = await upload([icon]);
    setIcon(`https://${cid}${DWEB_LINK}${fileName}`);
  };

  const resetUploadStatus = () => {
    setCID(undefined);
    setStatus(undefined);
  };

  return {
    upload,
    status,
    cid,
    resetUploadStatus,
    uploadIcon,
    setIcon,
    icon,
  };
};
