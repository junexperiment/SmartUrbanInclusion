// --- app/LanguageSettingsScreen.js ---
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// --- UPDATED Language Data (Using Flag Emojis) ---
const languageData = [
    // Note: Emojis are used for flags as icon libraries often lack comprehensive country flags.
    { id: 'en', name: 'English', flag: '🇬🇧' }, // UK Flag for English
    { id: 'es', name: 'Spanish', flag: '🇪🇸' }, // Spain Flag
    { id: 'fr', name: 'French', flag: '🇫🇷' }, // France Flag
    { id: 'de', name: 'German', flag: '🇩🇪' }, // Germany Flag
    { id: 'hi', name: 'Hindi', flag: '🇮🇳' }, // India Flag
    { id: 'ko', name: 'Korean', flag: '🇰🇷' }, // Korea Flag
    // Add more languages as needed
];

// --- Component for a single Language Row ---
const LanguageRow = ({ language, isSelected, onPress }) => (
    <TouchableOpacity 
        style={[styles.languageRow, isSelected && styles.selectedRow]} 
        onPress={() => onPress(language)}
    >
        {/* FIX: Use Text component to display the emoji flag */}
        <Text style={styles.flagEmoji}>{language.flag}</Text> 
        
        <Text style={styles.languageText}>{language.name}</Text>
        
        {/* Checkmark */}
        {isSelected && (
            <MaterialCommunityIcons name="check-circle" size={20} color="#00C897" />
        )}
    </TouchableOpacity>
);


const LanguageSettingsScreen = () => {
    const router = useRouter(); 
    
    // Initial state setup
    const [selectedLanguageId, setSelectedLanguageId] = useState('en');
    const [searchText, setSearchText] = useState('');

    const selectedLanguage = languageData.find(lang => lang.id === selectedLanguageId);

    const handleLanguageSelect = (language) => {
        setSelectedLanguageId(language.id);
    };

    const filteredLanguages = languageData.filter(lang => 
        lang.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleContinue = () => {
        console.log(`Setting application language to: ${selectedLanguage.name}`);
        router.back(); 
    };

    return (
        <View style={styles.container}>
            
            {/* 1. Custom Header */}
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.screenTitle}>language</Text>
                <View style={styles.spacer} /> 
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                <Text style={styles.introHeader}>Choose the language</Text>
                <Text style={styles.introSubtext}>
                    Select your preferred language below This helps us serve you better.
                </Text>

                {/* 2. You Selected Highlight */}
                <Text style={styles.sectionHeader}>You Selected</Text>
                <TouchableOpacity style={[styles.youSelectedContainer, styles.selectedRow]} disabled>
                    {/* FIX: Use Text component for the flag */}
                    <Text style={styles.flagEmoji}>{selectedLanguage.flag}</Text>
                    <Text style={styles.languageText}>{selectedLanguage.name}</Text>
                    <MaterialCommunityIcons name="check-circle" size={20} color="#00C897" />
                </TouchableOpacity>

                <Text style={styles.sectionHeader}>All Languages</Text>

                {/* 3. Search Bar */}
                <View style={styles.searchContainer}>
                    <MaterialCommunityIcons name="magnify" size={20} color="#999" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor="#999"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>

                {/* 4. Language List */}
                {filteredLanguages.map(lang => (
                    <LanguageRow
                        key={lang.id}
                        language={lang}
                        isSelected={lang.id === selectedLanguageId}
                        onPress={handleLanguageSelect}
                    />
                ))}

            </ScrollView>
            
            {/* 5. Fixed Footer (Continue Button) */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


// --- STYLING (Updated to include flagEmoji style) ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
    customHeader: { flexDirection: 'row', alignItems: 'center', paddingTop: 50, paddingHorizontal: 15, paddingBottom: 15, backgroundColor: '#FFF' },
    headerButton: { padding: 5, marginRight: 15 },
    screenTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', textTransform: 'uppercase' },
    spacer: { flex: 1 },
    introHeader: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 5, paddingHorizontal: 5 },
    introSubtext: { fontSize: 14, color: '#666', marginBottom: 20, paddingHorizontal: 5 },
    sectionHeader: { fontSize: 16, fontWeight: 'bold', color: '#333', marginTop: 15, marginBottom: 10 },
    youSelectedContainer: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 10, marginBottom: 20 },
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 15, marginBottom: 20 },
    searchInput: { flex: 1, fontSize: 16, marginLeft: 10 },
    languageRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#EEE' },
    selectedRow: { backgroundColor: '#E6F7FF', borderWidth: 1, borderColor: '#00C897', borderRadius: 10, marginBottom: 5, marginTop: 5 },
    // NEW style for flag emoji sizing
    flagEmoji: { fontSize: 24, marginRight: 15, },
    languageText: { flex: 1, fontSize: 16, color: '#333' },
    footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#EEE' },
    continueButton: { backgroundColor: '#00C897', padding: 15, borderRadius: 30, alignItems: 'center' },
    continueButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});

export default LanguageSettingsScreen;