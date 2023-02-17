import React, {ChangeEvent, useContext, useLayoutEffect, useState} from "react";
import { Divider } from "@components/ui/Divider";
import { AnnouncementsItem } from "@backendTypes";
import { AnnouncementContext } from "@context/AnnouncementContext";
import { Close } from "@icons/Close";

interface Props {
  item: AnnouncementsItem;
}

export const AnnouncementEditBodyItem = ({ item }: Props) => {
  const { id: itemId, body: bodyItem, order: orderItem } = item;
  const { setAnnouncements } = useContext(AnnouncementContext);

  const [order, setOrder] = useState(orderItem);
  const [body, setBody] = useState(bodyItem);

  useLayoutEffect(() => {
    const { body, order } = item;
    setOrder(order);
    setBody(body);
  }, [item]);
  const updateValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "order") {
      setOrder(+value);
      return;
    }
    setBody(value);
  };

  const updateDataInContext = () => {
    setAnnouncements((prevState) => {
      const { announcements } = prevState;
      let itemIndex = announcements.findIndex(({ id }) => id === itemId);
      if (itemIndex === -1) return prevState;
      announcements[itemIndex] = { id: itemId, body, order };
      return { ...prevState };
    });
  };

  const removeItemFromContext = () => {
    setAnnouncements((prevState) => {
      const { announcements } = prevState;
      prevState.announcements = announcements.filter(({ id }) => id !== itemId);
      return { ...prevState };
    });
  };

  return (
    <div>
      <li className="flex w-full items-center">
        <input
          type="number"
          value={order}
          className="ghost input mx-2.5 w-1/12"
          name="order"
          onChange={(e) => updateValue(e)}
          onBlur={updateDataInContext}
        />
        <textarea
          name="body"
          value={body}
          className="textarea-primary textarea grow"
          onChange={(e) => updateValue(e)}
          onBlur={updateDataInContext}
        />
        <Close
          className="mx-5 text-4xl text-primary hover:scale-125"
          onClick={removeItemFromContext}
        />
      </li>
      <Divider />
    </div>
  );
};
