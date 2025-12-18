import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>Jan Agent</title>
        <meta
          name="description"
          content="Landing page for the Agents Playground. Jump in to try or build agents."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative min-h-screen overflow-hidden bg-[#121212] text-white flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center gap-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
            className="space-y-3"
          >
            <motion.img
              src="/jan-logomark.svg"
              alt="Jan Agent logo"
              className="h-16 w-16 sm:h-20 sm:w-20 mx-auto"
              animate={{ rotate: [-6, 6, -6], y: [0, -3, 0] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 2.8,
                ease: "easeInOut",
              }}
            />
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-semibold leading-tight drop-shadow-[0_8px_32px_rgba(241,116,85,0.35)]">
                Jan Agent
              </h1>
              <p className="text-lg text-gray-200">Made to hear.</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            <Link
              href="/agents"
              className="group relative inline-flex items-center justify-center rounded-full bg-[#F17455] px-10 py-3 text-[#121212] text-base font-semibold tracking-wide shadow-lg shadow-[#F17455]/40 transition duration-200"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F17455] via-[#f58b6d] to-[#f9a48a] opacity-0 blur-2xl transition duration-300 group-hover:opacity-90" />
              <motion.span
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 2.2, ease: "easeInOut" }}
                className="relative"
              >
                Join as Guest
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.span
          aria-hidden
          className="absolute w-[28rem] h-[28rem] -left-40 -top-24 rounded-full bg-gradient-to-br from-[#F17455]/24 via-[#f58b6d]/18 to-transparent blur-3xl"
          animate={{ y: [-20, 20, -20], x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        />
        <motion.span
          aria-hidden
          className="absolute w-[22rem] h-[22rem] -right-32 bottom-0 rounded-full bg-gradient-to-tr from-[#F17455]/18 via-[#f58b6d]/12 to-transparent blur-3xl"
          animate={{ y: [30, -10, 30], x: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 14, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-35"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            background:
              "radial-gradient(circle at 20% 30%, rgba(241,116,85,0.18) 0, transparent 45%), radial-gradient(circle at 80% 70%, rgba(241,116,85,0.14) 0, transparent 42%), radial-gradient(circle at 55% 20%, rgba(255,255,255,0.04) 0, transparent 50%)",
          }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-20"
          initial={{ backgroundPosition: "0% 50%" }}
          animate={{ backgroundPosition: "100% 50%" }}
          transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.04) 0, transparent 22%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.025) 0, transparent 18%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.05) 0, transparent 24%)",
          }}
        />
      </main>
    </>
  );
}
