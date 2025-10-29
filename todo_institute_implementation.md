# Institute Demo Data Implementation Tasks

## Overview
Implement institute creation functionality with automatic demo data population when accessing http://localhost:3000/admin/settings/institute-name for new institutes.

## Tasks
- [ ] Create institute database schema in shared/schema.ts
- [ ] Add institute storage methods to server/storage.ts
- [ ] Create API routes for institute CRUD operations in server/routes.ts
- [ ] Update SettingsInstituteName component to load/save from database
- [ ] Add automatic demo data population logic
- [ ] Implement institute creation workflow
- [ ] Test institute settings page with demo data
- [ ] Add proper error handling and validation

## Implementation Details

### Database Schema
- institute_id (primary key)
- name, short_name
- address, phone, email, website
- established_year, registration_number
- principal information
- board affiliation and accreditation
- student/teacher/class counts
- created_at, updated_at

### Demo Data
- Name: "Example International School"
- Address: "123 Education Lane, Academic City, State 12345"
- Phone: "+1 (555) 123-4567"
- Email: "info@example-school.edu"
- Website: "https://www.example-school.edu"
- Established: "1995"
- Principal: "Dr. Sarah Johnson"
- Board: "State Board of Education"
- Stats: 1284 students, 85 teachers, 42 classes

### API Endpoints
- GET /api/institute/current - Get current institute data (create with demo if none exists)
- PUT /api/institute/current - Update institute data
- POST /api/institute/create - Create new institute with demo data

### Frontend Updates
- Load institute data on component mount
- Save changes to database
- Handle loading and error states
- Show demo data by default for new institutes
