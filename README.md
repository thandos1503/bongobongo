# QA Assignment - Test Automation & Reporting

This repository contains my submission for the QA assignment. It includes API test scripts, Postman collections, Playwright+Cucumber automation, mobile-responsive testing, Android emulator app testing, performance testing, and defect reports.  

---

##  Repository Structure
├── README.md 
├── Bongobongo Collection.postman_collection
├── pw-api-tests
├── Demo video
├── defects/ 
│ ├── android_defect_001
│ └── android_defect_002
└── PlaceBet_TestStrategy.docx

markdown
Copy
Edit

---

##  Postman Collection
1. Open **Postman**  
2. Go to **File → Import**  
3. Select `Bongobongo Collection.postman_collection.json`  
4. Run the collection via **Runner** or **Newman**  
   ```bash
   newman run postman_collection.json
## Includes assertions for login, account fetch, and edge cases.

## Mobile-Responsive Testing
Open Chrome browser

Navigate to the target website (e.g., sportingbet.co.za)

Press F12 → Toggle Device Toolbar (📱 icon)

Select device profiles (e.g., iPhone X, Pixel 2)

Test navigation, scrolling, responsiveness

Identified and documented two defects in bug-reports/Bug_Report.xlsx.

##  Android Emulator Setup & APK Testing
Install Android Studio

Open AVD Manager → Create device profile (Pixel 4, Galaxy S20)

Download APK (e.g., AntennaPod from F-Droid)

Drag & drop APK onto emulator to install

Test navigation, input, orientation, responsiveness

Issues documented in android-testing/test-notes.md.

##  Playwright + Cucumber Tests
Install dependencies

bash
Copy
Edit
npm install
Run tests

bash
Copy
Edit
npx cucumber-js
##  Includes:

Login → Update Profile → Logout (happy path)

Login with invalid/expired token

Update Profile with missing fields

Fetch User List with invalid pagination

##  Performance Testing
K6

bash
Copy
Edit
k6 run performance/k6-happy-path.js
JMeter

Open performance/jmeter-test.jmx in JMeter GUI

Run test to simulate multiple users on login/profile endpoints

## Defect Reports
All documented issues are in bug-reports/ folder (.xlsx format).

Each report includes: Steps to Reproduce, Expected, Actual, Severity, Evidence.

## Prerequisites
Chrome (latest) for UI & responsive testing

Postman v10+ (or Newman CLI)

Node.js (v18+) & npm for Playwright+Cucumber

Android Studio (latest) for emulator setup

K6 or JMeter for performance testing

Excel or Google Sheets for viewing defect reports
