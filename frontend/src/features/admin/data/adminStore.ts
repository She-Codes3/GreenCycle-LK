import { useState, useEffect, useCallback, useMemo } from 'react';
import { AdminUser, AdminActivityLog } from '../types/admin';
import { MOCK_ADMIN_ACTIVITY_LOGS } from './adminMockData';

const GC_ADMIN_USERS_STORAGE_KEY = 'gc_admin_users_v2';
const GC_ADMIN_LOGS_STORAGE_KEY = 'gc_admin_logs_v2';
const ADMIN_STATE_CHANGE_EVENT = 'gc_admin_state_change';

export const SUSPENSION_REASONS = [
  'Policy Violation',
  'Inappropriate Activity',
  'Fraudulent or Suspicious Activity',
  'Repeated Violations',
  'Account Security Concern',
  'Inactive / Misuse of Account',
  'Administrative Action',
  'Other',
] as const;

export type SuspensionReason = (typeof SUSPENSION_REASONS)[number];

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'USR-001',
    name: 'Kasun Perera',
    email: 'kasun.perera@gmail.com',
    phone: '+94 77 123 4567',
    role: 'Citizen',
    municipality: 'Colombo Municipal Council',
    status: 'Active',
    joinedDate: '2025-11-12',
    lastActive: '5 mins ago',
    history: [
      {
        id: 'hist-001-1',
        action: 'Created',
        date: '12 Nov 2025',
        performedBy: 'System Registration',
      },
    ],
  },
  {
    id: 'USR-002',
    name: 'Nimal Silva',
    email: 'nimal.silva@kandy.mc.gov.lk',
    phone: '+94 71 987 6543',
    role: 'Municipal User',
    municipality: 'Kandy Municipal Council',
    status: 'Active',
    joinedDate: '2025-08-20',
    lastActive: '20 mins ago',
    history: [
      {
        id: 'hist-002-1',
        action: 'Created',
        date: '20 Aug 2025',
        performedBy: 'Municipal Onboarding',
      },
      {
        id: 'hist-002-2',
        action: 'Activated',
        date: '21 Aug 2025',
        performedBy: 'Eng. Anura Jayasinghe',
        performedByRole: 'System Admin',
      },
    ],
  },
  {
    id: 'USR-003',
    name: 'Amal Fernando',
    email: 'amal.fernando@yahoo.com',
    phone: '+94 76 345 6789',
    role: 'Citizen',
    municipality: 'Galle Municipal Council',
    status: 'Inactive',
    joinedDate: '2026-01-15',
    lastActive: '4 days ago',
    history: [
      {
        id: 'hist-003-1',
        action: 'Created',
        date: '15 Jan 2026',
        performedBy: 'System Registration',
      },
    ],
  },
  {
    id: 'USR-004',
    name: 'Sunil Wickramasinghe',
    email: 'sunil.w@colomborecycle.lk',
    phone: '+94 77 888 9999',
    role: 'Collector',
    municipality: 'Colombo Municipal Council',
    status: 'Active',
    joinedDate: '2025-09-04',
    lastActive: '12 mins ago',
    history: [
      {
        id: 'hist-004-1',
        action: 'Created',
        date: '04 Sep 2025',
        performedBy: 'Collector Certification Portal',
      },
    ],
  },
  {
    id: 'USR-005',
    name: 'Fathima Rizna',
    email: 'fathima.r@jaffna.mc.gov.lk',
    phone: '+94 75 555 4321',
    role: 'Municipal User',
    municipality: 'Jaffna Municipal Council',
    status: 'Active',
    joinedDate: '2026-02-01',
    lastActive: '1 hour ago',
    history: [
      {
        id: 'hist-005-1',
        action: 'Created',
        date: '01 Feb 2026',
        performedBy: 'Municipal Onboarding',
      },
    ],
  },
  {
    id: 'USR-006',
    name: 'Dinesh Jayawardena',
    email: 'dinesh.j@outlook.com',
    phone: '+94 70 234 5678',
    role: 'Citizen',
    municipality: 'Negombo Municipal Council',
    status: 'Suspended',
    joinedDate: '2026-03-10',
    lastActive: '3 hours ago',
    suspension: {
      reason: 'Inappropriate Activity',
      note: 'Multiple fake waste report submissions flagged by municipal supervisors.',
      suspendedAt: '12 Mar 2026, 02:15 PM',
      suspendedBy: 'Eng. Anura Jayasinghe',
      suspendedByRole: 'System Administrator',
    },
    history: [
      {
        id: 'hist-006-1',
        action: 'Created',
        date: '10 Mar 2026',
        performedBy: 'System Registration',
      },
      {
        id: 'hist-006-2',
        action: 'Suspended',
        date: '12 Mar 2026, 02:15 PM',
        performedBy: 'Eng. Anura Jayasinghe',
        performedByRole: 'System Administrator',
        reason: 'Inappropriate Activity',
        note: 'Multiple fake waste report submissions flagged by municipal supervisors.',
      },
    ],
  },
  {
    id: 'USR-007',
    name: 'Kamal Gunaratne',
    email: 'kamal.g@greenlk.org',
    phone: '+94 77 444 1122',
    role: 'Collector',
    municipality: 'Kandy Municipal Council',
    status: 'Active',
    joinedDate: '2025-10-18',
    lastActive: 'Just now',
    history: [
      {
        id: 'hist-007-1',
        action: 'Created',
        date: '18 Oct 2025',
        performedBy: 'Collector Certification Portal',
      },
    ],
  },
  {
    id: 'USR-008',
    name: 'Anoma Rathnayake',
    email: 'anoma.r@galle.citizen.lk',
    phone: '+94 72 333 7788',
    role: 'Citizen',
    municipality: 'Galle Municipal Council',
    status: 'Suspended',
    joinedDate: '2025-12-05',
    lastActive: '2 weeks ago',
    suspension: {
      reason: 'Policy Violation',
      note: 'Repeated misuse of the collection management system.',
      suspendedAt: '17 Sep 2026, 09:20 AM',
      suspendedBy: 'Eng. Anura Jayasinghe',
      suspendedByRole: 'System Administrator',
    },
    history: [
      {
        id: 'hist-008-1',
        action: 'Created',
        date: '05 Dec 2025',
        performedBy: 'System Registration',
      },
      {
        id: 'hist-008-2',
        action: 'Suspended',
        date: '17 Sep 2026, 09:20 AM',
        performedBy: 'Eng. Anura Jayasinghe',
        performedByRole: 'System Administrator',
        reason: 'Policy Violation',
        note: 'Repeated misuse of the collection management system.',
      },
    ],
  },
  {
    id: 'USR-009',
    name: 'Eng. Anura Jayasinghe',
    email: 'admin.anura@greencycle.lk',
    phone: '+94 11 255 8899',
    role: 'System Admin',
    municipality: 'National Administration',
    status: 'Active',
    joinedDate: '2025-06-01',
    lastActive: 'Now',
    history: [
      {
        id: 'hist-009-1',
        action: 'Created',
        date: '01 Jun 2025',
        performedBy: 'SuperAdmin Seed',
      },
    ],
  },
  {
    id: 'USR-010',
    name: 'Chathura Bandara',
    email: 'chathura.b@kurunegala.gov.lk',
    phone: '+94 78 999 1234',
    role: 'Municipal User',
    municipality: 'Kurunegala Municipal Council',
    status: 'Active',
    joinedDate: '2026-01-22',
    lastActive: '5 hours ago',
    history: [
      {
        id: 'hist-010-1',
        action: 'Created',
        date: '22 Jan 2026',
        performedBy: 'Municipal Onboarding',
      },
    ],
  },
  {
    id: 'USR-011',
    name: 'Priyani Samarasinghe',
    email: 'priyani.s@matara.mc.gov.lk',
    phone: '+94 71 222 3344',
    role: 'Municipal User',
    municipality: 'Matara Municipal Council',
    status: 'Active',
    joinedDate: '2026-02-14',
    lastActive: '1 day ago',
    history: [
      {
        id: 'hist-011-1',
        action: 'Created',
        date: '14 Feb 2026',
        performedBy: 'Municipal Onboarding',
      },
    ],
  },
  {
    id: 'USR-012',
    name: 'Nuwan Alwis',
    email: 'nuwan.alwis@gmail.com',
    phone: '+94 77 666 7788',
    role: 'Citizen',
    municipality: 'Dehiwala-Mount Lavinia',
    status: 'Suspended',
    joinedDate: '2026-03-01',
    lastActive: '2 days ago',
    suspension: {
      reason: 'Account Security Concern',
      note: 'Multiple anomalous login attempts flagged by platform security sentinels.',
      suspendedAt: '14 Mar 2026, 11:45 AM',
      suspendedBy: 'Eng. Anura Jayasinghe',
      suspendedByRole: 'System Administrator',
    },
    history: [
      {
        id: 'hist-012-1',
        action: 'Created',
        date: '01 Mar 2026',
        performedBy: 'System Registration',
      },
      {
        id: 'hist-012-2',
        action: 'Suspended',
        date: '14 Mar 2026, 11:45 AM',
        performedBy: 'Eng. Anura Jayasinghe',
        performedByRole: 'System Administrator',
        reason: 'Account Security Concern',
        note: 'Multiple anomalous login attempts flagged by platform security sentinels.',
      },
    ],
  },
];

