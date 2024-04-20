import {
    Box,
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    styled,
    tableCellClasses,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { Crash } from "../common/models/Crash";
import { getById } from "../services/services";
import ChartCard from "./ChartCard";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const SingleCrashCard = () => {
    const [crash, setCrash] = useState<Crash | null>(null);
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = () => {
        getById(inputValue).then((response) => {
            console.log(response);
            setCrash(response);
        });
    };

    const table: ReactNode = (
        <Box display={"flex"} flexDirection={"column"} gap={1} height={"80%"}>
            <Grid
                container
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-around"}
            >
                <Grid item xs={6}>
                    <TextField
                        label="Enter ID"
                        fullWidth
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6} container justifyContent="flex-end">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleButtonClick}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell scope="row">ID</StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {crash?.crasH_RECORD_ID}
                            </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                                Date
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {crash?.crasH_DATE}
                            </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                                First crash type
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {crash?.firsT_CRASH_TYPE}
                            </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                                Posted speed limit
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {crash?.posteD_SPEED_LIMIT}
                            </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                                Street name
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {crash?.streeT_NAME}
                            </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                                Street direction
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {crash?.streeT_DIRECTION}
                            </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                                Traffic control device
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {crash?.traffiC_CONTROL_DEVICE}
                            </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                                Crash type
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {crash?.crasH_TYPE}
                            </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                                Longitude
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {crash?.longitude}
                            </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                                Latitude
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {crash?.latitude}
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
    return (
        <>
            <ChartCard
                bg="Light"
                border="success"
                header="Search by crash ID"
                text="Represents all relevant data for specific crash."
                textColor="dark"
                children={table}
            />
        </>
    );
};

export default SingleCrashCard;
