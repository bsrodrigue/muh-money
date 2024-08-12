import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { ExpandingView, FilterBadge, Row, TextInput, TransactionList } from "../../components"
import { useAccountStore, useBudgetStore, useCategoryStore, useTransactionStore } from "../../stores";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { Text } from "../../components";

type TransactionsScreenProps = NativeStackScreenProps<RootStackParamList, 'Transactions'>;

const filters = [
  "Account",
  "Budget",
  "Category"
];

export default function TransactionsScreen({ navigation, route }: TransactionsScreenProps) {
  const { items } = useTransactionStore();
  const { items: budgets } = useBudgetStore();
  const { items: accounts } = useAccountStore();
  const { items: categories } = useCategoryStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterIndex, setFilterIndex] = useState(null);
  const [sorting, setSorting] = useState("Newest");

  const filter = (filterIndex !== null) ? filters[filterIndex] : "";

  const filterStores = {
    "Account": accounts,
    "Budget": budgets,
    "Category": categories,
  };

  const filterRelationKeys = {
    "Account": "accountId",
    "Budget": "budgetId",
    "Category": "categoryId",
  }

  const sortingsTypes = {
    "Newest": "descending",
    "Oldest": "ascending",
  }

  const filteredItems = filter ?
    items.filter((transaction) => {
      const store: { uuid: string, title: string }[] = filterStores[filter];
      const results = store.filter((storeItem) => storeItem.title.toLowerCase().includes(searchTerm.toLowerCase()));

      const itemId = transaction[filterRelationKeys[filter]] ?? "";

      return results.find((result) => result.uuid === itemId);
    }) : items.filter((transaction) => transaction.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <ExpandingView style={{ paddingHorizontal: 10, paddingTop: 5 }}>
      <TouchableOpacity
        onPress={() => setSorting(sorting === "Newest" ? "Oldest" : "Newest")}
        style={{ opacity: 0.5 }}>
        <Row style={{ alignItems: "center", gap: 5 }}>
          <Text weight="700">{`Sort by ${sorting}`}</Text>
          <Icon type="material-community" name={`sort-clock-${sortingsTypes[sorting]}`} />
        </Row>
      </TouchableOpacity>
      <TransactionList
        transactions={filteredItems}
        emptyStr={`No Transactions Found`}
        order={sortingsTypes[sorting]}
      />
      <Row style={{ gap: 5, marginBottom: 5 }}>
        {
          filters.map((filter, index) => (
            <FilterBadge
              key={filter}
              label={filter}
              active={filterIndex == index}
              onPress={() => {
                const alreadyActive = (filterIndex == index);
                setFilterIndex(alreadyActive ? null : index);
              }
              }
            />
          ))
        }
      </Row>
      <TextInput placeholder={`Search for Transactions by ${filter || "Title"}`} onChangeText={setSearchTerm} />
    </ExpandingView>
  )
}
