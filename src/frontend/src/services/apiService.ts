
const services = {
    authService: 'http://localhost:8080',
};

export const getServiceUrl = (serviceName: keyof typeof services, path: string): string => {
    return `${services[serviceName]}${path}`;
};
