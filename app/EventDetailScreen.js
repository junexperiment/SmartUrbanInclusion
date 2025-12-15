// --- app/EventDetailScreen.js ---
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'; // Removed Image import

// NOTE: The image import has been REMOVED as requested.

const EventDetailScreen = () => {
    const router = useRouter(); 
    
    // Get parameters passed from CommunityHubScreen (or use defaults)
    const { 
        id = 1,
        title = 'Accessibility Town Hall 2025', 
        date = 'Tuesday, March 14, 2025',
        time = '10:00 AM - 12:00 PM',
        location = 'City Hall Auditorium, 123 Main St.',
        description = "Join city officials to discuss the future of urban accessibility. Share your feedback on pedestrian pathways, public transport, and new city initiatives designed to make our community inclusive for everyone. Light refreshments will be provided. All community members are welcome.",
        organizer = 'Urban Planning Department'
    } = useLocalSearchParams(); 

    const handleRegister = () => {
        console.log(`Registering for event: ${title}`);
        alert(`You have successfully registered for: ${title}`);
        // In a real app, you would submit registration data here
    };

    return (
        <View style={styles.container}>
            
            {/* ScrollView for Content */}
            <ScrollView style={styles.contentScroll}>
                
                {/* 1. Header Image Section (Now a colored placeholder View) */}
                <View style={[styles.imageContainer, styles.imagePlaceholder]}> 
                    <Text style={styles.placeholderText}>[Event Image Placeholder]</Text>
                    
                    {/* Floating Back Button */}
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                    </TouchableOpacity>
                </View>

                {/* 2. Event Details */}
                <View style={styles.detailsContainer}>
                    
                    <Text style={styles.eventTitle}>{title}</Text>
                    
                    <Text style={styles.sectionHeader}>Details</Text>

                    {/* Date and Time */}
                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="calendar-clock" size={20} color="#FF7F47" />
                        <View>
                            <Text style={styles.infoText}>{date}</Text>
                            <Text style={styles.infoText}>{time}</Text>
                        </View>
                    </View>
                    
                    {/* Location */}
                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="map-marker" size={20} color="#FF7F47" />
                        <Text style={styles.infoText}>{location}</Text>
                    </View>
                    
                    {/* Organizer */}
                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="account-group" size={20} color="#FF7F47" />
                        <Text style={styles.infoText}>Organized by: {organizer}</Text>
                    </View>

                    <Text style={styles.sectionHeader}>About the Event</Text>
                    <Text style={styles.descriptionText}>{description}</Text>
                    
                </View>
                {/* Spacer to allow scrolling above the fixed footer */}
                <View style={{ height: 100 }} /> 
            </ScrollView>

            {/* 3. Fixed Footer (Registration Button) */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                    <Text style={styles.registerButtonText}>Register Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


// --- STYLING (Updated styles for placeholder) ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    contentScroll: {
        flex: 1,
    },
    // 1. Header Image Styles
    imageContainer: {
        width: '100%',
        height: 250, // Fixed height for the header image area
        position: 'relative',
        justifyContent: 'center', // Center placeholder text
        alignItems: 'center',    // Center placeholder text
    },
    // NEW Style for placeholder background
    imagePlaceholder: {
        backgroundColor: '#DDD', // Neutral gray background
    },
    placeholderText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '500',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 20,
        zIndex: 10,
    },

    // 2. Details Section Styles
    detailsContainer: {
        backgroundColor: '#FFF',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20, // Pulls the content up over the image
    },
    eventTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
        marginTop: 15,
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 15,
        paddingLeft: 5,
    },
    infoText: {
        fontSize: 16,
        color: '#666',
        marginLeft: 15,
        flex: 1,
    },
    descriptionText: {
        fontSize: 16,
        color: '#444',
        lineHeight: 24,
    },

    // 3. Footer/Registration Button
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        paddingBottom: 30, // Extra space for home bar area
    },
    registerButton: {
        backgroundColor: '#FF7F47',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    registerButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default EventDetailScreen;