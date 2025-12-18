// --- app/SettingsScreen.js ---
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

// --- Component for a Single Settings Row ---
const SettingsRow = ({ iconName, label, type = 'link', value, onToggle, onPress, isLast }) => {
    const RowComponent = type === 'link' ? TouchableOpacity : View;

    return (
        <RowComponent style={[styles.settingsRow, isLast && styles.noBorder]} onPress={onPress}>
            <View style={styles.rowLeft}>
                <MaterialCommunityIcons name={iconName} size={24} color="#FF7F47" style={styles.rowIcon} />
                <Text style={styles.rowLabel}>{label}</Text>
            </View>
            
            {/* Right side content */}
            {type === 'link' && <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />}
            {type === 'toggle' && (
                <Switch
                    trackColor={{ false: '#767577', true: '#FF7F47' }}
                    thumbColor="#FFF"
                    ios_backgroundColor="#767577"
                    onValueChange={onToggle}
                    value={value}
                />
            )}
        </RowComponent>
    );
};

const SettingsScreen = () => {
    const router = useRouter(); 
    
    // States for toggles
    const [isLocationEnabled, setIsLocationEnabled] = useState(false);
    const [isVoiceControlEnabled, setIsVoiceControlEnabled] = useState(false);

    // FIX: Automatically reset the voice switch when the user navigates back
    useFocusEffect(
        useCallback(() => {
            setIsVoiceControlEnabled(false);
        }, [])
    );

    const handleVoiceToggle = (value) => {
        setIsVoiceControlEnabled(value);
        if (value) {
            // Trigger the voice modal screen
            router.push('VoiceControlModal');
        }
    };

    const handleNavigation = (screenName) => {
        router.push(screenName);
    };

    return (
        <View style={styles.container}>
            
            {/* 1. Custom Header */}
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.screenTitle}>Settings</Text>
                <View style={styles.spacer} /> 
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {/* ACCOUNT Section */}
                <Text style={styles.sectionHeader}>Account</Text>
                <SettingsRow 
                    iconName="account-edit" 
                    label="Edit Profile" 
                    type="link"
                    onPress={() => console.log('Edit Profile')}
                />
                <SettingsRow 
                    iconName="lock" 
                    label="Change Password" 
                    type="link"
                    onPress={() => console.log('Change Password')}
                    isLast={true} 
                />

                {/* ACCESSIBILITY Section */}
                <Text style={styles.sectionHeader}>Accessibility</Text>
                <SettingsRow 
                    iconName="web" 
                    label="Language" 
                    type="link"
                    onPress={() => handleNavigation('LanguageSettingsScreen')}
                />
                <SettingsRow 
                    iconName="moon-waning-gibbous" 
                    label="Appearance / Theme" 
                    type="link"
                    onPress={() => handleNavigation('AppearanceSettingsScreen')}
                />
                <SettingsRow 
                    iconName="map-marker" 
                    label="Location" 
                    type="toggle"
                    value={isLocationEnabled}
                    onToggle={setIsLocationEnabled}
                />
                
                {/* Voice Control Toggle */}
                <SettingsRow 
                    iconName="microphone" 
                    label="Voice Control" 
                    type="toggle"
                    value={isVoiceControlEnabled}
                    onToggle={handleVoiceToggle}
                    isLast={true} 
                />

                {/* PRIVACY & SECURITY Section */}
                <Text style={styles.sectionHeader}>Privacy & Security</Text>
                <SettingsRow 
                    iconName="shield-lock" 
                    label="Privacy Settings" 
                    type="link"
                    onPress={() => console.log('Privacy Settings')}
                />
                <SettingsRow 
                    iconName="database" 
                    label="Manage Data" 
                    type="link"
                    onPress={() => console.log('Manage Data')}
                    isLast={true} 
                />

                {/* SUPPORT & LEGAL Section */}
                <Text style={styles.sectionHeader}>Support & Legal</Text>
                <SettingsRow 
                    iconName="help-circle" 
                    label="Help & Support" 
                    type="link"
                    onPress={() => console.log('Help & Support')}
                    isLast={true} 
                />
            
            </ScrollView>
        </View>
    );
};

// --- STYLING (To match image_7cc6dc.png) ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    customHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 15,
        paddingBottom: 15,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    headerButton: {
        padding: 5,
        marginRight: 15,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    spacer: {
        flex: 1, 
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100, 
        paddingTop: 10,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
        marginTop: 25,
        marginBottom: 10,
    },
    settingsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    noBorder: {
        borderBottomWidth: 0,
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowIcon: {
        marginRight: 15,
    },
    rowLabel: {
        fontSize: 16,
        color: '#333',
    },
});

export default SettingsScreen;