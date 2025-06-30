# Linear Project Dashboard Generator

A professional project dashboard generator that integrates with Linear API to create beautiful, interactive project visualizations. Perfect for presentations, team meetings, and project tracking.

## Features

### 📊 Dashboard Components
- **Progress Bars**: Overall project and task completion tracking
- **Gantt Chart**: Visual project timeline with task dependencies
- **Workload Distribution**: Team member workload analysis
- **Deadlines Widget**: Upcoming and overdue task tracking
- **Milestone Timeline**: Project milestone visualization
- **Filter Panel**: Filter tasks by assignee, priority, status, and tags

### 🔗 Linear Integration
- Seamless connection to Linear API
- Import team data and issues
- Real-time data synchronization
- Automatic task status mapping

### 🎨 Professional Design
- Clean, modern UI suitable for presentations
- Responsive design for all screen sizes
- Professional color scheme and typography
- Interactive charts and visualizations

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- Linear account with API access (optional - demo mode available)

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd linear
   npm install
   ```

2. **Start the development servers:**
   ```bash
   npm run dev:all
   ```
   
   This starts both:
   - Frontend development server (http://localhost:3000)
   - Linear API proxy server (http://localhost:3001)

3. **Open your browser:**
   Navigate to `http://localhost:3000`

### Demo Mode (No Linear API Required)

1. **Click "Try Demo Dashboard"** on the homepage
2. **Explore the dashboard** with sample project data
3. **Test all features** including filtering, charts, and visualizations

### Linear API Setup (Optional)

1. **Get your Linear API key:**
   - Go to Linear Settings → API → Personal API Keys
   - Create a new API key
   - Copy the key (you'll only see it once!)

2. **Connect to Linear:**
   - Enter your API key in the dashboard
   - Select your team
   - Import your project data

## Usage

### 1. Demo Mode
- Click "Try Demo Dashboard" to explore with sample data
- No API key or Linear account required
- Perfect for testing and demonstrations

### 2. Linear Integration
- Enter your Linear API key
- Click "Connect" to verify your credentials
- Select the team you want to import
- Click "Import Team Data" to fetch issues and team members
- Click "Create Project Dashboard" to generate the dashboard

### 3. Explore the Dashboard
- **Overview Cards**: Quick stats at the top
- **Progress Bars**: Task and hours completion
- **Gantt Chart**: Visual timeline of all tasks
- **Workload Chart**: Team member distribution
- **Filters**: Filter tasks by various criteria
- **Deadlines**: Track upcoming and overdue tasks
- **Milestones**: Project milestone timeline

### 4. Filter and Analyze
- Use the filter panel to focus on specific tasks
- Filter by assignee, priority, status, or tags
- View real-time updates as you filter

## Dashboard Components

### Progress Tracking
- Overall project completion percentage
- Task completion vs. hours completion
- Visual progress bars with color coding

### Gantt Chart
- Interactive timeline visualization
- Color-coded task status
- Hover for detailed information
- Professional presentation-ready design

### Workload Analysis
- Stacked bar chart showing completed vs. remaining hours
- Per-team member breakdown
- Completion percentage for each member

### Deadline Management
- Upcoming deadlines with priority indicators
- Overdue task highlighting
- Due date status (today, tomorrow, upcoming)

### Milestone Timeline
- Visual milestone progression
- Status indicators (completed, overdue, upcoming)
- Task count per milestone

## Technical Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Proxy Server**: Express + http-proxy-middleware

## Project Structure

```
src/
├── components/          # React components
│   ├── ProgressBar.tsx
│   ├── GanttChart.tsx
│   ├── WorkloadChart.tsx
│   ├── DeadlinesWidget.tsx
│   ├── MilestoneTimeline.tsx
│   ├── FilterPanel.tsx
│   ├── LinearIntegration.tsx
│   └── ProjectDashboard.tsx
├── services/           # API services
│   └── linearApi.ts
├── types/             # TypeScript definitions
│   └── index.ts
├── utils/             # Utility functions
│   └── cn.ts
├── data/              # Demo data
│   └── demoData.ts
├── App.tsx           # Main application
└── main.tsx          # Entry point
server.js             # Proxy server for Linear API
```

## Development Scripts

- `npm run dev` - Start frontend development server only
- `npm run dev:proxy` - Start Linear API proxy server only
- `npm run dev:all` - Start both frontend and proxy servers
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Customization

### Styling
The dashboard uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Component styles in `src/index.css`
- Individual component styling

### Data Mapping
Linear data is automatically mapped to the dashboard format:
- Linear issues → Tasks
- Linear states → Task status
- Linear priorities → Task priorities
- Linear assignees → Team members

### Adding Features
The modular component structure makes it easy to add new features:
- New chart types
- Additional filters
- Custom visualizations
- Export functionality

## API Reference

### Linear API Integration
The dashboard uses Linear's GraphQL API to fetch:
- Teams and team members
- Issues with full details
- Issue states and priorities
- Assignee information

### Proxy Server
The proxy server handles CORS issues by:
- Forwarding requests to Linear API
- Adding proper CORS headers
- Maintaining authentication headers

### Data Conversion
Linear data is converted to the dashboard format:
```typescript
// Linear Issue → Dashboard Task
{
  id: issue.id,
  title: issue.title,
  status: convertLinearState(issue.state.name),
  priority: convertLinearPriority(issue.priority),
  assigneeId: issue.assignee?.id,
  // ... other mappings
}
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure the proxy server is running (`npm run dev:all`)
   - Check that both servers are running on correct ports
   - Verify proxy server is accessible at http://localhost:3001

2. **API Key Issues**
   - Ensure your Linear API key is correct
   - Check that the key has proper permissions
   - Verify the key hasn't expired

3. **No Data Loading**
   - Check your internet connection
   - Verify Linear API is accessible
   - Ensure your team has issues assigned
   - Try demo mode to test the dashboard

4. **Build Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check Node.js version (requires 16+)
   - Clear npm cache if needed

### Getting Help
- Try demo mode first to verify the dashboard works
- Check the browser console for error messages
- Verify your Linear API key permissions
- Ensure your team has data to import

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For support or questions:
- Check the troubleshooting section
- Review the Linear API documentation
- Open an issue on GitHub

---

**Happy Dashboarding! 📊✨** 