# 🏦 Bank Statement Digitizer

> Automatically extract, parse, and store transaction data from bank statement PDFs — with multi-bank support, password protection handling, and a unified transaction schema stored in Firebase Firestore.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Supported Banks](#supported-banks)
- [PDF Processing Pipeline](#pdf-processing-pipeline)
- [Transaction Schema](#transaction-schema)
- [Firestore Collections](#firestore-collections)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Project Status](#project-status)

---

## Overview

Bank Statement Digitizer is a **React + Firebase** web application that transforms bank statement PDFs into structured, searchable transaction data. Upload a statement, and the app automatically identifies the bank, parses transactions using bank-specific logic, normalizes the data into a common format, and stores it in Firebase Firestore — all in a single seamless flow.

---

## Features

### 📄 PDF Processing
- Upload bank statement PDFs via a clean UI
- Support for **password-protected PDFs**
- Text extraction powered by **PDF.js**
- Graceful error handling for corrupt or unsupported files

### 🏛️ Multi-Bank Support
| Bank | Date Format | Transaction Markers |
|------|-------------|---------------------|
| SBI  | `DD/MM/YYYY` | `Cr` / `Dr` |
| HDFC | `DD-MM-YYYY` | Column-based structure |
| ICICI | `DD/MM/YYYY` | Standard row parsing |

### ⚙️ Transaction Processing
- Automatic bank detection from statement content
- Bank-specific parsers for accurate extraction
- Normalization into a **unified transaction schema**
- Seamless storage to Firestore

### 📊 Dashboard
- View all parsed transactions in one place
- Search and filter transactions
- Real-time Firestore integration

### 🛡️ Error Handling
| Error Code | Description |
|------------|-------------|
| `WRONG_PASSWORD` | PDF requires a password or password is incorrect |
| `CORRUPT_PDF` | PDF file is damaged or unreadable |
| `UNSUPPORTED_BANK` | Statement format does not match any known bank |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, Tailwind CSS, React Router |
| Backend | Firebase Firestore, Firebase Functions |
| PDF Processing | `pdfjs-dist` |

---

## Project Structure

```
bank-statement-digitizer/
│
├── docs/
│   └── samples.md                  # Sample file documentation
│
├── samples/                        # Sample bank statements for testing
│   ├── sbi-sample.pdf
│   ├── hdfc-sample.pdf
│   ├── icici-sample.pdf
│   └── axis-sample.pdf
│
├── functions/                      # Firebase Cloud Functions
│   ├── index.js
│   ├── pdfService.js               # PDF unlock, extraction, row grouping
│   └── parsers/
│       ├── index.js                # Parser registry & bank detection
│       ├── sbi.js
│       ├── hdfc.js
│       └── icici.js
│
├── src/
│   ├── components/                 # Reusable UI components
│   ├── firebase/                   # Firebase config & initialization
│   ├── pages/                      # Route-level page components
│   └── services/                   # API & Firestore service layer
│
├── .env                            # Environment variables (not committed)
├── firebase.json
├── firestore.rules
├── package.json
└── README.md
```

---

## Supported Banks

### SBI (State Bank of India)
- Date format: `DD/MM/YYYY`
- Transaction markers: `Cr` (credit) and `Dr` (debit)

### HDFC Bank
- Date format: `DD-MM-YYYY`
- Column-based transaction structure

### ICICI Bank
- Date format: `DD/MM/YYYY`
- Standard transaction row parsing

---

## PDF Processing Pipeline

Each uploaded PDF goes through the following stages:

```
PDF Upload
    │
    ▼
unlockPdf()           ← Handle password-protected PDFs
    │
    ▼
getPdfItems()         ← Extract raw text items via PDF.js
    │
    ▼
groupItemsIntoRows()  ← Reconstruct logical rows from PDF layout
    │
    ▼
detectBank()          ← Identify bank from statement content
    │
    ▼
Bank Parser           ← Apply bank-specific parsing logic
    │
    ▼
normalizeTransactions() ← Convert to unified transaction schema
    │
    ▼
Firestore Storage     ← Persist to `transactions` collection
```

---

## Transaction Schema

All bank statements — regardless of source format — are normalized into the following structure:

```js
{
  date: "01/05/2026",          // DD/MM/YYYY format
  description: "Salary Credit", // Transaction narration
  amount: "50000",              // Transaction amount (as string)
  type: "credit",               // "credit" or "debit"
  balance: "60000"              // Running account balance
}
```

---

## Firestore Collections

| Collection | Description |
|------------|-------------|
| `transactions` | Normalized transaction records from parsed statements |
| `users` | User account information |
| `statements` | Metadata for uploaded statement files |

---

## Getting Started

### Prerequisites
- Node.js ≥ 16
- Firebase project (see [Environment Variables](#environment-variables))

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/bank-statement-digitizer.git
cd bank-statement-digitizer

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Environment Variables

Create a `.env` file in the project root with your Firebase project credentials:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

> ⚠️ The `.env` file is listed in `.gitignore` and is **never committed** to version control.

You can find these values in your [Firebase Console](https://console.firebase.google.com/) under **Project Settings → General → Your apps**.

---

## Testing

All major components have been tested end-to-end.

### PDF Module
- [x] PDF Upload
- [x] Password Handling
- [x] PDF Parsing

### Firestore
- [x] Save Transactions
- [x] Read Transactions

### Parsers
- [x] SBI Parser
- [x] HDFC Parser
- [x] ICICI Parser

### Validation / Error Handling
- [x] `WRONG_PASSWORD`
- [x] `CORRUPT_PDF`
- [x] `UNSUPPORTED_BANK`

### End-to-End Flow
- [x] Upload → Parse → Normalize → Store

---

## Project Status

**✅ Completed** — Built and tested as part of the Bank Statement Digitizer internship assignment.

---

## 📄 License

This project is for educational/internship purposes. See [LICENSE](LICENSE) for details.
