import { NoticeBoard } from '../NoticeBoard';
import { useState } from 'react';

// TODO: Remove mock data
const mockNotices = [
  {
    id: '1',
    title: 'Annual Sports Day - Registration Open',
    content: 'Registration for the annual sports day is now open. Students can register for various events including track and field, swimming, and team sports. Deadline: March 15th.',
    type: 'info' as const,
    author: 'Physical Education Department',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    targetAudience: 'students' as const,
    isRead: false
  },
  {
    id: '2',
    title: 'Parent-Teacher Conference Scheduled',
    content: 'Parent-teacher conferences will be held next week from March 20-22. Please check your email for your scheduled appointment time.',
    type: 'warning' as const,
    author: 'Administration',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    targetAudience: 'parents' as const,
    isRead: false
  },
  {
    id: '3',
    title: 'URGENT: Early Dismissal Tomorrow',
    content: 'Due to severe weather warning, school will dismiss 2 hours early tomorrow (March 18th). Buses will run on modified schedule.',
    type: 'urgent' as const,
    author: 'Principal Office',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    targetAudience: 'all' as const,
    isRead: false
  },
  {
    id: '4',
    title: 'Science Fair Winners Announced',
    content: 'Congratulations to all participants in this year\'s science fair! Winners will be recognized at tomorrow\'s assembly.',
    type: 'success' as const,
    author: 'Science Department',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    targetAudience: 'students' as const,
    isRead: true
  },
  {
    id: '5',
    title: 'New Library Hours Effective Monday',
    content: 'Starting Monday, the library will be open from 7:30 AM to 6:00 PM on weekdays. Weekend hours remain unchanged.',
    type: 'info' as const,
    author: 'Library Staff',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    targetAudience: 'all' as const,
    isRead: false
  }
];

export default function NoticeBoardExample() {
  const [notices, setNotices] = useState(mockNotices);
  
  const handleMarkAsRead = (noticeId: string) => {
    setNotices(prev => prev.map(notice => 
      notice.id === noticeId ? { ...notice, isRead: true } : notice
    ));
    console.log('Marked notice as read:', noticeId);
  };
  
  const handleViewAll = () => {
    console.log('View all notices clicked');
  };
  
  return (
    <div className="p-4">
      <NoticeBoard 
        notices={notices}
        onMarkAsRead={handleMarkAsRead}
        onViewAll={handleViewAll}
        maxItems={4}
      />
    </div>
  );
}