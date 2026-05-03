import { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function Home() {
  const [medication, setMedication] = useState("");
  const [medsList, setMedsList] = useState<string[]>([]);
  const [interactionStatus, setInteractionStatus] = useState<"none" | "safe" | "warning">("none");

  const handleAddMedication = () => {
    if (!medication.trim()) return;
    
    const newMedsList = [...medsList, medication.trim()];
    setMedsList(newMedsList);
    setMedication("");
    
    checkInteraction(newMedsList);
  };

  const handleRemoveMedication = (index: number) => {
    const newMedsList = medsList.filter((_, i) => i !== index);
    setMedsList(newMedsList);
    checkInteraction(newMedsList);
  };

  const checkInteraction = (currentMeds: string[]) => {
    if (currentMeds.length < 2) {
      setInteractionStatus("none");
      return;
    }
    
    // Mock Logic:
    // Any list containing "Aspirina", "Varfarina" ou "Ibuprofeno" triggers a Warning.
    // Otherwise, it is Safe.
    const medsText = currentMeds.join(" ").toLowerCase();
    const isRisk = medsText.includes("varfarina") || medsText.includes("aspirina") || medsText.includes("ibuprofeno");
    
    if (isRisk) {
      setInteractionStatus("warning");
    } else {
      setInteractionStatus("safe");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Verificador de Interação</Text>
          <Text style={styles.subtitle}>Adicione medicamentos para verificar possíveis riscos de interação.</Text>
        </View>

        <View style={styles.inputContainer}>
          <Input 
            placeholder="Digite o nome do medicamento" 
            value={medication}
            onChangeText={setMedication}
            onSubmitEditing={handleAddMedication}
            returnKeyType="done"
          />
          <View style={styles.addButtonWrapper}>
            <Button label="Adicionar" onPress={handleAddMedication} />
          </View>
        </View>

        {medsList.length > 0 && (
          <View style={styles.medsSection}>
            <Text style={styles.sectionTitle}>Medicamentos Adicionados</Text>
            <View style={styles.medsList}>
              {medsList.map((med, index) => (
                <View key={index} style={styles.medItem}>
                  <Text style={styles.medName}>{med}</Text>
                  <TouchableOpacity onPress={() => handleRemoveMedication(index)} style={styles.removeButton}>
                    <Ionicons name="close-circle" size={24} color="#a0a0ab" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}

        {interactionStatus !== "none" && (
          <View style={styles.resultSection}>
            {interactionStatus === "safe" ? (
              <View style={[styles.resultCard, styles.safeCard]}>
                <Ionicons name="checkmark-circle" size={40} color="#15803d" />
                <View style={styles.resultTextContainer}>
                  <Text style={[styles.resultTitle, { color: "#15803d" }]}>Nenhuma interação detectada</Text>
                  <Text style={styles.resultDescription}>
                    Não encontramos interações conhecidas entre os medicamentos listados.
                  </Text>
                </View>
              </View>
            ) : (
              <View style={[styles.resultCard, styles.warningCard]}>
                <Ionicons name="warning" size={40} color="#b91c1c" />
                <View style={styles.resultTextContainer}>
                  <Text style={[styles.resultTitle, { color: "#b91c1c" }]}>Risco de Interação</Text>
                  <Text style={styles.resultDescription}>
                    Atenção: Existe um possível risco de interação entre os medicamentos listados. Consulte um profissional de saúde.
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fafaf4",
  },
  container: {
    padding: 24,
    paddingTop: Platform.OS === "android" ? 40 : 24,
    flexGrow: 1,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#585860",
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 32,
    gap: 12,
  },
  addButtonWrapper: {
    marginTop: 4,
  },
  medsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  medsList: {
    gap: 12,
  },
  medItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    boxShadow: [{
      offsetX: 0,
      offsetY: 1,
      blurRadius: 2,
      color: 'rgba(0, 0, 0, 0.05)',
    }],
    elevation: 2,
  },
  medName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  removeButton: {
    padding: 4,
  },
  resultSection: {
    marginTop: 8,
    marginBottom: 24,
  },
  resultCard: {
    flexDirection: "row",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "flex-start",
  },
  safeCard: {
    backgroundColor: "#f0fdf4",
    borderColor: "#bbf7d0",
  },
  warningCard: {
    backgroundColor: "#fef2f2",
    borderColor: "#fecaca",
  },
  resultTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  resultDescription: {
    fontSize: 14,
    color: "#404040",
    lineHeight: 20,
  }
});