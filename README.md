# rv-roof-repair-estimator

RV Roof Repair Estimate Builder

Objective:
Develop an application that facilitates the configuration and management of roof repair jobs for RVs, including detailed job specifications and the generation of estimates. The application will integrate with a backend database hosted on Supabase, ensuring data integrity and efficient data handling.

Features:

Pre-Configured Jobs:

Job Configuration:

Allow administrators to pre-configure different roof repair jobs with specific parts, prices, labor hour rates, labor hours, sublet costs, shop supplies, taxes, and job totals.

Each job will be assigned a unique job code for easy identification and reference.

Database Schema:

Utilize the pre_configured_jobs table to store job details, including parts, labor rates, and calculated job prices.

Estimate Builder:

User Interface:

Provide a user-friendly interface with a dropdown menu to select pre-configured jobs.

Auto-populate estimate fields based on the selected job, including parts, labor hours, and total costs.

Customer and Unit Details:

Allow users to input customer details such as name, address, phone number, and email (optional).

Include fields for unit details like year, make, and model.

Customer Type and Deductible:

Offer a dropdown menu for selecting the customer type (Dealership, Warranty, Extended warranty, Insurance, Customer).

Provide a dropdown menu for deductible amounts ranging from 
0
𝑡
𝑜
0to2000 in $250 increments.

Database Integration:

Use the estimates table to store estimate details, linking each estimate to a specific job code and customer ID.

The estimates table includes fields for advisor, payment type, deductible, estimate date, roof kit, roof membrane, slf_lvl_dicor, non_lvl_dicor, roof screws, glue, additional parts, repair description, notes, hours, labor per hour, sublet, extras, labor, shop supplies, and tax.

Estimate Management:

Save and Print:

Provide an option to save the estimate to the local machine in a user-friendly format (e.g., PDF).

Include a print button to facilitate direct printing of the estimate.

User Interface:

Design Principles:

Ensure the user interface is intuitive and easy to navigate, with clear labels and organized layouts for all input fields and dropdown menus.

Use responsive design principles to ensure compatibility across various devices and screen sizes.

Technical Requirements:

Backend:

Utilize Supabase for backend services, including database management and API endpoints.

Implement the provided SQL schema for pre_configured_jobs, customers, and estimates tables.

Frontend:

Develop a web-based frontend using modern JavaScript frameworks (e.g., React, Vue.js).

Integrate with Supabase APIs to fetch and update data in real-time.

Security:

Ensure data security by implementing proper authentication and authorization mechanisms.

Validate user inputs to prevent SQL injection and other common web vulnerabilities.

Documentation and Support:

Provide comprehensive documentation detailing the setup, configuration, and usage of the application.

Offer support channels for users to seek assistance and report issues.

Testing and Deployment:

Conduct thorough testing to ensure the application's robustness and user-friendliness.

Deploy the application on a reliable hosting platform, ensuring high availability and performance.

I WILL SUPPLY THE SUPABASE URL AND ANON KEY.

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React with shadcn-ui and Tailwind CSS.

- Vite
- React
- shadcn-ui
- Tailwind CSS

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/rv-roof-repair-estimator.git
cd rv-roof-repair-estimator
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
