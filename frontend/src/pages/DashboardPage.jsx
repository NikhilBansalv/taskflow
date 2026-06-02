import { useEffect, useState } from "react";
import api from "../services/api";

function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get("/api/dashboard/stats");
      setStats(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>TaskFlow Dashboard 🚀</h1>

      <div
        style={{
          marginTop: "30px",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
        }}
      >
        <Card title="Total Projects" value={stats.totalProjects} />

        <Card title="Total Tasks" value={stats.totalTasks} />

        <Card title="Completed Tasks" value={stats.completedTasks} />

        <Card title="Pending Tasks" value={stats.pendingTasks} />

        <Card title="High Priority Tasks" value={stats.highPriorityTasks} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h3>{title}</h3>

      <h1
        style={{
          marginTop: "15px",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default DashboardPage;
