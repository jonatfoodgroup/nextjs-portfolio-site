import moment from 'moment';

export const groups = [
  { id: 1, title: 'Milestones', isParent: true },
  { id: 2, title: 'Key Dates', parent: 1 },
  { id: 3, title: 'Product Launches', parent: 1 },
  { id: 4, title: 'Upcoming Products', isParent: true },
  { id: 5, title: 'Air App', parent: 4 },
  { id: 6, title: 'Air VR', parent: 4 },
];

export const items = [
  {
    id: 1,
    group: 2, // 'Key Dates' under 'Milestones'
    title: 'V1.3 Release',
    start_time: moment('2024-01-15T00:00:00').toDate(),
    end_time: moment('2024-01-15T23:59:59').toDate(),
    type: 'milestone',
    icon: '⚠️',
  },
  {
    id: 2,
    group: 3, // 'Product Launches' under 'Milestones'
    title: 'Air App Beta',
    start_time: moment('2024-01-01T00:00:00').toDate(),
    end_time: moment('2024-03-15T23:59:59').toDate(),
    type: 'task',
  },
  {
    id: 3,
    group: 5, // 'Air App' under 'Upcoming Products'
    title: 'iOS Beta Launch',
    start_time: moment('2024-02-16T00:00:00').toDate(),
    end_time: moment('2024-02-16T23:59:59').toDate(),
    type: 'launch',
  },
  {
    id: 4,
    group: 6, // 'Air VR' under 'Upcoming Products'
    title: 'Air VR Glasses Prototype',
    start_time: moment('2024-03-01T00:00:00').toDate(),
    end_time: moment('2024-03-30T23:59:59').toDate(),
    type: 'feature',
  },
];

