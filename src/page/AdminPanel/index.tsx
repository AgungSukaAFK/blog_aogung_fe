import Button from "../../atom/Button";
import Divider from "../../atom/Divider";
import UserLayout from "../../layout/UserLayout";
import s from "./index.module.scss";

export default function AdminPanel() {
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
  return (
    <UserLayout type="admin">
      <div className={s.userdata}>
        <div className={s.userdata__info}>
          <div className={s.userdata__info__field}>
            <span>Name</span>
            {dummyUserData.name}
          </div>
          <div className={s.userdata__info__field}>
            <span>Total Blogs</span>
            {dummyUserData.totalBlogs}
          </div>
          <div className={s.userdata__info__field}>
            <span>Created date</span>
            {dummyUserData.createdAt}
          </div>
          <Button className={s.userdata__button}>Change password</Button>
        </div>
        <div className={s.userdata__image}>
          <img
            src="https://utfs.io/f/3da9a5a0-61e6-4c86-ae5c-c52d6798ae64-i0b7x5.jpg"
            alt="profile"
          />
          <Button className={s.userdata__button}>Change image</Button>
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
