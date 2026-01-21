import React from "react";
import Navbar from "../components/history/Navbar";
import HistoryList from "../components/history/HistoryList";

export default function HistoryPage() {
  return (
    <div className="min-h-screen p-8">
      <Navbar />
      <HistoryList />
    </div>
  );
}
