import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Company development users
        const companyUsers = [
          { 
            email: 'employee@company.com', 
            password: 'Welcome@2024', 
            role: 'employee',
            name: 'John Employee',
            department: 'Engineering'
          },
          { 
            email: 'hr@company.com', 
            password: 'HRSecure@2024', 
            role: 'admin',
            name: 'Jane HR Manager',
            department: 'Human Resources'
          },
          { 
            email: 'manager@company.com', 
            password: 'Manage@2024', 
            role: 'admin',
            name: 'Bob Manager',
            department: 'Operations'
          },
          // Test users
          { 
            email: 'employee@test.com', 
            password: 'employee123', 
            role: 'employee',
            name: 'Test Employee'
          },
          { 
            email: 'admin@test.com', 
            password: 'admin123', 
            role: 'admin',
            name: 'Test Admin'
          }
        ];

        const user = companyUsers.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          return {
            id: user.email,
            email: user.email,
            name: user.name,
            role: user.role,
            department: user.department || 'General'
          };
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.department = user.department;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) {
        (session.user as any).role = token.role;
        (session.user as any).department = token.department;
        (session as any).accessToken = token.accessToken;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