function getStoredUsers(): AdminUser[] {
  try {
    const raw = localStorage.getItem(GC_ADMIN_USERS_STORAGE_KEY);
    if (!raw) return INITIAL_ADMIN_USERS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ADMIN_USERS;
  } catch {
    return INITIAL_ADMIN_USERS;
  }
}

function getStoredLogs(): AdminActivityLog[] {
  try {
    const raw = localStorage.getItem(GC_ADMIN_LOGS_STORAGE_KEY);
    if (!raw) return MOCK_ADMIN_ACTIVITY_LOGS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : MOCK_ADMIN_ACTIVITY_LOGS;
  } catch {
    return MOCK_ADMIN_ACTIVITY_LOGS;
  }
}

function saveUsers(users: AdminUser[]): void {
  try {
    localStorage.setItem(GC_ADMIN_USERS_STORAGE_KEY, JSON.stringify(users));
  } catch {
    // Ignore storage quota errors
  }
}

function saveLogs(logs: AdminActivityLog[]): void {
  try {
    localStorage.setItem(GC_ADMIN_LOGS_STORAGE_KEY, JSON.stringify(logs));
  } catch {
    // Ignore storage quota errors
  }
}

function notifyStateChange(): void {
  window.dispatchEvent(new CustomEvent(ADMIN_STATE_CHANGE_EVENT));
}

