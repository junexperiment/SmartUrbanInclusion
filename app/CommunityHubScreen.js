// --- app/CommunityHubScreen.js ---
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// --- Component for a single Event List Item ---
const EventListItem = ({ event, onPress }) => (
    <TouchableOpacity style={styles.eventCard} onPress={() => onPress(event)}>
        <View style={styles.cardIcon}>
            <MaterialCommunityIcons name="calendar-month-outline" size={30} color="#FF7F47" />
        </View>
        <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>{event.title}</Text>
            <Text style={styles.cardLocation}>
                <MaterialCommunityIcons name="map-marker-outline" size={14} color="#777" /> {event.location}
            </Text>
            <Text style={styles.cardDate}>
                <MaterialCommunityIcons name="clock-outline" size={14} color="#777" /> {event.date}
            </Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
    </TouchableOpacity>
);

const CommunityHubScreen = () => {
    const router = useRouter(); 

    // Dummy data for events
    const events = [
        { 
            id: 1, 
            title: 'Accessibility Town Hall 2025', 
            date: 'March 14, 2025', 
            time: '10:00 AM - 12:00 PM', 
            location: 'City Hall Auditorium',
            organizer: 'Urban Planning Department'
        },
        { 
            id: 2, 
            title: 'Digital Literacy Workshop', 
            date: 'April 5, 2025', 
            time: '2:00 PM - 4:00 PM', 
            location: 'Community Center, Room 2A',
            organizer: 'Tech for Seniors'
        },
        { 
            id: 3, 
            title: 'Local Park Clean-Up Day', 
            date: 'May 1, 2025', 
            time: '9:00 AM - 1:00 PM', 
            location: 'Sunset Park Entrance',
            organizer: 'Local Volunteers'
        },
    ];

    // Function to navigate to the Event Detail Screen
    const handleEventPress = (eventData) => {
        router.push({ 
            pathname: 'EventDetailScreen', 
            params: eventData // Pass all event details to the detail screen
        });
    };

    return (
        <View style={styles.container}>
            
            {/* 1. Custom Header */}
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <View style={styles.headerTitleWrapper}>
                    <Text style={styles.headerTitle}>Community Hub</Text>
                </View>
                <TouchableOpacity onPress={() => console.log('Notifications')} style={styles.headerButton}>
                    <MaterialCommunityIcons name="bell-outline" size={24} color="#777" />
                </TouchableOpacity>
            </View>

            {/* 2. Search Bar */}
            <View style={styles.searchContainer}>
                <MaterialCommunityIcons name="magnify" size={20} color="#999" style={styles.searchIcon} />
                <TextInput 
                    style={styles.searchInput} 
                    placeholder="Search Events or Organizations" 
                    placeholderTextColor="#999"
                />
            </View>

            {/* 3. Event List */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionHeader}>Upcoming Local Events</Text>
                {events.map((event) => (
                    <EventListItem key={event.id} event={event} onPress={handleEventPress} />
                ))}
            </ScrollView>
        </View>
    );
};


// --- STYLING ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
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
    // Search Bar Styles
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginHorizontal: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    // Event List Styles
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        paddingLeft: 5,
    },
    eventCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        borderLeftWidth: 5,
        borderLeftColor: '#FF7F47', // Accent color
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    cardIcon: {
        marginRight: 15,
        padding: 5,
    },
    cardTextContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    cardLocation: {
        fontSize: 13,
        color: '#777',
        marginBottom: 2,
    },
    cardDate: {
        fontSize: 13,
        color: '#777',
    }
});

export default CommunityHubScreen;