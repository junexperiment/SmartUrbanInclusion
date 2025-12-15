// --- app/ProfileScreen.js ---
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

const AVATAR_ICON = 'account-circle'; 

// --- Component for a Single Settings Row (Unchanged) ---
const SettingsRow = ({ iconName, label, type = 'link', value, onToggle, onPress, isLast, colors }) => {
    const RowComponent = type === 'link' ? TouchableOpacity : View;

    return (
        <RowComponent style={[styles.settingsRow, isLast && styles.noBorder, { backgroundColor: colors.card }]} onPress={onPress}>
            <View style={styles.rowLeft}>
                <MaterialCommunityIcons name={iconName} size={24} color={colors.accent} style={styles.rowIcon} />
                <Text style={[styles.rowLabel, { color: colors.text }]}>{label}</Text>
            </View>
            
            {type === 'link' && <MaterialCommunityIcons name="chevron-right" size={24} color={colors.subText} />}
            {type === 'toggle' && (
                <Switch
                    trackColor={{ false: colors.toggleOff, true: colors.accent }}
                    thumbColor={colors.thumb}
                    ios_backgroundColor={colors.toggleOff}
                    onValueChange={onToggle}
                    value={value}
                />
            )}
        </RowComponent>
    );
};


const ProfileScreen = () => {
    const router = useRouter(); 
    
    // State for toggles
    const [isLocationEnabled, setIsLocationEnabled] = useState(true);
    const [isPushEnabled, setIsPushEnabled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false); 

    // Dynamic Color Palette
    const colors = {
        background: isDarkMode ? '#1C1C1E' : '#F5F5F5',
        text: isDarkMode ? '#FFFFFF' : '#333333',
        subText: isDarkMode ? '#A0A0A0' : '#666666',
        card: isDarkMode ? '#2C2C2C' : '#FFFFFF',
        header: isDarkMode ? '#FF5733' : '#FF7F47', 
        accent: '#FF7F47',
        toggleOff: isDarkMode ? '#38383A' : '#767577',
        thumb: '#FFF',
    };

    const handleNavigation = (screenName) => {
        router.push(screenName);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            
            {/* 1. Header Section */}
            <View style={[styles.header, { backgroundColor: colors.header }]}>
                <Text style={[styles.profileTitle, { color: colors.thumb }]}>Profile</Text>
                <View style={styles.userInfo}>
                    <MaterialCommunityIcons name={AVATAR_ICON} size={80} color={colors.thumb} style={styles.avatar} />
                    <View style={styles.userText}>
                        <Text style={[styles.userName, { color: colors.thumb }]}>Jun</Text>
                        <Text style={[styles.userEmail, { color: colors.thumb, opacity: 0.8 }]}>Jun@gmail.com</Text>
                    </View>
                </View>
            </View>

            {/* 2. Settings Content */}
            <ScrollView style={styles.settingsScroll} contentContainerStyle={[styles.scrollContent, { backgroundColor: colors.card }]}>
                
                {/* Preferences Section */}
                <Text style={[styles.sectionHeader, { color: colors.text }]}>Preferences</Text>
                
                <SettingsRow 
                    iconName="map-marker" 
                    label="Location" 
                    type="toggle" 
                    value={isLocationEnabled} 
                    onToggle={setIsLocationEnabled} 
                    colors={colors}
                />
                
                <SettingsRow 
                    iconName="web" 
                    label="Language" 
                    type="link"
                    // FIX: Changed navigation target to LanguageSettingsScreen
                    onPress={() => handleNavigation('LanguageSettingsScreen')} 
                    colors={colors}
                />
                
                <SettingsRow 
                    iconName="bell" 
                    label="Push Notifications" 
                    type="toggle" 
                    value={isPushEnabled} 
                    onToggle={setIsPushEnabled} 
                    colors={colors}
                />
                
                <SettingsRow 
                    iconName="moon-waning-gibbous" 
                    label="Dark Mode" 
                    type="toggle"
                    value={isDarkMode}
                    onToggle={setIsDarkMode} 
                    isLast={true}
                    colors={colors}
                />
                
                {/* Other Section */}
                <Text style={[styles.sectionHeader, { color: colors.text }]}>Other</Text>
                
                <SettingsRow 
                    iconName="cog" 
                    label="Settings" 
                    type="link" 
                    // This still navigates to the general Settings detail screen
                    onPress={() => handleNavigation('SettingsScreen')} 
                    colors={colors}
                />
                <SettingsRow 
                    iconName="help-circle" label="Help Center" type="link" onPress={() => console.log('Open Help Center')} colors={colors}
                />
                <SettingsRow 
                    iconName="logout" label="Logout" type="link" onPress={() => console.log('User Logged Out')} isLast={true} colors={colors}
                />
            
            </ScrollView>
            
            <View style={[styles.bottomNavPlaceholder, { backgroundColor: colors.card }]} />
        </View>
    );
};


// --- STYLING (Unchanged) ---
const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        paddingTop: 50,
        paddingHorizontal: 30,
        paddingBottom: 40,
        height: 250, 
    },
    profileTitle: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
    userInfo: { flexDirection: 'row', alignItems: 'center' },
    avatar: { borderRadius: 40, backgroundColor: 'transparent', marginRight: 15 },
    userText: { justifyContent: 'center' },
    userName: { fontSize: 22, fontWeight: 'bold' },
    userEmail: { fontSize: 16 },
    settingsScroll: { flex: 1, marginTop: -30 },
    scrollContent: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 30,
        paddingHorizontal: 20,
        paddingBottom: 40, 
    },
    sectionHeader: { fontSize: 20, fontWeight: 'bold', marginTop: 10, marginBottom: 15 },
    settingsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#33333330',
    },
    noBorder: { borderBottomWidth: 0 },
    rowLeft: { flexDirection: 'row', alignItems: 'center' },
    rowIcon: { marginRight: 15 },
    rowLabel: { fontSize: 16 },
    bottomNavPlaceholder: { height: 80 },
});

export default ProfileScreen;