// pages/for-you.tsx
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "../components/DashboardLayout";
import styles from "../styles/ForYou.module.css";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import ForYouSkeleton from "@/components/ForYouSkeleton";
import { useAuth } from "@/contexts/AuthContext";

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

export default function ForYou() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const { user, loading: authLoading } = useAuth();
  const isPremiumUser = !!user;

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      try {
        const [selectedRes, recommendedRes, suggestedRes] = await Promise.all([
          fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"),
          fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"),
          fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"),
        ]);

        const selectedData = await selectedRes.json();
        const recommendedData = await recommendedRes.json();
        const suggestedData = await suggestedRes.json();

        setSelectedBook(selectedData[0]);
        setRecommendedBooks(recommendedData.slice(0, 5));
        setSuggestedBooks(suggestedData.slice(0, 5));
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading || authLoading) {
    return (
      <DashboardLayout>
        <ForYouSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className={styles.topBar}>
        <SearchBar />
      </div>

      {/* Selected Book */}
      {selectedBook && (
        <div className={styles.featuredWrapper}>
          <h2 className={styles.heading}>Selected just for you</h2>
          <Link href={`/book/${selectedBook.id}`} className={styles.linkReset}>
            <div className={styles.featuredCard}>
              <div className={styles.featuredLeft}>
                <p className={styles.subtext}>{selectedBook.subTitle}</p>
              </div>
              <div className={styles.selectedBookLine}></div>
              <div className={styles.featuredCenter}>
                <Image
                  src={selectedBook.imageLink}
                  alt={selectedBook.title}
                  width={120}
                  height={180}
                  className={styles.featuredImage}
                />
              </div>
              <div className={styles.featuredRight}>
                <h3 className={styles.featuredTitle}>{selectedBook.title}</h3>
                <p className={styles.featuredAuthor}>{selectedBook.author}</p>
                <div className={styles.audioDuration}>
                  <div className={styles.playIconCircle}>
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className={styles.playIcon}>
                      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
                    </svg>
                  </div>
                  <span>3 mins 23 secs</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Recommended Books */}
      <h2 className={styles.heading}>Recommended For You</h2>
      <p className={styles.subtext}>We think you’ll like these</p>
      <div className={styles.recommendations}>
        {recommendedBooks.map((book) => (
          <Link key={book.id} href={`/book/${book.id}`} className={styles.linkReset}>
            <BookCard
              image={book.imageLink}
              title={book.title}
              author={book.author}
              description={book.subTitle}
              duration="Coming Soon"
              rating={book.averageRating}
              showPremiumTag={book.subscriptionRequired && !isPremiumUser}
            />
          </Link>
        ))}
      </div>

      {/* Suggested Books */}
      <h2 className={styles.heading}>Suggested Books</h2>
      <p className={styles.subtext}>Browse those books</p>
      <div className={styles.recommendations}>
        {suggestedBooks.map((book) => (
          <Link key={book.id} href={`/book/${book.id}`} className={styles.linkReset}>
            <BookCard
              image={book.imageLink}
              title={book.title}
              author={book.author}
              description={book.subTitle}
              duration="Coming Soon"
              rating={book.averageRating}
              showPremiumTag={book.subscriptionRequired && !isPremiumUser}
            />
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}