function formatCurrentDateTime(): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${day} ${month} ${year}, ${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
}

function formatTimeOnly(): string {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
}

export function useAdminData() {
  const [users, setUsers] = useState<AdminUser[]>(getStoredUsers);
  const [logs, setLogs] = useState<AdminActivityLog[]>(getStoredLogs);

  const refresh = useCallback(() => {
    setUsers(getStoredUsers());
    setLogs(getStoredLogs());
  }, []);

  useEffect(() => {
    const handleCustomEvent = () => refresh();
    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === GC_ADMIN_USERS_STORAGE_KEY || e.key === GC_ADMIN_LOGS_STORAGE_KEY) {
        refresh();
      }
    };

    window.addEventListener(ADMIN_STATE_CHANGE_EVENT, handleCustomEvent);
    window.addEventListener('storage', handleStorageEvent);

    return () => {
      window.removeEventListener(ADMIN_STATE_CHANGE_EVENT, handleCustomEvent);
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, [refresh]);

  const userStats = useMemo(() => {
    const total = users.length;
    let active = 0;
    let suspended = 0;
    let inactive = 0;

    for (const u of users) {
      if (u.status === 'Active') active++;
      else if (u.status === 'Suspended') suspended++;
      else if (u.status === 'Inactive') inactive++;
    }

    return { total, active, suspended, inactive };
  }, [users]);

  const suspendUser = useCallback(
    (userId: string, reason: string, note: string) => {
      const currentUsers = getStoredUsers();
      const target = currentUsers.find((u) => u.id === userId);
      if (!target) return null;

      const formattedNow = formatCurrentDateTime();
      const cleanNote = note.trim();
      const adminName = 'Eng. Anura Jayasinghe';
      const adminRole = 'System Administrator';

      const suspensionData = {
        reason,
        note: cleanNote,
        suspendedAt: formattedNow,
        suspendedBy: adminName,
        suspendedByRole: adminRole,
      };

      const newHistoryItem = {
        id: `hist-${Date.now()}`,
        action: 'Suspended' as const,
        date: formattedNow,
        performedBy: adminName,
        performedByRole: adminRole,
        reason,
        note: cleanNote,
      };

      const updatedUsers = currentUsers.map((u) => {
        if (u.id === userId) {
          return {
            ...u,
            status: 'Suspended' as const,
            suspension: suspensionData,
            history: [newHistoryItem, ...(u.history || [])],
          };
        }
        return u;
      });

      saveUsers(updatedUsers);

      // Create new activity log
      const currentLogs = getStoredLogs();
      const newLog: AdminActivityLog = {
        id: `ACT-${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toISOString(),
        time: formatTimeOnly(),
        dateGroup: 'Today',
        title: 'User Suspended',
        description: `${target.name}'s account was suspended. Reason: ${reason}`,
        module: 'User Management',
        performedBy: adminName,
        performedByRole: 'System Admin',
        ipAddress: '112.134.142.18',
        severity: 'warning',
      };

      const updatedLogs = [newLog, ...currentLogs];
      saveLogs(updatedLogs);

      notifyStateChange();
      return target;
    },
    []
  );

  const restoreUser = useCallback((userId: string) => {
    const currentUsers = getStoredUsers();
    const target = currentUsers.find((u) => u.id === userId);
    if (!target) return null;

    const formattedNow = formatCurrentDateTime();
    const adminName = 'Eng. Anura Jayasinghe';
    const adminRole = 'System Administrator';

    const newHistoryItem = {
      id: `hist-${Date.now()}`,
      action: 'Restored' as const,
      date: formattedNow,
      performedBy: adminName,
      performedByRole: adminRole,
    };

    const updatedUsers = currentUsers.map((u) => {
      if (u.id === userId) {
        return {
          ...u,
          status: 'Active' as const,
          // Note: we preserve target.suspension or history for audit trail
          history: [newHistoryItem, ...(u.history || [])],
        };
      }
      return u;
    });

    saveUsers(updatedUsers);

    // Create activity log
    const currentLogs = getStoredLogs();
    const newLog: AdminActivityLog = {
      id: `ACT-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      time: formatTimeOnly(),
      dateGroup: 'Today',
      title: 'User Restored',
      description: `${target.name}'s account was restored.`,
      module: 'User Management',
      performedBy: adminName,
      performedByRole: 'System Admin',
      ipAddress: '112.134.142.18',
      severity: 'success',
    };

    const updatedLogs = [newLog, ...currentLogs];
    saveLogs(updatedLogs);

    notifyStateChange();
    return target;
  }, []);

  const activateUser = useCallback((userId: string) => {
    const currentUsers = getStoredUsers();
    const target = currentUsers.find((u) => u.id === userId);
    if (!target) return null;

    const formattedNow = formatCurrentDateTime();
    const adminName = 'Eng. Anura Jayasinghe';
    const adminRole = 'System Administrator';

    const newHistoryItem = {
      id: `hist-${Date.now()}`,
      action: 'Activated' as const,
      date: formattedNow,
      performedBy: adminName,
      performedByRole: adminRole,
    };

    const updatedUsers = currentUsers.map((u) => {
      if (u.id === userId) {
        return {
          ...u,
          status: 'Active' as const,
          history: [newHistoryItem, ...(u.history || [])],
        };
      }
      return u;
    });

    saveUsers(updatedUsers);

    const currentLogs = getStoredLogs();
    const newLog: AdminActivityLog = {
      id: `ACT-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      time: formatTimeOnly(),
      dateGroup: 'Today',
      title: 'User Activated',
      description: `${target.name}'s account status set to Active.`,
      module: 'User Management',
      performedBy: adminName,
      performedByRole: 'System Admin',
      ipAddress: '112.134.142.18',
      severity: 'info',
    };

    const updatedLogs = [newLog, ...currentLogs];
    saveLogs(updatedLogs);

    notifyStateChange();
    return target;
  }, []);

  const resetAdminData = useCallback(() => {
    localStorage.removeItem(GC_ADMIN_USERS_STORAGE_KEY);
    localStorage.removeItem(GC_ADMIN_LOGS_STORAGE_KEY);
    notifyStateChange();
  }, []);

  return {
    users,
    logs,
    userStats,
    suspendUser,
    restoreUser,
    activateUser,
    resetAdminData,
  };
}
