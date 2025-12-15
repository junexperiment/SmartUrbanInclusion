// --- app/VoiceControlModal.js ---
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const VoiceControlModal = ({ isVisible, systemMessage, isListening, startListening, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    
                    {/* Close Button (Exit the modal) */}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>

                    {/* System Feedback (Text-to-Speech Output) */}
                    <Text style={styles.feedbackHeader}>
                        {systemMessage || "Good Evening Jun, my name is Smart, and I am your Voice control"}
                    </Text>

                    {/* Microphone Button (Click/Hold) */}
                    <TouchableOpacity 
                        style={[styles.micButton, isListening && styles.micButtonListening]} 
                        onPressIn={startListening}
                        onPressOut={() => console.log('Listening stopped')} // Implement stop logic here
                    >
                        <Text style={styles.micIcon}>🎙️</Text>
                    </TouchableOpacity>
                    <Text style={styles.listenText}>{isListening ? "Speak Now..." : "Tap to Speak"}</Text>

                </View>
            </View>
        </Modal>
    );
};

// --- STYLING (To achieve the desired full-screen overlay) ---
const styles = StyleSheet.create({
    centeredView: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
    modalView: {
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: '70%',
    },
    closeButton: { position: 'absolute', top: 10, right: 10, padding: 10 },
    closeButtonText: { fontSize: 20, fontWeight: 'bold', color: '#666' },
    feedbackHeader: { fontSize: 18, fontWeight: '600', textAlign: 'center', marginVertical: 40 },
    micButton: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#FF7F47',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    micButtonListening: {
        backgroundColor: '#E9524A', 
        shadowColor: '#E9524A',
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 10,
    },
    micIcon: { fontSize: 50, color: 'white' },
    listenText: { marginTop: 20, fontSize: 16, color: '#333' }
});

export default VoiceControlModal;