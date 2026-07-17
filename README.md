<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ajaia Docs - README</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: #0d1117;
            color: #e6edf3;
            line-height: 1.6;
            padding: 2rem;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: #161b22;
            border-radius: 12px;
            padding: 2.5rem;
            position: relative;
            border: 1px solid #30363d;
        }
        .copy-btn {
            position: sticky;
            top: 20px;
            float: right;
            background: #238636;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.2s;
            z-index: 100;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 12px rgba(35, 134, 54, 0.3);
        }
        .copy-btn:hover {
            background: #2ea043;
            transform: scale(1.02);
        }
        .copy-btn:active {
            transform: scale(0.98);
        }
        .copy-btn.copied {
            background: #1f6feb;
        }
        h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #58a6ff, #1f6feb);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        h2 {
            font-size: 1.8rem;
            font-weight: 600;
            margin-top: 2rem;
            margin-bottom: 1rem;
            color: #f0f6fc;
            border-bottom: 1px solid #30363d;
            padding-bottom: 0.5rem;
        }
        h3 {
            font-size: 1.3rem;
            font-weight: 600;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
            color: #f0f6fc;
        }
        p {
            margin-bottom: 1rem;
            color: #c9d1d9;
        }
        a {
            color: #58a6ff;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        code {
            background: #0d1117;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            color: #f0f6fc;
            border: 1px solid #30363d;
        }
        pre {
            background: #0d1117;
            padding: 1rem;
            border-radius: 6px;
            overflow-x: auto;
            margin: 1rem 0;
            border: 1px solid #30363d;
            position: relative;
        }
        pre code {
            background: none;
            border: none;
            padding: 0;
            color: #e6edf3;
        }
        .badge {
            display: inline-block;
            background: #238636;
            color: #fff;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 600;
            margin-right: 8px;
        }
        .badge-yellow {
            background: #d29922;
        }
        .badge-red {
            background: #da3633;
        }
        .badge-blue {
            background: #1f6feb;
        }
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin: 1rem 0;
        }
        .feature-item {
            background: #0d1117;
            padding: 1rem;
            border-radius: 6px;
            border: 1px solid #30363d;
        }
        .feature-item .check {
            color: #3fb950;
            margin-right: 6px;
        }
        .feature-item .cross {
            color: #da3633;
            margin-right: 6px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
        }
        th, td {
            padding: 10px 12px;
            text-align: left;
            border: 1px solid #30363d;
        }
        th {
            background: #0d1117;
            font-weight: 600;
        }
        td {
            color: #c9d1d9;
        }
        .section {
            margin: 2rem 0;
        }
        .emoji {
            font-size: 1.2rem;
        }
        @media (max-width: 768px) {
            body {
                padding: 1rem;
            }
            .container {
                padding: 1.5rem;
            }
            .copy-btn {
                position: relative;
                float: none;
                width: 100%;
                justify-content: center;
                margin-bottom: 1rem;
            }
            h1 {
                font-size: 2rem;
            }
            .feature-grid {
                grid-template-columns: 1fr;
            }
        }
        .toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #238636;
            color: #fff;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 500;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }
        .toast.show {
            transform: translateY(0);
            opacity: 1;
        }
        .subtitle {
            color: #8b949e;
            font-size: 1.1rem;
            margin-bottom: 2rem;
        }
        hr {
            border: none;
            border-top: 1px solid #30363d;
            margin: 2rem 0;
        }
    </style>
