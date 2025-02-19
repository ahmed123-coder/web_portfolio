import React, { useState, useEffect } from "react";

const ScrollButton = () => {
  const [isBottom, setIsBottom] = useState(false);

  // دالة التحقق من التمرير
  const handleScroll = () => {
    setIsBottom(
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 20
    );
  };

  // إضافة وإزالة مستمع التمرير
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // دالتا التمرير إلى الأسفل والأعلى
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={isBottom ? scrollToTop : scrollToBottom}
      style={styles.button}
    >
      {isBottom ? "⬆" : "⬇"}
    </button>
  );
};

// أنماط الزر باستخدام كود CSS-in-JS
const styles = {
  button: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "50px",
    height: "50px",
    background: "#333",
    color: "white",
    border: "none",
    borderRadius: "50%",
    fontSize: "24px",
    cursor: "pointer",
    transition: "background 0.3s, transform 0.3s",
  }
};

export default ScrollButton;