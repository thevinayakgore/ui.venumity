import DashboardLayout from "./dashboard-layout";
import BudgetProgress from "./budget-progress";
import IncomeExpenseChart from "./income-expense-chart";
import MonthlySpendingChart from "./monthly-spending-chart";
import RecentTransactions from "./recent-transactions";
import SavingsGoals from "./savings-goals";
import StatsCards from "./stats-cards";

export default function PersonalFinanceDashboard() {
  return (
    <DashboardLayout>
      {/* Stats Overview */}
      <StatsCards />

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-3 md:gap-6 xl:grid-cols-2">
        <IncomeExpenseChart />
        <MonthlySpendingChart />
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 gap-3 md:gap-6 lg:grid-cols-2">
        <BudgetProgress />
        <SavingsGoals />
      </div>
      <RecentTransactions />
    </DashboardLayout>
  );
}
