// --- app/_layout.js ---
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function RootLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#FF7F47', 
                tabBarStyle: {
                    height: 60, 
                    paddingBottom: 5,
                }
            }}
        >
            {/* 1. Home Tab (Visible) */}
            <Tabs.Screen 
                name="HomeScreen" 
                options={{ 
                    title: 'Home', 
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }} 
            />
            
            {/* 2. Profile Tab (Visible) */}
            <Tabs.Screen 
                name="ProfileScreen" 
                options={{ 
                    title: 'Profile', 
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }} 
            />

            {/* 3. HIDDEN SCREENS (Accessed via router.push) */}
            
            <Tabs.Screen name="index" options={{ href: null }} /> 
            
            <Tabs.Screen 
                name="WelcomeScreen" 
                options={{ 
                    href: null,
                    tabBarStyle: { display: 'none' }
                }} 
            />
            
            <Tabs.Screen 
                name="AuthScreen" 
                options={{ 
                    href: null,
                    tabBarStyle: { display: 'none' }
                }} 
            />

            <Tabs.Screen name="VoiceControlModal" options={{ href: null }} />
            
            {/* Essential Services */}
            <Tabs.Screen name="EssentialServicesScreen" options={{ href: null }} />
            <Tabs.Screen name="ServiceMapScreen" options={{ href: null }} />
            
            {/* Report Flow */}
            <Tabs.Screen name="ReportFlow" options={{ href: null }} />
            <Tabs.Screen name="ReportFormScreen" options={{ href: null }} />
            <Tabs.Screen name="ReportConfirmationScreen" options={{ href: null }} />
            <Tabs.Screen name="ReportHistoryScreen" options={{ href: null }} />
            
            {/* Community Hub */}
            <Tabs.Screen name="CommunityHubScreen" options={{ href: null }} />
            <Tabs.Screen name="EventDetailScreen" options={{ href: null }} />

            {/* Digital Literacy */}
            <Tabs.Screen name="DigitalLiteracyScreen" options={{ href: null }} />

            {/* Settings Detail Screens */}
            <Tabs.Screen name="SettingsScreen" options={{ href: null }} /> 
            <Tabs.Screen name="AppearanceSettingsScreen" options={{ href: null }} />
            <Tabs.Screen name="LanguageSettingsScreen" options={{ href: null }} />

        </Tabs>
    );
}