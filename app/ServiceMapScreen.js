// --- app/ServiceMapScreen.js ---
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'; // <-- Image is now imported


const MAP_BACKGROUND = require('./map.png'); 


// --- Component for a Map Pin (the numbered purple circles) ---
const MapPin = ({ number, top, left }) => (
    <View style={[styles.mapPin, { top: `${top}%`, left: `${left}%` }]}>
        <Text style={styles.mapPinText}>{number}</Text>
    </View>
);

const ServiceMapScreen = () => {
    const router = useRouter(); 
    const { service = 'Health care', icon = 'medical-bag', color = '#7C47FF' } = useLocalSearchParams();

    // Placeholder data for the numbered pins (to visually match the screenshot)
    const pins = [
        { number: 21, top: 15, left: 35 },
        { number: 45, top: 10, left: 75 },
        { number: 34, top: 25, left: 20 },
        { number: 5, top: 35, left: 78 },
        { number: 2, top: 40, left: 15 },
        { number: 7, top: 55, left: 70 },
        { number: 10, top: 60, left: 40 },
    ];

    // Function to navigate to the Route Detail Screen (placeholder)
    const handleLocationSelect = () => {
        console.log("Navigating to Route Detail Screen...");
    };

    return (
        <View style={styles.container}>
            
            {/* 1. Map View and Custom Header Overlay */}
            <View style={styles.mapContainer}>
                
                {/* 1a. Map Background Image */}
                <Image source={MAP_BACKGROUND} style={styles.mapBackground} resizeMode="cover" />

                {/* Map Pins Overlay */}
                {pins.map(pin => (
                    <MapPin 
                        key={pin.number} 
                        number={pin.number} 
                        top={pin.top} 
                        left={pin.left} 
                    />
                ))}

                {/* 1b. Custom Header (Back, Title, Notification) */}
                <View style={styles.customHeader}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
                        <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                    </TouchableOpacity>
                    <View style={styles.headerTitleWrapper}>
                        <Text style={styles.headerTitle}>Essential Services</Text>
                    </View>
                    <TouchableOpacity onPress={() => console.log('Notifications')} style={styles.headerButton}>
                        <MaterialCommunityIcons name="bell-outline" size={24} color="#333" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* 2. Service Detail Card (Bottom Footer) */}
            <TouchableOpacity style={styles.detailCard} onPress={handleLocationSelect}>
                <View style={styles.serviceInfo}>
                    <MaterialCommunityIcons name={icon} size={28} color={color} />
                    <Text style={[styles.serviceName, { color: color }]}>{service}</Text>
                </View>
                <Text style={styles.locationCount}>7 locations</Text>
            </TouchableOpacity>
        </View>
    );
};


// --- STYLING (To use the Image component correctly) ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    mapContainer: {
        flex: 1,
    },
    // FIX: Apply the absolute fill to the Image component
    mapBackground: { 
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    
    // Custom Header Overlay (Remains unchanged)
    customHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    headerButton: {
        padding: 5,
        backgroundColor: '#FFF',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
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

    // Map Pin Styles (Remains unchanged)
    mapPin: {
        position: 'absolute',
        width: 35,
        height: 35,
        borderRadius: 17.5,
        backgroundColor: '#7C47FF', // Purple
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
        zIndex: 10,
    },
    mapPinText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },

    // Bottom Detail Card (Now a TouchableOpacity)
    detailCard: {
        paddingHorizontal: 25,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
    serviceInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    serviceName: {
        marginLeft: 10,
        fontSize: 24,
        fontWeight: 'bold',
    },
    locationCount: {
        fontSize: 16,
        color: '#777',
    },
});

export default ServiceMapScreen;