import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Link, useRouter } from "expo-router";
import { Image, Text, View, ScrollView, StyleSheet, Dimensions, Platform } from "react-native";

export default function Signup() {
    const router = useRouter();
    
    const handleSignUp = () => {
        router.push("/home")
    }

    return (
        <ScrollView showsVerticalScrollIndicator={true} >
        <View style={styles.container}>
            <Image 
            source={require("@/assets/synercheck1.png")}
            style={styles.illustration}
            resizeMode="contain"
            />

            <Text style={styles.title}>Crie sua conta aqui!</Text>
            <Text style={styles.subtitle}>Preencha os campos abaixo para criar sua conta.</Text>

            <View style={styles.form}>
            <Input placeholder="Nome Completo"/>
            <Input placeholder="E-mail" keyboardType="email-address"/>
            <Input placeholder="Senha" secureTextEntry/>
            <Input placeholder="Confirmar Senha" secureTextEntry/>
            <Button label="Entrar" onPress={() => handleSignUp()}/>
            </View>

            <Text style={styles.footerText}>Já tem uma conta?{" "}
            <Link style={styles.footerLink} href="/">Faça login aqui!</Link>  
            </Text>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    backgroundColor: "#fafaf4",
    padding: 32,
    justifyContent: "center"
  },
  illustration: {
    alignSelf: "center",
    width: Platform.select({
      ios: "100%",
      android: "100%",
      default: "70%"
    }),
    height: Platform.select({
      ios: "22.1%",
      android: "25.1%",
      default: "30%"
    }),
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 900
  },
  subtitle: {
    fontSize: 16
  },
  form: {
    marginTop: 24,
    gap: 12
  },
  footerText: {
    textAlign: "center",
    marginTop: 24,
    color: "#585860"
  },
  footerLink: {
    fontWeight: 700,
    color: "#2a46c1ff"
  }
})