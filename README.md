# StudioSpace

* **Live Client URL:** [https://studio-space-client-mu.vercel.app/](https://studio-space-client-mu.vercel.app/)
* **Live Server API URL:** [https://studiospace-server-beta-rose.vercel.app/](https://studiospace-server-beta-rose.vercel.app/)

---

## 🌟 Project Overview
StudioSpace is a dynamic, multi-role hourly creative studio rental platform designed to connect creative professionals (photographers, podcasters, filmmakers, and artists) with studio hosts. It features secure authentication, real-time availability management, double-booking prevention, and an integrated owner dashboard for handling incoming reservation requests.

---

## 🚀 Key Features
* **Multi-Role User Experience:** Seamless switching between creator mode (browsing and booking spaces) and host mode (managing listings and incoming client requests).
* **Owner Dashboard:** A centralized hub where hosts can create, update, or delete studio listings and review incoming reservation requests with instant **Confirm** or **Reject** actions.
* **Advanced Booking & Conflict Prevention:** Integrated date pickers and hourly slot selection with automatic calculation of total rates, security deposits, guest capacity tracking, and server-side validation to prevent double bookings.
* **Robust Security & Protected Routes:** Client and host routes guarded by Better-Auth session validation, JWT verification (JWKS), and Google OAuth integration.
* **Responsive & Adaptive UI:** Custom-styled interface built with Tailwind CSS and mobile-first layouts, complete with interactive toast notifications and intuitive form validation.

---

## 🛠️ Tech Stack
* **Front-End:** Next.js (App Router), React, TypeScript, Tailwind CSS, Shadcn/ui, Lucide Icons, React Toastify.
* **Back-End & Database:** Node.js, Express.js, MongoDB, Mongoose / MongoDB Native Driver.
* **Authentication:** Better-Auth (with JWT/JWKS token verification & Google OAuth).
* **Deployment:** Vercel (Client & Server API).

---

## 🔑 Examiner Test Credentials
Use the credentials below to test both **Host/Owner** and **Guest/Creator** workflows (or sign in directly with **Google OAuth**):

* **Host / Studio Owner Account:**
  * **Email:** `samira@gmail.com` *(or replace with your active test host email)*
  * **Password:** `Abcdefghij` *(replace with your actual test password)*
* **Guest / Creator Account:**
  * **Email:** `user1@gmail.com` *(or replace with your active test guest email)*
  * **Password:** `Abcdefghij` *(replace with your actual test password)*

*(Note: Make sure to update the placeholder passwords above to match the exact accounts registered in your database before final submission.)*

---

## ⚙️ Local Setup Steps

Follow these steps to run the client-side application locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone <your-client-repository-url>
   cd studiospace