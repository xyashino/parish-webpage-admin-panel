import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { DayIntentionsResponse } from "@backendTypes";
import { MenuItem } from "@frontendTypes/menu-item.interface";
import { TRANSLATE_INTENTIONS } from "@data/translate-intentions.data";
import { GridLayoutPage } from "@components/ui/GridLayoutPage";
import { Menu } from "@components/ui/Menu";
import { IntentionsPreviewTable } from "@components/intentions/preview/IntentionsPreviewTable";
import { Header } from "@components/ui/Header";
import { DateUtil } from "@utils/date.util";

const weekday = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
const today = weekday[new Date().getDay()];

const activeTable = (intentions: DayIntentionsResponse[], menu: MenuItem[]) => {
  return (
    intentions.find(({ id }) => id === menu.find(({ active }) => active)?.id) ??
    intentions[0]
  );
};

export const IntentionsPreviewPage = () => {
  const intentions = useLoaderData() as DayIntentionsResponse[];
  const startWeek = intentions.at(0)?.dateOfDay;
  const endWeek = intentions.at(-1)?.dateOfDay;

  const [menu, setMenu] = useState<MenuItem[]>(
    intentions.map(({ day, id }) => ({
      title: TRANSLATE_INTENTIONS.get(day) ?? "unknown",
      active: today === day,
      type: day,
      id,
    }))
  );

  const [table, setTable] = useState<DayIntentionsResponse>(
    activeTable(intentions, menu)
  );

  const changeTable = (type: string) => {
    setMenu((prevState) => {
      prevState.forEach(
        (el) =>
          (el.active =
            (el.type as unknown as string).toLowerCase() === type.toLowerCase())
      );
      return [...prevState];
    });

    setTable(() => activeTable(intentions, menu));
  };
  const title = (
    <p>
      INTENCJE TYGODNIOWE <br />{" "}
      {endWeek && startWeek ? DateUtil.createDateRange(startWeek, endWeek) : ""}
    </p>
  );
  const panel = (
    <div className="card w-full">
      <Menu items={menu} onClick={changeTable} />
    </div>
  );

  return (
    <section className="flex w-5/6 flex-col items-center bg-base-200">
      <Header
        className="p-4 text-4xl font-bold uppercase text-base-100 shadow"
        title="Podgląd aktualnych intencji"
      />
      <GridLayoutPage titleContent={title} leftPanelContent={panel}>
        <IntentionsPreviewTable
          day={table.day}
          intentionRow={table.intentions}
          dateOfDay={table.dateOfDay}
        />
      </GridLayoutPage>
    </section>
  );
};
