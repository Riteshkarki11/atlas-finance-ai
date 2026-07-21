import DashboardLayout from "../components/layout/DashboardLayout";

import SearchBar from "../components/dashboard/SearchBar";
import DashboardStats from "../components/dashboard/DashboardStats";
import RecentAnalysis from "../components/dashboard/RecentAnalysis";
import AIInsights from "../components/dashboard/AIInsights";

export default function Home() {
  return (
    <DashboardLayout>

      <SearchBar />

      <div className="mt-8">
        <DashboardStats />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <RecentAnalysis />

        <AIInsights />
      </div>

    </DashboardLayout>
  );
}