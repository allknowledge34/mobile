import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    Switch,
    Text,
    TouchableOpacity,
    View,
    Alert,
    Linking,
    ToastAndroid,
    Share,
    Platform,
} from "react-native";
import styles from "@/assets/styles/settings.styles.js";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PrivacyAndSecurityScreen() {
    const [push, setPush] = useState(true);
    const [email, setEmail] = useState(true);
    const insets = useSafeAreaInsets();

    const showComingSoon = () => {
        if (Platform.OS === "android") {
            ToastAndroid.show("Coming soon..", ToastAndroid.SHORT);
        } else {
            Alert.alert("Coming soon..");
        }
    };

    const openLink = (url) => {
        Linking.openURL(url).catch(() =>
            Alert.alert("Error", "Unable to open link")
        );
    };

    const contactEmail = () => {
        Linking.openURL("mailto:allknowledge34@gmail.com").catch(() =>
            Alert.alert("Error", "Unable to open link")
        );
    };

    const shareApp = async () => {
        await Share.share({
            message:
                "Check out this awesome app 🚀\nhttps://yourapp.com",
        });
    };

    const rateApp = () => {
        const url =
            Platform.OS === "android"
                ? "market://details?id=com.yourapp"
                : "https://apps.apple.com/app/idYOUR_APP_ID";

        Linking.openURL(url).catch(() =>
            Alert.alert("Error", "Unable to open store")
        );
    };

    return (
        <View style={{ flex: 1, paddingTop: insets.top }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={26} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Privacy & Security</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.section}>Security</Text>

                <Card
                    icon="lock-closed-outline"
                    title="Privacy Policy"
                    onPress={() => openLink("https://www.freeprivacypolicy.com/live/4fbcbda6-898d-4be5-8afc-815dca0afa24")}
                />

                <Text style={styles.section}>General</Text>

                <ToggleCrad
                  icon="notifications-outline"
                  title="Push Notification"
                  value={push}
                  onChange={() => showComingSoon()}
                />

                <ToggleCrad
                  icon="mail-outline"
                  title="Email Notification"
                  value={email}
                  onChange={() => showComingSoon()}
                />

                <Card icon="share-outline" title="Share App" onPress={shareApp}/>
                <Card icon="star-outline" title="Rate App" onPress={rateApp} />

                <Text style={styles.section}>Account</Text>

                <Card
                  icon="mail-outline"
                  title="Contact us"
                  onPress={contactEmail}
                />

                <Card
                  icon="help-circle-outline"
                  title="General Inquiries"
                  onPress={contactEmail}
                />
            </ScrollView>
        </View>
    );
}

function Card({ icon, title, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.row}>
                <Ionicons name={icon} size={22} color="#ff7a00" />
                <Text style={styles.title}>{title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#888" />
        </TouchableOpacity>
    );
}

function ToggleCrad({ icon, title, value, onChange }) {
    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={onChange}
        >
            <View style={styles.row}>
                <Ionicons name={icon} size={22} color="#ff7a00" />
                <Text style={styles.title}>{title}</Text>
            </View>

            <View pointerEvents="none">
                <Switch
                    value={value}
                    disabled
                    trackColor={{ false: "#ddd", true: "#ff7a00" }}
                    thumbColor="#fff"
                />
            </View>
        </TouchableOpacity>
    )
}