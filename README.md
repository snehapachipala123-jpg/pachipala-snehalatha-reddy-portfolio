# PACHIPALA SNEHALATHA REDDY — Portfolio

A cinematic dark editorial single-page developer and data analytics portfolio website.

**Live site:** https://YOUR-SITE-URL/

## Tech Stack
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS 4
- **Animation:** GSAP + ScrollTrigger
- **Contact Service:** EmailJS (`@emailjs/browser`)

## Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables
Create a `.env.local` file in the root directory and configure the following variables for the EmailJS contact form:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

*(If not configured, the contact form automatically falls back to opening your default email client with a pre-filled draft).*

---

Built during the placement training program at [TAP Academy](https://thetapacademy.com/) (full-stack development, AI and augmented reality training).
