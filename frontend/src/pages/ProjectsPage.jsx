import { useEffect, useState } from "react";
import api from "../services/api";
import DashboardLayout from "../components/DashboardLayout";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const email = localStorage.getItem("email");
      console.log("Email:", localStorage.getItem("email"));
      const response = await api.get(`/api/projects?email=${email}`);
      console.log(response.data);

      setProjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <h1
        style={{
          color: "white",
          marginBottom: "20px",
        }}
      >
        Projects
      </h1>

      {projects.map((project) => (
        <div
          key={project.id}
          style={{
            background: "#111827",
            border: "1px solid #374151",
            padding: "20px",
            marginBottom: "15px",
            borderRadius: "12px",
          }}
        >
          <h3
            style={{
              color: "white",
              marginBottom: "10px",
            }}
          >
            {project.name}
          </h3>

          <p
            style={{
              color: "#d1d5db",
            }}
          >
            {project.description}
          </p>

          <small
            style={{
              color: "#9ca3af",
            }}
          >
            Created: {new Date(project.createdAt).toLocaleDateString()}
          </small>
        </div>
      ))}
    </DashboardLayout>
  );
}

export default ProjectsPage;
