import type { ResidentProfile, ResidentNotification } from '../types/resident';

export const RESIDENT_USER: ResidentProfile = {
  id: 'res-lk-10492',
  name: 'Sunil Wickramasinghe',
  email: 'sunil.w@greencycle.lk',
  phone: '+94 77 123 4567',
  municipality: 'Colombo Municipal Council',
  zone: 'Ward 07 - Cinnamon Gardens',
  address: 'No. 42/3, Alfred Place, Colombo 03',
  greenPoints: 680,
  ecoLevel: 'Level 4 Eco Champion',
  rankTitle: 'Eco Champion',
  monthlyRecycledKg: 42.5,
  streakDays: 14,
};

export const MOCK_RESIDENT_NOTIFICATIONS: ResidentNotification[] = [
  {
    id: 'rn-1',
    title: 'Truck Approaching Your Lane',
    message: 'Organic collection truck LK-WP-8921 is approximately 10 minutes away from your street.',
    timestamp: '5 mins ago',
    category: 'collection',
    isRead: false,
    link: '/resident/tracking',
  },
  {
    id: 'rn-2',
    title: 'Bulky Pickup Approved',
    message: 'Your scheduled e-waste & bulky furniture collection has been assigned for tomorrow at 9:30 AM.',
    timestamp: '2 hours ago',
    category: 'pickup',
    isRead: false,
    link: '/resident/pickup',
  },
  {
    id: 'rn-3',
    title: '+50 Green Points Earned!',
    message: 'Verified drop-off at Town Hall Recycling Center. Your new balance is 680 GP.',
    timestamp: 'Yesterday',
    category: 'reward',
    isRead: true,
    link: '/resident/rewards',
  },
  {
    id: 'rn-4',
    title: 'Holiday Schedule Notice',
    message: 'Special dry waste collection timings will apply during the upcoming Poya weekend.',
    timestamp: '2 days ago',
    category: 'alert',
    isRead: true,
    link: '/resident/schedule',
  },
];
