import { forwardRef, useState } from 'react';

import { InitializeVariables, useInitialize } from '@requests/user';
import Input from '@components/inputs/Input';
import Button from '@components/button/Button';

interface InitializeUserProps
  extends Omit<InitializeVariables, 'ref' | 'email'> {
  id: string;
  onDone?: () => void;
}

const InitializeUser = ({ type, id, onDone }: InitializeUserProps) => {
  const [initialize] = useInitialize({
    fetchPolicy: 'network-only',
  });
  const [email, setEmail] = useState('');

  return (
    <div className="flex flex-1 flex-col justify-center">
      <Input
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />
      <Button
        onClick={(e) => {
          e.stopPropagation();
          initialize({ variables: { type, ref: id, email } }).then(() => {
            if (onDone) onDone();
          });
        }}
        type="primary"
      >
        Valider
      </Button>
    </div>
  );
};

export default InitializeUser;
