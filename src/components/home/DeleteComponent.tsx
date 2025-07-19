import { useActivityStore } from "@/store/ActivityStore";
import { Button, Input } from "@heroui/react";

export default function DeleteComponent() {
  const assignPassword = useActivityStore((state) => state.assignPassword);
  const isSignedIn = useActivityStore((state) => state.isSignedIn);
  const setUserPassword = useActivityStore((state) => state.setUserPassword);
  const verifyPassword = useActivityStore((state) => state.verifyPassword);
  const userPassword = useActivityStore((state) => state.userPassword);

  return (
    <div className="grid gap-4">
      <Input
        type="password"
        placeholder="Enter passcode"
        onChange={(e) => setUserPassword(e.target.value)}
        value={userPassword}
      />
      {
        <Button
          onPress={() => {
            isSignedIn ? verifyPassword(userPassword) : assignPassword();
          }}
          color="primary"
        >
          {isSignedIn ? `Verify` : `Create`}
        </Button>
      }
    </div>
  );
}
