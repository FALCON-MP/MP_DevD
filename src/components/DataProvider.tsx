import React, { ReactNode } from 'react';
import rawData from '../data/sampleData.json';

// Type definitions for the context
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


interface DataProviderProps {
  children: ReactNode;
}


const DataContext = React.createContext<Data | undefined>(undefined);

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
 
  const data: Data = Array.isArray(rawData) ? rawData[0] as Data : rawData as Data;

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };
