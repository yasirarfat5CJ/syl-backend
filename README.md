### How to Run the Application

#### Development Mode
1. Clone the repository:
   ```bash
   git clone https://github.com/yasirarfat5CJ/syl-backend.git
   cd syl-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

#### Production Mode
1. Build the application:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

#### Docker
To run the application using Docker, follow these steps:
1. Build the Docker image:
   ```bash
   docker build -t syl-backend .
   ```
2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 syl-backend
   ```

#### Testing
To run tests:
1. Execute:
   ```bash
   npm test
   ```

#### Troubleshooting
- Make sure you have all the necessary environment variables set.
- Check logs for any errors:
   ```bash
   npm run logs
   ```

#### Workflow Tips
- Use feature branches for development to keep your main branch clean.
- Regularly pull changes from the main branch to keep your branch updated.