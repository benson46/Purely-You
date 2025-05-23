import { appointmentRepository } from "../appoinments/appoinmentRepository.js";



export const doctorService = {
    getDoctors: async () => {
        // const response = await doctorRepository.getAllDobctors() ;
        // const data = await response.json();
        // return data;
    },
    getAppoinments: async(doctorId) => {
            const response = await appointmentRepository.getAppointmentsByDoctorId(doctorId);
        
            return response;
    },
    actionAppoinment: async (id, status) => {
        const response = await appointmentRepository.update(id, {status});
        return response;
    },
    updateUIState: async(id, uiState) => {
        console.log(id, uiState, 'in service')
        const response = await appointmentRepository.updateAppointmentUIState(id, uiState);
        return response;
    
    },
    updateRecords: async(id, notes, status) => {
        console.log(id, notes, 'in service')
        console.log(status, 'status in service')
        const response = await appointmentRepository.updateSumbit(id, {notes, status});
        return response;

    }
}