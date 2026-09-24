import { Route, Routes, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/app/ProtectedRoute";
import { ComponentShowcase } from "@/components/ComponentShowcase";
import { DisposalCentersPage } from "@/pages/disposal/DisposalCentersPage";
import { DisposalCenterDetailsPage } from "@/pages/disposal/DisposalCenterDetailsPage";
import { ReportIssuePage } from "@/features/reports/pages/ReportIssuePage";
import { MyReportsPage } from "@/features/reports/pages/MyReportsPage";
import { ReportDetailPage } from "@/features/reports/pages/ReportDetailPage";
import { ResidentNotificationsPage, ResidentMyReportsPage, ResidentScannerPage, ResidentSettingsPage, ResidentDashboardPage as ResidentPortalDashboard } from "@/features/resident";

import { CollectionHistory } from "@/features/collector/pages/CollectionHistory";
import { CollectorDashboardPage } from "@/features/collector/pages/CollectorDashboardPage";
import { HomePage } from "@/features/home/HomePage";
import { OnboardPage } from "@/features/home/onboard";
import {
  LoginPage,
  ResidentRegisterPage,
  CollectorRegisterPage,
  MunicipalityRegisterPage,
} from "@/features/auth";
import {
  AdminDashboardPage,
  AdminUsersPage,
  AdminMunicipalitiesPage,
  AdminDisposalCentersPage,
  AdminCollectionRequestsPage,
  AdminComplaintsPage,
  AdminNotificationsPage,
  AdminActivityPage,
  AdminSettingsPage,
} from "@/features/admin";
import {
  MunicipalDashboardPage,
  MunicipalCollectionRequestsPage,
  MunicipalDisposalCentersPage,
  MunicipalCollectorsPage,
  MunicipalComplaintsPage,
  MunicipalNotificationsPage,
  MunicipalSchedulePage,
  MunicipalActivityPage,
  MunicipalSettingsPage,
} from '@/features/municipal';

/** Renders a placeholder page for routes that are not implemented yet. */
function ComingSoon({ feature }: { feature: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center p-6 text-center">
      <div>
        <h1 className="text-2xl font-semibold text-primary">GreenCycle LK</h1>
        <p className="mt-2 text-gray-600">
          The &quot;{feature}&quot; feature is under construction.
        </p>
      </div>
    </div>
  );
}

/** Defines the application's public and protected route tree. */
export function AppRouter() {
  const collectionHistory = import.meta.env.DEV ? (
    <CollectionHistory />
  ) : (
    <ProtectedRoute allowedRoles={["COLLECTOR"]}>
      <CollectionHistory />
    </ProtectedRoute>
  );

  const collectorDashboard = import.meta.env.DEV ? (
    <CollectorDashboardPage />
  ) : (
    <ProtectedRoute allowedRoles={["COLLECTOR"]}>
      <CollectorDashboardPage />
    </ProtectedRoute>
  );

  const residentDashboard = import.meta.env.DEV ? (
    <ResidentPortalDashboard />
  ) : (
    <ProtectedRoute allowedRoles={["RESIDENT"]}>
      <ResidentPortalDashboard />
    </ProtectedRoute>
  );

  return (
    <Routes>
      <Route path="/disposal-centers" element={<DisposalCentersPage />} />
      <Route
        path="/disposal-centers/:id"
        element={<DisposalCenterDetailsPage />}
      />
      <Route
        path="/map"
        element={<Navigate to="/disposal-centers" replace />}
      />
      <Route path="/" element={<HomePage />} />
      <Route path="/components" element={<ComponentShowcase />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<OnboardPage />} />
      <Route path="/register/resident" element={<ResidentRegisterPage />} />
      <Route path="/register/collector" element={<CollectorRegisterPage />} />
      <Route
        path="/register/municipality"
        element={<MunicipalityRegisterPage />}
      />

      {/* Resident Report / Issue Routes */}
      <Route path="/report" element={<Navigate to="/report-issue" replace />} />
      <Route path="/report-issue" element={<ReportIssuePage />} />
      <Route path="/my-reports" element={<MyReportsPage />} />
      <Route path="/my-reports/:id" element={<ReportDetailPage />} />

      {/* Admin Dashboard Routes */}
      <Route
        path="/admin"
        element={<Navigate to="/admin/dashboard" replace />}
      />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin/users" element={<AdminUsersPage />} />
      <Route
        path="/admin/municipalities"
        element={<AdminMunicipalitiesPage />}
      />
      <Route
        path="/admin/municipalities/register"
        element={<MunicipalityRegisterPage />}
      />
      <Route
        path="/admin/disposal-centers"
        element={<AdminDisposalCentersPage />}
      />
      <Route
        path="/admin/collection-requests"
        element={<AdminCollectionRequestsPage />}
      />
      <Route path="/admin/complaints" element={<AdminComplaintsPage />} />
      <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
      <Route path="/admin/activity" element={<AdminActivityPage />} />
      <Route path="/admin/settings" element={<AdminSettingsPage />} />

      {/* Municipal Dashboard Routes */}
      <Route
        path="/municipal"
        element={<Navigate to="/municipal/dashboard" replace />}
      />
      <Route path="/municipal/dashboard" element={<MunicipalDashboardPage />} />
      <Route
        path="/municipal/collection-requests"
        element={<MunicipalCollectionRequestsPage />}
      />
      <Route
        path="/municipal/disposal-centers"
        element={<MunicipalDisposalCentersPage />}
      />
      <Route
        path="/municipal/collectors"
        element={<MunicipalCollectorsPage />}
      />
      <Route
        path="/municipal/collectors/register"
        element={<CollectorRegisterPage />}
      />
      <Route
        path="/municipal/complaints"
        element={<MunicipalComplaintsPage />}
      />
      <Route
        path="/municipal/notifications"
        element={<MunicipalNotificationsPage />}
      />
      <Route path="/municipal/schedule" element={<MunicipalSchedulePage />} />
      <Route path="/municipal/activity" element={<MunicipalActivityPage />} />
      <Route path="/municipal/settings" element={<MunicipalSettingsPage />} />

      <Route path="/collector/dashboard" element={collectorDashboard} />

      <Route path="/collector/collection-history" element={collectionHistory} />

      {/* Resident Dashboard Routes */}
      <Route path="/resident" element={<Navigate to="/resident/dashboard" replace />} />
      <Route path="/resident/dashboard" element={residentDashboard} />
      <Route path="/resident/schedule" element={<ResidentPortalDashboard />} />
      <Route path="/resident/tracking" element={<ResidentPortalDashboard />} />
      <Route path="/resident/scanner" element={<ResidentScannerPage />} />
      <Route path="/scanner" element={<Navigate to="/resident/scanner" replace />} />
      <Route path="/resident/pickup" element={<ResidentPortalDashboard />} />
      <Route path="/resident/disposal-centers" element={<Navigate to="/disposal-centers" replace />} />
      <Route path="/resident/rewards" element={<ResidentPortalDashboard />} />
      <Route path="/resident/reports" element={<ResidentMyReportsPage />} />
      <Route path="/resident/report-issue" element={<Navigate to="/report-issue" replace />} />
      <Route path="/resident/notifications" element={<ResidentNotificationsPage />} />
      <Route path="/notifications" element={<Navigate to="/resident/notifications" replace />} />
      <Route path="/resident/settings" element={<ResidentSettingsPage />} />
      <Route path="/resident/profile" element={<Navigate to="/resident/settings" replace />} />
      <Route path="/settings" element={<Navigate to="/resident/settings" replace />} />
      <Route path="/profile" element={<Navigate to="/resident/settings" replace />} />

      <Route
        path="/dashboard"
        element={residentDashboard}
      />

      <Route path="*" element={<ComingSoon feature="404 — Not Found" />} />
    </Routes>
  );
}
