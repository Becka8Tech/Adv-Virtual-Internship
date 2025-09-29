// pages/book/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUI } from "@/contexts/UIContext";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import DashboardLayout from "@/components/DashboardLayout";
import styles from "@/styles/BookDetail.module.css";
import SkeletonBookDetail from "@/components/SkeletonBookDetail";
import SearchBar from "@/components/SearchBar";

interface Book {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: string[];
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
}

export default function BookDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<Book | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const { setShowModal } = useUI();
  const { user } = useAuth();
  const isLoggedIn = !!user;

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

        const selectedBooks = await selectedRes.json();
        const recommendedBooks = await recommendedRes.json();
        const suggestedBooks = await suggestedRes.json();

        const allBooks: Book[] = [
          ...selectedBooks,
          ...recommendedBooks,
          ...suggestedBooks,
        ];
        const foundBook = allBooks.find((b) => b.id === id);

        setBook(foundBook || null);

        if (foundBook) {
          const saved = JSON.parse(localStorage.getItem("savedBooks") || "[]");
          const exists = saved.some((b: Book) => b.id === foundBook.id);
          setIsSaved(exists);
        }
      } catch (err) {
        console.error("Failed to load book", err);
      }
    }

    fetchBook();
  }, [id]);

  const requireLogin = (callback: () => void) => {
    if (!isLoggedIn) {
      setShowModal(true);
    } else {
      callback();
    }
  };

  const handleSaveToggle = () => {
    if (!book) return;

    requireLogin(() => {
      const existing = JSON.parse(localStorage.getItem("savedBooks") || "[]");

      if (isSaved) {
        const updated = existing.filter((b: Book) => b.id !== book.id);
        localStorage.setItem("savedBooks", JSON.stringify(updated));
        setIsSaved(false);
      } else {
        const updated = [...existing, book];
        localStorage.setItem("savedBooks", JSON.stringify(updated));
        setIsSaved(true);
      }
    });
  };

  if (!book) {
    return (
      <DashboardLayout>
        <SkeletonBookDetail />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <SearchBar />
      <div className={styles.bookContainer}>
        <div className={styles.bookHeader}>
          <div className={styles.text}>
            <h1>
              {book.title}
              {!user && book.subscriptionRequired && " (Premium)"}
            </h1>

            <h3>{book.author}</h3>
            <p className={styles.subTitle}>{book.subTitle}</p>

            <div className={styles.metaRow}>
              <span>
                ⭐ {book.averageRating} ({book.totalRating} ratings)
              </span>
              <span>⏱ Coming Soon</span>
            </div>

            <div className={styles.metaRow}>
              <span>🎧 Audio & Text</span>
              <span>💡 {book.keyIdeas.length} Key ideas</span>
            </div>

            <div className={styles.buttonGroup}>
              <button
                className={styles.readBtn}
                onClick={() =>
                  requireLogin(() => router.push(`/player/${book.id}`))
                }
              >
                📖 Read
              </button>

              <button
                className={styles.listenBtn}
                onClick={() =>
                  requireLogin(() => router.push(`/player/${book.id}`))
                }
              >
                🔊 Listen
              </button>
            </div>

            {/* Save to My Library Toggle */}
            {!isSaved ? (
              <p
                className={styles.libraryText}
                onClick={handleSaveToggle}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: "6px" }}
                >
                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"></path>
                </svg>
                Add title to My Library
              </p>
            ) : (
              <p
                className={styles.libraryText}
                onClick={handleSaveToggle}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: "#1673ff", marginRight: "6px" }}
                >
                  <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"></path>
                </svg>
                <span style={{ fontWeight: "bold" }}>Saved in My Library</span>
              </p>
            )}
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src={book.imageLink}
              alt={book.title}
              width={300}
              height={300}
              className={styles.bookImage}
            />
          </div>
        </div>

        <div className={styles.bookContent}>
          <h3>What's it about?</h3>
          <div className={styles.tags}>
            {book.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          <p className={styles.description}>{book.bookDescription}</p>

          <h3>About the author</h3>
          <p className={styles.description}>{book.authorDescription}</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
