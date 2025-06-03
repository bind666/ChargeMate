import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import RootLayout from "../layouts/RootLayout.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "../components/common/ProtectedRoute";
import PublicRoute from "../components/common/PublicRoute";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Profile = lazy(() => import("../pages/Profile"));
const Auth = lazy(() => import("../pages/Auth"));
const StationList = lazy(() => import("../pages/StationList"));
const StationForm = lazy(() => import("../pages/StationForm")); // Reusable for add/edit

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <AuthProvider>
                <RootLayout />
            </AuthProvider>
        ),
        children: [
            {
                path: "",
                element: (
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        path: "dashboard",
                        element: (
                            <Suspense fallback={<p>Loading Dashboard...</p>}>
                                <Dashboard />
                            </Suspense>
                        ),
                    },
                    {
                        path: "profile",
                        element: (
                            <Suspense fallback={<p>Loading Profile...</p>}>
                                <Profile />
                            </Suspense>
                        ),
                    },
                    {
                        path: "stations",
                        element: (
                            <Suspense fallback={<p>Loading Stations...</p>}>
                                <StationList />
                            </Suspense>
                        ),
                    },
                    {
                        path: "stations/add",
                        element: (
                            <Suspense fallback={<p>Loading Form...</p>}>
                                <StationForm />
                            </Suspense>
                        ),
                    },
                    {
                        path: "stations/edit/:id",
                        element: (
                            <Suspense fallback={<p>Loading Form...</p>}>
                                <StationForm />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: "auth",
                element: (
                    <PublicRoute>
                        <Suspense fallback={<p>Loading Auth...</p>}>
                            <Auth />
                        </Suspense>
                    </PublicRoute>
                ),
            },
        ],
    },
]);

export default router;
