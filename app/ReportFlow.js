// --- app/ReportFlow.js ---
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// --- Component for a Report Category Tile ---
const ReportTile = ({ title, onPress }) => (
    <TouchableOpacity style={styles.tile} onPress={onPress}>
        <Text style={styles.tileText}>{title}</Text>
    </TouchableOpacity>
);

const ReportFlow = () => {
    const router = useRouter(); 

    // Function to navigate to the form, passing the selected issue type
    const handleIssueSelect = (issueType) => {
        console.log(`Report flow selected: ${issueType}`);
        
        // Navigate to the form screen, passing the selected type
        router.push({ 
            pathname: 'ReportFormScreen', 
            params: { type: issueType } 
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
                    <Text style={styles.headerTitle}>Report an Issue</Text>
                </View>
                <TouchableOpacity onPress={() => console.log('Notifications')} style={styles.headerButton}>
                    <MaterialCommunityIcons name="bell-outline" size={24} color="#777" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                <Text style={styles.introText}>
                    Report an incident to keep the neighborhood safe
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

                {/* 3. Issue Category Grid (2x2) */}
                <View style={styles.tilesContainer}>
                    <ReportTile 
                        title="Add an Incident" 
                        onPress={() => handleIssueSelect('Incident')} 
                    />
                    <ReportTile 
                        title="Physical Inaccessibility" 
                        onPress={() => handleIssueSelect('Physical Inaccessibility')} 
                    />
                    <ReportTile 
                        title="Service Discrimination" 
                        onPress={() => handleIssueSelect('Service Discrimination')} 
                    />
                    <ReportTile 
                        title="General Urban Issues" 
                        onPress={() => handleIssueSelect('General Urban Issues')} 
                    />
                </View>

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
        backgroundColor: '#F0F0F0', // Lighter background for the title pill
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
    
    // Search Bar Styles
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F7F7', // Light gray background
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
    
    // Feature Tiles Grid Styles
    tilesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    tile: {
        width: '48%', // For a 2x2 grid
        height: 150,
        backgroundColor: '#FFF', 
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#EEE',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    tileText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
});

export default ReportFlow;