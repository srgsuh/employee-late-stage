import {HStack, Skeleton, SkeletonCircle, Stack, Table} from "@chakra-ui/react";

interface SkeletonTableProps {
    rowCount: number;
    columnStructure: string;
}

const colBuilder = {
    "C": () => (<Table.Cell>
        <HStack gap="5">
            <SkeletonCircle size="12" />
        </HStack>
    </Table.Cell>),
    "T": () => (<Table.Cell>
        <HStack gap="5">
            <Stack flex="1">
                <Skeleton height="5" width="50%" />
            </Stack>
        </HStack>
    </Table.Cell>),
}

const buildSkeletonCell = (cellType: string) => {
    return (cellType === "C")? colBuilder["C"](): colBuilder["T"]();
}

const SkeletonTable
    = ({rowCount, columnStructure}: SkeletonTableProps) => {
    return (
        Array.from({length: rowCount}, (_, rowIndex)=>(
            <Table.Row key={rowIndex}>
                {[...columnStructure].map(buildSkeletonCell)}
            </Table.Row>
        ))
    );
};

export default SkeletonTable;