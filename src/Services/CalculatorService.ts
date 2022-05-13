import httpClient from "../Utility/httpClient";
import IOperationData from "../Types/Operation";
import CalculatorFormInput from "../Types/CalculatorFormInput";

const getOperations = () => {
    return httpClient.get<Array<IOperationData>>(`operations`);
}
const requestCalculation = (data: CalculatorFormInput) => {
    return httpClient.post<any>(`calculate`, data);
}

const CalculatorService = {
    getOperations,
    requestCalculation
}

export default CalculatorService;