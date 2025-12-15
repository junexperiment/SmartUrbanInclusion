// --- app/EssentialServicesScreen.js ---
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'; // <-- Image is now imported

// Define the map image source using the corrected relative path
const MAP_BACKGROUND = require('./map.png'); // Correct relative path to the image in the 'app' folder


// --- Component for a Quick Access Service Icon ---
const ServiceIcon = ({ title, iconName, color, onPress }) => (
    <TouchableOpacity style={styles.serviceTile} onPress={onPress}>
        <View style={[styles.iconWrapper, { borderColor: color }]}>
            <MaterialCommunityIcons name={iconName} size={35} color={color} />
        </View>
        <Text style={styles.serviceTitle}>{title}</Text>
    </TouchableOpacity>
);

const EssentialServicesScreen = () => {
    const router = useRouter(); 

    const handleVoiceSearch = () => {
        console.log('Essential Services voice search activated.');
    };

    // Function to navigate to the Service Map View, passing service details
    const handleServicePress = (serviceName, iconName, colorCode) => {
        console.log(`Navigating to: ${serviceName} Map View`);
        
        router.push({
            pathname: 'ServiceMapScreen', 
            params: { 
                service: serviceName,
                icon: iconName,
                color: colorCode 
            },
        });
    };

    return (
        <View style={styles.container}>
            
            {/* 1. Custom Header (Back Button, Title, Notification) */}
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <View style={styles.headerTitleWrapper}>
                    <Text style={styles.headerTitle}>Essential Services</Text>
                </View>
                <TouchableOpacity onPress={() => console.log('Notifications')} style={styles.headerButton}>
                    <MaterialCommunityIcons name="bell-outline" size={24} color="#777" />
                </TouchableOpacity>
            </View>

            {/* 2. Map Background and Search Bar Overlay */}
            <View style={styles.mapPlaceholder}>
                {/* 🛑 FIX: Use the actual map image as the background */}
                <Image source={MAP_BACKGROUND} style={styles.mapImage} resizeMode="cover" />
                
                {/* Search Bar Overlay */}
                <View style={styles.mapSearchContainer}>
                    <MaterialCommunityIcons name="magnify" size={20} color="#FF7F47" style={styles.mapSearchIcon} />
                    <TextInput 
                        style={styles.mapSearchInput} 
                        placeholder="Search" 
                        placeholderTextColor="#777"
                    />
                    <TouchableOpacity onPress={handleVoiceSearch}>
                        <MaterialCommunityIcons name="microphone-outline" size={20} color="#777" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* 3. Quick Access Section */}
            <ScrollView style={styles.quickAccessSection} contentContainerStyle={styles.quickAccessContent}>
                <Text style={styles.quickAccessHeader}>Quick Access</Text>
                
                {/* Service Icons Grid (2x2) */}
                <View style={styles.servicesGrid}>
                    <ServiceIcon 
                        title="HealthCare" 
                        iconName="hospital-box-outline" 
                        color="#7C47FF" // Purple
                        onPress={() => handleServicePress('Health care', 'hospital-box-outline', '#7C47FF')} 
                    />
                    <ServiceIcon 
                        title="Housing Assistance" 
                        iconName="home-heart" 
                        color="#33a8a0" // Teal
                        onPress={() => handleServicePress('Housing Assistance', 'home-heart', '#33a8a0')} 
                    />
                    <ServiceIcon 
                        title="Education" 
                        iconName="town-hall" 
                        color="#4285F4" // Blue
                        onPress={() => handleServicePress('Education', 'town-hall', '#4285F4')} 
                    />
                    <ServiceIcon 
                        title="Legal Aid" 
                        iconName="scale-balance" 
                        color="#FF7F47" // Orange
                        onPress={() => handleServicePress('Legal Aid', 'scale-balance', '#FF7F47')} 
                    />
                </View>
            </ScrollView>
        </View>
    );
};


// --- STYLING (Updated to support Image) ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
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
        zIndex: 10, // Ensure header is above the map
    },
    headerButton: {
        padding: 5,
        backgroundColor: '#FFF',
        borderRadius: 20,
    },
    headerTitleWrapper: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    headerTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#444',
    },
    // Map Placeholder (The top 60% of the screen)
    mapPlaceholder: {
        flex: 1,
        maxHeight: '60%', 
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative', // Needed for absolute positioning of the image
    },
    // 🛑 NEW STYLE: Full-size map image
    mapImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
        zIndex: 0, // Keep map behind the search bar
    },
    // Search Bar Overlay on Map
    mapSearchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 10, 
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        zIndex: 5, // Ensure search bar is above the map image
    },
    mapSearchIcon: {
        marginRight: 8,
    },
    mapSearchInput: {
        flex: 1,
        fontSize: 16,
        padding: 0,
    },
    // Quick Access Section (The bottom 40% of the screen)
    quickAccessSection: {
        flex: 1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20, 
    },
    quickAccessContent: {
        paddingTop: 15,
        paddingHorizontal: 20,
    },
    quickAccessHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    // Service Grid (2x2)
    servicesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    serviceTile: {
        width: '45%', 
        alignItems: 'center',
        marginBottom: 25,
    },
    iconWrapper: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        marginBottom: 8,
    },
    serviceTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#555',
        textAlign: 'center',
    },
});

export default EssentialServicesScreen;