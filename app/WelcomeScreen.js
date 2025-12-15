// --- app/WelcomeScreen.js ---
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const INTRO_IMAGE = require('./granny.webp'); 

const WelcomeScreen = () => {
    const router = useRouter();

    const handleGetStarted = () => {
        router.replace('AuthScreen');
    };

    return (
        <View style={styles.container}>
            
            {/* 1. Image Section */}
            <View style={styles.imageContainer}>
                <Image source={INTRO_IMAGE} style={styles.image} resizeMode="cover" />
            </View>

            {/* 2. Text Content */}
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Urban life Without Barriers</Text>
                <Text style={styles.subtitle}>
                    Find friendly routes, save your favorite places, and move with confidence.
                </Text>

                {/* 3. Get Started Button */}
                <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- STYLING (Matching the desired UI) ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    imageContainer: {
        flex: 2,
        width: '100%',
        backgroundColor: '#DDD',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 40,
        backgroundColor: '#FFF',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E9524A', 
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#FF7F47',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;