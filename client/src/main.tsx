import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add Google Fonts
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap";
document.head.appendChild(link);

// Add Font Awesome
const fontAwesome = document.createElement("link");
fontAwesome.rel = "stylesheet";
fontAwesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
document.head.appendChild(fontAwesome);

// Add page title
const title = document.createElement("title");
title.textContent = "ELEV8 - Premium Fashion Brand";
document.head.appendChild(title);

// Add meta description
const metaDescription = document.createElement("meta");
metaDescription.name = "description";
metaDescription.content = "Discover premium fashion at ELEV8. Shop our exclusive collection of women's and men's clothing, accessories, and more with worldwide shipping.";
document.head.appendChild(metaDescription);

createRoot(document.getElementById("root")!).render(<App />);
