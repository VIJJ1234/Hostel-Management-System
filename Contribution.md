## Getting Started

1. Clone the repository:
```bash
  git clone https://github.com/Tarun-Kataruka/Hostel-Management.git
```

2. Install dependencies for backend:

   ```bash
   cd backend
   npm install
   ```

3. Install dependencies for the frontend(both admin and kicks):

   ```bash
   cd ../admin
  npm install
  cd ../student
  npm install
  ```

4. SetUp

a. Environment variables:
- Create a `.env.local` file in the root directory of your project (ensure it's added to `.gitignore` for security).
- Add the Firebase configuration details as environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

b. Usage in Project:

- Access these environment variables in your code as `process.env.VARIABLE_NAME`.

c. Restart Server:

- After setting environment variables, restart the development server to apply the changes.

###### Note:
- Remember to keep your `.env.local` file private and do not expose sensitive credentials in your code repository.

5. Run the project:

   ```bash
   npm run dev
   ```

6. Access the project locally at `http://localhost:4000`.



## Questions or Need Help?

If you have any questions or need further assistance, feel free to open an issue or reach out to [Tarun-Kataruka](https://github.com/Tarun-Kataruka).

We appreciate your contributions and look forward to your involvement in improving Motion-Amplification-Video!

## Please view the list of open issues at [Issues](https://github.com/Tarun-Kataruka/FindYourKick/issues). Any contributions to them are welcome.
