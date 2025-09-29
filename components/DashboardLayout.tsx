// components/DashboardLayout.tsx

import React from "react";
import Sidebar from "../components/Sidebar";
import styles from "../styles/DashboardLayout.module.css";
import AuthModal from "./AuthModal";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />
      <main className={styles.mainContent}>{children}</main>

      <AuthModal />
    </div>
  );
}
