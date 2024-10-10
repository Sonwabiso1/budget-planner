# Budget Planner

This is a simple budget planner built with React and TailwindCSS. The application allows users to input their income, savings, and expenses for a given month, and then calculates the remaining balance. All the data is saved in the browser's local storage, so your budget persists across sessions.

## Features

- Add and track multiple expenses
- Input income and savings
- Automatically calculates total expenses and remaining balance
- Displays the current month
- Saves data in local storage for persistence
- Responsive design using TailwindCSS

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TailwindCSS**: A utility-first CSS framework for styling.
- **React Router**: For navigating between pages (home and budget pages).
- **Local Storage**: Used to save the budget data in the browser.

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/your-username/budget-planner.git
    ```

2. Navigate into the project directory:

    ```bash
    cd budget-planner
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm start
    ```

5. Open your browser and go to `http://localhost:3000` to view the app.

## TailwindCSS Setup

The project uses TailwindCSS for styling. If you want to customize the styles or add new utility classes, you can do so in the `tailwind.config.js` file.

Tailwind has already been configured with the custom **Nedbank Green** color (`#007a33`), which is applied throughout the app.

## Usage

1. **Income**: Enter your total income for the month.
2. **Savings**: Input how much you plan to save.
3. **Expenses**: Add expenses with names and amounts. Each expense is listed in the budget.
4. **Remaining Balance**: The app will automatically calculate the remaining balance after accounting for your total expenses and savings.
5. **Current Month**: The app automatically displays the month you're budgeting for.

## Deployed Version

You can access the live version of the app [here](https://budgetplannerwebapp.netlify.app).

## Future Enhancements

- Add the ability to edit and delete expenses.
- Introduce budget categories (e.g., food, transportation, rent).
- Option to switch between different months and track budget history.
- Graphical display of expenses vs. income.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
