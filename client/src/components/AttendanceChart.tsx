import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AttendanceData {
  day: string;
  present: number;
  absent: number;
  total: number;
}

interface AttendanceChartProps {
  data: AttendanceData[];
  title?: string;
}

export function AttendanceChart({ data, title = "Weekly Attendance" }: AttendanceChartProps) {
  return (
    <Card className="hover-elevate" data-testid="card-attendance-chart">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="day" className="text-sm" />
            <YAxis className="text-sm" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="present" fill="hsl(var(--chart-2))" name="Present" radius={[2, 2, 0, 0]} />
            <Bar dataKey="absent" fill="hsl(var(--chart-3))" name="Absent" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}