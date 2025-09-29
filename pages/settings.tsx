// pages/settings.tsx
import DashboardLayout from "../components/DashboardLayout";
import styles from "../styles/ForYou.module.css";
import { useAuth } from "../contexts/AuthContext";
import Image from "next/image";
import { useUI } from "../contexts/UIContext";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const { setShowModal } = useUI();
  const [isGoogleUser, setIsGoogleUser] = useState(false);

  // Detect Google-authenticated user
  useEffect(() => {
    const checkProvider = async () => {
      if (user) {
        const providerId = user.providerData?.[0]?.providerId;

        console.log("DEBUG: providerData[0].providerId:", providerId);

        const isGoogle = providerId === "google.com";
        setIsGoogleUser(isGoogle);
      }
    };

    checkProvider();
  }, [user]);

  useEffect(() => {
    console.log("DEBUG: isGoogleUser changed to:", isGoogleUser);
  }, [isGoogleUser]);

  if (loading) {
    return (
      <DashboardLayout>
        <SearchBar />
        <div className={styles.libraryContainerS}>
          <h1 className={styles.heading} style={{ fontSize: "32px" }}>
            Settings
          </h1>
          <hr style={{ borderColor: "#e1e7ea", margin: "16px 0" }} />
          <div className={styles.skeletonBlock}>
            <div
              className={styles.skeletonLine}
              style={{ width: "240px", height: "24px" }}
            ></div>
            <div
              className={styles.skeletonLine}
              style={{ width: "180px", height: "20px", marginTop: "24px" }}
            ></div>
            <div
              className={styles.skeletonLine}
              style={{
                width: "160px",
                height: "36px",
                borderRadius: "6px",
                marginTop: "12px",
              }}
            ></div>
            <div
              className={styles.skeletonLine}
              style={{ width: "100px", height: "20px", marginTop: "32px" }}
            ></div>
            <div
              className={styles.skeletonLine}
              style={{ width: "240px", height: "20px", marginTop: "12px" }}
            ></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <SearchBar />

      <div className={styles.settingsPage}>
        <h1 className={styles.heading} style={{ fontSize: "32px" }}>
          Settings
        </h1>
        <hr style={{ borderColor: "#e1e7ea", margin: "16px 0" }} />

        {!user ? (
          <div className={styles.loginWrapper}>
            <Image
              src="https://summarist.vercel.app/_next/static/media/login.e313e580.png"
              alt="login"
              width={460}
              height={317}
            />
            <p className={styles.loginText}>
              Log in to your account to see your details.
            </p>
            <button
              className={styles.loginBtn}
              onClick={() => setShowModal(true)}
            >
              Login
            </button>
          </div>
        ) : (
          <>
            <div>
              <h4 className={styles.heading} style={{ fontSize: "18px" }}>
                Your Subscription plan
              </h4>
              <p style={{ color: "#032b41", marginBottom: "16px" }}>Basic</p>

              {/* Upgrade button visible only for Google users */}
              {user && isGoogleUser && (
                <Link href="/choose-plan">
                  <button className={styles.upgradeBtn}>
                    Upgrade to Premium
                  </button>
                </Link>
              )}
            </div>

            <hr style={{ borderColor: "#e1e7ea", margin: "16px 0" }} />

            <div>
              <h4 className={styles.heading} style={{ fontSize: "18px" }}>
                Email
              </h4>
              <p style={{ color: "#032b41" }}>{user.email}</p>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
