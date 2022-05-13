import React, {useEffect, useState} from "react";
import CalculatorService from "../Services/CalculatorService";
import CalculatorForm from "./CalculatorForm";
import {Alert, Card, CardContent, Container, Typography} from "@mui/material";
import IOperationData from "../Types/Operation";
import CalculatorFormInput from "../Types/CalculatorFormInput";

const Calculator: React.FC = () => {

    const [operations, setOperations] = useState<Array<IOperationData>>();
    const [loading, setLoading] = useState<Boolean>();
    const [result, setResult] = useState<string>('');

    const getOperations = () => {
        setLoading(true);
        CalculatorService.getOperations()
            .then((response: any) => {
                setOperations(response.data);
            })
            .catch((e: Error) => {
                console.log(e)
            })
            .finally(() => setLoading(false));
    };

    const calculate = (data: CalculatorFormInput) => {
        setLoading(true);
        CalculatorService.requestCalculation(data)
            .then(({data}) => {
                if (data.result) {
                    setResult(data.result);
                }
            })
            .catch((error: Error) => {
                alert(error.message)
            })
            .finally(() => setLoading(false))
    };
    useEffect(() => {
        getOperations();
    }, []);

    return (
        <Container maxWidth="sm" style={{marginTop: '30px'}}>
            <Card>
                <CardContent>
                    <Typography variant="h3" fontSize={"25px"} marginBottom={"15px"} component="div">
                        Alien Calculator
                    </Typography>

                    {
                        result !== '' && <Alert onClose={() => {
                            setResult('')
                        }}>Result for your operation: {result} </Alert>
                    }

                    <CalculatorForm operations={operations} submit={calculate} loading={loading}/>
                </CardContent>
            </Card>
        </Container>
    )
}

export default Calculator;