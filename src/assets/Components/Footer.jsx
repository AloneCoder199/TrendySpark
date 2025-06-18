import React from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
const Footer = () => {
  const handleClick = () => {
    Swal.fire({
      title: "Alone_Coder Information",
      text: "Alone_Coder is a software house currently in development, located in FSD Sumandri. It is a one-man company with the founder's name being a secret. You can refer to them as Alone_Coder.",
      icon: "info",
      confirmButtonText: "Got it!",
    });
  };
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className=" text-white py-6 mt-8"
    >
      <div className="max-w-7xl  flex justify-center items-center">
        <p className="text-center  text-sm mt-6 text-gray-500 italic ">
          All rights reserved to{" "}
          <span
            onClick={handleClick}
            className="text-yellow-400 cursor-pointer hover:text-yellow-500 transition duration-300"
          >
            Alone_Coder
          </span>
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
