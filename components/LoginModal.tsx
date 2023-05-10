import { Dialog } from '@headlessui/react';
import { useState } from 'react';

const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Panel>
        <Dialog.Title>Log In</Dialog.Title>
        <Dialog.Description>
          <div className="flex flex-col">
            <label htmlFor="email">
              Email
              <input type="email" name="email" id="email" />
            </label>
            <label htmlFor="password">
              Password
              <input type="password" name="password" id="password" />
            </label>
            <button type="submit">Log In</button>
          </div>
        </Dialog.Description>
      </Dialog.Panel>
    </Dialog>
  );
};
export default LoginModal;