</head>
<body>
    <div class="container" id="readme-container">
        <button class="copy-btn" onclick="copyReadme()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor"/>
            </svg>
            Copy README
        </button>

        <div id="readme-content">
            <h1>📝 Ajaia Docs</h1>
            <p class="subtitle">Collaborative Document Editor Built with Next.js, Supabase &amp; TipTap</p>

            <p>
                <span class="badge">✅ Production Ready</span>
                <span class="badge badge-blue">🚀 Live Demo</span>
                <span class="badge badge-yellow">📦 Open Source</span>
            </p>

            <p>
                <a href="https://ajaia-docs.vercel.app">🌐 Live Demo</a> &nbsp;|&nbsp;
                <a href="https://github.com/yourusername/ajaia-docs">📂 GitHub Repository</a>
            </p>

            <hr>

            <h2>📋 Table of Contents</h2>
            <ul>
                <li><a href="#live-demo">Live Demo</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#tech-stack">Tech Stack</a></li>
                <li><a href="#local-setup">Local Setup</a></li>
                <li><a href="#environment-variables">Environment Variables</a></li>
                <li><a href="#supabase-setup">Supabase Setup</a></li>
                <li><a href="#running-the-application">Running the Application</a></li>
                <li><a href="#project-structure">Project Structure</a></li>
                <li><a href="#api-routes">API Routes</a></li>
                <li><a href="#testing">Testing</a></li>
                <li><a href="#deployment">Deployment</a></li>
                <li><a href="#whats-incomplete">What's Incomplete</a></li>
            </ul>

            <hr>

            <h2 id="live-demo">🌐 Live Demo</h2>
            <p><strong>URL:</strong> <a href="https://ajaia-docs.vercel.app">https://ajaia-docs.vercel.app</a></p>

            <h3>Test Accounts</h3>
            <table>
                <tr>
                    <th>Email</th>
                    <th>Password</th>
                </tr>
                <tr>
                    <td>alice@example.com</td>
                    <td>password123</td>
                </tr>
                <tr>
                    <td>bob@example.com</td>
                    <td>password123</td>
                </tr>
            </table>

            <hr>

            <h2 id="features">✨ Features</h2>

            <h3>Core Functionality</h3>
            <div class="feature-grid">
                <div class="feature-item">
                    <span class="check">✅</span> Document Creation
                </div>
                <div class="feature-item">
                    <span class="check">✅</span> Rich Text Editing
                </div>
                <div class="feature-item">
                    <span class="check">✅</span> Auto-Save
                </div>
                <div class="feature-item">
                    <span class="check">✅</span> File Upload (.txt, .md, .docx)
                </div>
                <div class="feature-item">
                    <span class="check">✅</span> Document Sharing
                </div>
                <div class="feature-item">
                    <span class="check">✅</span> User Authentication
                </div>
                <div class="feature-item">
                    <span class="check">✅</span> Responsive Design
                </div>
                <div class="feature-item">
                    <span class="check">✅</span> Database Persistence
                </div>
            </div>

            <h3>Technical Highlights</h3>
            <ul>
                <li>🔐 Row Level Security (RLS) in Supabase</li>
                <li>📱 Fully responsive design</li>
                <li>⚡ Server-side rendering with Next.js 14</li>
                <li>🎨 Modern UI with Tailwind CSS</li>
                <li>📝 TipTap rich text editor</li>
                <li>🔄 Real-time auto-save</li>
            </ul>

            <hr>

            <h2 id="tech-stack">🛠️ Tech Stack</h2>

            <h3>Frontend</h3>
            <table>
                <tr>
                    <th>Technology</th>
                    <th>Purpose</th>
                </tr>
                <tr>
                    <td>Next.js 14 (App Router)</td>
                    <td>Framework</td>
                </tr>
                <tr>
                    <td>React 18</td>
                    <td>UI Library</td>
                </tr>
                <tr>
                    <td>Tailwind CSS</td>
                    <td>Styling</td>
                </tr>
                <tr>
                    <td>shadcn/ui</td>
                    <td>Component Library</td>
                </tr>
                <tr>
                    <td>TipTap</td>
                    <td>Rich Text Editor</td>
                </tr>
                <tr>
                    <td>Lucide React</td>
                    <td>Icons</td>
                </tr>
                <tr>
                    <td>Sonner</td>
                    <td>Notifications</td>
                </tr>
            </table>

            <h3>Backend</h3>
            <table>
                <tr>
                    <th>Technology</th>
                    <th>Purpose</th>
                </tr>
                <tr>
                    <td>PostgreSQL (Supabase)</td>
                    <td>Database</td>
                </tr>
                <tr>
                    <td>Supabase Auth</td>
                    <td>Authentication</td>
                </tr>
                <tr>
                    <td>Next.js API Routes</td>
                    <td>API Layer</td>
                </tr>
                <tr>
                    <td>Mammoth.js</td>
                    <td>.docx Processing</td>
                </tr>
            </table>

            <h3>Development Tools</h3>
            <table>
                <tr>
                    <th>Technology</th>
                    <th>Purpose</th>
                </tr>
                <tr>
                    <td>TypeScript</td>
                    <td>Type Safety</td>
                </tr>
                <tr>
                    <td>ESLint</td>
                    <td>Linting</td>
                </tr>
                <tr>
                    <td>Jest</td>
                    <td>Testing</td>
                </tr>
                <tr>
                    <td>Vercel</td>
                    <td>Deployment</td>
                </tr>
            </table>

            <hr>

            <h2 id="local-setup">📦 Local Setup</h2>

            <h3>Prerequisites</h3>
            <ul>
                <li>Node.js 18.17 or later</li>
                <li>npm or yarn</li>
                <li>Supabase account (free tier)</li>
                <li>Git</li>
            </ul>

            <h3>Installation Steps</h3>

            <pre><code># 1. Clone the repository
