import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { ExpandingView, FilterBadge, Row, TextInput, TransactionList } from "../../components"
import { useAccountStore, useBudgetStore, useCategoryStore, useTransactionStore } from "../../stores";
import { useState } from "react";

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

  const filteredItems = filter ?
    items.filter((transaction) => {
      const store: { uuid: string, title: string }[] = filterStores[filter];
      const results = store.filter((storeItem) => storeItem.title.toLowerCase().includes(searchTerm.toLowerCase()));

      const itemId = transaction[filterRelationKeys[filter]] ?? "";

      return results.find((result) => result.uuid === itemId);
    }) : items.filter((transaction) => transaction.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <ExpandingView style={{ paddingHorizontal: 10 }}>
      <TransactionList
        transactions={filteredItems}
        emptyStr={`No Transactions Found`}
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
