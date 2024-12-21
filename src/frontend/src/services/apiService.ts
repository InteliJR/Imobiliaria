
const services = {
    authService: 'https://gateway-2ev7.onrender.com/auth',
    propertyService: 'https://gateway-2ev7.onrender.com/property',
    userService: 'https://gateway-2ev7.onrender.com/user', // adicionado para o esLint parar de gritar na página de criação de contrato
    contractService: 'https://gateway-2ev7.onrender.com/contract' // adicionado para o esLint parar de gritar na página de criação de contrato
};

export const getServiceUrl = (serviceName: keyof typeof services, path: string): string => {
    return `${services[serviceName]}${path}`;
};
