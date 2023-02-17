import React, { useContext, useState } from "react";
import { IntentionContext } from "@context/IntentionContext";
import { DateUtil } from "@utils/date.util";
import { Btn } from "@components/ui/Btn";

const TOOLTIP_INFO = "Ustawia aktualną date na cały tydzień";

export const IntentionsEditWeek = () => {
  const { intentions, setIntentions } = useContext(IntentionContext);

  const [week, setWeek] = useState({
    start: intentions.at(0)?.dateOfDay ?? "0000-00-00",
    end: intentions.at(-1)?.dateOfDay ?? "0000-00-00",
  });
  const updateWeek = () => {
    const weekdays = DateUtil.findAllDaysStartOnNextMonday();
    setWeek({
      start: DateUtil.formatDate(weekdays.at(0) as Date),
      end: DateUtil.formatDate(weekdays.at(-1) as Date),
    });
    setIntentions((prevState) => {
      const newValue = prevState.map(({ dateOfDay, ...rest }, i) => ({
        ...rest,
        dateOfDay: DateUtil.formatDate(weekdays[i]),
      }));
      return [...newValue];
    });
  };
  return (
    <div className="flex items-center justify-center p-2 text-base font-bold uppercase">
      <div className="mx-8 space-x-5 text-xl">
        <span>Tydzień: </span>
        <input
          type="date"
          value={week.start + ""}
          className="border-b-2 bg-transparent"
          onChange={(e) =>
            setWeek(({ end }) => ({ start: e.target.value, end }))
          }
        />
        <span>-</span>
        <input
          type="date"
          value={week.end + ""}
          className="border-b-2 bg-transparent"
          onChange={(e) =>
            setWeek(({ start }) => ({ end: e.target.value, start }))
          }
        />
      </div>

      <div className="tooltip tooltip-top" data-tip={TOOLTIP_INFO}>
        <Btn className="btn mx-4" onClick={updateWeek}>
          Aktualizuj Date
        </Btn>
      </div>
    </div>
  );
};
