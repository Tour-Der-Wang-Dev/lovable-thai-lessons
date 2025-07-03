
import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dateFilters } from '@/data/liveSessions';

interface DateFilterProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ selectedDate, onDateChange }) => {
  return (
    <Card className="classroom-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <span className="thai-text">เลือกวันที่</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {dateFilters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedDate === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => onDateChange(filter.id)}
              className="thai-text"
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DateFilter;
