import { useState } from 'react';
import { Dimensions, FlatList, TouchableOpacity, View } from 'react-native'
import { Text } from '../Text';

import iconData from "../../constants/icon_data.json";
import { ExpandingView } from '../ExpandingView';
import { TextInput } from '../Input';
import { Button } from '../Button';
import { Icon, useTheme } from '@rneui/themed';
import { Selector } from '../Selector';
import { TransactionCategory } from '../../types/models';
import Crypto from '../../lib/crypto';

const iconTitleToTypeMap = {
  // "AntDesign": "antdesign",
  // "Entypo": "entypo",
  // "EvilIcons": "evilicon",
  // "Feather": "feather",
  "FontAwesome": "font-awesome",
  // "FontAwesome5": "font-awesome-5",
  // "Fontisto": "fontisto",
  // "Foundation": "foundation",
  // "Ionicons": "ionicon",
  // "MaterialIcons": "material",
  // "MaterialCommunityIcons": "material-community",
  // "Octicons": "octicon",
  // "SimpleLineIcons": "simple-line-icon",
  // "Zocial": "zocial"
};

const iconTitles = Object.keys(iconData).filter((key) => iconTitleToTypeMap[key] !== undefined);

const getFamilyIcons = (title: string) => iconData[title];
const getFamilyType = (title: string) => iconTitleToTypeMap[title];

interface CreateCategoryFormProps {
  onCreate: (category: TransactionCategory) => void;
}

export default function CreateCategoryForm({ onCreate }: CreateCategoryFormProps) {
  const { height } = Dimensions.get('window');
  const { theme: { colors: { primary, white, greyOutline, error, warning, success, black } } } = useTheme();
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [colorIndex, setColorIndex] = useState(0);
  const [iconPickerIsOpen, setIconPickerIsOpen] = useState(false);
  const [pickedIcon, setPickedIcon] = useState(null);
  const familyTitle = iconTitles[0];

  //TODO: Build a more complete color picker
  const colors = [
    primary,
    error, warning,
    success
  ];

  const icons = getFamilyIcons(familyTitle).filter((icon: string) => icon.includes(search.toLowerCase()));

  const isValid = title && pickedIcon;

  const onSubmit = () => {
    const uuid = Crypto.generateRandomUUID();
    const data: TransactionCategory = {
      uuid,
      title,
      iconName: pickedIcon?.name,
      iconFamily: pickedIcon?.type,
      color: colors[colorIndex]
    };

    onCreate(data);
  }

  return (
    <ExpandingView style={{ paddingHorizontal: 10 }}>
      <Text weight='700' style={{ fontSize: 18, marginBottom: 15, }}>{`${iconPickerIsOpen ? "Select Icon" : "Create Category"}`}</Text>

      {
        iconPickerIsOpen && (
          <>
            <TextInput label={`Search icon`} placeholder="Enter icon name" onChangeText={setSearch} />
            <ExpandingView style={{ height: (height * 0.5) }}>
              <FlatList
                bounces
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                }}
                numColumns={6}
                data={icons}
                renderItem={({ item }: { item: string }) =>
                (
                  <TouchableOpacity
                    onPress={() => {
                      setPickedIcon({
                        name: item,
                        type: getFamilyType(familyTitle),
                      })
                      setIconPickerIsOpen(false)
                    }
                    }
                    style={{
                      aspectRatio: 1, borderRadius: 50, backgroundColor: greyOutline,
                      padding: 10, marginVertical: 5, justifyContent: "center", alignItems: "center"
                    }}>
                    <Icon size={18} color={black} name={item} type={getFamilyType(familyTitle)} />
                  </TouchableOpacity>
                )
                } />
            </ExpandingView>
          </>
        )
      }

      {
        !iconPickerIsOpen && (
          <>
            <TextInput value={title} label={`Category title`} placeholder="Enter the title of your category" onChangeText={setTitle} />
            <Selector
              label="Category color"
              options={colors}
              defaultValue={colors[colorIndex]}
              onChange={setColorIndex}
              OptionComponent={(option) => (
                <View style={{ width: "60%", borderRadius: 5, backgroundColor: option, borderColor: greyOutline, borderWidth: 1, justifyContent: "center", alignItems: "center" }} >
                  <Text weight='700' style={{ marginVertical: 5 }}>{option}</Text>
                </View>
              )}
            />
            <TouchableOpacity style={{ marginVertical: 10 }} onPress={() => setIconPickerIsOpen(true)}>
              <View
                style={{
                  borderRadius: 5, backgroundColor: white, borderColor: greyOutline,
                  borderWidth: 1,
                  padding: 10, marginVertical: 5, justifyContent: "center", alignItems: "center",
                  height: 50
                }}>
                {
                  pickedIcon && (
                    <Icon size={18} color={colors[colorIndex]} name={pickedIcon?.name} type={pickedIcon?.type} />
                  )
                }
                <Text weight='500'>Select Icon</Text>
              </View>
            </TouchableOpacity>
            <Button disabled={!isValid} onPress={onSubmit} title="Submit" />
          </>
        )
      }

    </ExpandingView>
  );
}
