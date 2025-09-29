// pages/player/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Player.module.css";
import SearchBar from "@/components/SearchBar";
import DashboardLayout from "@/components/DashboardLayout";
import FontSizeSelector from "@/components/FontSizeSelector";
import Image from "next/image";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/config";

interface Book {
  id: string;
  title: string;
  author: string;
  audioLink: string;
  imageLink: string;
  summary: string;
}

export default function AudioPlayerPage() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<Book | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fontSize, setFontSize] = useState(16);

const [user, setUser] = useState<User | null>(null);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return () => unsubscribe();
}, []);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (typeof id !== "string") return;

    async function fetchBook() {
      try {
        const [selectedRes, recommendedRes, suggestedRes] = await Promise.all([
          fetch(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
          ),
          fetch(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
          ),
          fetch(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
          ),
        ]);

        const allBooks = [
          ...(await selectedRes.json()),
          ...(await recommendedRes.json()),
          ...(await suggestedRes.json()),
        ];

        const foundBook = allBooks.find((b) => b.id === id);
        setBook(foundBook || null);
      } catch (err) {
        console.error("Failed to load book", err);
      }
    }

    fetchBook();
  }, [id]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

if (!book) {
  return (
    <DashboardLayout>
      <div className={styles.container}>
        <SearchBar />
        <div className={styles.spinnerWrapper}>
          <div className={styles.spinner}></div>
        </div>
      </div>
    </DashboardLayout>
  );
}

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <SearchBar />
        <FontSizeSelector fontSize={fontSize} setFontSize={setFontSize} />

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
          <div className={styles.summary}>
            <h1 className={styles.bookTitle}>{book.title}</h1>
            <hr />
            {book.summary.split("\n\n").map((para, idx) => (
              <p key={idx} style={{ fontSize: `${fontSize}px` }}>
                {para}
              </p>
            ))}
          </div>
          </>
        )}

        {/* Audio Player Footer */}
        <div className={styles.audioPlayer}>
          <div className={styles.left}>
            <img
              src={book.imageLink || "/audio-icon.png"}
              alt="Audio Icon"
              width={48}
              height={48}
              style={{ borderRadius: "50%" }}
            />
            <div>
              <strong style={{ fontSize: "14px" }}>{book.title}</strong>
              <p
                style={{
                  fontSize: "14px",
                  color: "#bac8ce",
                  margin: 0,
                  padding: "4px 0",
                }}
              >
                {book.author}
              </p>
            </div>
          </div>

          <div className={styles.center}>
            <button
              onClick={() =>
                audioRef.current && (audioRef.current.currentTime -= 10)
              }
              className={styles.skipButton}
              aria-label="Rewind 10 seconds"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 26 26"
                height="2.5em"
                width="2.5em"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <path d="M3.11111111,7.55555556 C4.66955145,4.26701301 8.0700311,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 L12,22 C6.4771525,22 2,17.5228475 2,12 M2,4 L2,8 L6,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"></path>{" "}
              </svg>{" "}
            </button>

            <button
              onClick={togglePlay}
              className={styles.playButton}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>

            <button
              onClick={() =>
                audioRef.current && (audioRef.current.currentTime += 10)
              }
              className={styles.skipButton}
              aria-label="Forward 10 seconds"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 26 26"
                height="2.5em"
                width="2.5em"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  d="M20.8888889,7.55555556 C19.3304485,4.26701301 15.9299689,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 L12,22 C17.5228475,22 22,17.5228475 22,12 M22,4 L22,8 L18,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"
                ></path>{" "}
              </svg>{" "}
            </button>
          </div>

          <div className={styles.right}>
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={(e) => {
                if (audioRef.current) {
                  const newTime = Number(e.target.value);
                  audioRef.current.currentTime = newTime;
                  setCurrentTime(newTime);
                }
              }}
              style={{
                background: `linear-gradient(to right, #2bd97c ${
                  (currentTime / duration) * 100
                }%, #6d787d ${(currentTime / duration) * 100}%)`,
              }}
            />
            <span>{formatTime(duration)}</span>
          </div>

          <audio
            ref={audioRef}
            src={book.audioLink}
            onLoadedMetadata={() => {
              if (audioRef.current) {
                setDuration(audioRef.current.duration);
              }
            }}
            onTimeUpdate={() => {
              if (audioRef.current) {
                setCurrentTime(audioRef.current.currentTime);
              }
            }}
            onEnded={() => setIsPlaying(false)}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
