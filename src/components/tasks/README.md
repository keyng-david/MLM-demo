# Task Management and KYC Verification Feature

This directory contains components for the task management and KYC verification features, which allow users to manage their tasks and complete identity verification.

## Components

- `TaskRoute.tsx`: Main route component for the tasks section
- `TaskList.tsx`: Dashboard showing task list and management options
- `TaskForm.tsx`: Form for creating and editing tasks
- `KycVerification.tsx`: Component for handling the KYC verification process

## Features

### Task Management
- View all tasks with filtering options
- Create, edit, and delete tasks
- Track task progress and status
- Identify tasks that require KYC verification

### KYC Verification
- Step-by-step verification process
- Personal information collection
- Document upload (ID, proof of address, selfie)
- Verification status tracking

## User Flow

1. User visits the tasks section
2. If not logged in, they are prompted to log in
3. Once logged in, they can view their tasks and KYC status
4. User can create new tasks or edit existing ones
5. User can complete KYC verification process
6. User can track the status of their verification
