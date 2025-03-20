"use client";

import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session.user?.email}</h1>
      <div className="bg-gray-100 p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-2">Your Token:</h2>
        <pre className="bg-gray-200 p-2 rounded-md overflow-x-auto">
          {session.user?.accessToken}
        </pre>
      </div>
    </div>
  );
};

export default Dashboard;
