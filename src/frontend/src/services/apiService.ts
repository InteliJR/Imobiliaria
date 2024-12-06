
const services = {
    authService: 'http://localhost:8093/auth',
    propertyService: 'http://localhost:8093/property'
};

export const getServiceUrl = (serviceName: keyof typeof services, path: string): string => {
    return `${services[serviceName]}${path}`;
};