git clone https://github.com/yourusername/ajaia-docs.git
cd ajaia-docs

# 2. Install dependencies
npm install

# 3. Install shadcn/ui components
npx shadcn-ui@latest init
# Select: Default style, Slate base color, CSS variables

npx shadcn-ui@latest add button input dialog dropdown-menu toast sonner

# 4. Create environment file
cp .env.example .env.local</code></pre>

            <hr>

            <h2 id="environment-variables">🔧 Environment Variables</h2>
            <p>Create a <code>.env.local</code> file in the root directory:</p>

            <pre><code># Required - Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional - Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000</code></pre>

            <hr>

            <h2 id="supabase-setup">🗄️ Supabase Setup</h2>

            <h3>1. Create a Supabase Project</h3>
            <ol>
                <li>Go to <a href="https://supabase.com">Supabase</a></li>
                <li>Create a new project</li>
                <li>Note your project URL and API keys</li>
            </ol>

            <h3>2. Run SQL Schema</h3>
            <p>Go to Supabase SQL Editor and run:</p>

            <pre><code>-- Users table extends auth.users
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  password TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documents table
CREATE TABLE public.documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT 'Untitled',
  content JSONB DEFAULT '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Start writing here..."}]}]}'::jsonb,
  owner_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shared access table
CREATE TABLE public.shared_access (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(document_id, user_id)
);

-- Create indexes
CREATE INDEX idx_documents_owner_id ON public.documents(owner_id);
CREATE INDEX idx_shared_access_user_id ON public.shared_access(user_id);
CREATE INDEX idx_shared_access_document_id ON public.shared_access(document_id);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_access ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view their own documents" ON public.documents
  FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Users can view shared documents" ON public.documents
  FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM public.shared_access WHERE document_id = id)
  );

CREATE POLICY "Users can insert their own documents" ON public.documents
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own documents" ON public.documents
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own documents" ON public.documents
  FOR DELETE USING (auth.uid() = owner_id);

-- Seed test users
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'alice@example.com', crypt('password123', gen_salt('bf')), now()),
  ('22222222-2222-2222-2222-222222222222', 'bob@example.com', crypt('password123', gen_salt('bf')), now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.users (id, email, name)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'alice@example.com', 'Alice'),
  ('22222222-2222-2222-2222-222222222222', 'bob@example.com', 'Bob')
