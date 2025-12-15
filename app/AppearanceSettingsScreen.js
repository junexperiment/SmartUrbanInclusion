// --- app/AppearanceSettingsScreen.js ---
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
// Import the Slider component
import Slider from '@react-native-community/slider';

// --- Component for a Settings Card/Container ---
const SettingsCard = ({ children, style }) => (
    <View style={[styles.card, style]}>
        {children}
    </View>
);

const AppearanceSettingsScreen = () => {
    const router = useRouter(); 
    
    // State to manage the dark mode toggle
    const [isDarkMode, setIsDarkMode] = useState(true); 
    const [isA11yMode, setIsA11yMode] = useState(false);
    
    // State for the font scale slider: Min (0.5), Max (1.5), Initial (1.0 = 100%)
    // The current design shows 'Scale: 50%', so we'll initialize the UI value to 0.5.
    const [scaleFactor, setScaleFactor] = useState(0.5); 

    const toggleDarkMode = () => setIsDarkMode(previousState => !previousState);

    // Dynamic styles based on Dark Mode state
    const colors = {
        background: isDarkMode ? '#1E1E1E' : '#F5F5F5',
        text: isDarkMode ? '#E0E0E0' : '#333333',     
        card: isDarkMode ? '#2C2C2C' : '#FFFFFF',     
        accent: '#FF7F47',
    };

    // Calculate the display percentage for the label
    const displayScalePercent = Math.round(scaleFactor * 100);
    
    // Calculate the scaled font size for the sample text
    // Base size is 18, scaled by the factor (e.g., 18 * 0.5 = 9, 18 * 1.5 = 27)
    const scaledFontSize = 18 * scaleFactor; 

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            
            {/* 1. Custom Header */}
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={[styles.screenTitle, { color: colors.text }]}>Appearance</Text>
                <View style={styles.spacer} /> 
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Settings Card */}
                <SettingsCard style={{ backgroundColor: colors.card }}>
                    
                    {/* Scale Section (Functional Slider) */}
                    <View style={styles.row}>
                        <Text style={[styles.scaleLabel, { color: colors.text }]}>
                            Scale Font Size: {displayScalePercent}%
                        </Text>
                    </View>
                    <Slider
                        style={styles.slider}
                        minimumValue={0.5} // Minimum scale (50%)
                        maximumValue={1.5} // Maximum scale (150%)
                        step={0.05}        // Increment by 5% steps
                        value={scaleFactor}
                        onValueChange={setScaleFactor}
                        minimumTrackTintColor={colors.accent}
                        maximumTrackTintColor={colors.text + '50'} // Slightly transparent text color
                        thumbTintColor={colors.accent}
                    />


                    {/* Dark Mode Toggle */}
                    <View style={[styles.row, styles.noBottomBorder]}>
                        <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: colors.accent }}
                            thumbColor={colors.card}
                            ios_backgroundColor="#767577"
                            onValueChange={toggleDarkMode}
                            value={isDarkMode}
                        />
                    </View>
                    
                    {/* Accessibility Mode Toggle */}
                    <View style={styles.row}>
                        <Text style={[styles.settingLabel, { color: colors.text }]}>High Contrast Mode</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#4CAF50' }}
                            thumbColor={colors.card}
                            ios_backgroundColor="#767577"
                            onValueChange={setIsA11yMode}
                            value={isA11yMode}
                        />
                    </View>

                </SettingsCard>

                {/* Sample Text Section - Font size is dynamic */}
                <Text style={[styles.sampleText, { color: colors.text, fontSize: scaledFontSize }]}>
                    This is sample text to show the currently selected font size scaling across the 
                    Application. The text size updates live as you drag the slider above.
                </Text>

            </ScrollView>
            
            {/* Bottom Nav Placeholder (Kept for layout consistency) */}
            <View style={styles.bottomNavPlaceholder} />
        </View>
    );
};


// --- STYLING ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 40,
    },
    // Header Styles
    customHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'transparent',
    },
    headerButton: {
        padding: 5,
        marginRight: 10,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    spacer: {
        flex: 1, 
    },
    // Card Styles
    card: {
        borderRadius: 15,
        padding: 20,
        marginBottom: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        // Removed borderBottomWidth to clean up the look after removing the static bar
    },
    noBottomBorder: {
         borderBottomWidth: 0,
         paddingTop: 15,
    },
    // Setting Labels
    scaleLabel: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
    },
    settingLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    // Slider Style
    slider: {
        width: '100%',
        height: 40,
        // The original design had the slider extending past the text line
        marginVertical: 5, 
    },
    // Sample Text
    sampleText: {
        // Font size is set dynamically in the component
        lineHeight: 28,
        padding: 10,
        minHeight: 150, // Ensure block stays visible for large text
    },
    // Bottom Nav Placeholder 
    bottomNavPlaceholder: {
        height: 60,
    }
});

export default AppearanceSettingsScreen;