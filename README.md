# Elegant Calculator

A beautiful, modern calculator built with ASP.NET Core MVC, Bootstrap, and JavaScript. Features an elegant design with smooth animations and a comprehensive set of mathematical operations.

## Features

- **Modern Design**: Elegant gradient background with glass-morphism effects
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Advanced Operations**: Basic arithmetic, square root, and power operations
- **History Feature**: Keeps track of your calculations with clickable history
- **Keyboard Support**: Full keyboard navigation and input
- **Error Handling**: Graceful error handling with toast notifications
- **Smooth Animations**: Beautiful button animations and hover effects

## Technologies Used

- **Backend**: ASP.NET Core 8.0 MVC
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: Bootstrap 5.3.0
- **Icons**: Font Awesome 6.0.0
- **Styling**: Custom CSS with CSS Variables and Gradients

## Getting Started

### Prerequisites

- .NET 8.0 SDK or later
- Visual Studio 2022 or VS Code

### Installation

1. Clone or download the project
2. Open a terminal in the project directory
3. Run the following commands:

```bash
dotnet restore
dotnet build
dotnet run
```

4. Open your browser and navigate to `https://localhost:5001` or `http://localhost:5000`

## Features in Detail

### Calculator Operations

- **Basic Arithmetic**: Addition (+), Subtraction (-), Multiplication (×), Division (÷)
- **Advanced Operations**: Square Root (√), Power (^)
- **Clear Functions**: Clear All (C), Clear Entry (CE)
- **Decimal Support**: Full decimal number support

### User Interface

- **Dual Display**: Shows current expression and result separately
- **Button Animations**: Smooth hover and click effects
- **Color-coded Buttons**: Different colors for different operation types
- **Responsive Design**: Adapts to different screen sizes
- **History Panel**: Shows recent calculations with timestamps

### Keyboard Shortcuts

- **Numbers**: 0-9 keys
- **Operations**: +, -, *, / keys
- **Special**: 
  - `Enter` or `=` for calculation
  - `Backspace` for clear entry
  - `Escape` for clear all
  - `.` for decimal point

## Project Structure

```
calculator/
├── Controllers/
│   └── HomeController.cs          # Main controller with calculation logic
├── Views/
│   ├── Home/
│   │   ├── Index.cshtml          # Main calculator view
│   │   └── Error.cshtml          # Error page
│   ├── Shared/
│   │   └── _Layout.cshtml        # Main layout with Bootstrap
│   ├── _ViewImports.cshtml       # View imports
│   └── _ViewStart.cshtml         # View start configuration
├── wwwroot/
│   ├── css/
│   │   └── site.css              # Custom elegant styling
│   └── js/
│       ├── calculator.js          # Calculator functionality
│       └── site.js               # Site-wide JavaScript
├── Program.cs                     # Application entry point
├── Calculator.csproj             # Project file
└── appsettings.json              # Application settings
```

## Customization

### Colors
The calculator uses CSS variables for easy color customization. Edit the `:root` section in `wwwroot/css/site.css`:

```css
:root {
    --primary-color: #6c5ce7;
    --secondary-color: #a29bfe;
    --success-color: #00b894;
    --warning-color: #fdcb6e;
    --danger-color: #e17055;
    /* ... more variables */
}
```

### Adding New Operations
To add new mathematical operations:

1. Update the `HomeController.cs` Calculate method
2. Add the operation button to `Index.cshtml`
3. Update the JavaScript parsing logic in `calculator.js`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ using ASP.NET Core and Bootstrap** 