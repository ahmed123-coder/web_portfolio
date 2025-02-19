import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/custom.css";

const API_URL = "http://localhost:3000/api/project"; // Update with your backend API URL

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(API_URL);
      setProjects(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("حدث خطأ أثناء جلب البيانات. يرجى المحاولة مرة أخرى لاحقًا.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-5">جاري التحميل...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="projects">
    <div className="container mt-5">
      <h2 className="text-center">Projects</h2>
      <div className="row">
        {projects.map((project) => (
          <div key={project._id} className="col-md-4 mb-4">
            <div className="card h-100 text-center">
              {/* Circular Image */}
                <img
                  src={`http://localhost:3000/${project.image}`} // Use the image field for the circular image
                  alt={project.title}
                  className=""
                />
              <div className="card-body">
                <h5 className="card-title">{project.title}</h5>
                <p className="card-text">{project.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Projects;