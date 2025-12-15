// --- app/AuthScreen.js ---
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// [Temporary Placeholder for Flag Image Component]
const FlagComponent = () => (
    <View style={styles.flagPlaceholder}>
        <Text style={styles.flagText}>🇬🇧</Text>
    </View>
);

const AuthScreen = () => {
    const router = useRouter(); 
    
    const [isLogin, setIsLogin] = useState(true); 
    const [rememberMe, setRememberMe] = useState(false);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');

    const handleAuth = () => {
        router.replace('HomeScreen'); 
    };

    const handleLanguageSelect = () => {
        router.push('LanguageSettingsScreen'); 
    };
    
    const renderSocialButton = (iconName, platform) => (
        <TouchableOpacity 
            key={platform}
            style={styles.socialButton} 
            onPress={() => console.log(`Starting login with: ${platform}`)}
        >
            <MaterialCommunityIcons name={iconName} size={28} color="#444" />
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            
            {/* Custom Header for Language Icons and Back Button */}
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#FF7F47" />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLanguageSelect} style={styles.languageSelect}>
                    <MaterialCommunityIcons name="web" size={24} color="#FF7F47" style={styles.globeIcon} />
                    <FlagComponent />
                </TouchableOpacity>
            </View>
            
            {/* The Login/Sign Up Form Box */}
            <View style={styles.authBox}>
                
                {/* Header and Tab Toggle */}
                <Text style={styles.welcomeHeader}>{isLogin ? 'Welcome Back' : 'Join Us'}</Text>
                
                {/* REFINED TAB SWITCHER CONTAINER */}
                <View style={styles.tabBar}>
                    <TouchableOpacity 
                        style={[styles.tabButton, isLogin && styles.activeTabButton]} 
                        onPress={() => setIsLogin(true)}
                    >
                        <Text style={[styles.tabText, isLogin && styles.activeTabText]}>Login</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[styles.tabButton, !isLogin && styles.activeTabButton]} 
                        onPress={() => setIsLogin(false)}
                    >
                        <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                {/* Input Fields */}
                {!isLogin && (
                    <TextInput style={styles.input} placeholder="Enter Full Name" value={fullName} onChangeText={setFullName} />
                )}
                
                {/* Email Input with Microphone Icon */}
                <View style={styles.inputGroup}>
                    <MaterialCommunityIcons name="microphone-outline" size={20} color="#777" style={styles.micInputIcon} />
                    <TextInput 
                        style={styles.inputField} 
                        placeholder="Enter Email" 
                        value={email} 
                        onChangeText={setEmail} 
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                
                {/* Password Input with Microphone Icon */}
                <View style={styles.inputGroup}>
                    <MaterialCommunityIcons name="microphone-outline" size={20} color="#777" style={styles.micInputIcon} />
                    <TextInput 
                        style={styles.inputField} 
                        placeholder="Enter password" 
                        secureTextEntry={true} 
                        value={password} 
                        onChangeText={setPassword} 
                    />
                </View>

                {/* Remember Me and Forgot Password (Only shown on Login) */}
                {isLogin && (
                    <View style={styles.helperRow}>
                        <TouchableOpacity style={styles.checkboxContainer} onPress={() => setRememberMe(!rememberMe)}>
                            <MaterialCommunityIcons 
                                name={rememberMe ? "checkbox-marked" : "checkbox-blank-outline"} 
                                size={20} 
                                color={rememberMe ? "#FF7F47" : "#777"}
                            />
                            <Text style={styles.checkboxText}>Remember Me</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => console.log('Navigate to Forgot Password')}>
                            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Submission Button */}
                <TouchableOpacity style={styles.button} onPress={handleAuth}>
                    <Text style={styles.buttonText}>{isLogin ? 'Sign In' : 'Create Account'}</Text>
                </TouchableOpacity>

                {/* Or Divider */}
                <Text style={styles.orText}>Or</Text>
                
                {/* Social Login Buttons */}
                <View style={styles.socialContainer}>
                    {renderSocialButton('google', 'Google')}
                    {renderSocialButton('apple', 'Apple')}
                    {renderSocialButton('facebook', 'Facebook')}
                </View>
            </View>
        </ScrollView>
    );
};


// --- STYLING ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    scrollContent: { alignItems: 'center', flexGrow: 1, paddingBottom: 40, paddingTop: 0 },
    
    // Custom Header Styles
    customHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 10,
        backgroundColor: '#FFF',
    },
    languageSelect: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    globeIcon: {
        marginRight: 5,
    },
    flagPlaceholder: {
        width: 30, 
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        overflow: 'hidden',
        marginLeft: 5,
    },
    flagText: {
        fontSize: 18, 
    },
    backButton: {
        padding: 5,
    },

    // Auth Box Styles
    authBox: { 
        width: '100%', 
        backgroundColor: '#FFF', 
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    welcomeHeader: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 15 },
    
    // REFINED TAB SWITCHER STYLES
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#FFE9DF', 
        borderRadius: 30,
        marginBottom: 30,
        padding: 5,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: 'center',
    },
    activeTabButton: {
        backgroundColor: '#FFF', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    tabText: {
        fontSize: 16,
        color: '#FF7F47', 
        fontWeight: '500',
    },
    activeTabText: {
        color: '#FF7F47', 
        fontWeight: 'bold',
    },
    
    // REFINED INPUT STYLES (Group for Icon)
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F7F7', 
        borderRadius: 8, 
        marginBottom: 15, 
        borderWidth: 1, 
        borderColor: '#EEE',
        paddingHorizontal: 15,
    },
    micInputIcon: {
        marginRight: 10,
    },
    inputField: { 
        flex: 1,
        paddingVertical: 15,
    },

    // NEW HELPER ROW STYLES
    helperRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
        paddingHorizontal: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxText: {
        marginLeft: 5,
        fontSize: 14,
        color: '#777',
    },
    forgotPasswordText: {
        fontSize: 14,
        color: '#FF7F47',
        fontWeight: '600',
    },

    // Submission Button Styles
    button: { 
        backgroundColor: '#FF7F47', 
        padding: 15, 
        borderRadius: 30, 
        alignItems: 'center', 
        marginTop: 20,
        marginBottom: 10,
    },
    buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    
    // Or Divider
    orText: { textAlign: 'center', marginVertical: 15, color: '#666' },

    // Social Container Styles
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30,
        paddingHorizontal: 30,
    },
    socialButton: {
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 10,
        padding: 10,
        width: 60,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default AuthScreen;