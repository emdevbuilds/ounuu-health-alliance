# 🏥 Obiumunna Na Umuada United Health Alliance - Official Website

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> Empowering Communities Through Healthcare - A digital platform for Nigeria's premier community health organization

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Admin Dashboard](#-admin-dashboard)
- [Deployment](#-deployment)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## 🌟 About

Obiumunna Na Umuada Health Alliance is the healthcare arm of [Obiumunna Na Umuada United](https://obiumunnanaumuadaunited.com/). We were created to address the urgent health needs of underserved communities, focusing on preventive care, emergency relief, and support for indigent groups.

### Mission

To serve humanity through health optimization, community support, and alleviating the ordeal of indigent groups.

### Vision

Transforming lives and communities through accessible healthcare and holistic services.

---

## ✨ Features

### Public Website

- 🏠 **Dynamic Homepage** - Showcasing our mission, impact statistics, and latest news
- 📰 **Blog System** - Latest health news, community stories, and medical insights
- 👥 **Team Profiles** - Meet our dedicated medical professionals and volunteers
- 💰 **Secure Donations** - Integrated Paystack payment gateway (NGN & USD)
- 🤝 **Volunteer Applications** - Easy sign-up for community volunteers
- 🏢 **Partnership Requests** - Collaboration opportunities for organizations
- 📞 **Contact System** - Multi-channel communication (email, WhatsApp, forms)
- 🔍 **SEO Optimized** - Google-indexed with structured data
- 📱 **Fully Responsive** - Perfect experience on all devices
- ♿ **Accessible** - WCAG 2.1 compliant

### Admin Dashboard

- 🔐 **Secure Authentication** - JWT-based session management
- 📊 **Analytics Dashboard** - Real-time statistics and insights
- 📝 **Content Management** - Blog posts, team members, and updates
- 💬 **Contact Management** - Track and respond to inquiries
- 👤 **User Management** - Multi-admin system with role-based access
- 🎫 **ID Card Generator** - QR-enabled verification for team members
- 💵 **Donation Tracking** - Monitor contributions and generate reports
- 🤝 **Partnership Pipeline** - Manage collaboration requests
- 👥 **Volunteer Database** - Review and approve applications

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js 16.0 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Forms:** React Hook Form
- **Notifications:** React Toastify

### Backend

- **Runtime:** Node.js
- **Database:** MongoDB Atlas
- **ORM:** Mongoose
- **Authentication:** Jose (JWT)
- **File Storage:** Base64 (images)
- **Payments:** Paystack API

### DevOps

- **Hosting:** Vercel
- **Version Control:** Git & GitHub
- **CI/CD:** Vercel Auto-Deploy
- **Monitoring:** Vercel Analytics
- **Email:** SMTP / SendGrid

---

## 🚀 Getting Started

### Prerequisites

```bash
- Node.js 18.x or higher
- npm or yarn package manager
- MongoDB Atlas account (or local MongoDB)
- Git
```

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/emdevbuilds/ounuu-health-alliance.git
cd obiumunna-health-alliance
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ounuu

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long

# Paystack (Donations)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx

# Admin Credentials (for initial setup)
ADMIN_EMAIL=admin@ounuu.org
ADMIN_PASSWORD=YourSecurePassword123!
ADMIN_NAME=Admin Full Name
```

4. **Create initial super admin**

```bash
node create-admin.js
```

5. **Run development server**

```bash
npm run dev
# or
yarn dev
```

6. **Open in browser**

```
http://localhost:3000
```

---

## 📁 Project Structure

```
obiumunna-health-alliance/
├── public/                     # Static assets (images, logos, robots.txt)
├── src/
    ├── app/                    # Next.js App Router (Routing & Pages)
        ├── (website)/          # Public-facing routes
        ├── admin/              # Administrative dashboard logic
        ├── api/                # Backend API routes and endpoints
        ├── verify-id/          # Team member ID verification system
        ├── layout.tsx          # Root layout and font configurations
        ├── global.css          # Global Tailwind and CSS styles
        └── [error/loading/...] # Next.js UI handlers (Error, Loading, 404)
    ├── assets/                 # Global media and static assets
    ├── components/             # Reusable UI components
    ├── lib/                    # Shared utilities and configurations
    ├── models/                 # Data schemas and database models
├── types/                      # TypeScript interfaces and type definitions
├── .env.local                  # Environment variables (Local)
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies and scripts

```

---

## 👨‍💼 Admin Dashboard

### Access

- URL: `/admin/login`
- Default credentials set during initial setup

### Features

#### Dashboard Overview

- Total statistics (contacts, volunteers, partnerships, donations)
- Recent activity feed
- Quick action buttons

#### Blog Management

- Create, edit, and delete blog posts
- Rich text editor with formatting
- Image upload support
- Category and tag management
- Draft/Published/Archived status
- SEO metadata

#### Contact Management

- View all contact inquiries
- Mark as read/unread
- Respond directly
- Export to CSV

#### Volunteer Applications

- Review applications
- Approve or reject candidates
- Contact information
- Skills and availability tracking

#### Partnership Requests

- Organization details
- Proposal review
- Status tracking (pending/approved/rejected)

#### Donation Tracking

- View all donations
- Payment status monitoring
- Amount and currency tracking
- Donor information (if not anonymous)
- Transaction reference

#### Team Management

- Team member profiles (read from `lib/members.ts`)
- ID card generation with QR codes
- Verification system

#### User Management

- Create additional admin accounts
- Role assignment (super_admin, admin)
- Activate/deactivate users
- Password reset

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**

- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Vercel will auto-detect Next.js

3. **Add Environment Variables**
   In Vercel dashboard → Settings → Environment Variables:

```
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxxxx
```

4. **Deploy**

- Click "Deploy"
- Wait for build to complete
- Visit your live site!

### Custom Domain

1. Vercel Dashboard → Settings → Domains
2. Add your custom domain (e.g., `www.ounuu.org`)
3. Update DNS records as instructed
4. SSL certificate auto-configured

---

## 🔐 Environment Variables

### Required Variables

| Variable                          | Description                              | Example                                          |
| --------------------------------- | ---------------------------------------- | ------------------------------------------------ |
| `MONGODB_URI`                     | MongoDB connection string                | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET`                      | Secret key for JWT tokens (min 32 chars) | `your-super-secret-key-here`                     |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Paystack public key for donations        | `pk_test_xxxxx` or `pk_live_xxxxx`               |

### Optional Variables (Initial Setup)

| Variable         | Description                  | Default |
| ---------------- | ---------------------------- | ------- |
| `ADMIN_EMAIL`    | Initial super admin email    | -       |
| `ADMIN_PASSWORD` | Initial super admin password | -       |
| `ADMIN_NAME`     | Initial super admin name     | -       |

### Development vs Production

**Development (.env.local):**

```env
MONGODB_URI=mongodb://localhost:27017/ounuu-dev
JWT_SECRET=dev-secret-key-change-in-production
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxx
```

**Production (Vercel):**

```env
MONGODB_URI=mongodb+srv://...atlas.mongodb.net/ounuu-prod
JWT_SECRET=super-secure-production-key-min-32-chars
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxxxx
```

---

## 📡 API Documentation

### Public APIs

#### Contact Form

```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Hello..."
}
```

#### Volunteer Application

```http
POST /api/volunteer
Content-Type: application/json

{
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+234XXXXXXXXXX",
  "skills": "Medical, Teaching",
  "availability": "Weekends"
}
```

#### Partnership Request

```http
POST /api/partnership
Content-Type: application/json

{
  "organizationName": "Health Corp",
  "contactPerson": "CEO Name",
  "email": "ceo@healthcorp.com",
  "proposalDetails": "We would like to..."
}
```

#### Blog Posts (Public)

```http
GET /api/blog?status=published&limit=10
```

### Admin APIs (Require Authentication)

All admin APIs require a valid JWT session cookie.

#### Get Admin Profile

```http
GET /api/admin/me
Cookie: session=<jwt-token>
```

#### Blog Management

```http
GET    /api/admin/blog           # List all posts
POST   /api/admin/blog           # Create post
PATCH  /api/admin/blog           # Update post
DELETE /api/admin/blog?id=xxx    # Delete post
```

#### Contact Management

```http
GET    /api/admin/contacts       # List contacts
PATCH  /api/admin/contacts       # Mark as read
DELETE /api/admin/contacts?id=xxx # Delete contact
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Bug Reports

1. Check if the bug has already been reported
2. Open a new issue with detailed description
3. Include steps to reproduce
4. Add screenshots if applicable

### Feature Requests

1. Open an issue describing the feature
2. Explain the use case and benefits
3. Discuss implementation approach

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write clear commit messages
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Third-Party Licenses

- Next.js - MIT License
- React - MIT License
- Tailwind CSS - MIT License
- MongoDB - SSPL
- Paystack - Commercial License

---

## 🙏 Acknowledgments

### Development Team

- **Lead Developer:** [Emmanuel I. Chukwu](https://github.com/emdevbuilds/) - Full-stack development, architecture, deployment
- **Design Consultant:** UI/UX design and branding
- **Medical Advisors:** Dr. Benjamin Nwaforcha Nwakelu and Obiumunna Na Umuada United Health Alliance medical team

### Technologies

Built with incredible open-source tools:

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Vercel](https://vercel.com/) - Deployment platform
- [shadcn/ui](https://ui.shadcn.com/) - UI components

### Special Thanks

- Community volunteers who provided feedback
- Beta testers who helped refine the platform
- Open-source contributors worldwide

---

## 📞 Support

### For Technical Issues

- **GitHub Issues:** [Report a bug](https://github.com/emdevbuilds/ounuu-health-alliance/issues)
- **Developer Email:** emmanuel.devpro@gmail.com

### For Organization Inquiries

- **Website:** [www.obiumunnanaumuadahealthalliance.com](https://www.obiumunnanaumuadahealthalliance.com/)
- **Email:** info@obiumunnanaumuadahealthalliance.com
- **Phone:** +234 806 328 9585
- **Address:** Plot 19/20 Mile 50 Layout between NEPA Junction & Ebonyi Voice Junction, Opposite MTN Branch office Abakaliki, Ebonyi State, Nigeria

### Community

- **Newsletter:** Subscribe on our website
- **Social Media:** Follow us for updates
- **Blog:** Latest news and health tips

---

## 🗺️ Roadmap

### Completed ✅

- [x] Public website with full content
- [x] Admin dashboard with authentication
- [x] Blog system with CMS
- [x] Donation integration (Paystack)
- [x] Volunteer application system
- [x] Partnership request system
- [x] Contact form with email notifications
- [x] Team management with ID verification
- [x] SEO optimization
- [x] Mobile responsiveness
- [x] Custom error pages

### In Progress 🚧

- [ ] Email newsletter system
- [ ] SMS notifications for appointments
- [ ] Multi-language support (English, Igbo, Hausa, Yoruba)
- [ ] Advanced analytics dashboard
- [ ] Volunteer training portal

### Planned 📋

- [ ] Mobile app (React Native)
- [ ] Telemedicine consultation booking
- [ ] Medical records management (HIPAA compliant)
- [ ] Donation campaigns and fundraising goals
- [ ] Community health tracker
- [ ] Pharmacy integration
- [ ] Appointment scheduling system
- [ ] Patient portal

---

## 📊 Project Statistics

- **Lines of Code:** ~15,000+
- **Components:** 50+
- **API Routes:** 20+
- **Database Models:** 8
- **Pages:** 25+
- **Development Time:** 3 months
- **Contributors:** 1 (open for more!)

---

## 🔒 Security

### Reporting Security Issues

If you discover a security vulnerability, please email info@obiumunnanaumuadahealthalliance.com instead of using the issue tracker.

### Security Measures

- JWT-based authentication with httpOnly cookies
- Password hashing with bcrypt (12 rounds)
- SQL injection prevention (MongoDB, Mongoose ORM)
- XSS protection (Next.js built-in)
- CSRF protection (SameSite cookies)
- Rate limiting on API endpoints
- Environment variable protection
- Secure headers (Next.js security headers)

---

## 📖 Additional Documentation

- [API Documentation](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Admin User Guide](docs/ADMIN_GUIDE.md)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Changelog](CHANGELOG.md)

---

## 💚 Mission Statement

At Obiumunna Na Umuada United Health Alliance, we believe healthcare is a fundamental human right. This platform serves as our digital gateway to:

- **Connect** communities with healthcare resources
- **Empower** volunteers to make a difference
- **Enable** transparent donations and accountability
- **Educate** through accessible health information
- **Expand** our reach to underserved areas

Every line of code in this repository represents our commitment to bridging healthcare gaps in Nigeria.

---

## 🌍 Impact

### By the Numbers (2024-2025)

- **15,000+** people served through medical outreaches
- **500+** volunteers mobilized
- **50+** community health camps organized
- **₦5M+** in medical supplies distributed
- **10+** partner organizations

### Our Reach

- **South East Nigeria** - Primary operations
- **Ebonyi State** - Headquarters
- **Rural Communities** - Mobile clinics
- **Schools** - Health education programs
- **Churches** - Community partnerships

---

<div align="center">

### 💚 Built with Love By [Emmanuel I. Chukwu](https://github.com/emdevbuilds/)

**Obiumunna Na Umuada United Health Alliance**  
_Empowering Communities Through Healthcare_

[Website](https://www.obiumunnanaumuadahealthalliance.com/) • [GitHub](https://github.com/emdevbuilds/ounuu-health-alliance) • [Contact](mailto:info@obiumunnanaumuadahealthalliance.com)

---

**© 2026 Obiumunna Na Umuada United Health Alliance. All Rights Reserved.**

_Made with ❤️ in Nigeria 🇳🇬_

</div>
