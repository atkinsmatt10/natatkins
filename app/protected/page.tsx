import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const { userId } = await auth();
  const user = await currentUser();

  // Redirect to sign-in if not authenticated
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Protected Page</h1>
      
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user?.firstName || "User"}!</h2>
        
        <div className="space-y-3">
          <p><strong>User ID:</strong> {userId}</p>
          <p><strong>Email:</strong> {user?.emailAddresses[0]?.emailAddress}</p>
          <p><strong>Full Name:</strong> {user?.fullName}</p>
          <p><strong>Created:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</p>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              This page is protected by Clerk authentication. Only authenticated users can access this content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 