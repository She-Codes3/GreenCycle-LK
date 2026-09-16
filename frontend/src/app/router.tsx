import { Route, Routes, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/app/ProtectedRoute';
import { ComponentShowcase } from '@/components/ComponentShowcase';
import { DisposalCentersPage } from '@/pages/disposal/DisposalCentersPage';
import { DisposalCenterDetailsPage } from '@/pages/disposal/DisposalCenterDetailsPage';

import { CollectionHistory } from '@/features/collector/pages/CollectionHistory';
import { CollectorDashboardPage } from '@/features/collector/pages/CollectorDashboardPage';
import { HomePage } from '@/features/home/HomePage';
import { OnboardPage } from '@/features/home/onboard';
import { LoginPage, ResidentRegisterPage } from '@/features/auth';
import {
  AdminDashboardPage,
  AdminUsersPage,
  AdminMunicipalitiesPage,
  AdminDisposalCentersPage,
  AdminComplaintsPage,
  AdminActivityPage,
  AdminSettingsPage,
} from '@/features/admin';

/** Renders a placeholder page for routes that are not implemented yet. */
function ComingSoon({ feature }: { feature: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center p-6 text-center">
      <div>
        <h1 className="text-2xl font-semibold text-primary">GreenCycle LK</h1>
        <p className="mt-2 text-gray-600">The &quot;{feature}&quot; feature is under construction.</p>
      </div>
    </div>
  );
}

/** Defines the application's public and protected route tree. */
export function AppRouter() {
  const collectionHistory = import.meta.env.DEV ? (
    <CollectionHistory />
  ) : (
    <ProtectedRoute allowedRoles={['COLLECTOR']}>
      <CollectionHistory />
    </ProtectedRoute>
  );

  const collectorDashboard = import.meta.env.DEV ? (
    <CollectorDashboardPage />
  ) : (
    <ProtectedRoute allowedRoles={['COLLECTOR']}>
      <CollectorDashboardPage />
    </ProtectedRoute>
  );

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/disposal-centers" replace />} />
      <Route path="/disposal-centers" element={<DisposalCentersPage />} />
      <Route path="/disposal-centers/:id" element={<DisposalCenterDetailsPage />} />
      <Route path="/map" element={<Navigate to="/disposal-centers" replace />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/components" element={<ComponentShowcase />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<OnboardPage />} />
      <Route path="/register/resident" element={<ResidentRegisterPage />} />

      {/* Admin Dashboard Routes */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin/users" element={<AdminUsersPage />} />
      <Route path="/admin/municipalities" element={<AdminMunicipalitiesPage />} />
      <Route path="/admin/disposal-centers" element={<AdminDisposalCentersPage />} />
      <Route path="/admin/complaints" element={<AdminComplaintsPage />} />
      <Route path="/admin/activity" element={<AdminActivityPage />} />
      <Route path="/admin/settings" element={<AdminSettingsPage />} />

      <Route
        path="/collector/dashboard"
        element={collectorDashboard}
      />

      <Route
        path="/collector/collection-history"
        element={collectionHistory}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <ComingSoon feature="Dashboard" />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<ComingSoon feature="404 — Not Found" />} />
    </Routes>
  );
}
