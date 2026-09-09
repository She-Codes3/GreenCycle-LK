import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '@/app/ProtectedRoute';
import { ComponentShowcase } from '@/components/ComponentShowcase';

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

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<ComingSoon feature="Home" />} />
      <Route path="/components" element={<ComponentShowcase />} />
      <Route path="/login" element={<ComingSoon feature="Login" />} />
      <Route path="/register" element={<ComingSoon feature="Register" />} />

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
