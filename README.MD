# EduHub: Modern Learning Platform

![EduHub Logo](https://v0.dev/placeholder.svg?height=160&width=160)

EduHub is a modern, feature-rich learning platform built with Next.js that helps users organize their educational journey with customizable playlists, progress tracking, integrated notes, and AI-driven insights.

## 🌟 Features

- **Customizable Learning Playlists**: Create and organize collections of courses tailored to your learning needs
- **Progress Tracking**: Monitor your completion across different courses in real-time
- **Integrated Notes**: Take and organize notes while learning for quick revision
- **Course Library**: Browse and access a wide range of educational content
- **AI-Driven Insights**: Receive personalized course recommendations based on your learning style and interests
- **Responsive Design**: Access your learning materials on any device
- **Dark/Light Mode**: Choose your preferred theme for comfortable learning

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 with App Router, React, TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Authentication**: NextAuth.js with credentials and GitHub provider
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: React Context API and Server Components
- **Deployment**: Ready for deployment on Vercel

## 📋 Prerequisites

- Node.js 18.x or later
- npm or yarn
- Git
- PostgreSQL database

## 🚀 Getting Started

### Setting Up Environment Variables

Create a `.env` file in the root directory with the following variables:

\`\`\`
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/eduhub"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# GitHub OAuth (optional - for GitHub login)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
\`\`\`

### Installation Instructions

#### macOS

1. Install dependencies:
   \`\`\`bash
   # Install Homebrew if not already installed
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install Node.js
   brew install node
   
   # Install PostgreSQL
   brew install postgresql@14
   brew services start postgresql@14
   \`\`\`

2. Set up the project:
   \`\`\`bash
   # Clone the repository
   git clone https://github.com/yourusername/eduhub.git
   cd eduhub
   
   # Install dependencies
   npm install
   
   # Create PostgreSQL database
   createdb eduhub
   
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev --name init
   
   # Start the development server
   npm run dev
   
   # Seed the database with sample data (in a new terminal)
   curl http://localhost:3000/api/seed
   \`\`\`

#### Windows

1. Install required software:
   - Install [Node.js](https://nodejs.org/)
   - Install [PostgreSQL](https://www.postgresql.org/download/windows/)
   - Install [Git](https://git-scm.com/download/win)

2. Set up PostgreSQL:
   - During installation, set a password for the postgres user
   - Open pgAdmin (installed with PostgreSQL)
   - Create a new database named "eduhub"

3. Set up the project:
   ```powershell
   # Clone the repository
   git clone https://github.com/yourusername/eduhub.git
   cd eduhub
   
   # Install dependencies
   npm install
   
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev --name init
   
   # Start the development server
   npm run dev
   \`\`\`

4. Seed the database:
   - Open your browser and navigate to http://localhost:3000/api/seed

#### Linux (Ubuntu/Debian)

1. Install dependencies:
   \`\`\`bash
   # Update package lists
   sudo apt update
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install PostgreSQL
   sudo apt install postgresql postgresql-contrib
   
   # Start PostgreSQL service
   sudo systemctl start postgresql
   sudo systemctl enable postgresql
   \`\`\`

2. Set up PostgreSQL:
   \`\`\`bash
   # Switch to postgres user
   sudo -i -u postgres
   
   # Create a database
   createdb eduhub
   
   # Create a user (replace 'password' with a secure password)
   psql -c "CREATE USER eduhub_user WITH PASSWORD 'password';"
   
   # Grant privileges
   psql -c "GRANT ALL PRIVILEGES ON DATABASE eduhub TO eduhub_user;"
   
   # Exit postgres user
   exit
   \`\`\`

3. Set up the project:
   \`\`\`bash
   # Clone the repository
   git clone https://github.com/yourusername/eduhub.git
   cd eduhub
   
   # Install dependencies
   npm install
   
   # Update DATABASE_URL in .env file with the credentials you created
   # DATABASE_URL="postgresql://eduhub_user:password@localhost:5432/eduhub"
   
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev --name init
   
   # Start the development server
   npm run dev
   
   # Seed the database with sample data (in a new terminal)
   curl http://localhost:3000/api/seed
   \`\`\`

## 🧪 Using the Demo Application

Once the application is running, you can access it at http://localhost:3000.

### Demo Credentials

You can log in with the following demo credentials:

- **Email**: demo@example.com
- **Password**: password123

## ⚙️ Additional Configuration

### GitHub OAuth (Optional)

To enable GitHub login:

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - Application name: EduHub
   - Homepage URL: http://localhost:3000
   - Authorization callback URL: http://localhost:3000/api/auth/callback/github
4. Register the application
5. Copy the Client ID and generate a Client Secret
6. Update your `.env` file with these values

### Database Hosting Options

For production, consider using:

- [Neon](https://neon.tech) - Serverless Postgres
- [Supabase](https://supabase.com) - Open source Firebase alternative
- [Railway](https://railway.app) - Infrastructure platform

## 🔍 Project Structure

\`\`\`
eduhub/
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   ├── dashboard/        # Dashboard pages
│   ├── login/            # Authentication pages
│   └── register/         # User registration
├── components/           # React components
│   ├── ui/               # UI components (shadcn/ui)
│   └── ...               # Feature components
├── lib/                  # Utility functions and shared code
│   ├── actions.ts        # Server actions
│   ├── auth-options.ts   # NextAuth configuration
│   ├── data.ts           # Data access functions
│   └── db.ts             # Database client
├── prisma/               # Prisma schema and migrations
│   └── schema.prisma     # Database schema
├── public/               # Static assets
└── ...                   # Configuration files
\`\`\`

## ❓ Troubleshooting

- **Database connection issues**: Verify your PostgreSQL service is running and the connection string is correct
- **Prisma errors**: Run `npx prisma generate` after any schema changes
- **Authentication errors**: Check that your environment variables are set correctly
- **Seeding issues**: If the seed API fails, you can run `npx prisma db seed` directly if you've configured a seed script

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
