import React, {useLayoutEffect, useState} from "react";
import { useLoaderData } from "react-router-dom";
import { DayIntentionsResponse } from "@backendTypes";
import { TRANSLATE_INTENTIONS } from "@data/translate-intentions.data";
import { Menu } from "@components/ui/Menu";
import { IntentionContext } from "@context/IntentionContext";
import { IntentionsEditTable } from "@components/intentions/edit/IntentionsEditTable";
import { Header } from "@components/ui/Header";
import { IntentionsEditWeek } from "@components/intentions/edit/IntentionsEditWeek";
import { IntentionsButtonSection } from "@components/intentions/edit/IntentionsEditButtonsSection";

export const IntentionsEditPage = () => {
  //context&&states
  const intentionsResponse = useLoaderData() as DayIntentionsResponse[];
  const [intentions, setIntentions] = useState(intentionsResponse);

  const [activeTable, setActiveTable] = useState<
    DayIntentionsResponse | undefined
  >(intentions[0]);

  const [menu, setMenu] = useState(
    intentions.map(({ id, day }, index) => ({
      id,
      title: TRANSLATE_INTENTIONS.get(day) || "unknown",
      type: day,
      active: !index,
    }))
  );
  //handling states
  const changeActiveMenuItem = (clickedType: string) => {
    setMenu((prevState) => {
      return prevState.map(({ type, active, ...rest }) => ({
        type,
        active: type === clickedType,
        ...rest,
      }));
    });

    setActiveTable(() => {
      return intentions.find(({ day }) => day === clickedType);
    });
  };

  useLayoutEffect(() => {
    const activeId = menu.find(({ active }) => active)?.id;
    if (!activeId) return;
    setActiveTable(() => {
      return intentions.find(({ id }) => id === activeId);
    });
  }, [intentions]);

  if (!activeTable) {
    return null;
  }

  return (
    <IntentionContext.Provider value={{ intentions, setIntentions }}>
      <section className="w-5/6 bg-base-100">
        <Header
          className="mb-10 p-4 text-4xl font-bold uppercase text-base-100 shadow"
          title="Edytuj Intencje"
        />

        <IntentionsEditWeek />
        <IntentionsButtonSection />
        <Menu items={menu} onClick={changeActiveMenuItem} />
        <IntentionsEditTable table={activeTable} />
      </section>
    </IntentionContext.Provider>
  );
};
