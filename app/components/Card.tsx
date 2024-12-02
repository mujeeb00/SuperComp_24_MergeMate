import { PanInfo, motion } from "framer-motion";
import { useState } from "react";
// import { CardProps } from "types";
import { Card as ShadCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SwipeCard: React.FC<any> = ({ card, removeCard, active }) => {
  const [leaveX, setLeaveX] = useState(0);
  const [leaveY, setLeaveY] = useState(0);

  const onDragEnd = (_e: any, info: PanInfo) => {
    if (info.offset.y < -100) {
      setLeaveY(-2000);
      removeCard(card, "superlike");
      return;
    }
    if (info.offset.x > 100) {
      setLeaveX(1000);
      removeCard(card, "like");
    }
    if (info.offset.x < -100) {
      setLeaveX(-1000);
      removeCard(card, "nope");
    }
  };

  const currentCard = card ?? {
    name: "Unknown",
    description: "No description",
    owner: { login: "Unknown" },
    language: "Unknown",
    stargazers_count: 0,
    forks_count: 0,
    html_url: "#",
    avatar_url: "https://avatars.githubusercontent.com/u/0?v=4",
  };

  const classNames = `absolute h-[430px] w-[300px] bg-white shadow-xl rounded-3xl flex flex-col justify-center items-center cursor-grab transition-all duration-300 group m-2 px-10 py-5 gap-2 relative overflow-hidden z-20`;

  return (
    <>
      {active ? (
        <motion.div
          drag={true}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          onDragEnd={onDragEnd}
          initial={{ scale: 1 }}
          animate={{
            scale: 1.05,
            rotate: `${currentCard.name.length % 2 === 0 ? 6 : -6}deg`,
          }}
          exit={{
            x: leaveX,
            y: leaveY,
            opacity: 0,
            scale: 0.5,
            transition: { duration: 0.2 },
          }}
          className={classNames}
          data-testid="active-card"
        >
          <ShadCard className="w-[350px] h-[500px] bg-white rounded-3xl shadow-xl flex flex-col justify-between items-center p-6 transition-all duration-300 relative overflow-hidden border-0">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbqj9Ii13d6hx5a9kyLnC5A8A96LDSaSZv_w&s"
              alt="Avatar"
              className="w-16 h-16 rounded-full"
            />

            <p className="font-semibold text-gray-800 tracking-wider text-xl group-hover:text-gray-900">
              {currentCard.name}
            </p>

            <p className="text-gray-600 text-sm mb-4 text-center">
              {currentCard.description || "No description available"}
            </p>

            <p className="text-gray-500 text-sm mb-4">
              {currentCard.language || "No tech stack available"}
            </p>

            <div className="flex flex-row justify-between items-center w-full mt-4">
              <p className="text-gray-700 font-semibold group-hover:text-gray-900 text-lg">
                ⭐ {currentCard.stargazers_count} | 🍴 {currentCard.forks_count}
              </p>
              <Button
                className="lg:inline-flex items-center gap-3 bg-gray-100 text-gray-800 py-2 px-4 text-sm font-semibold rounded-full shadow-md hover:bg-gray-200 transition-all duration-300"
                onClick={() => window.open(currentCard.html_url, "_blank")}
              >
                View Repo
              </Button>
            </div>
          </ShadCard>
        </motion.div>
      ) : (
        <div className={classNames}>
          <ShadCard className="w-[350px] h-[500px] bg-white rounded-3xl shadow-xl flex flex-col justify-between items-center p-6 transition-all duration-300 border-0">
            <img
              src={currentCard.avatar_url}
              alt="Avatar"
              className="w-16 h-16 rounded-full"
            />

            <p className="font-semibold text-gray-800 tracking-wider text-xl group-hover:text-gray-900">
              {currentCard.name}
            </p>
            <p className="text-gray-600 text-sm mb-4 text-center">
              {currentCard.description || "No description available"}
            </p>

            <p className="text-gray-500 text-sm mb-4">
              {currentCard.language || "No tech stack available"}
            </p>

            <div className="flex flex-col justify-between items-center w-full mt-4">
              <p className="text-gray-700 font-semibold group-hover:text-gray-900 text-lg">
                ⭐ {currentCard.stargazers_count} | 🍴 {currentCard.forks_count}
              </p>
              <div className="w-full flex justify-center mt-2">
                <Button
                  className="lg:inline-flex items-center gap-3 bg-gray-100 text-gray-800 py-2 px-4 text-sm font-semibold rounded-full shadow-md hover:bg-gray-200 transition-all duration-300"
                  onClick={() => window.open(currentCard.html_url, "_blank")}
                >
                  View Repo
                </Button>
              </div>
            </div>
          </ShadCard>
        </div>
      )}
    </>
  );
};

export default SwipeCard;
