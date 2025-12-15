// --- app/index.js ---
import { Redirect } from 'expo-router';

// This file forces the application to start at the WelcomeScreen route.
export default function Index() {
  return <Redirect href="/WelcomeScreen" />;
}