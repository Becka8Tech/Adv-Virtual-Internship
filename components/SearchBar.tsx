import { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/router";
import styles from "../styles/SearchBar.module.css";

interface Book {
  id: string;
  title: string;
  author: string;
  imageLink: string;
  subTitle: string;
  duration: string;
}

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredBooks([]);
    } else {
      const filtered = allBooks.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [searchTerm, allBooks]);

  const handleSelectBook = (id: string) => {
    setSearchTerm("");
    setFilteredBooks([]);
    router.push(`/book/${id}`);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredBooks([]);
    inputRef.current?.focus();
  };

  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        placeholder="Search for books"
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        ref={inputRef}
      />

      <button
        className={styles.searchIcon}
        onClick={searchTerm ? clearSearch : undefined}
        aria-label={searchTerm ? "Clear search" : "Search"}
      >
        {searchTerm ? "✕" : <FiSearch size={16} />}
      </button>

      {filteredBooks.length > 0 && (
        <div className={styles.dropdown}>
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className={styles.dropdownItem}
              onClick={() => handleSelectBook(book.id)}
            >
              <img src={book.imageLink} alt={book.title} className={styles.dropdownImage} />
              <div className={styles.dropdownDetails}>
                <strong className={styles.dropdownTitle}>{book.title}</strong>
                <p className={styles.dropdownAuthor}>{book.author}</p>
                <p className={styles.dropdownMeta}>{book.duration || "3 mins 23 secs"}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.separator} />
    </div>
  );
}
