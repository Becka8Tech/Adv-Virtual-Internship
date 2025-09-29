// pages/choose-plan.tsx
import { useRef, useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/ChoosePlan.module.css";

export default function ChoosePlan() {
  const [plan, setPlan] = useState<"yearly" | "monthly">("yearly");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const [isStickingToBottom, setIsStickingToBottom] = useState(true);

  useEffect(() => {
    const checkStickyPosition = () => {
      if (!stickyRef.current) return;
      const rect = stickyRef.current.getBoundingClientRect();

      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        setIsStickingToBottom(false);
      } else {
        setIsStickingToBottom(true);
      }
    };

    window.addEventListener("scroll", checkStickyPosition);
    checkStickyPosition();

    return () => {
      window.removeEventListener("scroll", checkStickyPosition);
    };
  }, []);

  const handleStart = async () => {
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Stripe session URL missing");
      }
    } catch (err) {
      console.error("Something went wrong", err);
    }
  };

  const faqItems = [
    {
      question: "How does the free 7-day trial work?",
      answer:
        "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.",
    },
    {
      question:
        "Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
      answer:
        "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.",
    },
    {
      question: "What's included in the Premium plan?",
      answer:
        "Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.",
    },
    {
      question: "Can I cancel during my trial or subscription?",
      answer:
        "You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.",
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <Head>
        <title>Choose Your Plan | Summarist</title>
      </Head>
      <div className={styles.container}>
        <section className={styles.hero}>
          <h1>
            Get unlimited access to many amazing
            <br /> books to read
          </h1>
          <p>Turn ordinary moments into amazing learning opportunities</p>
          <div className={styles.imageClip}>
            <img
              alt="pricing"
              src="https://summarist.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpricing-top.4d86e93a.png&w=1080&q=75"
              width="340"
              height="285"
              decoding="async"
              loading="lazy"
              style={{ color: "transparent" }}
            />
          </div>
        </section>

        {/* Feature Icons Section */}
        <section className={styles.features}>
          <div>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 1024 1024"
              height="60"
              width="60"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M854.6 288.7c6 6 9.4 14.1 9.4 22.6V928c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32h424.7c8.5 0 16.7 3.4 22.7 9.4l215.2 215.3zM790.2 326L602 137.8V326h188.2zM320 482a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h384a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8H320zm0 136a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h184a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8H320z"></path>
            </svg>{" "}
            <p>
              <strong>Key ideas in few min</strong> with many <br /> books to
              read
            </p>
          </div>
          <div>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="60"
              width="60"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path fill="none" d="M0 0H24V24H0z"></path>
                <path d="M21 3v2c0 3.866-3.134 7-7 7h-1v1h5v7c0 1.105-.895 2-2 2H8c-1.105 0-2-.895-2-2v-7h5v-3c0-3.866 3.134-7 7-7h3zM5.5 2c2.529 0 4.765 1.251 6.124 3.169C10.604 6.51 10 8.185 10 10v1h-.5C5.358 11 2 7.642 2 3.5V2h3.5z"></path>
              </g>
            </svg>{" "}
            <p>
              <strong>3 million</strong> people growing with <br /> Summarist
              everyday
            </p>
          </div>
          <div>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 640 512"
              height="60"
              width="60"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M434.7 64h-85.9c-8 0-15.7 3-21.6 8.4l-98.3 90c-.1.1-.2.3-.3.4-16.6 15.6-16.3 40.5-2.1 56 12.7 13.9 39.4 17.6 56.1 2.7.1-.1.3-.1.4-.2l79.9-73.2c6.5-5.9 16.7-5.5 22.6 1 6 6.5 5.5 16.6-1 22.6l-26.1 23.9L504 313.8c2.9 2.4 5.5 5 7.9 7.7V128l-54.6-54.6c-5.9-6-14.1-9.4-22.6-9.4zM544 128.2v223.9c0 17.7 14.3 32 32 32h64V128.2h-96zm48 223.9c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zM0 384h64c17.7 0 32-14.3 32-32V128.2H0V384zm48-63.9c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16c0-8.9 7.2-16 16-16zm435.9 18.6L334.6 217.5l-30 27.5c-29.7 27.1-75.2 24.5-101.7-4.4-26.9-29.4-24.8-74.9 4.4-101.7L289.1 64h-83.8c-8.5 0-16.6 3.4-22.6 9.4L128 128v223.9h18.3l90.5 81.9c27.4 22.3 67.7 18.1 90-9.3l.2-.2 17.9 15.5c15.9 13 39.4 10.5 52.3-5.4l31.4-38.6 5.4 4.4c13.7 11.1 33.9 9.1 45-4.7l9.5-11.7c11.2-13.8 9.1-33.9-4.6-45.1z"></path>
            </svg>{" "}
            <p>
              <strong>Precise recommendations</strong> <br /> curated by experts
            </p>
          </div>
        </section>

        {/* Plan Selection */}
        <section className={styles.plans}>
          <h2>Choose the plan that fits you</h2>

          <div
            className={`${styles.planCard} ${
              plan === "yearly" ? styles.selected : ""
            }`}
            onClick={() => setPlan("yearly")}
          >
            <input
              type="radio"
              name="plan"
              checked={plan === "yearly"}
              readOnly
            />
            <div>
              <h3>Premium Plus Yearly</h3>
              <p className={styles.price}>$99.99/year</p>
              <p className={styles.subtext}>7-day free trial included</p>
            </div>
          </div>

          <div className={styles.divider}>
            <span>or</span>
          </div>

          <div
            className={`${styles.planCard} ${
              plan === "monthly" ? styles.selected : ""
            }`}
            onClick={() => setPlan("monthly")}
          >
            <input
              type="radio"
              name="plan"
              checked={plan === "monthly"}
              readOnly
            />
            <div>
              <h3>Premium Monthly</h3>
              <p className={styles.price}>$9.99/month</p>
              <p className={styles.subtext}>No trial included</p>
            </div>
          </div>

          <div
            ref={stickyRef}
            className={`${styles.stickySection} ${
              isStickingToBottom ? styles.stickyAtBottom : ""
            }`}
          >
            <button className={styles.ctaButton} onClick={handleStart}>
              {plan === "yearly"
                ? "Start your free 7-day trial"
                : "Start your first month"}
            </button>

            <p className={styles.cancelNote}>
              {plan === "yearly"
                ? "Cancel your trial at any time before it ends, and you won’t be charged."
                : "Cancel anytime — no commitment, no hassle."}
            </p>
          </div>
        </section>

        <section className={styles.faq}>
          {faqItems.map((item, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => handleToggle(index)}
              >
                <span>{item.question}</span>
                <svg
                  className={`${styles.arrow} ${
                    openIndex === index ? styles.arrowOpen : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 
                6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className={styles.faqAnswer}>
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </section>
        {/* Footer */}
        <footer className={styles.footer}>
          <div>
            <h4>Actions</h4>
            <ul>
              <li>Summarist Magazine</li>
              <li>Cancel Subscription</li>
              <li>Help</li>
              <li>Contact us</li>
            </ul>
          </div>
          <div>
            <h4>Useful Links</h4>
            <ul>
              <li>Pricing</li>
              <li>Summarist Business</li>
              <li>Gift Cards</li>
              <li>Authors & Publishers</li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li>About</li>
              <li>Careers</li>
              <li>Partners</li>
              <li>Code of Conduct</li>
            </ul>
          </div>
          <div>
            <h4>Other</h4>
            <ul>
              <li>Sitemap</li>
              <li>Legal Notice</li>
              <li>Terms of Service</li>
              <li>Privacy Policies</li>
            </ul>
          </div>
        </footer>

        <div className={styles.copyRight}>
          <p>Copyright © 2023 Summarist.</p>
        </div>
      </div>
    </>
  );
}
