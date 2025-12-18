// --- app/VoiceControlModal.js ---
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const VoiceControlModal = () => {
    const router = useRouter();
    const [isListening, setIsListening] = useState(false);

    // FIX: Instead of props, we use the router to dismiss the "modal"
    const handleClose = () => {
        router.back(); // This returns focus to SettingsScreen
    };

    const startListening = () => setIsListening(true);
    const stopListening = () => setIsListening(false);

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                
                {/* Close Button (Correctly linked to Router) */}
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                    <MaterialCommunityIcons name="close" size={28} color="#999" />
                </TouchableOpacity>

                {/* System Feedback */}
                <Text style={styles.feedbackHeader}>
                    Good Evening Jun, my name is Smart, and I am your Voice control
                </Text>

                {/* Microphone Button */}
                <TouchableOpacity 
                    style={[styles.micButton, isListening && styles.micButtonListening]} 
                    onPressIn={startListening}
                    onPressOut={stopListening}
                >
                    <MaterialCommunityIcons name="microphone" size={50} color="white" />
                </TouchableOpacity>
                
                <Text style={styles.listenText}>
                    {isListening ? "Speak Now..." : "Tap to Speak"}
                </Text>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: { 
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.8)', // Dims background like image
        justifyContent: 'flex-end' 
    },
    modalView: {
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 35,
        alignItems: 'center',
        height: '60%', // Matches the "pop-up" height from your screenshot
    },
    closeButton: { position: 'absolute', top: 20, right: 20, padding: 10 },
    feedbackHeader: { fontSize: 18, fontWeight: '600', textAlign: 'center', marginVertical: 40, color: '#333' },
    micButton: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#FF7F47', // Brand orange
        justifyContent: 'center',
        alignItems: 'center',
    },
    micButtonListening: {
        backgroundColor: '#E9524A', 
        transform: [{ scale: 1.1 }],
    },
    listenText: { marginTop: 20, fontSize: 16, color: '#666', fontWeight: '500' }
});

export default VoiceControlModal;