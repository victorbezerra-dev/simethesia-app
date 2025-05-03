import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import CustomTextInput from "@/shared/components/CustomTextInput";
import { PatientData } from "@/shared/models/PatientData";

type PatientSummaryCardProps = {
    totalSimulationTime: string;
    errorMessage: string | undefined;
    patientData?: PatientData,
    onChangeTotalSimulationTime: (value: string) => void;
};


const PatientSummaryCard = ({
    totalSimulationTime,
    errorMessage = undefined,
    patientData,
    onChangeTotalSimulationTime
}: PatientSummaryCardProps) => {
    return (
        <View style={styles.card}>
            <Text style={styles.label}>
                <Text style={styles.bold}>Paciente:</Text> {patientData?.ageInYears} anos, 
                {patientData?.heightInMeters}m, {patientData?.weightInKg}kg, {patientData?.gender}
            </Text>
            <Text style={styles.label}>
                <Text style={styles.bold}>Desafios:</Text> 3 ativos
            </Text>

            <CustomTextInput
                label="Tempo Total"
                value={totalSimulationTime}
                errorMessage={errorMessage}
                unit="segundos"
                placeholder="Ex: 32 segundos"
                onChange={onChangeTotalSimulationTime}
                keyboardType="numeric"
                labelStyle={{
                    color: '#093361'
                }}
                inputStyle={{
                    color: '#7D7F81',
                    fontWeight: '500'
                }}
                icon={<Icon name="time" size={20} color="#093361" />}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 12,
    },
    label: {
        fontSize: 14,
        color: '#111',
        marginBottom: 4,
    },
    bold: {
        fontWeight: 'bold',
    },
    section: {
        marginTop: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    icon: {
        marginRight: 6,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    value: {
        fontSize: 16,
        color: '#999',
        fontWeight: 'bold',
        marginBottom: 4,
    },

});
export default PatientSummaryCard 