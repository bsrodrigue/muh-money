import { useState } from 'react';
import { Text } from 'react-native'
import { Button, Dialog, Portal } from 'react-native-paper';
import { useSession } from '../../providers';

interface LogoutDialogProps {
  isVisible: boolean;
  onDismissDialog: () => void;
}

export default function LogoutDialog({ isVisible, onDismissDialog }: LogoutDialogProps) {
  const [_state, _setState] = useState(null);
  const { stopSession } = useSession();

  return (
    <Portal>
      <Dialog
        onDismiss={onDismissDialog}
        visible={isVisible}>
        <Dialog.Title>Deconnexion</Dialog.Title>
        <Dialog.Content>
          <Text >Voulez-vous vous déconnecter?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={stopSession}>
            <Text>Confirmer</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
