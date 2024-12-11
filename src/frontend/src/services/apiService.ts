
const services = {
    authService: 'https://gateway-2ev7.onrender.com/auth',
    propertyService: 'https://gateway-2ev7.onrender.com/property'
};

export const getServiceUrl = (serviceName: keyof typeof services, path: string): string => {
    return `${services[serviceName]}${path}`;
};
