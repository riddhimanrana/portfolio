---
title: "Building Let's Assist: A 2 Year Journey from Idea to Production"
date: "2025-05-10"
excerpt: "How a beach cleanup idea turned into a full-stack platform for student volunteers and organizations."
tags: ["Next.js", "Supabase", "Volunteering", "Personal Project", "Hackathon"]
---

## Introduction

Back in October 2023, I took a trip to Santa Cruz Beach during a long weekend. What should have been a relaxing day turned into something else entirely — the beach was covered in trash. It was frustrating to see such a beautiful place neglected, and I remember thinking: *Why isn’t there an easier way for people to organize cleanups or get involved when they see a problem like this?*

![Santa Cruz Beach Cleanup](/blogs/building-lets-assist/santa-cruz-beach-trash.jpg)

That moment planted the seed for what would become **Let's Assist** — an end-to-end volunteering platform designed to help students and organizations coordinate, track, and verify community service in a more streamlined way. You can check it out here: [lets-assist.com](https://lets-assist.com)

## The Spark: CJSF and the Student Volunteering Gap

Later that year, I joined CJSF (California Junior Scholarship Federation) at my school. As I started logging hours, I realized how outdated and fragmented the process was. Students had to manually find opportunities, track hours on paper, and get signatures for verification. CJSF emphasizes high standards of scholarship and community service for California junior high school students

I thought: *What if there was a platform that connected students with local organizations, automatically tracked their hours, and made the whole process seamless?*

## The First Attempt: HarvestHacks 2023

I built an early version of Let's Assist for a hackathon called [HarvestHacks](https://ycwhacks.devpost.com/) in collaboration with my friend [Keshav Verma](https://github.com/vkeshav300) in November 2023. It was a rough prototype — just a basic login system and a way to create events. I didn’t win anything, but the experience was valuable. It gave me a starting point and a lot of ideas for what the platform could become. You can see the original submission [here](https://devpost.com/software/let-s-assist)

![HarvestHacks 2023 Submission](/blogs/building-lets-assist/lets-assist-old.png)

## Picking It Back Up: December 2024

After a year-long break and not really doing anything, I revisited the project in December 2024. I was way more experienced and had a clearer vision. I decided to rebuild it from scratch using:

* **Next.js** and **TypeScript** for the frontend
* **Supabase** for the backend and authentication
* **Tailwind CSS** and **shadcn/ui** for styling
* **Vercel** for deployment
* **Cloudflare** for DNS and security
* **Resend** for transactional emails

## Month-by-Month Breakdown

### December 2024: Laying the Foundation

I started with the basics — setting up the landing page, authentication, and user onboarding. Getting Supabase integrated with Next.js was straightforward, and I used Tailwind CSS to quickly build out the UI.

![small|Landing Page Screenshot](/blogs/building-lets-assist/lets-assist-new.png)

### January 2025: User Profiles and Backend Logic

This month was all about creating user profiles and setting up the database schema. I implemented role-based access control so that students and organizations would have different permissions. Supabase made it easy to manage this with row-level security policies.

![small|User Profile UI](/blogs/building-lets-assist/account-page.png)

### February 2025: Event Creation and File Uploads

I focused on allowing organizations to create volunteer events. I also added functionality for uploading files, like event flyers or permission slips. This required setting up storage buckets in Supabase and handling file uploads on the frontend.

![small|Event Creation Form](/blogs/building-lets-assist/event-page.png)

### March 2025: Organization Dashboards and Notifications

I built out dashboards for organizations to manage their events and volunteers. I also implemented a notification system to alert students about new opportunities and remind them of upcoming events. This involved setting up cron jobs and using Resend for email notifications.

![small|Dashboard Mockup](/blogs/building-lets-assist/organization-page.png)

### April 2025: QR Code Verification, Certificates, and Hour Tracking

One of the most challenging features was implementing QR code scanning for hour verification. I wanted students to be able to check in and out of events using their phones. I used a combination of Next.js API routes and a QR code library to generate and scan codes securely.

![small|QR Code Scanning UI](/blogs/building-lets-assist/certificate-page.png)

### May 2025: Final Touches and Marketing

I spent this month polishing the UI, fixing bugs, and demoing to friends and family. Currently, I'm working on marketing the platform to local schools and organizations, and gathering feedback for future improvements.

## Challenges and Lessons Learned

* **Balancing Features and Simplicity**: It was tempting to add more features, but I had to focus on the core functionality to keep the app user-friendly.

* **Learning New Tools**: Integrating various technologies like Supabase and Resend required a lot of reading and experimentation.

* **Time Management**: Working on this project during weekends and school breaks taught me the importance of planning and setting realistic goals.

## What's Next: Marketing and Expansion

Now that the platform is live, my next focus is on marketing and getting users. I'm planning to:

* Reach out to local schools and CJSF chapters to introduce them to Let's Assist.

* Partner with community organizations to list their events on the platform.

* Use social media to share success stories and encourage student participation.

I'm also considering adding features like gamification elements to motivate students and analytics dashboards for organizations to track volunteer impact.

## Conclusion

Building Let's Assist has been a rewarding journey. It started with a simple idea sparked by a messy beach and evolved into a full-fledged platform aimed at making community service more accessible and efficient for students and organizations alike.

If you're interested in the codebase, you can check it out on GitHub: [riddhimanrana/lets-assist](https://github.com/riddhimanrana/lets-assist)
