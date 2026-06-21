import React from 'react'
import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiJavascript,
  SiGit,
  SiDocker,
  SiGithub,
} from "react-icons/si";
import { motion, useScroll, useTransform } from "framer-motion";


const logos = [
    { icon: <SiGit />, name: "Git" },
    { icon: <SiDocker />, name: "Docker" },

    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiExpress />, name: "Express" },
    { icon: <SiReact />, name: "React" },
    { icon: <SiNodedotjs />, name: "Node.js" },

    { icon: <SiJavascript />, name: "JavaScript" },
    { icon: <SiGithub />, name: "GitHub" },
];

const Snake = () => {
    const { scrollY } = useScroll();
    const x = useTransform(
    scrollY,
    [0, 4000],
    [0, -1200]
);
  return (
    <div>
      <div className="snake-header">
        <h2>Technologies I Work With</h2>
        <p>
            Building modern web applications using the MERN ecosystem.
        </p>
    </div>

    <div className="tech-snake">
        <motion.div
            className="tech-track"
            style={{ x }}
        >
            {[...logos, ...logos, ...logos].map((item, index) => (
                <motion.div
                    key={index}
                    className={`tech-circle ${
                        ["MongoDB", "Express", "React", "Node.js"].includes(
                            item.name
                        )
                            ? "mern-circle"
                            : ""
                    }`}
                    animate={{
                        y: [0, -(5 + (index % 4) * 5), 0],
                    }}
                    transition={{
                        duration: 3 + (index % 3),
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    whileHover={{
                        scale: 1.1,
                    }}
                >
                    {item.icon}

                    <span className="tech-tooltip">
                        {item.name}
                    </span>
                </motion.div>
            ))}
        </motion.div>
    </div>
    </div>
  )
}

export default Snake
