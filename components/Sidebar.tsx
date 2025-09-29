// components/Sidebar.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FiHome,
  FiBook,
  FiEdit3,
  FiSearch,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";
import styles from "../styles/ForYou.module.css";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useUI } from "@/contexts/UIContext";
import { logout } from "@/utils/auth";

export default function Sidebar() {
  const router = useRouter();
  const { setShowModal } = useUI();
  const { user, loading } = useAuth();

  const isActive = (path: string) => router.pathname === path;

  if (loading) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
if (router.pathname === "/") {
      router.push("/for-you");
    }    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className={styles.sidebar}>
      <Image
        src="/logo.png"
        alt="Summarist Logo"
        width={160}
        height={40}
        className={styles.logo}
      />

      <nav className={styles.menu}>
        <Link
          href="/for-you"
          className={`${styles.menuItem} ${
            isActive("/for-you") ? styles.active : ""
          }`}
        >
          <FiHome className={styles.icon} />
          <span>For you</span>
        </Link>

        <Link
          href="/library"
          className={`${styles.menuItem} ${
            isActive("/library") ? styles.active : ""
          }`}
        >
          <FiBook className={styles.icon} />
          <span>My Library</span>
        </Link>

        <div className={`${styles.menuItem} ${styles.disabledItem}`}>
          <FiEdit3 className={styles.icon} />
          <span>Highlights</span>
        </div>

        <div className={`${styles.menuItem} ${styles.disabledItem}`}>
          <FiSearch className={styles.icon} />
          <span>Search</span>
        </div>
      </nav>

      <div className={styles.menuBottom}>
        <Link
          href="/settings"
          className={`${styles.menuItem} ${
            isActive("/settings") ? styles.active : ""
          }`}
        >
          <FiSettings className={styles.icon} />
          <span>Settings</span>
        </Link>

        <div className={`${styles.menuItem} ${styles.disabledItem}`}>
          <FiHelpCircle className={styles.icon} />
          <span>Help & Support</span>
        </div>

        <div
          className={styles.menuItem}
          onClick={user ? handleLogout : () => setShowModal(true)}
          style={{ cursor: "pointer" }}
        >
          <FiLogOut className={styles.icon} />
          <span>{user ? "Logout" : "Login"}</span>
        </div>
      </div>
    </aside>
  );
}
