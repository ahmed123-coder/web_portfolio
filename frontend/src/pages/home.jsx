import React, { useState, useEffect } from "react";
import axios from "axios";
import Preloader from "../components/Preloader";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import About from "./about";
import Services from "./services";
import Projects from "./projects";
import Contact from "./contact";
import Footer from "../components/footer";

const API_URL = "http://localhost:3000/api/site/selected"; // تأكد من تحديث رابط الـ API

function Home() {
  const [siteData, setSiteData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchSiteData();
  }, []);

  const fetchSiteData = async () => {
    try {
      const response = await axios.get(API_URL);
      setSiteData(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching site data:", err);
      setError("حدث خطأ أثناء جلب البيانات. يرجى المحاولة مرة أخرى لاحقًا.");
    } finally {
      setTimeout(() => setIsLoading(false), 2000); // إضافة تأخير لتحسين تجربة المستخدم
    }
  };

  return isLoading ? (
    <Preloader imageUrl={siteData?.logo} />
  ) : error ? (
    <div className="text-center mt-5 text-danger">{error}</div>
  ) : (
    <div>
<Navbar title={siteData.siteName} />
<Hero heroContent={siteData.hero} img={siteData.logo} />
<About />
<div className='projectsandservices'>
<Services />
<Projects />
</div>
<Contact contactEmail={siteData.contactEmail} user={siteData.emailuser} pass={siteData.passworduser} />
<Footer footerContent={siteData.footer} />
</div>
  );
}

export default Home;
