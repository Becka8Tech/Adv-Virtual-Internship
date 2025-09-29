// pages/index.tsx

import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../components/Navbar.module.css";
import Features from "../components/Features";
import BenefitStats from "@/components/BenefitStats";
import ImpactStats from "@/components/ImpactStats";
import MemberTestimonials from "@/components/MemberTestimonials";
import GrowthSection from "@/components/GrowthSection";
import Footer from "@/components/Footer";
import { useUI } from "@/contexts/UIContext";
import AuthModal from "@/components/AuthModal";

export default function Home() {
  const { setShowModal } = useUI();
  const router = useRouter();

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <Image
            src="/logo.png"
            alt="logo"
            width={200}
            height={46}
            decoding="async"
            className={styles.logo}
          />
        </div>
        <div className={styles.right}>
          <span className={styles.link} onClick={() => setShowModal(true)}>
            Login
          </span>
          <span className={styles.nav__list}>About</span>
          <span className={styles.nav__list}>Contact</span>
          <span className={styles.nav__list}>Help</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1>
              Gain more knowledge <br /> in less time
            </h1>
            <p>
              Great summaries for busy people, <br />
              individuals who barely have time to read,
              <br />
              and even people who don’t like to read.
            </p>
            <button
              className={styles.heroButton}
              onClick={() => setShowModal(true)}
            >
              Login
            </button>
          </div>
          <div className={styles.heroImage}>
            <Image
              src="/hero-image.png"
              alt="Hero Illustration"
              width={450}
              height={450}
              priority
            />
          </div>
        </div>
      </section>

      <Features />
      <BenefitStats />
      <ImpactStats />
      <MemberTestimonials />
      <GrowthSection />
      <Footer />
      <AuthModal />
    </>
  );
}
