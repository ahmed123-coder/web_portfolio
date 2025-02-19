import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebaradmin from "../components/sidebaradmin";
import "../styles/siteManage.css";

const API_URL = "http://localhost:3000/api/site";

const ManageSites = () => {
  const [sites, setSites] = useState([]);
  const [formData, setFormData] = useState({
    siteName: "",
    siteDescription: "",
    hero: "",
    footer: "",
    contactEmail: "",
    emailuser: "",
    passworduser: "",
    selected: "not selected",
    logo: null,
  });
  const [editingSite, setEditingSite] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null); // For logo preview

  // Get token from localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSites(response.data);
    } catch (error) {
      console.error("Error fetching sites:", error);
      toast.error("حدث خطأ أثناء جلب البيانات");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "logo") {
      const file = e.target.files[0];
      setFormData({ ...formData, logo: file });
      setLogoPreview(URL.createObjectURL(file)); // Set logo preview
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataObj = new FormData();
    formDataObj.append("siteName", formData.siteName);
    formDataObj.append("siteDescription", formData.siteDescription);
    formDataObj.append("hero", formData.hero);
    formDataObj.append("footer", formData.footer);
    formDataObj.append("contactEmail", formData.contactEmail);
    formDataObj.append("emailuser", formData.emailuser);
    formDataObj.append("passworduser", formData.passworduser);
    formDataObj.append("selected", formData.selected);
    if (formData.logo) formDataObj.append("logo", formData.logo);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (editingSite) {
        await axios.put(`${API_URL}/${editingSite._id}`, formDataObj, config);
        toast.success("تم تحديث الموقع بنجاح");
      } else {
        await axios.post(API_URL, formDataObj, config);
        toast.success("تمت إضافة الموقع بنجاح");
      }

      fetchSites();
      resetForm();
    } catch (error) {
      console.error("Error submitting site:", error);
      toast.error("حدث خطأ أثناء حفظ الموقع");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (site) => {
    setEditingSite(site);
    setFormData({
      siteName: site.siteName,
      siteDescription: site.siteDescription,
      hero: site.hero,
      footer: site.footer,
      contactEmail: site.contactEmail,
      emailuser: site.emailuser,
      passworduser: site.passworduser,
      selected: site.selected,
      logo: null,
    });
    setLogoPreview(site.logo ? `http://localhost:3000/${site.logo}` : null); // Set logo preview for editing
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد أنك تريد حذف هذا الموقع؟")) {
      setIsLoading(true);
      try {
        await axios.delete(`${API_URL}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("تم حذف الموقع بنجاح");
        fetchSites();
      } catch (error) {
        console.error("Error deleting site:", error);
        toast.error("حدث خطأ أثناء حذف الموقع");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSelectSite = async (id) => {
    setIsLoading(true);
    try {
      await axios.put(
        `${API_URL}/${id}/select`,
        null, // Empty body for PUT request
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("تم تحديد الموقع بنجاح");
      fetchSites();
    } catch (error) {
      console.error("Error selecting site:", error);
      toast.error("حدث خطأ أثناء تحديد الموقع");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeselectSite = async (id) => {
    setIsLoading(true);
    try {
      await axios.put(
        `${API_URL}/${id}/deselect`,
        null, // Empty body for PUT request
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("تم إلغاء تحديد الموقع بنجاح");
      fetchSites();
    } catch (error) {
      console.error("Error deselecting site:", error);
      toast.error("حدث خطأ أثناء إلغاء التحديد");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      siteName: "",
      siteDescription: "",
      hero: "",
      footer: "",
      contactEmail: "",
      emailuser: "",
      passworduser: "",
      selected: "not selected",
      logo: null,
    });
    setLogoPreview(null); // Reset logo preview
    setEditingSite(null);
  };

  return (
    <div className="admin-container">
      <Sidebaradmin />
      <div className="admin-content">
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4">
            {editingSite ? "تعديل الموقع" : "إضافة موقع جديد"}
          </h2>
          <form onSubmit={handleSubmit} className="service-form">
            <input
              type="text"
              name="siteName"
              placeholder="اسم الموقع"
              value={formData.siteName}
              onChange={handleChange}
              required
              className="block w-full p-2 border rounded mb-2"
            />
            <textarea
              name="siteDescription"
              placeholder="وصف الموقع"
              value={formData.siteDescription}
              onChange={handleChange}
              required
              className="block w-full p-2 border rounded mb-2"
              rows="4"
            />
            <textarea
              name="hero"
              placeholder="محتوى الهيرو"
              value={formData.hero}
              onChange={handleChange}
              required
              className="block w-full p-2 border rounded mb-2"
              rows="4"
            />
            <textarea
              name="footer"
              placeholder="محتوى الفوتر"
              value={formData.footer}
              onChange={handleChange}
              required
              className="block w-full p-2 border rounded mb-2"
              rows="4"
            />
            <input
              type="email"
              name="contactEmail"
              placeholder="البريد الإلكتروني"
              value={formData.contactEmail}
              onChange={handleChange}
              required
              className="block w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="emailuser"
              placeholder="Email User"
              value={formData.emailuser}
              onChange={handleChange}
              required
              className="block w-full p-2 border rounded mb-2"
            />
            <input
              type="password"
              name="passworduser"
              placeholder="Password User"
              value={formData.passworduser}
              onChange={handleChange}
              required
              className="block w-full p-2 border rounded mb-2"
            />
            <input
              type="file"
              name="logo"
              onChange={handleChange}
              className="block w-full p-2 border rounded mb-2"
              accept="image/*"
            />
            {logoPreview && (
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="w-32 h-32 object-cover mb-2 rounded"
              />
            )}
            <select
              name="selected"
              value={formData.selected}
              onChange={handleChange}
              className="block w-full p-2 border rounded mb-2"
            >
              <option value="not selected">غير محدد</option>
              <option value="selected">محدد</option>
            </select>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition-colors"
              disabled={isLoading}
            >
              {isLoading
                ? "جاري الحفظ..."
                : editingSite
                ? "تحديث الموقع"
                : "إضافة الموقع"}
            </button>
          </form>

          <h2 className="text-2xl font-bold my-4">إدارة المواقع</h2>
          {isLoading ? (
            <div className="text-center">جاري التحميل...</div>
          ) : (
            <div className="service-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sites.map((site) => (
                <div
                  key={site._id}
                  className="service-item bg-white shadow p-4 rounded-lg"
                >
                  <div className="service-info">
                    {site.logo && (
                      <img
                        src={`http://localhost:3000/${site.logo}`}
                        alt={site.siteName}
                        className="w-full h-32 object-cover mb-2 rounded"
                      />
                    )}
                    <h3 className="text-lg font-semibold">{site.siteName}</h3>
                    <p className="text-sm text-gray-600">{site.siteDescription}</p>
                    <p className="text-sm text-gray-500">📧 {site.contactEmail}</p>
                    <p className="text-sm text-gray-500">📜 الهيرو: {site.hero}</p>
                    <p className="text-sm text-gray-500">📜 الفوتر: {site.footer}</p>
                    <p
                      className={`text-sm font-bold mt-2 ${
                        site.selected === "selected"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {site.selected === "selected"
                        ? "🔹 الموقع المحدد"
                        : "🔸 غير محدد"}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(site)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(site._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                    >
                      حذف
                    </button>
                    {site.selected !== "selected" ? (
                      <button
                        onClick={() => handleSelectSite(site._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                      >
                        تحديد
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDeselectSite(site._id)}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors"
                      >
                        إلغاء التحديد
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageSites;