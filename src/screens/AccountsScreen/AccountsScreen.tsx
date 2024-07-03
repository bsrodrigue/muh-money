import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { ExpandingView } from "../../components"

type AccountsScreenProps = NativeStackScreenProps<RootStackParamList, 'Accounts'>;

export default function AccountsScreen({ navigation, route }: AccountsScreenProps) {
  return (
    <ExpandingView>
    </ExpandingView>
  )
}
