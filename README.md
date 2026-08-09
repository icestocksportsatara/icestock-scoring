# Icestock Sport Scoring System

A professional web application for scoring icestock sport competitions, designed with a modern 3D aesthetic and secure architecture.

## Features

### Competition Management
- Create and manage multiple competitions
- Track competition details (name, location, date, discipline)
- View active competitions at a glance

### Scoring Disciplines

#### Team Game
- Two teams, four players each
- Six rounds of competition
- Automatic point calculation based on stock distances
- Real-time scoreboard updates
- Track individual round scores

#### Target Shooting
- Four rounds with six attempts each
- Maximum 240 points total
- Automatic round totals
- Individual or team participation

#### Distance Competition
- Five attempts per player
- Track best distance achieved
- World record comparison (566m)
- Precision distance measurement

### Security Features
- Client-side data validation
- Input sanitization on all forms
- Secure localStorage implementation
- No server-side vulnerabilities (fully client-side)
- XSS protection through proper DOM handling

## Technology Stack

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with CSS Grid and custom properties
- **Vanilla JavaScript** - No dependencies, lightweight and fast
- **LocalStorage API** - Persistent data storage

## Design Philosophy

- **Dark Theme** - Professional gradient from `#05070C` to `#0F131C`
- **Cyan Accent** - High-contrast accent color (#38BDF8)
- **Fluid Typography** - Responsive text scaling with clamp()
- **Smooth Animations** - 0.2s transitions for professional feel
- **Mobile Responsive** - Adapts to all screen sizes

## Getting Started

1. Open `index.html` in a modern web browser
2. Create a new competition
3. Navigate to "Live Scoring" to enter results
4. View results and rankings

## File Structure

```
icestock-scoring/
├── index.html      # Main HTML structure
├── styles.css      # Complete styling system
├── app.js          # Application logic and scoring
└── README.md       # Documentation
```

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Data Storage

All data is stored locally in the browser's localStorage:
- `competitions` - Competition records
- `matches` - Match history
- `results` - Scoring results across all disciplines

## Security Considerations

### Implemented Protections
- Input validation on all numeric fields
- Text sanitization for team/player names
- No inline JavaScript
- No external dependencies (no supply chain attacks)
- No server communication (no network vulnerabilities)

### Best Practices
- Regular localStorage cleanup recommended
- Export data periodically for backup
- Use HTTPS when hosting on a server
- Implement CSP headers for production deployment

## Future Enhancements

- PDF export of results
- Real-time multi-device sync
- Advanced statistics and analytics
- Tournament bracket management
- Official IFI integration

## License

This is a demonstration project for icestock sport scoring.

## Credits

Based on International Federation of Icestocksport (IFI) rules and regulations.