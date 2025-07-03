import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import {useColorModeValue} from "./ui/color-mode.tsx";

interface AlertDialogProps {
    itemDescription: string;
    isDisabled: boolean;
    onConfirm: () => void;
}

const AlertDialog =
    ({itemDescription, isDisabled, onConfirm}: AlertDialogProps) => {

    const alertBgColor = useColorModeValue("red.500", "red.300");
    const cancelBgColor = useColorModeValue("gray.700", "gray.400");
    return (
        <Dialog.Root role="alertdialog">
            <Dialog.Trigger asChild>
                <Button
                    disabled={isDisabled}
                    color={"black"}
                    background={alertBgColor}
                    variant="outline"
                    size="sm">
                    Delete
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Delete record confirmation</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <p>
                                You're about to delete {itemDescription}.
                            </p>
                            <p>
                                This action is irreversible. Are you sure?
                            </p>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button background={cancelBgColor}>Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button background={alertBgColor} onClick={onConfirm}>Delete</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default AlertDialog;
