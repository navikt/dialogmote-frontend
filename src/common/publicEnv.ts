const isOpplaering: boolean = process.env["OPPLAERING"] === "true";
const isMockBackend: boolean = process.env["MOCK_BACKEND"] === "true";
const environment: string = process.env["ENVIRONMENT"] as string;

export { isOpplaering, isMockBackend, environment };
