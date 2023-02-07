import React, { useContext } from "react";
import { Btn } from "@components/ui/Btn";
import { AnnouncementContext } from "@context/AnnouncementContext";

export const AnnouncementEditFooter = () => {
  const { setAnnouncements } = useContext(AnnouncementContext);
  const addEmptyField = () => {
    setAnnouncements((prevState) => {
      const { announcements } = prevState;
      const lastOrder = announcements.at(-1)?.order;
      announcements.push({
        id: lastOrder ? `${+lastOrder + 1}` : crypto.randomUUID(),
        body: "",
        order: lastOrder ? +lastOrder + 1 : 1,
      });
      return { ...prevState };
    });
  };

  const numerateColumns = () => {
    setAnnouncements((prevState) => {
      const { announcements } = prevState;
      prevState.announcements = announcements.map(({ order, ...rest }, i) => ({
        order: i + 1,
        ...rest,
      }));
      return { ...prevState };
    });
  };

  return (
    <div className="flex justify-around py-4">
      <Btn className="btn " onClick={() => addEmptyField()}>
        Dodaj puste pole
      </Btn>
      <Btn className="btn" onClick={numerateColumns}>
        Autonumeruj Kolumny
      </Btn>
    </div>
  );
};
