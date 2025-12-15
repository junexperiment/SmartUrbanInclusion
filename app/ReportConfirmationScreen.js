// --- app/ReportConfirmationScreen.js ---
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ReportConfirmationScreen = () => {
    const router = useRouter(); 

    const handleGoHome = () => {
        // Use router.replace to go straight to the Home screen, clearing the report flow history
        router.replace('HomeScreen'); 
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentBox}>
                
                <View style={styles.iconWrapper}>
                    {/* Large Checkmark Icon for Success */}
                    <MaterialCommunityIcons 
                        name="check-circle-outline" 
                        size={80} 
                        color="#4CAF50" // Green for success
                    />
                </View>

                <Text style={styles.mainHeader}>Report Submitted!</Text>
                
                <Text style={styles.subText}>
                    Thank you for reporting this incident. Your report has been successfully logged and will be reviewed by local authorities.
                </Text>

                <Text style={styles.referenceText}>
                    Reference ID: #URBAN4782025
                </Text>

                {/* Button to navigate back to the Home screen */}
                <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
                    <Text style={styles.homeButtonText}>Go to Home Screen</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


// --- STYLING ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    contentBox: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 30,
        alignItems: 'center',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 8,
    },
    iconWrapper: {
        marginBottom: 20,
    },
    mainHeader: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4CAF50', // Success Green
        marginBottom: 10,
    },
    subText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 25,
        lineHeight: 24,
    },
    referenceText: {
        fontSize: 14,
        color: '#999',
        marginBottom: 30,
        padding: 8,
        backgroundColor: '#F0F0F0',
        borderRadius: 5,
        fontWeight: '500',
    },
    homeButton: {
        backgroundColor: '#FF7F47',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        width: '80%',
        alignItems: 'center',
    },
    homeButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ReportConfirmationScreen;