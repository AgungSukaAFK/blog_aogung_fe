import "./index.css";
import s from "./index.module.scss";

export default function Loading({ isLoading }: { isLoading: any }) {
  return (
    <>
      {isLoading && (
        <div className={s.container} title="Sabar yaa...">
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className={`${s.loading} ${s.animation}`}>
            <span>L</span>
            <span>O</span>
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
          </div>
        </div>
      )}
    </>
  );
}
