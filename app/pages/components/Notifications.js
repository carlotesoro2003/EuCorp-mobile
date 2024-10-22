import React from 'react';
import { View, Text } from 'react-native';
import NotificationsList from './NotificationsList';
import NotificationsSender from '../../../NotificationsSender';

const Notifications = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>Notifications</Text>
      <NotificationsList />
    </View>
  );
};

export default Notifications;
