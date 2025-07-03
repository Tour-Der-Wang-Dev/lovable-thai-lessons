
import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import LiveSessionCard from '@/components/live/LiveSessionCard';
import LiveBanner from '@/components/live/LiveBanner';
import WeeklySchedule from '@/components/live/WeeklySchedule';
import DateFilter from '@/components/live/DateFilter';
import EmptyState from '@/components/live/EmptyState';
import { liveSessions } from '@/data/liveSessions';

const Live: React.FC = () => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<string>('today');

  const filteredSessions = liveSessions.filter(session => {
    if (selectedDate === 'week') return true;
    return session.date === selectedDate;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 thai-text">
          {t('live_sessions')}
        </h1>
        <p className="text-gray-600 thai-text">
          เรียนแบบสดๆ กับครูมืออาชีพ พูดคุยและฝึกฝนได้จริง
        </p>
      </div>

      {/* Live Now Banner */}
      <LiveBanner />

      {/* Date Filters */}
      <DateFilter 
        selectedDate={selectedDate} 
        onDateChange={setSelectedDate} 
      />

      {/* Live Sessions Grid */}
      <div className="lesson-grid">
        {filteredSessions.map((session) => (
          <LiveSessionCard key={session.id} session={session} />
        ))}
      </div>

      {filteredSessions.length === 0 && <EmptyState />}

      {/* Weekly Schedule */}
      <WeeklySchedule />
    </div>
  );
};

export default Live;
