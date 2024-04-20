import axios from "axios";

const backend = axios.create({
    baseURL: 'https://localhost:7269'
})

export const getOnScenes = async () => {
    try {
        const response = await backend.get('/Statistics/on-scene');
        
        return response.data
    } catch(error) {
        alert(error);
    }
}

export const getMonthlyCrashes = async () => {
    try {
        const response = await backend.get('/Statistics/month');

        return response.data
    } catch(error) {
        alert(error);
    }
}

export const getCoordinates = async () => {
    try {
        const response = await backend.get('/Statistics/coordinates');

        return response.data
    } catch(error) {
        alert(error);
    }
}

export const getById = async (id: string) => {
    try {
        const response = await backend.get('/Statistics/'+ id);

        return response.data
    } catch(error) {
        alert(error);
    }
}

export const getClasterStats = async () => {
    try {
        const response = await backend.get('/Statistics/clasters');

        return response.data
    } catch(error) {
        alert(error);
    }
}

export const getRegressions = async () => {
    try {
        const response = await backend.get('/Statistics/regression');

        return response.data
    } catch(error) {
        alert(error);
    }
}