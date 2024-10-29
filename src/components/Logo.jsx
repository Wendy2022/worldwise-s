import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

/* function Logo() {
  return (
    <Link to="/">
      <img
        src={`${import.meta.env.BASE_URL}logo.png`}
        alt="WorldWise logo"
        className={styles.logo}
      />
    </Link>
  );
} */

function Logo() {
  return (
    <Link to="/">
      <img
        // 直接用绝对路径引用 public 文件夹中的图片
        src="/logo.png"
        alt="WorldWise logo"
        className={styles.logo}
      />
    </Link>
  );
}

export default Logo;
