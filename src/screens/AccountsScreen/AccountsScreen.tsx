import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { FAB } from "@rneui/base";
import { AccountCard, CardBottomSheet, CreateAccountForm, EditAccountForm, ExpandingView, ScreenDivider } from "../../components"
import { View, FlatList, Dimensions, TouchableOpacity } from "react-native";
import { useTheme } from "@rneui/themed";
import { useEffect, useState } from "react";
import { useAccountStore } from "../../stores";
import { useAsyncStorage } from "../../lib/storage";

type AccountsScreenProps = NativeStackScreenProps<RootStackParamList, 'Accounts'>;

export default function AccountsScreen({ navigation }: AccountsScreenProps) {
  const { theme: { colors: { black, primary, white } } } = useTheme();
  const [createFormIsVisible, setCreateFormIsVisible] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const { height } = Dimensions.get("window");
  const { accounts, createAccount, updateAccount, deleteAccount } = useAccountStore();
  const { storeData } = useAsyncStorage();

  useEffect(() => {
    storeData('accounts', accounts);
  }, [accounts]);

  return (
    <ExpandingView>
      <ScreenDivider />
      <View style={{ backgroundColor: black }}>
        <View style={{ backgroundColor: primary, padding: 20, paddingHorizontal: 20 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{
              height: (height * 0.8)
            }}
            contentContainerStyle={{
              paddingBottom: 50
            }}
            data={accounts}
            keyExtractor={(_item, number) => number.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onLongPress={() => setEditingAccount(item)}
              >
                <AccountCard account={item} />
              </TouchableOpacity>
            )} />
        </View>
      </View>

      <FAB onPress={() => setCreateFormIsVisible(true)} title="Create Account" size="small" color={primary} placement="right" titleStyle={{ fontSize: 12 }} />

      <CardBottomSheet isVisible={createFormIsVisible} onBackdropPress={() => setCreateFormIsVisible(false)}>
        <CreateAccountForm
          onCreate={(account) => {
            createAccount(account);
            setCreateFormIsVisible(false);
          }} />
      </CardBottomSheet>

      <CardBottomSheet isVisible={Boolean(editingAccount)} onBackdropPress={() => setEditingAccount(null)}>
        <EditAccountForm
          account={editingAccount}
          onEdit={(account) => {
            updateAccount(account);
            setEditingAccount(null);
          }}
          onDelete={(uuid) => {
            deleteAccount(uuid);
            setEditingAccount(null);
          }}
        />
      </CardBottomSheet>

    </ExpandingView>
  )
}
