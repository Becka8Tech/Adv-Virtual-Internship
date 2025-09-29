// components/AuthModal.tsx
import styles from "../components/Navbar.module.css";
import { useUI } from "@/contexts/UIContext";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  auth,
  provider,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInAnonymously,
} from "../firebase/config";

export default function AuthModal() {
  const router = useRouter();
  const { showModal, setShowModal } = useUI();

  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const clearLoginState = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  const clearSignupState = () => {
    setSignupEmail("");
    setSignupPassword("");
    setSignupError("");
  };

  const clearResetState = () => {
    setResetEmail("");
    setResetMessage("");
  };

  const closeAllModals = () => {
    setShowModal(false);
    setShowSignupModal(false);
    setShowResetModal(false);
    clearLoginState();
    clearSignupState();
    clearResetState();
  };

  const handleEmailPasswordLogin = async () => {
    try {
      setError("");
      await signInWithEmailAndPassword(auth, email, password);
      closeAllModals();
      if (router.pathname === "/") router.push("/for-you");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  const handleSignup = async () => {
    try {
      setSignupError("");
      await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      closeAllModals();
      if (router.pathname === "/") router.push("/for-you");
    } catch (err: any) {
      setSignupError(err.message || "Signup failed");
    }
  };

  const handlePasswordReset = async () => {
    setResetMessage("");
    try {
      if (!resetEmail) throw new Error("Firebase: Error (auth/missing-email).");
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage("Reset link sent. Please check your inbox.");
    } catch (err: any) {
      setResetMessage(err.message || "Failed to send reset link.");
    }
  };

  const handleGoogleLogin = async () => {
  try {
    await signInWithPopup(auth, provider);
    localStorage.setItem("loginMethod", "google");
    closeAllModals();
    if (router.pathname === "/") router.push("/for-you");
  } catch (error) {
    console.error("Google login error:", error);
  }
};


  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth);
      closeAllModals();
      if (router.pathname === "/") router.push("/for-you");
    } catch (error) {
      console.error("Anonymous login error:", error);
    }
  };

  if (!showModal && !showResetModal && !showSignupModal) return null;

  return (
    <>
      {/* LOGIN MODAL */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={closeAllModals}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.closeButton} onClick={closeAllModals}>×</div>

            <h2>Log in to Summarist</h2>
            {error && <p className={styles.errorText}>{error}</p>}

            <button className={styles.googleButton} onClick={handleGuestLogin}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
              </svg>
              <span className={styles.googleText}>Login as a Guest</span>
            </button>

            <div className={styles.divider}><span>or</span></div>

            <button className={styles.googleButton} onClick={handleGoogleLogin}>
              <img src="/googleIcon.webp" alt="Google logo" className={styles.googleIcon} />
              <span className={styles.googleText}>Login with Google</span>
            </button>

            <div className={styles.divider}><span>or</span></div>

            <input
              className={styles.input}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={styles.modalButtonPrimary} onClick={handleEmailPasswordLogin}>
              Login
            </button>

            <p
              className={styles.textLink}
              onClick={() => {
                clearLoginState();
                setShowModal(false);
                setShowResetModal(true);
              }}
            >
              Forgot your password?
            </p>

            <p
              className={styles.textLink}
              onClick={() => {
                clearLoginState();
                setShowModal(false);
                setShowSignupModal(true);
              }}
            >
              Don't have an account?
            </p>
          </div>
        </div>
      )}

      {/* RESET PASSWORD MODAL */}
      {showResetModal && (
        <div className={styles.modalOverlay} onClick={closeAllModals}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.closeButton} onClick={closeAllModals}>×</div>
            <h2 className={styles.modalTitle}>Reset your password</h2>
            {resetMessage && <p className={styles.errorText}>{resetMessage}</p>}

            <input
              className={styles.input}
              type="email"
              placeholder="Email address"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
            <button className={styles.modalButtonPrimary} onClick={handlePasswordReset}>
              Send reset password link
            </button>

            <div className={styles.footerText}>
              <span
                className={styles.textLink}
                onClick={() => {
                  clearResetState();
                  setShowResetModal(false);
                  setShowModal(true);
                }}
              >
                Go to login
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SIGN UP MODAL */}
      {showSignupModal && (
        <div className={styles.modalOverlay} onClick={closeAllModals}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.closeButton} onClick={closeAllModals}>×</div>
            <h2 className={styles.modalTitle}>Sign up to Summarist</h2>
            {signupError && <p className={styles.errorText}>{signupError}</p>}

            <button className={styles.googleButton} onClick={handleGoogleLogin}>
              <img src="/googleIcon.webp" alt="Google logo" className={styles.googleIcon} />
              <span className={styles.googleText}>Sign up with Google</span>
            </button>

            <div className={styles.divider}><span>or</span></div>

            <input
              className={styles.input}
              type="email"
              placeholder="Email Address"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
            <button className={styles.modalButtonPrimary} onClick={handleSignup}>
              Sign up
            </button>

            <p
              className={styles.textLink}
              onClick={() => {
                clearSignupState();
                setShowSignupModal(false);
                setShowModal(true);
              }}
            >
              Already have an account?
            </p>
          </div>
        </div>
      )}
    </>
  );
}
