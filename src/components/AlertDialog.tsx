import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import {useColorModeValue} from "./ui/color-mode.tsx";

interface AlertDialogProps {
    itemDescription: string;
    isDisabled: boolean;
    onConfirm: () => void;
}

const AlertDialog =
    ({itemDescription, isDisabled, onConfirm}: AlertDialogProps) => {
    return (
        <Dialog.Root role="alertdialog">
            <Dialog.Trigger asChild>
                <Button
                    disabled={isDisabled}
                    color={"black"}
                    background={useColorModeValue("red.500", "red.200")}
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
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button colorPalette="red" onClick={onConfirm}>Delete</Button>
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
