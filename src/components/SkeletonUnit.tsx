import {HStack, Skeleton, SkeletonCircle} from "@chakra-ui/react";

interface SkeletonUnitProps {
    type: "circle" | "line";
}

const SkeletonUnit = ({type}: SkeletonUnitProps) => {
    return (type === "circle")?
        <HStack gap="5"><SkeletonCircle size="12" /></HStack>:
        <HStack gap="5"><Skeleton height="5" width="50%" /></HStack>;
};

export default SkeletonUnit;