ON CONFLICT (id) DO NOTHING;</code></pre>

            <h3>3. Authentication Settings</h3>
            <ol>
                <li>Go to Authentication → Settings</li>
                <li>Turn OFF "Confirm email" (for testing)</li>
                <li>Enable Email/Password sign-in</li>
            </ol>

            <hr>

            <h2 id="running-the-application">🚀 Running the Application</h2>

            <h3>Development</h3>
            <pre><code>npm run dev</code></pre>
            <p>Open <a href="https://task-aj-eight.vercel.app/login">https://task-aj-eight.vercel.app/login</a></p>

            <h3>Production Build</h3>
            <pre><code>npm run build
npm start</code></pre>

            <h3>Testing</h3>
            <pre><code>npm test</code></pre>

            <h3>Linting</h3>
            <pre><code>npm run lint</code></pre>

            <hr>

            <h2 id="project-structure">📁 Project Structure</h2>

            <pre><code>ajaia-docs/
├── app/
│   ├── api/
│   │   ├── auth/register/      # User registration
│   │   ├── documents/          # Document CRUD operations
│   │   │   ├── [id]/           # Single document operations
│   │   │   ├── route.ts        # List/Create documents
│   │   │   └── upload/         # File upload endpoint
│   │   └── users/              # User management
│   ├── dashboard/              # Dashboard page
│   ├── documents/
│   │   ├── [id]/              # Document editor page
│   │   └── new/               # New document page
│   ├── login/                 # Login page
│   ├── register/              # Register page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/
│   ├── documents/
│   │   ├── DocumentCard.tsx
│   │   ├── DocumentList.tsx
│   │   └── ShareModal.tsx
│   ├── editor/
│   │   ├── Editor.tsx
│   │   ├── EditorToolbar.tsx
│   │   └── extensions.ts
│   ├── layout/
│   │   └── Header.tsx
│   ├── providers/
│   │   └── AuthProvider.tsx
│   └── ui/                    # shadcn/ui components
├── lib/
│   ├── auth.ts               # Authentication helpers
│   ├── supabase.ts           # Supabase client
│   └── utils.ts              # Utility functions
├── types/
│   └── supabase.ts           # TypeScript definitions
├── middleware.ts             # Next.js middleware
├── .env.local               # Environment variables
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json             # Dependencies</code></pre>

            <hr>

            <h2 id="api-routes">🔌 API Routes</h2>

            <h3>Documents</h3>
            <table>
                <tr>
                    <th>Method</th>
                    <th>Endpoint</th>
                    <th>Description</th>
                </tr>
                <tr>
                    <td>GET</td>
                    <td>/api/documents</td>
                    <td>Get all documents for current user</td>
                </tr>
                <tr>
                    <td>POST</td>
                    <td>/api/documents</td>
                    <td>Create a new document</td>
                </tr>
                <tr>
                    <td>GET</td>
                    <td>/api/documents/[id]</td>
                    <td>Get a single document</td>
                </tr>
                <tr>
                    <td>PUT</td>
                    <td>/api/documents/[id]</td>
                    <td>Update a document</td>
                </tr>
                <tr>
                    <td>DELETE</td>
                    <td>/api/documents/[id]</td>
                    <td>Delete a document</td>
                </tr>
                <tr>
                    <td>POST</td>
                    <td>/api/documents/[id]/share</td>
                    <td>Share a document</td>
                </tr>
                <tr>
                    <td>DELETE</td>
                    <td>/api/documents/[id]/share</td>
                    <td>Remove sharing</td>
                </tr>
                <tr>
                    <td>POST</td>
                    <td>/api/documents/upload</td>
                    <td>Upload a file</td>
                </tr>
            </table>

            <h3>Users</h3>
            <table>
                <tr>
                    <th>Method</th>
                    <th>Endpoint</th>
                    <th>Description</th>
                </tr>
                <tr>
                    <td>POST</td>
                    <td>/api/users</td>
                    <td>Create a user</td>
                </tr>
                <tr>
                    <td>GET</td>
                    <td>/api/users</td>
                    <td>Get all users</td>
                </tr>
            </table>

            <hr>

            <h2 id="testing">🧪 Testing</h2>

            <h3>Unit Tests</h3>
            <pre><code>npm test</code></pre>

            <h3>Manual Testing Flow</h3>
            <ol>
                <li><strong>Authentication</strong> - Register, Login, Session persistence</li>
                <li><strong>Document Management</strong> - Create, Edit, Rename, Delete</li>
                <li><strong>File Upload</strong> - Upload .txt, .md, .docx</li>
                <li><strong>Sharing</strong> - Share, View shared, Remove sharing</li>
            </ol>

            <hr>

            <h2 id="deployment">🚢 Deployment</h2>

            <h3>Deploy to Vercel</h3>
            <ol>
                <li>Push code to GitHub</li>
                <li>Go to <a href="https://vercel.com">Vercel</a></li>
                <li>Import the repository</li>
                <li>Add environment variables</li>
                <li>Click "Deploy"</li>
            </ol>

            <h3>Deploy Commands</h3>
            <pre><code># Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod</code></pre>

            <hr>

            <h2 id="whats-incomplete">🚧 What's Incomplete</h2>

            <h3>Missing Features</h3>
            <div class="feature-grid">
                <div class="feature-item">
                    <span class="cross">❌</span> Real-time collaboration
                </div>
                <div class="feature-item">
                    <span class="cross">❌</span> Comments & suggestions
                </div>
                <div class="feature-item">
                    <span class="cross">❌</span> Version history
                </div>
                <div class="feature-item">
                    <span class="cross">❌</span> Export to PDF/Markdown
                </div>
                <div class="feature-item">
                    <span class="cross">❌</span> File attachments
                </div>
                <div class="feature-item">
                    <span class="cross">❌</span> Role-based permissions
                </div>
            </div>

            <h3>Future Enhancements (2-4 hours)</h3>
            <ol>
                <li><strong>WebSocket Support</strong> - Real-time collaboration using Socket.io</li>
                <li><strong>Version History</strong> - Track changes and restore previous versions</li>
                <li><strong>Comment System</strong> - Inline comments with threads</li>
                <li><strong>Export Options</strong> - PDF, Markdown, and HTML export</li>
                <li><strong>Advanced Permissions</strong> - View-only, comment-only, edit permissions</li>
            </ol>

            <hr>

            <h2>🤝 Contributing</h2>
            <ol>
                <li>Fork the repository</li>
                <li>Create a feature branch: <code>git checkout -b feature/new-feature</code></li>
                <li>Commit changes: <code>git commit -m 'Add new feature'</code></li>
                <li>Push: <code>git push origin feature/new-feature</code></li>
                <li>Open a Pull Request</li>
            </ol>

            <hr>

            <h2>📄 License</h2>
            <p>MIT License - Free to use and modify.</p>

            <hr>

            <h2>🙏 Acknowledgments</h2>
            <ul>
                <li><a href="https://nextjs.org/">Next.js</a></li>
                <li><a href="https://supabase.com/">Supabase</a></li>
                <li><a href="https://tiptap.dev/">TipTap</a></li>
                <li><a href="https://ui.shadcn.com/">shadcn/ui</a></li>
                <li><a href="https://tailwindcss.com/">Tailwind CSS</a></li>
            </ul>

            <hr>

            <p style="text-align: center; color: #8b949e; margin-top: 2rem;">
                Built with ❤️ for the Ajaia project
            </p>
        </div>
    </div>

    <div id="toast" class="toast">✅ README copied to clipboard!</div>

    <script>
        function copyReadme() {
            const content = document.getElementById('readme-content');
            const text = content.innerText;
            
            navigator.clipboard.writeText(text).then(() => {
                const btn = document.querySelector('.copy-btn');
                const toast = document.getElementById('toast');
                
                btn.classList.add('copied');
                btn.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12" stroke="currentColor"/>
                    </svg>
                    Copied!
                `;
                
                toast.classList.add('show');
                
                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor"/>
                        </svg>
                        Copy README
                    `;
                    toast.classList.remove('show');
                }, 2000);
            }).catch(err => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                const toast = document.getElementById('toast');
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 2000);
            });
        }
    </script>
</body>
</html>