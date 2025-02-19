import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/custom.css";

const API_URL = "http://localhost:3000/api/service"; // Update with your backend API URL

function Services() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(API_URL);
      setServices(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching services:", err);
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
    <div className="services">
    <div className="container mt-5">
      <h2 className="text-center">Service</h2>
      <div className="row">
        {services.map((service) => (
          <div key={service._id} className="col-md-4 mb-4">
            <div className="card h-100 text-center">
              {/* Circular Icon */}
              <div className="icon-container">
                <img
                  src={`http://localhost:3000/${service.image}`} // Use the icon field for the circular image
                  alt={service.title}
                  className="service-icon"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Services;