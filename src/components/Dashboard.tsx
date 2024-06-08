import React, { useContext, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import { DataContext } from './DataProvider';
import './Dashboard.css';

// Type definitions for data
interface ActivityItem {
  count: string;
  label: string;
  fillColor: string;
}

interface DayWiseActivity {
  date: string;
  items: {
    children: ActivityItem[];
  };
}

interface Row {
  name: string;
  totalActivity: { name: string; value: string }[];
  dayWiseActivity: DayWiseActivity[];
}

interface AuthorWorklog {
  activityMeta: { label: string; fillColor: string }[];
  rows: Row[];
}

interface Data {
  data: {
    AuthorWorklog: AuthorWorklog;
  };
}

const Dashboard: React.FC = () => {
  const data = useContext(DataContext);

  useEffect(() => {
    console.log(data);
  }, [data]);

  // Process the data to fit the chart structure
  const processData = () => {
    const processedData: any[] = [];

    // Check if data is defined and log it for debugging
    if (!data || !data.data || !data.data.AuthorWorklog) {
      console.error('Data is not in the expected format:', data);
      return processedData;
    }

    const rows: Row[] = data.data.AuthorWorklog.rows;

    rows.forEach((row: Row) => {
      row.dayWiseActivity.forEach((activity: DayWiseActivity) => {
        const date = activity.date;
        activity.items.children.forEach((item: ActivityItem) => {
          processedData.push({
            date,
            activity: item.label,
            count: parseInt(item.count, 10),
            fillColor: item.fillColor,
          });
        });
      });
    });

    return processedData;
  };

  const chartData = processData();

  return (
    <div className="dashboard">
      <h1>Developer Activity Dashboard</h1>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;








