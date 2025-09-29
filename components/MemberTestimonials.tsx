// components/MemberTestimonials.tsx
import styles from './MemberTestimonials.module.css';
import { useUI } from "@/contexts/UIContext";

const testimonials = [
  {
    name: 'Hanna M.',
    stars: 5,
    text: "This app has been a *game-changer* for me! It’s saved me so much time and effort in reading and comprehending books. Highly recommend it to all book lovers.",
  },
  {
    name: 'David B.',
    stars: 5,
    text: "I love this app! It provides *concise and accurate summaries* of books in a way that is easy to understand. It’s also very user-friendly and intuitive.",
  },
  {
    name: 'Nathan S.',
    stars: 5,
    text: "This app is a great way to get the main takeaways from a book without having to read the entire thing. *The summaries are well-written and informative.* Definitely worth downloading.",
  },
  {
    name: 'Ryan R.',
    stars: 5,
    text: "If you're a busy person who *loves reading but doesn't have the time* to read every book in full, this app is for you! The summaries are thorough and provide a great overview of the book's content.",
  },
];

const StarRating = ({ count }: { count: number }) => (
  <span className={styles.stars}>{'★'.repeat(count)}</span>
);

export default function MemberTestimonials() {
  const { setShowModal } = useUI();

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>What our members say</h2>
      <div className={styles.cardList}>
        {testimonials.map((t, i) => (
          <div key={i} className={styles.card}>
            <p className={styles.name}>
              {t.name} <StarRating count={t.stars} />
            </p>
            <p
              className={styles.text}
              dangerouslySetInnerHTML={{
                __html: t.text.replace(/\*([^*]+)\*/g, '<strong>$1</strong>'),
              }}
            />
          </div>
        ))}
      </div>
      <div className={styles.buttonWrapper}>
        <a
          className={styles.loginButton}
          onClick={() => setShowModal(true)}
        >
          Login
        </a>
      </div>
    </section>
  );
}
