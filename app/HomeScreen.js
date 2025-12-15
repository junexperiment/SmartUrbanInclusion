// --- app/HomeScreen.js ---
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// Import icons needed for the tiles and search bar
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import your VoiceControlModal component
import VoiceControlModal from './VoiceControlModal';
// NOTE: If you renamed it to _VoiceControlModal.js, update this line:
// import VoiceControlModal from './_VoiceControlModal'; 

// Placeholder for your custom hook (assuming it manages isVisible and systemMessage)
// If you are using a context or global state, you would adjust this hook call.
const useVoiceControl = ({ languageCode }) => ({
    isListening: false,
    isVisible: false, // Default to false
    systemMessage: "",
    startListening: () => console.log('Starting listening...'),
    onClose: () => console.log('Closing modal...'),
});

// Component for a Feature Tile (e.g., Essential Services)
const FeatureTile = ({ title, iconName, color, onPress }) => (
    <TouchableOpacity style={[styles.tile, { backgroundColor: '#F0F0F0' }]} onPress={onPress}>
        <MaterialCommunityIcons name={iconName} size={40} color={color} />
        <Text style={styles.tileText}>{title}</Text>
    </TouchableOpacity>
);

// Component for a Recent Activity Item
const RecentActivityItem = ({ title, iconName, color, timeAgo }) => (
    <TouchableOpacity style={[styles.recentItem, { backgroundColor: color + '30' }]}>
        <MaterialCommunityIcons name={iconName} size={30} color={color} style={styles.recentIcon} />
        <Text style={styles.recentTitle}>{title}</Text>
        <Text style={[styles.recentTime, { color: color }]}>{timeAgo}</Text>
    </TouchableOpacity>
);


const HomeScreen = () => {
    const router = useRouter(); 
    // Initialize Voice Control State (assuming you have a hook like this)
    const voiceControlProps = useVoiceControl({ languageCode: 'en' });

    // Dummy data for the Recent Activities section
    const recentActivities = [
        { id: 1, title: 'Essential Services', iconName: 'clover', color: '#66bb6a', timeAgo: '29 Min Ago' },
        { id: 2, title: 'Digital Literacy', iconName: 'book-open-page-variant', color: '#546E7A', timeAgo: '59 Min Ago' },
    ];

    return (
        <View style={styles.container}>
            
            {/* 1. Header (Hi, Jun) */}
            <View style={styles.header}>
                <Text style={styles.greeting}>Hi, Jun</Text>
                <Text style={styles.subTitle}>Urban Access</Text>
            </View>

            {/* 2. Search Bar with Mic Icon */}
            <View style={styles.searchContainer}>
                <MaterialCommunityIcons name="magnify" size={24} color="#999" style={styles.searchIcon} />
                <TextInput 
                    style={styles.searchInput} 
                    placeholder="Search" 
                    placeholderTextColor="#999"
                />
                <TouchableOpacity onPress={voiceControlProps.startListening}>
                    <MaterialCommunityIcons name="microphone-outline" size={24} color="#666" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {/* 3. Feature Tiles Grid */}
                <View style={styles.tilesContainer}>
                    <FeatureTile 
                        title="Essential Services" 
                        iconName="clover" 
                        color="#66bb6a" // Green
                        onPress={() => router.push('EssentialServicesScreen')} 
                    />
                    <FeatureTile 
                        title="Report an Issue" 
                        iconName="alert-decagram-outline" 
                        color="#e57373" // Red
                        onPress={() => router.push('ReportFlow')} 
                    />
                    <FeatureTile 
                        title="Digital Literacy" 
                        iconName="book-open-page-variant" 
                        color="#546E7A" // Dark Blue/Gray
                        onPress={() => router.push('DigitalLiteracyScreen')} 
                    />
                    <FeatureTile 
                        title="Community Hub" 
                        iconName="city" 
                        color="#757575" // Gray
                        onPress={() => router.push('CommunityHubScreen')} 
                    />
                </View>

                {/* 4. Recent Activities Section */}
                <Text style={styles.recentHeader}>Recent Activities</Text>
                <View style={styles.recentActivitiesContainer}>
                    {recentActivities.map(activity => (
                        <RecentActivityItem
                            key={activity.id}
                            title={activity.title}
                            iconName={activity.iconName}
                            color={activity.color}
                            timeAgo={activity.timeAgo}
                        />
                    ))}
                </View>

            </ScrollView>

            {/* 5. Voice Control Modal (Hidden until triggered) */}
            <VoiceControlModal {...voiceControlProps} />
        </View>
    );
};


// --- STYLING ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        paddingTop: 50, // Added padding for status bar area
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    header: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    greeting: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    subTitle: {
        fontSize: 16,
        color: '#777',
    },
    
    // Search Bar Styles
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginHorizontal: 20,
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        padding: 0, // Remove default padding
    },

    // Feature Tiles Grid Styles
    tilesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    tile: {
        width: '48%', // For a 2x2 grid
        height: 150,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    tileText: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        color: '#444',
    },

    // Recent Activities Styles
    recentHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    recentActivitiesContainer: {
        // Items stack vertically by default
    },
    recentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    recentIcon: {
        marginRight: 15,
        // The background color of the icon itself is handled by the tile's color
    },
    recentTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    recentTime: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default HomeScreen;