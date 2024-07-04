Node.js and MongoDB CRUD API

This Node.js application provides a powerful and secure RESTful API for managing users and business cards. It leverages MongoDB for data storage and offers a variety of features to streamline user interactions.

Key Features:

    User Management:
        Create new user accounts with email, password, and optional name.
        Secure user login with password hashing (Bcryptjs).
        Implement role-based access control for admins to manage other users (edit, delete).
        Issue JSON Web Tokens (JWT) for secure API access after successful login.

    Business Card Management:
        Create, edit, and delete business cards for authenticated users.
        Allow authorized users (admins) to view all business cards.

    Data Validation:
        Utilize Joi for robust data validation on user input, ensuring data integrity.
        Return informative error messages to the client in case of invalid data.

    Security:
        Employ JWT for API authentication and authorization.
        Securely store passwords using Bcryptjs hashing.

    CORS (Cross-Origin Resource Sharing):
        Restrict API access to authorized origins, enhancing application security.

Getting Started:

    Prerequisites: Ensure you have Node.js and MongoDB installed on your system.
    Clone the Repository: Clone this project's code repository to your local machine.
    Install Dependencies: Navigate to the project directory and run npm install to install all required dependencies.
    Configuration: Create a .env file in the project root directory. Add your MongoDB connection URI using the following format:

`mongodb+srv://${DB_NAME}:${DB_PASSWORD}@cluster0.kxwl9ix.mongodb.net/test`
or:
"mongodb://mongodb:27017/Business-cards-app"


    Start the Server: Run node server.js in your terminal to start the application.

API Documentation:

Detailed API documentation is available at http://localhost:3000/api/docs. This documentation provides comprehensive information on all available API endpoints, including request methods, expected parameters, and response formats.

Disclaimer:

This application is designed for educational purposes only. It's recommended to implement additional security measures and thorough testing before deploying it in a production environment.
