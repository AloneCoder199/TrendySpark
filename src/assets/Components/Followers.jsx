// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import Swal from "sweetalert2";
// import axios from "axios";

// const TikTokBooster = () => {
//   const [profileLink, setProfileLink] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     Swal.fire({
//       title: "📢 Welcome to TikTok Booster!",
//       html: `
//         <p>🔹 This system works on a <b>Follow-for-Follow</b> & <b>Like-for-Like</b> basis.</p>
//         <p>🔹 Paste your TikTok profile link and start receiving followers & likes automatically.</p>
//         <p>🔹 To keep getting followers, <b>you must also follow back</b> the suggested profiles.</p>
//         <p>⚠️ If you unfollow users later, your followers may decrease.</p>
//         <p>✅ Enjoy free engagement & grow your TikTok profile!</p>
//       `,
//       icon: "info",
//       showCancelButton: true,
//       confirmButtonText: "Got it!",
//       confirmButtonColor: "#3085d6",
//       cancelButtonText: "Why this method?",
//       cancelButtonColor: "#d33",
//     }).then((result) => {
//       if (result.dismiss === Swal.DismissReason.cancel) {
//         Swal.fire({
//           title: "🤔 Why This Method?",
//           html: `
//             <p>⚠️ <b>Fake Methods</b> (bots & generators) can get your account <b>banned</b> by TikTok.</p>
//             <p>✅ <b>Our system</b> follows TikTok's guidelines by using real users & mutual engagement.</p>
//             <p>🔄 This means every user gets genuine followers & likes instead of bots.</p>
//             <p>💡 To keep growing, just <b>follow back</b> and keep engaging!</p>
//           `,
//           icon: "warning",
//           confirmButtonText: "I Understand",
//           confirmButtonColor: "#3085d6",
//         });
//       }
//     });
//   }, []);

//   const showAlert = (type, title, text) => {
//     Swal.fire({
//       icon: type,
//       title,
//       text,
//       confirmButtonColor: "#3085d6",
//     });
//   };

//   const handleFollow = async () => {
//     if (!profileLink.trim()) {
//       showAlert("error", "⚠️ Invalid Link!", "Please enter a valid TikTok profile link!");
//       return;
//     }

//     setLoading(true);
//     Swal.fire({
//       title: "⏳ Processing...",
//       text: "Please wait while we check your login & follow the user.",
//       icon: "info",
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     try {
//       await axios.post("http://localhost:5000/auto-follow", { profileLink });
//       Swal.fire("🎉 Success!", "✅ Auto-Follow Started!", "success");
//     } catch (error) {
//       showAlert("error", "❌ Error!", error.response?.data?.error || "Something went wrong!");
//     }
//     setLoading(false);
//   };

//   const handleUnfollow = async () => {
//     setLoading(true);
//     Swal.fire({
//       title: "⏳ Processing...",
//       text: "Unfollowing users who unfollowed you...",
//       icon: "info",
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     try {
//       await axios.post("http://localhost:5000/auto-unfollow", { profileLink });
//       Swal.fire("🎉 Success!", "✅ Auto-Unfollow Done!", "success");
//     } catch (error) {
//       showAlert("error", "❌ Error!", error.response?.data?.error || "Something went wrong!");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-900 text-white">
//       <motion.h1 className="text-3xl font-bold mb-4 text-center">🔥 Free TikTok Followers & Likes 🚀</motion.h1>

//       <div className="w-full max-w-lg flex flex-col sm:flex-row gap-4">
//         <input
//           type="text"
//           placeholder="Paste your TikTok profile link here..."
//           className="p-3 w-full sm:w-auto flex-1 rounded-md bg-gray-700 text-white"
//           value={profileLink}
//           onChange={(e) => setProfileLink(e.target.value)}
//         />
//         <button
//           disabled={loading}
//           onClick={handleFollow}
//           className="bg-pink-500 p-3 rounded-md w-full sm:w-auto"
//         >
//           {loading ? "Processing..." : "Auto-Follow"}
//         </button>
//         <button
//           disabled={loading}
//           onClick={handleUnfollow}
//           className="bg-red-500 p-3 rounded-md w-full sm:w-auto"
//         >
//           {loading ? "Processing..." : "Auto-Unfollow"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TikTokBooster;
import React from "react";
import { motion } from "framer-motion";
import { Loader2, Clock } from "lucide-react";
import Swal from "sweetalert2";
import Footer from "./Footer";
// import "sweetalert2/src/sweetalert2.scss"; // make sure styling applies

const TikTok = () => {
  const handleHowItWorks = () => {
    Swal.fire({
      title: "How We're Increasing Followers",
      html: `
        <p style="text-align: left;">
          We're using a smart combination of <b>AI-driven engagement</b>, trending hashtag targeting, and 
          <b>content scheduling</b> to increase visibility and organic growth on TikTok.<br /><br />
          We’re also experimenting with <b>bot-free methods</b> and real user interest optimization.
        </p>
      `,
      icon: "info",
      confirmButtonText: "Cool!",
      confirmButtonColor: "#6366f1",
      background: "#1f1f1f",
      color: "#fff"
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white p-6 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          🎥 TikTok Page — Coming Soon!
        </h1>

        <p className="text-lg md:text-xl mb-4 text-gray-300">
          We're currently working on this page. Soon, you'll find powerful TikTok features like
          <b> video insights, trends analysis, post scheduling</b>, and even a
          <b> follower growth system</b> — all in one place!
        </p>

        <div className="flex items-center justify-center gap-2 mb-6 text-pink-400">
          <Clock className="animate-pulse" />
          <span className="text-base md:text-lg font-medium">Work in Progress...</span>
        </div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="inline-block mb-10 relative left-25"
        >
          <Loader2 size={40} className="text-white " />
        </motion.div>

        <button
          onClick={handleHowItWorks}
          className=" mt-20 px-5 py-2 bg-blue-500 text-black font-semibold rounded-full shadow hover:bg-gray-200 transition"
        >
          How we're doing it?
        </button>

        {/* <p className="text-sm mt-6 text-gray-500 italic">
          TrendySpark — Creating smart tools for creators 💡
        </p> */}
        <Footer/>
      </motion.div>
    </div>
  );
};

export default TikTok;
