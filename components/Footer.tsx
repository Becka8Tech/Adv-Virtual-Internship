import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        <div className={styles.column}>
          <h4>Actions</h4>
          <ul>
            <li>Summarist Magazine</li>
            <li>Cancel Subscription</li>
            <li>Help</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Useful Links</h4>
          <ul>
            <li>Pricing</li>
            <li>Summarist Business</li>
            <li>Gift Cards</li>
            <li>Authors & Publishers</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Company</h4>
          <ul>
            <li>About</li>
            <li>Careers</li>
            <li>Partners</li>
            <li>Code of Conduct</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Other</h4>
          <ul>
            <li>Sitemap</li>
            <li>Legal Notice</li>
            <li>Terms of Service</li>
            <li>Privacy Policies</li>
          </ul>
        </div>
      </div>
      <div className={styles.copy}>Copyright © 2023 Summarist.</div>
    </footer>
  );
}
