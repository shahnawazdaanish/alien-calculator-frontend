import React, {useState} from 'react'
import {SubmitHandler, useForm} from "react-hook-form";
import {
    Button,
    FormControl,
    FormHelperText,
    InputLabel, LinearProgress,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import IOperationData from "../Types/Operation";
import {Calculate} from "@mui/icons-material";
import CalculatorFormInput from "../Types/CalculatorFormInput";

const CalculatorForm = (props: any) => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<CalculatorFormInput>();
    const onSubmit: SubmitHandler<CalculatorFormInput> = data => {
        props.submit(data);
        reset();
    }

    const defaultOperation: IOperationData = {alias: '', inputs: 0, unicode_codepoint: ''}
    const [operation, setOperation] = useState<IOperationData>(defaultOperation);
    const handleOperationSelect = (event: SelectChangeEvent<unknown>) => {
        const value = event.target.value as string;
        let selectedOperation = props.operations.find((obj: any) => {
            return obj.alias === value;
        })
        setOperation(selectedOperation);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {props.loading && <LinearProgress/>}
            <br/>
            <FormControl fullWidth style={{marginBottom: "20px"}}>
                <InputLabel id="demo-simple-select-disabled-label">Operation</InputLabel>
                <Select
                    labelId="demo-simple-select-disabled-label"
                    id="demo-simple-select-disabled"
                    label="Operation"
                    required
                    {...register("operation", {required: true, onChange: handleOperationSelect})}
                >
                    {props.operations?.map((option: IOperationData) => {
                        const codePoint = option.unicode_codepoint.replace("U+", '').toLowerCase();
                        const emoji = String.fromCodePoint(Number("0x" + codePoint));
                        return (
                            <MenuItem key={option.alias} value={option.alias}>
                                {emoji} ({option.alias})
                            </MenuItem>
                        );
                    })}
                </Select>
                <FormHelperText>Select an operation to proceed</FormHelperText>
            </FormControl>

            {[...Array(operation?.inputs)].map((x, i) => {
                    return (
                        <FormControl key={i} fullWidth style={{marginBottom: "20px"}}>
                            <TextField type={"number"}
                                       id="outlined-basic"
                                       label="Input Number"
                                       variant="outlined"
                                       {...register(`inputs.${i}`, {required: true})}
                                       required
                            />
                        </FormControl>
                    )
                }
            )}

            {errors.operation && <span>This field is required</span>}
            <Button
                variant="contained"
                endIcon={<Calculate/>}
                type={"submit"}>
                Calculate
            </Button>
        </form>
    );
}

export default CalculatorForm;