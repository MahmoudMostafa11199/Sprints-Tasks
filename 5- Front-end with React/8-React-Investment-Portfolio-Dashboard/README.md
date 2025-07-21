# React Investment Portfolio Dashboard

React Investment Portfolio Dashboard is a responsive and interactive dashboard built with React.js, TypeScript, and Tailwind CSS.
It allows users to manage a simulated investment portfolio with full CRUD operations, live profit/loss calculations, and visual charts to track performance over time.

Whether it's stocks, crypto, or bonds – users can add, edit, and delete assets while monitoring key financial metrics and simulating future scenarios.

---

## 📦 Setup Instructions

Follow these steps to run the **React Investment Portfolio Dashboard** locally on your machine.

### 1. Clone the Repository

```bash
git clone https://github.com/MahmoudMostafa11199/Sprints-Tasks.git
cd Sprints-Tasks/React-Investment-Portfolio-Dashboard
```

### 2. Install Dependencies

Using [Yarn](https://classic.yarnpkg.com/en/docs/install):

```bash
yarn install
```

> 💡 If you don’t have Yarn installed globally, install it with:
>
> ```bash
> npm install --global yarn
> ```

### 3. Start the Mock Backend (json-server)

The project uses `json-server` to simulate a backend API.

To install it globally (if not already):

```bash
yarn global add json-server
```

Then run the server:

```bash
yarn server
```

This will start the mock API at:
`http://localhost:2210/assets`

### 4. Start the Frontend React App

In a separate terminal:

```bash
yarn dev
```

The app will be running at:
`http://localhost:5173`

---

### 🔧 Available Scripts

- `yarn dev` — Runs the app in development mode.
- `yarn server` — Starts the mock backend using `json-server`.
- `yarn build` — Builds the app for production.
- `yarn preview` — Previews the production build locally.

---

## 💡 Feature Overview

- **Investment Overview**:

  - View a summarized dashboard of your total assets, including gains and losses.

- **Interactive Charts**:

  - Visualize your portfolio distribution with a dynamic pie chart using Recharts.

- **Mock API Integration**:

  - Assets and portfolio data are fetched from a local JSON server, simulating a real API environment.

- **Error Handling**:

  - Displays fallback UI if data fetching fails.

- **Loading States**:
  - Shimmer/spinner UI shown while data is being fetched.

---

## 🧪 Testing Instructions

To test the main features and ensure everything works as expected, follow the steps below:

### 1. Add a New Asset

- Click the **“Add Asset”** button.
- Fill in all the required fields (name, symbol, type, image, quantity, buy price).
- Click **“Submit”**.
- You should see the asset appear in the table and in the portfolio pie chart.

### 2. Edit an Existing Asset

- Click the **Edit icon** next to any asset in the list.
- Update any of the values and submit.
- Confirm that the asset updates immediately and the profit/loss calculations are updated.

### 3. Delete an Asset

- Click the **Trash icon** next to an asset.
- Confirm the deletion.
- Ensure the asset is removed from the list and the chart updates accordingly.

### 4. Loading States

- Refresh the page and observe that a **spinner** is shown while data is being loaded.

### 5. Error Handling

- To simulate an error:
  - Stop the `json-server` and reload the app.
  - A fallback error message should appear instead of a crash.

> ✅ All interactions are powered by React Hook Form and validated on the client side.

---

```
 src
├── assets
│ └── db.json
├── components
│ ├── Assets
│ │ ├── Asset.tsx
│ │ ├── Assets.tsx
│ │ └── types.ts
│ ├── Dashboard
│ │ ├── AssetAllocationChart.tsx
│ │ ├── DashboardLayout.tsx
│ │ ├── PortfolioValueChart.tsx
│ │ └── ProfitLossChart.tsx
│ ├── AssetControls.tsx
│ ├── Error.tsx
│ ├── Filter.tsx
│ ├── Form.tsx
│ ├── FormRow.tsx
│ ├── NavigationTap.tsx
│ ├── Spinner.tsx
│ ├── SpinnerFullPage.tsx
│ └── SummaryCard.tsx
├── hooks
│ ├── useAssetsData.ts
│ └── usePortfolioSummary.ts
├── pages
│ ├── AddAsset.tsx
│ ├── Dashboard.tsx
│ ├── EditAsset.tsx
│ └── PageNotFound.tsx
├── services
│ ├── apiAssets.ts
│ └── helpers.ts
├── App.css
├── App.tsx
└── main.tsx
```

---

## 🛠️ Technologies Used

**Frontend:** React, TypeScript, Tailwind CSS  
**Routing:** React Router DOM  
**State Management & Data Fetching:** Axios  
**Forms Handling:** React Hook Form  
**Charts & Visualization:** Recharts  
**Date Manipulation:** Date-fns  
**Notifications:** React Hot Toast  
**Development Server (Mock API):** JSON Server  
**Build Tool:** Vite  
**Type Checking:** TypeScript  
**Code Linting:** ESLint

---

## 📝 Notes

There's an unexpected issue where the page refreshes when performing add, edit, or delete actions — even though I'm using react-hook-form, which should already prevent the default form behavior.

I'm currently unsure what's causing this. If you happen to know the reason or have encountered a similar issue before, feel free to reach out to me at **my225298@gmail.com** — I'd really appreciate the help!
