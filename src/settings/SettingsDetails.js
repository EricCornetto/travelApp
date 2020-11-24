import React, {useState} from 'react';
import { View } from 'react-native';
import { Icon, Menu, MenuItem, IndexPath } from '@ui-kitten/components'

const SettingDetails = () => {

    const list =  [
        {
            title: "Account",
            icon: 'person-outline'

        },
        {
            title: "Notifications",
            icon: "bell-outline"
        },
        {
            title: "Privacy & Security",
            icon: "shield-outline"
        },
        {
            title: "Help and Support",
            icon: "headphones-outline"
        },
        {
            title: "About",
            icon: "question-mark-circle-outline"
        }
    ]

    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0) )

    return(
        <View>
            <Menu 
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}
            >
                {
                    list.map((item,i) => (
                        <MenuItem  key={i} title={item.title} accessoryLeft={(props) => <Icon {...props} name={item.icon} /> } accessoryRight={(props) => <Icon {...props} name="arrow-forward-outline" />} />
                    ))
                }
            </Menu>
        </View>
    );
}

export default SettingDetails;