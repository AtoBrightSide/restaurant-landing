import { useFormStatus } from "react-dom";
import { Button } from "./ui/Button";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return <Button disabled={pending}>Submit Order</Button>;
};

export default SubmitButton;
