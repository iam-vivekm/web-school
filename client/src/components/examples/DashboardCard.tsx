import { Users, GraduationCap, Calendar, DollarSign } from 'lucide-react';
import { DashboardCard } from '../DashboardCard';

export default function DashboardCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <DashboardCard
        title="Total Students"
        value={1284}
        description="Active enrolled students"
        icon={Users}
        trend={{ value: 12, label: "from last month", isPositive: true }}
      />
      <DashboardCard
        title="Teachers"
        value={47}
        description="Active faculty members"
        icon={GraduationCap}
        trend={{ value: 2, label: "new this month", isPositive: true }}
      />
      <DashboardCard
        title="Classes Today"
        value={28}
        description="Scheduled for today"
        icon={Calendar}
      />
      <DashboardCard
        title="Fee Collection"
        value="$124,500"
        description="This month"
        icon={DollarSign}
        trend={{ value: 8, label: "from last month", isPositive: true }}
      />
    </div>
  );
}