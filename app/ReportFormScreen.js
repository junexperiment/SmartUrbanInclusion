// --- app/ReportFormScreen.js ---
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ReportFormScreen = () => {
    const router = useRouter(); 
    
    // Get parameters passed from ReportFlow.js (e.g., type: 'Incident', 'Inaccessibility')
    const { type = 'General Incident' } = useLocalSearchParams(); 

    // State for form inputs
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('Current Location (Simulated)');
    const [photoStatus, setPhotoStatus] = useState(null); // 'taken', 'none'

    const handlePhotoCapture = () => {
        console.log('Opening camera/gallery...');
        // Placeholder for camera/gallery integration
        setPhotoStatus('taken'); 
    };

    const handleSubmitReport = () => {
        if (description.length < 10) {
            alert('Please provide a more detailed description.');
            return;
        }
        console.log(`Submitting report of type: ${type}`);
        
        // Navigate to the Confirmation Screen, replacing the current screen in history
        router.replace('ReportConfirmationScreen'); 
    };

    return (
        <View style={styles.container}>
            
            {/* 1. Custom Header */}
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <View style={styles.headerTitleWrapper}>
                    <Text style={styles.headerTitle}>{type} Report</Text>
                </View>
                <TouchableOpacity onPress={() => console.log('Notifications')} style={styles.headerButton}>
                    <MaterialCommunityIcons name="bell-outline" size={24} color="#777" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                <Text style={styles.sectionHeader}>Incident Details</Text>
                
                {/* 2. Photo/Media Capture Section */}
                <Text style={styles.label}>Photo/Video Evidence</Text>
                <TouchableOpacity 
                    style={styles.mediaButton} 
                    onPress={handlePhotoCapture}
                >
                    <MaterialCommunityIcons 
                        name={photoStatus === 'taken' ? 'check-circle' : 'camera-plus'} 
                        size={30} 
                        color={photoStatus === 'taken' ? '#4CAF50' : '#FF7F47'} 
                    />
                    <Text style={[styles.mediaText, photoStatus === 'taken' && {color: '#4CAF50'}]}>
                        {photoStatus === 'taken' ? 'Photo Captured' : 'Tap to Add Photo/Video'}
                    </Text>
                </TouchableOpacity>

                {/* 3. Location/Map */}
                <Text style={styles.label}>Location of Incident</Text>
                <View style={styles.locationContainer}>
                    <MaterialCommunityIcons name="map-marker" size={20} color="#E57373" />
                    <Text style={styles.locationText}>{location}</Text>
                    <TouchableOpacity onPress={() => console.log('Open Map')}>
                        <Text style={styles.changeLink}>Change</Text>
                    </TouchableOpacity>
                </View>

                {/* 4. Description Input */}
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={styles.descriptionInput}
                    placeholder="Describe the incident, including when it occurred and any people involved."
                    placeholderTextColor="#999"
                    multiline={true}
                    numberOfLines={6}
                    value={description}
                    onChangeText={setDescription}
                />

                {/* 5. Submission Button */}
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReport}>
                    <Text style={styles.submitButtonText}>Submit Report</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};


// --- STYLING ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    // Custom Header
    customHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 15,
        paddingBottom: 15,
        backgroundColor: '#FFF',
    },
    headerButton: {
        padding: 5,
    },
    headerTitleWrapper: {
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    headerTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#444',
    },
    
    // Form Styles
    sectionHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E9524A', // Reddish accent
        marginVertical: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#444',
        marginBottom: 8,
        marginTop: 15,
    },
    
    // Media Button
    mediaButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderWidth: 2,
        borderColor: '#FF7F47',
        borderStyle: 'dashed',
        borderRadius: 10,
        backgroundColor: '#FFF8F0', // Light orange background
    },
    mediaText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '600',
        color: '#FF7F47',
    },

    // Location Section
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#F7F7F7',
        borderRadius: 8,
    },
    locationText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    changeLink: {
        color: '#4285F4',
        fontWeight: '600',
    },

    // Description Input
    descriptionInput: {
        minHeight: 120,
        backgroundColor: '#F7F7F7',
        borderRadius: 8,
        padding: 15,
        textAlignVertical: 'top',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#EEE',
    },

    // Submit Button
    submitButton: {
        backgroundColor: '#FF7F47',
        padding: 18,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 30,
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ReportFormScreen;