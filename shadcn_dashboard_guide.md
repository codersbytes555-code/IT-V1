# Shadcn/UI Dashboard — Step-by-Step Guide

> This guide explains **your exact project** — what exists, how the pieces plug together, and how to add any new page/component from scratch using shadcn/ui.

---

## 🗂️ How Your Project Is Structured Right Now

```
client/src/
├── index.css              ← Design tokens (colors, radius, fonts) — shadcn's CSS vars live here
├── App.tsx                ← Router — maps URLs to pages
├── lib/
│   └── utils.ts           ← cn() helper = merges Tailwind classes safely
├── components/
│   ├── ui/                ← shadcn components (Button, Card, Table, Input…)
│   └── layout/
│       ├── DashboardLayout.tsx   ← The outer shell (sidebar + top bar + content area)
│       └── AppSidebar.tsx        ← Navigation sidebar
├── pages/
│   └── Technologies.tsx   ← A full page that uses all the pieces above
├── hooks/
│   └── useTechnologies.ts ← Fetches data from backend (ignore for now)
└── services/
    └── techService.ts     ← API calls (ignore for now)
```

**Mental model:**

```
App.tsx (Router)
  └── DashboardLayout (sidebar shell)
        └── Your Page (Technologies, Leads, etc.)
              └── shadcn UI components (Card, Table, Button…)
```

---

## 🧩 What Is a Shadcn Component?

Shadcn is **not a library you import from npm** like Bootstrap.
Instead, you **copy the component source code** into your `src/components/ui/` folder.
That means you OWN the code — you can read and edit it.

Each component file (`button.tsx`, `card.tsx`, etc.) is just:
- A styled React component
- Using Tailwind CSS classes
- Using your CSS variables (`--primary`, `--border`, etc.) from `index.css`

---

## 📦 STEP 1 — Install a New Shadcn Component

**Example: Adding the `Tabs` component**

1. Go to → [https://ui.shadcn.com/docs/components/tabs](https://ui.shadcn.com/docs/components/tabs)
2. Click **"Manual" tab** (not the CLI tab)
3. You'll see two things to do:

### 1a. Install the npm dependency (if shown)
The Tabs component needs `@radix-ui/react-tabs`. Run:
```bash
npm install @radix-ui/react-tabs
```
> ⚠️ Not all components need extra npm packages. Button, Card, Badge don't. Check the page.

### 1b. Copy the component code
Create a new file: `src/components/ui/tabs.tsx`
Paste the entire code block from the shadcn website into it. Done.

---

## 🏗️ STEP 2 — Understand the Layout Shell

Your `DashboardLayout.tsx` is the **container every page lives inside**.
It already handles: sidebar, top navigation, content area.

When you create a new page, just wrap it:

```tsx
// src/pages/MyNewPage.tsx
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function MyNewPage() {
  return (
    <DashboardLayout>
      {/* Your page content goes here */}
      <h1>My New Page</h1>
    </DashboardLayout>
  );
}
```

---

## 🛣️ STEP 3 — Add a Route in App.tsx

To make your page reachable at a URL:

```tsx
// src/App.tsx
import MyNewPage from "./pages/MyNewPage";

// Inside <Routes>:
<Route path="/my-new-page" element={<MyNewPage />} />
```

---

## 🎨 STEP 4 — Build a Page Using Shadcn Components

Here is a **static dashboard page** example using components you ALREADY have:

```tsx
// src/pages/Dashboard.tsx
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, TrendingUp, Code } from "lucide-react";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">

        {/* ── Page Title ── */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview.</p>
        </div>

        {/* ── Stat Cards (4 in a row) ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Leads"    value="128"  icon={<Users />}      />
          <StatCard title="Active Projects" value="14"  icon={<Briefcase />}  />
          <StatCard title="Conversion Rate" value="34%" icon={<TrendingUp />} />
          <StatCard title="Technologies"   value="32"  icon={<Code />}        />
        </div>

        {/* ── Recent Leads Table ── */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="pb-2 text-left font-medium">Name</th>
                  <th className="pb-2 text-left font-medium">Status</th>
                  <th className="pb-2 text-left font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">Acme Corp</td>
                  <td className="py-3"><Badge>New</Badge></td>
                  <td className="py-3 text-muted-foreground">Apr 15, 2026</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Globex Inc</td>
                  <td className="py-3"><Badge variant="outline">In Progress</Badge></td>
                  <td className="py-3 text-muted-foreground">Apr 14, 2026</td>
                </tr>
                <tr>
                  <td className="py-3">Initech LLC</td>
                  <td className="py-3"><Badge variant="secondary">Won</Badge></td>
                  <td className="py-3 text-muted-foreground">Apr 13, 2026</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
}

// ── Reusable Stat Card sub-component ──
function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
```

---

## 🔗 STEP 5 — Add It to App.tsx and the Sidebar

### App.tsx
```tsx
import Dashboard from "./pages/Dashboard";
// inside <Routes>:
<Route path="/" element={<Dashboard />} />
```

### AppSidebar.tsx — Add a nav link
Find where the nav items are defined and add:
```tsx
{ title: "Dashboard", url: "/", icon: LayoutDashboard }
```

---

## 📋 Component Cheat-Sheet (already in your project)

| Component | File | What it does |
|-----------|------|-------------|
| `<Button>` | `ui/button.tsx` | Clickable button — variants: `default`, `outline`, `ghost`, `destructive` |
| `<Card>` + `<CardHeader>` + `<CardContent>` + `<CardTitle>` | `ui/card.tsx` | White box container with padding |
| `<Badge>` | `ui/badge.tsx` | Small colored pill — variants: `default`, `outline`, `secondary` |
| `<Input>` | `ui/input.tsx` | Text input field |
| `<Table>` + sub-parts | `ui/table.tsx` | Full table with styled rows/headers |
| `<Skeleton>` | `ui/skeleton.tsx` | Grey loading placeholder box |
| `<Dialog>` | `ui/dialog.tsx` | Popup modal |
| `<Select>` | `ui/select.tsx` | Dropdown selector |

---

## ✅ Build Order Summary

Follow this order every time you build a new page:

```
1. Create  src/pages/MyPage.tsx
2. Wrap in <DashboardLayout>
3. Add static content using Card, Table, Badge, Button etc.
4. Register the route in App.tsx
5. Add a sidebar link in AppSidebar.tsx
6. (Later) Replace hardcoded data with real data from hooks/services
```

---

## 🚀 What To Build Next (Suggested Order)

| Step | Page | Components to practice |
|------|------|------------------------|
| 1 | `/` Dashboard overview | Card, Badge, plain table |
| 2 | `/leads` Leads list | Table, Badge, Button, Input (search) |
| 3 | `/leads/new` Create lead form | Card, Input, Select, Button |
| 4 | `/clients` Client list | Table, Avatar, Badge |
| 5 | `/projects` Project list | Card grid, Badge |
