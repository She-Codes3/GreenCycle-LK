import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '@/app/ProtectedRoute';
import { ComponentShowcase } from '@/components/ComponentShowcase';

import { CollectorDashboardPage } from '@/features/collector/dashboard/pages/CollectorDashboardPage';
import { HomePage } from '@/features/home/HomePage';
import { OnboardPage } from '@/features/home/onboard';
import { LoginPage, ResidentRegisterPage } from '@/features/auth';

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
  const collectorDashboard = import.meta.env.DEV ? (
    <CollectorDashboardPage />
  ) : (
    <ProtectedRoute allowedRoles={['COLLECTOR']}>
      <CollectorDashboardPage />
    </ProtectedRoute>
  );

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/components" element={<ComponentShowcase />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<OnboardPage />} />
      <Route path="/register/resident" element={<ResidentRegisterPage />} />

      <Route
        path="/collector/dashboard"
        element={collectorDashboard}
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
