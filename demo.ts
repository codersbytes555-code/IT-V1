socket 
Files touched
File	Change
client/src/shared/apiConfig.ts
New – shared URL helpers
client/src/libs/socket.ts
Server URL, reconnectSocket
client/src/shared/axios.ts
getApiBaseUrl(), reconnect on refresh
client/src/features/auth/useAuth.ts
Early connect, reconnect on login
client/src/features/notification/useNotification.ts
Listen on connect
client/src/App.tsx
Simpler init
client/.env.example
New
server/src/server.ts
Use env.PORT
server/.env.example
Added ORIGIN
server/.../task/controller.ts
Removed dead import

Env setup (copy this)
Server .env:

PORT=5000
ORIGIN=http://localhost:5173
Client .env:

VITE_API_URL=http://localhost:5000

This means your frontend and backend configuration is inconsistent, causing:

✅ REST APIs to work
❌ Socket.IO real-time connection to fail

especially notifications/live updates.

---

# Problem 1 — Different Ports

You mentioned:

```text id="’wini237"
3000 vs 9000
```

Example:

| Service  | Port |
| -------- | ---- |
| Frontend | 3000 |
| Backend  | 9000 |

That itself is OK.

Problem happens when env values mismatch.

---

# Problem 2 — Shared `VITE_API_URL`

You are using SAME env variable for BOTH:

```text id="’wini238"
Axios REST requests
Socket.IO connection
```

But they need DIFFERENT URLs.

---

# Why REST Works But Socket Fails

Suppose:

```env id="’wini239"
VITE_API_URL=http://localhost:5000/api/v1
```

---

# Axios

This works:

```ts id="’wini240"
axios.create({
  baseURL: import.meta.env.VITE_API_URL
})
```

Requests become:

```text id="’wini241"
http://localhost:5000/api/v1/tasks
```

Correct.

---

# Socket.IO

But socket uses:

```ts id="’wini242"
io(import.meta.env.VITE_API_URL)
```

Then it tries connecting to:

```text id="’wini243"
http://localhost:5000/api/v1/socket.io
```

WRONG.

Socket.IO should connect to:

```text id="’wini244"
http://localhost:5000
```

NOT `/api/v1`.

---

# Correct Architecture

Use TWO env variables.

---

# Frontend `.env`

```env id="’wini245"
VITE_API_URL=http://localhost:5000/api/v1
VITE_SOCKET_URL=http://localhost:5000
```

---

# Axios Setup

```ts id="’wini246"
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});
```

---

# Socket Setup

```ts id="’wini247"
const socket = io(
  import.meta.env.VITE_SOCKET_URL
);
```

---

# Problem 3 — Missing ORIGIN

Backend likely uses:

```ts id="’wini248"
cors({
  origin: process.env.ORIGIN,
  credentials: true
})
```

and:

```ts id="’wini249"
new Server(server, {
  cors: {
    origin: process.env.ORIGIN
  }
})
```

But if `.env` missing:

```env id="’wini250"
ORIGIN=http://localhost:3000
```

then browser blocks socket handshake.

---

# What Happens

REST may still work because:

* simple requests sometimes pass
* different CORS handling

BUT Socket.IO handshake fails.

Result:

```text id="’wini251"
notifications not working
online users not updating
real-time features fail silently
```

---

# Correct Backend `.env`

```env id="’wini252"
PORT=5000

ORIGIN=http://localhost:3000
```

---

# Backend Socket Config

Example:

```ts id="’wini253"
const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN,
    credentials: true
  }
});
```

---

# Symptoms You Probably See

| Feature       | Status |
| ------------- | ------ |
| Login         | ✅      |
| CRUD APIs     | ✅      |
| Notifications | ❌      |
| Live updates  | ❌      |
| Socket events | ❌      |

---

# How To Verify Socket Failure

Open browser:

```text id="’wini254"
F12 → Network → WS
```

You may see:

* failed websocket
* pending handshake
* CORS error

OR console:

```text id="’wini255"
xhr poll error
websocket connection failed
```

---

# Final Correct Setup

## Frontend `.env`

```env id="’wini256"
VITE_API_URL=http://localhost:5000/api/v1
VITE_SOCKET_URL=http://localhost:5000
```

---

## Backend `.env`

```env id="’wini257"
PORT=5000
ORIGIN=http://localhost:3000
```

---

# Why This Matters

REST APIs usually use:

```text id="’wini258"
/api/v1/*
```

Socket.IO uses:

```text id="’wini259"
/socket.io/*
```

Different routing requirements.

That’s why sharing same base URL causes issues.





///dashboard change 

ew UI sections
Welcome banner – greeting + your first name, quick links to All tasks and Shared tasks
Completion rate – % bar (completed / total)
Status breakdown – colored bar + counts for Done / In progress / To do
Overdue alert – shows when overdue count > 0
Recent tasks – up to 5 (sorted by updatedAt), each with overdue styling, View more → /tasks
API (server/.../dashboard/service.ts)
Added inProgressTasks, todoTasks (replaces old pendingTasks = only TODO)
Added unreadNotifications
Recent tasks: take: 5, ordered by updatedAt
Removed shared-task list fetch
Files touched
server/src/modules/dashboard/service.ts
client/src/features/dashboard/schema.ts
client/src/features/dashboard/components/StatCard.tsx (new)
client/src/features/dashboard/pages/DashboardPage.tsx
Restart the server if it’s already running so the new stats load. Open /dashboard after login to see the layout.

Optional later (not added): “Create task” button on the dashboard (would need the create modal here), or a small “activity” feed. Say if you want either of those.



//notfications 

notification panel
Layout
Modal-style panel with dimmed backdrop (portal to body)
Dark header with title, unread/total counts, and X close button
Tabs: All · Unread · Read (each shows a count badge)
Scrollable list with icons, message, time (“5m ago”), and task link when available
Close behavior
Click anywhere outside the panel or bell → closes (useClickOutside)
X button in the header
Esc key
Footer hint: “Click outside or press Esc to close”
Read / unread
Unread items: violet background + dot + bold text
Read items: plain white background
Mark read / Mark unread per item (with loading disable while saving)
Mark all as read in the header when there are unread items
Other fixes
Removed extra <button> wrapper in AppHeader (invalid nested button)
Bell badge shows 9+ when count > 9
Empty states differ per tab (“You’re all caught up” for unread, etc.)
Files changed
NotificationBell.tsx – full UI redesign
useNotification.ts – markAllAsRead, readCount
useClickOutside.ts – new hook
notification.schema.ts – filter type, optional taskId
AppHeader.tsx – wrapper fix
Open the bell in the header to try it. Share a task from another account to see a live notification.





//share tsak live 

anged
File	Change
server/src/socket/event.ts
emitTaskShared() → task:shared
server/src/modules/task/service.ts
Return share + task, emit after share
client/src/libs/socket.ts
Small listenSocket<T>() helper
client/src/features/shareTask/useShare.ts
Listen → add task to list
client/src/features/dashboard/useDashboard.ts
Listen → refetch stats (no spinner)
Flow
User A shares → server saves → emitTaskShared(recipientId, share)
User B (socket in room user:{id}) receives task:shared
On /shared → new task appears in the list
On /dashboard → stats refresh (e.g. “Shared with me”)
Notification bell → still uses existing notification:new (unchanged)