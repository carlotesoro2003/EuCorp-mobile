// NotificationsList.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { fetchNotifications, markNotificationAsRead  } from '../../../supabaseClient';
import { useUser } from '@supabase/auth-helpers-react';
import useNotifications from '../../../useNotifications';

const NotificationsList = () => {
  const user = useUser();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      const data = await fetchNotifications(user.id);
      setNotifications(data);
    };

    loadNotifications();
  }, [user]);

  // Use custom hook for real-time notifications
  useNotifications(user.id, setNotifications);

  const handleNotificationPress = async (notification) => {
    await markNotificationAsRead(notification.id);
    // Handle navigation or any other action here
  };

  return (
    <View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNotificationPress(item)}>
            <Text style={{ textDecorationLine: item.is_read ? 'line-through' : 'none' }}>
              {item.message}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NotificationsList;
