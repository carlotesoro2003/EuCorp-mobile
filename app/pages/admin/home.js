import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar, Animated } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import * as Animatable from "react-native-animatable";
import { useUser } from "@supabase/auth-helpers-react";  // Import useUser to get user details

const COLORS = {
  MANPOWER: "#999999",
  FINANCIAL: "#777777",
  ENVIRONMENTAL: "#555555",
  SAFETY: "#111111",
};

const VALUES = {
  MANPOWER: 53,
  FINANCIAL: 21,
  ENVIRONMENTAL: 13,
  SAFETY: 10,
};

const pieData = [
  {
    value: VALUES.MANPOWER,
    color: COLORS.MANPOWER,
    label: "Manpower",
  },
  {
    value: VALUES.FINANCIAL,
    color: COLORS.FINANCIAL,
    label: "Financial",
  },
  {
    value: VALUES.ENVIRONMENTAL,
    color: COLORS.ENVIRONMENTAL,
    label: "Environmental",
  },
  {
    value: VALUES.SAFETY,
    color: COLORS.SAFETY,
    label: "Safety",
  },
];

const departmentsData = [
  { name: "CCMS", plans: 36 },
  { name: "CENG", plans: 25 },
  { name: "CAFA", plans: 24 },
  { name: "CBA", plans: 22 },
  { name: "CNAHS", plans: 18 },
];

const AdminDashboard = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity for department rows
  const scaleAnim = useRef(new Animated.Value(0)).current; // Initial scale for pie chart

  const user = useUser();  // Get the current logged-in user

  // Animations on mount
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade to opacity 1 (fully visible)
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.spring(scaleAnim, {
      toValue: 1, // Scale up to original size
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, scaleAnim]);

  const renderDot = (color) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View style={styles.legendContainer}>
          <View style={styles.legendRow}>
            {renderDot(COLORS.MANPOWER)}
            <Text style={styles.legendText}>Manpower: {VALUES.MANPOWER}%</Text>
          </View>
          <View style={styles.legendRow}>
            {renderDot(COLORS.ENVIRONMENTAL)}
            <Text style={styles.legendText}>
              Environmental: {VALUES.ENVIRONMENTAL}%
            </Text>
          </View>
        </View>
        <View style={styles.legendContainer}>
          <View style={styles.legendRow}>
            {renderDot(COLORS.FINANCIAL)}
            <Text style={styles.legendText}>
              Financial: {VALUES.FINANCIAL}%
            </Text>
          </View>
          <View style={styles.legendRow}>
            {renderDot(COLORS.SAFETY)}
            <Text style={styles.legendText}>Safety: {VALUES.SAFETY}%</Text>
          </View>
        </View>
      </>
    );
  };

  const handleDepartmentPress = (departmentName) => {
    console.log(`Department ${departmentName} clicked`);
  };

  const handlePieSectionPress = (section) => {
    console.log(`${section.label} section clicked`);
  };

  const renderDepartmentPlans = () => {
    return departmentsData.map((department, index) => (
      <Animatable.View
        key={department.name}
        animation="fadeInUp"
        delay={index * 200} // Stagger animation for each department row
        duration={800}
      >
        <TouchableOpacity onPress={() => handleDepartmentPress(department.name)}>
          <View style={styles.departmentRow}>
            <Text style={styles.departmentName}>{department.name}</Text>
            <View style={styles.plansContainer}>
              <Text style={styles.departmentPlans}>{department.plans}</Text>
              <MaterialIcons name="arrow-right" size={28} color="black" />
            </View>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    ));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" hidden={false}></StatusBar>

      <View style={styles.headerContainer}>
        <Text style={styles.appName}>Admin Dashboard</Text>
        <Link href="pages/components/profile"></Link>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.cardContainer}>
          <View style={styles.risksCard}>
            <Text style={styles.risksTitle}>Risks</Text>
            <View style={styles.pieChartContainer}>
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <PieChart
                  donut
                  data={pieData.map((section) => ({
                    ...section,
                    onPress: () => handlePieSectionPress(section),
                  }))}
                  sectionAutoFocus
                  radius={120}
                  focusOnPress
                  innerRadius={60}
                  innerCircleColor={"white"}
                  centerLabelComponent={() => {
                    return (
                      <View>
                        <Feather
                          name="alert-triangle"
                          size={50}
                          color={"#F35454"}
                        />
                      </View>
                    );
                  }}
                />
              </Animated.View>
            </View>
            {renderLegendComponent()}
            <Link href="pages/admin/risks" style={styles.arrowContainer}>
              <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
            </Link>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.risksCard}>
            <Text style={styles.risksTitle}>Plans</Text>
            <Link href="pages/admin/plans" style={styles.arrowContainer}>
              <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
            </Link>
            {renderDepartmentPlans()}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminDashboard;


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 8 : 0,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  appName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  userEmail: {
    fontSize: 16,
    color: "gray",
  },
  cardContainer: {
    position: "relative",
  },
  risksCard: {
    margin: 20,
    padding: 20,
    borderRadius: 14,
    backgroundColor: "white",
  },
  risksTitle: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
  pieChartContainer: {
    padding: 20,
    alignItems: "center",
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    width: 120,
    marginRight: 20,
  },
  legendText: {
    color: "black",
    fontSize: 11,
  },
  departmentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 14,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  departmentName: {
    fontSize: 16,
  },
  plansContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  departmentPlans: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  arrowContainer: {
    alignSelf: "flex-end",
    paddingVertical: 8,
  },
});

