NexTalk: Connect, and Chat Globally !

NexTalk is a dynamic web application designed to connect people worldwide. It offers a platform for users to find friends partners, have conversations, and social life, interactive environment. 

Key features:
- User-friendly signup and login process
- Personalized user profiles with language preferences
- Friend recommendation system based on language learning goals
- Real-time chat functionality
- Real-time video calling.
- Friend request and notification system

Built with modern web technologies, NexTalk provides an engaging space for language enthusiasts to meet, learn, and grow together.

Technologies Used:
Frontend: React, Vite, TailwindCSS
Backend: Node.js, Express
Database: MongoDB
Real-time Communication: Stream API



To get a local copy up and running, follow these simple steps:

1. Clone the repository.
2. Install dependencies for both frontend and backend
      # Install frontend dependencies
      cd frontend
      npm install
      
      # Install backend dependencies
      cd ../backend
      npm install

3.Set up environment variables
In the frontend directory, create a .env file and add:
      VITE_STREAM_API_KEY=your_stream_api_key
In the backend directory, create a .env file and add:
      MONGODB_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret

4. Start the development servers

      # Start backend server
      cd backend
      npm run dev
      
      # In a new terminal, start frontend server
      cd frontend
      npm run dev
   
