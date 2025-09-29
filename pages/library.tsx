// pages/library.tsx
import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import BookCard from "../components/BookCard";
import styles from "../styles/Library.module.css";
import SearchBar from "../components/SearchBar";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { useUI } from "../contexts/UIContext";
import SkeletonBookCard from "../components/SkeletonBookCard";

interface Book {
  id: string;
  imageLink: string;
  title: string;
  author: string;
  subTitle: string;
  duration?: string;
  averageRating?: number;
}

export default function LibraryPage() {
  const { user, loading } = useAuth();
  const { setShowModal } = useUI();

  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("savedBooks");
    if (saved) {
      try {
        setSavedBooks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse savedBooks from localStorage");
        setSavedBooks([]);
      }
    }
  }, []);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const [selectedRes, recommendedRes, suggestedRes] = await Promise.all([
          fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"),
          fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"),
          fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"),
        ]);

        const selectedBooks = await selectedRes.json();
        const recommendedBooks = await recommendedRes.json();
        const suggestedBooks = await suggestedRes.json();

        setAllBooks([...selectedBooks, ...recommendedBooks, ...suggestedBooks]);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    }

    fetchBooks();
  }, []);

 if (loading || (!user && savedBooks.length === 0 && allBooks.length === 0)) {
  return (
    <DashboardLayout>
      <SearchBar />
      <div className={styles.libraryContainerS}>
        <h2 className={styles.sectionTitle}>Loading Books</h2>
        <div className={styles.bookGrid}>
          {[...Array(10)].map((_, idx) => (
            <SkeletonBookCard key={idx} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

  return (
    <DashboardLayout>
      <SearchBar />

      {!user ? (
        <div className={styles.loginWrapper}>
          <Image
            src="https://summarist.vercel.app/_next/static/media/login.e313e580.png"
            alt="login"
            width={460}
            height={317}
          />
          <p className={styles.loginText}>
            Log in to your account to see your saved books.
          </p>
          <button
            className={styles.loginBtn}
            onClick={() => setShowModal(true)}
          >
            Login
          </button>
        </div>
      ) : (
        <div className={styles.libraryContainer}>
          {/* Saved Books */}
          <h2 className={styles.sectionTitle}>Saved Books</h2>
          <p className={styles.count}>{savedBooks.length} items</p>
          <div className={styles.bookGrid}>
            {savedBooks.map((book) => (
              <Link
                key={book.id}
                href={`/book/${book.id}`}
                className={styles.linkReset}
              >
                <BookCard
                  image={book.imageLink}
                  title={book.title}
                  author={book.author}
                  description={book.subTitle}
                  duration={book.duration || "Coming Soon"}
                  rating={book.averageRating || 0}
                />
              </Link>
            ))}
          </div>

          {/* Finished Books Section */}
          <h2 className={styles.sectionTitle}>Finished</h2>
          <p className={styles.count}>{allBooks.length} items</p>
          <div className={styles.bookGrid}>
            {allBooks.slice(0, 5).map((book) => (
              <Link
                key={book.id}
                href={`/book/${book.id}`}
                className={styles.linkReset}
              >
                <BookCard
                  image={book.imageLink}
                  title={book.title}
                  author={book.author}
                  description={book.subTitle}
                  duration="Coming Soon"
                  rating={book.averageRating || 0}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
