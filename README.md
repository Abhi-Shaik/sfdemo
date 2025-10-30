# Salesforce FullStack Application

A modern, secure full-stack application built with Next.js 15, TypeScript, AWS Amplify Gen2, and Tailwind CSS. Features server-side authentication with HttpOnly cookies for maximum security.

## 🚀 Features

- ✨ **Modern Stack**: Next.js 15 with App Router and Server Actions
- 🔐 **Secure Authentication**: AWS Cognito with HttpOnly cookies
- 🎨 **Beautiful UI**: Tailwind CSS with responsive design
- 🛡️ **Server-Side Security**: Middleware-based route protection
- 📱 **Email Verification**: Built-in email verification flow
- ☁️ **AWS Integration**: Amplify Gen2 for seamless AWS services
- 🚢 **CI/CD Ready**: Automated deployments with Amplify Hosting

## 📋 Prerequisites

- Node.js 20+ 
- npm or yarn
- AWS Account
- AWS CLI configured
- Git

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd SalesforceFullStack
```

2. **Install dependencies**
```bash
npm install
cd amplify && npm install && cd ..
```

3. **Configure AWS credentials**
```bash
aws configure
```

4. **Deploy Amplify backend**
```bash
npx ampx sandbox
```
This will create your AWS Cognito User Pool and generate `amplify_outputs.json`.

5. **Run the development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 📁 Project Structure

```
SalesforceFullStack/
├── app/
│   ├── dashboard/          # Protected dashboard page
│   ├── login/              # Login page with Server Actions
│   ├── signup/             # Signup page with email verification
│   ├── layout.tsx          # Root layout with Amplify config
│   └── page.tsx            # Landing page
├── actions/
│   └── auth-actions.ts     # Server Actions for authentication
├── lib/
│   ├── amplify-server-utils.ts  # Server-side Amplify helpers
│   └── amplify-utils.ts         # Client-side Amplify config
├── amplify/
│   ├── auth/
│   │   └── resource.ts     # Cognito User Pool configuration
│   └── backend.ts          # Amplify backend definition
├── middleware.ts           # Route protection middleware
├── amplify.yml            # Amplify Hosting build configuration
└── DEPLOYMENT.md          # Detailed deployment guide
```

## 🔒 Security Features

### HttpOnly Cookies
Authentication tokens are stored in HttpOnly cookies, making them inaccessible to JavaScript and protecting against XSS attacks.

### Server-Side Authentication
All authentication operations are performed server-side using Next.js Server Actions, ensuring sensitive operations never expose credentials to the client.

### Route Protection
Middleware automatically protects routes and redirects unauthenticated users to the login page.

### CSRF Protection
Built-in Next.js CSRF protection with Server Actions.

## 🎯 Authentication Flow

1. **Sign Up**
   - User enters email and password
   - Server Action creates user in Cognito
   - Verification code sent to email
   
2. **Email Verification**
   - User enters verification code
   - Account is confirmed
   - User redirected to login

3. **Sign In**
   - User enters credentials
   - Server Action validates with Cognito
   - HttpOnly cookies set automatically
   - User redirected to dashboard

4. **Protected Routes**
   - Middleware checks authentication
   - Unauthenticated users redirected to login
   - Authenticated users access protected content

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to AWS Amplify

1. Push your code to GitHub
2. Connect repository to AWS Amplify Hosting
3. Amplify will automatically detect `amplify.yml` and deploy

## 🧪 Testing Authentication

1. **Sign Up**
   - Navigate to `/signup`
   - Create an account with a valid email
   - Check your email for verification code
   - Verify your account

2. **Sign In**
   - Navigate to `/login`
   - Enter your credentials
   - You'll be redirected to `/dashboard`

3. **Verify Cookies**
   - Open DevTools → Application → Cookies
   - Look for authentication cookies with `HttpOnly` flag

4. **Test Protected Routes**
   - Try accessing `/dashboard` without signing in
   - You should be redirected to `/login`

## 📚 API Routes

The application uses Next.js Server Actions for authentication:

- `handleSignUp` - Create new user account
- `handleConfirmSignUp` - Verify email with code
- `handleSignIn` - Authenticate user
- `handleSignOut` - Sign out user
- `handleResendCode` - Resend verification code

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: AWS Amplify Gen2, AWS Cognito
- **Deployment**: AWS Amplify Hosting
- **CI/CD**: Amplify Console with GitHub integration

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [AWS Amplify Gen2 Docs](https://docs.amplify.aws/react/)
- [AWS Cognito Documentation](https://docs.aws.amazon.com/cognito/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Support

For questions and support:
- Open an issue on GitHub
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help

---

Built with ❤️ using Next.js and AWS Amplify
