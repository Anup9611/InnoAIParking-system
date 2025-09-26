# TODO: Make Notifications Functional in Dashboard Header

## Steps to Complete
- [ ] Add state for notifications array (with unread flag) and unreadCount in DashboardHeader.tsx
- [ ] Initialize sample data (3 notifications) in useEffect
- [ ] Wrap Bell Button in DropdownMenu: Trigger on Button, dynamic badge with unreadCount
- [ ] DropdownMenuContent: Header, scrollable list of items (icon, title, message, timestamp), mark as read on click (update state, toast via Sonner)
- [ ] Add styles/animations: Hover scale on button, transition-colors for items, bg-card shadow-elevated for content
- [ ] Handle empty state: "No new notifications"
- [ ] Test: Click Bell to open dropdown, click item to mark read (badge updates, toast shows), verify theme integration
