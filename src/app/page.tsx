import AbsencesTable from "@/components/AbsencesTable";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Absences Management System
        </h1>
        <AbsencesTable />
      </div>
    </div>
  );
}
