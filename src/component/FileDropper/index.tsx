import { useEffect, useRef, useState } from "react";
import Button from "../../atom/Button";
import s from "./index.module.scss";
import call from "../../utils/call";
import { useLoading } from "../../hook/useLoading";

export default function FileDropper({
  callback,
  setDropzone,
}: {
  callback: Function;
  setDropzone: Function;
}) {
  const dropZoneRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [fd, setFd] = useState<FormData | null>(null); // FormData
  const { setLoading } = useLoading();
  useEffect(() => {
    const dropZone = dropZoneRef.current;
    const preview = previewRef.current;
    const img = imgRef.current;
    const MAX_SIZE_MB = 4; // Batas ukuran file dalam MB
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024; // Konversi MB ke bytes

    if (dropZone && preview && img) {
      dropZone.ondragover = (e) => {
        e.preventDefault();
        dropZone.classList.add(s.active);
      };

      dropZone.ondragleave = (e) => {
        e.preventDefault();
        dropZone.classList.remove(s.active);
      };

      dropZone.ondrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer?.files[0];
        dropZone.classList.remove(s.active);

        if (file) {
          const suppportedType = [
            "image/png",
            "image/jpg",
            "image/jpeg",
            "image/webp",
          ];
          if (!suppportedType.includes(file.type)) {
            alert("File type not allowed");
            return false;
          }

          if (file.size > MAX_SIZE_BYTES) {
            alert("File size too large, max 4 MB");
            return false;
          }
          const formData = new FormData();
          formData.append("image", file);
          setFd(null);
          setFd(formData);
          const imgUrl = URL.createObjectURL(file);
          img.src = imgUrl;
          img.alt = file.name;
          dropZone.classList.add(s.hide);
          preview.classList.remove(s.hide);
        }
      };
    }
  }, [dropZoneRef]);

  function previewRemove() {
    const preview = previewRef.current;
    const img = imgRef.current;
    if (preview && img) {
      preview.classList.add(s.hide);
      img.src = "";
      img.alt = "";
      dropZoneRef.current?.classList.remove(s.hide);
    }
  }

  async function previewDone() {
    if (fd) {
      try {
        setLoading(true);
        const res = await call.postForm("/upload", fd);
        const filename = res.file.filename;
        const imgurl = `https://blogapi.aogung.com/public/images/${filename}`;
        callback(true, imgurl);
        setDropzone(false);
      } catch (error) {
        console.log(error);
        alert("error upload");
        callback(false, "");
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Cihuy");
    }
  }

  function close() {
    setDropzone(false);
  }

  function handleButtonSelectImage(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("triggered");
    const dropZone = dropZoneRef.current;
    const preview = previewRef.current;
    const img = imgRef.current;
    const MAX_SIZE_MB = 4; // Batas ukuran file dalam MB
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024; // Konversi MB ke bytes

    // Mengambil file dari input file
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      // Validasi tipe dan ukuran file
      const supportedTypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/webp",
      ];
      if (!supportedTypes.includes(file.type)) {
        alert("File type not allowed");
        return;
      }

      if (file.size > MAX_SIZE_BYTES) {
        alert("File size too large, max 4 MB");
        return;
      }

      // Menyiapkan FormData dan preview
      const formData = new FormData();
      formData.append("image", file);
      setFd(formData);

      const imgUrl = URL.createObjectURL(file);
      if (img) {
        img.src = imgUrl;
        img.alt = file.name;
      }

      if (dropZone) {
        dropZone.classList.add(s.hide);
      }
      if (preview) {
        preview.classList.remove(s.hide);
      }
    }
  }

  return (
    <div className={s.c}>
      <div className={s.c__w} ref={dropZoneRef}>
        <div>Drop files here</div>
        <div>or</div>
        <input
          type="file"
          accept="image/*"
          onChange={handleButtonSelectImage}
        />
        <Button onClick={close}>Cancel</Button>
      </div>
      <div ref={previewRef} className={`${s.preview} ${s.hide}`}>
        <div className={s.preview__img}>
          <img src="" alt="" ref={imgRef} />
        </div>
        <div className={s.preview__option}>
          <Button onClick={close}>Batalkan</Button>
          <Button onClick={previewRemove}>Ganti gambar</Button>
          <Button onClick={previewDone}>Selesai</Button>
        </div>
      </div>
    </div>
  );
}
