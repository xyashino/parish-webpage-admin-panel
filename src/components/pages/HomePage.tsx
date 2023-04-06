import React from "react";
import {MainContainer} from "@components/ui/MainContainer";
import {Header} from "@components/ui/Header";


export const HomePage = ()=>{
    return <MainContainer useArticle>
        <Header title="Witaj w panelu administracji strony Parafia Gruszów Wielki" />
    </MainContainer>
}