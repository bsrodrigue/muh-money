import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { View } from "react-native";
import * as Yup from "yup";
import useCall from "../../api/useCall";
import { AuthForm, Button, TextInput } from "../../components";
import { RootStackParamList } from "../../types";

const changeEmailSchema = Yup.object().shape({
  email: Yup.string().email("Email invalide").required("Champ requis"),
  password: Yup.string().required("Champ requis"),
});

type ChangeEmailScreenProps = NativeStackScreenProps<RootStackParamList, 'ChangeEmail'>;

export default function ChangeEmailScreen({ navigation }: ChangeEmailScreenProps) {

  const { call, isLoading } = useCall(() => { }, {
    successMessage: "Votre adresse email a été changée avec succès",
    onSuccess() {
    },
  })

  return (
    <AuthForm
    >
      <Formik
        validationSchema={changeEmailSchema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={
          async ({ email, password }) => {
            await call({ email, password });
          }}>
        {({ values, errors, handleChange, handleSubmit }) => (
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View>
              <TextInput
                value={values.email}
                onChangeText={handleChange("email")}
                errorMessage={errors.email}
                label="Nouvelle adresse email"
                placeholder="Veuillez saisir votre nouvelle adresse email" />
              <TextInput
                secureTextEntry
                value={values.password}
                onChangeText={handleChange("password")}
                errorMessage={errors.password}
                label="Mot de passe"
                placeholder="Veuillez saisir votre mot de passe" />
            </View>
            <Button onPress={handleSubmit} loading={isLoading}>Confirmer</Button>
          </View>
        )}
      </Formik>
    </AuthForm>
  )
}
