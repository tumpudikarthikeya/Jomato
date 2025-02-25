import React from "react";
import { RxCopy } from "react-icons/rx";
import { Snackbar, Alert } from "@mui/material";

const DisplayCard = ({ title, desc, code, discount, img_url }) => {
  const [open, setOpen] = React.useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setOpen(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="bg-white rounded-[40px] p-5 px-8 shadow-xl">
      <p className="text-3xl font-[1000]">{title}</p>
      <p className="text-xl font-medium">{desc}</p>
      <p className="text-xl text-[#ff5200] font-medium mt-5">
        Up to {discount}% off
      </p>
      <div className="flex justify-between place-content-end items-end">
        <div
          className="bg-[#ff5200] rounded-full p-2 hover:cursor-pointer"
          onClick={() => copyToClipboard(code)}
        >
          <RxCopy className="text-3xl text-white font-bold" />
        </div>
        <img src={img_url} alt="" className="h-30 mt-20" />
      </div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Code copied to clipboard!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DisplayCard;
