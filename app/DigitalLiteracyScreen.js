// --- app/DigitalLiteracyScreen.js ---
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const TUTORIAL_IMAGE = require('./tutorial-video.jpg'); 

// --- Component for a Quick Access Topic Tile ---
const TopicTile = ({ title, onPress }) => (
    <TouchableOpacity style={styles.tile} onPress={onPress}>
        <Text style={styles.tileText}>{title}</Text>
    </TouchableOpacity>
);

const DigitalLiteracyScreen = () => {
    const router = useRouter(); 

    // Function to handle tile press (placeholder for navigation to content)
    const handleTopicPress = (topic) => {
        console.log(`Navigating to topic: ${topic}`);
    };

    return (
        <View style={styles.container}>
            
            {/* 1. Custom Header (Back Button, Title, Notification) */}
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <View style={styles.headerTitleWrapper}>
                    <Text style={styles.headerTitle}>Digital Literacy</Text>
                </View>
                <TouchableOpacity onPress={() => console.log('Notifications')} style={styles.headerButton}>
                    <MaterialCommunityIcons name="bell-outline" size={24} color="#777" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                <Text style={styles.introText}>
                    Smart Urban Inclusion Platform (Onboarding guide)
                </Text>

                {/* 2. Search Bar */}
                <View style={styles.searchContainer}>
                    <MaterialCommunityIcons name="magnify" size={20} color="#777" style={styles.searchIcon} />
                    <TextInput 
                        style={styles.searchInput} 
                        placeholder="Search" 
                        placeholderTextColor="#777"
                    />
                </View>

                {/* 3. Main Tutorial Video Image (Clickable) */}
                <TouchableOpacity style={styles.tutorialContainer} onPress={() => console.log('Play Tutorial Video')}>
                    <Image 
                        source={TUTORIAL_IMAGE} 
                        style={styles.tutorialImage} 
                        resizeMode="cover"
                    />
                </TouchableOpacity>

                {/* 4. Quick Access Topic Tiles (3-column layout) */}
                <View style={styles.tilesContainer}>
                    <TopicTile 
                        title="Digital Safety" 
                        onPress={() => handleTopicPress('Digital Safety')} 
                    />
                    <TopicTile 
                        title="How To Use Smart Urban Inclusion Platform" 
                        onPress={() => handleTopicPress('Platform Usage')} 
                    />
                    <TopicTile 
                        title="Basic Digital Skills" 
                        onPress={() => handleTopicPress('Basic Skills')} 
                    />
                </View>

            </ScrollView>
        </View>
    );
};


// --- STYLING  ---
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
    
    introText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
        marginBottom: 20,
    },
    
    // Search Bar Styles (Reused from ReportFlow)
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F7F7', 
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginBottom: 25,
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

    // Tutorial Image/Video Placeholder
    tutorialContainer: {
        marginBottom: 30,
        borderRadius: 15,
        overflow: 'hidden',
        // Shadow for visual depth (Optional)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    tutorialImage: {
        width: '100%',
        height: 180, // Fixed height to match the size in the screenshot
    },
    
    // Quick Access Topic Tiles (3-column layout)
    tilesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    tile: {
        width: '31%', // For a 3-column layout
        height: 120,
        backgroundColor: '#FFF', 
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        padding: 8,
        borderWidth: 1,
        borderColor: '#EEE',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    tileText: {
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
});

export default DigitalLiteracyScreen;