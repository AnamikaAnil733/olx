import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { FirebaseContext } from './store/FireContext.jsx';
import { AuthProvider } from './store/AuthContext.jsx';
import { app, auth } from "./firebase/config.jsx"
import { PostContext } from './store/PostContext.jsx';

function Root() {
  const [postDetails, setPostDetails] = useState(null);

  return (
    <StrictMode>
      <FirebaseContext.Provider value={{ app, auth }}>
        <AuthProvider>
          <PostContext.Provider value={{ postDetails, setPostDetails }}>
            <App />
          </PostContext.Provider>
        </AuthProvider>
      </FirebaseContext.Provider>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<Root />);
