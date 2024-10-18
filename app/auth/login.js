import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Image, } from "react-native";
import { Link } from "expo-router";


export const Login = () => {

    const [email, setEmail] = useState("");


    return (
        <View style={styles.container}>
            <Image source={require('../../assets/login.png')} style={styles.logo} />
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Welcome to Eucorp!</Text>
                <Text style={styles.subText}>Enter your email to log in</Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#aaa"
                />
            </View>

            <Link style={styles.loginButton} href="/pages/admin/home"><Text style={styles.loginText}>Log In</Text></Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f7f7f7",
    },
    logo: {
        width: 300,
        height: 300,
        marginBottom: 30,
        borderRadius: 60,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 40,
    },
    logoText: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        
    },
    subText: {
        fontSize: 16,
        color: "#555",
        marginTop: 5,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#ccc",
        paddingHorizontal: 10,
        marginBottom: 25,
        width: "80%",
    },
    icon: {
        marginRight: 10,
    },
    input: {
        height: 40,
        flex: 1,
        color: "#333",
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: "#7600bc",
        width: "80%",
        paddingVertical: 12,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    loginText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center', 

    },
});
