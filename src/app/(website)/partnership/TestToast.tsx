"use client";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
const TestToast = () => {
  const notify = () =>
    toast.success("Thank you for contacting us! We'll get back to you soon.", {
      position: "top-center",
    });
  return (
    <div>
      <Button onClick={notify}>Notify !</Button>
      {/* <div className="grid place-items-center h-dvh bg-zinc-900/15">
        <Button onClick={notify}>Notify !</Button>
        <ToastContainer />
      </div> */}
    </div>
  );
};

export default TestToast;
