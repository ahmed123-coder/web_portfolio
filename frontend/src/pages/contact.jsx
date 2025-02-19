import { useState } from "react";
import axios from "axios";
import "../styles/contact.css";

const Contact = ({ contactEmail, user, pass }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    to: contactEmail,
    user: user,
    pass: pass,
  });
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    setIsLoading(true);

    try {
      const { data } = await axios.post("http://localhost:3000/api/contact", formData);
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "", to: contactEmail, user: user, pass: pass }); // Reset form
    } catch (error) {
      setStatus(error.response?.data?.message || "Error sending message.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact">
      <div className="contact">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="contact-form">
            <div className="form-group">
              <label>Your Name or Company:</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Your Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Your Message:</label>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
        {status && (
          <p className={status.includes("successfully") ? "success" : "error"}>
            {status}
          </p>
        )}
      </div>
    </section>
  );
};

export default Contact;