# csv/xml file upload validator

A responsive web application built with React, TypeScript, and Vite that allows users to upload customer transaction records in CSV or XML format, validates them, and displays both successful and failed entries with reason.


## Features
- Upload CSV or XML files (max 5MB)

- side validation using Zod

- Displays successful and failed records in styled tables

- Responsive design for desktop and mobile

- Accessible form with clear error messages

- Backend integration with Express (TypeScript)


## Installation

Install my-project with npm

```bash
use node version above 20.19.0
git clone https://github.com/souvik18/frontend.git
cd my-project
npm install
```
After complete the project setup 

```bash
bash
npm run dev
```
Choose File & Upload File 

```bash
Accepted formats: .csv, .xml
Max size: 5MB
```


## Project Structure

```text
src/
├── components/        # FileUploadForm, RecordTable, ErrorMessage
├── types/             # Type definitions for records and responses
├── __tests__/         # Test cases
├── validation/        # Zod schema for file input
├── constant.ts        # Message constants
├── App.tsx            # Main logic
├── main.tsx           # Entry point

```
## Tech Stack

- React + Vite
- Custom Css
- TypeScript
