import Button from "../../atom/Button";
import Divider from "../../atom/Divider";
import { useAuth } from "../../hook/useAuth";
import UserLayout from "../../layout/UserLayout";
import s from "./index.module.scss";
import { UserModel } from "../../types";
import FileDropper from "../../component/FileDropper";
import { useState } from "react";
import call from "../../utils/call";
import ChangePassword from "../../component/ChangePassword";

export default function AdminPanel() {
  const [dz, setDz] = useState<boolean>(false); // Drop zone
  const [cpw, setCpw] = useState<boolean>(false); // Change Password
  const { user }: { user: UserModel | null } = useAuth();
  // const { setLoading } = useLoading();

  // useEffect(() => {
  //   setLoading(loading);
  // }, [loading]);

  const dummyUserData = {
    name: "Wisma",
    role: "admin",
    createdAt: "27 April 2024",
    updatedAt: "29 April 2024",
    totalBlogs: 7,
  };

  const dummyBlogs = [
    {
      title: "lorem ipsum dolor sit amet",
      image:
        "https://utfs.io/f/3da9a5a0-61e6-4c86-ae5c-c52d6798ae64-i0b7x5.jpg",
    },
    {
      title: "lorem ipsum dolor sit amet",
      image:
        "https://utfs.io/f/3da9a5a0-61e6-4c86-ae5c-c52d6798ae64-i0b7x5.jpg",
    },
    {
      title: "lorem ipsum dolor sit amet",
      image:
        "https://utfs.io/f/3da9a5a0-61e6-4c86-ae5c-c52d6798ae64-i0b7x5.jpg",
    },
  ];

  function generateLocalDate(date: string) {
    const d = new Date(date);
    return `${d.getDate()} ${d.toLocaleString("default", {
      month: "short",
    })} ${d.getFullYear()}`;
  }

  function changeImage() {
    setDz(true);
  }

  async function dropZoneCallback(success: boolean, url: string) {
    // kalau sukses, ubah data image di databasenya
    if (success) {
      // ubah image di database
      await call
        .post("/user/update", {
          updatedUser: {
            image: url,
          },
        })
        .catch((err) => {
          console.log(err);
        });
      window.location.reload();
    }
  }

  function changePasswordButton() {
    setCpw(true);
  }

  return (
    <UserLayout type="admin">
      {dz && (
        <FileDropper
          callback={dropZoneCallback}
          setDropzone={setDz}
        ></FileDropper>
      )}
      {cpw && <ChangePassword setCpw={setCpw} />}
      <div className={s.userdata}>
        <div className={s.userdata__info}>
          <div className={s.userdata__info__field}>
            <span>Name</span>
            {user?.username}
          </div>
          <div className={s.userdata__info__field}>
            <span>Total Blogs</span>
            {dummyUserData.totalBlogs}
          </div>
          <div className={s.userdata__info__field}>
            <span>Created date</span>
            {user?.created && generateLocalDate(user.created)}
          </div>
          <Button className={s.userdata__button} onClick={changePasswordButton}>
            Change password
          </Button>
        </div>
        <div className={s.userdata__image}>
          <img src={user?.image} alt="profile" />
          <Button className={s.userdata__button} onClick={changeImage}>
            Change image
          </Button>
        </div>
      </div>
      <Divider />
      <Button>Create blog</Button>
      <div className={s.blogs}>
        {dummyBlogs.map((blog, index) => (
          <div className={s.blogs__blog} key={index}>
            <img src={blog.image} alt="blog" />
            <p>{blog.title}</p>
            <Button>Edit</Button>
            <Button>Delete</Button>
          </div>
        ))}
      </div>
    </UserLayout>
  );
}
